class Modalita {
    constructor() {
        this.modalita = "bambini";
        this.parolaMagica = null;
    }

    getModalita(){
        return this.modalita;
    }

    setModalita() {
        if (document.getElementById('modNormale').checked) {
            this.modalita = "normale"
        } else if (document.getElementById('modBambini').checked) {
            this.modalita = "bambini"
        }
    }

    setParolaMagica(parolaMagica) {
        this.parolaMagica = parolaMagica;
    }
}
