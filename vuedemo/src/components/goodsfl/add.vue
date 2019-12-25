<template>
  <div>
    <router-link :to="{'name':'goodsfllist'}" tag="h1">返回分类管理列表页</router-link>
    {{/** action:图片上传接口地址
    on-preview：点击文件列表中已上传的文件时 执行的函数
    on-remove： 点击文件列表中 删除 按钮是 执行的函数
    on-success 文件上传成功时的钩子
    */}}
    <el-form ref="form" label-width="80px">
      <!-- 分类名称 -->
      <el-form-item label="分类名称">
        <el-input v-model="name"></el-input>
      </el-form-item>
      <!-- 分类图标 -->
      <el-form-item label="分类图标">
        <el-upload
          class="upload-demo"
          action="http://127.0.0.1:3000/fileup"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :on-success="success"
          list-type="picture"
          name="picture"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <!-- 父级分类 -->
      <el-form-item label="父级分类">
        <el-cascader
          :options="options"
          v-model="pid"
          :props="{ checkStrictly: true }"
          :show-all-levels="false"
        ></el-cascader>
      </el-form-item>
      <!-- 添加按钮 -->
      <el-form-item>
        <el-button @click="add">添加</el-button>
      </el-form-item>
    </el-form>
    {{pid}}
  </div>
</template>

<script>
import treelist from "@/myjs/treelist.js";
export default {
  data() {
    return {
      pid: ["0"], //父级 分类id
      name: "", //分类名称
      fileList: [],
      imgurl: "", //分类图片地址
      options: [
        {
          value: "0",
          label: "一级分类"
        }
      ]
    };
  },

  mounted() {
    this.axios.get("/spflall").then(res => {
      //   console.log(res.data.info);
      let data = treelist(res.data.info, 0);
      this.options = [...this.options, ...data];
    });
  },

  methods: {
    handlePreview() {},
    handleRemove() {},
    // 图片上传成功
    success(response) {
      //   console.log(response);
      this.imgurl = response.imgurl;
    },
    // 添加 事件
    add() {
      //   console.log(this.pid.pop(), this.name, this.imgurl);
      // 调用接口 pid name imgsrc  传给 node  ..
      // node --- mongodb 中
      let pid = this.pid;
      //   console.log();
      this.axios
        .post("/spfladd", {
          title: this.name,
          imgurl: this.imgurl,
          pid: pid.pop()
        })
        .then(res => {
          if (res.data.err_code == 200) {
            alert("成功");
          } else {
            alert("失败");
          }
        });
    }
  }
};
</script>