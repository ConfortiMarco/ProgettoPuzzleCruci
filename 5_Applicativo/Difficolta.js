class Difficolta {
    constructor() {
        this.modalita = new Modalita();
        this.difficolta = "facile";
        this.paroleDaTrovare = 10;
        this.grandezzaMatriceX = 10;
        this.grandezzaMatriceY = 10;
    }

    setDifficolta(){
        if(this.modalita.getModalita()=="bambini"){
            if(document.getElementById('difFac').checked){
                this.difficolta = "facile";
                this.paroleDaTrovare = 15;
                this.grandezzaMatriceX = 10;
                this.grandezzaMatriceY = 10;
            }else if(document.getElementById('difMed').checked){
                this.difficolta = "medio";
                this.paroleDaTrovare = 50;
                this.grandezzaMatriceX = 18;
                this.grandezzaMatriceY = 18;
            }else if(document.getElementById('difDif').checked){
                this.difficolta = "difficile";
                this.paroleDaTrovare = 70;
                this.grandezzaMatriceX = 22;
                this.grandezzaMatriceY = 22;
            }
        }else if(this.modalita.getModalita()=="normale"){
            if(document.getElementById('difFac').checked){
                this.difficolta = "facile";
                this.grandezzaMatriceX = 15;
                this.grandezzaMatriceY = 15;
            }else if(document.getElementById('difMed').checked){
                this.difficolta = "medio";
                this.grandezzaMatriceX = 20;
                this.grandezzaMatriceY = 20;
            }else if(document.getElementById('difDif').checked){
                this.difficolta = "difficile";
                this.grandezzaMatriceX = 25;
                this.grandezzaMatriceY = 25;
            }
        }
    }

}