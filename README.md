
### 目录结构
```bash
├─src            // 机器人主ts代码 文件地址example/demo1/dist
│      index     // 入口文件
│      ultil     // 公共函数文件  这里的内容可以继续细分 看文件
│ 
├─example         // 预览测试文件
│      dist       // rollup打包后的机器人js代码目录
│      vue        // 预览效果目录文件
│ 
├─test            // 测试用例 待补充
│  
├─.husky          // CZ提交规范 eslint规范
│     
└─其他配置          // 打包与配置文件
        
```

### 说明

原js文件可维护性，可阅读性极差。基于ts、使用rollup打包工具，配置cz,githooks自动代码规范检测，代码测试example用例，对核心代码重构,细节看代码结构，部分函数未优化
机器人核心代码在src目录,开启服务 npm run dev 修改代码自动同步更新打包到example/dist文件,打包js代码供预览页面调用
预览页面能简单响应式适配多端pc/m，细节样式还需优化
体验完整页面效果，建议同时开启src代码服务，以及页面预览服务

### 开启src代码运行环境
克隆仓库代码到本地
进入根目录，安装依赖

#### 安装
```shell
# 安装依赖
yarn install
# dev预览
npm run dev    --- 其他命令查看scrpit内容
```
### 开启demo预览运行环境
-页面预览地址：进入example/demo目录安装依赖
#### 安装
```shell
# 安装依赖
yarn install
# dev预览
npm run dev  --- 测试环境预览 其他命令查看scrpit内容
```
### 页面效果
#### M页面效果
![Image text](https://github.com/STWS-orz/chatbot/blob/main/example/demo1/public/m-effect.png)
#### PC页面效果
![Image text](https://github.com/STWS-orz/chatbot/blob/main/example/demo1/public/pc-effect.png)
