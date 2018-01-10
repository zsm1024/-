var zeroCfgURL, operatorId, vcid, password, md5Util = new MD5(), eh,currentAgentId,currentOPT,vcid,dispayNum,callOutFlag,currentStat,currentCallId;
var $btnConference1,$btnMeeting,$btnConference3,$btnSignIn, $btnSignOut, $btnCallOut, $btnSetIdle, $btnSetBusy, $btnHangup,$btnAnswer,$btnHold,$btnRetrieveHold,$btnSingleStepTransfer,$btnCallInside,$btnReleaseCallByCallID,$btnConference,callingStatus=false;


$(function() {
	zeroCfgURL=$("#zeroCfgURL").val();
	vcid=$("#cti_vcid").val();
	operatorId = $.trim($("#operatorId").val());
	currentAgentId=$.trim($("#operatorId").val());
	dispayNum=$.trim($("#dispayNum").val());
	currentCallId=0;
	if(dispayNum.length<4){
		dispayNum='65276777';
	}
	currentOPT='';
	callOutFlag=0;
	currentStat=-1;
	//初始化按钮
	buildBtns();
});
 
/**
 * 刷新按钮状态
 * @param state 状态码
 */
 
function refreshBtns(state) {
	if(state==1){ 
		$btnSignIn.text("签入")
		$btnSignIn.unbind("click");
		$btnSignIn.one("click",clickBtnSignIn);
		$btnSignIn.removeAttr("disabled");  
		$btnSetIdle.text("示闲")
		$btnSetIdle.unbind("click");
		$btnSetIdle.one("click",clickSetIdle); 
		$btnSetIdle.attr("disabled", true); 
		$btnSignOut.attr("disabled", true);  
		$btnCallOut.attr("disabled", true);
		$btnHangup.attr("disabled", true);  
		$btnAnswer.attr("disabled", true);  
		$btnHold.attr("disabled", true);  
		$btnRetrieveHold.attr("disabled", true);  
		$btnSingleStepTransfer.attr("disabled", true);  
		$btnCallInside.attr("disabled", true);  
//		$btnReleaseCallByCallID.attr("disabled", true);  
		$btnConference.attr("disabled", true);
		currentOPT='';
		callingStatus=false;
	} 
//登录
if(state==100){
	$btnSignIn.text("签出")
	$btnSignIn.unbind("click");
	$btnSignIn.one("click",clickSignOut);
	$btnSignIn.removeAttr("disabled");  
	$btnSetIdle.text("示闲")
	$btnSetIdle.unbind("click");
	$btnSetIdle.one("click",clickSetIdle); 
	//$btnSetIdle.removeAttr("disabled");
	$btnSetIdle.attr("disabled", false);
	$btnSignOut.attr("disabled", true);  
	$btnCallOut.removeAttr("disabled");
	$btnCallOut.text("拨号")
	$btnCallOut.unbind("click");
	$btnCallOut.one("click",clickCallOut);
	
	$btnHangup.attr("disabled", true);  
	$btnAnswer.attr("disabled", true);  
	$btnHold.attr("disabled", true);  
	$btnRetrieveHold.attr("disabled", true);  
	$btnSingleStepTransfer.attr("disabled", true);  
	$btnCallInside.attr("disabled", true);
//	$btnReleaseCallByCallID.attr("disabled", true);  
	$btnConference.attr("disabled", true); 
	$btnMeeting.attr("disabled", true); 
	currentOPT='';
	callingStatus=false;
} 
//示忙 105  
if(state==105){
	$btnSignIn.text("签出")
	$btnSignIn.unbind("click");
	$btnSignIn.one("click",clickSignOut);
	$btnSignIn.removeAttr("disabled");  
	$btnSetIdle.removeAttr("disabled");  
	
	$btnSetIdle.text("示闲");
	$btnSetIdle.unbind("click");
	$btnSetIdle.one("click",clickSetIdle);
	$btnSignOut.attr("disabled", true);   
	$btnCallOut.removeAttr("disabled");
	$btnCallOut.text("拨号")
	$btnCallOut.unbind("click");
	$btnCallOut.one("click",clickCallOut);
	$btnHangup.attr("disabled", true);  
	$btnAnswer.attr("disabled", true);  
	$btnHold.attr("disabled", true);  
	$btnRetrieveHold.attr("disabled", true);  
	$btnSingleStepTransfer.attr("disabled", true);  
	$btnCallInside.attr("disabled", true);  
//	$btnReleaseCallByCallID.attr("disabled", true);  
	$btnConference.attr("disabled", true);
	$btnMeeting.attr("disabled", true);
	callingStatus=false;
} 
if(state==107){
	$btnCallOut.removeAttr("disabled");
	$btnCallOut.text("取消")
	$btnCallOut.unbind("click");
	$btnCallOut.one("click",clickHangup);
	callingStatus=false;
} 
if(state==200){
	$btnSignIn.text("签出")
	$btnSignIn.unbind("click");
	$btnSignIn.one("click",clickSignOut);
	$btnSignIn.removeAttr("disabled"); 
	$btnSetIdle.removeAttr("disabled"); 
	$btnSetIdle.text("示忙")
	$btnSetIdle.unbind("click");
	$btnSetIdle.one("click",clickSetBusy); 
	$btnSignOut.attr("disabled", true);  
	$btnCallOut.removeAttr("disabled");
	$btnCallOut.unbind("click");
	$btnCallOut.one("click",clickCallOut);
	$btnHangup.attr("disabled", true);  
	$btnAnswer.attr("disabled", true);  
	$btnHold.attr("disabled", true);  
	$btnRetrieveHold.attr("disabled", true);  
	$btnSingleStepTransfer.attr("disabled", true);  
	$btnCallInside.attr("disabled", true);  
//	$btnReleaseCallByCallID.attr("disabled", true);  
	$btnConference.attr("disabled", true); 
	$btnMeeting.attr("disabled", true); 
	currentOPT='';
	callingStatus=false;
} 
 
if(state==300){
	
	$btnSignIn.text("签出")
	$btnSignIn.unbind("click");
	$btnSignIn.one("click",clickSignOut);
	$btnSignIn.attr("disabled", true); 
	$btnSetIdle.removeAttr("disabled");  
	$btnSignOut.attr("disabled", true);  
	$btnCallOut.attr("disabled", true);  
	$btnHangup.removeAttr("disabled");
	
	$btnAnswer.removeAttr("disabled");  
	$btnAnswer.text("挂机")
	$btnAnswer.unbind("click");
	$btnAnswer.one("click",satisfied);
	
	$btnHold.removeAttr("disabled");
	$btnHold.text("保持")
	$btnHold.unbind("click");
	$btnHold.one("click",Hold);
	$btnRetrieveHold.attr("disabled", true);  
	 
	$btnCallInside.removeAttr("disabled");
	$btnCallInside.text("咨询");
	$btnCallInside.unbind("click");
	$btnCallInside.one("click",Consultation);
	
	$btnSingleStepTransfer.text("转接");
	$btnSingleStepTransfer.removeAttr("disabled"); 
	$btnSingleStepTransfer.unbind("click");
	$btnSingleStepTransfer.one("click",showFreeAgent);
	
	$btnMeeting.removeAttr("disabled"); 
	$btnMeeting.text("会议");
	$btnMeeting.unbind("click");
	$btnMeeting.one("click",meetingShowFreeAgent);
	
	
	$btnCallInside.removeAttr("disabled");
//	$btnReleaseCallByCallID.attr("disabled", true);  
	$btnConference.attr("disabled", true); 
	
} 
if(state==301){
	$btnAnswer.text("挂机")
	$btnAnswer.unbind("click");
	$btnAnswer.one("click",clickHangup);
	$btnConference1.attr("disabled", true);
} 
if(state==302){
	$btnCallOut.removeAttr("disabled");
	$btnCallOut.text("取消")
	$btnCallOut.unbind("click");
	$btnCallOut.one("click",ReleaseCallByCallIDtoOut);
	$btnConference1.attr("disabled", true);
	
	$btnCallInside.removeAttr("disabled");
	$btnCallInside.text("咨询");
	$btnCallInside.unbind("click");
	$btnCallInside.one("click",Consultation);
	
	$btnSingleStepTransfer.text("转接");
	$btnSingleStepTransfer.removeAttr("disabled"); 
	$btnSingleStepTransfer.unbind("click");
	$btnSingleStepTransfer.one("click",showFreeAgent);
	
	$btnMeeting.removeAttr("disabled"); 
	$btnMeeting.text("会议");
	$btnMeeting.unbind("click");
	$btnMeeting.one("click",meetingShowFreeAgent);
} 

if(state==304){
	
	$btnSignIn.text("签出")
	$btnSignIn.unbind("click");
	$btnSignIn.one("click",clickSignOut);
	$btnSignIn.removeAttr("disabled");  
	$btnSetIdle.removeAttr("disabled");  
	$btnSignOut.attr("disabled", true);  
	$btnCallOut.attr("disabled", true);  
	$btnHangup.attr("disabled", true);  
	$btnAnswer.attr("disabled", true); 
	
	$btnHold.removeAttr("disabled"); 
	$btnHold.text("恢复")
	$btnHold.unbind("click");
	$btnHold.one("click",setRetrieveHold);
	
	$btnRetrieveHold.attr("disabled", true);  
	$btnSingleStepTransfer.attr("disabled", true); 
	
	$btnCallInside.removeAttr("disabled");
	$btnCallInside.text("取消")
	$btnCallInside.unbind("click");
	$btnCallInside.one("click",ReleaseCallByCallID);
	$btnCallInside.attr("disabled", true); 
	
	$btnConference1.attr("disabled", true);
	
//	$btnReleaseCallByCallID.attr("disabled", true);  
	$btnConference.attr("disabled", true);
	callingStatus=true;
} 
if(state==306){ 
	
	$btnCallInside.removeAttr("disabled");
	$btnCallInside.text("取消")
	$btnCallInside.unbind("click");
	$btnCallInside.one("click",ReleaseCallByCallID); 
	$btnConference1.removeAttr("disabled");

	callingStatus=true;
} 
if(state==307){ 
	$btnSignIn.text("签出")
	$btnSignIn.unbind("click");
	$btnSignIn.one("click",clickSignOut);
	$btnSignIn.removeAttr("disabled");  
	$btnSetIdle.removeAttr("disabled");  
	$btnSignOut.attr("disabled", true);  
	$btnCallOut.attr("disabled", true);  
	$btnHangup.attr("disabled", true);  
	$btnAnswer.attr("disabled", true); 
	
	$btnHold.removeAttr("disabled");
	$btnHold.text("唤醒")
	$btnHold.unbind("click");
	$btnHold.one("click",setRetrieveHold);
	$btnHold.attr("disabled", true);
	
	$btnRetrieveHold.attr("disabled", true);  
	$btnSingleStepTransfer.attr("disabled", true);  
 //579
	$btnCallInside.removeAttr("disabled");
	$btnCallInside.text("取消")
	$btnCallInside.unbind("click");
	$btnCallInside.one("click",cancelConsultation);
	
	
//	$btnReleaseCallByCallID.attr("disabled", true);  
//	$btnConference.attr("disabled", true);
	$btnConference1.removeAttr("disabled");
//	$btnConference3.removeAttr("disabled");

	callingStatus=true;
} 
if(state==312){
	
	$btnSignIn.text("签出")
	$btnSignIn.unbind("click");
	$btnSignIn.one("click",clickSignOut);
	$btnSignIn.attr("disabled", true);
//	$btnSetIdle.removeAttr("disabled");  
	$btnSignOut.attr("disabled", true);  
	$btnCallOut.attr("disabled", true);  
	$btnHangup.attr("disabled", true);
	
	$btnAnswer.removeAttr("disabled");
	$btnAnswer.text("接听")
	$btnAnswer.unbind("click");
	$btnAnswer.one("click",Answer1);
	
	$btnHold.attr("disabled", true);
	$btnRetrieveHold.attr("disabled", true);  
	$btnSingleStepTransfer.attr("disabled", true);  
	$btnCallInside.attr("disabled", true);  
	$btnConference.attr("disabled", true);

	callingStatus=true;
} 
if(state==313){
	$btnSignIn.text("签出")
	$btnSignIn.unbind("click");
	$btnSignIn.one("click",clickSignOut);
	$btnSignIn.attr("disabled", true);
	
	$btnSetIdle.removeAttr("disabled"); 
	$btnSetIdle.text("示忙")
	$btnSetIdle.unbind("click");
	$btnSetIdle.one("click",clickSetBusy);
	
	$btnCallOut.removeAttr("disabled"); 
	$btnCallOut.text("取消")
	$btnCallOut.unbind("click");
	$btnCallOut.one("click",ReleaseCallByCallIDtoOut);
	 
	$btnHangup.attr("disabled", true);  
	$btnAnswer.attr("disabled", true);  
	$btnHold.attr("disabled", true); 
	$btnRetrieveHold.attr("disabled", true);  
	$btnSingleStepTransfer.attr("disabled", true);  
	$btnCallInside.attr("disabled", true);  
//	$btnReleaseCallByCallID.attr("disabled", true);  
	$btnConference.attr("disabled", true);

	callingStatus=true;
} 
if(state==314){ 
	$btnConference1.attr("disabled", true);
} 
if(state==315){ 
	$btnConference1.attr("disabled", true);
} 
if(state==400){
	ajaxHandlerVoice("hangup");
	
	$btnSignIn.text("签出")
	$btnSignIn.unbind("click");
	$btnSignIn.one("click",clickSignOut);
	$btnSignIn.removeAttr("disabled");
	
	$btnCallOut.removeAttr("disabled"); 
	$btnCallOut.text("拨号")
	$btnCallOut.unbind("click");
	$btnCallOut.one("click",clickCallOut);
	
	$btnSetIdle.removeAttr("disabled");
	$btnSetIdle.text("示闲")
	$btnSetIdle.unbind("click");
	$btnSetIdle.one("click",clickSetIdle);
	
	$btnAnswer.attr("disabled", true);
	$btnAnswer.text("接听")
	$btnAnswer.unbind("click");
	$btnAnswer.one("click",Answer1);
	$btnCallInside.attr("disabled", true);
	$btnHold.attr("disabled", true);
	$btnConference1.attr("disabled", true);
	$btnSingleStepTransfer.attr("disabled", true);
	$btnMeeting.attr("disabled", true);
	currentOPT='';
	callingStatus=false;
} 
if(state==401){
	$btnSetIdle.removeAttr("disabled");
	$btnSetIdle.text("示闲")
	$btnSetIdle.unbind("click");
	$btnSetIdle.one("click",clickSetIdle);
	$btnSingleStepTransfer.attr("disabled", true); 
	currentOPT='';
	callingStatus=false;
}
}
//示闲成功事件
function  fOnSetIdleSuccess(){
	ajaxHandlerVoice("setidle"); 
	uuid="";
}
/**
 * 示闲失败事件
 */
