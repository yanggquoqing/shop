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