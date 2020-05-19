// this is the server file, it's where our commands and message events are defined check the bot-test channel
// to find more resources!
const { App } = require("@slack/bolt");
const snoowrap = require("snoowrap");
const messages = require("./messages");
const helpers = require("./helpers");
const users = require("./users");
const channel = require("./channel-id");
const welcome = require("./welcome-messages");
const appHome = require('./appHome/app-home');
const fs = require("fs");

let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// we use this for get requests
const axios = require("axios");
axios.defaults.headers.get["Content-Type"] = "application/json";


const config = {
  headers: {
    Accept: "application/json"
  }
};

// Create a new snoowrap requester with OAuth credentials
const reddit = new snoowrap({
  userAgent: "reddit bot that reads top posts",
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  refreshToken: process.env.REDDIT_REFRESH_TOKEN
});

// Initializes your app with your bot token and signing secret
const slack = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

// example of a bot posting messages when a phrase is triggered
slack.message("oof", ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  say(`*big* _oof_`);
});

slack.message("yaw", ({ message, say }) => {
  say(`YEET :yeet-dab:`);
});

slack.message("yeet", ({ message, say }) => {
  say(`YAW :yeet-dab:`);
});

slack.message("boi", ({ message, say }) => {
  say(`:spongeboi:`);
});

// wutang name generator, ex: "wutang jonathan" gives jonathan's wutang name, uses an api :^)
slack.message("wutang", async ({ message, say }) => {
  let split = message.text.toLowerCase().split(" ");
  let name = split.slice(1, split.length).join("%20");
  console.log(message);

  let data = await axios.get(
    `https://wunameaas.herokuapp.com/enterthewu/${name}`,
    config
  );
  data = data.data.message;
  let newName = data.split(" ");
  newName = newName.slice(newName.length - 2, newName.length).join(" ");
  say(`Your new wutang name is ${newName}!`);
});

// fun api call to translate a message to dothraki
slack.message("translateto dothraki", async ({ message, say }) => {
  let split = message.text.toLowerCase().split(" ");
  console.log(split);
  let combined = split.slice(2, split.length).join("%20");
  console.log("combined:\n\n" + combined);
  let url = `https://api.funtranslations.com/translate/${
    split[1]
  }.json?text=${combined}`;
  console.log(url);
  let data = await axios.get(url, config);
  console.log(data.data);
  let translated = data.data.contents.translated;
  console.log(translated);
  say(`f: ${translated}`);
  console.log(data.data.contents.translated);
});

// example using regex
slack.message(/^(rip).*/i, ({ message, say }) => {
  say(`:pensive: :rip:`);
});

slack.message(/^(f in the chat).*/i, async ({ context, say }) => {
  // RegExp matches are inside of context.matches
  const matchingMessage = context.matches[0];
  console.log(matchingMessage);
  say(`:pensive: :press-f:`);
});

// bot tagging the "local" user that triggered the phrase "hello"
slack.message("hello", ({ message, say }) => {
  say(`Hey there <@${message.user}>!`);
});

// bot tagging a specific user, look at users.js to add your own user id to tag
slack.message("machine learning", ({ message, say }) => {
  say(`<@${users.kenneth}>`);
});

slack.message("This is Christian", ({ message, say }) => {
  say(`Hello Christian`);
});

slack.message("memes", ({ message, say }) => {
  say(`<@${users.jon}>`);
});

slack.message("webgl", ({ message, say }) => {
  say(`<@${users.long}>`);
});

// example of posting an image to slack chat
// here we called an external message
// look at goose_coin in the messages.js file
// the goose_coin block has a link to an image, and that's how we post images!

slack.message(/^(goose coin$)/i, ({ message, say }) => {
  say(messages.goose_coin);
});

// example of posting an image from an api
slack.message(/^(random doge$)/i, async ({ message, say }) => {
  let url = `https://dog.ceo/api/breeds/image/random`;
  let dogApiCall = await axios.get(url, config);
  let dogMessage = messages.random_doge;
  dogMessage.blocks[0].image_url = dogMessage.blocks[0].image_url.replace(
    "{{DogImage}}",
    `${dogApiCall.data.message}`
  );
  say(dogMessage);
});

