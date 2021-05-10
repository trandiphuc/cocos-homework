const Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        eb_username: cc.EditBox,
        eb_password: cc.EditBox,
        tooltip_username: cc.Label,
        tooltip_password: cc.Label,
        invalidText: cc.Label,
        welcomeText: cc.RichText,
        _isPasswordValid: false,
        _isUsernameValid: false,
    },
    
    get isUsernameValid() {
        return this._isUsernameValid;
    },

    set isUsernameValid(value) {
        this._isUsernameValid = value;
    },

    get isPasswordValid() {
        return this._isPasswordValid;
    },

    set isPasswordValid(value) {
        this._isPasswordValid = value;
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Emitter.instance = new Emitter();  
    },
    startEditUserName() {
        this.invalidText.node.active = false;
        this.tooltip_username.node.active = true;
        this.tooltip_username.string = "Enter username only use A-Z, a-z, 0-9";
    },

    startEditPW() {
        this.invalidText.node.active = false;
        this.tooltip_password.node.active = true;
        this.tooltip_password.string = "Enter password. 6 - 12 characters with at least 1 Upper Case, 1 lower case, and 1 numeric character";
    },

    endEditUserName() {
        this.tooltip_username.node.active = false;
        var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if(format.test(this.eb_username.string)) {
            this.isUsernameValid = false;
            this.invalidText.node.active = true;
            this.invalidText.string = "Vui lòng nhập đúng Username";
        } else {
            this.isUsernameValid = true;
        }
    },

    endEditPW() {
        this.tooltip_password.node.active = false;
        const FORMAT_NO_SPECIAL_SYMBOL = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        const FORMAT_AZ_az_09 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if(FORMAT_NO_SPECIAL_SYMBOL.test(this.eb_password.string) || !FORMAT_AZ_az_09.test(this.eb_password.string) || this.eb_password.string.length < 6) {
            this.isPasswordValid = false;
            this.invalidText.node.active = true;
            this.invalidText.string = "Vui lòng nhập đúng Password";
        } else {
            this.isPasswordValid = true;
        }
    },
    getNowTime() {
        var date = new Date();
        var hours = ("0" + date.getHours()).slice(-2);
        var mins = ("0" + date.getMinutes()).slice(-2);
        var secs = ("0" + date.getSeconds()).slice(-2);
        return `${hours}:${mins}:${secs}`;
    },
    pressRegisterBtn() {
        if(this.eb_username.string == "" || !this.isUsernameValid) {
            this.invalidText.string = "Vui lòng nhập đúng Username";
        } else if(this.eb_password.string == "" || !this.isPasswordValid) {
            this.invalidText.string = "Vui lòng nhập đúng Password";
        } else {
            this.isUsernameValid = false;
            this.isPasswordValid = false;
            let username = this.eb_username.string;
            let timeSignUp = this.getNowTime();
            Emitter.instance.emit('signup', username, timeSignUp);
            this.welcomeText.node.active = true;
            this.welcomeText.string = `Chào mừng <color=red><u>${username}</u></c> đã gia nhập <color=yellow><i>${timeSignUp}</i></c>`;
        }
    },
});
