var spells  = {
    tranquility : {
        name : "Tranquility",
        interval : 60,
        duration : 4000,
        cost : 150,
        cooldown : 60000,
        type : "channel",
        tick : {
            heal : {
                all : function(stats){
                    return 15;// + stats.spell;
                }
            }
        },
        icon : "iconTranquility"
    },
    flash_heal : {
        name : "Flash Heal",
        duration : 1500,
        cost : 25,
        cooldown : 0,
        type : "cast",
        target : true,
        cast : {
            heal : {
                target : function(stats){
                    return 40;// + stats.spell;
                }
            }
        },
        icon : "iconFlashHeal"
    },
    instant_heal : {
        name : "Instant Heal",
        duration : 0,
        cost : 25,
        cooldown : 0,
        type : "cast",
        target : true,
        cast : {
            heal : {
                target : function(stats){
                    return 40;// + stats.spell;
                }
            }
        },
        icon : "iconFlashHeal"
    }
}

var effects = {
    heal : heal,
}

function execute(e){
    _.each(e,function(value,key){
        effects[key](value);
    })
}


var healtargets = { 
    all : function(){
        return players;
    },
    target : function(){
        return [players.players[target]];
    },
    lowest : function(){
        //todo
    },
    random : function(){
        //todo
    }
}
function heal(e){
    _.each(e,function(value,key){
        _.each(healtargets[key](),function(value2,key2){
            var tar = value2;
            var val = value();
            tar.HP.current = (tar.HP.current + val <= tar.HP.total)?tar.HP.current + val:tar.HP.total;
        })
    })
}