function OnSetIdleFailure() {
	promptLastError();
}

/**
 * 示忙失败事件
 */
function OnSetBusyFailure() {
	promptLastError();
}

/**
 * 外呼失败事件
 */
function OnCallOutsideFailure() {
	promptLastError();
}

/**
 * 外呼成功事件
 */
function OnCallOutsideSuccess() {
	addMessages("外呼成功");
}



/**
 * 挂机成功事件
 */
function OnReleaseSuccess(mediatype, callid) {
	console.log("OnReleaseSuccess");
	//addMessages("挂机成功");
	ajaxHandlerVoice("hangup");
	top.iframe_inbound.after_hangup_to_sumup();
}
//坐席挂机转IVR成功触发事件
function OnSingleStepTransSuccess(){
	console.log("OnReleaseSuccess");
	ajaxHandlerVoice("hangup");
	top.iframe_inbound.after_hangup_to_sumup();
}
/**
 * 挂机失败事件
 */
function OnReleaseFailure(mediatype, callid) {
	addMessages("挂机失败");
}

//应答成功事件
function  fOnAnswerSuccess(mediatype,callid){ 
	console.log("fOnAnswerSuccess");
	ajaxHandlerVoice("answer"); 
}  
//通话录音操作（包括全程录音和非全程录音）停止时，触发此事件。
function  fOnRecordEvent(filename,len){
	console.log("recFileName->"+filename);
	Filename ="/zxinrecwav/rec/" + filename.substring(filename.indexOf("recPath=")+8);
	if(Filename.length>20){
		ajaxHandlerVoice("voiceFile");
	}
	
} 

