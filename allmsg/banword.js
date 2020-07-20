const Discord = require('discord.js');
const Grosmots = require('./liste.json')
const Data = require('./../data.json');
module.exports = class Banword {

    constructor(msg) {
        this.msg = msg;
        this.verif = 1;
        this.logchan = msg.guild.channels.cache.find(ch => ch.name == "bot-log");
        msg.content.split(" ").forEach(mot => this.funverif(mot.toLowerCase()));
    }
    funverif(mot) {
        if(Grosmots.grosmots.indexOf(mot)>=0) {
            this.action();
        }
    }
    action(){
        console.log("censure")
        this.verif = 0;
        this.msg.delete()
        this.warnalert(this.msg.author, "utilisation d'un banword")
        /*
        const embed = new Discord.MessageEmbed()
            .setTitle('Warn')
            .setDescription(`<@${message.author.id}> a utilisé un banword`);
        message.channel.send(embed)
        */
    }
    warnalert(user, motif){
        const embed = new Discord.MessageEmbed()
            .setTitle('Avertissement')
            .setColor('#ff9900')
            .setDescription("L'utilisateur <@"+user.id+"> a été averti pour le motif suivant : "+motif);
        this.msg.channel.send(embed);

        const logembed = new Discord.MessageEmbed()
            .setAuthor('[WARN] ' + user.username, user.displayAvatarURL())
            .setColor('#ff9900')
            .setThumbnail(user.displayAvatarURL())
            .addField('Utilisateur', "<@"+user.id+">", true)
            .addField('Modérateur', "<@"+Data['botid']+">", true)
            .addField('Reason', 'Banword', true)
            .setTimestamp()
            .setFooter('ID del\'Utilisateur : ' + user.id);
        this.log(logembed);
    }
    log(content){
        console.log(content);
        /*
        const embed = new Discord.MessageEmbed()
            .setDescription(content);
        this.logchan.send(embed);
        */
        this.logchan.send(content);
    }
}