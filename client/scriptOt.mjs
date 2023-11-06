import { idEmpresa, create, getId } from "./script.mjs";

//crear tabla con datos Ot
const tableCreate = function (response) {
    let tablaOt = create("table")

    const trOtTitles = create("tr")
    const thOt = create("th")
    const thLinea = create("th")
    const thCliente = create("th")
    const thTiempoEstimado = create("th")
    //const thTiempoTotal = create("th")
    const thEstado = create("th")

    thOt.textContent = "OT"
    thLinea.textContent = "Linea"
    thCliente.textContent = "Cliente"
    thTiempoEstimado.textContent = "Tiempo Estimado (h)"
    // thTiempoTotal.textContent = "Tiempo Total (h)"
    thEstado.textContent = "Estado"

    trOtTitles.append(thOt, thLinea, thCliente, thTiempoEstimado, /*thTiempoTotal,*/ thEstado)
    tablaOt.appendChild(trOtTitles)

    response.forEach((ot, i) => {
        const trOt = create("tr")
        const tdOt = create("td")
        const tdLinea = create("td")
        const tdCliente = create("td")
        const tdTiempoEstimado = create("td")
        //const tdTiempoTotal = create("td")
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
                    selectEstado.classList.add("Enproceso", "estado")
                    // const startTime = new Date().getTime();
                    // startTimer(tdTiempoTotal, startTime);
                } else {
                    trOt.classList = ot.estado
                    selectEstado.classList.add(ot.estado, "estado")
                }
            }
        })

        tdOt.textContent = ot.ot
        tdLinea.textContent = ot.linea
        tdCliente.textContent = ot.cliente
        tdTiempoEstimado.textContent = ot.tiempoEstimado
        //tdTiempoTotal.textContent = ot.tiempoTotal

        //Cambio estado + tiempo
        selectEstado.onchange = function () {
            const estadoValue = selectEstado.value;
            const corteId = selectEstado.id.substring(2)
            const realId = response[corteId]._id
            // if (estadoValue !== "En proceso") {
            //     clearInterval(tdTiempoTotal.dataset.timerId); // Detener el temporizador
            // }
            actualizarEstado(realId, estadoValue)
        };

        tdEstado.appendChild(selectEstado)
        selectEstado.append(optionEstado1, optionEstado2, optionEstado3, optionEstado4)
        trOt.append(tdOt, tdLinea, tdCliente, tdTiempoEstimado, /*tdTiempoTotal,*/ tdEstado)
        tablaOt.appendChild(trOt)
    });

    getId("divAct").innerHTML = ""
    getId("divAct").appendChild(tablaOt)

    //añadir boton AddNewOt + buscador
    const buttonAddNewOt = create("button")
    const buttonSearch = create("button")
    const inputSearch = create("input")
    const divSearch = create("div")

    buttonAddNewOt.textContent = "Nueva Orden de Trabajo"
    buttonAddNewOt.id = "addNewOt"
    buttonAddNewOt.classList = "addNew"

    buttonSearch.innerHTML = "&#x2315;"
    buttonSearch.id = "search"

    inputSearch.placeholder = "Buscar OT"
    inputSearch.id = "searchHolder"
    inputSearch.name = "search"
    inputSearch.type = "number"

    divSearch.append(inputSearch, buttonSearch)
    getId("divAddNew").innerHTML = ""
    getId("divAddNew").append(divSearch, buttonAddNewOt)

    getId("addNewOt").addEventListener("click", function () {
        addNewOt()
    })

    getId("search").addEventListener("click", function () {
        findOt()
    })
}

//Pedir lista OTs
const getOt = function () {
    fetch(`http://localhost:3000/api/ot/${idEmpresa}`)
        .then(response => response.json())
        .then(response => {
            tableCreate(response)
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
    h2AddNewOt.classList = "addNewTitle"

    formAddNewOt.id = "formAddNewOt"
    formAddNewOt.classList = "formNew"

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
    buttonAddNewOt.classList = "buttonAddNew"

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

    let data = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, estado })
    }

    fetch(`http://localhost:3000/api/ot/estado/${id}/${estado}`, data)
        .then(response => response.text())
        .then(response => {
            getOt()
        })
        .catch(e => console.log(e))
}

//Buscar Ot
const findOt = function () {
    const ot = getId("searchHolder").value

    fetch(`http://localhost:3000/api/ot/${idEmpresa}/${ot}`)
        .then(response => response.json())
        .then(response => {
            if (response.length == 0) {
                getId("divAct").innerHTML = `
                <p id=error> No se ha encontrado ninguna OT ${ot}</p>`

            } else {
                tableCreate(response)
            }
        })
        .catch(error => {
            console.log(error)
        });
    fetch
}






//Temporizador
// function startTimer(tdTiempoTotal, startTime) {
//     const interval = 1000; // Intervalo de 1 segundo

//     function updateTimer() {
//         const currentTime = new Date().getTime();
//         const elapsedTime = (currentTime - startTime) / 3600000; // Tiempo transcurrido en horas
//         tdTiempoTotal.textContent = elapsedTime.toFixed(2); // Actualiza el tiempo en la fila
//         console.log(elapsedTime)
//         //Envía el tiempo transcurrido al backend

//         let data = {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ elapsedTime })
//         }


//         fetch(`http://localhost:3000/api/ot/tiempo/15516/${elapsedTime}`, data)
//             .then(response => {
//                 // Manejar la respuesta del servidor si es necesario
//             })
//             .catch(error => {
//                 console.error("Error al enviar el tiempo transcurrido al servidor: " + error);
//             });
//     }

//     // Iniciar el temporizador
//     const timerId = setInterval(updateTimer, interval);

//     // Almacenar el ID del temporizador en la fila (puedes usar un atributo personalizado)
//     tdTiempoTotal.dataset.timerId = timerId;
// }



export { getOt }