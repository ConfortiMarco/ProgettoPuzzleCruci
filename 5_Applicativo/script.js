

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

        var i = 0;
        while(i<this.difficolta.paroleDaTrovare){
            var dir = Math.floor(Math.random() * this.parole.arrayParole.length);
            var genPar = this.parole.arrayParole[dir];
            if(genPar.length<2 || genPar.length>this.difficolta.grandezzaMatriceX-1){
                continue;
            }
            if(this.controllaParolaInGrid(genPar)){
                i++;
            }
        }
        this.stampaTabella();
    }


    controllaParolaInGrid(parola){
        var a = this.getPositionParola(parola).split(" ");
        
        if(this.controlloArray(parola,a[0],a[1],a[2])){
            this.inserisciDati(parola,a[0],a[1],a[2]);
            console.log(parola + " " + a[0] + " " + a[1] + " " +a[2]);
            return true;
        }else{
            return false;
        }
        
    }

    inserisciDati(parola,x,y,direzione){
        if (direzione == "r") {
            var spo = 0;
            var sss = parseInt(x);
            for(var i = sss;i<parola.length + sss;i++){
                this.arrayGioco[i][y] = parola[spo];
                this.arrayPosizioni[i][y] += "r ";
                spo++;
            }
        } else if (direzione == "l") {
            var spo = 0;
            var sss = parseInt(x);
            for(var i = sss;i>sss-parola.length;i--){
                this.arrayGioco[i][y] = parola[spo];
                this.arrayPosizioni[i][y] += "l ";
                spo++;
            }
        } else if (direzione == "s") {
            
            var spo = 0;
            var sss = parseInt(y);
            for(var i = sss;i<parola.length+sss;i++){
                this.arrayGioco[x][i] = parola[spo];
                this.arrayPosizioni[x][i] += "s ";
                spo++;
                
            }
        } else if (direzione == "a") {
            var spo = 0;
            var sss = parseInt(y);
            for(var i = sss;i>sss-parola.length;i--){
                this.arrayGioco[x][i] = parola[spo];
                this.arrayPosizioni[x][i] += "a ";
                spo++;
                
            }
        }else if (direzione=="sr"){
            var spo = 0;
            var ssx = parseInt(x);
            var ssy = parseInt(y);
            for(var i = 0;i<parola.length;i++){
                this.arrayGioco[ssx+i][ssy+i] = parola[spo];
                this.arrayPosizioni[ssx+i][ssy+i] += "sr ";
                spo++;
            }
        }else if (direzione=="sl"){
            var spo = 0;
            var ssx = parseInt(x);
            var ssy = parseInt(y);
            for(var i = 0;i<parola.length;i++){
                this.arrayGioco[ssx-i][ssy-i] = parola[spo];
                this.arrayPosizioni[ssx-i][ssy-i] += "sr ";
                spo++;
            }
        }else if (direzione=="ar"){
            var spo = 0;
            var ssx = parseInt(x);
            var ssy = parseInt(y);
            for(var i = 0;i<parola.length;i++){
                this.arrayGioco[ssx-i][ssy+i] = parola[spo];
                this.arrayPosizioni[ssx-i][ssy+i] += "sr ";
                spo++;
            }
        }else if (direzione=="al"){
            var spo = 0;
            var ssx = parseInt(x);
            var ssy = parseInt(y);
            for(var i = 0;i<parola.length;i++){
                this.arrayGioco[ssx+i][ssy-i] = parola[spo];
                this.arrayPosizioni[ssx+i][ssy-i] += "sr ";
                spo++;
            }
        }
    }

    controlloArray(parola,x,y,direzione){
        var isOk = true;
        var spo = 0;
        if (direzione == "r") {
            var sss = parseInt(x);
            for(var i = sss;i<parola.length+sss;i++){
                if(this.arrayGioco[i][y] == "-"){
                    spo++;
                    continue;
                }
                
                if(this.arrayGioco[i][y] != parola[spo]){
                    isOk = false;
                }
                if(this.arrayPosizioni[i][y].includes("r")){
                    isOk = false;
                }
                spo++;
            }
            return isOk;
        } else if (direzione == "l") {
            var sss = parseInt(x);
            for(var i = sss;i>sss-parola.length;i--){
                if(this.arrayGioco[i][y] == "-"){
                    spo++;
                    continue;
                }
                if(this.arrayGioco[i][y] != parola[spo]){
                    isOk = false;
                }
                if(this.arrayPosizioni[i][y].includes("l")){
                    isOk = false;
                }
                spo++;
            }
            return isOk;
        } else if (direzione == "s") {
            var sss = parseInt(y);
            for(var i = sss;i<parola.length + sss;i++){
                if(this.arrayGioco[x][i] == "-" ){
                    spo++;
                    continue;
                }
                if(this.arrayGioco[x][i] != parola[spo]){
                    isOk = false;
                }
                if(this.arrayPosizioni[x][i].includes("s")){
                    isOk = false;
                }
                spo++;
            }
            return isOk;
        } else if (direzione == "a") {
            var sss = parseInt(y);
            for(var i = sss;i>sss-parola.length;i--){
                if(this.arrayGioco[x][i] == "-" ){
                    spo++;
                    continue;
                }
                if(this.arrayGioco[x][i] != parola[spo]){
                    isOk = false;
                }
                if(this.arrayPosizioni[x][i].includes("a")){
                    isOk = false;
                }
                spo++;
            }
            return isOk;
        } else if (direzione == "sr") {
            var ssy = parseInt(y);
            var ssx = parseInt(x);
            for(var i = 0;i<parola.length;i++){
                if(this.arrayGioco[ssx+i][ssy+i] == "-" ){
                    spo++;
                    continue;
                }
                if(this.arrayGioco[ssx+i][ssy+i] != parola[spo]){
                    isOk = false;
                }
                if(this.arrayPosizioni[ssx+i][ssy+i].includes("sr")){
                    isOk = false;
                }
                spo++;
            }
            return isOk;
        } else if (direzione == "sl") {
            var ssy = parseInt(y);
            var ssx = parseInt(x);
            for(var i = 0;i<parola.length;i++){
                if(this.arrayGioco[ssx-i][ssy-i] == "-" ){
                    spo++;
                    continue;
                }
                if(this.arrayGioco[ssx-i][ssy-i] != parola[spo]){
                    isOk = false;
                }
                if(this.arrayPosizioni[ssx-i][ssy-i].includes("sl")){
                    isOk = false;
                }
                spo++;
            }
            return isOk;
        } else if (direzione == "ar") {
            var ssy = parseInt(y);
            var ssx = parseInt(x);
            for(var i = 0;i<parola.length;i++){
                if(this.arrayGioco[ssx-i][ssy+i] == "-" ){
                    spo++;
                    continue;
                }
                if(this.arrayGioco[ssx-i][ssy+i] != parola[spo]){
                    isOk = false;
                }
                if(this.arrayPosizioni[ssx-i][ssy+i].includes("ar")){
                    isOk = false;
                }
                spo++;
            }
            return isOk;
        } else if (direzione == "al") {
            var ssy = parseInt(y);
            var ssx = parseInt(x);
            for(var i = 0;i<parola.length;i++){
                if(this.arrayGioco[ssx+i][ssy-i] == "-" ){
                    spo++;
                    continue;
                }
                if(this.arrayGioco[ssx+i][ssy-i] != parola[spo]){
                    isOk = false;
                }
                if(this.arrayPosizioni[ssx+i][ssy-i].includes("ar")){
                    isOk = false;
                }
                spo++;
            }
            
            return isOk;
        }
    }

    getDirezione() {
        var dir = Math.floor(Math.random() * 8);
        switch (dir) {
            case 0:
                return "s"; //destra
            case 1:
                return "a"; //sopra
            case 2:
                return "r"; //sotto
            case 3:
                return "l"; //sinsitra
            case 4:
                return "sr"; // obliquo verso basso destra
            case 5:
                return "ar"; // obliquo verso alto destra
            case 6:
                return "sl"; // obliquo verso alto sinistra
            case 7:
                return "al"; // obliquo verso basso sinistra
        }

    }

    getPositionParola(parola) { //numero parola si intende il riferimento (indice) del array.
        var lunghezzaParola = parola.length;
        var direzione = this.getDirezione();
        
        var posizioneY = null;
        var posizioneX = null;
        if (direzione == "r") {
            posizioneY = Math.floor(Math.random() * this.difficolta.grandezzaMatriceX);
            posizioneX = Math.floor(Math.random() * (this.difficolta.grandezzaMatriceY - lunghezzaParola));
        } else if (direzione == "l") {
            posizioneX = Math.floor(Math.random() * (this.difficolta.grandezzaMatriceY - lunghezzaParola)) + lunghezzaParola -1 ;
            posizioneY = Math.floor(Math.random() * this.difficolta.grandezzaMatriceX);
        } else if (direzione == "s") {
            posizioneY = Math.floor(Math.random() * (this.difficolta.grandezzaMatriceX - lunghezzaParola));
            posizioneX = Math.floor(Math.random() * this.difficolta.grandezzaMatriceY); 
        } else if (direzione == "a") {
            posizioneX = Math.floor(Math.random() * this.difficolta.grandezzaMatriceY);
            posizioneY = Math.floor(Math.random() * (this.difficolta.grandezzaMatriceX - lunghezzaParola)) + lunghezzaParola-1;
        } else if (direzione == "sr") {
            posizioneX = Math.floor(Math.random() * (this.difficolta.grandezzaMatriceY - lunghezzaParola + 1));
            posizioneY = Math.floor(Math.random() * (this.difficolta.grandezzaMatriceX -lunghezzaParola));
        } else if (direzione == "sl") {
            posizioneX = Math.floor(Math.random() * (this.difficolta.grandezzaMatriceX - lunghezzaParola+1)) + lunghezzaParola-1;
            posizioneY = Math.floor(Math.random() * (this.difficolta.grandezzaMatriceY - lunghezzaParola)) + lunghezzaParola;
        } else if (direzione == "ar") {
            posizioneX = Math.floor(Math.random() * (this.difficolta.grandezzaMatriceY - lunghezzaParola)) + lunghezzaParola;
            posizioneY = Math.floor(Math.random() * (this.difficolta.grandezzaMatriceX - lunghezzaParola));
        } else if (direzione == "al") {
            posizioneX = Math.floor(Math.random() * (this.difficolta.grandezzaMatriceY - lunghezzaParola));
            posizioneY = Math.floor(Math.random() * (this.difficolta.grandezzaMatriceX - lunghezzaParola)) + lunghezzaParola;
        }
        return posizioneX + " " + posizioneY + " " + direzione;


    }

    stampaTabella() {
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
        
        document.getElementById("result").innerHTML += tabelle;
    }

}
var a;
var b;
async function vai() {
    b = new Gioco();
}

