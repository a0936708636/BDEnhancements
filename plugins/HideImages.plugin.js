//META{"name":"hideImages"}*//

var hideImages = function() {};

hideImages.prototype.data = {};
hideImages.prototype.dataVersion = "1";
hideImages.prototype.defaultData = function() {
    return {
        version: "1"
    };
}
hideImages.prototype.loadData = function() {
    this.data = (localStorage.HideImages) ? JSON.parse(localStorage.HideImages) : {
        version: "0"
    }
    if (this.data.version != this.dataVersion) {
        // wew lad we're using a new way to save our data
        this.data = this.defaultData();
        this.saveData();
    };
};

hideImages.prototype.saveData = function() {
    localStorage.HideImages = JSON.stringify(this.data);
};

hideImages.prototype.extractChannelID = function(str) {
    var res = str.match(/#([a-z\-]+)/);
    if (!res) return;
    res = res[1];
    return $(".channel a:contains('" + res + "')").attr("href").match(/[0-9]+\/([0-9]+)/)[1];
};
hideImages.prototype.getServerID = function() {
    return $(".guild.selected a").attr("href").match(/([0-9]+)\/[0-9]+/)[1];
};
hideImages.prototype.getChannelID = function() {
    return $(".guild.selected a").attr("href").match(/[0-9]+\/([0-9]+)/)[1];
};

hideImages.prototype.hideImages = function() {
    $(".embed-image").css("display", "none");
    $(".embed-thumbnail").css("display", "none");
    $(".attachment-image").css("display", "none");
}
hideImages.prototype.showImages = function() {

    $(".embed-image").css("display", "block");
    $(".embed-thumbnail").css("display", "block");
    $(".attachment-image").css("display", "block");
}
hideImages.prototype.act = function() {
    var serverID = this.getServerID();
    var channelID = this.getChannelID();
    if (this.data[serverID] == undefined) {
        this.data[serverID] = {};
    }
    if (this.data[serverID][channelID]) {
        this.hideImages();
    } else {
        this.showImages();
    }
};

// unused
hideImages.prototype.load = function() {};
hideImages.prototype.unload = function() {};
// unused

hideImages.prototype.start = function() {
    this.loadData();
    this.act();
};

hideImages.prototype.stop = function() {
    this.showImages();
};

hideImages.prototype.onMessage = function() {
    this.act();
    setTimeout(this.act, 200);
    setTimeout(this.act, 400);
    setTimeout(this.act, 600);
    setTimeout(this.act, 2000);
};

hideImages.prototype.onSwitch = function() {
    this.act();
};

hideImages.prototype.observer = function(e) {
    if (e.addedNodes.length > 0 && e.addedNodes[0].className && e.addedNodes[0].className.indexOf('context-menu') != -1) {
        var elem = document.getElementsByClassName('context-menu')[0];
        if (!elem) return;
        elem = elem.children[0]; // context menu
        if (elem.children[0].innerHTML.indexOf("Mute") != -1) { // channel
            if (elem.innerHTML.indexOf("Hide Images") != -1 || elem.innerHTML.indexOf("Show Images") != -1) return;
            var serverID = this.getServerID();
            var channelID = this.extractChannelID(e.addedNodes[0].children[0].innerHTML);
            var button = document.createElement('div');
            button.className = "item";
            if (this.data[serverID] == undefined) {
                this.data[serverID] = {};
            }
            if (this.data[serverID][channelID])
                button.innerHTML = '<div class="label">Show Images</div>';
            else
                button.innerHTML = '<div class="label">Hide Images</div>';
            var self = this;
            button.onclick = function() {
                if (self.data[serverID] == undefined) {
                    self.data[serverID] = {};
                }
                self.data[serverID][channelID] = self.data[serverID][channelID] ? false : true;
                self.saveData();
                self.act();
                $(".context-menu").css("display", "none");
            };
            this.saveData();
            elem.insertBefore(button, elem.children[1]);
        } else if (elem.children[0].innerHTML.indexOf("Mark As Read") != -1) { // server
            if (elem.innerHTML.indexOf("Hide Images") != -1 || elem.innerHTML.indexOf("Show Images") != -1) return;
            var serverID = this.getServerID();
            var channelID = this.getChannelID();
            var button = document.createElement('div');
            button.className = "item";
            if (this.data[serverID] == undefined) {
                this.data[serverID] = {};
            }
            if (this.data[serverID][channelID])
                button.innerHTML = '<div class="label">Show Images</div>';
            else
                button.innerHTML = '<div class="label">Hide Images</div>';
            var self = this;
            button.onclick = function() {
                if (self.data[serverID] == undefined) {
                    self.data[serverID] = {};
                }
                var hideImage = self.data[self.getServerID()][self.getChannelID()] ? false : true;
                $(".channel-name").each(function(index) {
                    var chan = self.extractChannelID("#" + this.innerHTML);
                    if (chan == undefined) return true;
                    self.data[self.getServerID()][chan] = hideImage;
                });
                self.saveData();
                self.act();
                $(".context-menu").css("display", "none");
            };
            this.saveData();
            elem.insertBefore(button, elem.children[2]);
        }
    }
};

hideImages.prototype.getSettingsPanel = function() {
    return "";
};

hideImages.prototype.getName = function() {
    return "Hide Images";
};

hideImages.prototype.getDescription = function() {
    return "Adds a button to the right-click menu to hide images on certain servers and channels.";
};

hideImages.prototype.getVersion = function() {
    return "0.2.3";
};

hideImages.prototype.getAuthor = function() {
    return "Anxeal";
};
