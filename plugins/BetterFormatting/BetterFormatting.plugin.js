//META{"name":"BetterFormatting"}*//

class BetterFormatting { // eslint-disable-line no-unused-vars
    constructor() {
        this.replaceList = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}";
        this.smallCapsList = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ{|}";
        this.superscriptList = " !\"#$%&'⁽⁾*⁺,⁻./⁰¹²³⁴⁵⁶⁷⁸⁹:;<⁼>?@ᴬᴮᶜᴰᴱᶠᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾQᴿˢᵀᵁⱽᵂˣʸᶻ[\\]^_`ᵃᵇᶜᵈᵉᶠᵍʰᶦʲᵏˡᵐⁿᵒᵖᑫʳˢᵗᵘᵛʷˣʸᶻ{|}";
        this.upsideDownList = " ¡\"#$%⅋,)(*+'-˙/0ƖᄅƐㄣϛ9ㄥ86:;>=<¿@∀qƆpƎℲפHIſʞ˥WNOԀQɹS┴∩ΛMX⅄Z]\\[^‾,ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz}|{".split("");
        this.upsideDownList[2] = ",,";
        this.fullwidthList = "　！＂＃＄％＆＇（）＊＋，－．／０１２３４５６７８９：；＜＝＞？＠ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ［＼］＾＿｀ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ｛｜｝";

        this.toolbarString = "<div class='bf-toolbar'><div><b>Bold</b></div><div><i>Italic</i></div><div><u>Underline</u></div><div><s>Strikethrough</s></div><div style='font-family:monospace;'>Code</div><div>ˢᵘᵖᵉʳˢᶜʳᶦᵖᵗ</div><div>SᴍᴀʟʟCᴀᴘs</div><div>Ｆｕｌｌｗｉｄｔｈ</div><div>uʍopǝpᴉsd∩</div></div></div>";
        this.wrappers = ["**", "*", "__", "~~", "`", "^", "%", "#", "&"];
    }

    getSettingsPanel() {
        return "";
    }

    getName() {
        return "BetterFormatting";
    }

    getDescription() {
        return "Lets you format your messages with buttons and adds more formatting options";
    }

    getVersion() {
        return "1.0.0";
    }

    getAuthor() {
        return "Anxeal";
    }
}
