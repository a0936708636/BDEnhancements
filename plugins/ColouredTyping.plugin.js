//META{"name":"colouredTyping"}*//

var colouredTyping = function() {};
colouredTyping.prototype.data = {};
colouredTyping.prototype.dataVersion = "1";
colouredTyping.prototype.defaultData = function() {
    return {
        version: "1"
    };
}
colouredTyping.prototype.loadData = function() {
    this.data = (localStorage.ColouredTyping) ? JSON.parse(localStorage.ColouredTyping) : {
        version: "0"
    }
    if (this.data.version != this.dataVersion) {
        // wew lad we're using a new way to save our data
        this.data = this.defaultData();
        this.saveData();
    };
};

colouredTyping.prototype.saveData = function() {
    localStorage.ColouredTyping = JSON.stringify(this.data);
};

colouredTyping.prototype.colourize = function() {
    var names = $(".typing strong");
    for (var i = 0; i < names.length; i++) {
        var username = $(names[i]).text();
        $(names[i]).css("color", this.data[username]);
    }
};
colouredTyping.prototype.decolourize = function() {
    $(".typing strong").each(function(index) {
        $(this).css("color", "");
    });
};

// unused
colouredTyping.prototype.load = function() {};
colouredTyping.prototype.unload = function() {};
// unused

colouredTyping.prototype.onMessage = function() {
    var username = $(".message .user-name").last().text();
    var color = $(".message .user-name").last().css("color");
    this.data[username] = color;
    this.saveData();
    console.log(username + " is " + color);
};

colouredTyping.prototype.start = function() {
    this.loadData();
    this.colourize();
    setTimeout(this.colourize, 200);
};

colouredTyping.prototype.stop = function() {
    this.decolourize();
};


colouredTyping.prototype.onSwitch = function() {
    this.decolourize();
    this.colourize();
    setTimeout(this.colourize, 200);
};

colouredTyping.prototype.observer = function(e) {
    if (e.addedNodes.length > 0 && e.addedNodes[0].className && e.addedNodes[0].className.indexOf("typing") != -1) {
        // IDK WHY IT
        this.colourize();
        // SOMETIMES DOESN'T WORK
        setTimeout(this.colourize, 200);
    }
};

colouredTyping.prototype.getSettingsPanel = function() {
    return "";
};

colouredTyping.prototype.getName = function() {
    return "Coloured Typing";
};

colouredTyping.prototype.getDescription = function() {
    return "Make the text colour of the \"typing...\" text same as role colour";
};

colouredTyping.prototype.getVersion = function() {
    return "0.1.2";
};

colouredTyping.prototype.getAuthor = function() {
    return "Anxeal";
};
