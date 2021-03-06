// temp save of app home for simulated trading
module.exports = {
  stocks_app_home: {
    /* stock_app_home block start here  */
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*Portfolio Performance*"
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Manage App Settings",
            emoji: true
          },
          value: "app_settings"
        }
      },
      {
        type: "divider"
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text:
              "*Account Info*\nBuying Power: {{buying_power}} \nPorfolio Value: {{portfoilio_value}} "
          },
          {
            type: "mrkdwn",
            text:
              "*Top Expense Categories*\n:airplane: {{most_stock}} · {{most_percent}}%\n:taxi: {{most_2_stock}} · {{most_2_percent}}% \n:knife_fork_plate: {{most_3_stock}} · {{most_3_percent}}%"
          }
        ]
      },
      {
        type: "context",
        elements: [
          {
            type: "image",
            image_url:
              "https://api.slack.com/img/blocks/bkb_template_images/placeholder.png",
            alt_text: "placeholder"
          }
        ]
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*Account History*"
        }
      },
      {
        type: "divider"
      }
      // stock_app_home block end here
    ]
  },
  
  // this is the account history block, we will use this to stack them onto the app home page 
  // when data is present, the more data (users having more stocks in their portfolio)
  // the more we will stack this block
  account_history_block: {
    blocks: [
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: "Date Bought : {{date_bought}}"
          }
        ]
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            "*{{stock_name}}*\nCost: *${{total_invested}}USD*\nDate: *{{date_bought}}*\nShares: *{{total_shares}}*  \nExpense no. *<fakelink.toUrl.com|{{purchase_id}}>*"
        },
        accessory: {
          type: "image",
          image_url:
            "https://api.slack.com/img/blocks/bkb_template_images/creditcard.png",
          alt_text: "credit card"
        }
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "Buy",
              emoji: true
            },
            style: "primary",
            value: "approve"
          },
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "Sell",
              emoji: true
            },
            style: "danger",
            value: "decline"
          },
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "View Price",
              emoji: true
            },
            value: "details"
          }
        ]
      },
      {
        type: "divider"
      }
    ]
  }
};


let blocks = [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*Portfolio Performance*"
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Manage App Settings",
            emoji: true
          },
          value: "app_settings"
        }
      },
      {
        type: "divider"
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text:
              "*Account Info*\nBuying Power: {{buying_power}} \nPorfolio Value: {{portfoilio_value}} "
          },
          {
            type: "mrkdwn",
            text:
              "*Top Expense Categories*\n:airplane: {{most_stock}} · {{most_percent}}%\n:taxi: {{most_2_stock}} · {{most_2_percent}}% \n:knife_fork_plate: {{most_3_stock}} · {{most_3_percent}}%"
          }
        ]
      },
      {
        type: "context",
        elements: [
          {
            type: "image",
            image_url:
              "https://api.slack.com/img/blocks/bkb_template_images/placeholder.png",
            alt_text: "placeholder"
          }
        ]
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*Account History*"
        }
      },
      {
        type: "divider"
      }
      // stock_app_home block end here
    ]

let accountHistoryBlocks = [
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: "Date Bought : {{date_bought}}"
          }
        ]
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            "*{{stock_name}}*\nCost: *${{total_invested}}USD*\nDate: *{{date_bought}}*\nShares: *{{total_shares}}*  \nExpense no. *<fakelink.toUrl.com|{{purchase_id}}>*"
        },
        accessory: {
          type: "image",
          image_url:
            "https://api.slack.com/img/blocks/bkb_template_images/creditcard.png",
          alt_text: "credit card"
        }
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "Buy",
              emoji: true
            },
            style: "primary",
            value: "approve"
          },
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "Sell",
              emoji: true
            },
            style: "danger",
            value: "decline"
          },
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "View Price",
              emoji: true
            },
            value: "details"
          }
        ]
      },
      {
        type: "divider"
      }
    ]

module.exports = { blocks, accountHistoryBlocks };
