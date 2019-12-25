//1、载入vue
import Vue from "vue";
// 2、载入vuex
import Vuex from "vuex";
// 3.使用vuex
Vue.use(Vuex);

// 4、创建仓库
const store = new Vuex.Store({
    // 状态
    state: {
        ggarr: [
            {
                name: "8G+128G",
                can: [
                    {
                        name: "白色",
                        price: "100"
                    },
                    {
                        name: "褐色",
                        price: "200"
                    },
                    {
                        name: "红色",
                        price: "400"
                    }
                ]
            },
            {
                name: "16G+256G",
                can: [
                    {
                        name: "白色",
                        price: "200"
                    },
                    {
                        name: "褐色",
                        price: "400"
                    }
                ]
            }
        ]
    },
    // 异步方法
    actions: {},
    //改变 状态的方法
    mutations: {
        addggarr(state,obj){
            console.log(obj)
            state.ggarr.push(obj)
        },
        delggarr(state,ggarrindex){
            state.ggarr.splice(ggarrindex,1)
        },
        addggarrcan(state,obj){
            let {ggarrindex,canobj} = obj;
            state.ggarr[ggarrindex].can.push(canobj)
        },
        delggarrcan(state,obj){
            let {ggarrindex,canindex}=obj;
            state.ggarr[ggarrindex].can.splice(canindex,1)
        }
    },
    // 计算属性
    getters: {}

})

//5、导出
 
export default store;