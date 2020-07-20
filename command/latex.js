const Command = require('./command')

module.exports = class Latex extends Command {
    start(){
        this.name = "latex"
        this.power = 1
    }
    action(){
        this.parse();
        this.resp({files: [{ attachment : 'https://latex.codecogs.com/png.latex? \\huge\{\\color\{White\}'+this.mainparam+'\}',
            name: 'latex.png'}]},'code latex affiché -> '+this.mainparam);
        this.flush();
    }
}