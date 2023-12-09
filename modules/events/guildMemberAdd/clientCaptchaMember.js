const low = require('lowdb')
const path = require('path');
const FileSync = require('lowdb/adapters/FileSync');

const check_BOT = new FileSync(path.resolve(__dirname, '../../configurations/configsBOT.json'));
const config_BOT = low(check_BOT)

module.exports = (member) => {
    config_BOT.read(); config_BOT.write()
    const checkrole = config_BOT.get('CONFIG_DO_BOT').find({bot_configurations: 'NO_MODIFY'}).value()
    
    if(member.guild.id === checkrole.bot_idGuilda){
        const role = member.guild.roles.cache.find(role => role.id === checkrole.bot_ruleNotVerify);
    
        member.roles.add(role)
    }else{
        return;
    }
}