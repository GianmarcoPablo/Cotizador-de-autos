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
            break
        case "2":
            cantidad = base * 1.05
            break
        case "3":
            cantidad = base * 1.35
            break;
        default:
            break;
    }

    //leer el año
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

//** --------------------------------------------------------------------------  */
function UI(){}

const ui = new UI

UI.prototype.llenarOpciones = function(){
    const max = new Date().getFullYear() - 3
    const min = max - 20

    for(let i = max; i > min; i--){
        const option = document.createElement("option")
        option.value = i
        option.textContent = i
        const year = document.querySelector("#year")
        year.appendChild(option)
    }
}

UI.prototype.mostraMensaje = function(mensaje,tipo){
    const div = document.createElement("div")
    if(tipo === "error"){
        div.classList.add("error")
    }else{
        div.classList.add("correcto")
    }
    div.classList.add("mensaje","mt-5")
    div.textContent = mensaje
    const formulario = document.querySelector("#cotizar-seguro")
    formulario.insertBefore(div,document.querySelector("#resultado"))
    setTimeout(() => {
        div.remove()
    }, 3000);
}

UI.prototype.mostraResultado = function(total,seguro){
    //crear el resultado
    const div = document.createElement("div")
    div.classList.add("mt-10")
    div.innerHTML = `
        <p class="header">Tu resumen</p>
        <p class="font-bold">${total}</p>
    `
    const resultadoDiv = document.querySelector("#resultado")
    const spinner = document.querySelector("#cargando")
    spinner.style.display = "block"
    setTimeout(()=>{
        spinner.style.display = "none"
        resultadoDiv.appendChild(div)
    },3000)
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
        ui.mostraMensaje("TODOS LOS CAMPOS SON OBLIGATORIOS","error")
    }else{
        ui.mostraMensaje("COTIZANDO...","exito")

        const resultado = document.querySelector("#resultado")
        if(resultado !== null){
            resultado.remove()
        }
        const seguro = new Seguro(marca,year,tipo)
        const total = seguro.cotizarSeguro()

        ui.mostraResultado(total,seguro)
    }


}


//** --------------------------------------------------------------------------  */