const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

const buttons_all = new ActionRowBuilder()
.addComponents(
  new ButtonBuilder()
  .setCustomId('buttonManagement_Monitorar')
  .setLabel('Monitorar grupos')
  .setStyle(ButtonStyle.Primary),

  new ButtonBuilder()
  .setCustomId('buttonManagement_Faccoes')
  .setLabel('Gerenciar facções')
  .setStyle(ButtonStyle.Primary),

  new ButtonBuilder()
  .setCustomId('buttonManagement_Usuarios')
  .setLabel('Área ')
  .setStyle(ButtonStyle.Primary),

  new ButtonBuilder()
  .setCustomId('buttonManagement_BOT')
  .setLabel('Área administrativa')
  .setStyle(ButtonStyle.Primary),
)

module.exports = {
    buttons_all
}