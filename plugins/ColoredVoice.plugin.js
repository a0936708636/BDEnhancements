//META{"name":"coloredVoice"}*//

var coloredVoice = function() {};
coloredVoice.prototype.data = {};
coloredVoice.prototype.dataVersion = "1";
coloredVoice.prototype.defaultData = function() {
    return {
        version: "1"
    };
}
coloredVoice.prototype.loadData = function() {
    // using the same data as ColoredTyping
    this.data = (localStorage.ColoredTyping) ? JSON.parse(localStorage.ColoredTyping) : {
        version: "0"
    }
    if (this.data.version != this.dataVersion) {
        // wew lad we're using a new way to save our data
        this.data = this.defaultData();
        this.saveData();
    };
};

coloredVoice.prototype.saveData = function() {
    localStorage.ColoredTyping = JSON.stringify(this.data);
};

coloredVoice.prototype.colorize = function() {
    var self = this;
    $(".channel-voice div span").each(function(index) {
        var username = $(this).text();
        $(this).css("color", self.data[username]);
    });
};

coloredVoice.prototype.decolorize = function() {
    $(".channel-voice div span").each(function(index) {
        $(this).css("color", "");
    });
};

// unused
coloredVoice.prototype.load = function() {};
coloredVoice.prototype.unload = function() {};
// unused

coloredVoice.prototype.onMessage = function() {
    var username = $(".message .user-name").last().text();
    var color = $(".message .user-name").last().css("color");
    this.data[username] = color;
    this.saveData();
};

coloredVoice.prototype.start = function() {
    this.loadData();
    this.colorize();
};

coloredVoice.prototype.stop = function() {
    this.decolorize();
};


coloredVoice.prototype.onSwitch = function() {
    var self = this;
    $('.member-username').each(function(index) {
        var username = $(this).children().html();
        var color = $(this).css('color');
        self.data[username] = color;
    });
    this.saveData();
    this.decolorize();
    this.colorize();
};

coloredVoice.prototype.observer = function(e) {
    console.log(e);
    var node = null;
    if ((e.addedNodes.length > 0 && e.addedNodes[0].localName &&
            e.addedNodes[0].localName.indexOf("ul") != -1) ||
        (e.removedNodes.length > 0 && e.removedNodes[0].className &&
            e.removedNodes[0].className.indexOf("channel-voice-states") != -1)) {
        node = e.addedNodes[0];
    }
    if ((e.addedNodes.length > 0 && e.addedNodes[0].localName &&
            e.addedNodes[0].localName.indexOf("li") != -1)) {
        node = e.addedNodes[0].parentNode;
        if (node.className != "channel-voice-states") {
            node = null;
        }
    }

    if (node != null) {
        this.decolorize();
        this.colorize();
    }
};

coloredVoice.prototype.getSettingsPanel = function() {
    return "";
};

coloredVoice.prototype.getName = function() {
    return "Colored Voice";
};

coloredVoice.prototype.getDescription = function() {
    return "Make the text color of the names in the voice channel same as role color";
};

coloredVoice.prototype.getVersion = function() {
    return "0.1.0";
};

coloredVoice.prototype.getAuthor = function() {
    return "Anxeal";
};
