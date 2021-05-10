const Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        list: cc.ScrollView,
        itemPrefab: cc.Prefab,
    },

    onLoad() {
        Emitter.instance = new Emitter();
        Emitter.instance.registerEvent('signup', this.addItemToList.bind(this));
    },
    addItemToList(name, time) {
        let numOfChild = this.list.content.children.length;
        if (numOfChild < 8) {
            let item = new cc.instantiate(this.itemPrefab);
            item.children[0].getComponent('cc.Label').string = name;
            item.children[1].getComponent('cc.Label').string = time;
            this.list.content.addChild(item);
            Emitter.instance.emit('updateProgressBar', numOfChild + 1);
        } else {
            Emitter.instance.destroy();
        }
    },
    start() {

    },
});