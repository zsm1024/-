// import {MD5} from '../ngcc/js/md5'
// import '../ngcc/js/webseat/core/webagent.js';
// import '../ngcc/js/webseat/core/util/jquery.jsonp-2.1.4.js';

var ctiNum,vcid=3,currentStat=-1,displayNum,currentOPT,currentCallId=0,currentVoiceId,keepCallId=0,direct;
var username,unitId,userStaffid;//用户基本信息
var zeroCfgURL="http://10.50.16.30:8081/was";//CTI服务地址
var interfaceURL="http://10.50.130.235:8080/gwaf/IService";//CCS接口地址
//var interfaceURL="http://10.50.16.20:8080/gwaf/IService";//CCS接口正式地址
var app_no,cusName;//申请号,客户姓名
var loginStatus = 0;
var eh;
//初始化参数
function initParam(userId){
	if(userId.length==0){
		alert('用户账号不能为空!')
		return;
	}
	vcid=3;
	$.post(interfaceURL+"/queryUserInfo.do",{"staffid":userId},function(userInfo){
		console.log(JSON.stringify(userInfo));
		if (!$.isEmptyObject(userInfo)) {
			username=userInfo.AGENT_NAME;
			unitId=userInfo.UNIT;
			userStaffid=userInfo.AGENT_ID;
			ctiNum=userInfo.CTI_NO;
			displayNum=userInfo.DISPLAY_NO;
			currentStat=0;
			currentOPT="";
			//$("#btnSignIn").removeAttr("disabled");  
			$("#btnInit").attr("disabled", true);
			$("#btnInit").addClass("Shover");
			//$("#btnSignIn").removeClass("Shover");
			doSignIn();
		}else{
			alert('初始化失败,未检索到用户相关信息.');
		}
	});
	
}

/**
 * 添加消息内容
 * 
 * @param msg
 *            消息内容
 */
function addMessages(msg) {
	//$("#messages").prepend(
	//		$("<p></p").text(new Date().toLocaleString() + " " + msg));
	$("#messages").html(msg)
}

/**
 * 执行登录
 */
function doSignIn() {
	if(currentStat==-1){
	 alert('未初始化或初始化失败.')
		return ;
	}
	console.log("ctiNum:"+ctiNum);
	console.log("zeroCfgURL:"+zeroCfgURL);
	WebAgent.signin({
		oid : ctiNum,
		pwd : new MD5().hex_md5("123456").toUpperCase(),
		vcid : vcid,
		type : "10",
		cfgUrl : zeroCfgURL,
		lang : "zh_CN", // lang: "en",
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
		// $("#state").val(state.stateCode);
		$("#state").val(state.name);
		addMessages("状态切换至[" + state.name + ", 状态码：" + state.stateCode + "]");
		refreshBtns(state.stateCode);//当状态发送变化时处理函数
		currentStat = state.stateCode;
		loginStatus = 1;
		
	});
	//eh.regEvent("OnSetIdleFailure", OnSetIdleFailure);//示闲失败
	//eh.regEvent("OnSetBusyFailure", OnSetBusyFailure);//示忙失败
	//eh.regEvent("OnCallOutsideFailure", OnCallOutsideFailure);//外呼失败
	eh.regEvent("OnCallOutsideSuccTalk", OnCallOutsideSuccTalk);//外呼通话成功
	//eh.regEvent("OnCallOutsideSuccess", OnCallOutsideSuccess);//外呼外呼成功
	eh.regEvent("OnRelease", fnOnRelease);//释放呼叫成功
	//eh.regEvent("OnReleaseFailure", OnReleaseFailure);
	eh.regEvent("OnRingingEvent", fOnRingingEvent); //震铃事件
	eh.regEvent("OnAnswerSuccess", fOnAnswerSuccess); //应当成功
	//eh.regEvent("OnSetIdleSuccess", fOnSetIdleSuccess);//示闲成功
	eh.regEvent("OnRecordEvent", fOnRecordEvent);//录音事件
	//eh.regEvent("OnCallInsideSuccTalk",onCallInsideSuccTalk);
	//eh.regEvent("OnSingleStepTransSuccess",OnSingleStepTransSuccess);
	eh.regEvent("OnConsultationSuccess",OnConsultationSuccess);
	eh.regEvent("OnConsultationFailure",OnConsultationFailure);
	// 设置为自动应答
	WebAgent.invoker("AutoAnswer", "false");
	//设置全称录音
	WebAgent.invoker("FullRecord",[true]);
	//设置录音为媒体录音
	WebAgent.invoker("RecordMode", [1]);
	// clickSetIdle();
	clickSetBusy();
	$("#phonestatus").addClass("background","#00BB00");
}
/**
 * 示闲
 */
