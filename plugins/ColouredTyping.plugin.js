//META{"name":"colouredTyping"}*//

var colouredTyping = function() {};

colouredTyping.prototype.colourize = function() {
    $(".typing strong").each(function(index) {
        var username = $(this).text();
        console.log("[ColouredTyping] *" + username + "* is typing...");
        $(this).css("color", $('.member-username-inner').filter(function() {
            return $(this).text() === username;
        }).css("color"));
    });
}
colouredTyping.prototype.decolourize = function() {
    $(".typing strong").each(function(index) {
        $(this).css("color", "");
    });
}

// unused
colouredTyping.prototype.load = function() {};
colouredTyping.prototype.unload = function() {};
colouredTyping.prototype.onMessage = function() {};
// unused

colouredTyping.prototype.start = function() {
    this.colourize();
    setTimeout(this.colourize, 200);
    setTimeout(this.colourize, 400);
    setTimeout(this.colourize, 600);
    setTimeout(this.colourize, 2000);
};

colouredTyping.prototype.stop = function() {
    this.decolourize();
};


colouredTyping.prototype.onSwitch = function() {
    this.decolourize();
    this.colourize();
    setTimeout(this.colourize, 200);
    setTimeout(this.colourize, 400);
    setTimeout(this.colourize, 600);
    setTimeout(this.colourize, 2000);
};

colouredTyping.prototype.observer = function(e) {
    if (e.addedNodes.length > 0 && e.addedNodes[0].className && e.addedNodes[0].className.indexOf("typing") != -1) {
        // IDK
        this.colourize();
        // WHY
        setTimeout(this.colourize, 200);
        // IT
        setTimeout(this.colourize, 400);
        // WON'T
        setTimeout(this.colourize, 600);
        // WORK
        setTimeout(this.colourize, 2000);
        // SOMETIMES
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
