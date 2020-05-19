// const JsonDB = require('node-json-db');
// const db = new JsonDB('notes', true, false);

const app = require('./server');

/*
 * Home View - Use Block Kit Builder to compose: https://api.slack.com/tools/block-kit-builder
 */

const updateView = async(user) => {
  // Intro message - 
  
  let blocks = [ 
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "*Welcome!* \nThis is a home for Stickers app. You can add small notes here!"
      },
      accessory: {
        type: "button",
        action_id: "add_note", 
        text: {
          type: "plain_text",
          text: "Add a Stickie",
          emoji: true
        }
      }
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: ":wave: Hey, my source code is on <https://glitch.com/edit/#!/apphome-demo-note|glitch>!"
        }
      ]
    },
    {
      type: "divider"
    }
  ];

  // The final view -
  
  let view = {
    type: 'home',
    callback_id: 'home_view',
    title: {
      type: 'plain_text',
      text: 'Keep notes!'
    },
    blocks: blocks
  }
  
  return JSON.stringify(view);
};



/* Display App Home */

const createHome = async(user, data) => {  
  const userView = await updateView(user);
  
  return userView;
};



/* Open a modal */

const openModal = () => {
  
  const modal = {
    type: 'modal',
    callback_id: 'modal_view',
    title: {
      type: 'plain_text',
      text: 'Create a stickie note'
    },
    submit: {
      type: 'plain_text',
      text: 'Create'
    },
    blocks: [
      // Text input
      {
        "type": "input",
        "block_id": "note01",
        "label": {
          "type": "plain_text",
          "text": "Note"
        },
        "element": {
          "action_id": "content",
          "type": "plain_text_input",
          "placeholder": {
            "type": "plain_text",
            "text": "Take a note... \n(Text longer than 3000 characters will be truncated!)"
          },
          "multiline": true
        }
      },
      
      // Drop-down menu      
      {
        "type": "input",
        "block_id": "note02",
        "label": {
          "type": "plain_text",
          "text": "Color",
        },
        "element": {
          "type": "static_select",
          "action_id": "color",
          "options": [
            {
              "text": {
                "type": "plain_text",
                "text": "yellow"
              },
              "value": "yellow"
            },
            {
              "text": {
                "type": "plain_text",
                "text": "blue"
              },
              "value": "blue"
            },
            {
              "text": {
                "type": "plain_text",
                "text": "green"
              },
              "value": "green"
            },
            {
              "text": {
                "type": "plain_text",
                "text": "pink"
              },
              "value": "pink"
            }
          ]
        }
      
      }
    ]
  };
  
  return modal;
};


module.exports = { createHome, openModal };