<template>
  <div>
    <h2>实时高亮查询</h2>
    <el-button type="text" @click="dialogVisible = true"
      >实时高亮查询 Dialog</el-button
    >
    <hr />
    <h2>只能修改多少个字校验</h2>
    <el-form
      :model="ruleForm"
      :rules="rules"
      inline
      adaptive
      ref="ruleForm"
      size="medium"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <hr />
    <h2>axios取消请求总结</h2>
    <el-button @click="getAxiosFun('orange')">发起axios请求</el-button>
    <el-button @click="getAxiosFun('apple')">终止axios请求</el-button>
    <el-dialog
      title="提示"
      center
      :visible.sync="dialogVisible"
      width="800"
      :before-close="handleClose"
      class="dialog-dome"
      :header-border="true"
      :footer-border="true"
      :close-on-clik-modal="false"
      :use-padding="false"
    >
      <div>
        <div style="margin-top: 15px">
          <el-input
            placeholder="请输入内容"
            size="medium"
            v-model="input3"
            suffix-icon="el-icon-search"
            class="input-with-select"
          ></el-input>
        </div>
        <div>
          <div>
            <el-radio-group class="group-list" v-model="groupModel">
              <el-radio
                v-for="(item, index) in listData"
                :key="index"
                :label="item"
                class="group-radio"
              >
                <span
                  v-for="(word, index1) in Array.from(item.name || '')"
                  :key="`${index}-${index1}`"
                  class="test666"
                  :class="isHighlight(word)"
                  >{{ word }}</span
                >
              </el-radio>
            </el-radio-group>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    /** 最长公共子序列 */
    function lcs(x, y) {
      const mm = x.length;
      const nn = y.length;
      const ll = Array.from({ length: mm + 1 }, () => Array(nn + 1).fill(0));
      for (let i = 0; i <= mm; i++) {
        for (let j = 0; j <= nn; j++) {
          if (i === 0 || j === 0) {
            ll[i][j] = 0;
          } else if (x[i - 1] === y[j - 1]) {
            ll[i][j] = ll[i - 1][j - 1] + 1;
          } else {
            ll[i][j] = Math.max(ll[i - 1][j], ll[i][j - 1]);
          }
        }
      }
      return ll[mm][nn];
    }
    /** 校验规则 */
    const isLessOneCharDifferent = (str1, str2, num) => {
      if (str1 === str2) {
        return true;
      } else if (str1.length === str2.length) {
        let diffCount = 0;
        for (let i = 0; i < str1.length; i++) {
          if (str1[i] !== str2[i]) {
            diffCount++;
            // 如果不同字符的数量超过num，直接返回false
            if (diffCount > num) {
              return false;
            }
          }
        }
        return true;
      } else if (Math.abs(str1.length - str2.length) > num) {
        return false;
      }
      const mostCommonStrLen = lcs(str1, str2);
      if (
        mostCommonStrLen === str1.length ||
        mostCommonStrLen === str2.length
      ) {
        return true;
      }
      return false;
    };
    const nameValidator = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入活动名称"));
      } else if (
        !isLessOneCharDifferent(
          this.ruleForm.name,
          this.ruleFormComparison.name,
          5
        )
      ) {
        callback(new Error("只能修改5个"));
      }
    };
    return {
      select: "",
      input3: "",
      dialogVisible: false,
      groupModel: "",
      listData: [
        {
          id: 1,
          name: "天天开心哈哈哈",
        },
        {
          id: 2,
          name: "小明123",
        },
        {
          id: 3,
          name: "天天开心哈哈哈",
        },
        {
          id: 4,
          name: "天天开心哈哈哈",
        },
        {
          id: 5,
          name: "天天开心哈哈哈",
        },
      ],
      ruleFormComparison: {
        name: "我要挣钱10000000",
        region: "",
      },
      ruleForm: {
        name: "我要挣钱10000000",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { validator: nameValidator },
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    isHighlight(word) {
      const res = this.input3.includes(word);
      return res ? "highlight" : "";
    },
    async getAxiosFun(keyword) {
      let controller = null; // 存储当前请求的控制器
      if (controller) {
        controller.abort();
        console.log("取消上次请求:", keyword);
      }

      // 创建新的 AbortController
      controller = new AbortController();
      try {

        /**
         * 1.获取模拟的博客文章数据 https://jsonplaceholder.typicode.com/posts
         * 2.获取柏林（经纬度）的实时气温 https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m
         * 3.生成随机用户信息（姓名、邮箱、头像等）:https://randomuser.me/api/
         * */ 
        const response = await axios.get("https://randomuser.me/api/", {
          params: { q: keyword },
          signal: controller.signal, // 绑定取消信号
        });
        console.log("搜索结果:", response);
      } catch (err) {
        // 如果是取消导致的错误，忽略它
        if (axios.isCancel(err)) {
          console.log(`"${keyword}" 请求被取消`);
        } else {
          console.error("搜索出错:", err);
        }
      } finally {
        // 请求完成后释放 controller
        controller = null;
      }
    },
    clearAxiosFun() {},
  },
};
</script>
<style lang="less" scoped>
.dialog-dome .el-dialog {
  padding: 0;
}
.dialog-dome {
  .dialog-dome div.el-dialog__body {
    padding: 0;
  }
  .group-list {
    .group-radio {
      display: block;
      padding: 10px 5px;
      .highlight {
        color: #1e53a4;
        font-weight: bold;
      }
    }
  }
}
</style>