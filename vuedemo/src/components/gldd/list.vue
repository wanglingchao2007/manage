<template>
  <div>
    <h1>我是订单管理</h1>
    <!-- 搜索表单 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="订单号">
        <el-input placeholder="订单号" v-model="ddnum"></el-input>
      </el-form-item>

      <el-form-item label="日期搜索">
        <el-date-picker
          v-model="times"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button @click="search">搜索</el-button>
      </el-form-item>
    </el-form>
    <!-- 显示表格 -->
    <h1>
      订单信息
      <download-excel class="export-excel-wrapper" :data="tableData" name="filename.xls">
        <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
        <el-button type="primary" size="small">导出EXCEL</el-button>
      </download-excel>
    </h1>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="订单编号" prop="ddnum"></el-table-column>
      <el-table-column label="收件人" prop="name"></el-table-column>
      <el-table-column label="合计价格" prop="sumprice"></el-table-column>
      <el-table-column label="实付金额" prop="payprice"></el-table-column>
      <el-table-column label="建立时间" prop="createtime">
        <template slot-scope="scope">
          <p>{{new Date(scope.row.createtime).toLocaleString()}}</p>
        </template>
      </el-table-column>
      <el-table-column label="付款时间" prop="paytime">
        <template slot-scope="scope">
          <p>{{new Date(scope.row.paytime).toLocaleString()}}</p>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="ddflag"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleLook(scope.$index, scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // x: { name: "gao" },
      //分页
      limit: 3, //每页显示3条
      page: 1, // 默认 当前为 第一页
      total: 0, // 总条数
      ddnum: "", //订单号
      times: "", //时间
      tableData: [
        // {
        //   ddnum: "1", //订单编号
        //   name: "王小虎", //收件人
        //   sumprice: "100", //合计价格
        //   payprice: "98", //实付金额
        //   createtime: "2019-12-19 14:10", //建立时间
        //   paytime: "2019-12-19 14:30", //付款时间
        //   ddflag: "已付款" //状态
        // }
      ]
    };
  },
  mounted() {
    this.mnddsum();
    this.mnddlist();
  },
  methods: {
    // 获取总条数
    mnddsum() {
      if (this.times != "" && this.times != null) {
        var times = [];
        times.push(this.times[0].getTime());
        times.push(this.times[1].getTime());
      } else {
        times = "";
      }
      this.axios
        .get("/mnddsum", {
          params: {
            ddnum: this.ddnum,
            date: times
          }
        })
        .then(res => {
          this.total = res.data.sum;
        });
    },

    // 分页请求数据
    mnddlist() {
      if (this.times != "" && this.times != null) {
        var times = [];
        times.push(this.times[0].getTime());
        times.push(this.times[1].getTime());
      } else {
        times = "";
      }
      this.axios
        .get("/mnddlist", {
          params: {
            page: this.page,
            limit: this.limit,
            date: times,
            ddnum: this.ddnum
          }
        })
        .then(res => {
          this.tableData = res.data.info;
        });
    },
    //搜索
    search() {
      this.mnddsum();
      this.mnddlist();
      console.log(this.times);
    },

    //查看
    handleLook(index, row) {
      console.log(index, row);
    },
    // 分页
    // 每页显示条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.limit = val;
      this.mnddlist();
    },
    //当前页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.mnddlist();
    }
  }
};
</script>