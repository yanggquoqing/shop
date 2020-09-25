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

#### 12-项目-登录-引入提示框组件
> this.$message.warning(msg)

#### 13-项目-登录-登录成功-进入 home 组件
>登录成功 -> 来到home组件
1. js编程式导航this.$router.push({name:'home'})
2. App.vue router-view
3. 新建home组件
4.路由index.js 配置路由

#### 14-项目-登录-简化登录请求代码-async 和 await
>让异步代码ajax看起来像同步代码
1.找到异步操作有结果的代码 前面加await 同时接口异步操作的结果res
2. 找到距离异步操作有结果的代码最近的方法
```js
async handleLogin() {
      //希望将异步操作看起来像同步操作

     const res = await this.$http.post("login", this.formdata)
     const {
          data,
          meta: { msg, status }
        } = res.data;
        if (status === 200) {
           this.$router.push({name:'home'})
          this.$message.success(msg);
        } else {
          this.$message.warning(msg);
        }
}
```


#### 15-项目-登录-保存token
> 目的:如果用户没有登录 -> url直接来到home组件
> 在登录成功时 保存正确用户的token
```js
  localStorage.setItem('token',data.token)
```

#### 16-项目-首页 -布局容器-使用-样式调整
> 引入布局容器

#### 17-项目-首页 -头部-样式调整
> layout 布局
> 行 el-row
> 列 el-col
> 注意： 24 栏
#### 18-项目-首页 -头部-侧边栏 -导航组件 - 文档
> el-menu
1.router 开启路由器 true index值 == path值 
2.unique-opened 是否只保持一个子菜单的展开

#### 19-项目-首页 -头部-侧边栏-引入导航组件-调整
> 调整el-menu
> index值不能一样

#### 20-项目-首页 -进入首页的权限验证
> 如果没有登录过，就不能进入到home组件
```js
beforeCreate() {
    // 获取token
    const token = localStorage.getItem("token");
    // token 没有 -> 登录
    if (!token) {
      this.$router.push({ name: "login" });
    }
    // if token 有 -> 继续渲染组件
  }
```

#### 21-项目-首页 -头部-退出

```js
handleSignout() {
      //1.清除token
      localStorage.clear();
      // 2.提示
      this.$message.success("退出成功");
      // 3.来到登录组件
      this.$router.push({ name: "login" });
    }
```

#### 22-项目-首页 -合并分支-新建用户分支
1. 切到master
2. git merge dev-login 合并分支
3. push 
4. 新建 dev-users   git checkout -b 分支名

#### 23-项目-用户管理-用户列表-新建组件-路由配置
1. home.vue 开启了路由模式 index 值-> path值
2. home.vue main -> router-view
3. 新建users.vue
4. router/index.js 在home中children配置users的路由

### dya-08-重点

#### 01-项目-用户管理-用户列表-面包屑和搜索框
1. el-card 卡片 小容器
2. 面包屑
3. el-row>el-col>el-input+el-button
4. 调整样式

#### 02-项目-用户管理-用户列表-引入表格组件
> el-table(data数据源[])> el-table-column(label表头/prop=“数据”) > 字符串数据

#### 03-项目-用户管理-用户列表-表头处理
> 按照效果 调整了表头的数量和lable
> type="index" -> 该列的每个单元格的内容从1开始的序号

#### 04-项目-用户管理-用户列表-请求数据-设置请求头
1. created(){this.getUserList()}
2. methods:{getUserList(){发送请求}}
3. 接口文档中 除了登录之外的所有请求都需要进行授权 -> 设置请求头
4. 找axios中关于请求头设置的代码
```js
const AUTH_TOKEN = localStorage.getItem("token");
this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
```
5. 发送请求

#### 05-项目-用户管理-用户列表-渲染数据-一般数据
1.解构赋值 给this.useList = res.data.data.users
2.prop=""

#### 06-项目-用户管理-用户列表-渲染数据-日期处理格式
1. main.js 全局过滤器fmtdate
2.
2.1 prop="crate_time | fmtdate"不行
2.2 单元格的内容只能显示文本
```html
  <el-table-column>
    prop="create_time"
    lable="创建时间"
    {{crate_time | fmtdate}}
  </el-table-column>
```
2.3 需要给该内容外层加容器template
> 不同组件的数据不是共享，独立作用域
```html
  <el-table-column>
    prop="create_time"
    lable="创建时间"
    <template>
    {{crate_time | fmtdate}}
    </template>
  </el-table-column>
```
2.4 最终写法
> slot-scope 作用： 传值
> slot-scope 的值会自动去上一级找最外层标签el-table所绑定的数据userlist
> slot-scope="scope" 此时“scope”==userlist数组
> scope.row 是数组的每个对象
> scope.row.create_time我们要用的数据
```html
  <el-table-column>
    lable="创建时间"
    <template slot-scope="scope">
    {{scope.row.crate_time | fmtdate}}
    </template>
  </el-table-column>
```

