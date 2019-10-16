const { App } = require("@slack/bolt");

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

// Listens to incoming messages that contain "hello"
app.message("oof", ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  say(`big oof`);
});

app.message("yaw", ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  say(`YEET :yeet-dab:`);
});

// app.message("machine learning", ({ message, say }) => {
//   say(`<@{Kenneth}>`);
// });

// app.message("testing", ({ message, say }) => {
//   say(`<@Kenneth>`);
// });

app.message("hello", ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  say(`Hey there <@${message.user}>!`);
});

app.message("yeet", ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  say(`YAW :yeet-dab:`);
});

app.message(/^(rip|Rip|RiP|rIp|rIP|RIp|RIP).*/, ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  say(`:pensive: :rip:`);
});

app.message("boi", ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  say(`:spongeboi:`);
});

app.message(
  /^(F in the chat|f in the chat|test).*/,
  async ({ context, say }) => {
    // RegExp matches are inside of context.matches
    // const greeting = context.matches[0];
    say(`:pensive: :press-f:`);

    // if (event.reaction === "calendar"){
    //  say(`You reacted with a calendar`);
    //   };
  }
);

// if someone can figure out how to send a message or do something when someone reacts with a certain emoji pls tell me :)
// @jon on slack

// send a message when someone reacts with a 📅 emoji
// app.event('reaction_added', async ({ event, say }) => {
//   if (event.reaction === "calendar"){
//    say(`You reacted with a calenda

//r`);
//   }
// });


// why u no work??? why what, why no work?

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);
  
  console.log('⚡️ Bolt app is running!');
})();
