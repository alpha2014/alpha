(function(){
	includeAlpha({
		'base': '',
		'js': {
			'': [
				'alpha',

				'debugger/debugger',

				'zepto/zepto.min',
				'zepto/zepto.extend',
				'zepto/zepto.template',
				'zepto/jquery.hammer.min',

				'core/utils',
				'core/class',
				'core/feature',

				'animation/ease',
				'animation/anim',

				'svg/svg',
				'svg/shape',
				'svg/container',
				'svg/paper',
				'svg/group',
				'svg/gradient',
				'svg/circle',
				'svg/arc',
				'svg/polyline',

				'charts/chart',
				'charts/ruler',
				'charts/coordinate',
				'charts/column',
				'charts/line',
				'charts/pie',
				'charts/bar',
				'charts/simplebar',
				'charts/week',
				'charts/ring',

				'components/components',
				'components/switcher',
				'components/centerLabel',
				'components/weixinShareLayer',
				'components/weixinShare',
				'components/dragger',
				'components/layer',
				
				'swiper/swiper',
			]
		},
		'css': {
			'': [
				'css/font',
				'css/com.layer',
				'css/com.switcher',
				'css/swiper'
			]
		}
	});

	/*
	 * read config
	 */
	function includeAlpha(config){
		
		var base = (window.alphaBaePath||'') + (config['base']||'');

		for(var i in config['css']){
			includeStyle(base + i, config['css'][i]);
		}

		for(var i in config['js']){
			includeScripts(base + i, config['js'][i]);
		}

	}

	/*
	 * include scripts
	 */
	function includeScripts(basePath, files){
		files.forEach(function( path, i ){
			document.write('<script src="' + basePath + path + '.js"></script>');
		});
	}

	/*
	 * include css
	 */
	function includeStyle(basePath, files){
		files.forEach(function( path, i ){
			document.write('<link rel="stylesheet" href="' + basePath + path + '.css">');
		});
	}

})();