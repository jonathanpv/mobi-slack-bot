const messages = require('./app-home-messages');
const helpers = require('./../helpers');

const updateView = async user => {
  // Intro message - (default message)
  
  let blocks = helpers.copy(messages.stocks_app_home);
  console.log(blocks);
  // Append new data blocks after the intro -

  let newData = [];

  try {
    // get all data from mongodb and put it into an array form / object form? idk rn 
    // const rawData = db.getData(`/${user}/data/`);

    // newData = rawData.slice().reverse(); // Reverse to make the latest first
    // newData = newData.slice(0, 50); // Just display 20. BlockKit display has some limit.
  } catch (error) {
    //console.error(error);
  }

  if (newData) {
    // let noteBlocks = [];
    let accountHistoryBlocks = [];

    for (const o of newData) {
      
      // processing of data goes here
      
      // const color = o.color ? o.color : "yellow";

      // let note = o.note;
      // if (note.length > 3000) {
      //   note = note.substr(0, 2980) + "... _(truncated)_";
      //   console.log(note.length);
      // }

      // loading of block to be stacked goes here
      accountHistoryBlocks = helpers.copy(messages.account_history_block);
      
      // populate the block with the data retrieved from mongodb
      // accountHistoryBlocks.replace
      
      // finally concatinate it to the master block (app home block that the user will see)
      blocks = blocks.concat(accountHistoryBlocks);
    }
  }

  // The final view -

  let view = {
    type: "home",
    callback_id: "home_view",
    title: {
      type: "plain_text",
      text: "Stock portfolio !"
    },
    blocks: blocks
  };

  return JSON.stringify(view);
};


/* Display App Home */
exports.createHome = async (user, data) => {
  if (data) {
    // Store in the mongodb
  }
  const userView = await updateView(user);
  
  return userView;
};
