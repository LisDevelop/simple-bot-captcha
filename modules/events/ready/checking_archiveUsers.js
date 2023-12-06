const low = require('lowdb')
const path = require('path');
const FileSync = require('lowdb/adapters/FileSync');

const check_BOT = new FileSync(path.resolve(__dirname, '../../configurations/usersCaptcha.json'));
const config_BOT = low(check_BOT)

module.exports = (client) => {
    config_BOT.read(); config_BOT.write()

    // verificar
    const check = config_BOT.get('users').find({checkingUsers: 'NO_MODIFY'}).value()

    if(!check){
        config_BOT.set('users', []).write()
        config_BOT.read(); config_BOT.write()
    }
}