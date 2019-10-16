const { App } = require("@slack/bolt");
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

//ids for some of our channels
const botTestID = "CPEAR8T28";
const catsIrlID = "CG4HWPQ3S";
const generalID = "C96BA0316";
const socialCodingID = "CG1QFD1J4";
const yeetID = "CCNRV68BS";
const hackathonsID = "CCUCG24KS";

const kenneth = "U9E7SGE5R";
const jon = "UDBQ0A3BR";

// Initializes your app with your bot token and signing secret
const slack = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

// Listens to incoming messages that contain "hello"
slack.message("oof", ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  say(`*big* _oof_`);
});

slack.message("machine learning", ({ message, say }) => {
  say(`<@${kenneth}>`);
});

slack.message("yaw", ({ message, say }) => {
  say(`YEET :yeet-dab:`);
});

slack.message("hello", ({ message, say }) => {
  say(`Hey there <@${message.user}>!`);
});

slack.message("memes", ({ message, say }) => {
  say(`<@UDBQ0A3BR>`);
});

slack.message("yeet", ({ message, say }) => {
  say(`YAW :yeet-dab:`);
});

slack.message(/^(rip|Rip|RiP|rIp|rIP|RIp|RIP).*/, ({ message, say }) => {
  say(`:pensive: :rip:`);
});

slack.message("boi", ({ message, say }) => {
  say(`:spongeboi:`);
});

slack.message("goose coin", ({ message, say }) => {
  //example of posting an image block to slack chat
  say({
	"blocks": [
		{
			"type": "image",
			"title": {
				"type": "plain_text",
				"text": "h0nks",
				"emoji": true
			},
			"image_url": "https://i.imgur.com/DwEMCMf.jpg",
			"alt_text": "h0nks"
		}
	]
});
});

function Get(yourUrl){
    let Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}

slack.message("random doge", ({ message, say }) => {
  let obj = Get('https://dog.ceo/api/breeds/image/random');
  let randomUrl = JSON.parse(obj);
  say({
	"blocks": [
		{
			"type": "image",
			"title": {
				"type": "plain_text",
				"text": "puppers incoming!!",
				"emoji": true
			},
			"image_url": randomUrl.message,
			"alt_text": "puppers incoming!! "
		}
	]
});
});

slack.message(
  /^(F in the chat|f in the chat|test).*/,
  async ({ context, say }) => {
    // RegExp matches are inside of context.matches
    // const greeting = context.matches[0];
    say(`:pensive: :press-f:`);
  }
);

slack.event("reaction_added", async ({ event, context, say }) => {
  console.log(event);
  // jon: say(); ??
  try {
    if (event.reaction === "press-f") {
      say(`<@${event.user}> reacted with :press-f:`);
    }
    // doesn't like emojis? idk imma see what would make it work
    if (event.reaction === "pig") {
      // okay lol
      say(`reacted with :pig:`);
    }
  } catch (error) {
    console.error(error);
  }
});

//calendar
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
