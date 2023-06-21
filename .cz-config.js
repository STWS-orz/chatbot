module.exports={
  //可选类型
  types:[
    {value:'feat',name:'✨feat:新功能'},
    {value:'fix',name:'🐛fix:修复'},
    {value:'docs',name:'📚docs:文档变更'},
    {value:'style',name:'💎style:代码格式(不影响代码运行的变动)'},
    {value:'refactor',name:'📦refactor:重构(既不是新增加feature,也不是修复bug)'},
    {value:'perf',name:'🚀perf:性能优化'},
    {value:'test',name:'🚨test:添加测试'},
    {value:'chore',name:'⚙️ chore:构建过程或辅助工具的变动'},
    {value:'revert',name:'🗑revert:回退'},
    {value:'build',name:'🛠build:打包'},
  ],
  //消息同步
  message:{
    type: '请选择提交类型',
    cusomScope: '请输入修改范围（可选）',
    subject: '请简要描述提交（必填）',
    boby: '请输入详细描述（可选）',
    footer: '请输入要关闭的issue(可选)',
    confirmCommit: '确认使用以上信息提交?(Y/N/E/H)',
  },
  //跳过问题
  skipQuestions:['boby','footer'],
  subjectLimit:72,
}
