<template>
    <div class="pages_padding_12">
        <tableCompone
        :tablePagesData="tablePagesData"/>
    </div>
</template>
<script>
import tableCompone from './components/table/table-components'
export default {
  data() {
    return {
      tablePagesData: {
        // 这个里面全部写表头的配置项
        labesArr: [
          { lable: 'input', labelText: '序号', wdith: 100, type: 'selection' },
          { lable: 'input', labelText: '校区代码', wdith: 100, type: '' },
          { lable: 'input', labelText: '校区名称', wdith: 100, type: '' },
          { lable: 'input', labelText: '校区地址', wdith: 100, type: '' },
          { lable: 'input', labelText: '负责人', wdith: 100, type: '' },
          { lable: 'input', labelText: '联系方式', wdith: 100, type: '' },
          { lable: 'input', labelText: '电子邮箱', wdith: 100, type: '' },
          { lable: 'input', labelText: '操作', wdith: 100, type: '' }
        ],
        datas: [
          {
            serial: 0,
            schoolCode: '0',
            studentNmae: '王八屯',
            studentAddres: '王八路',
            functionary: '陈剑',
            concartPhone: '1111',
            email: '2222',
            width: 100
          },
          {
            serial: 1,
            schoolCode: '0',
            studentNmae: '王八屯',
            studentAddres: '王八路',
            functionary: '陈剑',
            concartPhone: '1111',
            email: '2222',
            width: 100
          },
          {
            serial: 2,
            schoolCode: '0',
            studentNmae: '王八屯',
            studentAddres: '王八路',
            functionary: '陈剑',
            concartPhone: '1111',
            email: '2222',
            width: 100
          },
          {
            serial: 3,
            schoolCode: '0',
            studentNmae: '王八屯',
            studentAddres: '王八路',
            functionary: '陈剑',
            concartPhone: '1111',
            email: '2222',
            width: 100
          }
        ]
      }
    }
  },
  components: {
    tableCompone
  },
  methods: {}
}
</script>

