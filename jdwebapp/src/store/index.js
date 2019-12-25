import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
let localobj=localStorage.getItem("jdwebapp")?JSON.parse(localStorage.getItem("jdwebapp")):{};
//创建仓库
const store = new Vuex.Store({
    state:{
        shopCarArr:[],
        token:localobj.token ? localobj.token :"",
        userid:localobj.userid ? localobj.userid :"",
        username:localobj.username ? localobj.username :""   
     },
    actions:{

    },
    mutations:{
        //添加购物车
        add(state,obj){
            let arr = [...state.shopCarArr];
            // 根据 _id 规格参数 规格参数值 查找对应商品 所在 shopCarArr的下标
            let index = arr.findIndex(val => val._id == obj._id && val.ggcan == obj.ggcan && val.ggval == obj.ggval)
            //有 数量+1
            if (index > -1) {
                arr[index].num += 1;
            } else {
                //没有 数量=1
                obj.num = 1;
                arr.push(obj)
            }
            state.shopCarArr = arr;
        },
        //登陆后 改变token userid username
        loginchange(state,obj){
            state.token=obj.token,
            state.userid=obj.userid,
            state.username=obj.username,
            localStorage.setItem("jdwebapp",JSON.stringify(obj));
        }
    },
    getters:{
        sumprice(state) {
            let sum = 0;
            for (let v of state.shopCarArr) {
                sum += v.num * v.price
            }
            return sum * 100
        }
    },
})

export default store