const { App } = require('@slack/bolt');

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

// Listens to incoming messages that contain "hello"
app.message('oof', ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  say(`big oof`);
});

app.message('yaw', ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  say(`YEET :yeet-dab:`);
});

app.message('yeet', ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  say(`YAW :yeet-dab:`);
});

app.message(/^(rip|Rip|RiP|rIp|rIP|RIp|RIP).*/, ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  say(`:pensive: :rip:`);
});

app.message('boi', ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  say(`:spongeboi:`);
});

app.message(/^(F in the chat|f in the chat).*/, async ({ context, say }) => {
  // RegExp matches are inside of context.matches
  // const greeting = context.matches[0];
  say(`:pensive: :press-f:`);
});

// Listener middleware that filters out messages with 'bot_message' subtype
function noBotMessages({ message, next }) {
  if (!message.subtype || message.subtype !== 'bot_message') {
     next();
  }
}

// The listener only receives messages from humans
app.message(noBotMessages, ({ message }) => console.log(
  `(MSG) User: ${message.user}
   Message: ${message.text}`
  say(` `);
));


(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();