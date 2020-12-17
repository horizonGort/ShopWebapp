<template>
<div class="qf-home">
  <!-- 让整个页面都可以下拉刷新 -->
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">

    <!-- 通知栏 -->
    <van-notice-bar
      left-icon="volume-o"
      :text="msg"
      mode="closeable"
      background='#F30F05'
      color='#ffffff'
    />

    <!-- 搜索框 -->
    <van-search
      shape="round"
      background="#F30F05"
      :placeholder="placeText"
      show-action
      disabled
    >
      <template #action>
        <div class="login" @touchstart="skipToLogin">登录</div>
      </template>
    </van-search>

    <!-- 轮播图 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="item in images" :key="item._id">
        <img v-lazy="$img.imgBaseUrl+item.img" />
      </van-swipe-item>
    </van-swipe>

    <!-- 商品列表提示图 -->
    <div class="good-list-tip">
      <van-image src="//img12.360buyimg.com/img/s750x70_jfs/t1/124583/37/16524/12470/5f9bc181E48c91215/cac00c52cb0b2fa4.png" />
    </div>

    <!-- 商品列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="商品没有了"
      @load="onLoad"
      :immediate-check='false'
      offset='80'
    >
      <van-cell v-for='item in length' :key='item'>
        <GoodItem :good='goodArr[2*item-2]' />
        <GoodItem :good='goodArr[2*item-1]' />
      </van-cell>
    </van-list>


  </van-pull-refresh>

  <TabBar />
</div>
</template>

<script>
import { TabBar, GoodItem } from '@/components/'
import {
  NoticeBar,
  Search,
  Swipe,
  SwipeItem,
  Image,
  List,
  PullRefresh,
  Cell
} from 'vant'
export default {
  name: 'Home',
  components: {
    TabBar,
    [NoticeBar.name]: NoticeBar,
    [Search.name]: Search,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Image.name]: Image,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    [Cell.name]: Cell,
    GoodItem
  },
  data: function() {
    return {
      msg: '京东双12，全场1折。京东双12，全场1折京东双12，全场1折京东双12，全场1折',
      hotGoods: [
        { id: 1, name: '针式打印机' },
        { id: 2, name: '行车记录仪' },
        { id: 3, name: '云南白药1' },
        { id: 4, name: '云南白药2' },
        { id: 5, name: '云南白药3' },
        { id: 6, name: '云南白药4' }
      ],
      images: [],
      loading: false,   // 每次触底加载后，都要重置为false
      finished: false,  // 这个只用表示数据库已经没有数据了
      refreshing: false,   // 控制下拉刷新
      goodArr: [],
      page: 1,
      total: 0
    }
  },
  computed: {
    placeText: function() {
      return this.hotGoods[Math.floor(Math.random()*this.hotGoods.length)].name
    },
    length: function() {
      return Math.floor(this.goodArr.length/2)
    }
  },
  mounted() {
    // 页面初始化
    this.getList()
    this.$api.fetchAdList({}).then(res=>{
      this.images = res.list
    })
  },
  methods: {
    getList() {
      let params = {
        size: 6,
        page: this.page,
        hot: true
      }
      this.$api.fetchGoodList(params).then(res=>{
        console.log('首页商品列表', res)
        this.total = res.total
        // 下拉刷新是重置
        if(params.page===1) {
          this.goodArr = res.list
          // 重置完成之后，停止掉下拉刷新的状态
            this.refreshing = false
            // 重置完成之后，恢复List的触底功能
            this.finished = false
            this.loading = false
        }else{
          // 触底分页是追加数据
          this.goodArr = [...this.goodArr, ...res.list]
          // 每天触底分页调接口完成后，停止掉List的当前load事件
          this.loading = false
        }
      })
    },
    skipToLogin() {
      this.$router.push('/login')
    },
    onRefresh() {
      console.log('下拉刷新')
      this.page = 1
      this.getList()
    },
    onLoad() {
      console.log('触底加载')
      // 只有当数据库还有数据时，才调接口
      if(this.goodArr.length < this.total) {
        this.page++
        this.getList()
      } else {
        // 当后端数据库没有数据时，一定finished=true，
        // 否则 List组件持续触发 load 事件
        // 让List的触底加载功能失效
        this.finished = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.qf-home {
  padding-bottom: 1.8rem;
  .login {
    color: white;
  }
  .van-swipe {
    height: 3.6rem;
    img {
      display: block;
      height: 100%;
      width: 100%;
    }
  }
  .good-list-tip {
    padding-top: .33rem;
    .van-image {
      display: block;
      width: 100%;
      height: .93rem;
    }
  }
  .van-cell {
    background: transparent;
    padding-left: .13rem;
    padding-right: .13rem;
    &>div {
      display: flex;
      &>div {
        flex: 1;
      }
    }
  }
}
</style>
