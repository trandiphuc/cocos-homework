const Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        progressBar: cc.ProgressBar,
        progressText: cc.Label,
        notifyLabel: cc.RichText,
    },

    onLoad() {
        Emitter.instance.registerEvent('updateProgressBar', this.showProgressBar.bind(this));
    },

    showProgressBar(itemNums) {
        if(itemNums <= 8)
        {
            this.progressBar.progress = itemNums/8;
            this.progressText.string = `${itemNums}/8`;
            if(itemNums == 8) {
                this.notifyLabel.node.active = true;
                this.notifyLabel.string = "<color=#ff000>ĐỦ CHỈ TIÊU</c>"
            }
        } else return;
    },
});