#### 07-项目-用户管理-用户列表-渲染数据-用户状态开关
> el-switch v-model="bool"
```html
    <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.is_active" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
    </el-table-column>
```

#### 08-项目-用户管理-用户列表-渲染数据-操作
> 操作里面不是字符串
1.template容器 slot-scope="scope"
2. el-button
> size="mini" plain

#### 09-项目-用户管理-用户列表-分页组件-文档-引入
1. @size-change 每页显示条数变化时 触发
2. @current-change 当前页变化时 触发
3. current-page 设置当前页是第几页
4. page-sizes=[2,3,4,5] 每页多少条数据数组
5. page-size 设置显示多少条
6. total 总数

#### 10-项目-用户管理-用户列表-分页组件-配置数据
1. current-page="pagenum"
2. page-size=2
3. :total="total"

#### 11-项目-用户管理-用户列表-分页组件-分页请求
1. 每页显示条数改变时 -> this.pagesize = val -> this.getUserList()
2. 页面改变时 -> this.pagenumj = val -> this.getUserList()
> 希望当页条数改变时 从第一页开始显示 this.pagenum = 1 > currentpage=1


#### 12-项目-用户管理-用户列表-搜索用户
1. 点击搜索输入框绑定query v-model="query"
2.点击搜索按钮 发送请求

```html
<el-input @clear="loadUserList" clearable placeholder="请输入内容" v-model="query" class="inputSearch">
    <el-button @click="searchUser" slot="append" icon="el-icon-search"></el-button>
</el-input>
```

#### 13-项目-用户管理-用户列表-添加用户-显示对话框
1. 引入对话框  el-form
2. 点击添加用户的按钮  显示对话框 this.dialogFormVisibleAdd = true
3. 配置对对话框
3.1 :model=form:
3.2 dialogFormVisibleAdd: false
3.3 el-form e-input v-model="form.xxx"

#### 14-项目-用户管理-用户列表-添加用户-发送请求
1. post this.form
2. 关闭对话框
3. 清空文本框
4. 更新试图
5. 提示框
> post status === 201

#### 15-项目-用户管理-用户列表-添加用户-处理响应

#### 16-项目-用户管理-用户列表-删除用户-打开对话框
> this.$confirm().then().catch()
1. 点击确定 -》 .then 的参数
2. 点击取消 -》 .catch的参数

#### 17-项目-用户管理-用户列表-删除用户-处理响应
1. 点击确定 -》 发送delete 请求
1.1 提示
1.2 更新数据
1.3 回到第一页

#### 18-项目-用户管理-用户列表-编辑用户-显示对话框
> 点击操作中的编辑按钮，打开编辑对话框
1. 找到编辑按钮@click
2. 打开对话框
3. 把之前添加对话框进行复制 - 修改
> form用的是之前添加用户的form


#### 19-项目-用户管理-用户列表-编辑用户-显示编辑数据
1. 点击edit编辑按钮 scope.row
2. showEditUserDia方法中 this.form = user user其实是scope.row
> 用户名 禁用

#### 19-项目-用户管理-用户列表-编辑用户-发送请求

1. 找到对话框的确定按钮  -》 editUser() -> 发送请求
> this.form = user
> id -> this.form.id
> 先点击编辑，再点击添加 -> 添加对话框中，清空form数据

#### 20-项目-用户管理-用户列表-修改用户状态
1. 找到开关 @change="changeMgState(scope.row)"
2. changeMgState()发送请求
> users/:uid/state/:type uid用户id 

#### 21-项目-用户管理-用户列表-分配角色-功能演示
1. 点击按钮  -》打开对话框
2. 对话框 中有 下拉框
3. 修改当前用户的角色
4. 5个角色名来源于请求
>  每个角色的权限是不同的

#### 22-项目-用户管理-用户列表-分配角色-显示对话框
1. 点击操作中的按钮 -> 打开对话框
2. 引入对话框（有下拉框）
> 下拉框的特性： 如果select绑定的数据的值和option的value值一样，此时显示的是改option的lable值
3. 吧option分成了两类 请选择(-1) 和 v-for 遍历 option
4. data 提供了el-select 的v-model所绑定的数据 currRoleId = -1
#### 23-项目-用户管理-用户列表-分配角色-显示对话框-下拉框
> el-select 和el-option
1.当改变lable时 -> 该lable显示 -> 改变了value -> el-select v-model绑定的数据 ，自动关联

#### 24-项目-用户管理-用户列表-分配角色--显示当前用户角色
1. 通过请求获取所有角色 roles
2. v-for el-option :lable="item.roleName" :value="item.id"
3. 通过请求获取当前用户的rid
4. 给el-select 中 v-model绑定的数据赋值 this.curRoleId = res.data.data.rid
> rid接口文档中的参数名是role_id

#### 25-项目-用户管理-用户列表-分配角色--修改用户角色
1. 通过试图操作-》 修改了lable -> value值变化 -> el-select v-model绑定的数据变化
2. curRoleId
> 在setRole方法中使用用户Id