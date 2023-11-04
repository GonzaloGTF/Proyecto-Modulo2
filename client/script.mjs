import { getOt } from "./scriptOt.mjs";
import { getEmpleados } from "./scriptEmpleados.mjs";
import { getMaquinas } from "./scriptMaquinas.mjs";

const getId = (id) => document.getElementById(id)
const create = (element) => document.createElement(element)

const buttonChange = getId("buttonChange");
const titleLogReg = getId("titleLogReg");
const formLogReg = getId("formLogReg");
const buttonLogReg = getId("buttonLogReg");
const resultLogReg = getId("resultLogReg");
const email = getId("email")
const registerURL = "http://localhost:3000/api/empresa/register"
const logInURL = "http://localhost:3000/api/auth/login"
let idEmpresa

//Cambio a logIn
const logInChange = function () {
    titleLogReg.textContent = "Iniciar sesión"
    formLogReg.action = logInURL
    buttonLogReg.textContent = "Iniciar sesión"
    buttonChange.textContent = "Crear nueva cuenta"
    resultLogReg.textContent = ""
    email.style.display = "none";
}

//Cambio a register
const registerChange = function () {
    titleLogReg.textContent = "Crear nueva cuenta"
    formLogReg.action = registerURL
    buttonLogReg.textContent = "Registrarse"
    buttonChange.textContent = "¿Ya tienes cuenta? Inicia sesión"
    resultLogReg.textContent = ""
    email.style.display = "block";
}

//Cambiar LogIn - Register
buttonChange.addEventListener("click", function () {
    if (titleLogReg.textContent == "Iniciar sesión") {

        registerChange()
    } else {
        logInChange()
    }
});

//Elementos HTML en header cuando LogIn
const headerHtmlLogIn = (response) => {
    const divHead = create("div")
    const userEmpresa = create("h1")
    const logOut = create("h3")

    userEmpresa.textContent = response.empresa
    userEmpresa.id = "userEmpresa"

    logOut.textContent = "Cerrar Sesión"
    logOut.id = "logOut"

    divHead.id = "divHead"

    divHead.append(userEmpresa, logOut)
    document.querySelector("header").innerHTML = ""
    document.querySelector("header").appendChild(divHead)

    getId("logOut").addEventListener("click", function () {
        window.location.href = "http://localhost:3000/";
    })
}



//Elementos HTML en main cuando LogIn
const mainHtmlLogIn = (response) => {
    const divCollection = create("div")
    const divAct = create("div")
    const divAddNew = create("div")
    const collectionOt = create("h2")
    const collectionEmpleados = create("h2")
    const collectionMaquinas = create("h2")

    collectionOt.textContent = "Ordenes de Trabajo"
    collectionOt.id = "collectionOt"
    collectionOt.classList = "noSelect"

    collectionEmpleados.textContent = "Empleados"
    collectionEmpleados.id = "collectionEmpleados"
    collectionEmpleados.classList = "noSelect"

    collectionMaquinas.textContent = "Maquinas"
    collectionMaquinas.id = "collectionMaquinas"
    collectionMaquinas.classList = "noSelect"

    divCollection.id = "divCollection"
    divAct.id = "divAct"
    divAddNew.id = "divAddNew"

    divCollection.append(collectionOt, collectionEmpleados, collectionMaquinas)

    document.querySelector("main").innerHTML = ""
    document.querySelector("main").append(divCollection, divAct, divAddNew)
    const desSelect = document.querySelector(".select")

    const replaceClass = function () {
        const desSelect = document.querySelector(".select")
        if (desSelect) {
            desSelect.classList.replace("select", "noSelect")
        }
    }

    getId("collectionOt").addEventListener("click", function () {
        replaceClass()
        collectionOt.classList = "select"
        getOt()
    })

    getId("collectionEmpleados").addEventListener("click", function () {
        replaceClass()
        collectionEmpleados.classList = "select"
        getEmpleados()
    })

    getId("collectionMaquinas").addEventListener("click", function () {
        replaceClass()
        collectionMaquinas.classList = "select"
        getMaquinas()
    })
}


//llamada a back - register y login
formLogReg.addEventListener("submit", function (event) {
    event.preventDefault(); // Evita el envío predeterminado

    const empresa = getId('empresa').value
    const password = getId("pass").value
    const email = getId("email").value

    let data = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ empresa, password, email })
    }

    if (formLogReg.action == registerURL) {
        //register
        fetch(registerURL, data)
            .then(response => response.json())
            .then(response => {
                // let objectKeys = Object.keys(response);
                // console.log(objectKeys)
                // if (objectKeys.length == 1) {

                // }
                if (response?.statusCode) {
                    console.log(response)
                    registerChange()
                    resultLogReg.textContent = response.message
                } else {
                    logInChange()
                    resultLogReg.textContent = response.message
                }
            })
            .catch(error => {
                console.log(error)
            });
    } else {
        //login
        fetch(logInURL, data)
            .then(response => response.json())
            .then(response => {
                if (response._id) {
                    idEmpresa = response._id

                    //Añadir elementos al HTML
                    headerHtmlLogIn(response)
                    mainHtmlLogIn(response)
                }

                if (response?.statusCode == 401) {
                    resultLogReg.textContent = "Empresa o contraseña incorrectas"
                }
            })
            .catch(error => {
                console.log(error)
            });
    }
});


export { idEmpresa, create, getId }