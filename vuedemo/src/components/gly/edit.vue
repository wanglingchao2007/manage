<template>
  <div>
    <h1>修改管理员</h1>
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
        <el-button @click="edit">修改</el-button>
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
    // 所有角色
    this.axios.get("/jslist").then(res => {
      if (res.data.err_code == 200) {
        this.options = res.data.info;
      }
    });
    // 修改 默认数据 --请求接口 -- id
    this.axios
      .get("/glyidinfo", {
        params: {
          id: this.$route.params.id
        }
      })
      .then(res => {
        if (res.data.err_code == 200) {
          this.admin = res.data.info.name;
          this.password = res.data.info.password;
          this.value = res.data.info.jsid;
        }
      });
  },
  methods: {
    edit() {
      //   console.log(this.$route.params.id, this.admin, this.password, this.value);
      this.axios
        .post("/glyedit", {
          id: this.$route.params.id,
          admin: this.admin,
          password: this.password,
          jsid: this.value
        })
        .then(res => {
          if (res.data.err_code == 200) {
            this.$router.push({ name: "glylist" });
          } else {
            alert("修改失败");
          }
        });
    }
  }
};
</script>