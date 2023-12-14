const low = require('lowdb')
const path = require('path');
const FileSync = require('lowdb/adapters/FileSync');

const check_BOT = new FileSync(path.resolve(__dirname, '../../configurations/administrators.json'));
const config_BOT = low(check_BOT)

module.exports = (client) => {
    config_BOT.read(); config_BOT.write()

    const data = config_BOT.value();

    data.admins.map(r => console.log(`${r.username}`))
}