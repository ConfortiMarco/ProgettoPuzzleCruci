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