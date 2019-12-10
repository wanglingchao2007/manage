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
        <el-button @click="edit">确认修改</el-button>
      </el-form-item>
    </el-form>

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
    // 路由 id 请求 当前 角色数据 -- 表单默认值
    this.axios
      .get("/jsidinfo", {
        params: {
          id: this.$route.params.id
        }
      })
      .then(res => {
        if (res.data.err_code == 200) {
          //   console.log(res.data.info);
          this.title = res.data.info.title;
          this.value = res.data.info.qxid;
        }
      });
    ////////////
  },
  methods: {
    edit() {
      let obj = {
        id: this.$route.params.id,
        title: this.title,
        // qxid: Array.from(new Set(this.value.flat(Infinity)))
        qxid: this.value
      };
      this.axios.post("/jsedit", obj).then(res => {
        if (res.data.err_code == 200) {
          this.$router.push({ name: "jslist" });
        }
      });

      // console.log(obj);
      // 将 obj 通过 ajax  传递给 node

      // node --- obj  ---mongodb
    }
  }
};
</script>