<template>
<div class="qf-find">
  <div class="left">
    <van-sidebar v-model="activeKey">
      <van-sidebar-item
        v-for='item in cateArr'
        :key='item.id'
        :title="item.cate_zh" />
    </van-sidebar>
  </div>
  <div class="right">
    <van-grid :border="false" :column-num='3'>
      <van-grid-item v-for='item in goodObj[activeKey]' :key='item._id'>
        <div class="good-item">
          <img :src="$img.imgBaseUrl+item.img" />
          <div v-text='item.name'></div>
        </div>
      </van-grid-item>
    </van-grid>
  </div>
  <TabBar />
</div>
</template>

<script>
import { TabBar } from '@/components/'
import { mapActions, mapState, mapMutations } from 'vuex'
import {
  Sidebar,
  SidebarItem,
  Grid,
  GridItem
} from 'vant'
export default {
  components: {
    TabBar,
    [Sidebar.name]: Sidebar,
    [SidebarItem.name]: SidebarItem,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem
  },
  data: function() {
    return {
      activeKey: 0,
      cateArr: []
    }
  },
  computed: {
    ...mapState('good', ['goodObj'])
  },
  watch: {
    // 在这里实现缓存：
    // 当侧边栏发生品类切换时，我们首先要去判断goodObj有没有我想要的数据
    // 如果有直接用，不必调接口
    // 如果没有，再调接口，并缓存
    activeKey: function() {
      let arr = this.goodObj[this.activeKey]
      // 当Vuex中没有我想要的数据时
      if(!(arr && arr.length>0)) {
        let params = {
          cate: this.cateArr[this.activeKey].cate,
          size: 100000,
          index: this.activeKey
        }
        this.fetchList(params)
      }
    }
  },
  mounted() {
    // 页面初始化
    this.init()
  },
  methods: {
    ...mapActions('good', ['fetchList']),
    ...mapMutations('good', ['clearGoodObj']),
    async init() {
      // 第一步，获取品类列表
      const res = await this.$api.fetchAllCates({})
      this.cateArr = res.list
      // 第二步，根据第一个品类下面的商品列表
      let params = {
        cate: this.cateArr[this.activeKey].cate,
        size: 100000,
        index: this.activeKey
      }
      // 触发actions
      this.fetchList(params)
    }
  },
  beforeDestroy() {
    // 触发mutaions方法，清除缓存
    this.clearGoodObj()
  }
}
</script>

<style lang="scss" scoped>
.qf-find {
  .left {
    position: absolute;
    top: 0;
    bottom: 1.33rem;
    left: 0;
    width: 2.13rem;
    overflow: auto;
  }
  .right {
    position: absolute;
    top: 0;
    bottom: 1.33rem;
    left: 2.13rem;
    right: 0;
    overflow: auto;
    .good-item {
      &>img {
        display: inline-block;
        width: 1.6rem;
        height: 1.6rem;
      }
      &>div {
        font-size: .4rem;
      }
    }
  }
}
</style>
