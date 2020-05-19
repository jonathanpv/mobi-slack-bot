const message = require('./app-home-messages');
const helper = require('../src/helpers');

const updateView = async user => {
  // Intro message -

  let blocks = 

  // Append new data blocks after the intro -

  let newData = [];

  try {
    const rawData = db.getData(`/${user}/data/`);

    newData = rawData.slice().reverse(); // Reverse to make the latest first
    newData = newData.slice(0, 50); // Just display 20. BlockKit display has some limit.
  } catch (error) {
    //console.error(error);
  }

  if (newData) {
    let noteBlocks = [];

    for (const o of newData) {
      const color = o.color ? o.color : "yellow";

      let note = o.note;
      if (note.length > 3000) {
        note = note.substr(0, 2980) + "... _(truncated)_";
        console.log(note.length);
      }

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
