# 图片上传jQuery插件（兼容IE8）
用法如下：
提供html容器
```
<div class="picBox"></div>
```
直接调用插件
```
$(".picBox").uploadImg();
```
可传入参数调用
```
$(".picBox").uploadImg({
	"picNum": 1,//上传图片张数
	"width": 100,//图片宽度
	"height": 100//图片高度
})
```