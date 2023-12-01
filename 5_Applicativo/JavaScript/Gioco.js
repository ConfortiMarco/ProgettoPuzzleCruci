class Gioco {
    constructor() {
        this.difficolta = new Difficolta();
        this.modalita = new Modalita();
        this.parole = new Parole();
        this.arrayListaParole = new Array();
        this.arrayControlloNumeri = new Array();
        this.arrayColori = new Array();
        this.parole.setFile();
        this.modalita.setModalita();
        this.difficolta.setDifficolta();
        this.arrayPosizioni = new Array(this.difficolta.grandezzaMatriceX);
        this.arrayGioco = new Array(this.difficolta.grandezzaMatriceX);
        this.arraySoluzione = new Array(this.difficolta.grandezzaMatriceX);
        this.numeroSoluzione = 0;
        this.creaArray();
        this.InData();
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

    prendereSpaziVuoti() {
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

    prendereParolaMagica(len) {
        var arraySoluzioni = this.parole.getPossibleSolution(len);
        var dir = Math.floor(Math.random() * arraySoluzioni.length);
        var genPar = arraySoluzioni[dir];
        genPar = this.parole.formatWord(genPar);
        this.modalita.parolaMagica = genPar;
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

    puoiDareParolaMagica() {
        var spaziVuoti = this.prendereSpaziVuoti();
        if (spaziVuoti > this.difficolta.grandezzaMatriceX) {
            return true;
        }
        if (spaziVuoti > 2 && spaziVuoti <= this.difficolta.grandezzaMatriceX) {
            this.prendereParolaMagica(spaziVuoti);
            return false;
        }
        if (spaziVuoti <= 2) {
            generaCampo();
        }
    }

    async InData() {
        await this.parole.readFile();
        this.parole.arrayParole = this.parole.getArray();

        var i = 0;
        if (this.modalita.modalita == "normale") {
            while (this.puoiDareParolaMagica()) {
                var dir = Math.floor(Math.random() * this.parole.arrayParole.length);
                if (this.arrayControlloNumeri.includes(dir)) {
                    continue;
                }
                var genPar = this.parole.arrayParole[dir];
                if (genPar.length <= 2 || genPar.length > this.difficolta.grandezzaMatriceX - 1) {
                    continue;
                }
                if (this.controllaParolaInGriglia(genPar)) {
                    this.arrayControlloNumeri.push(dir);
                }
            }
            if (this.modalita.parolaMagica == null) {
                generaCampo();
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
                if (this.controllaParolaInGriglia(genPar)) {
                    this.arrayControlloNumeri.push(dir);
                    i++;
                }

            }
            this.riempiSpazi();
            this.stampaTabella();
            this.stampaLista();
        }
    }


    controllaParolaInGriglia(parola) {
        parola = this.parole.formatWord(parola);
        var a = this.prenderePosizioneParola(parola).split(" ");

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

    inserimentoDatiFinale(parola, x, y, spo, direzione) {
        this.arrayGioco[x][y] = parola[spo];
        this.arrayPosizioni[x][y] += direzione + " ";
        this.arraySoluzione[x][y] += "/" + this.numeroSoluzione;
    }

    inserisciDati(parola, x, y, direzione) {
        if (direzione == "r") {
            var spo = 0;
            var sss = parseInt(x);
            for (var i = sss; i < parola.length + sss; i++) {
                this.inserimentoDatiFinale(parola, i, y, spo, direzione);
                spo++;
            }
        } else if (direzione == "l") {
            var spo = 0;
            var sss = parseInt(x);
            for (var i = sss; i > sss - parola.length; i--) {
                this.inserimentoDatiFinale(parola, i, y, spo, direzione);
                spo++;
            }
        } else if (direzione == "s") {

            var spo = 0;
            var sss = parseInt(y);
            for (var i = sss; i < parola.length + sss; i++) {
                this.inserimentoDatiFinale(parola, x, i, spo, direzione);
                spo++;
            }
        } else if (direzione == "a") {
            var spo = 0;
            var sss = parseInt(y);
            for (var i = sss; i > sss - parola.length; i--) {
                this.inserimentoDatiFinale(parola, x, i, spo, direzione);
                spo++;
            }
        } else if (direzione == "sr") {
            var spo = 0;
            var ssx = parseInt(x);
            var ssy = parseInt(y);
            for (var i = 0; i < parola.length; i++) {
                this.inserimentoDatiFinale(parola, parseInt(ssx + i), parseInt(ssy + i), spo, direzione);
                spo++;
            }
        } else if (direzione == "sl") {
            var spo = 0;
            var ssx = parseInt(x);
            var ssy = parseInt(y);
            for (var i = 0; i < parola.length; i++) {
                this.inserimentoDatiFinale(parola, parseInt(ssx - i), parseInt(ssy - i), spo, direzione);
                spo++;
            }
        } else if (direzione == "ar") {
            var spo = 0;
            var ssx = parseInt(x);
            var ssy = parseInt(y);
            for (var i = 0; i < parola.length; i++) {
                this.inserimentoDatiFinale(parola, parseInt(ssx - i), parseInt(ssy + i), spo, direzione);
                spo++;
            }
        } else if (direzione == "al") {
            var spo = 0;
            var ssx = parseInt(x);
            var ssy = parseInt(y);
            for (var i = 0; i < parola.length; i++) {
                this.inserimentoDatiFinale(parola, parseInt(ssx + i), parseInt(ssy - i), spo, direzione);
                spo++;
            }
        }
        this.numeroSoluzione++;
    }

    controlloFinale(parola, x, y, spo, direzione) {
        if (this.arrayGioco[x][y] == "-") {
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
                if (this.controlloFinale(parola, i, y, spo, direzione)) {
                    spo++;
                } else {
                    spo++;
                    isOk = false;
                }
            }
            return isOk;
        } else if (direzione == "l") {
            var sss = parseInt(x);
            for (var i = sss; i > sss - parola.length; i--) {
                if (this.controlloFinale(parola, i, y, spo, direzione)) {
                    spo++;
                } else {
                    isOk = false;
                }
            }
            return isOk;
        } else if (direzione == "s") {
            var sss = parseInt(y);
            for (var i = sss; i < parola.length + sss; i++) {
                if (this.controlloFinale(parola, x, i, spo, direzione)) {
                    spo++;
                } else {
                    isOk = false;
                }
            }
            return isOk;
        } else if (direzione == "a") {
            var sss = parseInt(y);
            for (var i = sss; i > sss - parola.length; i--) {
                if (this.controlloFinale(parola, x, i, spo, direzione)) {
                    spo++;
                } else {
                    isOk = false;
                }
            }
            return isOk;
        } else if (direzione == "sr") {
            var ssy = parseInt(y);
            var ssx = parseInt(x);
            for (var i = 0; i < parola.length; i++) {
                if (this.controlloFinale(parola, parseInt(ssx + i), parseInt(ssy + i), spo, direzione)) {
                    spo++;
                } else {
                    isOk = false;
                }
            }
            return isOk;
        } else if (direzione == "sl") {
            var ssy = parseInt(y);
            var ssx = parseInt(x);
            for (var i = 0; i < parola.length; i++) {
                if (this.controlloFinale(parola, parseInt(ssx - i), parseInt(ssy - i), spo, direzione)) {
                    spo++;
                } else {
                    isOk = false;
                }
            }
            return isOk;
        } else if (direzione == "ar") {
            var ssy = parseInt(y);
            var ssx = parseInt(x);
            for (var i = 0; i < parola.length; i++) {
                if (this.controlloFinale(parola, parseInt(ssx - i), parseInt(ssy + i), spo, direzione)) {
                    spo++;
                } else {
                    isOk = false;
                }
            }
            return isOk;
        } else if (direzione == "al") {
            var ssy = parseInt(y);
            var ssx = parseInt(x);
            for (var i = 0; i < parola.length; i++) {
                if (this.controlloFinale(parola, parseInt(ssx + i), parseInt(ssy - i), spo, direzione)) {
                    spo++;
                } else {
                    isOk = false;
                }
            }

            return isOk;
        }
    }

    prendereDirezione() {
        var dir = Math.floor(Math.random() * 8);
        switch (dir) {
            case 0:
                return "s";                             //da sinistra a destra
            case 1:
                return "a";                             //da destra a sinistra
            case 2:
                return "r";                             //da sopra verso sotto
            case 3:
                return "l";                             //da sotto verso sopra
            case 4:
                return "sr";                            //obliquo verso basso destra
            case 5:
                return "ar";                            //obliquo verso alto destra
            case 6:
                return "sl";                            //obliquo verso alto sinistra
            case 7:
                return "al";                            //obliquo verso basso sinistra
        }
    }

    prenderePosizioneParola(parola) {
        var lunghezzaParola = parola.length;
        var direzione = this.prendereDirezione();
        var posizioneX = null;
        var posizioneY = null;
        if (direzione == "r") {
            posizioneX = Math.floor(Math.random() * this.difficolta.grandezzaMatriceY);
            posizioneY = Math.floor(Math.random() * (this.difficolta.grandezzaMatriceX - lunghezzaParola));
        } else if (direzione == "l") {
            posizioneY = Math.floor(Math.random() * (this.difficolta.grandezzaMatriceX - lunghezzaParola)) + lunghezzaParola - 1;
            posizioneX = Math.floor(Math.random() * this.difficolta.grandezzaMatriceY);
        } else if (direzione == "s") {
            posizioneX = Math.floor(Math.random() * (this.difficolta.grandezzaMatriceY - lunghezzaParola));
            posizioneY = Math.floor(Math.random() * this.difficolta.grandezzaMatriceX);
        } else if (direzione == "a") {
            posizioneY = Math.floor(Math.random() * this.difficolta.grandezzaMatriceX);
            posizioneX = Math.floor(Math.random() * (this.difficolta.grandezzaMatriceY - lunghezzaParola)) + lunghezzaParola - 1;
        } else if (direzione == "sr") {
            posizioneY = Math.floor(Math.random() * (this.difficolta.grandezzaMatriceX - lunghezzaParola));
            posizioneX = Math.floor(Math.random() * (this.difficolta.grandezzaMatriceY - lunghezzaParola));
        } else if (direzione == "sl") {
            posizioneY = Math.floor(Math.random() * (this.difficolta.grandezzaMatriceX - lunghezzaParola)) + lunghezzaParola - 1;
            posizioneX = Math.floor(Math.random() * (this.difficolta.grandezzaMatriceY - lunghezzaParola)) + lunghezzaParola;
        } else if (direzione == "ar") {
            posizioneY = Math.floor(Math.random() * (this.difficolta.grandezzaMatriceX - lunghezzaParola)) + lunghezzaParola;
            posizioneX = Math.floor(Math.random() * (this.difficolta.grandezzaMatriceY - lunghezzaParola));
        } else if (direzione == "al") {
            posizioneY = Math.floor(Math.random() * (this.difficolta.grandezzaMatriceX - lunghezzaParola));
            posizioneX = Math.floor(Math.random() * (this.difficolta.grandezzaMatriceY - lunghezzaParola)) + lunghezzaParola;
        }
        return posizioneY + " " + posizioneX + " " + direzione;
    }

    stampaTabella() {
        document.getElementById("solu").innerHTML = "";
        document.getElementById("listaParole2").style.display = 'none';
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
            tabelle += "<br>Parola Nascosta: <input type='txt'>";
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
            stringaDaStampare += "<div style='margin:5px;'>" + this.arrayListaParole[i] + "</div>";
        }
        document.getElementById("listaParole").innerHTML = stringaDaStampare;
        document.getElementById("listaParole2").innerHTML = stringaDaStampare;
    }

    stampaSoluzione() {
        this.generaColore();
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
                mediaColorR = this.formattaNumeroColore(mediaColorR);
                mediaColorG = this.formattaNumeroColore(mediaColorG);
                mediaColorB = this.formattaNumeroColore(mediaColorB);
                if (!isNaN(mediaColor)) {
                    mediaColorR = mediaColorR.toString();
                    mediaColorG = mediaColorG.toString();
                    mediaColorB = mediaColorB.toString();
                    var mediaColorArrayR = mediaColorR.split("");
                    var mediaColorArrayG = mediaColorG.split("");
                    var mediaColorArrayB = mediaColorB.split("");
                    solu += "<td style='background-color: rgb(" + mediaColorArrayR[0] + mediaColorArrayR[1] + mediaColorArrayR[2] + "," + mediaColorArrayG[0] + mediaColorArrayG[1] + mediaColorArrayG[2] + "," + mediaColorArrayB[0] + mediaColorArrayB[1] + mediaColorArrayB[2] + ")'>" + lettera + "</td>";
                } else {
                    if (this.modalita.modalita == "normale") {
                        solu += "<td style='background-color: rgb(255,255,255);'><div style='border:1px solid black;border-radius: 15px 15px 15px 15px; padding:5px;'>" + this.arrayGioco[i][k] + "</div></td>";
                    } else {
                        solu += "<td style='background-color: rgb(255,255,255)'></td>";
                    }

                }

            }
            solu += "</tr>";
        }
        solu += "</table>";
        document.getElementById('solu').innerHTML = solu;
        document.getElementById("listaParole2").style.display = 'block';
        if (this.modalita.parolaMagica != null) {
            document.getElementById("parolaMagica").innerHTML = "Parola Nascosta: <b>" + this.modalita.parolaMagica + "</b>";
            document.getElementById("parolaMagica").style.display = 'block';
        } else {
            document.getElementById("parolaMagica").style.display = 'none';
        }
    }

    formattaNumeroColore(colore) {
        if (colore < 10) {
            colore = "00" + colore;
        } else if (colore < 100) {
            colore = "0" + colore;
        }
        return colore;
    }


    eDifferenteColore(r, g, b) {
        var color = r + "" + g + "" + b;
        if (this.arrayColori.includes(color)) {
            return false;
        } else {
            this.arrayColori.push(color);
            return true;
        }
    }

    generaColore() {
        for (var i = 0; i < this.numeroSoluzione; i++) {
            var isPossible = true;
            var r, g, b;
            while (isPossible) {
                r = Math.floor(Math.random() * (236 - 50) + 50);
                g = Math.floor(Math.random() * (236 - 50) + 50);
                b = Math.floor(Math.random() * (236 - 50) + 50);
                r = this.formattaNumeroColore(r);
                g = this.formattaNumeroColore(g);
                b = this.formattaNumeroColore(b);
                if (this.eDifferenteColore(r, g, b)) {
                    isPossible = false;
                }
            }
        }
    }

}