function clickSetIdle() {
	WebAgent.invoker("SetIdle", " ");
	currentCallId=0;
}
/**
 * 示忙
 */
function clickSetBusy(){
	WebAgent.invoker("SetBusy", "");
}
/**
 * 应答
 */
function answer(){  
	WebAgent.invoker("Answer",[0],function(returnValue){		 
	});
	
}
/**
 *点击挂机按钮
 */
function clickHangup() {
   WebAgent.invoker("ReleaseCall", [0], function(ret){
     if(ret != 0){
     promptLastError(); 
     }
    });
  

}
//呼出
function clickCallOut(type,callee,applicationno,borrower) {

    app_no = applicationno;
	cusName = borrower;
   // alert(cusName);
    if (loginStatus == 0)
    {
        alert("请先登录！");
        if ($("[data-bind=PHONE]") != undefined) {
            $("[data-bind=PHONE]").next().find("#callout").removeAttr("disabled");
            $("[data-bind=PHONE]").next().find("#callout2").removeAttr("disabled");
            $("[data-bind=PHONEC]").next().find("#callout2").removeAttr("disabled");
            $("[data-bind=PHONEC]").next().find("#callout").removeAttr("disabled");
        }
        return;
    }
		var callMode=0;
		// var callee = $.trim($("#softPhoneNumber").val());
	//var callee = $.trim($("#callee").val());
		if (type == "1")
		{
		   var callee = $.trim($("#softPhoneNumber").val());
		}
		if (callee == undefined)
		{
		    alert("未输入呼出号码");
		    return;
		}
		if (callee.length == 0) {
		    alert("未输入呼出号码");
		    return;
		}
		if (isNaN(callee)) {
		    alert("呼出号码应为数字");
		    return;
		}
		if (callee.length <= 6) {
		    //内部呼叫
		    callMode = 1
		}
		//else {
		//    if (callee.substring(0, 1) != '0') {
		//        callee = '0' + callee;
		//    }
		   
		//}
		$("#btnCallOut").addClass("Shover");
		$("#btnCallOut").attr("disabled", true);
		console.log("callMode->"+callMode);
		if(callMode==0){
			WebAgent.invoker("SetPreCall"," ",function(state){
				console.log("displayNum->"+displayNum);
				WebAgent.invoker("CallOutsideEx",[ 0,displayNum,callee,"",0], function(ret) {
				    if (ret != 0) {
				        //$("btnCallOut").addClass("Shover");
				        $("[data-bind=PHONE]").next().find("#callout").removeAttr("disabled");
				        $("[data-bind=PHONE]").next().find("#callout2").removeAttr("disabled");
				        $("[data-bind=PHONEC]").next().find("#callout2").removeAttr("disabled");
				        $("[data-bind=PHONEC]").next().find("#callout").removeAttr("disabled");
				        promptLastError();
				    } else {
				       
				    }
				}); 
			});
		 	
		}else{
			WebAgent.invoker("CallInside",[callee,0], function(ret) {
				if (ret != 0) {
				    promptLastError();
				    $("[data-bind=PHONE]").next().find("#callout").removeAttr("disabled");
				    $("[data-bind=PHONE]").next().find("#callout2").removeAttr("disabled");
				    $("[data-bind=PHONEC]").next().find("#callout2").removeAttr("disabled");
				    $("[data-bind=PHONEC]").next().find("#callout").removeAttr("disabled");
				} else {
				   
				}
			});  
			
		}
		
}
//保持
function Hold(){
	
	WebAgent.invoker("Hold",function(returnValue){
		
	}); 
}
//恢复保持通话
function setRetrieveHold(){
	if(currentCallId>0){
		WebAgent.invoker("RetrieveHold",[currentCallId],function(returnValue){
			
		}); 
	}else{
		
	}
}
//取消
function cannel(){
	WebAgent.invoker("ReleaseCall",[0],function(returnValue){
		
	}); 
	
}

