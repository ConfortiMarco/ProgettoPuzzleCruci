class Parole {
    constructor() {
        this.filePath = "../Dizionari/280000_parole_italiane.txt"
        this.difficolta = new Difficolta();
        this.arrayParole = new Array();
    }


    setFile() {
        if (document.getElementById("files").files[0] == undefined) {
            this.filePath = "../Dizionari/280000_parole_italiane.txt";
        } else {
            var x = document.getElementById("files").files[0].name;
            this.filePath = x;
        }
        console.log(this.filePath);

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

    formatWord(genPar){
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
        return genPar
    }

    getPossibleSoluzioni(len){
        this.getArray();
        var arraySoluzioni = new Array();
        for(var i = 0;i<this.arrayParole.length;i++){
            if(this.arrayParole[i].length == len){
                arraySoluzioni.push(this.arrayParole[i]);
            }
        }
        return arraySoluzioni;
    }

    downloadFileTXT(content) {
        // Create a blob
        var blob = new Blob([content], { type: 'text' });
        var url = URL.createObjectURL(blob);

        // Create a link to download it
        var pom = document.createElement('a');
        pom.href = url;
        pom.setAttribute('download', "CruciPuzzleByMarco.txt");
        pom.click();
    }

    downloadFileHTML(content) {
        // Create a blob
        var blob = new Blob([content], { type: 'text' });
        var url = URL.createObjectURL(blob);

        // Create a link to download it
        var pom = document.createElement('a');
        pom.href = url;
        pom.setAttribute('download', "CruciPuzzleByMarco.html");
        pom.click();
    }

}