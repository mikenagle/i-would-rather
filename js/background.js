function changeImage() {
    var bgImage = ((Math.floor(Math.random() * 3))+1)+ ".jpg";
    var yourBackground = document.getElementById('hero');
    yourBackground.style.backgroundImage = 'url(../img/backgrounds/' + bgImage + ')' ;
}