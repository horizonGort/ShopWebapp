<template>
<div class="qf-login">
  <div class="title">登录</div>
  <van-form @submit="login">
    <van-field
      v-model="user.username"
      name="用户名"
      label="用户名"
      placeholder="用户名"
      :rules="[{ required: true, message: '请填写用户名' }]"
    />
    <van-field
      v-model="user.password"
      type="password"
      name="密码"
      label="密码"
      placeholder="密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit">
        立即登录
      </van-button>
    </div>
  </van-form>
  <div class="tip" @touchstart='skipToRegist'>没有账号，请注册</div>
</div>
</template>

<script>

import {
  Form,
  Field,
  Button
} from 'vant'

export default {
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button
  },
  data: function() {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      console.log('user', this.user)
      this.$api.fetchLogin(this.user).then(res=>{
        console.log('登录成功', res)
        localStorage.setItem('token', res.token)
        this.$router.back()
      })
    },
    skipToRegist() {
      this.$router.replace('/regist')
    }
  }
}
</script>

<style lang="scss" scoped>
.qf-login {
  .title {
    text-align: center;
    font-size: .45rem;
    line-height: 1.07rem;
  }
  .tip {
    line-height: .67rem;
    text-align: center;
    color: red;
    font-size: .44rem;
  }
}
</style>
