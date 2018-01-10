/**
 * 跨域post提交日志内容到服务器
 * 
 * @param writeTime {Integer} 每隔多少秒post一次日志
 */
WebAgent.HttpLogger = function(writeTime)
{
    this.writeTime = (!writeTime) ? 5 : writeTime;
    //this.createForm();
   // this.saveLog();
    
    var thisobj = this;
    $(window).bind("beforeunload", function(e)
    {
        if (e)
        {
        	try
        	{
 				thisobj.createForm();
	        	thisobj.ifmDoc.getElementById(thisobj.txtID).value = thisobj.logTmp;
	        	thisobj.logTmp = "";
	        	thisobj.ifmDoc.getElementById(thisobj.frmID).submit();
        	}catch(e){}
        }
    });
};

WebAgent.HttpLogger.prototype =
{
    url : "http://localhost/WriteLog",
    ifmID : "webAgentHttpLogHidForm",
    ifmDoc : null,
    ifm : null,
    method : "post",
    frmID : "logFrom",
    txtID : "log",
    parentDoc : document,
    logTmp : "",

    /**
     * log4js
     */
    layout : null,
    logger : null,

    /**
     * 创建隐藏表单
     * 
     * @param obj
     */
    createForm : function()
    {
        if (this.ifm)
        {
            this.parentDoc.body.removeChild(this.ifm);
            this.ifmDoc = null;
            this.ifm = null;
        }

        var iframe = this.parentDoc.createElement("iframe");
        this.ifm = iframe;
        iframe.id = this.ifmID;
        iframe.name = this.ifmID;
        iframe.width = 0;
        iframe.height = 0;
        iframe.style.display = "none";
        this.parentDoc.body.appendChild(iframe);
        var doc = iframe.contentWindow.document;
        this.ifmDoc = doc;
        doc.write("<head><meta http-equiv='content-type' content='text/html; charset=UTF-8'></head><body><form id='"
                + this.frmID + "' name='" + this.frmID + "' method='" + this.method + "'" + " action='" + this.url
                + "' enctype='application/x-www-form-urlencoded' target='_self' accept-charset='utf-8' onsubmit=\"document.charset='utf-8';\" >" + "<input type='hidden' id='" + this.txtID + "' name='"
                + this.txtID + "'></input>" + "</form> </body>");
    },

    /**
     * 写日志
     * 
     * @param msg
     */
    writeLog : function(msg)
    {
        this.logTmp += msg + "\n";
    },

    /**
     * 获取表单中的日志内容
     */
    getLog : function()
    {
        return this.logTmp;
    },

    /**
     * 提交日志内容到服务器
     */
    saveLog : function()
    {
        var log = this.getLog();
        if (log.length > 1)
        {
            var thisobj = this;
            thisobj.createForm();
            setTimeout(function()
            {
	            thisobj.ifmDoc.getElementById(thisobj.txtID).value = thisobj.logTmp;
	            thisobj.logTmp = "";
	            thisobj.ifmDoc.getElementById(thisobj.frmID).submit();
            }, 100);
        }
        
        var thisobj = this;
//        setTimeout(function()
//        {
//            thisobj.saveLog();
//        }, this.writeTime * 1000);
    }
};

/**
 * 实现log4js的Appender接口，实现用HttpLogger写日志
 * 
 * <pre>
 * 使用方法：
 * var log = new Log4js.getLogger('webAgent');
 * app = new Log4js.HttpAppender(3);
 * log.addAppender(app);
 * </pre>
 */
Log4js.HttpAppender = function()
{

    this.layout = new Log4js.PatternLayout(Log4js.PatternLayout.TTCC_CONVERSION_PATTERN);
    this.httpLogger = new WebAgent.HttpLogger(5);
    var fmt = new Log4js.DateFormatter();
};

Log4js.HttpAppender.prototype = Log4js.extend(new Log4js.Appender(),
{
    /**
     * @see Log4js.Appender#doAppend
     */
    doAppend : function(loggingEvent)
    {
        var time = this.format(new Date(), "yyyy-MM-dd hh:mm:ss:S");
        var blandArr=[""," ","  ","   ","    "];
        var level = " [" + loggingEvent.level.toString();
       
        // 这里和webagent-logger.js强耦合了，以后有时间再重构！！！！！
        var moduleName = (WebAgent && WebAgent.logModuleName)? "["+WebAgent.logModuleName+"]":"";
        level += blandArr["[Error]".length-level.length]+"]";
        var log = time +  " [" + loggingEvent.categoryName + "] " + moduleName + level  ;
        
        // 换行对齐
        var msgs = loggingEvent.message.split("\r");
        for(var i=0;i<msgs.length;i++)
        {
        	if(i==0)
        	{
        		this.httpLogger.writeLog(log+msgs[i]);
        	}
        	else
        	{
        		var blankStr = log.replace(/./gi," ");
        		this.httpLogger.writeLog(blankStr+msgs[i]);
        	}
        }
    },

    /**
     * toString
     */
    toString : function()
    {
        return "HttpAppender";
    },

    /**
     * 格式化日期
     */
    format : function(date, format)
    {
        var ms = "000" + date.getMilliseconds();
        ms = ms.substr(ms.length - 3);
        var o =
        {
            "M+" : date.getMonth() + 1, // month
            "d+" : date.getDate(), // day
            "h+" : date.getHours(), // hour
            "m+" : date.getMinutes(), // minute
            "s+" : date.getSeconds(), // second
            "q+" : Math.floor((date.getMonth() + 3) / 3)
        // quarter
        };
        if (/(y+)/.test(format))
            format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for ( var k in o)
            if (new RegExp("(" + k + ")").test(format))
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k])
                        .substr(("" + o[k]).length));
        if (/(S)/.test(format)) format = format.replace(RegExp.$1, ms);

        return format;
    }
});

/**
 * 实现log4js的Appender接口，实现写空日志的接口（方便调试时关闭写日志方法）
 */
Log4js.EmptyAppender = function()
{
};

Log4js.EmptyAppender.prototype = Log4js.extend(new Log4js.Appender(),
{
    /**
     * @see Log4js.Appender#doAppend
     */
    doAppend : function(loggingEvent)
    {
    },

    /**
     * toString
     */
    toString : function()
    {
    }
});
