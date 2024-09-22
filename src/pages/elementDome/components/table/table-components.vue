<template>

  <div>

    <el-table
      ref="multipleTable"
      :data="dataTables"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column
        v-for="(item, index) in dataLable"
        :key="index"
        :label="item.label"
        :width="item.width"
      >
        <template slot-scope="scope">
            <div v-if="item.label=='input'">
                <el-input :label="item.labelText" v-model="item.studentNmae"></el-input>
                <!-- <el-input :label="item.labelText">{{ scope.row.studentNmae }}</el-input> -->
            </div>
          
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: {
    tablePagesData: Object
  },

  data() {
    return {
      multipleSelection: [],

      tableArr: [],

      dataTables: [],

      dataLable: []
    }
  },

  methods: {
    // 自定义事件

    changArr(row) {
      console.log(row, '我是子组件触发的事件!!')

      this.$emit('upArr', row)
    },

    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },

    handleSelectionChange(val) {
      console.log(val, '000')

      let arrs = val

      let ids = []

      arrs.forEach(item => {
        ids.push(item.date)
      })

      console.log(ids, '0')
    }
  },

  mounted() {
    this.dataTables = this.tablePagesData.datas //表格数据

    this.dataLable = this.tablePagesData.labesArr //表头数据
  }
}
</script>