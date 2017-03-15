//META{"name":"BetterFormatting"}*//

var BetterFormatting = function() {};

var replaceList = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-=()[]{},'";
var smallCapsList = "ABCDEFGHIJKLMNOPQRSTUVWXYZᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ0123456789+-=()[]{},'";
var superscriptList = "ᴬᴮᶜᴰᴱᶠᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾQᴿˢᵀᵁⱽᵂˣʸᶻᵃᵇᶜᵈᵉᶠᵍʰᶦʲᵏˡᵐⁿᵒᵖᑫʳˢᵗᵘᵛʷˣʸᶻ⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾[]{},'";
var upsideDownList = "∀qƆpƎℲפHIſʞ˥WNOԀQɹS┴∩ΛMX⅄Zɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz0ƖᄅƐㄣϛ9ㄥ86+-=)(][}{',";

var toolbarString = "<div class='bf-toolbar'><div><b>Bold</b></div><div><i>Italic</i></div><div><u>Underline</u></div><div><s>Strikethtough</s></div><div style='font-family:monospace;'>Code</div><div>ˢᵘᵖᵉʳˢᶜʳᶦᵖᵗ</div><div>SᴍᴀʟʟCᴀᴘs</div><div>uʍopǝpᴉsd∩</div></div></div>";

var wrappers = ["**", "*", "__", "~~", "`", "^", "%", "&"];

BetterFormatting.prototype.format = function(e) {
    if (e.shiftKey || e.which != 13) return;
    $textarea = $(e.currentTarget);
    var text = $textarea.val();
    var len = text.length;
    for (var i = 0; i < len; i++) {
        switch (text[i]) {
            case "\\":
                i++;
                break;
            case "`":
                i = text.indexOf("`", i + 1);
                break;
            case "^":
                var next = text.indexOf("^", i + 1);
                if (next != -1) {
                    text = text.replace(new RegExp(`([^]{${i}})\\^([^]*)\\^([^]{${len - next - 1}})`), (match, before, middle, after) => {
                        middle = middle.replace(/./g, letter => {
                            var index = replaceList.indexOf(letter);
                            return index != -1 ? superscriptList[index] : letter;
                        })
                        return before + middle + after;
                    });
                    i = next - 2;
                    len -= 2;
                }
                break;
            case "%":
                var next = text.indexOf("%", i + 1);
                if (next != -1) {
                    text = text.replace(new RegExp(`([^]{${i}})%([^]*)%([^]{${len - next - 1}})`), (match, before, middle, after) => {
                        middle = middle.replace(/./g, letter => {
                            var index = replaceList.indexOf(letter);
                            return index != -1 ? smallCapsList[index] : letter;
                        })
                        return before + middle + after;
                    });
                    i = next - 2;
                    len -= 2;
                }
                break;
            case "&":
                var next = text.indexOf("&", i + 1);
                if (next != -1) {
                    text = text.replace(new RegExp(`([^]{${i}})&([^]*)&([^]{${len - next - 1}})`), (match, before, middle, after) => {
                        middle = middle.replace(/./g, letter => {
                            var index = replaceList.indexOf(letter);
                            return index != -1 ? upsideDownList[index] : letter;
                        })
                        return before + middle.split("").reverse().join("") + after;
                    });
                    i = next - 2;
                    len -= 2;
                }
                break;
        }
    }
    $textarea.val(text);
};

BetterFormatting.prototype.wrapSelection = function(textarea, wrapper) {
    var text = textarea.value;
    var start = textarea.selectionStart;
    var len = text.substring(textarea.selectionStart, textarea.selectionEnd).length;

    text = wrapper + text.substring(textarea.selectionStart, textarea.selectionEnd) + wrapper;

    textarea.focus();

    setTimeout(() => {
        document.execCommand("insertText", false, text);
        textarea.selectionEnd = (textarea.selectionStart = start + wrapper.length) + len;
    }, 1);
}

BetterFormatting.prototype.showToolbar = function(e) {
    $textarea = $(e.currentTarget);
    $textarea.parent().siblings(".bf-toolbar").stop().fadeIn();
}

BetterFormatting.prototype.hideToolbar = function(e) {
    $textarea = $(e.currentTarget);
    $textarea.parent().siblings(".bf-toolbar").stop().fadeOut();
}

BetterFormatting.prototype.addToolbar = function($textarea) {
    $textarea
        .on("keypress.betterformatting", this.format)
        .on("focus.betterformatting", this.showToolbar)
        .on("blur.betterformatting", this.hideToolbar)
        .parent().after(toolbarString)
        .siblings(".bf-toolbar").find("div")
        .on("click.betterformatting", (e) => {
            $button = $(e.currentTarget);
            this.wrapSelection($textarea[0], wrappers[$button.index()]);
        });
};

// unused
BetterFormatting.prototype.load = function() {};
BetterFormatting.prototype.unload = function() {};
BetterFormatting.prototype.onMessage = function() {};
BetterFormatting.prototype.onSwitch = function() {};
// unused

BetterFormatting.prototype.start = function() {
    $(".channel-textarea textarea").each((index, elem) => {
        this.addToolbar($(elem));
    });
    BdApi.injectCSS("bf-style", `
.bf-toolbar {
    position: absolute;
    padding: 10px;
    user-select: none;
    display: none;
    border-radius: 5px;
    background: #333;
    transform: translateY(-5px);
}
.bf-toolbar div {
    display: inline;
    padding: 7px 5px;
    transition: all .2s ease;
    cursor: pointer;
}
.bf-toolbar div:hover {
    background: #666;
}
`);
};

BetterFormatting.prototype.stop = function() {
    $(document).add("*").off("betterformatting");
    $(".bf-toolbar").remove();
    BdApi.clearCSS("bf-style");
};


BetterFormatting.prototype.observer = function(e) {
    if (!e.addedNodes.length) return;

    var $elem = $(e.addedNodes[0]);

    if ($elem.find(".channel-textarea").length || $elem.closest(".channel-textarea").length) {
        $textarea = $elem.find("textarea");
        this.addToolbar($textarea);
    }
};

BetterFormatting.prototype.getSettingsPanel = function() {
    return "";
};

BetterFormatting.prototype.getName = function() {
    return "Better Formatting";
};

BetterFormatting.prototype.getDescription = function() {
    return "Let's you format your messages with buttons and adds more formatting options";
};

BetterFormatting.prototype.getVersion = function() {
    return "0.1.2";
};

BetterFormatting.prototype.getAuthor = function() {
    return "Anxeal";
};
