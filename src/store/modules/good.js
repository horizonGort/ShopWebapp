import { fetchGoodList } from '@/utils/api'

export default {
  namespaced: true,
  state: {
    goodObj: {}
  },
  mutations: {
    // 用于更新goodObj
    updateGoodObj(state, payload) {
      state.goodObj[payload.k] = payload.v
      // 深复制，让Vuex知道goodObj发生了变化
      state.goodObj = JSON.parse(JSON.stringify(state.goodObj))
    },
    // 用于清缓存
    clearGoodObj(state) {
      state.goodObj =  {}
    }
  },
  actions: {
    fetchList(store, params) {
      // 调接口，获取当前品类下面的商品列表
      fetchGoodList(params).then(res=>{
        console.log('当前品类下的商品列表', res)
        let payload = {
          k: params.index,
          v: res.list
        }
        store.commit('updateGoodObj', payload)
      })
    }
  }
}
