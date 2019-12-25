<template>
  <div>
    <el-button @click="$router.push({'name':'spadd'})">添加商品</el-button>
    <h1>商品列表</h1>
    <!-- 搜索 -->
    <el-form :inline="true"  class="demo-form-inline">
  <el-form-item label="商品名">
    <el-input   placeholder="商品名" v-model="sgoodsname"></el-input>
  </el-form-item>
  <el-form-item label="商品价格">
     <el-input   placeholder="商品价格" v-model="sprice"></el-input>
  </el-form-item>
 
  <el-form-item>
    <el-button type="primary" @click="search">查询</el-button>
  </el-form-item>
</el-form>

<!-- 展示 -->
  <el-table
    :data="tableData" style="width: 100%">
    <el-table-column label="商品图片" width="180">
      <template slot-scope="scope">     
      <img 
      :src="`http://127.0.0.1:3000${scope.row.imageUrl}`" 
      style="width:100%; height:100%" />
      </template>
    </el-table-column>
    <el-table-column label="商品名" width="180" prop="goodsname"></el-table-column>
    <el-table-column label="商品价格" width="180" prop="price"></el-table-column>
    <el-table-column label="上架/下架" width="180" >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.showhide"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeshowhide(scope.row._id,scope.row.showhide)">
          </el-switch>
        </template>
    </el-table-column>
   
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini"  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button  size="mini"  type="danger"  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
<!-- 分页 -->
 
   <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
       
      :page-sizes="[2, 3, 4, 5]"
      :page-size="limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        total:0, 
        page:1,
        limit:2, 
        showhide:false,
        sgoodsname:"",
        sprice:"",

        formInline: {
          user: '',
          region: '',
          
        },
        tableData: [
          // {
        //   imgurl: 'http://127.0.0.1:3000/fl/baobao_03.jpg',
        //   goodsname: '香奈儿',
        //   price: '15180'
        // },
       ]
      }
    },
    mounted(){
      //获取总数据
      this.sumsp();
      //获取分页的商品信息
      this.pagesp(this.page,this.limit);
},
    methods: {
      //上架和下架
      changeshowhide(id,showhideval){
        this.axios.get("/changeshowhide",{
          params:{
            id:id,
            showhideval:showhideval
          }
        }).then(res=>{
          if(res.data.err_code==400){
            alert("服务器挂了");
          }
        })
      },
      //搜索
      search(){
        alert(`${this.sgoodsname}---${this.sprice}`)
          
      },
      sumsp(){
        this.axios.get("/sumsp").then(res=>{
          this.total = res.data.sum;
        })
      },
      pagesp(page,limit){
          this.axios.get("/pagesp",{
            params:{
              page:page,
              limit:limit
            }
          }).then(res=>{
            this.tableData=res.data.info;
          })    
      },
      //提交
      onSubmit() {
        console.log('submit!');
      },
      //表格
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
        //调用数据库中的删除接口 _id=row._id 这条数据
        this.axios.get("/delsp",{
          params:{
            id:row._id,
          }
        }).then(res=>{
          if(res.data.err_code==200){
            //删除dom
            this.tableData.splice(index,1)
          }
        })
      
      },
      //分页
        handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
  }
</script>