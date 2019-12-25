<template>
    <div class="miste">
        <!-- 轮播图 -->
      <van-swipe :autoplay="3000" :height="300">
        <van-swipe-item v-for="(image, index) in images" :key="index">
            <img v-lazy="image" class="img" />
        </van-swipe-item>
      </van-swipe>
        <!-- 九宫格 -->
      <van-grid :gutter="10">
        <van-grid :border="false" :column-num="4" class="right-grid">
            <van-grid-item class="item" v-for="(v,i) in classify" :key="i" @click="golist(v._id)">
                <van-image :src="`${base.url}${v.img}`" class="item-img"/>
                <p>{{v.title}}</p>
            </van-grid-item>
        </van-grid>
      </van-grid>
        <!-- 商品卡片列表 -->
<!-- 下拉刷新 -->
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh" pulling-text="刷新" loosing-text="释放即可刷新...">
       <van-card
            num="2"
            price="2.00"
            desc="描述信息"
            title="商品标题"
            thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
            >
            <div slot="tags">
                <van-tag plain type="danger">标签</van-tag>
                <van-tag plain type="danger">标签</van-tag>
            </div>
            <div slot="footer">
                <van-button size="mini">按钮</van-button>
                <van-button size="mini">按钮</van-button>
            </div>
        </van-card>
        <van-card
            num="2"
            price="2.00"
            desc="描述信息"
            title="商品标题"
            thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
            >
            <div slot="tags">
                <van-tag plain type="danger">标签</van-tag>
                <van-tag plain type="danger">标签</van-tag>
            </div>
            <div slot="footer">
                <van-button size="mini">按钮</van-button>
                <van-button size="mini">按钮</van-button>
            </div>
        </van-card>
        <van-card
            num="2"
            price="2.00"
            desc="描述信息"
            title="商品标题"
            thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
            >
            <div slot="tags">
                <van-tag plain type="danger">标签</van-tag>
                <van-tag plain type="danger">标签</van-tag>
            </div>
            <div slot="footer">
                <van-button size="mini">按钮</van-button>
                <van-button size="mini">按钮</van-button>
            </div>
        </van-card>
    </van-pull-refresh>   
        <!-- 下拉刷新 -->
        <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <p>刷新次数: {{ count }}</p>
        </van-pull-refresh> -->
    </div>
</template>

<script>
import base from "@/myconfig/base.js";
export default {
    data() {
    return {
      base,
      images: [
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg'
      ],
      isLoading:false,
      classify: []
    }
  },
  mounted(){
    //请求轮播数据
    //请求九宫格数据
    this.getClassify();
    //请求推荐商品数据
  },
   methods: {
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功');
        this.isLoading = false;
        // this.count++;
      }, 500);
    },
    //请求 九宫格 数据
    getClassify(){
      this.axios.get(`${base.url}/misteclassify`).then(res=>{
        console.log(res.data)
        if(res.data.code==200){
          this.classify=res.data.info;
        }else{
          alert("出错了")
        }
      })
    },
    golist(id){
      this.$router.push({ name: "list", params: { classifyid: id } });
    }
  }

}
</script>

<style lang="less">
 .img{
     width:100%;
     height:100%;
 }
</style>