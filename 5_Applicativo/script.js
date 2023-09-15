class Modalita {
    constructor() {
        this.modalita = "bambini";
    }
}
class Difficolta{
    constructor(){
        this.modalita = new Modalita();
        this.difficolta = "facile";
        this.paroleDaTrovare = 10;
        this.grandezzaMatriceX = 10;
        this.grandezzaMatriceY = 10;
        this.parolaFinaleEsiste = false;
    }
}
class Parole {
    constructor() {
        this.filePath = "/280000_parole_italiane.txt"
        this.difficolta = new Difficolta();
        this.arrayParole = new Array();
    }
    
    setFile(){
        try{
            var x = document.getElementById("files").files[0].name;
            console.log(x);
            this.filePath = x;
        }catch{
            this.filePath = "/280000_parole_italiane.txt";
        }
        
    }

    readFile() {
        var arrayNumeri = new Array();
        var nParole = this.difficolta.paroleDaTrovare;
        var arrayss = new Array();
        console.log(nParole); 
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function () {
            var testo= this.responseText.split("\n");
            var i = 0;
            while(i<nParole){
                console.log(arrayss);
                var num = Math.round(Math.random() * 280000);
                if(!arrayNumeri.includes(num) && testo[num].length < 10){
                    arrayss.push(testo[num]);
                    i++;
                    arrayNumeri.push(num);
                }
            }
            this.arrayParole = arrayss;
            console.log(this.arrayParole.length);
            document.getElementById("result").innerHTML = "";
            this.arrayParole = this.arrayParole.sort();
            for(var i = 0;i<this.arrayParole.length;i++){
                document.getElementById("result").innerHTML += this.arrayParole[i] + "<br>";
            }
        }
        
        xhttp.open("GET", a.filePath);
        xhttp.send();
    }

    scriviParole() {
        this.readFile();
    }
}
class Font{
    constructor(){
        this.font = "italic bold 20px arial,serif";
    }
}
class Gioco{
    constructor(){
        this.difficolta = new Difficolta();
        this.arrayPosizioni = new Array(this.difficolta.grandezzaMatriceX);
        this.arrayGioco = new Array(this.difficolta.grandezzaMatriceX);
        this.parole = new Parole();
        this.Font = new Font();
    }

    creaArray(){
        for(var i = 0;i<this.arrayPosizioni.length;i++){
            this.arrayPosizioni[i] = new Array(this.difficolta.grandezzaMatriceY);
            this.arrayGioco[i] = new Array(this.difficolta.grandezzaMatriceY);
        }
        var ngi = this.arrayGioco.length;
        console.log(ngi);
        for(var i = 0;i<ngi;i++){
            for(var k = 0;k<ngi;k++){
                this.arrayGioco[i][k] = "-";
                this.arrayPosizioni[i][k] = "-";
            }
        }
    }
    
    stampaTabella(){
        this.creaArray();
        document.getElementById("result").innerHTML = "";
        var tabelle = "<table>"
        for(var i = 0;i<this.arrayGioco.length;i++){
            tabelle += "<tr>"
            for(var k = 0;k<this.arrayGioco[i].length;k++){
                tabelle += "<td>"+this.arrayGioco[i][k]+"</td>"
            }
            tabelle += "</tr>"
        }
        tabelle += "</table>"
        console.log(tabelle);
        document.getElementById("result").innerHTML += tabelle;
    }

}
var a;
var b;
function vai(){
    a = new Parole();
    b = new Gioco();
    a.setFile();
    a.scriviParole();
}