/**
 * 提示最后一次发生的错误
 */
function promptLastError() {
	WebAgent.getLastError(function(errCode, errMsg) {
		addMessages(errMsg + "[" + errCode + "]");
	});
}
//内部呼叫成功
function onCallInsideSuccTalk(){
	//如果是会议按钮触发的内呼执行成功则开启会议功能
	if(currentOPT=='MEETING'){
		//与指定坐席呼叫成功，获取保持的电话的callId
		WebAgent.invoker("GetCallID",[1],function(callId){
			//启动三方通话
			 WebAgent.invoker("Conference",[callId],function(returnValue){ 
				 
				}); 
		});
	}
}
/**
 * 外呼通话建立事件
 */
function OnCallOutsideSuccTalk() {
	addMessages("外呼通话建立");
	ajaxHandlerVoice("answer");
	if(currentOPT=='MEETING'){
		//与指定坐席呼叫成功，获取保持的电话的callId
		WebAgent.invoker("GetCallID",[1],function(callId){
			//启动三方通话
			 WebAgent.invoker("Conference",[callId],function(returnValue){ 
				 
				}); 
		});
	}
}
//取消咨询恢复用户通话
function cancelConsultation(){
	//获取当前被保持的用户callid
	WebAgent.invoker("GetCallID",[1],function(callId){
		//恢复之前的通话
		 WebAgent.invoker("ReConnect",[callId],function(returnValue){ 
			 
			}); 
	});
	
}
function OnConsultationSuccess(){
	
}
/**
 * 执行登录
 */
