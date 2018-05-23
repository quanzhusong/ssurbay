function movepage(path) {
    location.href = path;
}

function refresh_timer() {
    setTimeout(function () {
        location.reload();
    }, 2 * 1000);
}

function printTime(){
    var clock = document.getElementById("clock");
    var now = new Date();
    
    clock.innerHTML =
    now.getDate()+"일 "+
    now.getHours()+"시 "+
    now.getMinutes()+"분";

    setTimeout("printTime()",5000);
}

window.onload = function(){
    printTime();
}

function newtopic_registered(){
    alert("게시글이 등록되었습니다.");
}

function test(a){
    alert(a);
}