//调用咨询功能
function doConsultation(){
	var callNum= $.trim($("#CallNumber").val());
	if(callNum.length==0){
		alert('请输入咨询号码!')
		return;
	}
	keepCallId=currentCallId;
	var calling= displayNum;
	// alert("calling:"+displayNum)
	if(calling.length<=6){
		calling='6527'+calling;
		// alert("号码少于8位")
		// calling='65276777';
	}
//calling='1001';
	// alert(calling);
	var flag10 = 0;
	if(callNum.length>6){
		flag10=1
	}
	WebAgent.invoker("Consultation",[0, callNum,flag10, 0,calling ], function(a){
		currentOPT='CONSULTATION';
	 });
}
function reConnect(){
	WebAgent.invoker("GetCallID",[1],function(callId){
		//恢复之前的通话
		console.log("keepCallId->"+callId);
		 WebAgent.invoker("ReConnect",[callId],function(returnValue){ 
			 
			}); 
	});
	
}
// function doTransfer(){
// 	keepCallId=currentCallId;
// 	var calling= displayNum;
// 	if(calling.length<=6){
// 		//  alert("转接到....")
// 		 calling='6527'+calling;
// 		// calling="1001"
// 	}
// 	// calling="1001"
// 	// calling='65276777';
// 	var callNum= $.trim($("#softPhoneNumber").val());
// 	var flag10 = 0;
// 	if(callNum.length>6){
// 		flag10=1
// 	}
// 	WebAgent.invoker("Consultation",[0,callNum  ,flag10, 0,calling ], function(a){
// 		currentOPT='TRANSFER';
		
// 	 });
	
// }
//会议功能
function doSingleStepConfCall(){
	
	Hold();
	var atiNum=$.trim($("#softPhoneNumber").val());
	var optMethod="CallInside";
	if(atiNum.length>6){
		optMethod="CallOutside";
	}
	currentOPT="MEETING";
	if(optMethod=='CallInside'){
		//接入指定坐席
		WebAgent.invoker("CallInside",[atiNum,0],function(returnValue){
			
		});
	}else{
		WebAgent.invoker("CallOutsideEx",[ 0,dispayNum,atiNum,"",0], function(ret) {
			if (ret != 0) {
				promptLastError();
			}
		}); 
	}
	
	
}

/**
 * 注销
 */
function clickSignOut() {
	
	WebAgent.logout(function(isSucc) { 
		//释放注册事件
		eh.dispose();
		addMessages("签出成功");
		$("#phonestatus").addClass("background", "#ec3333");
		location.reload();
	});
}

/**
 * 提示最后一次发生的错误
 */
function promptLastError() {
	WebAgent.getLastError(function(errCode, errMsg) {
		addMessages(errMsg + "[" + errCode + "]");
	});
}

function test(calling) {
    $(".advert ").animate({ "width": "230px" }, 200);
    $(".TipMes span").animate({ "width": "23px" }, 200);
    $(".TipMes span").css("background", "#4694e4");
    $(this).removeClass("Mes");
    $(".LMsg ").css("left", "-22px");
    $(".advert ").find(".LMsg i").removeClass(" fa fa-angle-double-left").addClass("fa fa-angle-double-right");
    phoneMsgInfo(calling);

}
/**
 * 震铃触发事件
 */

