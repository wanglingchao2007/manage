import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
const login = () => import("@/view/login.vue")
const base = () => import("@/view/base.vue")
const fxUser = () => import("@/components/fenxi/user.vue")
const fxOrder = () => import("@/components/fenxi/order.vue")
//权限管理 -- qxgl
const qxglList = () => import("@/components/qxgl/list.vue")
const qxglAdd = () => import("@/components/qxgl/add.vue")
// 角色 --- js 
const jsList = () => import("@/components/jsgl/list.vue")
const jsAdd = () => import("@/components/jsgl/add.vue")
const jsEdit = () => import("@/components/jsgl/edit.vue")

// 管理员 -gly
const glyList = () => import("@/components/gly/list.vue")
const glyAdd = () => import("@/components/gly/add.vue")
const glyEdit = () => import("@/components/gly/edit.vue")

//商品分类  goodsfl
const goodsflAdd = () => import("@/components/goodsfl/add.vue")
const goodsflList = () => import("@/components/goodsfl/list.vue")




import axios from "axios"
Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/base',
      name: 'base',
      component: base,
      children: [
        // 统计分析 -- fx
        {
          path: 'fxuser',
          name: 'fxuser',
          component: fxUser,
        },
        {
          path: 'fxorder',
          name: 'fxorder',
          component: fxOrder,
        },
        //权限管理 --qxgl
        {
          path: 'qxgllist',
          name: 'qxgllist',
          component: qxglList,
        },
        {
          path: 'qxgladd',
          name: 'qxgladd',
          component: qxglAdd,
        },
        //角色 --- js 
        {
          path: 'jslist',
          name: 'jslist',
          component: jsList,
        },
        {
          path: 'jsadd',
          name: 'jsadd',
          component: jsAdd,
        },
        {
          path: 'jsedit/:id',
          name: 'jsedit',
          component: jsEdit,
        },
        // 管理员 --gly
        {
          path: 'glylist',
          name: 'glylist',
          component: glyList,
        },
        {
          path: 'glyadd',
          name: 'glyadd',
          component: glyAdd,
        },
        {
          path: 'glyedit/:id',
          name: 'glyedit',
          component: glyEdit,
        },
        {
          path: 'goodsfladd',
          name: 'goodsfladd',
          component: goodsflAdd,
        },
        {
          path: 'goodsfllist',
          name: 'goodsfllist',
          component: goodsflList,
        },
      ]
    },
    // 路由重定向
    {
      path: "/",
      redirect: "/base/fxuser"
    }
  ]
})

//全局路由守卫 -- 当路由进入页面 -- 验证 token 是否过期 或者 是否存在
// token 验证失败 --- 登录页面
// 成功 ---进入
router.beforeEach((to, from, next) => {
  // console.log(to)

  let token = localStorage.getItem("houtaitoken") ? JSON.parse(localStorage.getItem("houtaitoken")).token : ""
  let id = localStorage.getItem("houtaitoken") ? JSON.parse(localStorage.getItem("houtaitoken")).id : ""

  // 排除 登录页面
  if (to.name != "login") {
    axios.get("/checktoken", {
      headers: { token: token }
    }).then(res => {
      // console.log(res.data.err_code)
      //如果 res.data.err_code== 400 失败--- 跳转到登录页面
      if (res.data.err_code == 200) {
        // console.log(res)
        // axios.get("/checkqx",{
        //   params:{
        //     id:id,
        //     name:to.name
        //   }
        // }).then(val=>{
        //   if(val.data.err_code==200){
            next();
        //   }else{
        //     alert("没有权限")
        //   }
        // })
       
      } else {
        console.log("token 过期")
        router.push({ name: "login" })
      }
    })
  } else {
    next();
  }
})


export default router;
