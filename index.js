const Discord = require('discord.js');
const bot = new Discord.Client();

//on import toutes les fonctions
const Data = require('./data.json');
const Coucou = require('./command/coucou');
const Say = require('./command/say');
const Hsay = require('./command/hsay');
const Latex = require('./command/latex');
const Banword = require('./allmsg/banword');
const Sanction = require('./command/sanction');
const Warn = require('./command/warn');
const Clean = require('./command/clean');
const Annonce = require('./command/annonce');
const Bienvenue = require('./command/bienvenue')

bot.on('ready', function(){
    console.log('ready')
    //bot.user.setActivity("sanctionner l'X")

});

bot.on('message', function (msg) {
    if(Data.debug){
        console.log(msg)
    }
    if (msg.author.id != Data['botid']){
        bw = new Banword(msg);
        if(bw.verif == 1) {
            if(msg.content.startsWith('!')){
                if (msg.content.startsWith('!annonce')) new Annonce(msg, Data);
                if (msg.content.startsWith('!warn')) new Warn(msg, Data);
                if (msg.content.startsWith('!sanction')) new Sanction(msg, Data);
                if (msg.content.startsWith('!coucou')) new Coucou(msg, Data);
                if (msg.content.startsWith('!say')) new Say(msg, Data);
                if (msg.content.startsWith('!hsay')) new Hsay(msg, Data);
                if (msg.content.startsWith('!latex')) new Latex(msg, Data);
                if (msg.content.startsWith('!clean')) new Clean(msg, Data);
                if (msg.content.startsWith('!bienvenue')) new Bienvenue(msg, Data);
            }
        }
    }
})

bot.on('guildMemberAdd', async function (user) {
    const serv = user.guild;
    //console.log(serv.id);
    const staff = await serv.roles.fetch(Data.staffid);
    if (serv.id === Data.servid){
        //on creer le salon
        const salon = await serv.channels.create('bienvenue ' + user.displayName, {
            parent : Data.welcomeid,
            permissionOverwrites : [{id : user, allow : ['SEND_MESSAGES', 'VIEW_CHANNEL']},
                {id : serv.roles.everyone, deny : ['VIEW_CHANNEL']}, {id : staff, allow : ['SEND_MESSAGES', 'VIEW_CHANNEL']} ]
        })
            .catch(console.error);
        //on envoie le message de bienvenue
        //salon.send(Data.bienvenue)
        this.defembed = new Discord.MessageEmbed()
            .setDescription(Data.bienvenue.replace('userid',user.id))
            .setColor('#0099ff')
            .setTitle("Bienvenue sur CPGE Charlemagne !")
            .setThumbnail(bot.user.displayAvatarURL())
            .setTimestamp()
            .setFooter('Message officiel du Staff',bot.user.displayAvatarURL());
        //.setAuthor(this.mainparam, this.bot.displayAvatarURL());
        salon.send(this.defembed);

    }
})
bot.on('channelCreate', function(chan) {
    const serv = chan.guild
    const logchan = serv.channels.cache.find(ch => ch.name == "bot-log")
    const embed = new Discord.MessageEmbed()
        .setTitle('Création Channel')
        .setColor('#ee2de7')
        .setDescription("Le channel <#"+chan.id+"> a été créé");
    logchan.send(embed);
})


bot.on('channelDelete', function(chan) {
    const serv = chan.guild
    const logchan = serv.channels.cache.find(ch => ch.name == "bot-log")
    const embed = new Discord.MessageEmbed()
        .setTitle('Suppression Channel')
        .setColor('#ee2de7')
        .setDescription("Le channel #"+chan.name+" a été supprimé");
    logchan.send(embed);
})
bot.login(Data.token)