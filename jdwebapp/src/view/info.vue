<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="标题" left-text="返回" left-arrow @click-left="left()" @click-right="right()">
      <van-icon name="search" slot="right" />
    </van-nav-bar>

    <!-- 轮播 -->
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="v in info.fileList" :key="v.uid">
        <img :src="`${base.url}${v.name}`" alt style="width:100%" />
      </van-swipe-item>
    </van-swipe>
    <!-- 商品名  价格-->
    <p>商品名：{{info.goodsname}}</p>
    <p>商品价格：{{info.price}}</p>
    <!-- 商品规格 -->
    <div v-if="ggarr.length>0">
      <div>
        <van-button
          v-for="(v,i) in ggarr"
          :key="v._id"
          @click="btn1(i)"
          :type="{info:i==btn1index,default:i!=btn1index}"
        >{{v.name}}</van-button>
      </div>
      <div>
        <van-button
          v-for="(v,i) in can"
          :key="i"
          @click="btn2(i,v.price)"
          :type="{primary:i==btn2index,default:i!=btn2index}"
        >{{v.name}}</van-button>
      </div>
    </div>
    <!-- 商品详情 -->
    <div>
      <h1>商品详情</h1>
      <div v-html="info.goodsinfo" class="info"></div>
    </div>
    <!-- 加入购物车 -->

    <van-goods-action>
      <van-goods-action-icon icon="cart-o" text="购物车" info="5" />
      <van-goods-action-button type="warning" text="加入购物车" @click="gocar()" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>
<script>
import base from "@/myconfig/base.js";
export default {
  data() {
    return {
      base,
      actions: "",
      x: true,
      info: {},
      ggarr: [],
      can: [],
      btn1index: 0,
      btn2index: 0
    };
  },
  mounted() {
    // console.log(this.$route.params.id);
    let id = this.$route.params.id;
    this.axios.get(`${base.url}/infobygoodsid?id=${id}`).then(res => {
      console.log(res.data.info);
      this.info = res.data.info;
      this.ggarr = res.data.info.ggarr;
    });
  },
  methods: {
    //规格
    btn1(i) {
      this.btn1index = i;
      this.btn2index = 0;
      this.can = this.ggarr[i].can;
      console.log(this.can);
    },
    btn2(i, price) {
      this.btn2index = i;
      this.info.price = price;
    },
    //左侧返回按钮
    left() {
      // alert("zuo");
      this.$router.go(-1);
    },
    //右侧搜索按钮
    right() {
      // alert("you");
      this.$router.push({ name: "search" });
    },
    gocar() {
      // alert("加入购物车");
      // _id , goodsname,price ,规格，
      // console.log("商品id", this.info._id);
      // console.log("商品名", this.info.goodsname);
      // console.log("商品价格", this.info.price);
      // console.log(
      //   "商品规格",
      //   this.info.ggarr[this.btn1index].name,
      //   this.info.ggarr[this.btn1index].can[this.btn2index].name
      // );
      let obj = {
        _id: this.info._id,
        goodsname: this.info.goodsname,
        price: this.info.price,
        imgurl: this.info.imageUrl,
        ggcan: this.ggarr.length > 0 ? this.ggarr[this.btn1index].name : "",
        ggval: this.ggarr.length > 0 ? this.can[this.btn2index].name : ""
      };
      this.$store.commit("add", obj);
      this.$router.push({ name: "shopcar" });
    }
  }
};
</script>

<style lang="">
.active {
  color: red;
}
.info img {
  width: 100%;
}
</style>