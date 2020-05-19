const messages = require('./app-home-messages');
const helpers = require('../src/helpers');

const updateView = async user => {
  // Intro message - (default message)
  
  let blocks = helpers.copy(messages.stocks_app_home);

  // Append new data blocks after the intro -

  let newData = [];

  try {
    // get all data from api and put it into an array form / object form? idk rn 
    // const rawData = db.getData(`/${user}/data/`);

    // newData = rawData.slice().reverse(); // Reverse to make the latest first
    // newData = newData.slice(0, 50); // Just display 20. BlockKit display has some limit.
  } catch (error) {
    //console.error(error);
  }

  if (newData) {
    let noteBlocks = [];
    let accountHistoryBlocks = [];

    for (const o of newData) {
      const color = o.color ? o.color : "yellow";

      let note = o.note;
      if (note.length > 3000) {
        note = note.substr(0, 2980) + "... _(truncated)_";
        console.log(note.length);
      }

      accountHistoryBlocks = helpers.copy(messages.account_history_block);
      
      noteBlocks = [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: note
          },
          accessory: {
            type: "image",
            image_url: `https://cdn.glitch.com/0d5619da-dfb3-451b-9255-5560cd0da50b%2Fstickie_${color}.png`,
            alt_text: "stickie note"
          }
        },
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: o.timestamp
            }
          ]
        },
        {
          type: "divider"
        }
      ];
      blocks = blocks.concat(noteBlocks);
    }
  }

  // The final view -

  let view = {
    type: "home",
    callback_id: "home_view",
    title: {
      type: "plain_text",
      text: "Keep notes!"
    },
    blocks: blocks
  };

  return JSON.stringify(view);
};

exports.createHome = async (user, data) => {
  if (data) {
    // Store in the mongodb
  }

  const userView = await updateView(user);
  return userView;
};
