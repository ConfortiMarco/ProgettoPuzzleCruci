class Gioco {
    constructor() {
        this.difficolta = new Difficolta();
        this.modalita = new Modalita();
        this.parole = new Parole();
        this.font = new Font();
        this.arrayListaParole = new Array();
        this.arrayControlloNumeri = new Array();
        this.arrayColori = new Array();
        this.parole.setFile();
        this.modalita.setModalita();
        this.difficolta.setDifficolta();
        this.font.setFont();
        this.arrayPosizioni = new Array(this.difficolta.grandezzaMatriceX);
        this.arrayGioco = new Array(this.difficolta.grandezzaMatriceX);
        this.arraySoluzione = new Array(this.difficolta.grandezzaMatriceX);
        this.numeroSoluzione = 0;
        this.InData();
        this.creaArray();
        

    }

    scaricaInTXT() {
        this.parole.downloadFileTXT(this.stampaTabellaTXT());
    }
    scaricaInHTML() {
        this.parole.downloadFileHTML(this.stampaTabellaHTML());
    }

    creaArray() {
        for (var i = 0; i < this.arrayPosizioni.length; i++) {
            this.arrayPosizioni[i] = new Array(this.difficolta.grandezzaMatriceY);
            this.arrayGioco[i] = new Array(this.difficolta.grandezzaMatriceY);
            this.arraySoluzione[i] = new Array(this.difficolta.grandezzaMatriceY);
        }
        var ngi = this.arrayGioco.length;

        for (var i = 0; i < ngi; i++) {
            for (var k = 0; k < ngi; k++) {
                this.arrayGioco[i][k] = "-";
                this.arrayPosizioni[i][k] = "-";
                this.arraySoluzione[i][k] = "-";
            }
        }
    }

    getFreeSpace() {
        var spaziVuoti = 0;
        for (var i = 0; i < this.arrayGioco.length; i++) {
            for (var k = 0; k < this.arrayGioco[i].length; k++) {
                if (this.arrayGioco[i][k] == "-") {
                    spaziVuoti++;
                }
            }
        }
        return spaziVuoti;
    }

    getParolaMagica(len) {
        this.parole.arrayParole = this.parole.getArray();
        var contWhile = true;
        while (contWhile) {
            var dir = Math.floor(Math.random() * this.parole.arrayParole.length);
            if (this.arrayControlloNumeri.includes(dir)) {
                continue;
            }
            var genPar = this.parole.arrayParole[dir];
            genPar = genPar.toUpperCase();
            genPar = genPar.replaceAll(" ", "");
            genPar = genPar.replaceAll("è", "e");
            genPar = genPar.replaceAll("é", "e");
            genPar = genPar.replaceAll("à", "a");
            genPar = genPar.replaceAll("á", "a");
            genPar = genPar.replaceAll("ì", "i");
            genPar = genPar.replaceAll("í", "i");
            genPar = genPar.replaceAll("ò", "o");
            genPar = genPar.replaceAll("ó", "o");
            genPar = genPar.replaceAll("ù", "u");
            genPar = genPar.replaceAll("ú", "u");
            genPar = genPar.replaceAll("ä", "a");
            genPar = genPar.replaceAll("ö", "o");
            genPar = genPar.replaceAll("ü", "u");
            if (genPar.length == len) {
                contWhile = false;
                this.modalita.setParolaMagica(genPar);
            }
        }

    }

    inserisciParolaMagica() {
        var posizioneLettera = 0;
        var parola = this.modalita.parolaMagica;
        for (var i = 0; i < this.arrayGioco.length; i++) {
            for (var k = 0; k < this.arrayGioco[i].length; k++) {
                if (this.arrayGioco[i][k] == "-") {
                    this.arrayGioco[i][k] = parola[posizioneLettera];
                    posizioneLettera++;
                }
            }
        }
    }

    canGetParolaMagica() {
        var spaziVuoti = this.getFreeSpace();
        if (spaziVuoti > this.difficolta.grandezzaMatriceX) {
            return true;
        }
        if (spaziVuoti <= 2) {
            return true;
        }
        if (spaziVuoti > 2 && spaziVuoti <= this.difficolta.grandezzaMatriceX - 1) {
            this.getParolaMagica(spaziVuoti);
            return false;
        }
    }

    async InData() {
        await this.parole.readFile();
        this.parole.arrayParole = this.parole.getArray();

        var i = 0;
        if (this.modalita.modalita == "normale") {
            while (this.canGetParolaMagica()) {
                var dir = Math.floor(Math.random() * this.parole.arrayParole.length);
                if (this.arrayControlloNumeri.includes(dir)) {
                    continue;
                }
                var genPar = this.parole.arrayParole[dir];
                if (genPar.length <= 2 || genPar.length > this.difficolta.grandezzaMatriceX - 1) {
                    continue;
                }
                if (this.controllaParolaInGrid(genPar)) {
                    this.arrayControlloNumeri.push(dir);
                    i++;
                }
            }
            if (this.modalita.parolaMagica == null) {
                vai();
            } else {
                this.inserisciParolaMagica();
                this.stampaTabella();
                this.stampaLista();
            }


        } else if (this.modalita.modalita == "bambini") {
            while (i < this.difficolta.paroleDaTrovare) {
                var dir = Math.floor(Math.random() * this.parole.arrayParole.length);
                if (this.arrayControlloNumeri.includes(dir)) {
                    continue;
                }
                var genPar = this.parole.arrayParole[dir];
                if (genPar.length <= 2 || genPar.length > this.difficolta.grandezzaMatriceX - 1) {
                    continue;
                }
                if (this.controllaParolaInGrid(genPar)) {
                    this.arrayControlloNumeri.push(dir);
                    i++;
                }

            }
            this.riempiSpazi();
            this.stampaTabella();
            this.stampaLista();
        }
    }


    controllaParolaInGrid(parola) {
        parola = parola.toLowerCase();
        parola = parola.replaceAll(" ", "");
        parola = parola.replaceAll("è", "e");
        parola = parola.replaceAll("é", "e");
        parola = parola.replaceAll("à", "a");
        parola = parola.replaceAll("á", "a");
        parola = parola.replaceAll("ì", "i");
        parola = parola.replaceAll("í", "i");
        parola = parola.replaceAll("ò", "o");
        parola = parola.replaceAll("ó", "o");
        parola = parola.replaceAll("ù", "u");
        parola = parola.replaceAll("ú", "u");
        parola = parola.replaceAll("ä", "a");
        parola = parola.replaceAll("ö", "o");
        parola = parola.replaceAll("ü", "u");
        parola = parola.toUpperCase();
        var a = this.getPositionParola(parola).split(" ");

        if (this.controlloArray(parola, a[0], a[1], a[2])) {
            this.inserisciDati(parola, a[0], a[1], a[2]);
            this.arrayListaParole.push(parola);
            return true;
        } else {
            return false;
        }

    }

    riempiSpazi() {
        var alfabeto = "qwertzuioplkjhgfdsayxcvbnm".toUpperCase();
        for (var i = 0; i < this.arrayGioco.length; i++) {
            for (var j = 0; j < this.arrayGioco[i].length; j++) {
                if (this.arrayGioco[i][j] == "-") {
                    var random = Math.floor(Math.random() * 26);
                    this.arrayGioco[i][j] = alfabeto[random];
                }
            }
        }
    }

    inserimentoDatiFinale(parola,x,y,spo,direzione){
        var alfabeto = "qwertzuioplkjhgfdsayxcvbnm1234567890èéà".toUpperCase();
        if(!alfabeto.includes(parola[spo])){
            return;
        }
        this.arrayGioco[x][y] = parola[spo];
        this.arrayPosizioni[x][y] += direzione+" ";
        this.arraySoluzione[x][y] += "/" + this.numeroSoluzione;
    }

    inserisciDati(parola, x, y, direzione) {
        if (direzione == "r") {
            var spo = 0;
            var sss = parseInt(x);
            for (var i = sss; i < parola.length + sss; i++) {
                this.inserimentoDatiFinale(parola,i,y,spo,direzione);
                spo++;
            }
        } else if (direzione == "l") {
            var spo = 0;
            var sss = parseInt(x);
            for (var i = sss; i > sss - parola.length; i--) {
                this.inserimentoDatiFinale(parola,i,y,spo,direzione);
                spo++;
            }
        } else if (direzione == "s") {

            var spo = 0;
            var sss = parseInt(y);
            for (var i = sss; i < parola.length + sss; i++) {
                this.inserimentoDatiFinale(parola,x,i,spo,direzione);
                spo++;
            }
        } else if (direzione == "a") {
            var spo = 0;
            var sss = parseInt(y);
            for (var i = sss; i > sss - parola.length; i--) {
                this.inserimentoDatiFinale(parola,x,i,spo,direzione);
                spo++;
            }
        } else if (direzione == "sr") {
            var spo = 0;
            var ssx = parseInt(x);
            var ssy = parseInt(y);
            for (var i = 0; i < parola.length; i++) {
                this.inserimentoDatiFinale(parola,parseInt(ssx+i),parseInt(ssy+i),spo,direzione);
                spo++;
            }
        } else if (direzione == "sl") {
            var spo = 0;
            var ssx = parseInt(x);
            var ssy = parseInt(y);
            for (var i = 0; i < parola.length; i++) {
                this.inserimentoDatiFinale(parola,parseInt(ssx-i),parseInt(ssy-i),spo,direzione);
                spo++;
            }
        } else if (direzione == "ar") {
            var spo = 0;
            var ssx = parseInt(x);
            var ssy = parseInt(y);
            for (var i = 0; i < parola.length; i++) {
                this.inserimentoDatiFinale(parola,parseInt(ssx-i),parseInt(ssy+i),spo,direzione);
                spo++;
            }
        } else if (direzione == "al") {
            var spo = 0;
            var ssx = parseInt(x);
            var ssy = parseInt(y);
            for (var i = 0; i < parola.length; i++) {
                this.inserimentoDatiFinale(parola,parseInt(ssx+i),parseInt(ssy-i),spo,direzione);
                spo++;
            }
        }
        this.numeroSoluzione++;
    }

    controlloFinale(parola,x,y,spo,direzione){
        var alfabeto = "qwertzuioplkjhgfdsayxcvbnm1234567890èéà".toUpperCase();
        if (this.arrayGioco[x][y] == "-" || !alfabeto.includes(parola[spo])) {
            return true;
        }
        if (this.arrayGioco[x][y] != parola[spo]) {
            return false;
        }
        if (this.arrayPosizioni[x][y].includes(direzione)) {
            return false;
        }
        return true;
    }

    controlloArray(parola, x, y, direzione) {
        var spo = 0;
        var isOk = true;
        if (direzione == "r") {
            var sss = parseInt(x);
            for (var i = sss; i < parola.length + sss; i++) {
                if(this.controlloFinale(parola,i,y,spo,direzione)){
                    spo++;
                }else{
                    spo++;
                    isOk = false;
                }
            }
            return isOk;
        } else if (direzione == "l") {
            var sss = parseInt(x);
            for (var i = sss; i > sss - parola.length; i--) {
                if(this.controlloFinale(parola,i,y,spo,direzione)){
                    spo++;
                }else{
                    isOk = false;
                }
            }
            return isOk;
        } else if (direzione == "s") {
            var sss = parseInt(y);
            for (var i = sss; i < parola.length + sss; i++) {
                if(this.controlloFinale(parola,x,i,spo,direzione)){
                    spo++;
                }else{
                    isOk = false;
                }
            }
            return isOk;
        } else if (direzione == "a") {
            var sss = parseInt(y);
            for (var i = sss; i > sss - parola.length; i--) {
                if(this.controlloFinale(parola,x,i,spo,direzione)){
                    spo++;
                }else{
                    isOk = false;
                }
            }
            return isOk;
        } else if (direzione == "sr") {
            var ssy = parseInt(y);
            var ssx = parseInt(x);
            for (var i = 0; i < parola.length; i++) {
                if(this.controlloFinale(parola,parseInt(ssx+i),parseInt(ssy+i),spo,direzione)){
                    spo++;
                }else{
                    isOk = false;
                }
            }
            return isOk;
        } else if (direzione == "sl") {
            var ssy = parseInt(y);
            var ssx = parseInt(x);
            for (var i = 0; i < parola.length; i++) {
                if(this.controlloFinale(parola,parseInt(ssx-i),parseInt(ssy-i),spo,direzione)){
                    spo++;
                }else{
                    isOk = false;
                }
            }
            return isOk;
        } else if (direzione == "ar") {
            var ssy = parseInt(y);
            var ssx = parseInt(x);
            for (var i = 0; i < parola.length; i++) {
                if(this.controlloFinale(parola,parseInt(ssx-i),parseInt(ssy+i),spo,direzione)){
                    spo++;
                }else{
                    isOk = false;
                }
            }
            return isOk;
        } else if (direzione == "al") {
            var ssy = parseInt(y);
            var ssx = parseInt(x);
            for (var i = 0; i < parola.length; i++) {
                if(this.controlloFinale(parola,parseInt(ssx+i),parseInt(ssy-i),spo,direzione)){
                    spo++;
                }else{
                    isOk = false;
                }
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

    getPositionParola(parola) {
        var lunghezzaParola = parola.length;
        var direzione = this.getDirezione();

        var posizioneY = null;
        var posizioneX = null;
        if (direzione == "r") {
            posizioneY = Math.floor(Math.random() * this.difficolta.grandezzaMatriceX);
            posizioneX = Math.floor(Math.random() * (this.difficolta.grandezzaMatriceY - lunghezzaParola));
        } else if (direzione == "l") {
            posizioneX = Math.floor(Math.random() * (this.difficolta.grandezzaMatriceY - lunghezzaParola)) + lunghezzaParola - 1;
            posizioneY = Math.floor(Math.random() * this.difficolta.grandezzaMatriceX);
        } else if (direzione == "s") {
            posizioneY = Math.floor(Math.random() * (this.difficolta.grandezzaMatriceX - lunghezzaParola));
            posizioneX = Math.floor(Math.random() * this.difficolta.grandezzaMatriceY);
        } else if (direzione == "a") {
            posizioneX = Math.floor(Math.random() * this.difficolta.grandezzaMatriceY);
            posizioneY = Math.floor(Math.random() * (this.difficolta.grandezzaMatriceX - lunghezzaParola)) + lunghezzaParola - 1;
        } else if (direzione == "sr") {
            posizioneX = Math.floor(Math.random() * (this.difficolta.grandezzaMatriceY - lunghezzaParola + 1));
            posizioneY = Math.floor(Math.random() * (this.difficolta.grandezzaMatriceX - lunghezzaParola));
        } else if (direzione == "sl") {
            posizioneX = Math.floor(Math.random() * (this.difficolta.grandezzaMatriceX - lunghezzaParola + 1)) + lunghezzaParola - 1;
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
        return tabelle;
    }
    
    stampaTabellaTXT() {
        var tabelle = "";
        for (var i = 0; i < this.arrayGioco.length; i++) {
            for (var k = 0; k < this.arrayGioco[i].length; k++) {
                tabelle += this.arrayGioco[i][k] + " ";
            }
            tabelle += "\n";
        }
        for (var i = 0; i < this.arrayListaParole.length; i += 2) {
            if (this.arrayListaParole[i + 1] == undefined) {
                tabelle += this.arrayListaParole[i] + "\n";
            } else {
                tabelle += this.arrayListaParole[i] + "\t" + this.arrayListaParole[i + 1] + "\n";
            }

        }
        if (this.modalita.modalita == "normale") {
            tabelle += "\nParola Nascosta: _____________________";
        }
        return tabelle;
    }
    stampaTabellaHTML() {
        var tabelle = "<DOCTYPE HTML><html><head><style>th,td{width: 500px;height: 50px;}table {border: 1px solid black;border-collapse: collapse;text-align: center;width: 500px;height: 50px;}</style></head><body><table>";
        for (var i = 0; i < this.arrayGioco.length; i++) {
            tabelle += "<tr>"
            for (var k = 0; k < this.arrayGioco[i].length; k++) {
                tabelle += "<td>" + this.arrayGioco[i][k] + "</td>";
            }
            tabelle += "</td>";
        }
        tabelle += "</table>";
        for (var i = 0; i < this.arrayListaParole.length; i += 2) {
            if (this.arrayListaParole[i + 1] == undefined) {
                tabelle += this.arrayListaParole[i] + "<br>";
            } else {
                tabelle += this.arrayListaParole[i] + "\t" + this.arrayListaParole[i + 1] + "<br>";
            }

        }
        if (this.modalita.modalita == "normale") {
            tabelle += "<br>Parola Nascosta: _____________________";
        }
        tabelle += "</body>";
        return tabelle;
    }

    stampaLista() {
        document.getElementById("listaParole").innerHTML = "";
        document.getElementById("listaParole2").innerHTML = "";
        var stringaDaStampare = "";
        this.arrayListaParole.sort();
        for (var i = 0; i < this.arrayListaParole.length; i++) {
            stringaDaStampare += this.arrayListaParole[i] + ", ";
        }
        document.getElementById("listaParole").innerHTML = stringaDaStampare;
        document.getElementById("listaParole2").innerHTML = stringaDaStampare;
    }

    stampaSoluzione() {
        this.genColor();
        var solu = "<table>";
        for (var i = 0; i < this.arraySoluzione.length; i++) {
            solu += "<tr>";
            for (var k = 0; k < this.arraySoluzione[i].length; k++) {
                var ora = this.arraySoluzione[i][k];
                var lettera = this.arrayGioco[i][k];
                var arrayNumeriSoluzione = ora.split("/");
                var mediaColor = this.arrayColori[arrayNumeriSoluzione[1]];
                var mediaColorR = 0;
                var mediaColorG = 0;
                var mediaColorB = 0;
                for (var f = 1; f < arrayNumeriSoluzione.length; f++) {
                    var colorCode = (this.arrayColori[arrayNumeriSoluzione[f]]);
                    var colorCode = colorCode.split("");
                    mediaColorR += parseInt((colorCode[0] + "" + colorCode[1] + "" + colorCode[2]));
                    mediaColorG += parseInt((colorCode[3] + "" + colorCode[4] + "" + colorCode[5]));
                    mediaColorB += parseInt((colorCode[6] + "" + colorCode[7] + "" + colorCode[8]));
                }
                mediaColorR /= (arrayNumeriSoluzione.length - 1);
                mediaColorG /= (arrayNumeriSoluzione.length - 1);
                mediaColorB /= (arrayNumeriSoluzione.length - 1);
                if (mediaColorR < 10) {
                    mediaColorR = "00" + mediaColorR;
                } else if (mediaColorR < 100) {
                    mediaColorR = "0" + mediaColorR;
                }

                if (mediaColorB < 10) {
                    mediaColorB = "00" + mediaColorB;
                } else if (mediaColorB < 100) {
                    mediaColorB = "0" + mediaColorB;
                }

                if (mediaColorG < 10) {
                    mediaColorG = "00" + mediaColorG;
                } else if (mediaColorG < 100) {
                    mediaColorG = "0" + mediaColorG;
                }
                if (!isNaN(mediaColor)) {
                    mediaColorR = mediaColorR.toString();
                    mediaColorG = mediaColorG.toString();
                    mediaColorB = mediaColorB.toString();
                    var mediaColorArrayR = mediaColorR.split("");
                    var mediaColorArrayG = mediaColorG.split("");
                    var mediaColorArrayB = mediaColorB.split("");
                    solu += "<td style='background-color: rgb(" + mediaColorArrayR[0] + mediaColorArrayR[1] + mediaColorArrayR[2] + "," + mediaColorArrayG[0] + mediaColorArrayG[1] + mediaColorArrayG[2] + "," + mediaColorArrayB[0] + mediaColorArrayB[1] + mediaColorArrayB[2] + ")'>" + lettera + "</td>";
                } else {
                    if(this.modalita.getModalita() == "normale"){
                        solu += "<td style='background-color: rgb(255,255,255);'><div style='border:1px solid black;border-radius: 15px 15px 15px 15px; padding:5px;'>"+this.arrayGioco[i][k]+"</div></td>";
                    }else{
                        solu += "<td style='background-color: rgb(255,255,255)'></td>";
                    }
                    
                }

            }
            solu += "</tr>";
        }
        solu += "</table>";
        document.getElementById('solu').innerHTML = solu;
        document.getElementById("listaParole2").style.display = 'inline';
    }

    isDifferentColor(r, g, b) {
        var color = r + "" + g + "" + b;
        if (this.arrayColori.includes(color)) {
            return false;
        } else {
            this.arrayColori.push(color);
            return true;
        }
    }

    genColor() {
        for (var i = 0; i < this.numeroSoluzione; i++) {
            var isPossible = true;
            var r, g, b;
            while (isPossible) {
                r = Math.floor(Math.random() * (236 - 50) + 50);
                g = Math.floor(Math.random() * (236 - 50) + 50);
                b = Math.floor(Math.random() * (236 - 50) + 50);
                if (r < 10) {
                    r = "00" + r;
                } else if (r < 100) {
                    r = "0" + r;
                }

                if (b < 10) {
                    b = "00" + b;
                } else if (b < 100) {
                    b = "0" + b;
                }

                if (g < 10) {
                    g = "00" + g;
                } else if (g < 100) {
                    g = "0" + g;
                }
                if (this.isDifferentColor(r, g, b)) {
                    isPossible = false;
                }
            }
        }

    }

}