slack.message(/^(cat$)/i, async ({ message, say }) => {
  let factUrl = `https://cat-fact.herokuapp.com/facts/random`;
  let factAPI = await axios.get(factUrl, config);
  let imageUrl = `https://api.thecatapi.com/v1/images/search`;
  let imageAPI = await axios.get(imageUrl, config);

  // load the gui block format that will display in the text chat
  let messageFormat = helpers.copy(messages.cat_fact);
  // fill in placeholder values with api info
  messageFormat.blocks[0].text.text = messageFormat.blocks[0].text.text.replace(
    "{{FactAPI}}",
    `${factAPI.data.text}`
  );
  messageFormat.blocks[2].image_url = messageFormat.blocks[2].image_url.replace(
    "{{ImageAPI}}",
    imageAPI.data[0].url
  );
  say(messageFormat);
  // say(messages.cat_fact);
});

// stock price viewer, ex: "$ SPY" gives SPY's live stock price
slack.message(/^\$/, async ({ message, say }) => {
  // since event is triggered by $ TICKERSYMBOL split the message
  // using .split and also take care of cases when people use $ tickErsYmBol
  let split = message.text.toUpperCase().split(/^\$/);
  let symbol = split[1].replace(" ", "");

  let stockFunction = "TIME_SERIES_INTRADAY";
  let interval = "1min";
  let outputSize = "compact";
  let apiKey = process.env.STOCKS_API;

  let stockPriceUrl =
    `https://www.alphavantage.co/query?` +
    `function=${stockFunction}` +
    `&symbol=${symbol}` +
    `&interval=${interval}` +
    `&outputsize=${outputSize}` +
    `&apikey=${apiKey}`;

  let data = await axios.get(stockPriceUrl, config);
  if (data.data["Error Message"]) {
    say(data.data["Error Message"] + "\nPerhaps an invalid ticker symbol?\n");
  }

  let lastRefreshed = data.data["Meta Data"]["3. Last Refreshed"];
  let timeSeries = `Time Series (${interval})`;

  let open = data.data[timeSeries][lastRefreshed]["1. open"];
  let high = data.data[timeSeries][lastRefreshed]["2. high"];
  let low = data.data[timeSeries][lastRefreshed]["3. low"];
  let close = data.data[timeSeries][lastRefreshed]["4. close"];
  let volume = data.data[timeSeries][lastRefreshed]["5. volume"];

  // alphavantage api has the stock's name in a different endpoint *sigh* so we'll have to make another get request
  let stockNameUrl =
    `https://www.alphavantage.co/query?` +
    `function=SYMBOL_SEARCH` +
    `&keywords=${symbol}` +
    `&apikey=${apiKey}`;

  data = await axios.get(stockNameUrl, config);

  // console.log(data.data);

  let stockName = data.data.bestMatches[0]["2. name"];

  // load the message template from the messages.js file, we called this message block "stock_price" in messages.js, so copy it
  let stockPriceMessage = helpers.copy(messages.stock_price);

  // remove the placeholder values with the actual data
  stockPriceMessage.blocks[0].text.text = stockPriceMessage.blocks[0].text.text.replace(
    "{{name}}",
    `${stockName}`
  );
  stockPriceMessage.blocks[0].text.text = stockPriceMessage.blocks[0].text.text.replace(
    "{{symbol}}",
    `${symbol}`
  );
  stockPriceMessage.blocks[0].text.text = stockPriceMessage.blocks[0].text.text.replace(
    "{{symbol}}",
    `${symbol}`
  );

  stockPriceMessage.blocks[1].fields[0].text = stockPriceMessage.blocks[1].fields[0].text.replace(
    "{{open}}",
    `${open}`
  );
  stockPriceMessage.blocks[1].fields[1].text = stockPriceMessage.blocks[1].fields[1].text.replace(
    "{{high}}",
    `${high}`
  );
  stockPriceMessage.blocks[1].fields[2].text = stockPriceMessage.blocks[1].fields[2].text.replace(
    "{{low}}",
    `${low}`
  );
  stockPriceMessage.blocks[1].fields[3].text = stockPriceMessage.blocks[1].fields[3].text.replace(
    "{{close}}",
    `${close}`
  );
  stockPriceMessage.blocks[1].fields[4].text = stockPriceMessage.blocks[1].fields[4].text.replace(
    "{{volume}}",
    `${volume}`
  );
  stockPriceMessage.blocks[1].fields[5].text = stockPriceMessage.blocks[1].fields[5].text.replace(
    "{{time}}",
    `${lastRefreshed}`
  );

  say(stockPriceMessage);
});

