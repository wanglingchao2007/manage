<template>
  <div>
    <form action="/">
      <van-search v-model="value" placeholder="请输入搜索关键词" @search="onSearch" />
    </form>

    <div>
      <h1>搜索历史记录</h1>
      <ul>
        <li>
          手机
          <span>X</span>
        </li>
        <li>
          华为
          <span>X</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: ""
    };
  },
  methods: {
    onSearch() {
      // console.log(this.value);
      this.$router.push({"name":"searchres",params:{goodsname:this.value}})
    }
  }
};
</script>