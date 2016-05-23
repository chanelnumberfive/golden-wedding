//金婚动画
+function ($) {
    'use strict';
	var $target=$('[data-blz-goldenwedding]');
    var a = [
		2, 3, 4, 5, 6, 11, 13, 15, 16, 17, 18, 19,
		21, 22, 26, 27, 31, 33, 35, 38,
		41, 47, 51, 53, 55, 56, 57, 58, 59,
		60, 61, 62, 63, 64, 65, 66, 67, 68, 70, 71, 72, 73, 74, 75, 78,
		80, 84, 88, 91, 93, 95, 96, 98, 99,
		104, 111, 113,
		121, 122, 123, 124, 125, 126, 127, 131, 133, 135, 136, 137, 138, 139,
		144, 151, 153, 155, 159,
		161, 164, 167, 171, 173, 175, 176, 177, 178, 179,
		181, 182, 183, 184, 185, 186, 187, 191, 192, 193, 194, 195, 199,
		204, 213, 215, 219,
		220, 221, 222, 223, 224, 225, 226, 227, 228, 230, 231, 232, 233, 235, 236, 237, 238, 239
	];
	//金婚动画构造函数
	function GoldenWedding(font,a2){
		this.font=font||a;
		this.html=matrix(a2[0]||12,a2[1]||20);
		this.cachingData=[];
		this.copyFont=this.font.slice();
	}
	//矩阵
	function matrix(n,m){
		var frag=document.createDocumentFragment();
		for(var i=n*m;i>=1;i--){
			frag.appendChild(document.createElement('li'));
		}
		return frag;
	}
    
	//摆字
	function makeFont(a,lis){
		for (var i=a.length-1; i>=0; i--) {
        	lis.childNodes[a[i]].className+=' active';
    	}
	}
	
	//金婚初始化 
	function initmodule(fontApperance,matrix,$elem){//参数1为画字体所需要的方格位置的数组，参数2为画板的宽高的列数,参数三为被初始化的元素；
		var customData=new GoldenWedding(fontApperance||null,matrix||[12,20]);
		makeFont(customData.font,customData.html);
		$elem.data('blz-goldenwedding',customData).html(customData.html);
		customData.html=$elem.find('li');
	}
    //制作随机数
    function makeRandom(n) { //参数n为随机数的上限
        return Math.floor(Math.random() * n);
    }

    //数组自减
    function arrayDecrement(a, index) { //a为目标数组，index为要删除的数组值得索引
        return a.splice(index, 1);
    }
	
	//在加载之前对已经存在的数据进行初始化
	function initBeforeLoad($elem,data){
		var data1=$elem.data('blz-goldenwedding');
		var a1=data1.copyFont;
		var $lis=data1.html;
		var aRandom = makeRandom(a1.length);
		$lis.eq(a1[aRandom]).html('<div style="display:block"><img src="' + data.url + '"'+'alt="'+data.name+'"><p>'+data.name+'</p></div>');
		arrayDecrement(a1, aRandom);
	}
	
	//初始化金婚动画模块
	$.fn.initGoldWedding=function(fontApperance,matrix,data){//参数三为在页面加载之前就已经存在的动画数据
		this.each(function(index,elem){
			initmodule(fontApperance||null,matrix||null,$(elem));
			for(var i=data.length-1;i>=0;i--){
				initBeforeLoad($(elem),data[i]);
			}
		});
		return this;
	};
	//插入图片函数
    $.fn.insertImage=function(data,callback) {
		return this.each(function(inde,elem){
			var _this=$(elem);
			var index=_this.data('index');
			var img = new Image();
			var data1=_this.data('blz-goldenwedding');
			var a1=data1.copyFont;
			var $lis=data1.html;
			if(a1.length===0){return false;}//当金婚二字被填满时暂且退出动画！
			if($target.eq(index).is('.preparing')){//当动画正在执行的时候，如果再次执行动画，则会将传入的数据缓存到该dom元素的data-goldenwedding中
				data1.cachingData.push(data);
				return true;
			}
			$target.eq(index).addClass('preparing');
			img.src = data.url;
			img.title=data.name;
			$(img).attr('data-blz-img','1');
			img.onload = function () {
				var aRandom = makeRandom(a1.length);
				$lis.eq(a1[aRandom]).html('<div><img src="' + this.src + '"><p>' + this.title + '</p></div>');
				setTimeout(function () {
					$lis.eq(a1[aRandom]).addClass('animate');
					if(callback){callback();}
				}, 100);
				setTimeout(function () {
					$lis.eq(a1[aRandom]).removeClass('animate');
					$target.eq(index).removeClass('preparing');
					arrayDecrement(a1, aRandom);
					if(data1.cachingData.length!==0){
						_this.insertImage(data1.cachingData[0],callback);
						data1.cachingData.shift();
					}
				}, 5000);
			};
		});
    };
	//对已经标有blz-data-goldenwedding的dom元素进行金婚动画初始化;
	$target.initGoldWedding(null,null,[]);
}(window.Zepto || window.jQuery);