// example of bot triggered by users reacting with a specific emoji
// REMOVED BECAUSE WE CAN'T HAVE NICE THINGS 
// (ppl spammed it and called it recursion *cough* *cough* ivan)
// slack.event("reaction_added", async ({ event, context, say }) => {
//   console.log(event);
//   try {
//     // if any user reacts with :press-f: emoji then do something
//     if (event.reaction === "press-f") {
//       say(`<@${event.user}> reacted with :press-f:`);
//     }
//     // here's a pig example
//     if (event.reaction === "pig") {
//       say(`reacted with :pig:`);
//     }
//   } catch (error) {
//     console.error(error);
//   }
// });
// console.log(slack.event("reaction_added", async({event})));
// example of a calendar block, triggered when users react with the :calendar: emoji

slack.event("reaction_added", async ({ event, context, say }) => {
  if (event.reaction === "calendar") {
    say(messages.calendar);
  }
});

slack.event("team_join", async ({ event, context, say }) => {
  let size = Object.keys(welcome).length;
  let random = Math.floor(Math.random() * (size + 1));
  let message = welcome[random];
  message = message.replace("{{user}}", `${event.user}`);
  // say(message);
  
  // should only fire once since its team_join instead of member_joined_channel 
  console.log(message);
  const result = await slack.client.chat.postMessage({
    token: context.botToken,
    channel: channel.random,
    text: `${message}`
  });
});

let timesRequested = 0;
slack.command("/meme", async ({ command, ack, say }) => {
  await ack();
  let title;
  let imageUrl;
  let redditMessage = helpers.copy(messages.reddit_meme);
  await reddit
    .getSubreddit("programmerhumor")
    .getHot({ limit: 25 })
    .then(list => {
      title = list[timesRequested].title;
      imageUrl = list[timesRequested].url;
    });
  redditMessage.blocks[0].text.text = redditMessage.blocks[0].text.text.replace(
    "{{title}}",
    `${title}`
  );
  redditMessage.blocks[1].image_url = redditMessage.blocks[1].image_url.replace(
    "{{url}}",
    `${imageUrl}`
  );
  await say(redditMessage);
  timesRequested++;
});

// app home section
slack.event('app_home_opened', async ({ event, context, payload }) => {
  // Display App Home
  const homeView = await appHome.createHome(event.user);
  // console.log(homeView);
  try {
    const result = await slack.client.views.publish({
      token: context.botToken,
      user_id: event.user,
      view: homeView
    });
    // console.log("RESULT: " + result);
    
  } catch(e) {
    slack.error(e);
  }
  
  console.log(`${event.user}`);
});

slack.command("/faq", async ({ command, ack, say}) => {
  console.log(`${command.user_name} ${command.user_id} ${command.channel_name}`);
  await ack();
  
  // result will hold the channel id of the direct message the bot opened
  // we use the web api method conversations.open to open a conversation 
  // lol go figure
  const result = await slack.client.conversations.open({
    token: process.env.SLACK_BOT_TOKEN,
    users: command.user_id,
    // return_im: true
  });
  
  // use the channel id from result to post a message to that channel
  // since the channel is a direct message then mobi bot will
  // direct message the user that triggered the command /faq
  const messageUser = await slack.client.chat.postMessage({
    token: process.env.SLACK_BOT_TOKEN,
    channel: result.channel.id,
    text: `testing`
  });
});


(async () => {
  // Start your app
  await slack.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!!!!!!");
})();
