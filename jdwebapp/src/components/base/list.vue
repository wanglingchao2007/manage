<template>
  <div>
    <van-card
      v-for="v in listarr"
      :key="v._id"
      :price="v.price"
      :title="v.goodsname"
      :thumb="`${base.url}${v.imageUrl}`"
      @click="goinfo(v._id)"
    />
  </div>
</template>

<script>
import base from "@/myconfig/base.js";
export default {
  data() {
    return {
      base,
      listarr: []
    };
  },
  mounted() {
    let classifyid = this.$route.params.classifyid;
    this.axios
      .get(`${base.url}/classifyidgoods`, {
        params: {
          classifyid: classifyid
        }
      })
      .then(res => {
        // console.log(res.data);
        this.listarr = res.data;
      });

    // console.log(classifyid); //
    // 根据 分类id 请求 分类下的商品
    // 首页 --分类 ---  一级分类
    // 分类页-- 分类 ---    二级分类
  },
  methods:{
    goinfo(id){
      this.$router.push({name:"info",params:{id:id}})
    }
  }
};
</script>