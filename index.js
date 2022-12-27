const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv/config');

const KAKERA_AVISO = 200;
var lastMessage = "";
const commands = ["$w", "$m", "$h", "$mx", "$ma", "$wa", "$im ucy"];
var suscriptores = new Map();
suscriptores.set("247330571687034881", "One Piece");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})

client.on('ready', () => {
    console.log('El BOT esta listo.');
})

client.on('messageCreate', (message) => {
    if((message.channel.name == 'wifus-todo' || message.channel.name == 'prueba') && commands.includes(lastMessage)){
        suscriptores.forEach((collecion, usuario) => {
            try {
                // Comprobar si la carta es cara
                let kakeras = message.embeds[0].data.description.split('**')[1];
                if(kakeras > KAKERA_AVISO){
                    message.channel.send(`<@${usuario}>: Ha salido una carta cara`);
                }
                // Comprobar si la carta es de la coleccion del usuarios
                if(message.embeds[0].data.description.includes(collecion)){
                    console.log(`Ha salido un personaje de la coleccion de ${collecion}`);
                    message.channel.send(`<@${usuario}>: Ha salido un personaje de ${collecion}`);
                }
            } catch (error) {
                console.log(error);
            }
        })
    }else{
        console.log("Error");
    }
    lastMessage = message.content.toLowerCase();
})

client.login(process.env.TOKEN);