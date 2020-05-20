// file where all the message templates are found they are used for many different chat commands

// for example cat_fact is the chat template that can be processed in the server.js file
// we can add some obvious place holder values such as "{{FactAPI}}" and when we processes it
// in server.js we can use the replace function to replace "{{FactAPI}}" with the actual
// data we want

// messages are called "blocks", which you can learn more about
// here: api.slack.com/block-kit

// you can build and experiment live with blocks
// here: api.slack.com/tools/block-kit-builder

module.exports = {
  goose_coin: {
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
  },

  cat_fact: {
    blocks: [
      {
        type: "section",
        block_id: "section567",
        text: {
          type: "mrkdwn",
          text: "{{FactAPI}}"
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
        image_url: "{{ImageAPI}}",
        alt_text: "cute cat"
      }
    ]
  },

  calendar: {
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
  },

  start_project: {},

  stock_price: {
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            "{{name}}\n*<http://www.google.com/search?q=%24{{symbol}}|${{symbol}} chart link>*"
        }
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: "*Open:*\n{{open}}"
          },
          {
            type: "mrkdwn",
            text: "*High:*\n{{high}}"
          },
          {
            type: "mrkdwn",
            text: "*Low:*\n{{low}}"
          },
          {
            type: "mrkdwn",
            text: "*Close:*\n{{close}}"
          },
          {
            type: "mrkdwn",
            text: "*Volume:*\n{{volume}}"
          },
          {
            type: "mrkdwn",
            text: "*Time:*\n{{time}}"
          }
        ]
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: {
              type: "plain_text",
              emoji: true,
              text: "Buy"
            },
            style: "primary",
            value: "click_me_123"
          },
          {
            type: "button",
            text: {
              type: "plain_text",
              emoji: true,
              text: "Sell"
            },
            style: "danger",
            value: "click_me_123"
          }
        ]
      }
    ]
  },
  random_doge: {
    blocks: [
      {
        type: "image",
        title: {
          type: "plain_text",
          text: "d0ge",
          emoji: true
        },
        image_url: "{{DogImage}}",
        alt_text: "h0nks"
      }
    ]
  },
  reddit_meme: {
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*{{title}}*"
        }
      },
      {
        type: "image",
        title: {
          type: "plain_text",
          text: "stolen from REEEEddit",
          emoji: true
        },
        image_url: "{{url}}",
        alt_text: "Example Image"
      }
    ]
  },
  new_user_message: {
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            "Hey {{user}} 👋 I'm Mobi Bot. I'm here to enhance your Mobi experience.\nThere are a few fun and cool commands you can do :"
        }
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            "*:one: Use the `/faq` command*. Type `/faq` and I'll tell you some important information. Try it out by using the `/faq` command in this channel."
        }
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            "*:two: Use the _translateto dothraki_ event.* If you want to translate your message to dothraki, type `translateto dothraki hello world` in a message and see the magic!"
        }
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            "*:three: Use the `/meme` command.* If you want to see the top posts from r/programmerhumor, type `/meme` and get ready for some laughs!"
        }
      },
      {
        type: "divider"
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text:
              ":party-porg: These are just a few of the cool things I can do, hope you enjoy Mobi! \n :question: Get help by asking any of the officers and admins"
          }
        ]
      }
    ]
  }
  //insert more here don't forget to add a comma before adding your block message
};
