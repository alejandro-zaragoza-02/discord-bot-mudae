const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv/config');

var lastMessage = "";
const commands = ["$w", "$m", "/mx", "$h", "$mx", "$im ucy"];

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
    if(message.channel.name == 'wifus-todo'){
        try {
            if(message.embeds[0].data.description.substring(0, 9) == "One Piece" && commands.includes(lastMessage)){
                console.log("Avisando...");
                message.channel.send("<@247330571687034881> Ha salido un personaje de One Piece")
            }else{
                console.log("No se esta tirando.");
            }
        } catch (error) {
            console.log("No se ha encontrado descripcion");
        }finally{
            lastMessage = message.content.toLowerCase();
        }
    }
})

client.login(process.env.TOKEN);