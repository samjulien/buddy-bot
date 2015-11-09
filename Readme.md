# BuddyBot

BuddyBot is a tiny Slack bot written for the [Angular Buddies Slack](http://www.angularbuddies.com/). Right now it simply welcomes a new user in the channel and points them to a GitHub gist of FAQs and a Code of Conduct. BuddyBot joins #general by default, but you can invite it to another channel to perform the same behavior.

### Installation

I wanted to keep this as ligthweight as possible, so there are no build tools or anything.  You will need Babel to compile the ES6 prior to deployment. Babel 6 came out around the same time I wrote this, so it is configured for that version.

```sh
npm install -g babel-cli
```

To run, you can use either node or nodemon (in the dev dependencies) after compilation.

```sh
$ babel lib/buddybot.es6.js --out-file lib/buddybot-compiled.js
$ BOT_API_KEY=API_FROM_SLACK BOT_NAME=SLACK_BOTNAME nodemon bin/bot.js
```

You can of course also specify these environment variables in Heroku or wherever else you're deploying.

### Todos

This was meant to be a super simple initial set-up for the channel bot. If you want to contribute, great. We should probably implement a few things:

 - Write Tests
 - Add better logging and error handling
 - Add some slash commands for BuddyBot to respond to in the channels

### Credits

This bot relies heavily on the [slackbots](https://www.npmjs.com/package/slackbots) library. I took most of the concepts from this [Scotch.io tutorial](https://scotch.io/tutorials/building-a-slack-bot-with-node-js-and-chuck-norris-super-powers), customized it for our needs, and rewrote it in ES6.

##### License
MIT