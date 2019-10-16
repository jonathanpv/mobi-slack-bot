const { App } = require("@slack/bolt");

// Initializes your app with your bot token and signing secret
const slack = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

// Listens to incoming messages that contain "hello"
slack.message("oof", ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  say(`big oof`);
});

slack.message("yaw", ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  say(`YEET :yeet-dab:`);
});

slack.message("hello", ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  say(`Hey there <@${message.user}>!`);
});

slack.message("yeet", ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  say(`YAW :yeet-dab:`);
});

slack.message(/^(rip|Rip|RiP|rIp|rIP|RIp|RIP).*/, ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  say(`:pensive: :rip:`);
});

slack.message("boi", ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  // say(`:spongeboi:`);
});

slack.message(
  /^(F in the chat|f in the chat|test).*/,
  async ({ context, say }) => {
    // RegExp matches are inside of context.matches
    // const greeting = context.matches[0];
    say(`:pensive: :press-f:`);
  }
);

// kolten: why????
// jon: why what, why no work?
// kolten: why u no work???
// kolten: this is from the Listening to events section 
// jon: ah ok
// kolten: *shrug*
// jon: gtg
// kolten: kk
// jon: nvm food coming later at 9:30ish 
// kolten: are we subscribed to events in the apps config?
// jon: thats what i was wondering but considering we can make message requests im assuming we are, or maybe not idk
// kolten: i dont think we are or we'd at least see the event being logged
// jon: welp maybe we can figure out how to @ someone specific?? thats another problem i havent been able to SoLvE
// kolten: zach added the bot, i can't change the permissions
// jon: ye i assumed that would be the case
// jon: *big sigh*
// kolten: food time, this should work though 
// jon: food time? u goin?
// kolten: not far at least
slack.event('reaction_added', async ({ event, context }) => {
  console.log(event)
  // jon: say(); ??
  try {
    const result = await slack.client.chat.postMessage({
      token: context.botToken,
      text: `🎉`
    });
    
    console.log(result);
  }
  catch (error) {
    console.error(error);
  }
});

(async () => {
  // Start your app
  await slack.start(process.env.PORT || 3000);
    
  console.log('⚡️ Bolt app is running!!!!!!');
})();
