<template>
  <div>
    <van-card
      v-for="v in searcharr"
      :key="v._id"
      :price="v.price"
      :title="v.goodsname"
      :thumb="`${base.url}${v.imageUrl}`"
       @click="goinfo(v._id)"
    />
    <router-link :to="{name:'search'}" v-if="searcharr.length==0">没有找到相关商品，重新搜索</router-link>
  </div>
</template>

<script>
import base from "@/myconfig/base.js";
export default {
  data() {
    return {
      base,
      searcharr: []
    };
  },
  mounted() {
    // console.log(this.$route.params.goodsname);
    this.axios
      .get(`${base.url}/searchgoodsname`, {
        params: {
          goodsname: this.$route.params.goodsname
        }
      })
      .then(res => {
        this.searcharr = res.data.info;
      });
  },
  methods:{
    goinfo(id){
        this.$router.push({name:"info",params:{id:id}})
    }
  }
};
</script>