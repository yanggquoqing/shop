#### 04-项目-准备-element-ui-安装-引入
> npm i element-ui -s
> 在main.js import
> Vue.use(Element)

#### 05-项目-备注-项目模板简化-调整
>删除模板中我们用不到的文件/代码

#### 06-项目-准备-git 版本控制
>git/svn
1. git init ->.git
2. git status
3. git add .
4. git commit -m "注释"
5. 在代码托管平台(github)新建远程仓库
6. git remote add origin https://github.com/ll/xiangmu.git
7. git push -u origin master(之后再push直接git push)

#### 07-项目-登录-新建分支-login组件-配置路由
>新建分支 专门写登录功能
>git branch     (查看有那些分支)
>git checkout -b 分支名  (新建分支)
>新建组件+配置路由
>注意
1. commit每完成一个小功能就commit一次
2. push操作master完成

#### 08-项目-登录-引入表单控件
>el-form
1.引入
2.调整标签(h2+el-button)
>lable-position="top"

#### 09-项目-登录-样式调整
>height:100%
>注意： div#app height 100%

#### 10-项目-登录-axios插件
> axios不是Vue插件  --Vue.use(axios)
```js
import axios from 'axios'
const MyHttpServer ={}
MyHttpServer.install =  (Vue)=>  { 
  // 4. 添加实例方法
  Vue.prototype.$http = axios
}
export default MyHttpServer
```
> 在main.js中 导入之后Vue.use(插件名)
> 结果： this.$http.get('')

#### 11-项目-登录-发送登录请求
>login.vue methods handleLogin()
1. this.$http.post('login',this.formdata).then((res)=>{})
2. 对象解构赋值 res.data
```js
const {
          data,meta:{msg,status}
        } =res.data;
```

#### 11-项目-登录-引入提示框组件
> this.$message.warning(msg)