
/*  ARREGLO INICIAL DE ESTUDIANTES  */

let estudiantes = [

    {
        matricula: "20260001",
        apellidos: "López Hernández",
        nombres: "Ana María",
        fechaNacimiento: "2005-04-15",
        carrera: "Computación"
    },

    {
        matricula: "20260002",
        apellidos: "García Pérez",
        nombres: "Luis Fernando",
        fechaNacimiento: "2004-09-22",
        carrera: "Matemáticas"
    }

];


/*  REFERENCIAS A ELEMENTOS HTML  */

const formulario = document.getElementById("formEstudiante");

const tabla = document.getElementById("tablaEstudiantes");

const contenedorTarjetas =
    document.getElementById("contenedorTarjetas");


/*  FUNCIÓN PARA FORMATEAR FECHAS  */

function formatearFecha(fecha) {

    const [anio, mes, dia] = fecha.split("-");

    return `${dia}/${mes}/${anio}`;

}


/*  FUNCIÓN PARA CREAR UNA CELDA  */

function crearCelda(valor) {

    const td = document.createElement("td");

    td.textContent = valor;

    return td;

}


/*  FUNCIÓN PARA CREAR BOTÓN ELIMINAR  */

function crearBotonEliminar(matricula) {

    const boton = document.createElement("button");

    boton.textContent = "Eliminar";

    boton.classList.add("btn-eliminar");

    boton.type = "button";

    boton.dataset.matricula = matricula;

    return boton;

}


/*  GENERAR TABLA DE ESTUDIANTES  */

function mostrarTabla() {

    // Limpiar contenido anterior
    tabla.innerHTML = "";

    // Recorrer el arreglo
    estudiantes.forEach(estudiante => {

        const fila = document.createElement("tr");

        // Crear celdas
        fila.appendChild(crearCelda(estudiante.matricula));

        fila.appendChild(crearCelda(estudiante.apellidos));

        fila.appendChild(crearCelda(estudiante.nombres));

        fila.appendChild(
            crearCelda(formatearFecha(estudiante.fechaNacimiento))
        );

        fila.appendChild(crearCelda(estudiante.carrera));

        // Celda de acciones
        const celdaAcciones = document.createElement("td");

        celdaAcciones.appendChild(
            crearBotonEliminar(estudiante.matricula)
        );

        fila.appendChild(celdaAcciones);

        // Agregar fila a la tabla
        tabla.appendChild(fila);

    });

    // Mostrar mensaje si no existen estudiantes
    if (estudiantes.length === 0) {

        const fila = document.createElement("tr");

        const celda = document.createElement("td");

        celda.colSpan = 6;

        celda.textContent = "No hay estudiantes registrados.";

        fila.appendChild(celda);

        tabla.appendChild(fila);

    }

}


/*  GENERAR TARJETAS DE ESTUDIANTES  */

function mostrarTarjetas() {

    // Limpiar tarjetas anteriores
    contenedorTarjetas.innerHTML = "";

    // Recorrer estudiantes
    estudiantes.forEach(estudiante => {

        // Crear tarjeta
        const tarjeta = document.createElement("article");

        tarjeta.classList.add("tarjeta");

        // Nombre completo
        const titulo = document.createElement("h3");

        titulo.textContent =
            estudiante.nombres + " " + estudiante.apellidos;

        // Datos del estudiante
        const matricula = document.createElement("p");

        matricula.textContent =
            "Matrícula: " + estudiante.matricula;

        const fecha = document.createElement("p");

        fecha.textContent =
            "Fecha de nacimiento: " +
            formatearFecha(estudiante.fechaNacimiento);

        const carrera = document.createElement("p");

        carrera.textContent =
            "Carrera: " + estudiante.carrera;

        // Botón eliminar
        const boton = crearBotonEliminar(estudiante.matricula);

        // Construir tarjeta
        tarjeta.appendChild(titulo);

        tarjeta.appendChild(matricula);

        tarjeta.appendChild(fecha);

        tarjeta.appendChild(carrera);

        tarjeta.appendChild(boton);

        // Insertar tarjeta
        contenedorTarjetas.appendChild(tarjeta);

    });

}


/*  ACTUALIZAR TODA LA INTERFAZ  */

function actualizarInterfaz() {

    mostrarTabla();

    mostrarTarjetas();

}


/*  REGISTRAR UN NUEVO ESTUDIANTE  */

formulario.addEventListener("submit", function(event) {

    // Evitar recargar la página
    event.preventDefault();

    // Obtener datos del formulario
    const matricula =
        document.getElementById("matricula").value.trim();

    const apellidos =
        document.getElementById("apellidos").value.trim();

    const nombres =
        document.getElementById("nombres").value.trim();

    const fechaNacimiento =
        document.getElementById("fechaNacimiento").value;

    const carrera =
        document.getElementById("carrera").value;

    // Verificar si la matrícula ya existe
    const existe = estudiantes.some(estudiante =>
        estudiante.matricula === matricula
    );

    if (existe) {

        alert("La matrícula ya se encuentra registrada.");

        return;

    }

    // Crear objeto estudiante
    const nuevoEstudiante = {

        matricula: matricula,

        apellidos: apellidos,

        nombres: nombres,

        fechaNacimiento: fechaNacimiento,

        carrera: carrera

    };

    // Agregar al arreglo
    estudiantes.push(nuevoEstudiante);

    // Actualizar tabla y tarjetas
    actualizarInterfaz();

    // Limpiar formulario
    formulario.reset();

    alert("Estudiante registrado correctamente.");

});


/*  ELIMINAR ESTUDIANTES  */

// Utilizar delegación de eventos para ambos contenedores

function eliminarEstudiante(event) {

    // Comprobar si se presionó un botón eliminar
    if (!event.target.matches(".btn-eliminar")) {

        return;

    }

    // Obtener matrícula del botón
    const matricula = event.target.dataset.matricula;

    // Buscar estudiante
    const estudiante = estudiantes.find(est =>
        est.matricula === matricula
    );

    if (!estudiante) {

        return;

    }

    // Confirmar eliminación
    const confirmar = confirm(
        `¿Desea eliminar a ${estudiante.nombres} ${estudiante.apellidos}?`
    );

    if (!confirmar) {

        return;

    }

    // Eliminar del arreglo
    estudiantes = estudiantes.filter(est =>
        est.matricula !== matricula
    );

    // Actualizar la interfaz
    actualizarInterfaz();

}


// Escuchar eventos en la tabla
tabla.addEventListener("click", eliminarEstudiante);


// Escuchar eventos en las tarjetas
contenedorTarjetas.addEventListener("click", eliminarEstudiante);


/*  INICIALIZAR APLICACIÓN  */

 actualizarInterfaz();
