<template>
    <div>
      <!-- {{actions:图片上传接口地址
      on-preview:点击文件列表中已上传的文件时 执行的函数
      on-remove:点击文件列表中删除按钮时 执行的函数
      on-success:文件上传成功时 的钩子
      }} -->
        <h1>商品分类添加页面</h1>
            <el-button>返回分类管理页面</el-button>
              <el-form ref="form" label-width="80px">
                <!-- 分类名称 -->
                <el-form-item label="分类名称">
                  <el-input ></el-input>
                </el-form-item>
                <!-- 分类图标 -->
                 <el-form-item label="分类图标">
                  <el-upload
                    class="upload-demo"
                    action="http://127.0.0.1:3000/fileup"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    :on-success="success"
                    list-type="picture"
                    name="picture"
                  >
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                 </el-form-item>
                  <!-- 父级分类 -->
                 <el-form-item label="父级分类">
                  <el-cascader 
                  :options="options" 
                  v-model="pid" 
                  :show-all-levels="false"
                  :props="{checkStrictly:true}"
                  ></el-cascader>
                 </el-form-item>
                <!-- 添加按钮 -->
                 <el-form-item>
                   <el-button @click="add">添加</el-button>
                </el-form-item>
              </el-form> 
              {{pid}}     
    </div>
</template>

 <script>
  export default {
     data() {
      return {  
        pid:"" ,    //父级分类id
        name:"",    //分类名称 
        fileList: [ ],
        imgsrc:"",   //分类图片地址
        options:[
          {
            value:"1",
            label:"指南",
            children:[{value:"2",label:"呵呵"}]
          }
        ]
      }
     },
    mounted(){
      console.log(123)
    },
    methods: {
      handleRemove(){
        console.log('123')
     
      },
      handlePreview() {
        console.log('123')
      
      },
      //图片上传成功
      success(response) {
        console.log(response);
      this.imgurl = response.imgurl;
    },
      // 
      error(err, file, fileList){
        console.log(response,file,fileList)

      },
      add(){
        console.log(this.pid,this.name,this.imgsrc)
      }    
    }
  }
   
  
</script>