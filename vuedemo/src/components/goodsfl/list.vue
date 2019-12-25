<template>
  <div>
    <el-button @click="$router.push({'name':'goodsfladd'})">添加分类</el-button>
    <h1>商品分类列表</h1>

    <el-tree
      :data="info"
      :props="defaultProps"
      @node-click="handleNodeClick"
      class="tree"
      :indent="50"
    >
      <div class="custom-tree-node" slot-scope="{ node, data }">
        <img :src="`http://127.0.0.1:3000/${data.imgurl}`" alt />
        <span>{{ node.label }}</span>
        <span>
          <el-button type="text" size="mini" @click="() => remove(node, data)">删除</el-button>
          <el-button type="text" size="mini" @click="() => edit(node, data)">修改</el-button>
        </span>
      </div>
    </el-tree>
  </div>
</template>

<script>
import treelist from "@/myjs/fltree";
export default {
  data() {
    return {
      info: [],
      defaultProps: {
        children: "children",
        label: "label",
        value: "value",
        imgurl: "imgurl"
      }
    };
  },
  mounted() {
    // 请求所有商品分类 --- {,,children:[]}
    this.axios.get("/spflall").then(res => {
      if (res.data.err_code == 200) {
        this.info = treelist(res.data.info, 0);
        console.log(treelist(res.data.info, 0));
      }
    });
  },
  methods: {
    handleNodeClick(data) {
      // console.log("点击文字", data);
    },
    remove(node, data) {
      // console.log("删除", node, data);
    },
    edit(node, data) {
      // console.log("修改", node, data);
    }
  }
};
</script>

<style lang="">
.tree {
  width: 60%;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  padding-right: 20px;
}
.el-tree-node__content {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 100px;
  cursor: pointer;
}
.custom-tree-node > img {
  width: 50px;
  height: 50px;
}
</style>