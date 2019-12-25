<template>
    <div class="base">
       <!-- <h1>主页--头部 内容 尾部</h1>  -->
       <div class="header">
           <form actions="/">
                <van-search 
                placeholder="请输入搜索关键词"
                show-action
                 @focus="focus" ></van-search>
           </form>    
       </div>
       <div class="content">
           <router-view></router-view>
       </div>
       <div class="footer">
           <ul>
                <router-link to="/base/miste" tag="li">首页</router-link>
                <router-link to="/base/classify" tag="li">分类</router-link>
                <router-link to="/base/shopcar" tag="li">购物车</router-link>
                <router-link  to="/base/mycenter" tag="li">我的</router-link>
           </ul>

       </div>
    </div>
</template>
<script>
export default {
    data(){
        return{         
        }
    },
    methods:{      
        focus(){
            console.log("获得焦点")
            this.$router.push({"name":"search"})
        }
    }
}
</script>
<style lang="less">

    html,body,#app,.base{
        height:100%;
        margin:0;
        padding:0;    
    }
    .base{
        display: flex;
        flex-direction: column;
       }
    .content{
        flex:1;
        overflow: auto;
    }
    .footer ul{      
        display: flex;
        justify-content:space-around;      
    }
    .router-link-exeac-active{
        color:red;
    }
    
    </style>