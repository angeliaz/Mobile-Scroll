(function (win, doc, $) {

	var Scroll =  {

		init: function () {
			
			$('.bg').addClass('bg-move');
			$('.word1').addClass('word1-move');
			$('.word2').addClass('word2-move');
			$('.word3').addClass('word3-move');

			var height = $(win).height();
			$('.content').height(height);

			this.initParam();
			this.eventBind();

		},

		initParam: function () {

			this.currentPage = 1;
			this.moveLock = false;
			this.direction = 'up';
			this.startX = this.startY = 0;
			this.endX = this.endY = 0;

		},

		eventBind: function () {
			
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
						if(_this.currentPage < 5) {
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

	Scroll.init();

})(window, document, Zepto);