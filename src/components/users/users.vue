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
        <el-input
          @clear="loadUserList"
          clearable
          placeholder="请输入内容"
          v-model="queryInfo.query"
          class="inputSearch"
        >
          <el-button
            @click="searchUser"
            slot="append"
            icon="el-icon-search"
          ></el-button>
        </el-input>
        <el-button type="success" @click="showAddUserDia">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 3.表格 -->
    <el-table :data="userlist" style="width: 100%">
      <el-table-column type="index" label="#" width="60"></el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="80"
      ></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <!-- template 内部要用数据，设置slot-scope属性 该属性的值是要用数据create_time的数据源userList -->
      <el-table-column label="创建日期">
        <template slot-scope="scope">{{
          scope.row.create_time | fmtdate
        }}</template>
      </el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch
            @change="changeMgState(scope.row)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop label="操作">
        <template slot-scope="scope">
          <el-button
            @click="showEditUserDia(scope.row)"
            size="mini"
            plain
            type="primary"
            icon="el-icon-edit"
            circle
          ></el-button>
          <el-button
            @click="showSetUserRoleDia(scope.row)"
            size="mini"
            plain
            type="success"
            icon="el-icon-check"
            circle
          ></el-button>
          <el-button
            @click="showDeleUserMsgBox(scope.row.id)"
            size="mini"
            plain
            type="danger"
            icon="el-icon-delete"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 4.分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 对话框 -->
    <!-- 添加用户的对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密 码" label-width="100px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮 箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电 话" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户的对话框 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          <el-input
            disabled
            v-model="form.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮 箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电 话" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色的对话框 -->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRol">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          {{ currUsername }}
        </el-form-item>
        <el-form-item label="角色" label-width="100px">
          <el-select v-model="currRoleId">
            <el-option label="请选择" :value="-1"></el-option>
            <el-option
              v-for="(item, index) in roles"
              :key="index"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRol = false">取 消</el-button>
        <el-button type="primary" @click="setRole">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>
<script>
export default {
  name: "users",
  components: {},
  props: {},
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 5
      },
      userlist: [], //表格绑定的数据
      total: -1, //分页相关数据
      dialogFormVisibleAdd: false, //添加对话框属性
      dialogFormVisibleEdit: false, //编辑对话框属性
      dialogFormVisibleRol: false,
      // 添加用户的表单数据
      form: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      //分配角色
      curUserId: -1,
      currRoleId: -1,
      currUsername: "",
      roles: []
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async setRole() {
      const res = await this.$http.put(`users/${this.curUserId}/role`, {
        rid: this.currRoleId
      });
      console.log(res);
      this.dialogFormVisibleRol = false;
    },
    //分配角色
    async showSetUserRoleDia(user) {
      this.curUserId = user.id;
      this.currUsername = user.username;
      //获取所有的角色
      const res1 = await this.$http.get(`roles`);
      this.roles = res1.data.data;
      //获取当前用户的角色id
      const res = await this.$http.get(`users/${user.id}`);
      this.currRoleId = res.data.data.rid;
      this.dialogFormVisibleRol = true;
    },

    // 修改状态
    async changeMgState(user) {
      //发送请求
      const res = await this.$http.put(
        `users/${user.id}/state/${user.mg_state}`
      );
    },
    // 编辑数据 -发送请求
    async editUser() {
      const res = await this.$http.put(`users/${this.form.id}`, this.form);
      // 关闭对话框
      this.dialogFormVisibleEdit = false;
      // 更新试图
      this.getUserList();
    },
    //编辑数据
    showEditUserDia(user) {
      this.form = user;
      //console.log(this.form);
      this.dialogFormVisibleEdit = true;
    },
    //删除数据
    showDeleUserMsgBox(userid) {
      {
        this.$confirm("删除用户?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            //发送删除的请求
            const res = await this.$http.delete(`users/${userid}`);
            if (res.data.meta.status === 200) {
              this.pagenum = 1;
              // 更新试图
              this.getUserList();
              this.$message({
                type: "success",
                message: res.data.meta.msg
              });
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: res.data.meta.msg
            });
          });
      }
    },
    async addUser() {
      // 关闭对话框
      this.dialogFormVisibleAdd = false;
      const res = await this.$http.post("users", this.form);
      console.log(res);
      const {
        meta: { status, msg },
        data
      } = res.data;
      if (status === 201) {
        //提示成功
        this.$message.success(msg);
        // 更新试图
        this.getUserList();
        // 清空文本框
        this.form = {};
      } else {
        this.$message.warning(msg);
      }
    },
    //添加用户
    showAddUserDia() {
      this.form = {};
      this.dialogFormVisibleAdd = true;
    },
    //清空搜索框
    loadUserList() {
      this.getUserList();
    },
    //搜索用户
    searchUser() {
      this.getUserList();
    },

    //分页方法
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.queryInfo.pagesize = val;
      this.getUserList();
    },
    //分页方法
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.queryInfo.pagenum = val;
      this.getUserList();
    },
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
        "users",
        { params: this.queryInfo }
        //'users?query=""&pagenum=1&pagesize=10'
        // "users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}"
      );
      // console.log(res);
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
        // this.$message.success(msg);
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