//FUNCIONES CONSTRUCTORAS

function Seguro(marca,year,tipo){
    this.marca = marca
    this.year = year
    this.tipo = tipo
}

function UI(){}

UI.prototype.llenarOpciones = function(){
    const max = new Date().getFullYear()
    const min = max - 20

    for(let i = max; i > min; i--){
        const option = document.createElement("option")
        option.value = i
        option.textContent = i
        const year = document.querySelector("#year")
        year.appendChild(option)
    }
}

const ui = new UI

document.addEventListener("DOMContentLoaded",()=>{
    ui.llenarOpciones()
})