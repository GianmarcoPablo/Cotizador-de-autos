function Seguro(marca,year,tipo){
    this.marca = marca
    this.year = year
    this.tipo = tipo
}

Seguro.prototype.cotizarSeguro = function(){
    /**
     *  1 = americado + 1.15
     *  2 = asittico + 1.05
     *  3 = europeo + 1.35
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
        case "3":
            cantidad = base * 1.35
            break;
        default:
            break;
    }

    const diferencia = new Date().getFullYear() - this.year
    cantidad -= ((diferencia * 3) * cantidad) / 100

    /**
     * si el seguro es basico se multiplica por un 30 % mas 
     * si el seguro es completo se multiplica por un 50% mas
     */

    if(this.tipo === "basico"){
        cantidad *= 1.30
    }else{
        cantidad *= 1.50
    }
    return cantidad
}


function UI(){}

const ui = new UI

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

UI.prototype.mostrarMensaje = function(mensaje,tipo){
    const div = document.createElement("div")
    if(tipo === "error"){
        div.classList.add("error")
    }else{
        div.classList.add("correcto")
    }
    div.classList.add("mensaje","mt-10")
    div.textContent = mensaje
    const formulario = document.querySelector("#cotizar-seguro")
    const errores = document.querySelectorAll(".mensaje")
    setTimeout(() => {
        div.remove()
    }, 3000);
    if(errores.length === 0){
        formulario.insertBefore(div,document.querySelector("#resultado"))
    }
}

UI.prototype.mostrarResultado = function(total,seguro){
    const {marca,year,tipo} = seguro

    let textoMarca
    switch (marca) {
        case "1":
            textoMarca = "Americano"
            break;
        case "2":
            textoMarca = "Asiatico"
            break;
        case "3":
            textoMarca = "Europeo"
            break;
    
        default:
            break;
    }
    const div = document.createElement("div")
    div.classList.add("mt-10")
    div.innerHTML = `
        <p class="header">Tu resumen</p>
        <p class="font-bold">Total: <span class="font-normal">${textoMarca}</span></p>
        <p class="font-bold">Total: <span class="font-normal">${year}</span></p>
        <p class="font-bold">Total: <span class="font-normal capitalize">${tipo}</span></p>
        <p class="font-bold">Total: <span class="font-normal">$ ${total}</span></p>
    `
    const resultado = document.querySelector("#resultado")
    const spinner = document.querySelector("#cargando")
    spinner.style.display = "flex"
    setTimeout(() => {
        spinner.style.display = "none"
        resultado.appendChild(div)
    }, 3000);
}

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
    const marca = document.querySelector("#marca").value
    const year = document.querySelector("#year").value
    const tipo = document.querySelector("input[name='tipo']:checked").value

    if(marca === "" || year === "" || tipo === ""){
        ui.mostrarMensaje("Todos los campos son obligatorios","error")
    }else{
        ui.mostrarMensaje("Cotizando...","exito")
        const seguro = new Seguro(marca,year,tipo)
        const total = seguro.cotizarSeguro()
        ui.mostrarResultado(total,seguro)
        const resultado = document.querySelector("#resultado")
        while(resultado.firstChild){
            resultado.removeChild(resultado.firstChild)
        }
    }
}