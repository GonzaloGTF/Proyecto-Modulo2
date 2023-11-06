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
            const thEliminar = create("th")
            const buttonEliminar = create("button")

            thTipo.textContent = "Tipo"
            thMarca.textContent = "Marca"
            buttonEliminar.textContent = "Eliminar"
            buttonEliminar.classList = "buttonDelete"

            thEliminar.appendChild(buttonEliminar)
            trMaquinasTitles.append(thTipo, thMarca, thEliminar)
            tablaMaquinas.appendChild(trMaquinasTitles)

            response.forEach((maquina, i) => {
                const trMaquinas = create("tr")
                const tdTipo = create("td")
                const tdMarca = create("td")
                const tdEliminar = create("td")
                const tdCheckEliminar = create("checkbox")
                const checkbox = create("input");

                tdTipo.textContent = maquina.tipo
                tdMarca.textContent = maquina.marca

                checkbox.type = "checkbox";
                checkbox.id = i
                checkbox.classList = "inputEliminar"

                tdCheckEliminar.appendChild(checkbox);
                tdEliminar.appendChild(tdCheckEliminar)
                trMaquinas.append(tdTipo, tdMarca, tdEliminar)
                tablaMaquinas.appendChild(trMaquinas)
            });

            getId("divAct").innerHTML = ""
            getId("divAct").appendChild(tablaMaquinas)

            //Eliminar Seleccionados
            buttonEliminar.addEventListener("click", () => {
                eliminarMaquina(response)
            })

            //añadir boton NewMaquina
            const buttonNewMaquina = create("button")
            buttonNewMaquina.textContent = "Añadir maquina"
            buttonNewMaquina.id = "newMaquina"
            buttonNewMaquina.classList = "addNew"
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
    h2NewMaquina.classList = "addNewTitle"

    formNewMaquina.id = "formNewMaquina"
    formNewMaquina.classList = "formNew"

    error.id = "error"

    selectTipo.name = "tipo"
    selectTipo.classList = "selectAddNew"

    optionInicial.value = ""
    optionInicial.selected = true
    optionInicial.disabled = true
    optionInicial.required = true
    optionInicial.textContent = "Tipo de maquina"


    inputMarca.type = "text"
    inputMarca.name = "marca"
    inputMarca.placeholder = "Marca de la maquina"

    buttonNewMaquina.textContent = "Añadir"
    buttonNewMaquina.classList = "buttonAddNew"
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


//Eliminar Maquina

let eliminarMaquina = (response) => {

    const checkboxes = document.querySelectorAll("input[type=checkbox]");
    let idEliminate = []
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            idEliminate.push(checkbox.id)
        }
    });

    idEliminate.forEach(num => {
        const realId = response[num]._id

        let data = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ realId })
        }
        fetch(`http://localhost:3000/api/maquinas/eliminar/${realId}`, data)
            .then(response => response.text())
            .then(response => {
                getMaquinas()
            })
            .catch(e => console.log(e))
    })
};
export { getMaquinas }