function doSignIn() {
	
	console.log("agentId:"+operatorId);
	console.log("zeroCfgURL:"+zeroCfgURL);
	currentAgentId=parseInt(operatorId);
	
	WebAgent.signin({
		oid : operatorId,
		pwd : new MD5().hex_md5(password).toUpperCase(),
		vcid : vcid,
		type : "10",
		cfgUrl : zeroCfgURL,
		lang : "zh_CN", // lang: "en",
		//phoneType:2,
		//bindPhone:ctiA,
		onSucc : function() {
			onSucc_();
		},
		onError : function(errCode, errMsg) {
			alert("登录失败,原因【" + errMsg + "】");
		}
	});  
	
}

// 登录成功后处理函数
function onSucc_() {
	// 注册注册A接口事件
	
	eh = new WebAgent.EventHelper();
	eh.regEvent("OnStateChanged", function(state) {
		$("#state").val(state.stateCode);
		addMessages("状态切换至[" + state.name + ", 状态码：" + state.stateCode + "]");

		refreshBtns(state.stateCode);
		currentStat=state.stateCode;
		// 进入话后整理态后示闲
		if (state.stateCode == 400) {
			//默认没有注释掉
//			clickSetIdle();
		}
	});
	eh.regEvent("OnSetIdleFailure", OnSetIdleFailure);
	eh.regEvent("OnSetBusyFailure", OnSetBusyFailure);
	eh.regEvent("OnCallOutsideFailure", OnCallOutsideFailure);
	eh.regEvent("OnCallOutsideSuccTalk", OnCallOutsideSuccTalk);
	eh.regEvent("OnCallOutsideSuccess", OnCallOutsideSuccess);
	eh.regEvent("OnReleaseSuccess", OnReleaseSuccess);
	eh.regEvent("OnReleaseFailure", OnReleaseFailure);
	eh.regEvent("OnRingingEvent", fOnRingingEvent); 
	eh.regEvent("OnAnswerSuccess", fOnAnswerSuccess); 
	eh.regEvent("OnSetIdleSuccess", fOnSetIdleSuccess);
	eh.regEvent("OnRecordEvent", fOnRecordEvent);
	eh.regEvent("OnCallInsideSuccTalk",onCallInsideSuccTalk);
	eh.regEvent("OnSingleStepTransSuccess",OnSingleStepTransSuccess);
	eh.regEvent("OnConsultationSuccess",OnConsultationSuccess);

	// 设置为自动应答
	WebAgent.invoker("AutoAnswer", "false");
	WebAgent.invoker("FullRecord",[true]);
	WebAgent.invoker("RecordMode",[1]);
}

