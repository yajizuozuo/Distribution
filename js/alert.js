//手机端弹窗样式
function alert_(title) {
	$(".alert").remove();
	var cHtml = "";
	cHtml = "<div class='alert fade'> " + title + "</div>";
	$("body").append(cHtml);
}


function reg_phone(num){
	var reg = /^1[0-9]{10}$/;
	if(!reg.test(num)){
		alert_("手机号码格式有误！");
		return false
	}else return true;
}


function ajax_url(){
//	var url = "http://bb.csyundu.com/numberone-auth/"
//	var url = "http://192.168.3.70:8080/numberone-auth/"
//	var url = "http://192.168.0.61:8080/numberone-auth/"
	var url = "http://192.168.0.113:8080/numberone-auth/"
	return url
}

/*页面跳转*/
function location_(index,id){
	var hash_ = "";
	$("footer div").each(function(index,elm){
		if($(elm).hasClass("footer_active")){
			hash_ = index;
		}
	})
	if(id){
		window.location.href = index + ".html?id="+ id + "#" + hash_;
	}else{
		window.location.href = index + ".html#" + hash_;
	}
}

//时间戳转换时间格式
function formatDateTime(timeStamp) {   
    var date = new Date();  
    date.setTime(timeStamp);  
    var y = date.getFullYear();      
    var m = date.getMonth() + 1;      
    m = m < 10 ? ('0' + m) : m;      
    var d = date.getDate();      
    d = d < 10 ? ('0' + d) : d;      
    var h = date.getHours();    
    h = h < 10 ? ('0' + h) : h;    
    var minute = date.getMinutes();    
    var second = date.getSeconds();    
    minute = minute < 10 ? ('0' + minute) : minute;      
    second = second < 10 ? ('0' + second) : second;     
//  return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;      
	//返回年月日
	return y + '-' + m + '-' + d;
};    

//时间戳转换时间格式  精确到秒
function formatDateTimeJQ(timeStamp) {   
    var date = new Date();  
    date.setTime(timeStamp);  
    var y = date.getFullYear();      
    var m = date.getMonth() + 1;      
    m = m < 10 ? ('0' + m) : m;      
    var d = date.getDate();      
    d = d < 10 ? ('0' + d) : d;      
    var h = date.getHours();    
    h = h < 10 ? ('0' + h) : h;    
    var minute = date.getMinutes();    
    var second = date.getSeconds();    
    minute = minute < 10 ? ('0' + minute) : minute;      
    second = second < 10 ? ('0' + second) : second;     
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;      
	//返回年月日
//	return y + '-' + m + '-' + d;
};    



/*天数计算*/
function day_calc(data2){
	var data1 = new Date();
	data1 = formatDateTime(data1.getTime());
	data1 = new Date(data1.replace(/-/g, "/"));
	data2 = new Date(data2.replace(/-/g, "/"));
	var days = data2.getTime() - data1.getTime();
	return parseInt(days / (1000 * 60 * 60 * 24)) ;
}

/*星期计算*/
function weekCalc(){
	var week = new Date().getDay();
	return week
}

function calcNum(num){
	num = num > 9999 ? num/10000 + "万" : num;
	return num;
}