function  fOnRingingEvent(calling,called,callid1,UserData,CorrelateData,param){
	currentCallId="";
	var callFlowId = UserData.substring(UserData.indexOf("IDNO")+5,UserData.indexOf(";CLD"));//呼叫流水CTI生成
	currentCallId=callid1;//当前呼叫ID由CTI生成
	console.log("------------fOnRingingEvent-----------------");
	console.log(UserData);
	console.log("currentCallId->"+currentCallId);//当前呼叫ID
	console.log("CorrelateData->"+CorrelateData);
	if(calling.length>called.length){
		called=ctiNum;
		direct = "CX_BAS_CHANNEL_DIR_INBOUND";//呼叫方向呼入
		$(".advert ").animate({ "width": "230px" }, 200);
		$(".TipMes span").animate({ "width": "23px" }, 200);
		$(".TipMes span").css("background", "#4694e4");
		$(this).removeClass("Mes");
		$(".LMsg ").css("left", "-22px");
		$(".advert ").find(".LMsg i").removeClass(" fa fa-angle-double-left").addClass("fa fa-angle-double-right"); phoneMsgInfo(calling);

	}else{
		calling=ctiNum;
		direct="CX_BAS_CHANNEL_DIR_OUTBOUND";//呼叫方向呼出
	}
	console.log("direct->"+direct);
	
	//会议,咨询不在重复记录数据
	if(currentOPT!=""){
		return ;
	}
	
	//记录通话记录
	$.ajax({
		　　url:interfaceURL+"/voiceHandler.do",  //请求的URL
		　　timeout : 3000, //超时时间设置，单位毫秒
		　　type:'post',  //请求方式，get或post
		　　data :{"code":"RING","direct":direct,"caller":calling,"callee":called,"staffId":userStaffid,"uintId":unitId,"agentName":username,"callId":callFlowId,"app_no":app_no},  //请求所传参数，json格式
		  	async : false,
		 　　dataType:'text',//返回的数据格式
		 　　success:function(data){ //请求成功的回调函数
			console.log("voiceId:"+data);
		 　　currentVoiceId=data;
		　　},
		　　complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
		　　}
		 });
	console.log("------------fOnRingingEvent END--------------");
}

//通话录音操作（包括全程录音和非全程录音）停止时，触发此事件。
function  fOnRecordEvent(filename,len){
	console.log("recFileName->"+filename);
	var recFileName ="/zxinrecwav/rec/" + filename.substring(filename.indexOf("recPath=")+8);
	if(recFileName.length>20){
			voiceHandler("VOICEREC",recFileName);
	}
	
} 
//应答成功
function fOnAnswerSuccess(){
 voiceHandler("ANSWER",null);
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
	if(currentOPT=='MEETING'){
		//与指定坐席呼叫成功，获取保持的电话的callId
		WebAgent.invoker("GetCallID",[1],function(callId){
			//启动三方通话
			 WebAgent.invoker("Conference",[callId],function(returnValue){ 
				 
				}); 
		});
	}else{
		voiceHandler("ANSWER",null);
	}
}
function OnConsultationFailure(){
	console.log("ConsultationFailure");
}
/**
* 咨询成功
*/
function OnConsultationSuccess(){
	console.log("OnConsultationSuccess");
	
	if(currentOPT=='TRANSFER'){
		$('#btnTransfer').val('完成');
		$('#btnTransfer').unbind("click");
		$("#btnTransfer").one("click",Transfer);
	}
}
function Transfer(){
	 WebAgent.invoker("Transfer",[0],function(returnValue){ 
		    $('#btnTransfer').val('转接');
			$('#btnTransfer').unbind("click");
			$("#btnTransfer").bind("click",doTransfer);
			$("#btnTransfer").attr("disabled", true);
			$("#btnTransfer").addClass("Shover");

		}); 
}
//挂机成功
function fnOnRelease(droper,dropee,callid,cause,exinfo){
	console.log("fnOnRelease->droper is "+droper);
	setTimeout(function(){
		voiceHandler("HANDUP",null)},500);	
}

