<template>
  <div>
    <h1>添加角色</h1>
    <el-form ref="form" label-width="100px">
      <el-form-item label="角色名">
        <el-input v-model="title"></el-input>
      </el-form-item>
      <el-form-item label="权限">
        <div class="block">
          <el-cascader :options="options" v-model="value" :props="props" collapse-tags clearable></el-cascader>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="add">添加</el-button>
      </el-form-item>
    </el-form>
    {{title}}
    {{value}}
    <!-- {{Array.from(new Set(value.flat(Infinity))) }} -->
  </div>
</template>

<script>
import treelist from "@/myjs/treelist.js";
export default {
  data() {
    return {
      title: "",
      props: { multiple: true, checkStrictly: true },
      value: [],
      options: []
    };
  },

  mounted() {
    // 请求 所有的权限 -- 处理数据为 { .... children:[]}
    this.axios.get("/listquanxian").then(res => {
      // 处理数据为 { .... children:[]}
      this.options = treelist(res.data.info, 0);
    });
  },
  methods: {
    add() {
      let obj = {
        title: this.title,
        // qxid: Array.from(new Set(this.value.flat(Infinity)))
        qxid: this.value
      };
      // console.log(obj);
      // 将 obj 通过 ajax  传递给 node
      this.axios.post("/jsadd", obj).then(res => {
        if (res.data.err_code == 200) {
          // alert("添加成功");
          // 跳转到 角色列表
          this.$router.push({ name: "jslist" });
        } else {
          alert("添加失败");
          // 清空表单数据
          this.title = "";
          this.value = "";
        }
      });
      // node --- obj  ---mongodb
    }
  }
};
</script>