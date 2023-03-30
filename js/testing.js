
function Seguro(marca,year,tipo){
    this.marca = marca
    this.year = year
    this.tipo = tipo
}

Seguro.prototype.cotizarSeguro = function(){
    /**
     * 1 = americano * 1.15
     * 2 = asiatico * 1.05
     * 3= europeo  * 1.35
    */

    let cantidad;
    const base = 2000
    switch (this.marca) {
        case "1":
            cantidad = base * 1.15
            break;
        case "2":
            cantidad = base * 1.05
            break;
        case "e":
            cantidad = base * 1.35
            break
        default:
            break;
    }


    const diferencia = new Date().getFullYear() - this.year
    cantidad = ((diferencia * 3)* cantidad) / 100

    /**
     * Si el seguro es basico se multiplica por un 30% mas
     * Si el seguro es completo se multiplica por un 50% mas
     */

    if(this.tipo === "basico"){
        cantidad *= 1.30
    }else{
        cantidad *= 1.50
    }
    console.log(cantidad)
}

function UI(){}

UI.prototype.llenarOpciones = function(){
    const max = new Date().getFullYear() - 3
    const min = max - 20
    for(let i = max; i > min; i--){
        const option = document.createElement('option')
        option.value = i
        option.textContent = i
        const year = document.querySelector('#year')
        year.appendChild(option)
    }
}

UI.prototype.mostrarMensaje = function(mensaje, tipo){
    const div = document.createElement("div")
    if(tipo === "error"){
        div.classList.add("error")
    }else{
        div.classList.add("correcto")
    }
    div.classList.add("mensaje","mt-10")
    div.textContent = mensaje
    const formulario = document.querySelector("#cotizar-seguro")
    setTimeout(()=>{
        div.remove()
    },3000)
    const errores = document.querySelectorAll(".error")
    if(errores.length === 0){
        formulario.insertBefore(div, document.querySelector("#resultado"))
    }
}


const ui = new UI()

document.addEventListener("DOMContentLoaded",()=>{
    ui.llenarOpciones()
})

cargarEventListeners()
function cargarEventListeners(){
    const formulario = document.querySelector("#cotizar-seguro")
    formulario.addEventListener("submit",cotizarSeguro)
}

function cotizarSeguro(e){
    e.preventDefault()
    const marca  = document.querySelector("#marca").value
    const year = document.querySelector("#year").value
    const tipo = document.querySelector('input[name="tipo"]:checked').value

    if(marca === "" || year === "" || tipo === ""){
        ui.mostrarMensaje("Todos los campos son obligatorios", "error")
    }else{
        ui.mostrarMensaje("Cotizando...", "correcto")
        const seguro = new Seguro(marca,year,tipo)
        seguro.cotizarSeguro()
    }
}

