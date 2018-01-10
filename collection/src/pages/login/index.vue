<template>
  <div id="login" class="login-container">
  			 <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
      class="card-box login-form">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="username">
        <!-- <span class="svg-container svg-container_login">
         <i class="" />
        </span> -->
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item prop="password">
        <!-- <span class="svg-container">
          <i class=""></i>
        </span> -->
        <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
          placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;padding:10px 15px" :loading="loading" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
      <div class='tips'>
        <span style="margin-right:20px;">用户名: admin</span>
        </span> 密码: admin</span>
      </div>
    </el-form>
  </div>
</template>
<script>
	import { isvalidUsername } from '@/utils/validate'
	export default {
		data() {
    const validateUsername = (rule, value, callback) => {
    //   if (!isvalidUsername(value)) {
    //     callback(new Error('请输入正确的用户名'))
    //   } else {
        callback()
    //   }
    }
    const validatePass = (rule, value, callback) => {
    //   if (value.length < 5) {
    //     callback(new Error('密码不能小于5位'))
    //   } else {
        callback()
    //   }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
         this.$store.dispatch('LoginByUsername', this.loginForm).then((res) => {
            this.loading = false
            this.$router.push({ path: '/' })
                this.showDialog = true
          }).catch((res) => {
               this.$message({
                message: res,
                type: 'error',
                duration: 5 * 1000
               })
             
            this.loading = false
           })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
	
	
	
  }
</script>
<style>
	.fa-lock,.fa-user{
		color: #666;
	}
	.login-container{
		position: relative;
 	 	width: 100%;
  	height: 100%;
  	height: 100vh;
  	background: #2d3a4b;
	}
	.login-container input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #eee;
      height: 36px!important;
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
   	.el-input {
      display: inline-block;
      height: 36px;
      width: 85%;
    }
    .tips {
      font-size: 13px;
      color: #fff;
      margin-bottom: 10px;
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: #eee;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
		.login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: #889aa4;
      cursor: pointer;
    }
    .thirdparty-button{
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
#login .el-button{padding: 10px 15px!important}
</style>
