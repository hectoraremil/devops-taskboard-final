const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");


async function cargarTareas() {
    const response = await fetch("/api/tasks");
    const tareas = await response.json();

    taskList.innerHTML = "";

    tareas.forEach((tarea) => {

        const li = document.createElement("li");

        const texto = document.createElement("span");
        texto.textContent = tarea.title;

        const boton = document.createElement("button");
        boton.textContent = "Eliminar";

        boton.addEventListener("click", async () => {

            await fetch(`/api/tasks/${tarea._id}`, {
                method: "DELETE"
            });

            cargarTareas();
        });

        li.appendChild(texto);
        li.appendChild(boton);

        taskList.appendChild(li);
    });
}


form.addEventListener("submit", async (event) => {

    event.preventDefault();

    await fetch("/api/tasks", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            title: input.value
        })

    });

    input.value = "";

    cargarTareas();
});


cargarTareas();