const Command = require('./command');

module.exports = class Hsay extends Command {
    start(){
        this.name = "hsay";
        this.power = 3
    }
    action(){
        this.parse();
        this.msg.delete();
        this.resp(this.mainparam);
        this.flush();
    }
};