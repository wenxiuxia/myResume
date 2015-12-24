var main = document.querySelector('#main');
var oLis = document.querySelectorAll(".slide>li");
var winW = window.innerWidth;//设备的宽度
var winH = window.innerHeight;//设备的高度
var desW = 640;
var desH = 1080;


if (winW / winH < desW / desH) {
    main.style.webkitTransform = "scale(" + winH / desH + ")";
} else {
    main.style.webkitTransform = "scale(" + winW / desW + ")";
}

[].forEach.call(oLis, function () {
    arguments[0].index = arguments[1];//当前项的索引
    arguments[0].addEventListener('touchstart', start, false);
    arguments[0].addEventListener('touchmove', move, false);
    arguments[0].addEventListener('touchend', end, false);
});

function start(e) {
    this.startY = e.changedTouches[0].pageY;
}

function move(e) {
    e.preventDefault();
    var touchMove= e.changedTouches[0].pageY;
    var changePos=touchMove-this.startY;//手势移动的距离
    var cur=this.index;
    var step=1/2;
    var scalePos=Math.abs(changePos)/winH*step;
    [].forEach.call(oLis,function(){
        if(arguments[1]!=cur){
            arguments[0].style.display="none";
        }
        arguments[0].className="";
        arguments[0].firstElementChild.id="";
    });
    //console.log(changePos);
    if(changePos>0){//向下移动
        var pos=-winH+changePos;
        this.preSIndex=cur==0?oLis.length-1:cur-1;
    }else if(changePos<0){//向上移动
        var pos=winH+changePos;
        this.preSIndex=cur==oLis.length-1?0:cur+1;
    }
    oLis[this.preSIndex].style.webkitTransform="translate(0,"+pos+"px)";
    oLis[this.preSIndex].className="zIndex";
    oLis[this.preSIndex].style.display="block";
    oLis[cur].style.webkitTransform="scale("+(1-scalePos)+") translate(0,"+changePos+"px)";
}

function end(e) {
    oLis[this.preSIndex].style.webkitTransform ="translate(0,0)";
    oLis[this.preSIndex].style.webkitTransition="0.5s";
    oLis[this.preSIndex].addEventListener('webkitTransitionEnd',function(){
        this.style.webkitTransition="";
        this.firstElementChild.id = "a"+(this.index+1);
    })
}

document.addEventListener('touchstart',function(){
},false);
