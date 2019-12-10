<template>
  <div>
    <!-- <h1>我是所有权限的 表格</h1> -->
    <el-button @click="$router.push({'name':'qxgladd'})">添加权限</el-button>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" max-height="500">
      <el-table-column fixed prop="_id" label="id"></el-table-column>
      <el-table-column fixed prop="title" label="标题"></el-table-column>
      <el-table-column fixed prop="name" label="路由name"></el-table-column>
      <el-table-column fixed prop="pid" label="父权限id"></el-table-column>

      <!-- 操作 删除 -->
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData,scope.row._id)"
            type="text"
            size="small"
          >移除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  methods: {
    deleteRow(index, rows, id) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .get("/delquanxian", {
              params: {
                id: id
              }
            })
            .then(res => {
              if (res.data.err_code == 200) {
                // rows.splice(index, 1);
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.list();
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });

      // console.log(id);
    },
    list() {
      this.axios.get("/listquanxian").then(res => {
        this.tableData = res.data.info;
      });
    }
  },
  mounted() {
    this.list();
  },
  data() {
    return {
      tableData: [
        // {
        //   _id: "1",
        //   title: "统计",
        //   name: "",
        //   pid: 0
        // }
      ]
    };
  }
};
</script>