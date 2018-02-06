<template>
  <div id="login" class="login-container">
    <h2 class="top">长城金融催收系统</h2>
  			 <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
      class="card-box login-form">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="username">
        <span class="DL">
         <i class="fa fa-user " />
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="请输入用户名"  />
      </el-form-item>
      <el-form-item prop="password">
        <span class="DL">
          <i class="fa fa-lock"></i>
        </span>
        <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
          placeholder="请输入密码" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" class="LoginBtn" :loading="loading" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
      <div class='tips'>
        <span style="margin-right:20px;">用户名: admin</span>
        </span> 密码: admin</span>
      </div>
    </el-form>
     <div class="footer">&copy;  2016 Tianjin Great Wall Binyin Automotive Finance Co. Ltd. All rights reserved</div>
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
       localStorage.setItem("userName",this.loginForm.username);
        localStorage.setItem("nextNum"," ");
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
  	/* background: #2d3a4b; */
    background: url('../../assets/kv5.jpg')no-repeat 0px 0px;
    background-attachment: fixed;
    background-position: 27% 50%;
    background-size: cover;
    /* background: url(@/assets/kv5.jpg)no-repeat 0px 0px; */
	}
	.login-container input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      /* padding: 12px 5px 12px 15px; */
      color: #eee;
      height: 36px!important;
       -webkit-box-shadow: 0 0 0px 1000px #565f6e inset !important; 
      -webkit-text-fill-color: #fff !important;
    }
   	.el-input {
      display: inline-block;
      height: 36px;
      width: 85%;
      border-radius: 3px;
    }
    .el-input__inner{
      border-radius: 3px!important
    }
    .tips {
      font-size: 13px;
      color: #000;
      margin-bottom: 10px;
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: #bb9c25;
      text-shadow: 2px 2px 1px #fff;
      margin: 0px auto 40px auto;
      text-align: center;
      letter-spacing: 4px;
      font-weight: bold;
    }
    .DL{
      display:inline-block;width:44px;text-align:center;font-size: 29px;vertical-align: -4px
    }
		.login-form {
      position: absolute;
      /* left: 0; */
      right: 10%;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 150px auto;
    }
    .footer{
      position:absolute;
    bottom:40px;
    font-size: 15px;
    font-weight: 500;
    width:100%;
    text-align: center;
    text-transform: capitalize;
    color: #fff;
    letter-spacing: 2px;
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
#login .LoginBtn{font-size:18px;letter-spacing: 10px}
#login .top{text-align: center;font-size:40px;letter-spacing: 10px;text-shadow: -1px -1px 0 #fff,1px 1px 0 #333,1px 1px 0 #444;width: 100%;position: absolute;top:60px;color: #bb9c25}
#login .el-form-item{margin-bottom: 22px!important}
.LoginBtn{padding:10px 15px!important;font-size:18px!important;letter-space:10px!important}
</style>
