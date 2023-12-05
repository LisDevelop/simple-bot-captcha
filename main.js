const low = require('lowdb')
const path = require('path');
const FileSync = require('lowdb/adapters/FileSync');

const check_BOT = new FileSync(path.resolve(__dirname, './modules/configurations/configsBOT.json'));
const config_BOT = low(check_BOT)

const config_token = config_BOT.get('CONFIG_DO_BOT').find({bot_configurations: `NO_MODIFY`}).value();

// Livrarias
const Discord = require("discord.js");
const { CommandHandler } = require('djs-commander');

// DJS 
const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildScheduledEvents,
        Discord.GatewayIntentBits.GuildMessageTyping,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.DirectMessages,
        Discord.GatewayIntentBits.DirectMessageReactions,
        Discord.GatewayIntentBits.DirectMessageTyping,
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.GuildVoiceStates,
        Discord.GatewayIntentBits.GuildPresences,
        Discord.GatewayIntentBits.GuildMembers
    ]
});
module.exports = client

new CommandHandler({
    client,
    eventsPath: path.join(__dirname, './modules/events')
});

if(!config_token){
    config_BOT.set('CONFIG_DO_BOT', []).write()
    config_BOT.read(); config_BOT.write()
    config_BOT.get('CONFIG_DO_BOT').push({
        bot_configurations: 'NO_MODIFY',
        bot_token: 'TOKEN_AQUI',
        bot_ruleNotVerify: 'ID DO CARGO DE NÃO VERIFICADO AQUI',
        bot_channelToCaptcha: 'ID DO CANAL PARA ENVIAR O CAPTCHA',
        bot_idGuilda: "ID_DA_GUILDA_AQUI",
        bot_checkingMessage: '0 | NÃO MEXA AQUI!'
    }).write()
}

client.login(config_token.bot_token).then((ms) => {
    return;
}).catch((err) => {
    console.log('[ERRO DEPENDÊNCIA]: O TOKEN está inválido! Vá no diretório de configurations em módulos e mude o arquivo configsBOT.json, adicione o TOKEN no bot_token!\n\
    [AVISO DEPENDÊNCIA]: Lembre-se de ativar os privilégios no portal do desenvolvedor no momento que criar o BOT!!');
})