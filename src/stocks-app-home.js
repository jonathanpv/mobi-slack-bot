// temp save of app home for simulated trading 
stock-app-home: [
	{
		"type": "section",
		"text": {
			"type": "mrkdwn",
			"text": "*Portfolio Performance*"
		},
		"accessory": {
			"type": "button",
			"text": {
				"type": "plain_text",
				"text": "Manage App Settings",
				"emoji": true
			},
			"value": "app_settings"
		}
	},
	{
		"type": "divider"
	},
	{
		"type": "section",
		"fields": [
			{
				"type": "mrkdwn",
				"text": "*Account Info*\nBuying Power: {{buying_power}} \nPorfolio Value: {{portfoilio_value}} "
			},
			{
				"type": "mrkdwn",
				"text": "*Top Expense Categories*\n:airplane: {{most_bought}} · 30%\n:taxi: {{most_bought_2}} · 24% \n:knife_fork_plate: {{most_bought_3}} · 18%"
			}
		]
	},
	{
		"type": "context",
		"elements": [
			{
				"type": "image",
				"image_url": "https://api.slack.com/img/blocks/bkb_template_images/placeholder.png",
				"alt_text": "placeholder"
			}
		]
	},
	{
		"type": "section",
		"text": {
			"type": "mrkdwn",
			"text": "*Account History*"
		}
	},
	{
		"type": "divider"
	},
	{
		"type": "context",
		"elements": [
			{
				"type": "mrkdwn",
				"text": "Date Bought : {{date_bought}}"
			}
		]
	},
	{
		"type": "section",
		"text": {
			"type": "mrkdwn",
			"text": "*Team Lunch (Internal)*\nCost: *$85.50USD*\nDate: *10/16/2019*\nService Provider: *Honest Sandwiches*  \nExpense no. *<fakelink.toUrl.com|#1797PD>*"
		},
		"accessory": {
			"type": "image",
			"image_url": "https://api.slack.com/img/blocks/bkb_template_images/creditcard.png",
			"alt_text": "credit card"
		}
	},
	{
		"type": "actions",
		"elements": [
			{
				"type": "button",
				"text": {
					"type": "plain_text",
					"text": "Approve",
					"emoji": true
				},
				"style": "primary",
				"value": "approve"
			},
			{
				"type": "button",
				"text": {
					"type": "plain_text",
					"text": "Decline",
					"emoji": true
				},
				"style": "danger",
				"value": "decline"
			},
			{
				"type": "button",
				"text": {
					"type": "plain_text",
					"text": "View Details",
					"emoji": true
				},
				"value": "details"
			}
		]
	},
	{
		"type": "divider"
	},
	{
		"type": "context",
		"elements": [
			{
				"type": "mrkdwn",
				"text": "Submitted by"
			},
			{
				"type": "image",
				"image_url": "https://api.slack.com/img/blocks/bkb_template_images/profile_2.png",
				"alt_text": "Pam Beasely"
			},
			{
				"type": "mrkdwn",
				"text": "*Pam Beasely*"
			}
		]
	},
	{
		"type": "section",
		"text": {
			"type": "mrkdwn",
			"text": "*Flights to New York*\nCost: *$520.78USD*\nDate: *10/18/2019*\nService Provider: *Delta Airways*\nExpense no. *<fakelink.toUrl.com|#1803PD>*"
		},
		"accessory": {
			"type": "image",
			"image_url": "https://api.slack.com/img/blocks/bkb_template_images/plane.png",
			"alt_text": "plane"
		}
	},
	{
		"type": "actions",
		"elements": [
			{
				"type": "button",
				"text": {
					"type": "plain_text",
					"text": "Approve",
					"emoji": true
				},
				"style": "primary",
				"value": "approve"
			},
			{
				"type": "button",
				"text": {
					"type": "plain_text",
					"text": "Decline",
					"emoji": true
				},
				"style": "danger",
				"value": "decline"
			},
			{
				"type": "button",
				"text": {
					"type": "plain_text",
					"text": "View Details",
					"emoji": true
				},
				"value": "details"
			}
		]
	}
]