'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bot = require('slackbots');

var BuddyBot = (function (_Bot) {
    _inherits(BuddyBot, _Bot);

    function BuddyBot(settings) {
        _classCallCheck(this, BuddyBot);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BuddyBot).call(this, settings));

        _this.settings = settings;
        _this.settings.name = _this.settings.name || 'buddybot';

        _this.user = null;
        _this.db = null;
        return _this;
    }

    _createClass(BuddyBot, [{
        key: 'run',
        value: function run() {
            this.on('start', this._onStart);
            this.on('message', this._onMessage);
        }
    }, {
        key: '_onStart',
        value: function _onStart() {
            this._loadBotUser();
        }
    }, {
        key: '_loadBotUser',
        value: function _loadBotUser() {
            var self = this;
            this.user = this.users.filter(function (user) {
                return user.name === self.name;
            })[0];
        }
    }, {
        key: '_onMessage',
        value: function _onMessage(message) {
            if (this._isChatMessage(message) && this._isChannelConversation(message) && !this._isFromBuddyBot(message) && this._isChannelJoin(message)) {
                this._welcomeUser(message);
            }
        }
    }, {
        key: '_isChatMessage',
        value: function _isChatMessage(message) {
            return message.type === 'message' && Boolean(message.text);
        }
    }, {
        key: '_isChannelConversation',
        value: function _isChannelConversation(message) {
            return typeof message.channel === 'string' && message.channel[0] === 'C';
        }
    }, {
        key: '_isFromBuddyBot',
        value: function _isFromBuddyBot(message) {
            return message.user === this.user.id;
        }
    }, {
        key: '_isChannelJoin',
        value: function _isChannelJoin(message) {
            return message.subtype === 'channel_join' && Boolean(message.subtype);
        }
    }, {
        key: '_welcomeUser',
        value: function _welcomeUser(originalMessage) {
            var self = this;
            var channel = self._getChannelById(originalMessage.channel);

            var helpChannel = self._getChannelByName('help');
            var noobChannel = self._getChannelByName('noob');

            var newUser = self._getUserById(originalMessage.user);

            //fix when AB API key is ready
            var pocket = self._getUserByName('pocket');
            var breakingthings = self._getUserByName('breakingthings');

            var welcomeMsg = 'Thanks for joining Angular Buddies! Please check out our <http://www.github.com|FAQs and Code of Conduct>. If you\'re brand new to Angular, post questions to <#' + noobChannel.id + '|noob>, otherwise, post to <#' + helpChannel.id + '|help>. Feel free to message admins like <@' + pocket.id + '> or <@' + breakingthings.id + '> if any issues come up.';

            self.postMessageToUser(newUser.name, welcomeMsg, { as_user: true }, function () {
                console.log("Welcome message sent to " + newUser.name);
            });

            var welcomeBroadcast = 'Welcome to Angular Buddies, ' + newUser.name + '!';

            self.postMessageToChannel(channel.name, welcomeBroadcast, { as_user: true }, function () {
                console.log('Welcome broadcasted to ' + channel.name + ' for ' + newUser.name);
            });
        }
    }, {
        key: '_getChannelById',
        value: function _getChannelById(channelId) {
            return this.channels.filter(function (item) {
                return item.id === channelId;
            })[0];
        }
    }, {
        key: '_getChannelByName',
        value: function _getChannelByName(channelName) {
            return this.channels.filter(function (item) {
                return item.name === channelName;
            })[0];
        }
    }, {
        key: '_getUserById',
        value: function _getUserById(userId) {
            return this.users.filter(function (item) {
                return item.id === userId;
            })[0];
        }
    }, {
        key: '_getUserByName',
        value: function _getUserByName(userName) {
            return this.users.filter(function (item) {
                return item.name === userName;
            })[0];
        }
    }]);

    return BuddyBot;
})(Bot);

module.exports = BuddyBot;
