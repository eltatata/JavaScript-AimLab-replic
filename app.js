// obtener el objetivo desde el HTML
const objective = document.getElementById("objective");
// obtener el contenedor del modal
const containerModal = document.querySelector(".container-modal");

// dar estilos al objetivo
objective.style = "position: absolute;right: 50%;top: 600px;color: white;font-size: 40px;background: rgb(0, 106, 255);width: 35px;height: 35px;border-radius: 100%;display: flex;justify-content: center;align-items: center;cursor: all-scroll;transition: all 0.3s;";

// declarar la variables de tiempo y puntos
time = 60;
points = 0;

// declarar la variables de las codenadas
maxWidth = 0;
maxHeight = 0;

// funcion para abrir modal con los resultados del jugador
const openModal = (p) => {
    let rating;
    
    // saber cual es el rango del jugador
    if (p < 50) {
        rating = "Junior";
    } else if(p >= 50 && p <=70) {
        rating = "Midle";
    } else if (p > 70) {
        rating = "Senior";
    }

    // html del modal
    const htmlModal =   `<div id="modal">
                            <h2>Your results:</h2>
                            <p id="points-result">Your points: ${p}</p>
                            <p id="ratings">Your rating: ${rating}</p>
                        </div>
                        <button id="close">close</button>`;

    // agrgar los elementos al modal y mostraLo                        
    containerModal.style.display = "flex";
    containerModal.innerHTML += htmlModal;
}

addEventListener("keydown", (e)=> {
    // saber si se presiono |space| para inicializar el juego
    if (e.code == "Space") {
        // ocultar los textos de instruciones

        document.querySelector(".explanation-game").style.display = "none";
        // -------------------------------------------------------------------------------
        // CODIGO PARA SUMAR LOS PUNTOS

        objective.addEventListener("click", ()=> {
            points++;
            // mostrar la cantidad de puntos que tiene el jugador
            document.getElementById("points").textContent = `Points: ${points}`;

            maxWidth = Math.round(Math.random() * (500 - -500) + -500);
            maxHeight = Math.round(Math.random() * (250 - -550) + -550);

            // cuando se hace shot en el objective mostrar de colo red
            objective.style.backgroundColor = "red";

            // volver a mostrar de colo azul
            setTimeout(() => {
                objective.style.backgroundColor = "rgb(0, 106, 255)";
            }, 200);

            // dar las cordenadas al objective
            objective.style.marginRight  = maxWidth + "px"; 
            objective.style.marginTop = maxHeight + "px"; 
        });
        // -------------------------------------------------------------------------------
        // FUNCION PARA RESTAR EL TIEMPO

        setInterval(async () => {
            if (0 < time) {
                time--;

                // mostrar el tiempo que tiene
                document.getElementById("time").textContent = `Time: ${time}`;

                // si el tiempo finaliza:
                if(time == 0) {
                    // mostrar que se acabo el tiempo
                    document.getElementById("time").innerHTML = "<b class='end-msg'>END</b>";

                    // depues de x tiempo mostrar los valores predeterminados
                    setTimeout(() => {
                        document.getElementById("time").innerHTML = "Time 1:00";
                        document.getElementById("points").textContent = `Points: 000`;
                    }, 1000);

                    // abrir el modal
                    openModal(points);

                    // funcion de cuando se cierra el modal
                    document.getElementById("close").addEventListener("click", ()=> {
                        containerModal.style.animation = "1s Disappear forwards";

                        // y cuado todo finalize despues de 1 segundo recargar la pagina
                        setTimeout(() => {
                            location.reload();
                        }, 1000);
                    }) 

                }
            }
        }, 1000);
    }
})