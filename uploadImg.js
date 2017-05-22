/*
*上传图片并本地预览插件
*兼容IE8
*上传单张图片和多张图片的情况
*参数容器box
*参数图片张数
*参数预览图片尺寸
 */
//初始化变量
var i = 0;
// 初始化html
function initDom() {
	var html = '<input type="file" class="fileInput">'
				+'<div><button type="button" class="uploadBtn">上传图片</button></div>'
				+'<div class="previewBox"></div>';
	return html;
}
function operationImg(obj,picNum,width,height) {
	if(obj.files && obj.files[0]) {
		if(picNum == 1) {
			var file = obj.files[0];
			var reader = new FileReader();
			reader.onload = function(evt) {
				$(".previewBox").html("<img src="+evt.target.result+" width="+width+" height="+height+">");
			};
			reader.readAsDataURL(file);
		};
		if(picNum > 1) {
			if(i < picNum) {
				var file = obj.files[0];
				var reader = new FileReader();
				reader.onload = function(evt) {
					$(".previewBox").append("<img src="+evt.target.result+" width="+width+" height="+height+">");
				};
				reader.readAsDataURL(file);
				i++;
			}
		}
	} else {
		//兼容IE处理
		if(picNum == 1) {
			var file = obj.files[0];
			var reader = new FileReader();
			reader.onload = function(evt) {
				$(".previewBox").html("<img src="+evt.target.result+" width="+width+" height="+height+">");
			};
			reader.readAsDataURL(file);
		};
		if(picNum > 1) {
			if(i < picNum) {
				console.log(i);
				var file = obj.files[0];
				var reader = new FileReader();
				reader.onload = function(evt) {
					$(".previewBox").append("<img src="+evt.target.result+" width="+width+" height="+height+">");
				};
				reader.readAsDataURL(file);
				i++;
			}
		}
	}
}
// 构造函数
function UploadImg(obj,picNum,width,height) {
	var html = initDom();
	obj.append($(html));
	$(".uploadBtn").click(function() {
		$(".fileInput").trigger("click");
	});
	$(".fileInput").change(function() {
		var that = this;
		operationImg(that,picNum,width,height);
	})
}
//扩展方法 