var usuarios = [];
var categorias = [];
var preguntas = [];
var indicePregunta = 0;
var verdad = false;

const json = {
    coronas: 5,
    id: 6,
    imagenPerfil: "profile-pics/goku.jpg",
    nombre: "Josue",
    resultados:[{aprobada:false, category: 1, correctas: 4, incorrectas:1}],
    vidas: 4
}

const guardarUsuarios = async () => {
    let respuesta = await fetch("http://localhost:3001/usuarios/",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(json)
    }
    );
    usuarioGuardado = await respuesta.json();
    console.log(usuarioGuardado);
    // renderizarUsuarios();
}
guardarUsuarios();

const cargarUsuarios = async () => {
    let respuesta = await fetch("http://localhost:3001/usuarios/",
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }
    );
    usuarios = await respuesta.json();
    console.log(usuarios);
    renderizarUsuarios();
}
cargarUsuarios();

const renderizarUsuarios = () => {
    usuarios.forEach(usuario=> {
        document.getElementById('prueba').innerHTML +=
        `
        <div id="usuarios-p3" onclick="mostrarCategorias(${usuario.id})">
            <div><img  id="imag-usuarios"src="../Imagenes/${usuario.imagenPerfil}" alt=""></div>
            <div id="nombre-usuarios">${usuario.nombre}</div>
        </div>
        `
    });
}

const mostrarCategorias = async (idUsuario) => {
    document.getElementById('pantalla-3').style.display = 'none';
    document.getElementById('pantalla-1').style.display = 'block';
    document.getElementById('pantalla-2').style.display = 'none';
    document.getElementById('agregarUsuario').style.display = 'none';
    document.getElementById('botonUsuario').style.display = 'none';
    
    console.log("Id usuario", idUsuario);
}




const cargarCategorias = async () => {
    let respuesta = await fetch("http://localhost:3001/categorias",
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }
    );
    categorias = await respuesta.json();
    console.log(categorias);
    renderizarCategorias();
}
cargarCategorias();


const renderizarCategorias = () => {
    document.getElementById('categorias').innerHTML = '';

    categorias.forEach(categoria => {
        document.getElementById('categorias').innerHTML +=
        `
        <div class="cat" onclick="mostrarPreguntas(${categoria.id})">
            <div id="imagen-categoria"><i class="${categoria.icono} cat" style="color: #ffffff;"></i></div>
            <div id="nombre-categoria">${categoria.nombre}</div>
        </div>
        `
    });
    
}

const mostrarUsuarios = (indice) =>  {
    document.getElementById('pantalla-1').style.display = 'none';
    document.getElementById('pantalla-3').style.display = 'block';
    document.getElementById('pantalla-2').style.display = 'none';
    document.getElementById('agregarUsuario').style.display = 'none';
    document.getElementById('botonUsuario').style.display = 'block';

    let id = indice+1;
    console.log("Id categoria",id);
}



const cargarPreguntasCategoria = async (indice) => {
    let respuesta = await fetch(`http://localhost:3001/categorias/${indice}/preguntas`,
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }
    );
    let preguntasC = await respuesta.json();
    
    return preguntasC;
}


const mostrarPreguntas = async (idCategoria) => {
    document.getElementById('pantalla-1').style.display = 'none';
    document.getElementById('pantalla-3').style.display = 'none';
    document.getElementById('pantalla-2').style.display = 'block';
    document.getElementById('agregarUsuario').style.display = 'none';
    document.getElementById('botonUsuario').style.display = 'none';

    console.log('Id categoria: ', idCategoria);
    preguntas = await cargarPreguntasCategoria(idCategoria);
    renderizarPregunta(preguntas[indicePregunta]);
    
    console.log('Preguntas',preguntas);
    
}

const renderizarPregunta = (pregunta) => {
    let contador=0;
    document.getElementById('palabras').innerHTML = '';
        
        let htmlRespuesta = "";
        contador++;
        console.log('contador1',contador);
        pregunta.respuestas.forEach((respuesta,indice) => {
            htmlRespuesta += `<div class="cards" onclick="verificarRespuesta(${indice}, ${pregunta.id})" ><p>${respuesta.palabra}</p></div>`
        });

                document.getElementById('palabras').innerHTML =
                `
                <div id="preguntas">
                    <div id="texto">
                        <p>1/3</p>
                        <p>Traduce la siguiente palabra: </p>
                        <p>${pregunta.palabra}</p>
                    </div>
                </div> 
                <div>
                    <div id="cuadros">
                        ${htmlRespuesta}
                    </div>
                </div>

                <button id="continuar" onclick="renderizarSiguiente()">Continuar</button>
                ` 
}

// const renderizarPregunta = (pregunta) => {
//     document.getElementById('palabras').innerHTML = '';
//     let cont = 0;

//         let htmlRespuesta = "";
//         cont++;
//         pregunta.respuestas.forEach((respuesta,indice) => {
//             htmlRespuesta += `<div class="cards" onclick="verificarRespuesta(${indice},${cont})" ><p>${respuesta.palabra}</p></div>`
//         });
//             document.getElementById('palabras').innerHTML +=
//             `
//             <div id="preguntas">
//                 <div id="texto">
//                     <p>${cont}/3</p>
//                     <p>Traduce la siguiente palabra: </p>
//                     <p>${pregunta.palabra}</p>
//                 </div>
//             </div> 

//             <div>
//                 <div id="cuadros">
//                     ${htmlRespuesta}
//                 </div>
//             </div>

//             <button id="continuar" onclick="renderizarSiguiente()" >Continuar</button>
//         ` 
// }

const verificarRespuesta = (indiceRespuesta, contador) => {
    let indicePregunta = contador-1;
    // console.log('Pregunta ',preguntas[indicePregunta]);
    // console.log('Numero de pregunta ',contador);
    // console.log('Indice respuesta ',indiceRespuesta);

    // console.log('Verificacion ', preguntas[indicePregunta].respuestas[indiceRespuesta].correcta);
    // console.log('cont',contador);
    // console.log('indicePregunta',indicePregunta);
    // console.log('indiceRespuesta',indiceRespuesta);
    // console.log('pregunta',preguntas[indicePregunta]);
    if (preguntas[indicePregunta].respuestas[indiceRespuesta].correcta) {
        console.log('V');
        verdad = true;
    }else{
        console.log('F');
        verdad = false;
    }

}


const renderizarSiguiente = () => {
    
    // if(indicePregunta==preguntas.length-1){
    //     console.log('Terminaron las preguntas');
    // }
    
    console.log(preguntas[indicePregunta]);
    if (verdad) {
        document.getElementById('palabras').innerHTML = '';
        indicePregunta++;
        if (indicePregunta>preguntas.length-1) {
            document.getElementById('pantalla-1').style.display = 'block';
            document.getElementById('pantalla-3').style.display = 'none';
            document.getElementById('pantalla-2').style.display = 'none';
            document.getElementById('agregarUsuario').style.display = 'none';
            document.getElementById('botonUsuario').style.display = 'none';
            indicePregunta=0;
        }
        renderizarPregunta(preguntas[indicePregunta]);
    }else{
        renderizarPregunta(preguntas[indicePregunta]);
    }
}


const agregarUsuario = () => {
    document.getElementById('pantalla-1').style.display = 'none';
    document.getElementById('pantalla-3').style.display = 'none';
    document.getElementById('pantalla-2').style.display = 'none';
    document.getElementById('agregarUsuario').style.display = 'block';
    document.getElementById('botonUsuario').style.display = 'none';

    
    console.log(usuarios.length);
    let id = usuarios.length +1;
    console.log(id);

}


