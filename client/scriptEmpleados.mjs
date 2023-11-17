import { idEmpresa, create, getId } from "./script.mjs";

//Pedir lista Empleados
const getEmpleados = function () {
    fetch(`http://localhost:3000/api/empleados/${idEmpresa}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
        .then(response => {

            //Crear tabla con datos Empleados
            let tablaEmpleados = create("table")

            const trEmpleadosTitles = create("tr")
            const thNombre = create("th")
            const thApellido = create("th")
            const thTipoTrabajo = create("th")
            const thCategoria = create("th")
            const thEliminar = create("th")
            const buttonEliminar = create("button")

            thNombre.textContent = "Nombre"
            thApellido.textContent = "Apellido"
            thTipoTrabajo.textContent = "Tipo de trabajo"
            thCategoria.textContent = "Categoria"
            buttonEliminar.textContent = "Eliminar"
            buttonEliminar.classList = "buttonDelete"

            thEliminar.appendChild(buttonEliminar)
            trEmpleadosTitles.append(thNombre, thApellido, thTipoTrabajo, thCategoria, thEliminar)
            tablaEmpleados.appendChild(trEmpleadosTitles)

            response.forEach((empleado, i) => {
                const trEmpleados = create("tr")
                const tdNombre = create("td")
                const tdApellido = create("td")
                const tdTipoTrabajo = create("td")
                const tdCategoria = create("td")
                const tdEliminar = create("td")
                const tdCheckEliminar = create("checkbox")
                const checkbox = create("input");

                tdNombre.textContent = empleado.nombre
                tdApellido.textContent = empleado.apellido
                tdTipoTrabajo.textContent = empleado.tipoTrabajo
                tdCategoria.textContent = empleado.categoria

                checkbox.type = "checkbox";
                checkbox.id = i
                checkbox.classList = "inputEliminar"

                tdCheckEliminar.appendChild(checkbox);
                tdEliminar.appendChild(tdCheckEliminar)
                trEmpleados.append(tdNombre, tdApellido, tdTipoTrabajo, tdCategoria, tdEliminar)
                tablaEmpleados.appendChild(trEmpleados)
            });

            getId("divAct").innerHTML = ""
            getId("divAct").appendChild(tablaEmpleados)

            //Despedir Seleccionados
            buttonEliminar.addEventListener("click", () => {
                despedirEmpleado(response)
            })

            //añadir boton NewEmpleado
            const buttonNewEmpleado = create("button")
            buttonNewEmpleado.textContent = "Contratar nuevo empleado"
            buttonNewEmpleado.id = "newEmpleado"
            buttonNewEmpleado.classList = "addNew"
            getId("divAddNew").innerHTML = ""
            getId("divAddNew").appendChild(buttonNewEmpleado)

            getId("newEmpleado").addEventListener("click", function () {
                newEmpleado()
            })
        })
        .catch(error => {
            console.log(error)
        });
}

//Contratar Empleado
const newEmpleado = () => {
    const h2NewEmpleado = create("h2")
    const formNewEmpleado = create("form")
    const inputNombre = create("input")
    const inputApellido = create("input")
    const inputTipoTrabajo = create("input")
    const buttonNewEmpleado = create("button")
    const selectCategoria = create("select")
    const optionInicial = create("option")
    const optionJefe = new Option("Jefe de taller", "Jefe de taller");
    const optionOficial1 = new Option("Oficial de 1ª", "Oficial de 1ª");
    const optionOficual2 = new Option("Oficial de 2ª", "Oficial de 2ª")
    const optionOficial3 = new Option("Oficial de 3ª", "Oficial de 3ª")
    const error = create("p")

    selectCategoria.name = "categoria"
    selectCategoria.classList = "selectAddNew"

    optionInicial.value = ""
    optionInicial.selected = true
    optionInicial.disabled = true
    optionInicial.required = true
    optionInicial.textContent = "Categoría profesional"

    h2NewEmpleado.textContent = "Contratar nuevo trabajador"
    h2NewEmpleado.classList = "addNewTitle"

    formNewEmpleado.id = "formNewEmpleado"
    formNewEmpleado.classList = "formNew"

    inputNombre.type = "text"
    inputNombre.name = "nombre"
    inputNombre.placeholder = "Nombre"
    inputNombre.required = true;

    inputApellido.type = "text"
    inputApellido.name = "apellido"
    inputApellido.placeholder = "Apellido"
    inputApellido.required = true;

    inputTipoTrabajo.type = "text"
    inputTipoTrabajo.name = "tipoTrabajo"
    inputTipoTrabajo.placeholder = "Tipo de trabajo"
    inputTipoTrabajo.required = true;

    error.id = "error"

    buttonNewEmpleado.textContent = "Contratar"
    buttonNewEmpleado.classList = "buttonAddNew"
    buttonNewEmpleado.id = "buttonNewEmpleado"

    selectCategoria.append(optionInicial, optionJefe, optionOficial1, optionOficual2, optionOficial3)
    formNewEmpleado.append(inputNombre, inputApellido, inputTipoTrabajo, selectCategoria, buttonNewEmpleado, error)

    getId("divAddNew").innerHTML = ""
    getId("divAct").innerHTML = ""
    getId("divAct").append(h2NewEmpleado, formNewEmpleado)

    getId("buttonNewEmpleado").addEventListener("click", function (event) {
        event.preventDefault();

        const form = getId("formNewEmpleado");
        const nombre = form.elements["nombre"].value;
        const apellido = form.elements["apellido"].value;
        const tipoTrabajo = form.elements["tipoTrabajo"].value;
        const categoria = form.elements["categoria"].value;

        let data = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idEmpresa, nombre, apellido, tipoTrabajo, categoria })
        }

        fetch("http://localhost:3000/api/empleados/newEmployee", data)
            .then(response => response.json())
            .then(response => {
                if (response?.statusCode) {
                    getId("error").textContent = response.message
                } else {
                    getEmpleados()
                }
            })
            .catch(error => {
                console.log(error)
            });

    })
}

//Eliminar Empleado

let despedirEmpleado = (response) => {

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
        fetch(`http://localhost:3000/api/empleados/despedir/${realId}`, data)
            .then(response => response.text())
            .then(response => {
                getEmpleados()
            })
            .catch(e => console.log(e))
    })
};


export { getEmpleados }