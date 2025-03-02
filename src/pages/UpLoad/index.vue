<template>
    <div>
        <h1>upload下载</h1>
        <!-- 1.线上的路径地址  2.二进制文件【dataURL => base64】 -->
        <vueofficeExcel v-if="excelSrc" :src="excelSrc" style="height:500px"></vueofficeExcel>
        <button @click="createExcel">创建</button>
        <input type="file" @change="change" />
        <button @click="loadExcel">加载</button>
        <button @click="loadExcelMN">模拟线上返回的data类型的数据</button>
        <div class="excel-content" v-html="excelHTML"></div>
        <table ref="excelTable" border class="tableStyle">
            <tr>
                <td>姓名</td>
                <td>学号</td>
                <td>平均分</td>
            </tr>
            <tr>
                <td>张三</td>
                <td>100</td>
                <td>99</td>
            </tr>
            <tr>
                <td>张思</td>
                <td>200</td>
                <td>99</td>
            </tr>
            <tr>
                <td>张武</td>
                <td>300</td>
                <td>99</td>
            </tr>
        </table>
    </div>
</template>

<script>
// 1.本地选择 ==》 读取为前端html和数据对象
// 2，请求 ==》读取为前端hrml和数据对象
// 1.把前端的一个table dom转化为excel
// 2.把前端的一个对象转化为excel
import axios from 'axios'

import vueofficeExcel from "@vue-office/excel"
import "@vue-office/excel/lib/index.css"
import { read, writeFile, utils } from "xlsx";
// import s from 'public/excel/huarun.xlsx'

export default {
    data() {
        return {
            excelHTML: '',
            excelSrc: '', 
            // excelSrc: '/excel/huarun.xlsx', // 访问public文件夹里面的/excel/huarun.xlsx文件
            fileData: ''
        }
    },
    components: {
        vueofficeExcel
    },
    methods: {
        loadExcelMN() {
            if (!this.fileData) {
                this.$message.error('请先上传xlsx')
                return
            }
            const fr = new FileReader(); // 读取文档流
            fr.readAsDataURL(this.fileData); // 转为base64
            fr.onload = (res => {
                console.log("res =============>", res);
                this.excelSrc = res.target.result;
            })
        },
        loadExcel() {
            // 地址
            axios.get("http://localhost:8080/download", {
                responseType: "blob"
            }).then(res => {
                res.data.arrayBuffer.then(res => {
                    const wb = read(res);
                    const sheet1 = wb.Sheets.sheet1 // 取第一张表
                    const _data =  utils.sheet_to_json(sheet1); // 把excel读取为一个json
                    this.excelHTML =  utils.sheet_to_html(sheet1); 
                })
            })
        },
        createExcel() {
            let data = [
                {name: '张三', id: 100, score: 99},
                {name: '张思', id: 200, score: 99},
                {name: '张武', id: 300, score: 99}
            ];
            // 转化data数据
            const ws = utils.json_to_sheet(data);
            // console.log("ws=====>", ws);
            const wb = utils.book_new();
            // console.log("wb=====>", wb);
            utils.book_append_sheet(wb, ws, 'people');
            writeFile(wb, "test1.xlsx")

            // 转化table dom数据
            const tableDom = this.$refs.excelTable;
            const tableWs = utils.table_to_sheet(tableDom);
            const wb2 = utils.book_new();
            utils.book_append_sheet(wb2, tableWs, 'sheet1');
            writeFile(wb2, 'tableTest.xlsx')
        }, 
        change(e) {
            let _file = e.target.files[0];
            this.fileData = _file;
            _file.arrayBuffer().then(res => {
                // console.log("res==============>", res);
                const wb = read(res);
                // console.log("wb===========>", wb);
                const sheet1 = wb.Sheets.sheet1 // 取第一张表
                const _data =  utils.sheet_to_json(sheet1); // 把excel读取为一个json
                // console.log("_data===========>", _data);
                this.excelHTML =  utils.sheet_to_html(sheet1); // 把excel读取为一个html代码片段
            })
        }
    }

}
</script>
<style lang="less">
.excel-content table {
    border-collapse: collapse
}
.excel-content td {
    border: 1px solid black;
}
.tableStyle {
    text-align: center;
    margin-top: 20px;
}
</style>
