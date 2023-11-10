var b;
var f;
function vai() {
    b = new Gioco();
    document.getElementById("txt").style.display = "inline";
    document.getElementById("html").style.display = "inline";
    document.getElementById("stampa").style.display = "inline";
}
function onStart(){
    f = new Font();
    f.generaListaFonts();
}
function txt() {
    b.scaricaInTXT();
}
function html() {
    b.scaricaInHTML();
}
function stampa() {
    b.stampante();
}
function stampaSoluzione() {
    b.stampaSoluzione();
}
