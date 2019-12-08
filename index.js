const Discord = require("discord.js");
const client = new Discord.Client();
var Canvas = require('canvas');


let prefix = '#'





client.on('ready', function() {


  client.user.setActivity(`🔮 Habbita - ${client.user.username}`, { type: "Watching", url: 'https://www.twitch.tv/' });

  console.log('Connecté sur ' + client.user.tag);

  console.log(
     `${"-".repeat(40)}\n` +
     "|  Logs.  |\n" +
     `${"-".repeat(40)}\n` +
     "Bot Infos : \n" +
     `Nom du bot    : ${client.user.tag}!\n` +
     `ID du bot     : ${client.user.id}\n` +
     `Token du bot : ${client.token}\n` +
     `Invitation : https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=2146958847 \n` +
     `${"-".repeat(40)}\n`
 );


});




function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (var i = 0; i < 7; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

const key = makeid()
    //

// wait 5secondes
function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}


client.on('guildMemberAdd', async member => {

  // CONFIG

  let roleName = "Membre";
  let serveurID = "619900953008668672";
  let channelverif = client.channels.get("653367201255915550");
  let channelog = client.channels.get("653367210164617216");



  const canvas = Canvas.createCanvas(700, 250);
const ctx = canvas.getContext('2d');

const background = await Canvas.loadImage('./basic.png');
ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

ctx.strokeStyle = '#74037b';
ctx.strokeRect(0, 0, canvas.width, canvas.height);

// Select the font size and type from one of the natively available fonts

// Select the style that will be used to fill the text in
ctx.fillStyle = '#dcdde1';


ctx.font = '50px sans-serif';
ctx.fillText("Votre code:", canvas.width / 3.3, canvas.height / 3.5);
ctx.font = '100px sans-serif';
ctx.fillText(key, canvas.width / 5, canvas.height / 1.5);



const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png');

channelverif.send(`Bienvenue, <@${member.id}>!`, attachment).then(msg => {


  channelog.send(`<@${member.id}> nous a rejoints`).then(message => { message.react('🚪') + message.react('🚫')

      client.on('messageReactionAdd', (reaction, user) => {
          if (reaction.emoji.name === '🚪' && user.id !== client.user.id) {
            msg.delete()
              member.kick().then(() => channelog.send(`<@${member.id}> a été kick`) )
          } else if (reaction.emoji.name === '🚫' && user.id !== client.user.id) {
            msg.delete()
            member.ban().then(() => channelog.send(`<@${member.id}> a été ban`) )
          }
      })
}).catch(() => channelog.send(`impossible de kick ${member.user.tag}, permission insuffisante (rôle au-dessus de moi ?)`));












      client.on('message', async message => {

        if(message.author.id === client.user.id) return;



        if (message.channel === channelverif) {
          if (message.content === key) { // si le code est bon, on effectuer la suite

            if (message.deletable) message.delete();
            msg.delete()

            let serverID = client.guilds.get(serveurID); // ID DU SERVEUR
            let memberRole = serverID.roles.find("name", roleName) // Nom Du Role
            member.addRole(memberRole) // ajout du role au membre




            channelog.send(`✅ <@${member.id}> **a passé la vérification !**\n`) // log message + envoie des informations du membre


          } else {
            if (message.deletable) message.delete();
          }
        } else {
          return;
        }
      })
})



})








client.login('NjUzMzY5MDcwMzM0NTA5MDc2.Xe1_hQ.aQ3f2KH77_HnsPj9TCMC5md9Y9I')
