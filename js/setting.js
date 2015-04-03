var customSettings = {
	
	page: 1, // 总页数
	wrapNode: '.scrollContent',
	backgroundDefault: '../images/bg1.jpg', // 默认的背景图片
	hasTipButtonDefault: true, // 默认

	// 统一设置每一页banner的配置,pageInfo中可以单独设置每一页
	bannerDefault: {

		height: '160px',		// banner的高度
		bottom: '50px',		  	// banner距离底部距离
		background: '#339999',  // 文字的背景颜色
		opacity: 0.6,			// 文字的背景透明度
		color: '#000',		    // 文字的颜色
		title: '这里是标题',
		author: '这是里作者',
		description: '这里是简介这里是简介这里是简介'
	
	},

	shareData: {
		imgUrl: "http://angeliaw.com/mobile/images/bg1.jpg",
        link: 'http://angeliaw.com/mobile/index.html',
        title: '那年长夜，他们相遇',
        desc: '那年长夜，他们相遇，她以为是头一回遇上他，只有他知道，时光隧道的那一端他们曾有过的甜蜜'
	},

	// 每一页各自的配置数据
	pageInfo: [
		{
			banner: {
				height: '160px',
				bottom: '50px',
				background: '#339999',
				opacity: 0.8,
				color: '#000',
				title: '这里是标题',
				author: '这是里作者',
				description: '这里是简介这里是简介这里是简介'
			},
			background: 'images/bg1.jpg', 	// 每一个的背景图片	
			hasTipButton: true		// 是否有提示上滑动的按钮
		}, 
		{
			banner: {
				// 如果需要单独配置，可以加上bannerDefault中参数
				title: '长夜里拥抱',
				author: '张小娴',
				description: '那年长夜，他们相遇，她以为是头一回遇上他，只有他知道，时光隧道的那一端他们曾有过的甜蜜。'
			},
			background: 'images/bg4.jpg',	
			hasTipButton: false 		
		}, 
		{
			banner: {
				title: '罗辑思维',
				author: '张小娴',
				description: '那年长夜，他们相遇，她以为是头一回遇上他，只有他知道，时光隧道的那一端他们曾有过的甜蜜。'
			},
			background: 'images/bg2.jpg', 
			hasTipButton: true
		}, 
		{
			banner: {
				height: '160px',
				bottom: '50px',
				background: '#339999',
				opacity: 0.6,
				color: '#ff0',
				title: '长夜里拥抱',
				author: '张小娴',
				description: '那年长夜，他们相遇，她以为是头一回遇上他，只有他知道，时光隧道的那一端他们曾有过的甜蜜。'
			},
			background: 'images/bg3.jpg',					
			hasTipButton: true
		}, 
		{
			banner: {},
			background: 'images/bg4.jpg', 					
			hasTipButton: true
		}
	]

};