'use strict';

var util = require('util');
var Bot = require('slackbots');

var BuddyBot = function Constructor(settings) {
    this.settings = settings;
    this.settings.name = this.settings.name || 'buddybot';
 
    this.user = null;
    this.db = null;
};

util.inherits(BuddyBot, Bot);

BuddyBot.prototype.run = function () {
    BuddyBot.super_.call(this, this.settings);

    this.on('start', this._onStart);
    this.on('message', this._onMessage);
};

BuddyBot.prototype._onStart = function () {
    this._loadBotUser();
};

BuddyBot.prototype._loadBotUser = function () {
    var self = this;
    this.user = this.users.filter(function (user) {
        return user.name === self.name;
    })[0];
};

BuddyBot.prototype._onMessage = function (message) {
	if (this._isChatMessage(message) &&
        this._isChannelConversation(message) &&
        !this._isFromBuddyBot(message) && 
        this._isChannelJoin(message)
    ) {
        this._welcomeUser(message);
    }
};

BuddyBot.prototype._isChatMessage = function (message) {
    return message.type === 'message' && Boolean(message.text);
};

BuddyBot.prototype._isChannelConversation = function (message) {
    return typeof message.channel === 'string' &&
        message.channel[0] === 'C';
};

BuddyBot.prototype._isFromBuddyBot = function (message) {
    return message.user === this.user.id;
};

BuddyBot.prototype._isChannelJoin = function(message) {
	return message.subtype === 'channel_join' && Boolean(message.subtype);
};

BuddyBot.prototype._welcomeUser = function (originalMessage) {
	var self = this;
	var channel = self._getChannelById(originalMessage.channel);

	var helpChannel = self._getChannelByName('help');
    var noobChannel = self._getChannelByName('noob');

	var newUser = self._getUserById(originalMessage.user);
	
	//fix when AB API key is ready
	var pocket = self._getUserByName('sam');
	var breakingthings = self._getUserByName('sam');

	var welcomeMsg = "Thanks for joining Angular Buddies! Please check out our <http://www.github.com|FAQs and Code of Conduct>. " +
	"If you're brand new to Angular, post questions to <#" + noobChannel.id + "|noob>, " + 
	"otherwise, post to <#" + helpChannel.id + "|help>. Feel free to message admins like " + 
	"<@" + pocket.id + "|pocket> or <@" + breakingthings.id + "|breakingthings> if any issues come up.";
	
	self.postMessageToUser(newUser.name, welcomeMsg, {as_user:true}, function(){
		console.log("Welcome message sent to " + newUser.name);
	});

	var welcomeBroadcast = "Welcome to Angular Buddies, " + newUser.name + "!";
	
    self.postMessageToChannel(channel.name, welcomeBroadcast, {as_user: true}, function(){
    	console.log("Welcome broadcasted to " + channel.name + " for " + newUser.name);
    });
};

BuddyBot.prototype._getChannelById = function (channelId) {
    return this.channels.filter(function (item) {
        return item.id === channelId;
    })[0];
};

BuddyBot.prototype._getChannelByName = function (channelName) {
    return this.channels.filter(function (item) {
        return item.name === channelName;
    })[0];
};

BuddyBot.prototype._getUserById = function (userId) {
    return this.users.filter(function (item) {
        return item.id === userId;
    })[0];
};

BuddyBot.prototype._getUserByName = function (userName) {
    return this.users.filter(function (item) {
        return item.name === userName;
    })[0];
};

module.exports = BuddyBot;