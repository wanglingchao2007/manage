<template>
    <div>
        <van-nav-bar  
        title="增加收货地址"
        left-arrow
        @click-left="$router.go(-1)"
        />
        <van-address-edit
            :area-list="areaList"
            show-postal     
            show-set-default
            show-search-result
            :search-result="searchResult"
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave" 
            @change-detail="onChangeDetail"
        />
    </div>
</template>

<script>
import areaList from "@/myconfig/area.js"
import base from "@/myconfig/base.js"
export default {
    data() {
    return {
      areaList:areaList,
      searchResult: []
    }
  },

  methods: {
    onSave(val) {
      // Toast('save');
      console.log(val);
      this.axios.post(`${base.url}/addaddress`,{
        userid:this.$store.state.userid,
        ...val,   
      }).then(res=>{
        console.log(res.data)
      })
    },
   
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [{
          name: '黄龙万科中心',
          address: '杭州市西湖区'
        }];
      } else {
        this.searchResult = [];
      }
    }
  }
}
</script>