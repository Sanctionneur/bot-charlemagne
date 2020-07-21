const Command = require('./command')

module.exports = class Latex extends Command {
    start(){
        this.name = "latex"
        this.power = 1
    }
    async action(){
        this.parse();
        const res = await this.msg.channel.send("**"+this.msg.member.displayName + ": **",{files: [{ attachment : 'https://latex.codecogs.com/png.latex? \\huge\{\\color\{White\}'+this.mainparam+'\}',
            name: 'latex.png'}]});
        res.react('🗑️');
        res.awaitReactions((reaction, user) =>(reaction.emoji.name == "🗑️") && user.id == this.msg.author.id, {max: 1,time: 120000})
            .then(collection => res.delete())
            .catch(e => console.log(e));

        this.flush();
    }
}