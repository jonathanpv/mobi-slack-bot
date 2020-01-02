const { App } = require("@slack/bolt");
const messages = require('./messages');
const helpers = require('./helpers');
const users = require('./users');
const channel = require('./channel-id');
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const axios = require("axios");
axios.defaults.headers.get["Content-Type"] = "application/json";


// Initializes your app with your bot token and signing secret
const slack = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

// we use this for get requests
let config = {
    headers: { 
      Accept: "application/json"
    }
  };

// example of a bot posting messages when a phrase is triggered
slack.message("oof", ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  say(`*big* _oof_`);
});

slack.command('/echo', async ({ command, ack, say }) => {
  // Acknowledge command request
  ack();
  console.log("triggerd");
  
  say(`${command.text}`);
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

// wutang 
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
  // console.log(message);
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
  }
);

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

// example of posting an image block to slack chat

// say() supports "blocks", which you can learn more about
// here: api.slack.com/block-kit

// you can build and experiment live with blocks
// here: api.slack.com/tools/block-kit-builder
slack.message(/^(goose coin$)/i, ({ message, say }) => {
  say(messages.goose_coin);
});

// example of posting an image from an api
slack.message(/^(random doge$)/i, async ({ message, say }) => {
  let url = `https://dog.ceo/api/breeds/image/random`;
  let randomUrl = await axios.get(url, config);
  console.log(randomUrl);
  say(messages.goose_coin);
});

slack.message(/^(gimmie a cat fact$)/i, async ({ message, say }) => {
  let factUrl = `https://cat-fact.herokuapp.com/facts/random`;
  let factAPI = await axios.get(factUrl, config);
  let imageUrl = `https://api.thecatapi.com/v1/images/search`;
  let imageAPI = await axios.get(imageUrl, config);
  
  let messageFormat = helpers.copy(messages.cat_fact)
  // fill in placeholder values with api info
  messageFormat.blocks[0].text.text = messageFormat.blocks[0].text.text.replace('{{FactAPI}}', `${factAPI.data.text}`);
  messageFormat.blocks[2].image_url = messageFormat.blocks[2].image_url.replace('{{ImageAPI}}', imageAPI.data[0].url);
  say(messageFormat);
  // say(messages.cat_fact);
});

// example of bot triggered by users reacting with a specific emoji
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

// more examples coming...

(async () => {
  // Start your app
  await slack.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!!!!!!");
})();
