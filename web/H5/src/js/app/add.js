require.config({
	paths:{
		"flexible":"../libs/flexible",
		"mui":"../libs/mui.min"
	}
})
require(["mui"],function(mui){
	//全局变量
	const name=document.querySelector('#name');
	const phone=document.querySelector('#phone');
	const detail=document.querySelector('#detail');
	const btn=document.querySelector('#ok');
	const back=document.querySelector('#back');
	const ok=document.querySelector('#ok');
	
	document.querySelector('#ok').onclick=function(){
		console.log(name.value,phone.value,detail.value);
		mui.ajax('/api/addAddress',{
			data:{
				name:name.value,
				phone:phone.value,
				detail:detail.value,
				province:"上海市黄浦区"
			},
			dataType:'json',//服务器返回json格式数据
			type:'post',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			success:function(data){
				if(data.code==1){
					alert("添加成功");
				}
			}
		});
	}
	
	back.onclick=function(){
		location.href="/";
	}
})