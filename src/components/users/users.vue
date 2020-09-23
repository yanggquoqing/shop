<template>
  <el-card class="box-card">
    <!-- 1.面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 2.搜索 -->
    <el-row class="searchRow">
      <el-col>
        <el-input placeholder="请输入内容" v-model="query" class="inputSearch">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 3.表格 -->
    <el-table :data="userlist" style="width: 100%">
      <el-table-column type="index" label="#" width="60"></el-table-column>
      <el-table-column prop="username" label="姓名" width="80"></el-table-column>
      <el-table-column prop="user_email" label="邮箱"></el-table-column>
      <el-table-column prop="user_tel" label="电话"></el-table-column>
      <!-- template 内部要用数据，设置slot-scope属性 该属性的值是要用数据create_time的数据源userList -->
      <el-table-column label="创建日期">
        <template slot-scope="userlist1">{{userlist1.row.create_time | fmtdate}}</template>
      </el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.is_active" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop label="操作">
        <template slot-scope="scope">
          <el-button size="mini" plain type="primary" icon="el-icon-edit" circle></el-button>
          <el-button size="mini" plain type="success" icon="el-icon-check" circle></el-button>
          <el-button size="mini" plain type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 4.分页 -->
  </el-card>
</template>
<script>
export default {
  name: "users",
  components: {},
  props: {},
  data() {
    return {
      query: "", //查询参数
      pagenum: 1, // 当前页
      pagesize: 2, //每页显示个数
      userlist: [], //表格绑定的数据
      total: -1, //分页相关数据
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    //获取用户列表的请求
    async getUserList() {
      // | 参数名   | 参数说明     | 备注     |
      // | -------- | ------------ | -------- |
      // | query    | 查询参数     | 可以为空 |
      // | pagenum  | 当前页码     | 不能为空 |
      // | pagesize | 每页显示条数 | 不能为空 |
      // 需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = await this.$http.get(
        'users?query=""&pagenum=1&pagesize=2'
        // "users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}"
      );
      console.log(res);
      const {
        meta: { status, msg },
        data: { users, total }
      } = res.data;
      if (status === 200) {
        //1.给表格数据复制
        this.userlist = users;
        // 2. 给total赋值
        this.total = total;
        // 3. 提示成功
        this.$message.success(msg);
      } else {
        //提示
        this.$message.warning(msg);
      }
    }
  }
};
</script>
<style scoped>
.box-card {
  height: 100%;
}
.inputSearch {
  width: 300px;
}
.searchRow {
  margin-top: 20px;
}
</style>