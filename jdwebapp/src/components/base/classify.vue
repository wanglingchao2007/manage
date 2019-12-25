<template>
   <div class="classify">

      <div class="left">
       <van-sidebar v-model="activeKey" class="left">
      <van-sidebar-item
        v-for="(v,i) in classifyone"
        :key="i"
        :title="v.title"
        @click="getclassifytwo(v._id)"
      />      
        </van-sidebar> 
     </div>
    <div class="right">
       <van-grid :border="false" :column-num="3" class="right-grid">
        <van-grid-item class="item" v-for="v in classifytwo" :key="v._id" @click="golist(v._id)">
          <van-image :src="`${base.url}${v.imgurl}`" class="item-img" />
          <p>{{v.title}}</p>
        </van-grid-item>
      </van-grid>
     </div>
  </div>
</template>

<script>
import base from "@/myconfig/base.js";
export default {
    data(){
       return{
           base,
           activeKey:"",
           classifyone: [],
           classifytwo: []
       }
    },
    mounted() {
    // 请求一级分类数据 -- 渲染到左侧
    this.getclassifyone();
  },
  methods: {
    //一级分类
    getclassifyone() {
      this.axios.get(`${base.url}/misteclassify`).then(res => {
        console.log(res.data);
        if (res.data.code == 200) {
          this.classifyone = res.data.info;
          // 默认显示 第一个分类的 二级分类
          this.getclassifytwo(res.data.info[0]._id);
        } else {
          alert("服务器链接失败，查看网络是否链接");
        }
      });
    },
    // 根据一级分类id 找二级信息
    getclassifytwo(id) {
      // alert(id);
      this.axios.get(`${base.url}/classifytwo?id=${id}`).then(res => {
        if (res.data.code == 200) {
          this.classifytwo = res.data.info;
        } else {
          alert("服务器链接失败，查看网络是否链接");
        }
      });
    },
    //跳转到 商品列表
    golist(id) {
      alert(id);
    }
  }
}
</script>

<style lang="less">
    .classify{
        display: flex;
    }
    .left{
        height:100vh;       
        overflow-y:scroll;
    }
    .right{
        height:100vh;
        flex:1;
        overflow-y: scroll;
    }

</style>