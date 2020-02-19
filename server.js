'use strict';

const Twit = require('twit');
const stream = require('./lib/stream');

// local modules
const deleteThread = require('./lib/delete-thread');

// local data
const config = require('./local.json');

const T = new Twit(config);

stream.start(config, (event) => {
  const tweets = event['tweet_create_events'];
  if (!tweets) return;
  tweets.forEach(tweet => {   
    if (tweet.user.id == config.userid) {
      console.log(`${tweet.user['screen_name']} says:\n ${tweet.text}\n`);
      if (tweet.text.search('#cleanup') > -1) deleteThread(T, tweet);
    }
  });
});