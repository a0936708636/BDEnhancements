//META{"name":"HideChannel"}*//

var HideChannel = function() {};

HideChannel.prototype.extractChannelName = function(elem) {
    var res = elem.innerHTML.match(/#[a-z\-]*/g);
    return res ? res[0] : "";
}
HideChannel.prototype.hideChannelByName = function(channelName) {
    var channels = document.getElementsByClassName('channel');
    for (var i = 0; i < channels.length; i++) {
        var cn = "#" + channels[i].children[0].children[0].innerHTML.trim();
        if (cn == channelName) {
            $(channels[i]).css("display", "none");
            $(".context-menu").css("display", "none");
        }
    }
}

HideChannel.prototype.start = function() {

};

HideChannel.prototype.load = function() {
    // TODO load hidden channels
};

HideChannel.prototype.unload = function() {
    // TODO restore hidden channels
};

HideChannel.prototype.stop = function() {

};

HideChannel.prototype.onMessage = function() {
    //called when a message is received
};

HideChannel.prototype.onSwitch = function() {
    //called when a server or channel is switched
    // TODO load hidden channels
};

HideChannel.prototype.observer = function(e) {
    //raw MutationObserver event for each mutation
    if (e.addedNodes.length && e.addedNodes[0].classList && e.addedNodes[0].classList.contains('context-menu')) {
        var elem = document.getElementsByClassName('context-menu')[0];
        if (!elem) return;
        elem = elem.children[0]; // context menu
        if (elem.children[0].innerHTML.indexOf("Mute") == -1) return;
        if (elem.innerHTML.indexOf("Hide") != -1) return;
        var channelName = this.extractChannelName(e.addedNodes[0].children[0]);
        var button = document.createElement('div');
        button.className = "item";
        button.innerHTML = "Hide <strong>" + channelName + "</strong>";
        var self = this;
        button.onclick = function() {
            self.hideChannelByName(channelName);
        };
        elem.insertBefore(button, elem.children[1]);
    }
};

HideChannel.prototype.getSettingsPanel = function() {
    return "<h3>Unhide Channels</h3>";
    // TODO unhide channels
};

HideChannel.prototype.getName = function() {
    return "Hide Channel";
};

HideChannel.prototype.getDescription = function() {
    return "Allows hiding channels on the channel list.<br/>- Unhide hidden channels from the Settings Panel";
};

HideChannel.prototype.getVersion = function() {
    return "0.1.0";
};

HideChannel.prototype.getAuthor = function() {
    return "Anxeal";
};
