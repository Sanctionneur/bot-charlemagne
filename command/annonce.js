const Command = require('./command');
const Discord = require('discord.js');

module.exports = class Sanction extends Command{
    start(){
        this.name = 'annonce';
        this.power = 3;
    }
    action(){
        this.parse();
        this.resp('Une nouvelle annonce nommée **'+this.mainparam+'** est en cours de publication, quel est son contenu ?');
        this.msg.channel.awaitMessages(m => m.author.id == this.msg.author.id,{max: 1, time : 20000}).then(collected => this.action1bis(collected))
    }
    action1bis(collected){
        if(collected.first()) {
            this.annoncecontent = collected.first().content;
            this.resp('Contenu enregistré, dans quel salon voulez-vous publier cette annonce ?');
            this.msg.guild.members.fetch(this.data.botid).then(usr => this.bot = usr.user);
            this.msg.channel.awaitMessages(m => m.author.id == this.msg.author.id,{max: 1, time : 20000}).then(collected => this.action2(collected))
        } else this.resp("aucun contenu proposé pour le message, procédure annulée")
    }
    action2(collected){
        if(collected.first()) {
            if (collected.first().mentions.channels.first()){
                this.salon = collected.first().mentions.channels.first();
                this.msg.channel.send('Voici un aperçu du message qui sera publié dans '+this.salon.name+' : ')
                this.defembed = new Discord.MessageEmbed()
                    .setDescription(this.annoncecontent)
                    .setColor('#0099ff')
                    .setTitle(this.mainparam)
                    .setThumbnail(this.bot.displayAvatarURL())
                    .setTimestamp()
                    .setFooter('Annonce officielle du Staff',this.bot.displayAvatarURL());
                    //.setAuthor(this.mainparam, this.bot.displayAvatarURL());
                this.msg.channel.send(this.defembed);
                this.msg.channel.send('Validation par le staff de la publication de l\'annonce dans '+this.salon.name).then(msg => this.action3(msg));
            }
            else {
                this.resp("Aucun salon valide dans la réponse, procédure annulée");
                this.flush();
            }
        }
        else {
            this.resp("Aucune réponse, procédure annulée");
            this.flush();
        }
    }
    action3(msg){
        msg.react('✅');
        msg.react('❌');
        msg.awaitReactions((reaction, user) =>
            (reaction.emoji.name == "✅" || reaction.emoji.name == "❌"), {time: this.data.timeannonce}).then(collected => this.action4(collected));
    }
    action4(collected){
        console.log('fini !');
        let pour = 0
        let contre = 0
        collected.each(function(reaction){
            if(reaction.emoji.name=='✅') {
                pour = reaction.count - 1;
            }
            if(reaction.emoji.name=='❌'){
                contre = reaction.count - 1;
            }
        });
        this.resp('Vote terminé ! vote pour : '+pour+'; vote contre : '+contre);
        if(pour>=this.data.minouiannonce && contre<=this.data.maxnonannonce){
            this.resp('Le message est donc publié');
            this.salon.send(this.defembed);
        } else {
            this.resp("Publication de l'annonce impopulaire, procédure annulée");
        }
        this.flush();
    }
}