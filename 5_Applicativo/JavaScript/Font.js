class Font {
    constructor() {
        this.fontArray = ['Arial, sans-serif','Helvetica, sans-serif', 'Verdana, sans-serif','Trebuchet MS, sans-serif','Times, Times New Roman, serif','Didot, serif','Georgia, serif','OCR A Std, monospace','Courier New, monospace','Andale Mono, monospace','Impact, fantasy','Stencil Std, fantasy','Trattatello, fantasy'];
        this.font = "Arial, sans-serif";
    }
    
    
    generaListaFonts() {
        var listaParole = "<select name='fonts' id='font'>";
        for(var i = 0;i<this.fontArray.length;i++){
            listaParole += `<option value='${this.fontArray[i]}' style='font-family:`+this.fontArray[i]+`;'>`+this.fontArray[i]+`</option>`;
        }
        listaParole += "</select>";  
        document.getElementById('font-space').innerHTML = listaParole;
    }

    setFont(){
        this.font = document.getElementById('font').value;
        document.getElementById('result').style.fontFamily = this.font;
        document.getElementById('listaParole').style.fontFamily = this.font;
        document.getElementById('solu').style.fontFamily = this.font;
        document.getElementById('listaParole2').style.fontFamily = this.font;
        document.getElementById('parolaMagica').style.fontFamily = this.font;
    }
}