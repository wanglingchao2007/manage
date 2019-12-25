<template>
  <div class="gg-box">
    <!-- 左边规格名 -->
    <div class="gg-left">
      <p>规格名</p>
      <div class="gg-left-name">
        <el-button type="warning" @click="delggarr(ggarrindex)">删除</el-button>
        <el-input v-model="ggArrItem.name"></el-input>
      </div>
      
    </div>
    <!-- 中间 分割线 -->
    <div class="gg-middle"></div>
    <!-- 右边 规格参数价格 -->
    <div class="gg-right">
      <!-- 标题 -->
      <div class="gg-right-title">
        <p>参数名</p>
        <p>对应价格</p>
      </div>
      <!-- 每一项参数  组件-->
      <gg-box-item v-for="(v,i) in ggArrItem.can" :key="i" :canItem="v" :canindex="i" :ggarrindex="ggarrindex"></gg-box-item>

      <!-- 新增一项参数 -->
      <el-button type="primary"
      @click="addggarrcan({
        'ggarrindex':ggarrindex,
        'canobj':{'name':'','price':''}
      })">新增参数</el-button>
    </div>
  </div>
</template>
<script>
// 载入 ggBoxItem 组件 并渲染
import ggBoxItem from "@/components/sp/gg-box-item";
import {mapMutations} from "vuex"
// 接受 props 传值
export default {
  props: ["ggArrItem","ggarrindex"],
  components: {
    ggBoxItem
  },
  methods:{
    ...mapMutations(['delggarr','addggarrcan'])
  }
};
</script>

<style lang="">
  .gg-left-name{
    display:flex;
  }
</style>