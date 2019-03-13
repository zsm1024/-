<template>
  <el-menu class="navbar" mode="horizontal">
    <div style="width:7%">
      <hamburger
        class="hamburger-container"
        :toggleClick="toggleSideBar"
        :isActive="sidebar.opened"
      ></hamburger>
      <router-link to="/" class="homeIcon">
        <i class="fa fa-home fa-lg"></i>
      </router-link>
    </div>
    <div style="width:76%">
      <tabs-view></tabs-view>
    </div>
    <!-- <levelbar></levelbar> -->
    <div class="newsTip">
      <el-dropdown trigger="click">
        <el-badge :value="2" class="item" >
          <el-button type="primary" class="fa fa-bell el-dropdown-link" size="small" circle ></el-button>
        </el-badge>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item style="text-align:right">
               <el-button                      
                      type="warning"
                      class="fa fa-refresh"
                      size="mini"
                    > &nbsp;刷新</el-button>
          </el-dropdown-item>
          <el-dropdown-item >
              <router-link  class="a-href listDetials"
                :to="{path:'/'}">车辆进站:<span>1</span></router-link>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          {{name}}
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu class="user-dropdown" slot="dropdown">
          <router-link class="inlineBlock" to="/">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span @click="changeSub" style="display:block;">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <error-log v-if="log.length>0" class="errLog-container" :logsList="log"></error-log>
    <el-dialog
      title="修改密码"
      :visible.sync="cancelhost"
      :modal="true"
      :modal-append-to-body="false"
      id="MsgDialog"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <el-form :model="messageform">
        <el-form-item label="旧密码" :label-width="formLabelWidth">
          <el-input v-model="messageform.oldPassWord" clearable style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="新密码 " :label-width="formLabelWidth">
          <el-input v-model="messageform.newPassWord" clearable style="width:300px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- @click="addWorkInfo" -->
        <el-button style="padding:10px" @click.native.prevent="cancleDialog" type="primary">取 消</el-button>
        <el-button
          type="primary"
          @click.native.prevent="OkSub('messageform')"
          style="padding:10px"
        >确 定</el-button>
      </div>
    </el-dialog>
  </el-menu>
</template>

<script>
import { mapGetters } from "vuex";
import Levelbar from "./Levelbar";
import TabsView from "./TabsView";
import Hamburger from "@/components/Hamburger";
import Screenfull from "@/components/Screenfull";
import ErrorLog from "@/components/ErrLog";
import errLogStore from "@/store/errLog";
import { changeSub } from "@/api/auth";
export default {
  components: {
    Levelbar,
    TabsView,
    Hamburger,
    ErrorLog,
    Screenfull
  },
  data() {
    return {
      log: errLogStore.state.errLog,
      cancelhost: false,
      formLabelWidth: "120px",
      messageform: {
        oldPassWord: "",
        newPassWord: ""
      }
    };
  },
  computed: {
    ...mapGetters(["sidebar", "name", "avatar"])
  },
  methods: {
    changeSub() {
      this.cancelhost = true;
    },
    cancleDialog() {
      this.cancelhost = false;
      this.messageform.oldPassWord = "";
      this.messageform.newPassWord = "";
    },
    OkSub() {
      let para = {
        username: localStorage.getItem("userName"),
        oldPassword: this.messageform.oldPassWord,
        newPassword: this.messageform.newPassWord
      };
      changeSub(para).then(res => {
        if (res.data.success) {
          this.$message({
            type: "success",
            message: res.data.message
          });
          this.cancelhost = false;
          setTimeout(() => {
            this.logout();
          }, 300);
        } else {
          this.$message({
            type: "error",
            message: res.data.message
          });
        }
        this.messageform.oldPassWord = "";
        this.messageform.newPassWord = "";
      });
    },
    toggleSideBar() {
      this.$store.dispatch("ToggleSideBar");
    },
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload(); // 为了重新实例化vue-router对象 避免bug;
        localStorage.removeItem("userName");
        localStorage.removeItem("phoneNum");
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  display: flex;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .errLog-container {
    display: inline-block;
    position: absolute;
    right: 150px;
  }
  // .screenfull {
  //   position: absolute;
  //   right: 133px;
  //   top: 18px;
  //   color: red;
  // }
  .avatar-container {
    height: 50px;
    display: inline-block;
    .avatar-wrapper {
      cursor: pointer;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
    }
  }
  .newsTip {
    width: 17%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
}
.homeIcon {
  height: 50px;
  line-height: 43px;
  font-size: 20px;
  color: #20a0ff;
}
.fa-bell {
  border-radius: 36px;
  height: 36px;
  width: 36px;
  position: relative;
  margin-top: 11px;
}
.fa-bell:before {
  position: absolute;
  right: 10px;
  top: 10px;
}
.listDetials{
  font-size: 15px;
  span{color: red}
  }
</style>



