const low = require('lowdb')
const path = require('path');
const FileSync = require('lowdb/adapters/FileSync');

const check_BOT = new FileSync(path.resolve(__dirname, '../../configurations/configsBOT.json'));
const config_BOT = low(check_BOT)

module.exports = (client) => {
    config_BOT.read(); config_BOT.write()

    // verificar
    const check = config_BOT.get('CONFIG_DO_BOT').find({bot_configurations: 'NO_MODIFY'}).value()

    try{
        client.guilds.cache.get(check.bot_idGuilda).roles.cache.some(r => r.id === check.bot_ruleNotVerify)
        console.log('[AVISO]: Cargo verificado com sucesso!')
    } catch(err){
        console.log('[ERRO DEPENDÊNCIA]: Você não configurou corretamente o ID da guilda do servidor principal ou o ID do cargo que será setado como Não verificado! Vá nas configurações e modifique.')
        process.exit()
    }
}