/**
 * 点击示忙按钮显示示忙原因
 */
function clickSetBusy() {
	//显示示忙原因窗口
	var box = top.div_busy;
	if(box.style.display == 'block'){
		box.style.display = 'none';
	}
	box.style.display = 'block';
	
}
//设置示忙并添加原因
function doSetBusy(reson){
	var resonCode=parseInt(reson);
	WebAgent.invoker("SetBusyEx", [resonCode,""]);
	
}
//隐藏示忙原因
function hideBusyReson(){
	var box = top.div_busy;
	box.style.display = 'none';
	$btnSetIdle.unbind("click");
	$btnSetIdle.one("click",clickSetBusy);
}
/**
 * 点击登录按钮事件
 */
function clickBtnSignIn() {  
  
	
	if (operatorId.length == 0) {
		alert("对不起没有使用软电话权限，请与管理员联系!");
		return;
	}

	operatorId = parseInt(operatorId, 10);
	if (isNaN(operatorId)) {
		alert("工号应为整数");
		return;
	}

	password = $.trim($("#password").val());
	if (password.length == 0) {
		alert("未输入密码");
		return;
	}    
	doSignIn(); 
}

/**
 * 点击签出按钮
 */
function clickSignOut() {
	
	WebAgent.logout(function(isSucc) { 
		//释放注册事件
		eh.dispose();
		addMessages("签出成功");
//		refreshBtns(0);
		$("#state").val(0);
		
		location.reload();
	});
}

/**
 * 点击示闲按钮
 */
function clickSetIdle() {
	
	WebAgent.invoker("SetIdle", " ");
	currentCallId=0;
	$("#callee").val("0");
}

/**
 * 点击呼出按钮
 */
