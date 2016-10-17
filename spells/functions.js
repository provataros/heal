var castTypes = {
    "channel" : createChannelbar,
    "cast" : createCastbar,
    "instant" : null,
}

function cast(spell){
    if (isRunning.cast)return;
    if (isRunning.gcd)return;
    target = selected;
    if (spell.target && !target)return;
    var func = castTypes[spell.type];
    func(spell);
}


function aoeDamage(amount){
    players.forEach(function(e,i,a){
        e.HP.current = (e.HP.current -amount >=0 )?e.HP.current -amount:0;
        
    })
}




function createGcd(amount){
    if (isRunning.gcd)return;
    var freq = 1000/fps;
    var steps = fps*(amount/1000);
    var curr = 0;
    $("#gcd").css({visibility : "visible"})
    $("#gcd").attr("max",steps);
    isRunning.gcd = true;
    var interval = setInterval(function(){
        curr++;
        $("#gcd").val(curr);
        if (curr>=steps){
            $("#gcd").css({visibility : "hidden"})
            isRunning.gcd = false;
            clearInterval(interval);
        }
    },freq)
}

function createCastbar(opt){
    var freq = 1000/fps;
    var steps = fps*(opt.duration/1000);
    var curr = 0;
    var element = opt.element || $("#spell.cast-bar");
    if (opt.duration!=0)element.css({visibility : "visible"})
    element.attr("max",steps);
    isRunning.cast = true;
    createGcd(500);
    var interval = setInterval(function(){
        curr++;
        element.val(curr);
        if (curr>=steps){
            element.css({visibility : "hidden"})
            if (opt.cast)execute(opt.cast);
            isRunning.cast = false;
            render();
            clearInterval(interval);
        }
    },freq)
}



function createChannelbar(opt){
    var freq = 1000/fps;
    var steps = fps*(opt.duration/1000);
    var curr = steps;
    var element = opt.element || $("#spell.cast-bar");
    element.css({visibility : "visible"})
    element.attr("max",steps);
    isRunning.cast = true;
    
    createGcd(500);
    var interval = setInterval(function(){
        curr--;
        element.val(curr);
        if (curr<=0){
            element.css({visibility : "hidden"})
            if (opt.cast)execute(opt.cast);         
            isRunning.cast = false;
            clearInterval(interval);
        }
        if (opt.tick && curr%opt.interval==0){
            execute(opt.tick);
            render();
        }
    },freq)
}
