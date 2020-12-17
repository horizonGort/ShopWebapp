<template>
<div class="qf-tabbar">
  <van-tabbar route active-color='#F30F05'>
    <van-tabbar-item icon="home-o" to='/'>首页</van-tabbar-item>
    <van-tabbar-item icon="search" to='/find'>分类</van-tabbar-item>
    <van-tabbar-item icon="friends-o" to='/cart' badge="5">购物车</van-tabbar-item>
    <van-tabbar-item
      icon="setting-o"
      :to='isLogin?"/user":"/login"'>
      {{isLogin?"我的":"登录"}}
    </van-tabbar-item>
  </van-tabbar>
</div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'
export default {
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  data: function() {
    return {
      isLogin: false
    }
  },
  mounted() {
    this.isLogin = localStorage.getItem('token')
  },
  // 当keep-alive激活我时
  // activated() {
  //   this.isLogin = localStorage.getItem('token')
  // }
}
</script>

<style lang="scss" scoped>
</style>
