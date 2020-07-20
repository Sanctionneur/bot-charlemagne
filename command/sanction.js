const Command = require('./command')

module.exports = class Sanction extends Command{
    start(){
        this.name = 'sanction';
        this.power = 2;
    }
    action(){
        this.resp('Qui voulez-vous sanctionner ?');
        this.msg.channel.awaitMessages(m => m.author.id == this.msg.author.id,{max: 1, time : 10000}).then(collected => this.action2(collected))
    }
    action2(collected){
        if(collected.first()) this.msg.channel.send('Voulez-vous vraiment sanctionner **'+collected.first().content+'** ?').then(msg => this.action3(msg));
        else {
            this.resp("Vous n'avez proposé aucun sanctionné, mais la sanction doit avoir lieu, c'est donc vous, **"+this.msg.member.displayName+"**, qui serez sanctionné !");
            this.flush();
        }
    }
    action3(msg){
        msg.react('✅');
        msg.react('❌');
        msg.awaitReactions((reaction, user) =>
            (reaction.emoji.name == "✅" || reaction.emoji.name == "❌") && user.id == this.msg.author.id, {max: 1,time: 10000}).then(collected => this.action4(collected));
    }
    action4(collected){
        if(collected.first().emoji.name=='✅') this.resp("La sanction a commencé");
        else if(collected.first().emoji.name=='❌') this.resp("On ne peut annuler une sanction, c'est donc vous, **"+this.msg.member.displayName+"**, qui serez sanctionné !");
        else this.resp("Vous n'avez pas répondu assez vite, c'est donc vous, **"+this.msg.member.displayName+"**, qui serez sanctionné !");
        this.flush();
    }
}