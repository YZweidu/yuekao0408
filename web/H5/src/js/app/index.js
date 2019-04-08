require.config({
	paths: {
		"flexible": "../libs/flexible",
		"mui": "../libs/mui.min"
	}
})
require(["mui"], function(mui) {

	mui.init();
	//全局变量
	const list = document.querySelector('#list'); //地址列表
	var addBtn = document.querySelector('#addaddress'); //添加地址按钮
	

	//初始化
	function init() {
		render();
	}

	//渲染地址
	function render() {
		mui.ajax('/api/getAddress', {
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			success: function(data) {
				console.log(data);
				list.innerHTML += data.map(item => {
					return `<li>
						<h4>${item.name}<span>${item.phone}</span></h4>
						<p>${item.province}${item.detail}</p>
						<hr>
						<p>
							<input type="radio">设为默认
							<button id='confirmBtn' type="button" class="confirmBtn mui-btn mui-btn-black mui-btn-outlined" data-id=${item._id}>删除</button> 
							<button class="edit" data-id=${item._id}>修改</button>
						</p>
					</li>`;
				}).join('');

				//删除事件
				var btns = document.querySelectorAll('.confirmBtn');
				btns.forEach(file => {
					file.onclick = function() {
						var that=this;
						var btnArray = ['确定', '取消'];
						mui.confirm('确认删除数据吗？', '提示', btnArray, function(e) {
							if (e.index == 0) {
								var uid = that.getAttribute('data-id');
								console.log(uid);
								mui.ajax('/api/removeAddress',{
									data:{
										id:uid
									},
									dataType:'json',//服务器返回json格式数据
									type:'post',//HTTP请求类型
									timeout:10000,//超时时间设置为10秒；
									success:function(data){
										if(data.code==1){
											alert("删除成功！");
											that.parentNode.parentNode.remove();
										}
									}
								});
							} else {
								console.log(2);
							}
						})
					}

				})
				
				//修改地址事件
				var edit = document.querySelectorAll('.edit'); //修改地址按钮
				edit.forEach(item=>{
					item.onclick=function(){
						var uid = this.getAttribute('data-id');
						console.log(uid);
						window.localStorage.setItem("id",uid);
						window.location.href="pages/edit.html?id="+uid;
					}
				})
				

			}
		});
	}

	console.log(document.querySelector('#addaddress'))
	//添加地址事件
	addBtn.onclick=function(){
		console.log(777);
		location.href="/pages/add.html";
	}
	
	init();
})
