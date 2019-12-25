import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

import base from "@/view/base.vue"
import boot from "@/view/boot.vue"

import info from "@/view/info.vue"

import search from "@/components/search/index.vue"

import miste from "@/components/base/miste.vue"
import classify from "@/components/base/classify.vue"
import shopcar from "@/components/base/shopcar.vue"
import mycenter from "@/components/base/mycenter.vue"
import list from "@/components/base/list.vue"

import searchres from "@/components/base/searchres.vue"
//登陆 注册
import login from "@/view/login.vue"
import register from "@/view/register.vue"
import order from "@/view/order.vue"

import address from "@/components/base/address.vue"
import addaddress from "@/components/base/addaddress.vue"
import editaddress from "@/components/base/editaddress.vue"
Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/order',
      name: 'order',
      component: order
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/base',
      name: 'base',
      component: base,
      // beforeEnter:((to,from,next)=>{ 
      //   if(localStorage.setItem("boot")){
      //     next();
      //   }else{
      //     next("/boot");
      //     localStorage.setItem("boot",new Date().getTime())
      //   }       
      // }),
      children: [
        {
          path: 'miste',
          name: 'miste',
          component: miste
        },
        {
          path: 'classify',
          name: 'classify',
          component: classify
        },
        {
          path: 'shopcar',
          name: 'shopcar',
          component: shopcar
        },
        {
          path: 'mycenter',
          name: 'mycenter',
          component: mycenter
        },
        {
          path: 'list/:classifyid',
          name: 'list',
          component: list
        },
        {
          path: 'searchres',
          name: 'searchres',
          component: searchres
        },
        //收货地址
        {
          path: 'address',
          name: 'address',
          component: address
        },
        {
          path: 'addaddress',
          name: 'addaddress',
          component: addaddress
        },
        {
          path: 'editaddress',
          name: 'editaddress',
          component: editaddress
        },
      ]
    },
    {
      path: '/boot',
      name: 'boot',
      component: boot
    },
    {
      path: '/info/:id',
      name: 'info',
      component: info
    },


    {
      path: "/",
      redirect: "/base"
    }
  ]
})

export default router