function clickCallOut(){
	 flag=true;
	var callMode=0;
	var callee = $.trim($("#callee").val());
	if (callee.length == 0) {
		alert("未输入呼出号码");
		return;
	}
	if (isNaN(callee)) {
		alert("呼出号码应为数字");
		return;
	}
	if(callee.length<=6 ){
		//内部呼叫
		callMode=1
		
		
	}
	console.log("callMode->"+callMode);
	if(callMode==0){
		WebAgent.invoker("SetPreCall"," ",function(state){
			console.log("dispayNum->"+dispayNum);
			WebAgent.invoker("CallOutsideEx",[ 0,dispayNum,callee,"",0], function(ret) {
				if (ret != 0) {
					promptLastError();
				}
			}); 
		});
	 	
	}else{
		WebAgent.invoker("CallInside",[ callee,0], function(ret) {
			if (ret != 0) {
				promptLastError();
			}
		});  
		
	}
	
		
}
//外呼模块使用
 function doCallOut(outId,param){
	 	var callMode=0;
		var callee = outId;
		if(currentStat==-1){
			alert("请先签入软电话!");
			return;
		}
		console.log("callee->"+callee);
		if (callee.length == 0) {
			alert("未输入呼出号码");
			return;
		}
		if (isNaN(callee)) {
			alert("呼出号码应为数字");
			return;
		}
		if(callee.length<=6 && isCallOut(callee)==0){
			//内部呼叫
			callMode=1
		}
		 callOutFlag=1;
		 flag=true;
		console.log("callMode->"+callMode);
		if(callMode==0){
			WebAgent.invoker("SetPreCall"," ",function(state){
				console.log("dispayNum->"+dispayNum);
				WebAgent.invoker("CallOutsideEx",[ 0,dispayNum,callee,"",0], function(ret) {
					if (ret != 0) {
						promptLastError();
					}
				}); 
			});
		 	
		}else{
			WebAgent.invoker("CallInside",[ callee,0], function(ret) {
				if (ret != 0) {
					promptLastError();
				}
			});  
			
		}
 
	 
 }
/**
 *点击挂机按钮
 */
function clickHangup() {
	// 获取媒体类型 0：语音，6：视频
	 WebAgent.invoker("GetCallMediaType", "", function(mediatype){
         WebAgent.invoker("ReleaseCall", mediatype, function(ret){
                	 if(ret != 0){
                		 promptLastError(); 
                	 }
                 });
         });

}

/**
 * 添加消息内容
 * 
 * @param msg
 *            消息内容
 */
function addMessages(msg) {
	$("#messages").prepend(
			$("<p></p").text(new Date().toLocaleString() + " " + msg));
	$("#show").val(msg) 
}

/**
 * 构造按钮对象
 */
function buildBtns() {
	$btnSignIn = $("#btnSignIn");
	$btnSignOut = $("#btnSignOut");
	$btnCallOut = $("#btnCallOut");
	$btnSetIdle = $("#btnSetIdle11");
	$btnSetBusy = $("#btnSetBusy");
	$btnHangup = $("#btnHangup");
	$btnAnswer = $("#btnAnswer");
	$btnHold = $("#btnHold");
	$btnRetrieveHold = $("#btnRetrieveHold");
	$btnSingleStepTransfer = $("#btnSingleStepTransfer");
	$btnCallInside = $("#btnCallInside");
	$btnConference = $("#btnConference");
	$btnReleaseCallByCallID = $("#btnReleaseCallByCallID");
	$btnConference1 = $("#btnConference1");
	$btnMeeting = $("#btnMeeting");
	$btnConference3 = $("#btnConference3");
	$btnTransfer=$("#btnTransfer");
}

//转接功能- 打开在线坐席列表
function showFreeAgent(){
	top.window.queryFreeAgent(2);
}
function meetingShowFreeAgent(){
	top.window.queryFreeAgent(3);
}
//转接功能
function doSingleStepTransfer(callNum){
	var type=0;
	var callee = $.trim($("#callee").val());
	if(callNum.length>8){
		type=1;
		callee="65276777";
	}
	console.log("转接类型->"+type);
	console.log("dispayNum->"+callee);
	console.log("be called->"+callNum);
	WebAgent.invoker("SingleStepTransfer",[0,callNum,type,callee],function(returnValue){
		
	});
}

function closeAgentList(optType){
	top.freeAgentWindow.style.display = 'none';
	if(optType=='1'){
		//咨询
		$btnCallInside.unbind("click");
		$btnCallInside.one("click",Consultation);
	}if(optType=='2'){
		//转接
	$btnSingleStepTransfer.unbind("click");
	$btnSingleStepTransfer.one("click",showFreeAgent);
	}if(optType=='3'){
		//会议
	$btnMeeting.unbind("click");
	$btnMeeting.one("click",meetingShowFreeAgent);	
	}
	
}

/**
 * 操作按钮函数
 */ 
//打开示忙原因列表
function setBusyEx(){
	WebAgent.invoker("SetBusyEx", [ 1, null ], function(returnValue) {
		
	});
}
function showBusyInfo(){
	
}
//休息
function SetRest(){
	 
	WebAgent.invoker("SetRest",[104,null],function(returnValue){ 
	});
	alert("废弃");
}
//保持
function Hold(){
	
	WebAgent.invoker("Hold",function(returnValue){
		
	}); 
}
function setRetrieveHold(){
	 
	WebAgent.invoker("GetCallingNo",null,function(ret) {
		if (ret != 0) { 
			callingNo= ret 
			WebAgent.invoker("QueryCallIDOnAgent", [ callingNo ], function(callidValue) {
				
				callid = callidValue
				WebAgent.invoker("RetrieveHold",[callid],function(returnValue){
					  
				});
			});  
		}
	  });
}
function CallInside(){ 
	
	WebAgent.invoker("CallInside",[$("#callee").val(),0],function(returnValue){
		 
	});
	
}
function Conference(){ 
	WebAgent.invoker("Conference",[callidGlob],function(returnValue){ 
	});
	
}

 //会议功能
