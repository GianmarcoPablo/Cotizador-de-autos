
//*-------------------------------------------------------------------- */
// PROTOTYPO SEGURO
function Seguro(marca,year,tipo){
    this.marca = marca
    this.year = year
    this.tipo = tipo
}
//*-------------------------------------------------------------------- */
//PROTOTYPO UI
function UI(){}

UI.prototype.llenarOpciones = function(){
    //generamos los años
    const max = new Date().getFullYear() - 3
    const min = max - 20
    
    for(let i = max; i > min; i--){
        const option = document.createElement("option")
        option.textContent = i
        option.value = i
        const year = document.querySelector("#year")
        year.appendChild(option) //insertamos los años
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
    formulario.insertBefore(div, document.querySelector("#resultado"))
    setTimeout(()=>{
        div.remove()
    },3000)
}


const ui = new UI //instacioamos el ui
//*-------------------------------------------------------------------- */
//EVENTLISTENER DE LA INSTANCIA UI
document.addEventListener("DOMContentLoaded",()=>{
    ui.llenarOpciones() //llamamos la funcion instanciada de ui
})

enventLisnteners()
function enventLisnteners(){
    const formulario = document.querySelector("#cotizar-seguro")
    formulario.addEventListener("submit",cotizarSeguro)
}

function cotizarSeguro(e){
    e.preventDefault()

    //leer la marca seleccioanda
    const marca = document.querySelector("#marca").value
    //leer el año seleccinado
    const year = document.querySelector("#year").value
    //leer el tipo de cobertura
    const tipo = document.querySelector('input[name="tipo"]:checked').value

    if(marca === "" || year === "" || tipo === ""){
        ui.mostrarMensaje("TODOS LOS CAMPOS SON OBLIGATORIOS","error")
    }else{
        ui.mostrarMensaje("COTIZANDO...","exito")
    }
}