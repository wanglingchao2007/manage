<template>
  <div>
    <h1>我是角色列表</h1>
    <el-button @click="$router.push({'name':'jsadd'})">添加角色</el-button>
    <el-table :data="tableData" style="width: 100%" max-height="500">
      <el-table-column fixed prop="_id" label="id"></el-table-column>
      <el-table-column fixed prop="title" label="角色名"></el-table-column>

      <!-- 操作 删除 -->
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData,scope.row._id)"
            type="text"
            size="small"
          >移除</el-button>

          <el-button @click.native.prevent="editRow(scope.row._id)" type="text" size="small">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  mounted() {
    this.axios.get("/jslist").then(res => {
      if (res.data.err_code == 200) {
        this.tableData = res.data.info;
      }
    });
  },
  methods: {
    editRow(id) {
      // 跳转到 修改页面
      this.$router.push({ name: "jsedit", params: { id: id } });
    },
    deleteRow(index, row, id) {
      this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .get("/jsdel", {
              params: {
                id: id
              }
            })
            .then(res => {
              if (res.data.err_code == 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                row.splice(index, 1);
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>