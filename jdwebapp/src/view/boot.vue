<template>
    <div class="boot">
        <van-swipe indicator-color="black" :autoplay="3000" class="swiper">
            <van-swipe-item>1</van-swipe-item>
            <van-swipe-item>2</van-swipe-item>
            <van-swipe-item>3</van-swipe-item>
            <van-swipe-item>4</van-swipe-item>
        </van-swipe>
        
    </div>
</template>

<script>
export default {
    methods:{
        onChange(index){
            if(index==3){
                this.$router.push({"name":"base"})
            }
        }
    }
}
</script>

<style lang="less">
    html,body,#app,.boot{
         height: 100%;
         width:100%;
        .swiper{
            width:100%;
            height:100%;
            background: red;
        }
    }
</style>