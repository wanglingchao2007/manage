<template>
    <div> 
      <!-- 返回 -->
    <van-nav-bar
    title="订单"
    left-text="返回" 
    left-arrow
    @click-left="$router.go(-1)"  
    />
    <!-- 地址列表 -->
        <div class="address">
           <h3>姓名：张三 电话：1860000000</h3>
           <h3>北京市朝阳区</h3>
            <van-button style="width:100%" type="primary">其他地址</van-button>
        </div>
        
         <van-collapse v-model="activeNames">
            <van-collapse-item title="12-24" name="1">内容</van-collapse-item>
        </van-collapse>
         <!-- 订单详情 -->
         <van-card
            v-for="(v,i) in shopCarArr"
            :key="i"
            :num="v.num"
            :price="v.price"
            :desc="v.ggcan+'---'+v.ggval"
            :title="goodsname"
            :thumb="`${base.url}${v.imgurl}`"
        />
        <van-submit-bar :price="sumprice" button-text="去结算" @submit="onSubmit"/>
    </div>
</template>

<script>
import {mapState,mapGetters } from "vuex"
import base from "@/myconfig/base.js"
export default {
    data(){
        return{
            base,
            activeNames:["1"],
            list:[
                    // {
                    // id: '1',
                    // name: '张三',
                    // tel: '13000000000',
                    // address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室'
                    // },
                ]   
          }
     },
     computed: {
    ...mapState(["shopCarArr"]),
    ...mapGetters(["sumprice"])
  },
     methods:{
         onSubmit(){

         }
     }
}
</script>

<style lang="">
    .van-address-list{
        box-sizing: border-box;
        height:100%;
        padding:0;
    }
</style>