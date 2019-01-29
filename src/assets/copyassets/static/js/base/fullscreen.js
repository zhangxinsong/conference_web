
function fullscreen() {
    console.log('fullscreen')
    var docElm = document.documentElement;
    var requestFullscreen = docElm.requestFullScreen 
                            || docElm.webkitRequestFullScreen 
                            || docElm.mozRequestFullScreen 
                            || docElm.msRequestFullScreen
    requestFullscreen.call(docElm)
    isFullScreen = true
}

function exitFullscreen() {
    var docElm = document;
    var exitFullscreen = docElm.exitFullscreen ||
        docElm.webkitExitFullscreen ||
        docElm.mozCancelFullScreen

    exitFullscreen.call(docElm)
    isFullScreen = false
}

var isFullScreen = false
window.addEventListener('keydown', function(e) {
    if(e.shiftKey == true && e.keyCode == 70) {
        !isFullScreen ? fullscreen() : exitFullscreen()
    }
})
