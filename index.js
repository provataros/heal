var players = function(){
    var arr = [];
    arr.players = {};
    for (var i=0;i<10;i++){
        arr.players["frame"+i] = {
            id : "frame"+i,
            HP : {
                total : 100,
                current : Math.floor(Math.random()*100)
            }
        }
        arr.push(arr.players["frame"+i]);
    }
    return arr;
}()

var selected;
var target;

function select(element){
    $(".raid-frame").removeClass("selected");
    selected = $(element).addClass("selected").attr("id");
}


var raidframes;

function render(){
    var frames = $(".raid-frames");
    $(".raid-frames").empty().append(raidframes(players));
    if (selected)$("#"+selected).addClass("selected");
}

$(document).ready(function(){
    
    Handlebars.registerPartial("frame",$("#frame-partial").html())
    raidframes = Handlebars.compile($("#raid-frames-template").html(),{preventIndent : true});

    
    Handlebars.registerHelper("spellIcon",function(val){
        //console.log(_spellbar[val]);
        return _spellbar[val]?_spellbar[val].function.icon:null;
    })
    spellbar = Handlebars.compile($("#spell-bar-template").html(),{preventIndent : true});
    $("#spellbar").html(spellbar());
    $("#spell").css({visibility : "hidden"});
    $("#gcd").css({visibility : "hidden"});
    configureInput();


    render();
    //createCastbar($("#gcd"),1500,function(){
      //  console.log("gcd");
    //})
    setInterval(function(){
        aoeDamage(10);
        render();
    },2000)
    $(".raid-frames").on("mousedown",".raid-frame",function(e){
        e.preventDefault();
        e.stopPropagation();
        select($(e.target).closest(".raid-frame"));
    })
    $(".raid-frames").on("mousedown",function(e){
        select("");
    })
});

var _spellbar = {
    "0" : {
        key : "4",
        function : spells.tranquility
    },
    "1" : {
        key : "5",
        function : spells.flash_heal
    },
    "2" : {
        key : "3",
        function : spells.instant_heal
    },
}


function configureInput(){
    var bindings = {
        "4" : 0,
        "5" : 1,
        "3" : 2,
    }
    $(document).on("keypress",function(e){
        e.preventDefault();
        e.stopPropagation();
        if (bindings[e.key]!=undefined)cast(_spellbar[bindings[e.key]].function);
    })
}


var fps = 60;
var isRunning = {
    channel : false,
    cast : false,
}

