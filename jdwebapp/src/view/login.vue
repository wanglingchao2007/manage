<template>
    <div>
        <h1>登陆</h1>
        <van-cell-group>
            <van-field
                v-model="username"
                required
                clearable
                label="用户名"        
                placeholder="请输入用户名"     
            />

            <van-field
                v-model="password"
                type="password"
                label="密码"
                placeholder="请输入密码"
                required
            />
                
        </van-cell-group> 
    <van-button slot="button" size="width:100%" type="primary" @click="login()">登陆</van-button>
    <!-- <router-link :to="{'name':'register'}">没有账号，去注册一个吧</router-link> -->
    </div>
</template>
<script>
import base from "@/myconfig/base"
export default {
    data(){
        return{
            base,
            username:"",
            password:""
        }
    },
    methods:{
        login(){
            console.log(this.username,this.password)
            this.axios.post(`${base.url}/login`,{
                username:this.username,
                password:this.password,
            }).then(res=>{
                if(res.data.code==200){
                    console.log(res.data)
                    let obj={}
                    obj.token=res.data.token;
                    obj.userid=res.data.info._id;
                    obj.username=res.data.info.username;
                    this.$store.commit('loginchange',obj);
                    alert("登陆成功")
                    this.$router.push({name:"mycenter"})
                }else{
                    alert("登陆失败")
                }
            })
        }
    }
}
</script>