function doSingleStepConfCall(atiNum){ 
	flag = true;
	isORnotConsultation = true;
	Hold();
	var optMethod="CallInside";
	if(atiNum.length>6){
		optMethod="CallOutside";
	}
	if(optMethod=='CallInside'){
		//接入指定坐席
		WebAgent.invoker("CallInside",[atiNum,0],function(returnValue){
			currentOPT="MEETING";
		});
	}else{
		WebAgent.invoker("CallOutsideEx",[ 0,dispayNum,atiNum,"",0], function(ret) {
			currentOPT="MEETING";
		}); 
	}
	
	
}
function Answer1(){  
	WebAgent.invoker("Answer",[0],function(returnValue){
		 
	});
	
}
var curAgent = "";
var callingNo = "";
var callid = "";
function ReleaseCallByCallID(){
	WebAgent.invoker("ReleaseCallByCallID",[callidZxGlob],function(returnValue){
		
	}); 
}
function ReleaseCallByCallIDtoOut(){  
	 
	WebAgent.invoker("ReleaseCall",[0],function(returnValue){
		
	}); 
//	WebAgent.invoker("ReleaseCallByCallID",[callidGlob],function(returnValue){
//	}); 
}
 
//咨询  弹出在线坐席列表
function Consultation(){
	top.window.queryFreeAgent(1);
	
}
//调用咨询功能
function doConsultation(callNum){
	flag = true;
	isORnotConsultation = true;
	var calling = $.trim($("#callee").val());;
	var flag10 = 0;
	if(callNum.length>6){
		flag10=1
	}
	WebAgent.invoker("Consultation",[0, callNum,flag10, 0, calling], function(a){
		currentOPT='CONSULTATION';
	 });
}
//重连（复合操作，释放当前呼叫，恢复之前被保持的呼叫）。
function ReConnect(){
	WebAgent.invoker("ReConnect", [callidGlob], function(a){
 });
}

function Transfer(){ 
	ajaxHandlerVoice("hangup");
	WebAgent.invoker("Transfer",[0],function(a){ 
	}); 
}

//满意度
function satisfied(){
	  
		WebAgent.invoker("SingleStepTransferEx", [0,"4008;callid="+callidForsatis,3,"",""], function(b){
			  
		 });  
}

