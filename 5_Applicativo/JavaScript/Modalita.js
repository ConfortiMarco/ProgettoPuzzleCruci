class Modalita {
    constructor() {
        this.modalita = "bambini";
        this.parolaMagica = null;
    }

    setModalita() {
        if (document.getElementById('modNormale').checked) {
            this.modalita = "normale"
        } else if (document.getElementById('modBambini').checked) {
            this.modalita = "bambini"
        }
    }
}
