/*
 https://developer.mozilla.org/en/DOM/Using_full-screen_mode
 http://dvcs.w3.org/hg/fullscreen/raw-file/tip/Overview.html#dom-document-fullscreenelement
 https://wiki.mozilla.org/Gecko:FullScreenAPI
 http://hacks.mozilla.org/2012/01/using-the-fullscreen-api-in-web-browsers/
 */
window.HTMLElement && HTMLElement.prototype && (function(proto, doc) {

	if (proto.requestFullscreen) {
		return;
	} else if (!proto.mozRequestFullScreen && !proto.webkitRequestFullScreen) {
		doc.fullscreenEnabled = false;
		return;
	}

	var names = {
		moz: {
			fullscreenchange: 'mozfullscreenchange',
			fullscreenElement: 'mozFullScreenElement',
			fullscreenEnabled: 'mozFullScreenEnabled',
			fullscreen: 'mozFullScreen'
		},
		webkit: {
			fullscreenchange: 'webkitfullscreenchange',
			fullscreenElement: 'webkitCurrentFullScreenElement',
			fullscreen: 'webkitIsFullScreen'
		}
	}[doc.documentElement.mozRequestFullScreen ? 'moz' : 'webkit'];

	proto.requestFullscreen =  proto.requestFullscreen || proto.mozRequestFullScreen || proto.webkitRequestFullScreen;

	proto.requestFullscreenWithKeys = proto.requestFullScreenWithKeys || proto.mozRequestFullScreen ||
		(proto.webkitRequestFullScreen && function() {
			this.webkitRequestFullScreen(proto.ALLOW_KEYBOARD_INPUT);
		})
	;

	doc.exitFullscreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitCancelFullScreen;

	doc.__defineGetter__('fullscreenElement', function(){
		return doc[names.fullscreenElement];
	});

	doc.__defineGetter__('fullscreenEnabled', function(){
		return names.fullscreenEnabled ? doc[names.fullscreenEnabled] : true;
	});

	doc.__defineGetter__('fullscreen', function(){
		return doc.fullScreen || doc[names.fullscreen];
	});

	doc.fullscreenchange = function(handler) {
		doc.addEventListener(names.fullscreenchange, handler, false);
	};

	doc.unbindFullscreenchange = function(handler) {
		doc.removeEventListener(names.fullscreenchange, handler, false);
	};

})(HTMLElement.prototype, window.document);
