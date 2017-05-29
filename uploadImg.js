/*
*上传图片并本地预览插件
*兼容IE8
*obj    ----上传图片容器
*picNum ----上传图片的张数
*width  ----图片宽度
*height ----图片宽度
 */
(function($) {
	// 构造函数
	function UploadImg(obj,opt) {
		debugger;
		this.obj = obj;
		this.$obj = $(obj);
		this.defaultOpt = {
			"picNum": 1,
			"width": 100,
			"height": 100
		};
		this.num = 0;
		this.options = $.extend({},this.defaultOpt,opt);
		this.init();
	};
// 初始化html
UploadImg.prototype.init = function() {
	var html = '<input type="file" class="fileInput">'
				+'<div><button type="button" class="uploadBtn">上传图片</button></div>'
				+'<div class="previewBox"></div>';
	this.$obj.append($(html));
	this.bindEvent();
}
//绑定事件
UploadImg.prototype.bindEvent = function() {
	var self = this;
	this.$obj.on("click.choose",".uploadBtn",function() {
		$(".fileInput").trigger("click");
	});
	$(".fileInput").on("change.upload",function() {
		self.operationImg(this);
	});
	this.$obj.off(".choose,.upload");
}
//检查图片格式
UploadImg.prototype.isImg = function(url) {
	var result = /.+\.(jpg|png|jpeg|gif)$/.test(url);
	if(!result) {
		alert("您选择的图片格式有误，请重新选择");
		return false;
	} else {
		return true;
	}
},
//添加预览图片到页面上
UploadImg.prototype.addImgHtml = function(url) {
	if(this.options.picNum == 1) {
		if($(".previewBox")) {
			$(".previewBox").html("<img src="+ url +" width="+ this.options.width +" height="+ this.options.height +">");
		}
	} else {
		if($(".previewBox") && this.num < this.options.picNum) {
			$(".previewBox").append("<img src="+ url +" width="+ this.options.width +" height="+ this.options.height +">");
			this.num++;
		}	
	}
},
//兼容IE处理
UploadImg.prototype.previewImgIE = function(obj) {
	obj.select();
	$(obj).blur();
	if(document.selection) {
		var url = document.selection.createRange().text;
		if(this.isImg(url)) {
			var imgWrap = "<div class='imgWrap'></div>";
			if(this.options.picNum == 1) {
				$(".previewBox").html($(imgWrap));
			} else if(this.options.picNum > 1 && this.num < this.options.picNum) {
				$(".previewBox").append($(imgWrap));
				this.num++;
			} else {
				return;
			};
			$(".imgWrap").css({
				"width":this.options.width,
				"height":this.options.height,
				"display":"inline-block",
				"margin-right":"10px",
				"*display":"inline",
				"*zoom":1
			});
			$(".imgWrap:last").css("filter","progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod = scale,src=\""+url+"\")");
		}
	}
},
//正常处理
UploadImg.prototype.previewImg = function(obj) {
	var file = obj.files[0];
	var self = this;
	if(this.isImg(file.name)) {
		var reader = new FileReader();
		reader.onload = function(evt) {
			self.addImgHtml(evt.target.result);	
		};
		reader.readAsDataURL(file);
	} else {
		alert("您输入的图片格式有误，请重新输入");
		return false;
	}
};
//上传图片操作；
UploadImg.prototype.operationImg = function(fileObj) {
	if(fileObj.files && fileObj.files[0]) {
		//html5 files API
		this.previewImg(fileObj);
	} else {
		//兼容IE
		this.previewImgIE(fileObj);
	}
}
//绑定插件
$.fn.uploadImg= function(options) {
	return this.each(function() {
		new UploadImg(this,options);
	});
}
})(jQuery);