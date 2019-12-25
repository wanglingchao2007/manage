<template>
  <div>
    <!-- <h1>我是所有权限的 表格</h1> -->
    <el-button @click="$router.push({'name':'qxgladd'})">添加权限</el-button>
    <!-- 表格 -->

    <el-tree :data="tableData" :props="defaultProps" class="tree">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{data.title}}</span>
        <span>
          <el-button type="text" size="mini" @click="()=>del(data.id)">移除</el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
import treelist from "@/myjs/qxtree.js";
export default {
  methods: {
    list() {
      this.axios.get("/listquanxian").then(res => {
        this.tableData = treelist(res.data.info, 0);
        console.log(this.tableData);
      });
    },
    del(id) {
      // console.log(id);
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
                this.list();
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
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
  },
  mounted() {
    this.list();
  },
  data() {
    return {
      defaultProps: {
        id: "id",
        title: "title"
      },
      tableData: []
    };
  }
};
</script>

<style >
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.tree {
  width: 60%;
}
.el-tree-node__content {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 50px;
  cursor: pointer;
}
</style>