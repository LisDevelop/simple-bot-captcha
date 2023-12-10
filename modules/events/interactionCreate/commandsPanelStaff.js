const low = require('lowdb')
const path = require('path');
const FileSync = require('lowdb/adapters/FileSync');

const check_BOT = new FileSync(path.resolve(__dirname, ''));
const config_BOT = low(check_BOT)

module.exports = (interaction) => {
    if(interaction.customId === ''){
        
    }
}