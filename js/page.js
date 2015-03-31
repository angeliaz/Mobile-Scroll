(function (win, doc, $) {

	var defaultOptions = {

	};

	function Scroll () {

		this.currentPage = 1;
		this.flag = false;
		this.direction = 'up';
		this.startX = this.startY = 0;
		this.endX = this.endY = 0;

	}

	Scroll.prototype = {

		// 初始实例化
		init: function (settings) {

			this.initParam(settings);
			this.initAnimation();
			this.bindEvent();

		},	

		// 初始化参数
		initParam: function (settings) {

			for(var attr in defaultOptions) {
				this[attr] = settings[attr];
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
			
		}

	};

})(window, document, Zepto);