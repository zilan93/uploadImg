/*
*上传图片并本地预览插件
*兼容IE8
*上传单张图片和多张图片的情况
*参数容器box
*参数图片张数
*参数预览图片尺寸
 */
(function() {
//初始化变量
var i = 0;
// 初始化html
function initDom() {
	var html = '<input type="file" class="fileInput">'
				+'<div><button type="button" class="uploadBtn">上传图片</button></div>'
				+'<div class="previewBox"></div>';
	return html;
}
//检查图片格式
function isImg(url) {
	console.log(url);
	return /.+\.(jpg|png|jpeg|gif)$/.test(url);
}
// 构造函数
function UploadImg(obj,picNum,width,height) {
	this.obj = obj;
	this.picNum = picNum;
	this.width = width;
	this.height = height;
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
//兼容IE处理；
function previewImgIE(obj,imgBox,width,height) {
	obj.select();
	$(obj).blur();
	if(document.selection) {
		var url = document.selection.createRange().text;
		if(isImg(url)) {
			var imgWrap = "<div class='imgWrap'></div>";
			imgBox.append($(imgWrap));
			$(".imgWrap").css({
				"width":width,
				"height":height,
				"display":"inline-block",
				"margin-right":"10px",
				"*display":"inline",
				"*zoom":1
			});
			$(".imgWrap").css("filter","progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod = scale,src=\""+url+"\")");
		} else {
			alert("您输入的图片格式有误，请重新输入");
			return false;
		}
	}
}
//上传图片操作；
function operationImg(obj,picNum,width,height) {
	if(obj.files && obj.files[0]) {
		if(picNum == 1) {
			var file = obj.files[0];
			var reader = new FileReader();
			reader.onload = function(evt) {
				if(isImg(evt.target.result)) {
					$(".previewBox").html("<img src="+evt.target.result+" width="+width+" height="+height+">");
				} else {
					alert("您输入的图片格式有误，请重新输入");
					return false;
				}
			};
			reader.readAsDataURL(file);
		};
		if(picNum > 1) {
			if(i < picNum) {
				var file = obj.files[0];
				var reader = new FileReader();
				reader.onload = function(evt) {
					if(isImg(evt.target.result)) {
						$(".previewBox").append("<img src="+evt.target.result+" width="+width+" height="+height+">");
					} else {
						alert("您输入的图片格式有误，请重新输入");
						return false;
					}
				};
				reader.readAsDataURL(file);
				i++;
			}
		}
	} else {
		//兼容IE处理
		if(picNum == 1) {
			previewImgIE(obj,$(".previewBox"),width,height);

		};
		if(picNum > 1) {
			if(i < picNum) {
				previewImgIE(obj,$(".previewBox"),width,height);
				i++;
			}
		}
	}
}
//返回构造函数；
window['UploadImg'] = UploadImg;
})();