<template>
    <div>
        <van-nav-bar  
        title="收货地址"
        left-arrow
        @click-left="$router.go(-1)"
        />
        <van-address-list
        v-model="chosenAddressId"
        :list="list"        
        @add="onAdd"
        @edit="onEdit"
        @select="onSelect"
        />
    </div>
</template>

<script>
import base from "@/myconfig/base.js"
export default { 
  data() {
    return {
      base,
      chosenAddressId: '1',
      list: []
    }
  },
  mounted(){
    this.axios.get(`${base.url}/alladdress`,{
      params:{
        userid:this.$store.state.userid
      }
    }).then(res=>{
      if(res.data.code==200&&res.data.info.length>0){
        let arr=[];
        for(let v of res.data.info){
          let address=JSON.parse(v.address);
           arr.push({
              id: v._id,
              name: address.name,
              tel: address.tel,
              address: `${address.province}${address.city}${address.county} ${address.addressDetail}`
            });
        }
         this.list = arr;
          let chosenAddress = res.data.info.find(
            val => val.isDefault == "true"
          );
          this.chosenAddressId = chosenAddress._id;
      }
    })
  },

  methods: {
    onAdd() {    
    //   Toast('新增地址');
    this.$router.push({name:"addaddress"});
    },

    onEdit(item, index) {
    //   Toast('编辑地址:' + index);
        console.log(item,index)
        this.$router.push({name:"editaddress",query:{id:item.id}});
    },
    onSelect(item, index) {
      // console.log(item, index);
      this.axios
        .get(`${base.url}/editDefaultAddress`, {
          params: {
            id: item.id,
            userid: this.$store.state.userid
          }
        })
        .then(res => {
          if (res.data.code != 200) {
            alert("修改失败");
          }
        });
    } 
  }
}
</script>