'use strict';

var BuddyBot = require('../lib/buddybot-compiled');

var token = process.env.BOT_API_KEY;
var name = process.env.BOT_NAME;

var buddybot = new BuddyBot({
	token: token,
	name: name
});

buddybot.run();