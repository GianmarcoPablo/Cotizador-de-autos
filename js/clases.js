class Seguro{
    constructor(marca,year,tipo){
        this.marca = marca
        this.year = year
        this.tipo = tipo
    }
    cotizarSeguro(){
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

        if(this.tipo === "basico"){
            cantidad *= 1.30
        }else{
            cantidad *= 1.50
        }
        return cantidad
    }
}

class UI{
    llenarOpciones(){
        const max = new Date().getFullYear()
        const min = max - 20
        for(let i = max; i > min; i--){
            const option = document.createElement("option")
            option.textContent = i
            option.value = i
            const year = document.querySelector("#year")
            year.appendChild(option)
        }
    }
    mostrarMensaje(mensaje,tipo){
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
        setTimeout(()=>{
            div.remove()
        },3000)
        if(errores.length === 0){
            formulario.insertBefore(div,document.querySelector("#resultado"))
        }
    }
    mostrarResultados(seguro,total){
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
            <p class="header">Tu resumen:</p>
            <p class="font-bold"> <span class="font-normal">Marca: ${textoMarca}</span></p>
            <p class="font-bold"> <span class="font-normal">Año: ${year}</span></p>
            <p class="font-bold"> <span class="font-normal">Tipo: ${tipo}</span></p>
            <p class="font-bold"> <span class="font-normal">$ ${total}</span></p>
        `
        const resultado = document.querySelector("#resultado")
        const spinner = document.querySelector("#cargando")
        spinner.style.display = "flex"
        setTimeout(() => {
            spinner.style.display = "none"
            resultado.appendChild(div)
        }, 3000);
    }
}

const ui = new UI

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

    if(marca === "" || year === "" || tipo ===""){
        ui.mostrarMensaje("Todos los campos son obligatorios","error")
    }else{
        ui.mostrarMensaje("Cotizando...","exito")
        const seguro = new Seguro(marca,year,tipo)
        const total =  seguro.cotizarSeguro()
        ui.mostrarResultados(seguro,total)
        const resultado = document.querySelector("#resultado")
        while(resultado.firstChild){
            resultado.removeChild(resultado.firstChild)
        }
    }
}
