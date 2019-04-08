require.config({
	paths:{
		"flexible":"../libs/flexible",
		"mui":"../libs/mui.min"
	}
})
require(["mui"],function(mui){
	//全局变量
	const back=document.querySelector('#back');
	const confir=document.querySelector('#confir');
	const name=document.querySelector('#name');
	const phone=document.querySelector('#phone');
	const detail=document.querySelector('#detail');
	
	function init(){
		render();
	}
	
	//渲染
	function render(){
		var uid=localStorage.getItem("id");
		mui.ajax('/api/getDetail',{
			data:{
				id:uid
			},
			dataType:'json',//服务器返回json格式数据
			type:'post',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			success:function(data){
				data.forEach(file=>{
					name.value=file.name;
					phone.value=file.phone;
					detail.value=file.detail;
				})
				
			}
		});
	}
	
	confir.onclick=function(){
		console.log(localStorage.getItem("id"));
		mui.ajax('/api/changeAddress',{
			data:{
				id:localStorage.getItem("id"),
				name:name.value,
				detail:detail.value,
				phone:phone.value,
				province:"上海市黄浦区"
			},
			dataType:'json',//服务器返回json格式数据
			type:'post',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			success:function(data){
				if(data.code==1){
					alert("修改成功")
				}
			}
		});
	}
	
	
	//返回首页
	back.onclick=function(){
		location.href="/";
	}
	
	init();
})