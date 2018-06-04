
var config = require("config");
cc.Class({
    extends: cc.Component,

    properties: {
        timeTxt : {
            default : null,
            type : cc.Label
        },
        btnNode1 : {
            default : null,
            type : cc.Node
        },
        btnNode2 : {
            default : null,
            type : cc.Node
        },
        btnSp1 : {
            default : null,
            type : cc.Sprite
        },
        btnSp2 : {
            default : null,
            type : cc.Sprite
        },
        clock : {
            default : null,
            type : cc.Node,
        },
        timeCount:30,
    },

    start () {
        this.clockX = this.clock.getPositionX();
        this.clockY = this.clock.getPositionY();

        this.schedule(function() {
            if(this.timeCount > 0){
                this.timeCount -= 1;
                if(this.timeCount <= 5){
                    // cc.vv.audioMgr.playSFX("timeup_alarm.mp3");
                    this.shakeClock();
                }
                var pre = "";
                if(this.timeCount <= 0){
                    this.timeCount = 0;
                    this.node.destroy();
                }
                var t = Math.ceil(this.timeCount);
                if(t < 10){
                    pre = "";
                }
                this.timeTxt.string = pre + t; 
            }   
        }, 1);

        //xx_test
        this.show(10,null,null,2);
    },
    show(time,btn1Func,btn2Func,type){
        this.timeCount = time;
        this.btn1Func = btn1Func;
        this.btn2Func = btn2Func;

        var self = this;

        var pre = "";
        if(time < 10){
            pre = "0";
        }
        this.timeTxt.string = pre + time;

        // this.btnSp1
        if(type == config.opratType.callLoad){
            // this.btnTxt1.string = "叫地主";
            // this.btnTxt2.string = "不叫";
        }else if(type == config.opratType.grabLoad){
            // this.btnTxt1.string = "抢地主";
            // this.btnTxt2.string = "不抢";
            cc.loader.loadRes("operation_btn/p_qiangyes",cc.SpriteFrame,function(err,spriteFrame){
                self.btnSp1.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
            cc.loader.loadRes("operation_btn/p_qiangno",cc.SpriteFrame,function(err,spriteFrame){
                self.btnSp2.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
        }else if(type == config.opratType.mustOutCard){
            this.btnNode1.x = 0;
            this.btnNode1.active = false;
            // this.btnTxt2.string = "出牌";
            cc.loader.loadRes("operation_btn/p_cardout",cc.SpriteFrame,function(err,spriteFrame){
                self.btnSp2.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
        }
    },
    btn1Click() {
        console.log("btn1Click");
        if(this.btn1Func){
            this.btn1Func();
        }
        this.node.destroy();
    },
    btn2Click() {
        console.log("btn2Click");
        if(this.btn2Func){
            this.btn2Func();
        }
        this.node.destroy();
    },
    shakeClock(){
        var mt1 = cc.moveTo(0.05,this.clockX,this.clockY-2);
        var mt2 = cc.moveTo(0.05,this.clockX,this.clockY+2);
        var mt3 = cc.moveTo(0.05,this.clockX,this.clockY-2);
        var mt4 = cc.moveTo(0.05,this.clockX,this.clockY+2);
        var mt5 = cc.moveTo(0.05,this.clockX,this.clockY-2);
        var mt6 = cc.moveTo(0.05,this.clockX,this.clockY+2);
        var mt7 = cc.moveTo(0.05,this.clockX,this.clockY);
        this.clock.runAction(cc.sequence(mt1,mt2,mt3,mt4,mt5,mt6,mt7));
    }
});
