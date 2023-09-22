

class Modalita {
    constructor() {
        this.modalita = "bambini";
    }
}
class Difficolta {
    constructor() {
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
        this.filePath = "280000_parole_italiane.txt"
        this.difficolta = new Difficolta();
        this.arrayParole = new Array();
        this.continua = false;
    }


    setFile() {
        try {
            var x = document.getElementById("files").files[0].name;
            console.log(x);
            this.filePath = x;
        } catch {
            this.filePath = "280000_parole_italiane.txt";
        }

    }


    getArray() {
        var x = document.getElementById("invisible").innerHTML;
        this.arrayParole = x.split(",");
        this.arrayParole.pop();
        return this.arrayParole;
    }

    readFile() {
        var nParole = this.difficolta.paroleDaTrovare;
        console.log(nParole);
        return new Promise((resolve, reject) => {
            const xhttp = new XMLHttpRequest();
            xhttp.onload = function () {
                var testo = this.responseText.split("\n");
                
                document.getElementById("invisible").innerHTML = testo;
                
                resolve();
            }
            xhttp.open("GET", this.filePath);
            xhttp.send();
        });
        

    }

}
class Font {
    constructor() {
        this.font = "italic bold 20px arial,serif";
    }
}
class Gioco {
    constructor() {
        this.difficolta = new Difficolta();
        this.arrayPosizioni = new Array(this.difficolta.grandezzaMatriceX);
        this.arrayGioco = new Array(this.difficolta.grandezzaMatriceX);
        this.parole = new Parole();
        this.Font = new Font();
        this.InData();
        this.creaArray();
    }

    creaArray() {
        for (var i = 0; i < this.arrayPosizioni.length; i++) {
            this.arrayPosizioni[i] = new Array(this.difficolta.grandezzaMatriceY);
            this.arrayGioco[i] = new Array(this.difficolta.grandezzaMatriceY);
        }
        var ngi = this.arrayGioco.length;
        console.log(ngi);
        for (var i = 0; i < ngi; i++) {
            for (var k = 0; k < ngi; k++) {
                this.arrayGioco[i][k] = "-";
                this.arrayPosizioni[i][k] = "-";
            }
        }
    }

    async InData() {
        await this.parole.readFile();
        this.parole.arrayParole = this.parole.getArray();
        console.log("Dammi x "+this.difficolta.grandezzaMatriceX);
        console.log("Dammi y "+this.difficolta.grandezzaMatriceY);
        var i = 0;
        while(i<this.difficolta.paroleDaTrovare){
            var dir = Math.floor(Math.random() * this.parole.arrayParole.length);
            var genPar = this.parole.arrayParole[dir];
            if(genPar.length>this.difficolta.grandezzaMatriceX){
                continue;
            }
            if(this.controllaParolaInGrid(genPar)){
                i++;
            }
        }
    }


    controllaParolaInGrid(parola){
        var a = this.getPositionParola(parola).split(" ");
        console.log(a);
        if(this.controlloArray(a[0],a[1],a[2],a[3])){
            return true;
        }else{
            return false;
        }
        
    }

    controlloArray(x,y,lparola,direzione){
        if (direzione == "r") {
            for(var i = x;i<lparola;i++){
                if(this.arrayGioco[i][y] != this.parola[i] || this.arrayPosizioni[i][y] == "r"){
                    return false;
                }
            }
            return true;
        } else if (direzione == "l") {
            for(var i = x;i<this.difficolta.grandezzaMatriceX-lparola;i--){
                if(this.arrayGioco[i][y] != this.parola[i] || this.arrayPosizioni[i][y] == "l"){
                    return false;
                }
            }
            return true;
        } else if (direzione == "s") {
            for(var i = y;i<lparola;i++){
                if(this.arrayGioco[x][i] != this.parola[i] || this.arrayPosizioni[x][i] == "s"){
                    return false;
                }
            }
            return true;
        } else if (direzione == "a") {
            
        } else if (direzione == "sr") {
            
        } else if (direzione == "sl") {
            
        } else if (direzione == "ar") {
            
        } else if (direzione == "al") {
            
        }
    }

