import fetch from './fetch'


// 首页商品列表
// size, page, cate, hot
export function fetchGoodList(params) {
  return fetch({
    url: '/api/v1/jd/good/list',
    method: 'GET',
    params
  })
}

// 获取品类
export function fetchAllCates(params) {
  return fetch({
    url: '/api/v1/jd/cates',
    method: 'GET',
    params
  })
}

// 获取商品详情
export function fetchGoodInfo(params) {
  return fetch({
    url: '/api/v1/jd/good/detail',
    method: 'GET',
    params
  })
}

// 购买
// { id: _id, num: 1 }
export function fetchAddCart(data) {
  return fetch({
    url: '/api/v1/jd/cart/add',
    method: 'POST',
    data
  })
}

// 登录
// { username, password }
export function fetchLogin(data) {
  return fetch({
    url: '/api/v1/user/login',
    method: 'POST',
    data
  })
}

// 注册
// { username, password, password2 }
export function fetchRegist(data) {
  return fetch({
    url: '/api/v1/user/regist',
    method: 'POST',
    data
  })
}

// 获取购物车列表
export function fetchCart(params) {
  return fetch({
    url: '/api/v1/jd/cart/list',
    method: 'GET',
    params
  })
}

// 删除购物车商品
// { id: 购物车集合中文档的 _id }
export function fetchDelCart(params) {
  return fetch({
    url: '/api/v1/jd/cart/del',
    method: 'GET',
    params
  })
}

// 修改购物车商品数量
// { id: 同上, num: 修改后的数量 }
export function fetchUpdCart(data) {
  return fetch({
    url: '/api/v1/jd/cart/update',
    method: 'POST',
    data
  })
}

// 提交购物车
// { goods: String 用户已勾选的订单_id 连接而成的字符串 }
export function fetchSubmitCart(data) {
  return fetch({
    url: '/api/v1/jd/cart/submit',
    method: 'POST',
    data
  })
}

// 获取轮播图列表
export function fetchAdList(params) {
  return fetch({
    url: '/api/v1/ad/list',
    method: 'GET',
    params
  })
}


// /cates
// /good/detail

// /cart/add
// /cart/list
// /cart/update
// /cart/del
// /cart/submit

export default {
  fetchGoodList,
  fetchAllCates,
  fetchGoodInfo,
  fetchAddCart,
  fetchLogin,
  fetchCart,
  fetchRegist,
  fetchDelCart,
  fetchUpdCart,
  fetchSubmitCart,
  fetchAdList
}
