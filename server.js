const { App } = require("@slack/bolt");

//ids for some of our channels
const botTestID = 'CPEAR8T28';
const catsIrlID = 'CG4HWPQ3S';
const generalID = 'C96BA0316';
const socialCodingID = 'CG1QFD1J4';
const yeetID = 'CCNRV68BS';
const hackathonsID = 'CCUCG24KS';

const kenneth = 'U9E7SGE5R';
const jon = 'UDBQ0A3BR';

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
  // say() sends a message to the channel where the event was triggered
  say(`<@${kenneth}>`);
});

slack.message("yaw", ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  say(`YEET :yeet-dab:`);
});

slack.message("hello", ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  say(`Hey there <@${message.user}>!`);
});

slack.message("memes", ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  say(`<@UDBQ0A3BR>`);
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
  say(`:spongeboi:`);
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
// kolten: my work is done here :)

slack.event('reaction_added', async ({ event, context, say }) => {
  console.log(event)
  // jon: say(); ??
  try {
    if(event.reaction === "press-f"){
      say(`<@${event.user}> reacted with :press-f:`);
    }
    // doesn't like emojis? idk imma see what would make it work
    if(event.reaction === "pig"){
      // okay lol
      say(`reacted with :pig:`);
   }
  }
  catch (error) {
    console.error(error);
  }
});

//calendar 
slack.event('reaction_added', async ({ event, context, say }) => {
  if (event.reaction === 'calendar') {
    say({
      blocks: [{
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "Pick a date for me to remind you"
          },
          "accessory": {
            "type": "datepicker",
            "action_id": "datepicker_remind",
            "initial_date": "2019-04-28",
            "placeholder": {
              "type": "plain_text",
              "text": "Select a date"
             }
          }
        }]});
  }
});


(async () => {
  // Start your app
  await slack.start(process.env.PORT || 3000);
    
  console.log('⚡️ Bolt app is running!!!!!!');
})();

