const { App } = require("@slack/bolt");
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const axios = require('axios');

// ids for some of our channels, can be used to specify where a bot should post
const botTestID = "CPEAR8T28";
const catsIrlID = "CG4HWPQ3S";
const generalID = "C96BA0316";
const socialCodingID = "CG1QFD1J4";
const yeetID = "CCNRV68BS";
const hackathonsID = "CCUCG24KS";

// user ids for some users, can be used for a bot to tag someone
const kenneth = "U9E7SGE5R";
const jon = "UDBQ0A3BR";
const long = "UCNQE0CU8";

// Initializes your app with your bot token and signing secret
const slack = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

// example of a bot posting messages when a phrase is triggered
// Listens to incoming messages that contain "oof"
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

slack.command("/wutang", ({ ack, payload, context }) => {
  ack();
  console.log(payload);
});

// example of using reg ex, regular expression (useful when there's patterns of characters)
// can be useful for email, phones, etc
slack.message(/^(rip|Rip|RiP|rIp|rIP|RIp|RIP).*/, ({ message, say }) => {
  say(`:pensive: :rip:`);
});

// still reg ex, but the function was too long so that's why it looks weird
slack.message(
  /^(F in the chat|f in the chat|test).*/,
  async ({ context, say }) => {
    // RegExp matches are inside of context.matches
    // const greeting = context.matches[0];
    say(`:pensive: :press-f:`);
  }
);

// example of bot tagging the "local" user that triggered the phrase "hello"
slack.message("hello", ({ message, say }) => {
  say(`Hey there <@${message.user}>!`);
});

// example of bot tagging a specific user
slack.message("machine learning", ({ message, say }) => {
  say(`<@${kenneth}>`);
});

// slack.message("whos this", ({ message, say }) => {
//   say(`<@${}>`);
// });

slack.message("This is Christian", ({ message, say }) => {
  say(`Hello Christian`);
});

slack.message("memes", ({ message, say }) => {
  say(`<@${jon}>`);
});

slack.message("webgl", ({ message, say }) => {
  say(`<@${long}>`);
});

// example of posting an image block to slack chat

// say() supports "blocks", which you can learn more about
// here: https://api.slack.com/block-kit

// but even more fun, you can build and experiement live with blocks
// here: https://api.slack.com/tools/block-kit-builder
slack.message("goose coin", ({ message, say }) => {
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

// example of posting an image from an xhr request (a website that contains json)
// ^^ if not correct defintion can someone correct it pls
// this xhr request returns a random json type with two identifiers? message: and status:,
// to get data you need to parse message:
// and message has a url to a picutre of a random doge

// function to get the json from a url
function Get(yourUrl) {
  let Httpreq = new XMLHttpRequest(); // a new request
  Httpreq.open("GET", yourUrl, false);
  Httpreq.send(null);
  return Httpreq.responseText;
}

slack.message("random doge", ({ message, say }) => {
  // obj is the full json
  let obj = Get("https://dog.ceo/api/breeds/image/random");
  // randomUrl is the parsed json, we can now access different data
  // with the . operator
  let randomUrl = JSON.parse(obj);
  say({
    blocks: [
      {
        type: "image",
        title: {
          type: "plain_text",
          text: "puppers incoming!!",
          emoji: true
        },
        image_url: randomUrl.message,
        alt_text: "puppers incoming!! "
      }
    ]
  });
});

// example of bot triggered by users reacting with a specific emoji
slack.event("reaction_added", async ({ event, context, say }) => {
  console.log(event);
  try {
    // if any user reacts with :press-f: emoji then do something
    if (event.reaction === "press-f") {
      say(`<@${event.user}> reacted with :press-f:`);
    }
    // here's a pig example
    if (event.reaction === "pig") {
      say(`reacted with :pig:`);
    }
  } catch (error) {
    console.error(error);
  }
});

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

// how to make method requests, which can be found in https://api.slack.com/methods
// example of using the dialog open method: https://api.slack.com/methods/dialog.open

// slack.message("hey mobi", async ({ message, context }) => {
//   try {
//     // Call the chat.scheduleMessage method with a token
//     const result = await slack.client.dialog.open({
//       // The token you used to initialize your app is stored in the `context` object
//       // token is required for this method
//       token: context.botToken,
//       // fill the dialog thingy, on the website it says that it only takes a JSON string
//       dialog: {
//         callback_id: "ryde-46e2b0",
//         title: "Request a Ride",
//         submit_label: "Request",
//         state: "Limo",
//         elements: [
//           {
//             type: "text",
//             label: "Pickup Location",
//             name: "loc_origin"
//           },
//           {
//             type: "text",
//             label: "Dropoff Location",
//             name: "loc_destination"
//           }
//         ]
//       }
//     });
//   } catch (error) {
//     console.error(error);
//   }
// });

(async () => {
  // Start your app
  await slack.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!!!!!!");
})();
