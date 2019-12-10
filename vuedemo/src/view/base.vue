<template>
  <div class="base">
    <el-container>
      <el-header>
        <h1>渠道商商品管理系统</h1>
        <el-button @click="loginout()">{{adminname}} 退出</el-button>
      </el-header>
      <el-container class="content">
        <!-- 左侧导航 -->
        <el-aside width="200px">
          <el-menu default-active="2" class="el-menu-vertical-demo">
            <!-- 统计 -->
            <el-submenu v-for="(v,i) in leftlist" :index="(i+1).toString()" :key="i">
              <template slot="title">
                <i class="el-icon-orange"></i>
                <span>{{v.title}}</span>
              </template>

              <el-menu-item-group>
                <el-menu-item
                  :index="`${i+1}-${i2+1}`"
                  v-for="(v2,i2) in v.children"
                  :key="`${i}-${i2}`"
                  @click="$router.push({'name':v2.name})"
                >{{v2.title}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>

        <!-- 右侧主体 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      left: [],
      adminname: ""
    };
  },
  methods: {
    loginout() {
      // 清除 本地储存中的 token
      localStorage.removeItem("houtaitoken");
      // 跳转到 登录页面
      this.$router.push({ name: "login" });
    },
    treelist(info, pid) {
      var data = [];
      for (let i in info) {
        if (info[i].pid == pid) {
          var x = {
            ...info[i],
            children: this.treelist(info, info[i]._id)
          };
          // 如果 没有子权限 -- 删除 children 属性
          if (x.children.length == 0) {
            delete x.children;
          }
          data.push(x);
          // console.log(data);
        }
      }
      // console.log(data);
      return data;
    }
  },
  mounted() {
    // 请求 所有权限 -- 渲染到 左侧 导航
    // this.axios.get("/listquanxian").then(res => {
    //   // console.log(res.data);
    //   this.left = res.data.info;
    // });

    // 根据管理员 id  查找对应权限 --渲染到左侧导航
    this.axios
      .get("/adminqx", {
        params: {
          id: JSON.parse(localStorage.getItem("houtaitoken")).id
        }
      })
      .then(res => {
        this.left = res.data.qxarr;
        this.adminname = res.data.name;
      });
  },
  computed: {
    leftlist() {
      return this.treelist(this.left, 0);
    }
  }
};
</script>
<style lang="">
* {
  margin: 0;
  padding: 0;
}
.base {
  background: #ebebec;
}
.content {
  margin-top: 20px;
}
.el-header {
  display: flex;
  justify-content: space-around;
  background: #f7f7f7;
  align-items: center;
}
.el-aside {
  margin-left: 10px;
  margin-right: 10px;
  height: 100vh;

  background: #f7f7f7;
  overflow: auto;
}
.el-main {
  height: 100vh;
  background: #f7f7f7;
  overflow: auto;
  margin-right: 10px;
}
</style>