<template>
  <div>
    <van-sticky>
      <!-- 返回 -->
      <van-nav-bar title="购物车" left-text="返回" left-arrow @click-left="$router.go(-1)" />
    </van-sticky>
    <van-card
      v-for="(v,i) in shopCarArr"
      :key="i"
      :num="v.num"
      :price="v.price"
      :desc="v.ggcan+'---'+v.ggval "
      :title="v.goodsname"
      :thumb="`${base.url}${v.imgurl}`"
    >
      <div slot="footer">
        <van-button size="mini">按钮+</van-button>
        <van-button size="mini">按钮-</van-button>
      </div>
    </van-card>

    <van-submit-bar :price="sumprice" button-text="提交订单" @submit="onorder" />
  </div>
</template>

<script>
import base from "@/myconfig/base.js";
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      base
    };
  },
  computed: {
    ...mapState(["shopCarArr"]),
    ...mapGetters(["sumprice"])
  },
  methods: {
    onorder() {
      this.$router.push({ name: "order" });
    }
  }
};
</script>