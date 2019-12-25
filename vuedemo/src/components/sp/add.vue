<template>
  <div>
    <h1>商品添加</h1>
    <el-form label-width="80px">
      <el-form-item label="商品名称">
        <el-input v-model="goodsname"></el-input>
      </el-form-item>
      <!-- 规格参数 -->
      <el-form-item>
        <h1 class="gg-title">规格参数</h1>

        <!-- 规格组件 -->
        <ggBox v-for="(v,i) in ggarr" :key="i" :ggArrItem="v" :ggarrindex="i"></ggBox>

        <el-button @click="addggarr(
          {
                name: '',
                can: [
                    {
                        name: '',
                        price: ''
                    },                   
                ]
            }
          )" >新增</el-button>
      </el-form-item>

      <!-- 价格 -->
      <el-form-item label="商品价格">
        <el-input v-model="price"></el-input>
      </el-form-item>

      <!-- 商品缩略图 -->
      <el-form-item label="缩略图">
        <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:3000/slfileup"
          :show-file-list="false"
          :on-success="slsuccess"
          name="sl"
        >
          <img v-if="imageUrl" :src="`http://127.0.0.1:3000${imageUrl}`" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <!-- 轮播图 -->
      <el-form-item label="轮播图">
        <el-upload 
        action="http://127.0.0.1:3000/lbfileup" 
        list-type="picture-card"
        :file-list="fileList"
        :on-success="lbsuccess"
        name="lb">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
        <el-dialog>
          <img width="100%" alt  />
        </el-dialog>
      </el-form-item>
      <!-- 富文本编辑器 -->
      <el-form-item label="商品详情">
        <quill-editor v-model="goodsinfo"></quill-editor>
      </el-form-item>

      <!-- 上架下架 -->
      <el-form-item label="上架/下架">
        <el-switch v-model="showhide" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </el-form-item>
      <!-- 商品分类 -->
       <el-form-item label="商品分类">
        <el-cascader
          :options="options"
          v-model="flid"
          :props="{ checkStrictly: true }"
          :show-all-levels="false"
        ></el-cascader>
      </el-form-item>
      <!-- 提交 -->
      <el-form-item>
        <el-button type="danger">预览</el-button>
        <el-button type="danger" @click="add">提交</el-button>
        <el-button type="info">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
//加载 ggBox 组件 并渲染
import ggBox from "@/components/sp/gg-box.vue";
// 获取 vuex 中的 state.ggarr
import { mapState,mapMutations} from "vuex";
// ggarr 数组 有几项 调用 几次   ggBox组件 --- 循环  ggarr 数组 调用   ggBox组件

//处理商品分类数据
import treelist from "@/myjs/treelist.js";
export default {
  components: {
    ggBox
  },
  computed: {
    ...mapState(["ggarr"])
  },
  data() {
    return {
      goodsname: "", //商品名称
      imageUrl:'',  //商品缩略图
      price: "", //商品价格
      goodsinfo: "", //商品详情
      showhide: false ,//上架下架-默认下架
      fileList:[], //轮播图
      options:[]  , //商品分类
      flid:"",   //获取的分类id
    };
  },
  mounted() {
    this.axios.get("/spflall").then(res => {
      //   console.log(res.data.info);
      let data = treelist(res.data.info, 0);
      this.options = [...this.options, ...data];
    });
  },
  methods: {
    ...mapMutations(['addggarr']),
    //缩略图上传成功后执行的函数
    slsuccess(res){
      console.log(res)
      this.imageUrl=res.imgurl;
    },
    lbsuccess(res){
    
      this.fileList.push({name:res.imgurl});
    },
    add() {
      console.log("商品名称", this.goodsname);
      console.log("商品价格", this.price);
      console.log("商品详情", this.goodsinfo);
      console.log("上架下架", this.showhide);
      console.log("商品规格", this.$store.state.ggarr);
      console.log("商品缩略图",this.imageUrl);
      console.log("商品轮播图",this.fileList[0].name);
      console.log("商品分类id",this.flid);
      let obj={
        goodsname:this.goodsname,
        price:this.price,
        goodsinfo:this.goodsinfo ,
        showhide:this.showhide,
        ggarr:this.$store.state.ggarr,
        imageUrl:this.imageUrl,
        fileList:this.fileList[0].name,
        fild:this.fild,
      }
      // console.log(this.fild)
      this.axios.post("/addsp",obj).then(res=>{
        //提交数据到数据库
        console.log(res);
      })
   }
  }
};
</script>


<style lang="">
.gg-title {
  border-bottom: 1px solid black;
}
.gg-box {
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
}
.gg-middle {
  border: 1px solid black;
}
.gg-right-title,
.gg-right-item {
  display: flex;
  justify-content: space-around;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>