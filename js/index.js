$(document).ready(function(){
	var hash_ = location.hash
	/*初始化显示首页*/
	if(hash_){
		hash_ = hash_.substring(1);
		$("footer div").eq(hash_).click();
	}else{
		init();
	}
	
})

function init(){
	/*content*/
	$("#content").html("");
	$("#content").html($("#content_index").html())
	/*footer*/
	$("footer>div").removeClass("footer_active");
	$(".to_index").addClass("footer_active")
	$(".indexNews").html("")
	var token = sessionStorage.getItem('token');
	/*新闻列表*/
	$.ajax({
		type:"post",
		url: ajax_url() + "news/getNewsList.shtml",
			async:true,
			timeout:4000,
			dataType: "json",
			success: function(data){
				console.log(data);
				if(data.newsList.records.length > 0){
					var cHtml = ""
					var records = data.newsList.records;
					for(var index in records){
						cHtml += '<div class="indexNewsCell clearfix" onclick="location_(&quot;newsDetails&quot;,&quot;'+ records[index].id +'&quot;)"><div class="left" style="width: 20%;padding-top: 0.5rem;"><img src="img/newsLOGO.png" width="80%" /></div>';
						cHtml += '<div class="left" style="width: 70%;"><p class="newsTitle" style="margin-top: 0.5rem;">'+ records[index].title +'</p>'
						cHtml += '<div class="smallText colorFont newsBody">'+ records[index].description +'</div>'
						cHtml += '</div><div class="right" style="width: 10%;padding-top: 0.5rem;font-size: 2rem;color:#eee;"><span><img src="img/right.png" style="width:80%;"></span></div></div>'
					}
					$(".indexNews").html(cHtml);
				}else{
					$(".indexNews").hide()
				}
			}
	})
}

function to_stock(){
//	var level = sessionStorage.getItem("level");
	var token = sessionStorage.getItem('token');
	/*content*/
	$("#content").html("");
	$("#content").html($("#content_stock").html())
	/*footer*/
	$("footer>div").removeClass("footer_active");
	$(".to_stock").addClass("footer_active")
	
	$(".stockBtn").click(function(){
		$.ajax({
			type:"post",
			url: ajax_url() + "busiUser/getUserInfo.shtml?token=" + token,
			async:true,
			timeout:4000,
			dataType: "json",
			success: function(data){
//				console.log(data);
				if(data.success){
					var newlevel = data.userInfo.level
					if(newlevel==6){
						location.href = "purchaseOrderByfounder.html"
					}else{
						location.href = "purchaseOrder.html"
					} 
				}
				
			}
		})	

		
//		alert(level);
	})
}

function to_distribution(){
	/*content*/
	$("#content").html("");
	$("#content").html($("#content_distribution").html())
	/*footer*/
	$("footer>div").removeClass("footer_active");
	$(".to_distribution").addClass("footer_active")
	var token = sessionStorage.getItem('token');
	$.ajax({
			type:"post",
			url: ajax_url() + "order/getUserFetchGoods.shtml?token=" + token,
			async:true,
			timeout:4000,
			dataType: "json",
			success: function(data){
				console.log(data)
				if(data.fetchGoods){
					
					$("#totalgoods").html(calcNum(data.fetchGoods.totalgoods))
					$("#totalMonthGoods").html(calcNum(data.fetchGoods.totalMonthGoods))
					$("#totalMonthAmt").html(calcNum(parseInt(data.fetchGoods.totalMonthAmt)))
					$("#totalAmt").html(calcNum(parseInt(data.fetchGoods.totalAmt)))
				}else{
					$("#totalgoods").html("0")
					$("#totalMonthGoods").html("0")
					$("#totalMonthAmt").html("0")
					$("#totalAmt").html("0")
				}
			}
	})		
	
}

function to_membercenter(){
	/*content*/
	$("#content").html("");
	$("#content").html($("#content_member").html())
	/*footer*/
	$("footer>div").removeClass("footer_active");
	$(".to_membercenter").addClass("footer_active")

	var userName = sessionStorage.getItem("userName") || ' ';
	var userID = sessionStorage.getItem("userID")
	var phone = sessionStorage.getItem("phone")
	var userIDCard = sessionStorage.getItem("userIDCard")
	var level = sessionStorage.getItem("level")
	
	if(level == 6){
		$("#level").html("联合创始人");
	}
	
	if(level == 5){
		$("#level").html("合伙人");
	}
	if(level == 4){
		$("#level").html("总代");
	}
	if(level == 3){
		$("#level").html("省代");
	}
	if(level == 2){
		$("#level").html("市代");
	}
	if(level == 1){
		$("#level").html("精英");
	}
	if(level == 0){
		$("#level").html("");
	}
	
	$("#userID").html(userID);
	$("#phone").html(phone);
	$("#phoneNo").html(phone);
	if(userIDCard){
		$("#userName").html(userName);
	}else  $("#userIDCard").html(" ");
	if(userIDCard){
		$("#userIDCard").html("已认证");
	}else  $("#userIDCard").html("未认证");
}



function toBeCoFounders(){
	var token = sessionStorage.getItem('token');
	var level = sessionStorage.getItem('level');
	if(level == 6){
		alert_("您已经是联合创始人！")
		return false;
	}else{
		$.ajax({
			type:"post",
			url: ajax_url() + "applyInfo/getApplyInfo.shtml?token=" + token,
			async:true,
			timeout:4000,
			dataType: "json",
			success: function(data){
//				console.log(data)
				if(data.success){
					if(!data.applyInfo){
						location.href = "toBeCoFounders.html?id=1"
					}else{
						var status = data.applyInfo.status;
						if(status == 0){
							location.href = "toBeCoFounders.html?id=3"
						}else if(status == 1){
							location.href = "toBeCoFounders.html?id=4"
						}else if(status == 2){
							location.href = "toBeCoFounders.html?id=5"
						}
					}
					
				}
			}
		})
	}
}