    getDirezione() {
        var dir = Math.floor(Math.random() * 8);
        switch (dir) {
            case 0:
                return "s"; //sotto
            case 1:
                return "a"; //sopra
            case 2:
                return "r"; //destra
            case 3:
                return "l"; //sinsitra
            case 4:
                return "sr"; // obliquo verso basso destra
            case 5:
                return "ar"; // obliquo verso alto destra
            case 6:
                return "sl"; // obliquo verso basso sinistra
            case 7:
                return "al"; // obliquo verso alto sinistra
        }

    }

    getPositionParola(parola) { //numero parola si intende il riferimento (indice) del array.
        var lunghezzaParola = parola.length;
        var direzione = this.getDirezione();
        
        var posizioneX = null;
        var posizioneY = null;
        if (direzione == "r") {
            posizioneX = Math.floor(Math.random() * (this.difficolta.grandezzaMatriceX - lunghezzaParola));
            posizioneY = Math.floor(Math.random() * this.difficolta.grandezzaMatriceY);
        } else if (direzione == "l") {
            posizioneX = Math.floor(Math.random() * (this.difficolta.grandezzaMatriceX - lunghezzaParola)) + lunghezzaParola;
            posizioneY = Math.floor(Math.random() * this.difficolta.grandezzaMatriceY);
        } else if (direzione == "s") {
            posizioneX = Math.floor(Math.random() * this.difficolta.grandezzaMatriceX);
            posizioneY = Math.floor(Math.random() * (this.difficolta.grandezzaMatriceY - lunghezzaParola));
        } else if (direzione == "a") {
            posizioneX = Math.floor(Math.random() * this.difficolta.grandezzaMatriceX);
            posizioneY = Math.floor(Math.random() * (this.difficolta.grandezzaMatriceY - lunghezzaParola)) + lunghezzaParola;
        } else if (direzione == "sr") {
            posizioneX = Math.floor(Math.random() * (this.difficolta.grandezzaMatriceX - lunghezzaParola));
            posizioneY = Math.floor(Math.random() * (this.difficolta.grandezzaMatriceY - lunghezzaParola)) + posizioneX;
        } else if (direzione == "sl") {
            posizioneX = Math.floor(Math.random() * (this.difficolta.grandezzaMatriceX - lunghezzaParola)) + lunghezzaParola;
            posizioneY = Math.floor(Math.random() * (this.difficolta.grandezzaMatriceY - lunghezzaParola)) + posizioneX;
        } else if (direzione == "ar") {
            posizioneX = Math.floor(Math.random() * (this.difficolta.grandezzaMatriceX - lunghezzaParola));
            posizioneY = Math.floor(Math.random() * (this.difficolta.grandezzaMatriceY - lunghezzaParola)) + (this.difficolta.grandezzaMatriceY - posizioneX);
        } else if (direzione == "al") {
            posizioneX = Math.floor(Math.random() * (this.difficolta.grandezzaMatriceX - lunghezzaParola)) + lunghezzaParola;
            posizioneY = Math.floor(Math.random() * (this.difficolta.grandezzaMatriceY - lunghezzaParola)) + (this.difficolta.grandezzaMatriceY - posizioneX);
        }
        console.log("lParola: "+lunghezzaParola+" dir: "+direzione+" X: "+posizioneX+" Y: "+posizioneY);
        return posizioneX + " " + posizioneY + " " + lunghezzaParola + " " + direzione;


    }

    stampaTabella() {
        this.creaArray();
        document.getElementById("result").innerHTML = "";
        var tabelle = "<table>"
        for (var i = 0; i < this.arrayGioco.length; i++) {
            tabelle += "<tr>"
            for (var k = 0; k < this.arrayGioco[i].length; k++) {
                tabelle += "<td>" + this.arrayGioco[i][k] + "</td>"
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
async function vai() {
    b = new Gioco();
}

