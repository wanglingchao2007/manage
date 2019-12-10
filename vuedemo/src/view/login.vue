<template>
    <div class="login" v-if="f==false">
        <div class="img"></div>
        <h2>渠道商管理平台</h2>
        <form class="form">
            <select name="" id="">
                <option value="">管理员</option>
                <option value="">企业</option>
                <option value="">平台</option>
            </select>
             
            <input type="text" placeholder="账号" v-model="name">
            <input type="text" placeholder="密码" v-model="password">
            <input type="button"  value="登陆" @click="loginto()">
        </form>
    </div>

    <div v-else class="ok">
        <i class="el-icon-success size animated shake"></i>
        <!-- <transition enter-active-class="animated bounce"> -->
             <p class="msg animated fadeInLeft" animate-delay="1s" animate-duration="2s">登录成功</p>
        <!-- </transition> -->
       
    </div>
</template>
<script>
export default {
    data(){
        return{
            f:false,
            name:"",
            password:""
        }
    },
    methods:{
        loginto(){
            let {name,password}=this;
                 this.axios.post("/login",{
                     name:name,
                     password:password
                 }).then(res=>{
                     console.log(res.data)
                     if(res.data.err_code==200){
                         //正确保存token 跳转到base页面              
                          localStorage.setItem("houtaitoken",JSON.stringify({id:res.data.id,token:res.data.token}))
                          this.f=true;
                            setTimeout(() => {
                                this.$router.push({name:"base"})
                            }, 3000);
                     }else{
                         this.name="";
                         this.password="";
                     }
                 })               
        }
    }
}
</script>
<style lang="">
    *{
        margin:0;
        padding:0;
    }
    .img{
        width:100px;
        height:100px;
        margin:0 auto;
        background: red;
    }
   .login{      
       width:50%;              
       margin:200px auto; 
       padding:15px;
       border:1px solid black;      
   }
   h2{
       text-align: center;
   }
   .form{
       width:60%;
       margin:0 auto;
       display: flex;
       flex-direction:column;    
   }
   .form input{
       margin-top:6px;
   }
    .ok{
        height:100vh;
        width:100px;
        margin:0 auto;
        display: flex;
        flex-direction: column;
        justify-content:center;
    }
    .msg{
        text-align: center;
    }
    .size{
        font-size:100px;
    }
</style>