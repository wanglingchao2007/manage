<template>
  <div>
    <h1>添加管理员</h1>
    <el-form ref="form" label-width="100px">
      <el-form-item label="管理员名">
        <el-input v-model="admin"></el-input>
      </el-form-item>
      <el-form-item label="管理员密码">
        <el-input v-model="password"></el-input>
      </el-form-item>

      <el-form-item label="角色">
        <el-select v-model="value" placeholder="请选择">
          <el-option v-for="item in options" :key="item._id" :label="item.title" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="add">添加</el-button>
      </el-form-item>
    </el-form>
    {{value}}
  </div>
</template>

<script>
import treelist from "@/myjs/treelist.js";
export default {
  data() {
    return {
      admin: "",
      password: "",
      options: [],
      value: ""
    };
  },

  mounted() {
    this.axios.get("/jslist").then(res => {
      if (res.data.err_code == 200) {
        this.options = res.data.info;
      }
    });
  },
  methods: {
    add() {
      this.axios
        .post("/glyadd", {
          admin: this.admin,
          password: this.password,
          jsid: this.value
        })
        .then(res => {
          if (res.data.err_code == 200) {
            // alert("添加成功");
            this.$router.push({"name":"glylist"})
          }
        });
    }
  }
};
</script>