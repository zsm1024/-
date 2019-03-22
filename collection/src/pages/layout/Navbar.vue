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
        <el-badge :value="countNum" class="item">
          <el-button type="primary" class="fa fa-commenting el-dropdown-link" size="small" circle></el-button>
        </el-badge>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item style="text-align:right">
            <el-button type="warning" class="fa fa-refresh" size="mini" @click="NumsClicks">&nbsp;刷新</el-button>
          </el-dropdown-item>
          <el-dropdown-item>
            <p class="listDetials" @click="NumsClicks">
              协办的案件:
              <span>{{coNewsNum}}</span>
            </p>
          </el-dropdown-item>
          <el-dropdown-item>
            <p class="listDetials" @click="NumsClicks">
              转队列案件:
              <span>{{trunNewsNum}}</span>
            </p>
          </el-dropdown-item>
          <el-dropdown-item>
            <p class="listDetials" @click="NumsClicks">
              审批通过或关闭:
              <span>{{unReadApply}}</span>
            </p>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown trigger="click">
        <el-badge :value="NewsTip" class="item">
          <el-button type="primary" class="fa fa-bell el-dropdown-link" size="small" circle></el-button>
        </el-badge>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item style="text-align:right">
            <el-button type="warning" class="fa fa-refresh" size="mini" @click="closed()">&nbsp;刷新</el-button>
          </el-dropdown-item>
          <el-dropdown-item v-if="isCarShow">
            <router-link class="a-href listDetials" :to="{path:'/'}">
              车辆进站:
              <span>{{carIn}}</span>
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item v-if="isShow">
            <span @click="approvalCountClick">
              <router-link class="a-href listDetials" :to="{path:'/IcsPage/spdata/splist/103'}">
                待审批案件:
                <span>{{approvalCount}}</span>
              </router-link>
            </span>
          </el-dropdown-item>
          <el-dropdown-item>
            <span @click="applySendClick" v-if="isSpShow">
              <router-link class="a-href listDetials" :to="{path:'/IcsPage/outerdata/splist/127'}">
                派案待审批:
                <span>{{applySend}}</span>
              </router-link>
            </span>
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
import {
  ApprovalCount,
  getUnReadApplyCount,
  getSendCaseCount,
  updateApplyNewsFlag,
  updateNewsFlag,
  getUnReadNewsCount,
  findByType
} from "@/api/basedata";
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
      countNum: 0,
      log: errLogStore.state.errLog,
      cancelhost: false,
      formLabelWidth: "120px",
      messageform: {
        oldPassWord: "",
        newPassWord: ""
      },
      coNewsNum: 0,
      NewsTip: 0,
      trunNewsNum: 0,
      approvalCount: 0,
      applySend: 0,
      unReadApply: 0,
      SpList: [],
      SdList: [],
      carList: [],
      isShow: false,
      isSpShow: false,
      isCarShow: false,
      carIn: 1
    };
  },
  computed: {
    ...mapGetters(["sidebar", "name", "avatar"])
  },
  methods: {
    closed() {
      updateApplyNewsFlag().then(res => {
        if (!res.data.success) {
          this.$message({
            type: "error",
            message: res.data.message
          });
        }
      });
    },
    Coclosed() {
      updateNewsFlag().then(res => {
        if (!res.data.success) {
          this.$message({
            type: "error",
            message: res.data.message
          });
        }
      });
    },
    findType() {
      let para = {
        type: "SpList"
      };
      findByType(para).then(res => {
        let data = res.data.result;
        data.forEach(el => {
          this.SpList.push(el.val);
        });
        if (this.SpList.indexOf(localStorage.getItem("userName")) != -1) {
          this.isShow = true;
        }
      });
      let paras = {
        type: "SendList"
      };
      findByType(para).then(res => {
        let data = res.data.result;
        data.forEach(el => {
          this.SdList.push(el.val);
        });
        if (this.SdList.indexOf(localStorage.getItem("userName")) != -1) {
          this.isSpShow = true;
        }
      });
      let carParas = {
        type: "CarMan"
      };
      findByType(carParas).then(res => {
        let data = res.data.result;
        data.forEach(el => {
          this.carList.push(el.val);
        });
        console.log(this.carList);
        if (this.carList.indexOf(localStorage.getItem("userName")) != -1) {
          this.isCarShow = true;
        }
      });
    },
    approvalCountClick() {
      this.approvalCount = 0;
      this.getgetUnReadNewsCount();
      this.closed();
    },
    NumsClicks() {
      this.unReadApply = 0;
      this.getgetUnReadNewsCount();
      this.Coclosed();
    },
    applySendClick() {
      this.applySend = 0;
      this.getgetUnReadNewsCount();
      this.closed();
    },
    getUnRead() {
      getUnReadApplyCount().then(res => {
        this.unReadApply = res.data.result;
      });
    },
    getgetUnReadNewsCount() {
      getUnReadNewsCount().then(res => {
        if (res.data.success) {
          this.coNewsNum = res.data.result.coNewsNum;
          this.trunNewsNum = res.data.result.trunNewsNum;
          this.countNum = this.coNewsNum + this.trunNewsNum + this.unReadApply;
          this.NewsTip = this.approvalCount + this.applySend + this.carIn;
        }
      });
    },
    getgetSendCaseCount() {
      getSendCaseCount().then(res => {
        this.sendDialog = true;
        this.applySend = res.data.result;
      });
    },
    getApprovalCount() {
      ApprovalCount().then(res => {
        this.approvalCount = res.data.result;
      });
    },
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
    },
    InterVels() {
      setInterval(() => {
        this.getApprovalCount();
        this.getgetSendCaseCount();
        this.getUnRead();
        this.getgetUnReadNewsCount();
      }, 300000);
    }
  },
  mounted() {
    this.getApprovalCount();
    this.getgetSendCaseCount();
    this.getUnRead();
    this.getgetUnReadNewsCount();
    this.findType();
    this.InterVels();
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
.fa-bell,
.fa-commenting {
  border-radius: 36px;
  height: 36px;
  width: 36px;
  position: relative;
  margin-top: 11px;
}
.listDetials {
  font-size: 15px;
  span {
    color: red;
  }
}
</style>



