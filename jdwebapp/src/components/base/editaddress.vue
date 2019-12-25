<template>
    <div>
     <van-nav-bar  
     title="修改收货地址"
     left-arrow
     @click-left="$router.go(-1)"
     />
        <van-address-edit
            :area-list="areaList"
            show-postal
            show-delete
            show-set-default
            show-search-result
            save-button-text="修改"
            :address-info="AddressInfo"
            :search-result="searchResult"
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
            @delete="onDelete"
            @change-detail="onChangeDetail"
        />
    </div>
</template>

<script>
import base from "@/myconfig/base.js"
import areaList from "@/myconfig/area.js"
export default {
    data() {
    return {
      base,
      areaList:areaList,
      searchResult: [],
      AddressInfo:{},
    }
  },
  mounted(){
    let id=this.$route.query.id;
    console.log(id);
    this.axios.get(`${base.url}/idofaddress?id=${id}`).then(res=>{
      if(res.data.code==200){
        console.log(res.data.info)
        let address=JSON.parse(res.data.info.address)
        address.isDefault=res.data.info.isDefault=="true"?true:false;
        this.AddressInfo=address;
      }
    })
  },
  methods: {
    onSave(val) {
      // Toast('save');
      console.log(val)
      this.axios.post(`${base.url}/editaddress`,{
        userid:this.$store.state.userid,
        id:this.$route.query.id,
        ...val,
      }).then(res=>{
        if(res.data.code==200){
          this.$router.push({name:"address"});
        }else{
          alert("修改失败")
        }
      })
    },
    onDelete() {
      // Toast('delete');
       let id = this.$route.query.id;
      //
      this.axios.get(`${base.url}/idDelAddress?id=${id}`).then(res => {
        if (res.data.code == 200) {
          this.$router.push({ name: "address" });
        } else {
          alert("修改失败");
        }
      });
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