function voiceHandler(code, param){
	//会议,咨询不在重复记录数据
	if(currentOPT!=""){
			return ;
	}
	var data;
	console.log("voiceHandler code->"+code);
	if(code=='ANSWER'){
		data={"code":"ANSWER","voiceId":currentVoiceId};
	}else if(code=="VOICEREC"){
		data={"code":"VOICEREC","voiceId":currentVoiceId,"path":param};	
	}else if(code=="HANDUP"){
		data={"code":"HANDUP","voiceId":currentVoiceId,"app_no":app_no};
	}
	
	$.ajax({
		　　url:interfaceURL+"/voiceHandler.do",  //请求的URL
		　　timeout : 3000, //超时时间设置，单位毫秒
		　　type:'post',  //请求方式，get或post
		　　data :data,  //请求所传参数，json格式
		  	async : true,
		 　　dataType:'text',//返回的数据格式
		 　　success:function(data){ //请求成功的回调函数
		 		if(code=="HANDUP"){
		 			currentVoiceId="";
		 			}
		　　},
		　　complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
			console.log("status->"+status);
		　　}
		 });

	
}
//不同状态改变按钮状态
function refreshBtns(state){
	console.log(state);
	if(state==1){ 
		
		
		currentOPT='';
	} 
	//登录
	if(state==100){
		$("#btnSignIn").attr("disabled", true);  
		 
		//呼出按钮可用
		$("#btnCallOut").removeAttr("disabled"); 
		//示闲按钮可用
		$("#btnSetIdle").removeAttr("disabled");

		$("#btnSignIn").addClass("Shover");
		$("#btnCallOut").removeClass("Shover");
		$("#btnSetIdle").removeClass("Shover");

		$("#btnCannel").removeAttr("disabled");
		$("#btnCannel").removeClass("Shover");


		
	} 
	//示忙 105  
	if(state==105){
		//示闲按钮可用
		$("#btnSetIdle").removeAttr("disabled");
		$("#btnSetBusy").attr("disabled", true);
		$("#btnSetBusy").addClass("Shover");
		$("#btnSetIdle").removeClass("Shover");
	} 
	if(state==107){
	
	} 
	if(state==200){
		    //示忙按钮可用
	    $("#btnSetBusy").removeAttr("disabled"); 
	    //示闲按钮禁用
	    $("#btnSetIdle").attr("disabled", true);
	    $("#btnSetIdle").addClass("Shover");
	    $("#btnSetBusy").removeClass("Shover");

	    $("#btnCallOut").removeClass("Shover");
	    $("#btnCallOut").removeAttr("disabled");
	    $("#btnCannel").removeAttr("disabled");
	    $("#btnCannel").removeClass("Shover");
	    currentOPT='';	
	} 
	 //通话中
	if(state>=300 && state<=303){
	//挂断按钮可用
	$("#btnHangup").removeAttr("disabled");	
	//保持按钮可用
	$("#btnHold").removeAttr("disabled");	
	//咨询按钮可用
	$("#btnConsultation").removeAttr("disabled");	
	//三方会议按钮
	$("#btnSingleStepConfCallEx").removeAttr("disabled");
	//转接按钮
	$("#btnTransfer").removeAttr("disabled");
	
	
	$("#btnsetRetrieveHold").attr("disabled", true);
	$("#btnCallOut").attr("disabled", true);
	$("#btnAnswer").attr("disabled", true);
	$("#btnCannel").attr("disabled", true);
	$("#btnsetRetrieveHold").attr("disabled", true);

	$("#btnsetRetrieveHold").addClass("Shover");
	$("#btnCallOut").addClass("Shover");
	$("#btnAnswer").addClass("Shover");
	$("#btnCannel").addClass("Shover");
	$("#btnsetRetrieveHold").addClass("Shover");
	$("#btnHangup").removeClass("Shover");
	//自己添加
	$("#btnHold").removeClass("Shover");
	$("#btnConsultation").removeClass("Shover");
	$("#btnSingleStepConfCallEx").removeClass("Shover");
	$("#btnTransfer").removeClass("Shover");
	    // $("#btnHangup").removeClass("Shover");
	} 
	
	
	if(state==304){
	    $("#btnsetRetrieveHold").removeAttr("disabled");
	    $("#btnsetRetrieveHold").removeClass("Shover");

	
	} 
	//外部咨询                   内部咨询
	if(state==306 || state==307){ 
	$("#btnCannel").unbind("click");
	$("#btnCannel").one("click",reConnect);	
	$("#btnCannel").val("取消咨询");
	
	} 
	//电话呼入
	if(state==312){
	//接听按钮可用
	$("#btnAnswer").removeAttr("disabled"); 
	$("#btnCannel").removeAttr("disabled"); 
	//呼出按钮不可用
	$("#btnCallOut").attr("disabled", true);
	$("#btnAnswer").removeClass("Shover");

	$("#btnCannel").removeClass("Shover");

	$("#btnCallOut").addClass("Shover");

	} 
	if(state==313){
	    $("#btnCannel").removeAttr("disabled");
	    $("#btnCannel").removeClass("Shover");

	} 
	if(state==314){ 
		
	} 
	if(state==315){ 
		
	} 
	if(state==400){	
	$("#btnAnswer").attr("disabled", true);
	$("#btnHangup").attr("disabled", true);
	$("#btnHold").attr("disabled", true);
	$("#btnConsultation").attr("disabled", true);	
	$("#btnSingleStepConfCallEx").attr("disabled", true);	
	$("#btnsetRetrieveHold").attr("disabled", true);	
	$("#btnCannel").attr("disabled", true);
	$("#btnSignIn").attr("disabled", true);
	//呼出按钮可用
	$("#btnCallOut").removeAttr("disabled"); 
	//示闲按钮可用
	$("#btnSetIdle").removeAttr("disabled");
	$("#btnSignOut").removeAttr("disabled");
	
	$("#btnAnswer").addClass("Shover");
	$("#btnHangup").addClass("Shover");
	$("#btnHold").addClass("Shover");
	$("#btnConsultation").addClass("Shover");
	$("#btnSingleStepConfCallEx").addClass("Shover");
	$("#btnsetRetrieveHold").addClass("Shover");
	$("#btnCannel").addClass("Shover");
	$("#btnSignIn").addClass("Shover");
	currentCallId=0;
	currentOPT='';
	if ($("[data-bind=PHONE]") != undefined)
	{
	    $("[data-bind=PHONE]").next().find("#callout").removeAttr("disabled");
	    $("[data-bind=PHONE]").next().find("#callout2").removeAttr("disabled");
	    $("[data-bind=PHONEC]").next().find("#callout2").removeAttr("disabled");
	    $("[data-bind=PHONEC]").next().find("#callout").removeAttr("disabled");
	}

	$("#btnCallOut").removeClass("Shover");
	$("#btnSetIdle").removeClass("Shover");
	$("#btnSignOut").removeClass("Shover");

	
	$("#btnCannel").unbind("click");
	$("#btnCannel").one("click",cannel);
	$("#btnCannel").val("取消");
	

	} 
	if(state==401){
		
	}
}
// export {
// 	initParam,
// 	addMessage,
// 	onSucc_,
// 	clickSetIdle,
// 	clickSetBusy,
// 	answer,
// 	clickHangup,
// 	clickCallOut,
// 	Hold,
// 	setRetrieveHold,
// 	cannel,
// 	doConsultation,
// 	reConnect,
// 	doTransfer,
// 	doSingleStepConfCall,
// 	clickSignOut,
// 	promptLastError,
// 	test,
// 	fOnRingingEvent,
// 	fOnRecordEvent,
// 	fOnAnswerSuccess,
// 	onCallInsideSuccTalk,
// 	OnCallOutsideSuccTalk,
// 	OnConsultationSuccess,
// 	Transfer,
// 	fnOnRelease,
// 	voiceHandler,
// 	refreshBtns
//   };