var uuid = "";
//全局callid
var callidGlob ="";
var callidZxGlob ="";
var callingGlob ="";
var calledGlob = "";
var callidForsatis ="";
//咨询标志，用来解决咨询之后生成两条记录的问题。
var isORnotConsultation = false;
//呼出标志
var flag = false;
//录音路径
var Filename="";
//操作voice表
function ajaxHandlerVoice(type,flagio){
	console.log("type:"+type,"flagio:"+flagio);
	//振铃
	var caller=callingGlob;
	var callee=calledGlob;
	
	
		if(type=="ring"){
			if( /^01[34578]\d{9}$/.test(caller) ){
				//输入为手机号码
				caller=caller.substring(1);
			}

			if( /^01[34578]\d{9}$/.test(callee) ){
				//输入为手机号码
				callee=callee.substring(1);
			}
					var  agentId = $("#agentId").val();
					var  agentName = $("#agentName1").val();
					jQuery.ajax({
					  	  type: 'GET',
					  	  url: "../voice/ring.action",
					  	  data: {"caller":caller,"callee":callee,"curAgent":agentId,"callid":callidGlob,"agentName":agentName,"flagio":flagio},
					  	  dataType: "text",
					  	  async:false,
					  	  contentType:"application/x-www-form-urlencoded;charset=utf-8",//此参数避免中文乱码
					  	  traditional: "true",
					  	  success: function(result){
					  		if(type=="ring"){
					  			uuid = result
							}
					 }
		 	});
	//应答
	}else if(type=="answer"){ 
		jQuery.ajax({
		  	  type: 'GET',
		  	  url: "../voice/answer.action",
		  	  data: {"uuid":uuid},
		  	  dataType: "text",
		  	  contentType:"application/x-www-form-urlencoded;charset=utf-8",//此参数避免中文乱码
		  	  traditional: "true",
		  	  success: function(result){ 
		  		if(type=="ring"){
		  			uuid = result 
		  		}
		  	  }
		  	});
		//挂机
	}else if(type=="hangup"){ 
		  
		jQuery.ajax({
		  	  type: 'GET',
		  	  url: "../voice/hangup.action",
		  	  data: {"uuid":uuid},
		  	  dataType: "text",
		  	  contentType:"application/x-www-form-urlencoded;charset=utf-8",//此参数避免中文乱码
		  	  traditional: "true"
		  	});	 
	}else if(type=="setidle"){
		jQuery.ajax({
		  	  type: 'GET',
		  	  url: "../voice/setidle.action",
		  	  data: {"uuid":uuid},
		  	  dataType: "text",
		  	  contentType:"application/x-www-form-urlencoded;charset=utf-8",//此参数避免中文乱码
		  	  traditional: "true",
		  	  success: function(result){ 
		  		if(type=="setidle"){
		  			uuid = result 
		  		}
		  	  }
		  	});	  
	}else if(type=="voiceFile"){
		jQuery.ajax({
			type: 'GET',
			url : "../voice/voiceFile.action",
			data: {"uuid":uuid,"FileName":Filename},
			dataType: "text",
			contentType:"application/x-www-form-urlencoded;charset=utf-8",//此参数避免中文乱码
			traditional: "true"
		});	  
	}
} 
function AjaxHandlerIVR(ivr,callid){
	 
//	jQuery.ajax({
//		type: 'GET',
//		url : "../voice/ivr.action",
//		data: {"ivr":ivr,"callid":callid},
//		dataType: "text",
//		contentType:"application/x-www-form-urlencoded;charset=utf-8",//此参数避免中文乱码
//		traditional: "true"
//	});	
	
} 

 
function  fOnRingingEvent(calling,called,callid1,UserData,CorrelateData,param){
	if(currentOPT!=''){
		return;
	}
	console.log(currentOPT);
	console.log(flag);
	console.log(calling);
	console.log(called);
	console.log(UserData);
	
	 callid = UserData.substring(UserData.indexOf("IDNO")+5,UserData.indexOf(";CLD"));
	 //防止一通电话触发多次震铃事件,currentCallId会在示闲后重置为0
	 if(callid==currentCallId && (currentOPT!='MEETING' || currentOPT!='CONSULTATION')){
		 return;
	 }else{
		 currentCallId=callid;
	 }
	 
	 var outDate=UserData.substring(UserData.indexOf("YQ")+3,UserData.indexOf(";IDNO"));
	 if(UserData.indexOf("YQ")==-1){
		 outDate=0;
	 }
	 console.log("outDate->"+outDate);
	 callidForsatis = callid1;
	 if (called == 4008) {

	} else { 
	var ctiAgentId = $("#ctiAgentId").val();
	var flagIO = false;
	if(called.length>6){
		flagIO = true;
	}else{
		flagIO = false;
	}
	$("#phone1").val(calling);
	
	if(!flag){
		$("#callee").val(calling);
		flag = false;
	}else{
		flag = false;
	}  
	if(isORnotConsultation){
		callidZxGlob = callid;
		isORnotConsultation = false;
	}else{
		console.log("ring");
		callidGlob = callid;
		callingGlob = calling;
		calledGlob = called;
		ajaxHandlerVoice("ring",flagIO);
		$("#voice_id").val(uuid);
	}
	var obj={};
	obj.ani = calling;
	obj.called = called;
	if(called!==ctiAgentId){
		obj.channel = "VOICE";
	}
	obj.channel = "VOICE";
	obj.phone = calling;
	obj.callId = callid;
	obj.callData=1;
	obj.commId = uuid;
	obj.custId = callid;
	if(callOutFlag==0){
		$('#callId').val(callid);
		$('#outDate').val(outDate);
		popScreen(obj);
	}
	callOutFlag=0;
	 }
}
/**
 * 这些号段为非CTI号段需 外呼至网关进行路由
 * 返回1 则表示需要调用外呼
 */
function isCallOut(num){
	if(isNaN(num)){
		return -1;
	}
    if(num>=4000 && num<=4009){
    	return 1;
    }else if(num>=8900 && num<=8999){
    	return 1;
    }else if(num>=6600 && num<=6699){
    	return 1;
    }else if(num>=6850 && num<=6899){
    	return 1;
    }
    return 0;
}

function Map() {
	this.keys = new Array();
	this.data = new Array();

	this.put = function(key, value) {
		if (this.data[key] == null) {
			this.keys.push(value);
		}
		this.data[key] = value;
	};

	this.get = function(key) {
		return this.data[key];
	};

	this.remove = function(key) {
		this.keys.remove(key);
		this.data[key] = null;
	};

	this.isEmpty = function() {
		return this.keys.length == 0;
	};

	this.size = function() {
		return this.keys.length;
	};
}



var  bb = new Map();
bb.put("110","产品咨询");
bb.put("120","产品安装及使用");
bb.put("130","产品投诉");
bb.put("140","产品建议");
bb.put("150","商务合作");