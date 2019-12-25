<template>
  <div class="gg-right-item">
    <el-button type="warning" 
    @click="delggarrcan({
      'ggarrindex':ggarrindex,
      'canindex':canindex
    })">删除</el-button>
    <el-input v-model="canItem.name"></el-input>
    <el-input v-model="canItem.price"></el-input>
  </div>
</template>

<script>
import {mapMutations} from "vuex"
export default {
  props: ["canItem","ggarrindex","canindex"],
  methods:{
    ...mapMutations(["delggarrcan"])
  }
};
</script>