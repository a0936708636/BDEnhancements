//META{"name":"ResizeX"}*//

var resizexDragging = false;
var resizexHandle;
var resizexWidth;
var resizexX;
var resizexY;
var resizexAspectRatio;

var ResizeX = function() {};

// unused
ResizeX.prototype.load = function() {};
ResizeX.prototype.unload = function() {};
ResizeX.prototype.onMessage = function() {};
// unused

ResizeX.prototype.start = function() {
	BdApi.injectCSS("resizex-style",'@font-face{font-family:Batch;src:url(https://cdn.rawgit.com/AdamWhitcroft/batch/a3640352/Webfont/batch-icons-webfont.ttf)}.resizex-icon::before{content:"\\F0A5";transform:scaleX(-1);display:inline-block;margin-top:8px;draggable:false!important}.resizex-handle{box-sizing:border-box;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:reverse;flex-direction:row-reverse;-webkit-box-pack:justify;justify-content:space-between;-webkit-box-align:center;align-items:center;cursor:nwse-resize;draggable:false!important;font-family:Batch;min-width:none!important}iframe.image{min-width:400px;max-width:none!important}');
};

ResizeX.prototype.stop = function() {
	BdApi.clearCSS("resizex-style");
};

ResizeX.prototype.observer = function(e) {
    if (e.addedNodes.length && e.addedNodes[0].classList && e.addedNodes[0].classList.contains("embed-thumbnail-video")) {

        $("iframe.image:not(:has(+ .resizex-handle))").after("<div class='resizex-handle'><div class='resizex-icon'/></div>");

        $(document).add("*").off(".resizex");

        $(".resizex-handle").on("mousedown.resizex", function(e) {
            resizexDragging = true;
            resizexWidth = $(this).siblings().width();
            resizexX = e.pageX;
            resizexY = e.pageY;
            resizexHandle = this;
            resizexAspectRatio = $(this).siblings().height() / $(this).siblings().width();
            $(this).siblings().css("pointer-events", "none");
            BdApi.injectCSS("resizex-dragging","*{-webkit-user-select:none!important;cursor:nwse-resize!important;}");
		});

        $(document).on("mousemove.resizex", function(e) {
            if (resizexDragging) {
                $(resizexHandle).siblings().width(resizexWidth + (e.pageX - resizexX + e.pageY - resizexY));
                $(resizexHandle).siblings().height($(resizexHandle).siblings().width() * resizexAspectRatio);
            }
        }).on("mouseup.resizex", function() {
            resizexDragging = false;
            $(resizexHandle).siblings().css("pointer-events", "");
            BdApi.clearCSS("resizex-dragging");
        });
    }
};

ResizeX.prototype.getSettingsPanel = function() {
    return "";
};

ResizeX.prototype.getName = function() {
    return "ResizeX";
};

ResizeX.prototype.getDescription = function() {
    return "Makes videos (and images soon) resizable";
};

ResizeX.prototype.getVersion = function() {
    return "0.0.1";
};

ResizeX.prototype.getAuthor = function() {
    return "Anxeal";
};
