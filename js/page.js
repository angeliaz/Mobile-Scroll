(function (win, doc, $) {

	var defaultOptions = {

		page: 5,
		wrapNode: 'scrollContent',
		backgroundDefault: '../images/bg1.jpg', // 默认的背景图片
		hasTipButtonDefault: true, // 默认
		bannerDefault: {
			height: '160px',			// banner的高度
			bottom: '50px',		  		// banner距离底部的距离
			background: '#339999',      // 文字的背景颜色
			opacity: 0.6,			    // 文字的背景透明度
			color: '#000'		    	// 文字的颜色
		},
		pageInfo: [

		]
	};

	var domData = [
		{
			contentClass: 'content1',
			wordClass: 'word'
		},{},{},{},{}
	]; 

	function Scroll () {

		this.flag = false;
		this.total = 0;
		this.currentPage = 1;
		this.startX = this.startY = 0;
		this.endX = this.endY = 0;
		this.direction = 'up';
		this.bannerData = [];

	}

	Scroll.prototype = {

		// 初始实例化
		init: function (settings) {

			this.initParam(settings);
			this.initCustomSetting(settings);
			this.createDom();
			this.initDomStyle(this.bannerData);
			this.initAnimation();
			this.bindEvent();

		},	

		// 初始化参数
		initParam: function (settings) {

			for(var attr in defaultOptions) {
				this[attr] = settings[attr];
			}

		},

		// 初始化自定义参数
		initCustomSetting: function () {

			// $('')



		},

		initBanner: function () {

		},

		// item为每页的配置数据
		getBannerData: function (item) {

			var defaultBanner = this.bannerDefault; // 默认banner数据
			console.log()
			return {
				height: typeof item.height === 'undefined' ? defaultBanner.height : item.height,
				bottom: typeof item.bottom === 'undefined' ? defaultBanner.bottom : item.bottom,
				background: typeof item.background === 'undefined' ? defaultBanner.background : item.background,
				opacity: typeof item.opacity === 'undefined' ? defaultBanner.opacity : item.opacity,
				color: typeof item.color === 'undefined' ? defaultBanner.color : item.color,
				title: typeof item.title === 'undefined' ? defaultBanner.title : item.title,
				author: typeof item.author === 'undefined' ? defaultBanner.author : item.author,
				description: typeof item.description === 'undefined' ? defaultBanner.description : item.description
			}

		},

		createBanner: function (bannerInfo) {

			var arr = [];
			
			arr.push('<div class="pageWrap">');
			arr.push(	'<div class="bg"></div>');
			arr.push(	'<div class="bgPart">');
			arr.push(		'<p class="title word1">'+ bannerInfo.title +'</p>');
			arr.push(		'<p class="word word2">'+ bannerInfo.author +'</p>');
			arr.push(		'<p class="word word3">'+ bannerInfo.description +'</p>')
			arr.push(	'</div>')
			arr.push('</div>');

			return arr.join('');

		},

		createDom: function () {

			// console.log(123)
			var i = 0, arr = [], bannerData = [];
			var pageInfo = this.pageInfo;
			this.total = this.page;

			// 如果给的数据少于总页数，取给的数据条数
			if(pageInfo.length < this.total) {
				this.total = pageInfo.length;
			}

			for(; i < this.total; i++) {
				
				var hasTipButton = false;
				var item = pageInfo[i];
				var bannerInfo = this.getBannerData(item.banner);
				
				// 如果pageInfo中没有给出配置，就取默认的hasTipButtonDefault
				if(typeof item.hasTipButton !== 'undefined') {
					hasTipButton = item.hasTipButton;
				} else {
					hasTipButton = this.hasTipButtonDefault;
				}
				console.log(hasTipButton)

				arr.push('<section class="content content'+ (i + 1) +'">');
				arr.push(	this.createBanner(bannerInfo));
				if(hasTipButton) {
					arr.push(	'<div class="tip"></div>');
				} else {
					arr.push(	'<div class="tip" style="display:none;"></div>');
				}
				arr.push('</section>');

			}

			$(this.wrapNode).html(arr.join('') + $(this.wrapNode).html());

		},

		// 初始化自定义的样式
		initDomStyle: function (data) {
			
			var i = 0, len = this.total;
			var pageInfo = this.pageInfo;
			var bannerData = this.bannerData;

			for(; i < len; i++) {
				
				var item = pageInfo[i];
				var bannerItem = this.getBannerData(item.banner);
				var $content = $('.content' + (i + 1));

				var background = typeof item.background === 'undefined' ? this.backgroundDefault : item.background;

				// 设置背景图
				$content.css('background', 'url(' + background + ')');
				// 设置banner样式
				$content.find('.bg').css('background', bannerItem.background);
				$content.find('.pageWrap').height(bannerItem.height);
				$content.find('.pageWrap').css('bottom', bannerItem.bottom);
				$content.find('.bg-move').css('opacity', bannerItem.opacity);
				$content.find('p').css('color', bannerItem.color);

			}

		},

		// 初始化第一页参数
		initAnimation: function () {

			$('.bg').addClass('bg-move');
			$('.word1').addClass('word1-move');
			$('.word2').addClass('word2-move');
			$('.word3').addClass('word3-move');

			var height = $(win).height();
			$('.content').height(height);

		},

		// 事件绑定
		bindEvent: function () {
			
			var _this = this;
			var height = $(win).height();
			var $scroll = $('.scrollContent');
			var $word1 = $scroll.find('.word1');
			var $word2 = $scroll.find('.word2');
			var $word3 = $scroll.find('.word3');
			var $bgPart = $scroll.find('.bg');

			$('.wrap').on('touchstart', function (e) {

				var touch = e.touches[0];
				
				_this.startX = touch.pageX;
				_this.startY = touch.pageY;

				//setTimeout(function () {
					$bgPart.removeClass('bg-move');
					$word1.removeClass('word1-move');
					$word2.removeClass('word2-move');
					$word3.removeClass('word3-move');
				//}, 200);

			});

			$('.wrap').on('touchmove', function (e) {

				_this.moveLock = true;

				var touch = e.touches[0];
				_this.endX = touch.pageX;
				_this.endY = touch.pageY;

			});

			$('.wrap').on('touchend', function (e) {

				if(_this.moveLock) {
					var direction = (_this.endY - _this.startY <= 0) ? 'up' : 'down';
					var top = parseInt($scroll.css("-webkit-transform").split(",")[1]);
					

					// 向上滑
					if(direction === 'up') {
						if(_this.currentPage < (_this.page + 1)) {
							$scroll.css({"-webkit-transform" : "translate3d(0px, " + (top - height) + "px, 0px);"});
							_this.currentPage++;
						}
					} else {
						if(_this.currentPage > 1) {
							$scroll.css({"-webkit-transform" : "translate3d(0px, " + (top + height) + "px, 0px);"});
							_this.currentPage--;
						}
					}

					$bgPart.addClass('bg-move');
					$word1.addClass('word1-move');
					$word2.addClass('word2-move');
					$word3.addClass('word3-move');
				}
				
				$('.content5').find('.share').on('click', function () {
					$('.mask').css('display', 'block');
				})
			});
		}


	};

	window.Scroll = Scroll;

})(window, document, Zepto);