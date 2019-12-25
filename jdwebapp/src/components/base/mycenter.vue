<template>
    <div>
        <h1>{{username}} 个人中心</h1>
        <h1>{{token}}</h1>
        <h1>{{userid}}</h1>         
    </div>
</template>

<script>
import {mapState} from "vuex"
export default {
    computed:{
        ...mapState(["token","userid","username"])

    },
    beforeRouteEnter(to,from,next){
        next(vm=>{
            vm.axios.get("http://127.0.0.1:9527/checktoken",
            {headers:{token:vm.$store.state.token}
            }).then(res=>{
                if(vm.$store.state.token==""){
                    vm.$router.push({name:"login"});
                }else{
                    return true
                } 
            })
        })
    }
}
</script>