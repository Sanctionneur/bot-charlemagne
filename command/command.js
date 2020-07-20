const Discord = require('discord.js');
module.exports = class command{
    constructor(msg,data){
        let userpower = 4;
        /*
        userpower = 0 // sans rôle
        if(msg.member.roles.cache.find(rl => rl.id == data.carolid)) userpower = 1; // Carolingien
        if(msg.member.roles.cache.find(rl => rl.id == data.sanctionid)) userpower = 2; // Sanctionneur
        if(msg.member.roles.cache.find(rl => rl.id == data.staffid)) userpower = 3;// Staff
        if(msg.member.roles.cache.find(rl => rl.id == data.adminid)) userpower = 4; // Administrateur
        */
        this.start();
        this.msg = msg;
        this.data = data;
        this.logchan = this.msg.guild.channels.cache.find(ch => ch.name == "bot-log");
        this.logarray = new Array();
        if (this.power <= userpower) {
            this.log('Execution commande ' + this.name);
            this.action();
        } else this.resp('Commande non autorisée, vous n\'êtes pas un '+data.rolesh[this.power],'refus pour rang trop faible');

    }
    resp(content,logtext = content){
        this.msg.channel.send(content).then(this.log('Reponse du bot sur le salon #'+this.msg.channel.name+' -> '+logtext));
    }
    log(text){
        this.logarray.push(text);
        console.log(text);
    }
    flush(content){
        let logembed = new Discord.MessageEmbed()
            .setAuthor('['+this.data.rolesh[this.power]+'] ' + (this.msg.author.username))
            .setColor('#3cbe30')
            .setThumbnail(this.msg.author.displayAvatarURL())
            .addField('Auteur de la commande', "<@"+this.msg.author.id+">", true)
            .setTimestamp()
            .setDescription(this.logarray.join('\n'))
            .setFooter('ID del\'Utilisateur : ' + this.msg.author.id);
        this.logchan.send(logembed);
    }
    parse(){
        this.mainparam = this.msg.content.split(' ').slice(1).join(' ');
        this.param2 = this.mainparam.split(' ').slice(1).join(' ');
    }
    warnalert(user,motif){
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
            .addField('Modérateur', "<@"+this.msg.author.id+">", true)
            .addField('Reason', motif, true)
            .setTimestamp()
            .setFooter('ID de l\'averti : ' + user.id);
        this.logchan.send(logembed)
    }
};