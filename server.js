const { App } = require("@slack/bolt");
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const axios = require("axios");
axios.defaults.headers.get["Content-Type"] = "application/json";

// channel ids, can be used to specify where a bot should post
const botTestID = "CPEAR8T28";
const catsIrlID = "CG4HWPQ3S";
const generalID = "C96BA0316";
const socialCodingID = "CG1QFD1J4";
const yeetID = "CCNRV68BS";
const hackathonsID = "CCUCG24KS";

// user ids, can be used for a bot to tag someone
const kenneth = "U9E7SGE5R";
const jon = "UDBQ0A3BR";
const long = "UCNQE0CU8";
const ivan =  "U9F7BUD0X";

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

slack.message("yaw", ({ message, say }) => {
  say(`YEET :yeet-dab:`);
});

slack.message("yeet", ({ message, say }) => {
  say(`YAW :yeet-dab:`);
});

slack.message("boi", ({ message, say }) => {
  say(`:spongeboi:`);
});

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

// bot tagging a specific user
slack.message("machine learning", ({ message, say }) => {
  say(`<@${kenneth}>`);
});

slack.message("This is Christian", ({ message, say }) => {
  say(`Hello Christian`);
});

slack.message("memes", ({ message, say }) => {
  say(`<@${jon}>`);
});

slack.message("webgl", ({ message, say }) => {
  say(`<@${long}>`);
});

slack.message("big brain", ({ message, say }) => {
  say(`<@${ivan}>`);
});

// example of posting an image block to slack chat

// say() supports "blocks", which you can learn more about
// here: api.slack.com/block-kit

// you can build and experiement live with blocks
// here: api.slack.com/tools/block-kit-builder
slack.message(/^(goose coin$)/i, ({ message, say }) => {
  say({
    blocks: [
      {
        type: "image",
        title: {
          type: "plain_text",
          text: "h0nks",
          emoji: true
        },
        image_url: "https://i.imgur.com/DwEMCMf.jpg",
        alt_text: "h0nks"
      }
    ]
  });
});

// example of posting an image from an api
slack.message(/^(random doge$)/i, async ({ message, say }) => {
  let url = `https://dog.ceo/api/breeds/image/random`;
  let randomUrl = await axios.get(url, config);
  console.log(randomUrl);
  say({
    blocks: [
      {
        type: "image",
        title: {
          type: "plain_text",
          text: "puppers incoming!!",
          emoji: true
        },
        image_url: randomUrl.data.message,
        alt_text: "puppers incoming!! "
      }
    ]
  });
});

slack.message(/^(gimmie a cat fact$)/i, async ({ message, say }) => {
  let url = `https://cat-fact.herokuapp.com/facts/random`;
  let apiCall = await axios.get(url, config);
  let catImageUrl = `https://api.thecatapi.com/v1/images/search`;
  let catImageAPI = await axios.get(catImageUrl, config);

  say({
    blocks: [
      {
        type: "section",
        block_id: "section567",
        text: {
          type: "mrkdwn",
          text: `${apiCall.data.text}`
        }
      },
      {
        type: "divider"
      },
      {
        type: "image",
        title: {
          type: "plain_text",
          text: "cats r kewl",
          emoji: true
        },
        image_url: catImageAPI.data[0].url,
        alt_text: "cute cat"
      }
    ]
  });
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
    say({
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "Pick a date for me to remind you"
          },
          accessory: {
            type: "datepicker",
            action_id: "datepicker_remind",
            initial_date: "2019-04-28",
            placeholder: {
              type: "plain_text",
              text: "Select a date"
            }
          }
        }
      ]
    });
  }
});

// more examples coming...

(async () => {
  // Start your app
  await slack.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!!!!!!");
})();
