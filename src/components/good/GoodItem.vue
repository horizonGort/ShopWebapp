<template>
<div class="qf-good-item" @touchstart='skipToDetail'>
  <img :src="$img.imgBaseUrl+good.img" :alt="good.name"/>
  <div class="desc" v-text='good.desc'></div>
  <div class="price">
    ￥<span v-text='good.price'></span>
  </div>
</div>
</template>

<script>
export default {
  props: {
    good: {
      type: Object,
      required: false,
      default: function() {
        return {}
      }
    }
  },
  methods: {
    // 跳转到商品详情页
    skipToDetail() {
      this.$router.push('/good/detail/'+this.good._id)
    }
  }
}
</script>

<style lang="scss" scoped>
.qf-good-item {
  font-size: .37rem;
  padding: .13rem .2rem;
  background-color: white;
  margin: 0 .13rem;
  border-radius: .13rem;
  img {
    display: block;
    width: 100%;
    height: 3.73rem;
    margin: 0 auto;
  }
  &>div.desc {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    line-height: .6rem;

  }
}
</style>
