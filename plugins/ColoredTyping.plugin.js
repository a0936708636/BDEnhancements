//META{"name":"coloredTyping"}*//

var coloredTyping = function() {};
coloredTyping.prototype.data = {};
coloredTyping.prototype.dataVersion = "1";
coloredTyping.prototype.defaultData = function() {
    return {
        version: "1"
    };
}
coloredTyping.prototype.loadData = function() {
    this.data = (localStorage.ColoredTyping) ? JSON.parse(localStorage.ColoredTyping) : {
        version: "0"
    }
    if (this.data.version != this.dataVersion) {
        // wew lad we're using a new way to save our data
        this.data = this.defaultData();
        this.saveData();
    };
};

coloredTyping.prototype.saveData = function() {
    localStorage.ColoredTyping = JSON.stringify(this.data);
};

coloredTyping.prototype.colorize = function() {
    var self = this;
    $(".typing strong").each(function(index) {
        var username = $(this).text();
        $(this).css("color", self.data[username]);
    });
};
coloredTyping.prototype.decolorize = function() {
    $(".typing strong").each(function(index) {
        $(this).css("color", "");
    });
};

// unused
coloredTyping.prototype.load = function() {};
coloredTyping.prototype.unload = function() {};
// unused

coloredTyping.prototype.onMessage = function() {
    var username = $(".message .user-name").last().text();
    var color = $(".message .user-name").last().css("color");
    this.data[username] = color;
    this.saveData();
};

coloredTyping.prototype.start = function() {
    this.loadData();
    this.colorize();
};

coloredTyping.prototype.stop = function() {
    this.decolorize();
};


coloredTyping.prototype.onSwitch = function() {
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

coloredTyping.prototype.observer = function(e) {
    if ((e.addedNodes.length > 0 && e.addedNodes[0].localName &&
            e.addedNodes[0].localName.indexOf("strong") != -1) ||
        (e.addedNodes.length > 0 && e.addedNodes[0].className &&
            e.addedNodes[0].className.indexOf("spinner") != -1)) {
        this.colorize();
    }
    if ((e.removedNodes.length > 0 && e.removedNodes[0].localName &&
            e.removedNodes[0].localName.indexOf("strong") != -1) ||
        (e.removedNodes.length > 0 && e.removedNodes[0].className &&
            e.removedNodes[0].className.indexOf("spinner") != -1)) {
        this.decolorize();
        this.colorize();
    }
};

coloredTyping.prototype.getSettingsPanel = function() {
    return "";
};

coloredTyping.prototype.getName = function() {
    return "Colored Typing";
};

coloredTyping.prototype.getDescription = function() {
    return "Make the text color of the \"typing...\" text same as role color";
};

coloredTyping.prototype.getVersion = function() {
    return "0.1.4";
};

coloredTyping.prototype.getAuthor = function() {
    return "Anxeal, Bolli";
};
