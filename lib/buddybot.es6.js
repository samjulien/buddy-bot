'use strict'

var util = require('util');
var Bot = require('slackbots');

class BuddyBot {

    constructor(settings) {
        util.inherits(BuddyBot, Bot);

        this.settings = settings;
        this.settings.name = this.settings.name || 'buddybot';
     
        this.user = null;
        this.db = null;
    };



    run() {
        this.super_.call(this, this.settings);

        this.on('start', this._onStart);
        this.on('message', this._onMessage);
    };

    _onStart() {
        this._loadBotUser();
    };

    _loadBotUser() {
        var self = this;
        this.user = this.users.filter(function (user) {
            return user.name === self.name;
        })[0];
    };

    _onMessage(message) {
    	if (this._isChatMessage(message) &&
            this._isChannelConversation(message) &&
            !this._isFromBuddyBot(message) && 
            this._isChannelJoin(message)
        ) {
            this._welcomeUser(message);
        }
    };

    _isChatMessage(message) {
        return message.type === 'message' && Boolean(message.text);
    };

    _isChannelConversation(message) {
        return typeof message.channel === 'string' &&
            message.channel[0] === 'C';
    };

    _isFromBuddyBot(message) {
        return message.user === this.user.id;
    };

    _isChannelJoin(message) {
    	return message.subtype === 'channel_join' && Boolean(message.subtype);
    };

    _welcomeUser(originalMessage) {
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

    	var welcomeBroadcast = `Welcome to Angular Buddies, ${newUser.name}!`;
    	
        self.postMessageToChannel(channel.name, welcomeBroadcast, {as_user: true}, function(){
        	console.log("Welcome broadcasted to " + channel.name + " for " + newUser.name);
        });
    };

    _getChannelById(channelId) {
        return this.channels.filter(function (item) {
            return item.id === channelId;
        })[0];
    };

    _getChannelByName(channelName) {
        return this.channels.filter(function (item) {
            return item.name === channelName;
        })[0];
    };

    _getUserById(userId) {
        return this.users.filter(function (item) {
            return item.id === userId;
        })[0];
    };

    _getUserByName(userName) {
        return this.users.filter(function (item) {
            return item.name === userName;
        })[0];
    };
}

module.exports = BuddyBot;