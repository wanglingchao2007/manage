<template>
    <div>
<van-cell-group>
  <van-field
    v-model="username"
    required
    clearable
    label="用户名"
    right-icon="question-o"
    placeholder="请输入用户名"
    @click-right-icon="$toast('不超过8个字符')"
    :error-message="error?'用户名已注册':''"
    @blur="checkuser()"
  />

  <van-field
    v-model="password"
    type="password"
    label="密码"
    placeholder="请输入密码"
    required
  />
    <van-field
    v-model="confirmpassword"
    type="password"
    label="确认密码"
    placeholder="请再次输入密码"
    :error-message="password==confirmpassword?'':'两次输入的密码不一致'"
    required
  />  
</van-cell-group>
<van-button slot="button" size="width:100%" type="primary" @click="reg()">注册</van-button>
 </div>
</template>

<script>
import base from "@/myconfig/base.js"
export default {
    data(){
        return {
            base,
            username:"",
            password:"",
            confirmpassword:"",
            error:false,
        }
    },
    methods:{
        //检查用户名是否已注册
        checkuser(){
            //获取 用户名---调用 判断账号是否注册 
            //返回code:400用户已注册 code:200 可以注册
            console.log(base.url)
            this.axios.post(`${base.url}/checkuser`,{
                username:this.username,
            }).then(res=>{
                 
                if(res.data.code==200){
                    this.error=false;
                }else{
                    this.error=true
                }
            })
        },
        //注册
        reg(){
            //获取表单数据 ---调用注册接口
            let username=this.username;
            let password=this.password;
            let confirmpassword=this.confirmpassword;
            if(username!="" && 
               password!="" && 
               this.error==false && 
               password==confirmpassword){
                this.axios.post(`${base.url}/register`,{
                    username:username,
                    password:password,
                }).then(res=>{
                    
                    if(res.data.code==200){
                        this.$router.push({name:"login"});
                    }else{
                        alert("此用户名已注册,请用新用户名重新注册")
                    }
                })
            }else{
                if(username==""){
                     alert("用户名不能为空")
                }else if(this.error==true){
                    alert("此用户名已注册")
                }else if(password!=confirmpassword){
                      alert("两次密码不一致，请准确输入")
                }           
            }
        }
    }
}
</script>