$(document).ready(function(){
	if(!sessionStorage.getItem('token')){
		alert_("未登录！")
		setTimeout(function(){
			window.location.href = "login.html";
		},1000)
	}
})




