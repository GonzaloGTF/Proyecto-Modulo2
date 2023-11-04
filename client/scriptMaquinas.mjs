import { idEmpresa, create, getId } from "./script.mjs";

//Pedir lista Maquinas
const getMaquinas = function () {
    fetch(`http://localhost:3000/api/maquinas/${idEmpresa}`)
        .then(response => response.json())
        .then(response => {

            //Crear tabla con datos Maquinas
            let tablaMaquinas = create("table")

            const trMaquinasTitles = create("tr")
            const thTipo = create("th")
            const thMarca = create("th")

            thTipo.textContent = "Tipo"
            thMarca.textContent = "Marca"

            trMaquinasTitles.append(thTipo, thMarca)
            tablaMaquinas.appendChild(trMaquinasTitles)

            response.forEach(maquina => {
                const trMaquinas = create("tr")
                const tdTipo = create("td")
                const tdMarca = create("td")

                tdTipo.textContent = maquina.tipo
                tdMarca.textContent = maquina.marca

                trMaquinas.append(tdTipo, tdMarca)
                tablaMaquinas.appendChild(trMaquinas)
            });

            getId("divAct").innerHTML = ""
            getId("divAct").appendChild(tablaMaquinas)

            //añadir boton NewMaquina
            const buttonNewMaquina = create("button")
            buttonNewMaquina.textContent = "Añadir maquina"
            buttonNewMaquina.id = "newMaquina"
            getId("divAddNew").innerHTML = ""
            getId("divAddNew").appendChild(buttonNewMaquina)

            getId("newMaquina").addEventListener("click", function () {
                newMaquina()
            })
        })
        .catch(error => {
            console.log(error)
        });
}

//Añadir Maquina
const newMaquina = () => {
    const h2NewMaquina = create("h2")
    const formNewMaquina = create("form")
    const selectTipo = create("select")
    const optionInicial = create("option")
    const optionFresadora = new Option("Fresadora", "Fresadora");
    const optionTorno = new Option("Torno", "Torno")
    const optionRectificadora = new Option("Rectificadora", "Rectificadora")
    const optionTaladro = new Option("Taladro", "Taladro")
    const inputMarca = create("input")
    const buttonNewMaquina = create("button")
    const error = create("p")

    h2NewMaquina.textContent = "Añadir nueva Maquina"
    formNewMaquina.id = "formNewMaquina"
    error.id = "error"

    selectTipo.name = "tipo"
    optionInicial.value = ""
    optionInicial.selected = true
    optionInicial.disabled = true
    optionInicial.required = true
    optionInicial.textContent = "Tipo de maquina"


    inputMarca.type = "text"
    inputMarca.name = "marca"
    inputMarca.placeholder = "Marca de la maquina"

    buttonNewMaquina.textContent = "Añadir"
    buttonNewMaquina.id = "buttonNewMaquina"
    selectTipo.append(optionInicial, optionFresadora, optionTorno, optionRectificadora, optionTaladro)
    formNewMaquina.append(selectTipo, inputMarca, buttonNewMaquina)

    getId("divAddNew").innerHTML = ""
    getId("divAct").innerHTML = ""
    getId("divAct").append(h2NewMaquina, formNewMaquina, error)

    getId("buttonNewMaquina").addEventListener("click", function (event) {
        event.preventDefault();

        const form = getId("formNewMaquina");
        const tipo = form.elements["tipo"].value;
        const marca = form.elements["marca"].value;

        let data = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idEmpresa, tipo, marca })
        }

        fetch("http://localhost:3000/api/maquinas/newMachine", data)
            .then(response => response.json())
            .then(response => {
                if (response?.statusCode) {
                    getId("error").textContent = response.message
                } else {
                    getMaquinas()
                }
            })
            .catch(error => {
                console.log(error)
            });

    })
}

export { getMaquinas }