import { idEmpresa, create, getId } from "./script.mjs";

//Pedir lista OTs
const getOt = function () {
    fetch(`http://localhost:3000/api/ot/${idEmpresa}`)
        .then(response => response.json())
        .then(response => {

            //Crear tabla con datos Ot
            let tablaOt = create("table")

            const trOtTitles = create("tr")
            const thOt = create("th")
            const thLinea = create("th")
            const thCliente = create("th")
            const thTiempoEstimado = create("th")
            const thTiempoTotal = create("th")
            const thEstado = create("th")

            thOt.textContent = "OT"
            thLinea.textContent = "Linea"
            thCliente.textContent = "Cliente"
            thTiempoEstimado.textContent = "Tiempo Estimado (h)"
            thTiempoTotal.textContent = "Tiempo Total (h)"
            thEstado.textContent = "Estado"

            trOtTitles.append(thOt, thLinea, thCliente, thTiempoEstimado, thTiempoTotal, thEstado)
            tablaOt.appendChild(trOtTitles)

            response.forEach((ot, i) => {
                const trOt = create("tr")
                const tdOt = create("td")
                const tdLinea = create("td")
                const tdCliente = create("td")
                const tdTiempoEstimado = create("td")
                const tdTiempoTotal = create("td")
                const tdEstado = create("td")

                const selectEstado = create("select")
                const optionEstado1 = new Option("Completado", "Completado");
                const optionEstado2 = new Option("En proceso", "En proceso");
                const optionEstado3 = new Option("Parado", "Parado")
                const optionEstado4 = new Option("Pendiente", "Pendiente")
                const optionArray = [optionEstado1, optionEstado2, optionEstado3, optionEstado4]

                selectEstado.id = "id" + i
                optionArray.forEach(option => {
                    if (option.value == ot.estado) {
                        option.selected = true
                        if (ot.estado == "En proceso") {
                            trOt.classList = "Enproceso"
                            selectEstado.classList = "Enproceso"
                        } else {
                            trOt.classList = ot.estado
                            selectEstado.classList = ot.estado
                        }
                    }

                })

                tdOt.textContent = ot.ot
                tdLinea.textContent = ot.linea
                tdCliente.textContent = ot.cliente
                tdTiempoEstimado.textContent = ot.tiempoEstimado
                tdTiempoTotal.textContent = ot.tiempoTotal
                tdEstado.textContent = ot.estado

                selectEstado.onchange = function () {
                    const estadoValue = selectEstado.value;
                    const corteId = selectEstado.id.substring(2)
                    const realId = response[corteId]._id
                    actualizarEstado(realId, estadoValue)
                };

                selectEstado.append(optionEstado1, optionEstado2, optionEstado3, optionEstado4)
                trOt.append(tdOt, tdLinea, tdCliente, tdTiempoEstimado, tdTiempoTotal, selectEstado)
                tablaOt.appendChild(trOt)
            });

            getId("divAct").innerHTML = ""
            getId("divAct").appendChild(tablaOt)

            //añadir boton AddNewOt
            const buttonAddNewOt = create("button")
            buttonAddNewOt.textContent = "Nueva Orden de Trabajo"
            buttonAddNewOt.id = "addNewOt"
            getId("divAddNew").innerHTML = ""
            getId("divAddNew").appendChild(buttonAddNewOt)

            getId("addNewOt").addEventListener("click", function () {
                addNewOt()
            })
        })
        .catch(error => {
            console.log(error)
        });
}

//Añadir Ot nueva
const addNewOt = () => {
    const h2AddNewOt = create("h2")
    const formAddNewOt = create("form")
    const inputOt = create("input")
    const inputLinea = create("input")
    const inputCliente = create("input")
    const inputTiempoEstimado = create("input")
    const buttonAddNewOt = create("button")
    const error = create("p")

    h2AddNewOt.textContent = "Añadir nueva Orden de Trabajo"
    formAddNewOt.id = "formAddNewOt"

    inputOt.type = "number"
    inputOt.name = "ot"
    inputOt.placeholder = "Orden de Trabajo"
    inputOt.required = true;

    inputLinea.type = "number"
    inputLinea.name = "linea"
    inputLinea.placeholder = "Linea"
    inputLinea.required = true;

    inputCliente.type = "text"
    inputCliente.name = "cliente"
    inputCliente.placeholder = "Cliente"
    inputCliente.required = true;

    inputTiempoEstimado.type = "number"
    inputTiempoEstimado.name = "tiempoEstimado"
    inputTiempoEstimado.placeholder = "Tiempo estimado en horas"

    buttonAddNewOt.textContent = "Añadir"
    buttonAddNewOt.id = "buttonAddNewOt"

    error.id = "error"

    formAddNewOt.append(inputOt, inputLinea, inputCliente, inputTiempoEstimado, buttonAddNewOt, error)

    getId("divAddNew").innerHTML = ""
    getId("divAct").innerHTML = ""
    getId("divAct").append(h2AddNewOt, formAddNewOt)

    getId("buttonAddNewOt").addEventListener("click", function (event) {
        event.preventDefault();

        const form = getId("formAddNewOt");
        const ot = form.elements["ot"].value;
        const linea = form.elements["linea"].value;
        const cliente = form.elements["cliente"].value;
        const tiempoEstimado = form.elements["tiempoEstimado"].value;

        let data = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idEmpresa, ot, linea, cliente, tiempoEstimado })
        }

        fetch("http://localhost:3000/api/ot/newOT", data)
            .then(response => response.json())
            .then(response => {
                if (response?.statusCode) {
                    getId("error").textContent = response.message
                } else {
                    getOt()
                }
            })
            .catch(error => {
                console.log(error)
            });

    })
}

//Actualizar el estado
const actualizarEstado = function (id, estado) {

    console.log(estado)
    console.log(id)
    let data = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, estado })
    }
    console.log(id)
    console.log(estado)
    fetch(`http://localhost:3000/api/ot/estado/${id}/${estado}`, data)
        .then(response => response.text())
        .then(response => {
            getOt()
        })
        .catch(e => console.log(e))
}



export { getOt }