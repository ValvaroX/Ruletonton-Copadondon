// =====================================================
// CORRENTINAPP - RULETA EDUCATIVA SOBRE CORRIENTES
// Laboratorio de Aplicaciones II
// =====================================================

"use strict";


// -----------------------------------------------------
// 1. CONFIGURACIÓN DEL JUEGO
// -----------------------------------------------------

const PUNTOS_BASE = 100;        // puntos por cada respuesta correcta
const BONO_POR_RACHA = 25;      // extra por cada acierto consecutivo previo
const BONO_MAXIMO = 100;        // tope del bono de racha
const VUELTAS_COMPLETAS = 5;    // vueltas que da la ruleta antes de frenar
const DURACION_GIRO_MS = 4000;  // debe coincidir con la animación del CSS


// -----------------------------------------------------
// 2. CATEGORÍAS (cada una es un sector de la ruleta)
// -----------------------------------------------------

const categorias = [
    { nombre: "Geografía",   icono: "🗺️", color: "#1f6f5c" },
    { nombre: "Ríos",        icono: "🌊", color: "#1f5f9e" },
    { nombre: "Naturaleza",  icono: "🐊", color: "#467d28" },
    { nombre: "Producción",  icono: "🌾", color: "#b35f12" },
    { nombre: "Cultura",     icono: "🪗", color: "#7a449f" },
    { nombre: "Localidades", icono: "📍", color: "#b13f4a" }
];


// -----------------------------------------------------
// 3. BANCO DE PREGUNTAS
// "correcta" es la posición (0 a 3) de la opción correcta.
// Al mostrar la pregunta, las opciones se mezclan.
// -----------------------------------------------------

const preguntas = [

    {
        categoria: "Geografía",
        tema: "Región",
        pregunta: "¿A qué región de la Argentina pertenece Corrientes, junto con Misiones y Entre Ríos?",
        opciones: ["Patagonia", "Cuyo", "Mesopotamia", "Noroeste"],
        correcta: 2,
        explicacion: "Corrientes, Misiones y Entre Ríos forman la Mesopotamia argentina, una región ubicada entre los ríos Paraná y Uruguay."
    },

    {
        categoria: "Geografía",
        tema: "Fronteras",
        pregunta: "¿Con qué países limita la provincia de Corrientes?",
        opciones: ["Chile, Bolivia y Perú", "Paraguay, Brasil y Uruguay", "Uruguay y Chile", "Bolivia y Paraguay"],
        correcta: 1,
        explicacion: "Corrientes tiene frontera con Paraguay (por el río Paraná), con Brasil y con Uruguay (por el río Uruguay)."
    },

    {
        categoria: "Ríos",
        tema: "	Límites de la provincia",
        pregunta: "¿Qué río separa a Corrientes de Uruguay y de Brasil?",
        opciones: ["Río Pilcomayo", "Río Colorado", "Río Negro", "Río Uruguay"],
        correcta: 3,
        explicacion: "El río Uruguay marca el límite este de la provincia con Brasil y con la República Oriental del Uruguay."
    },

    {
        categoria: "Ríos",
        tema: "	Energía hidroeléctrica",
        pregunta: "¿Qué represa binacional está sobre el río Paraná, cerca de Ituzaingó?",
        opciones: ["El Chocón", "Salto Grande", "Yacyretá", "Futaleufú"],
        correcta: 2,
        explicacion: "Yacyretá es una central hidroeléctrica que comparten Argentina y Paraguay. Del lado argentino, está en el departamento correntino de Ituzaingó."
    },

    {
        categoria: "Ríos",
        tema: "	Ubicación de la capital",
        pregunta: "¿Sobre qué río se encuentra la ciudad de Corrientes, capital de la provincia?",
        opciones: ["Río Uruguay", "Río Paraná", "Río Pilcomayo", "Río Bermejo"],
        correcta: 1,
        explicacion: "La ciudad de Corrientes está sobre la margen del río Paraná, frente a la ciudad de Resistencia (Chaco)."
    },

    {
        categoria: "Naturaleza",
        tema: "Fauna de los esteros",
        pregunta: "¿Cuál es el roedor más grande del mundo, muy común en los Esteros del Iberá?",
        opciones: ["Vizcacha", "Nutria", "Tuco-tuco", "Carpincho"],
        correcta: 3,
        explicacion: "El carpincho (o capibara) es el roedor más grande del planeta. Vive cerca del agua y es muy fácil de ver en los humedales correntinos."
    },

    {
        categoria: "Naturaleza",
        tema: "Reptiles",
        pregunta: "¿Qué reptil, pariente de los cocodrilos, vive en los esteros y ríos de Corrientes?",
        opciones: ["Iguana", "Yacaré", "Tortuga marina", "Camaleón"],
        correcta: 1,
        explicacion: "El yacaré es un caimán sudamericano que habita en lagunas, esteros y ríos de la región."
    },

    {
        categoria: "Producción",
        tema: "Yerba mate",
        pregunta: "¿Cuál es el nombre científico de la planta con la que se elabora la yerba mate?",
        opciones: ["Camellia sinensis", "Coffea arabica", "Ilex paraguariensis", "Theobroma cacao"],
        correcta: 2,
        explicacion: "La yerba mate se elabora con hojas de Ilex paraguariensis. Camellia sinensis es la planta del té, Coffea arabica la del café y Theobroma cacao la del cacao. La yerba se cultiva sobre todo en Misiones y Corrientes."
    },

    {
        categoria: "Producción",
        tema: "Agricultura",
        pregunta: "¿Qué cultivo, que se desarrolla en campos con agua, es muy importante en la economía correntina?",
        opciones: ["Arroz", "Maní", "Girasol", "Trigo"],
        correcta: 0,
        explicacion: "El arroz se cultiva en lotes que se mantienen con agua. Corrientes tiene mucha agua disponible y es una de las principales provincias arroceras del país."
    },

    {
        categoria: "Producción",
        tema: "Forestación",
        pregunta: "¿Qué árboles se plantan en grandes superficies de Corrientes para obtener madera?",
        opciones: ["Pinos y eucaliptos", "Olivos y vides", "Palmeras datileras", "Cedros del Líbano"],
        correcta: 0,
        explicacion: "La forestación con pinos y eucaliptos es una actividad muy importante de la provincia: la madera se usa en aserraderos, muebles y papel."
    },

    {
        categoria: "Cultura",
        tema: "Música tradicional",
        pregunta: "¿Qué música tradicional correntina fue declarada Patrimonio Cultural Inmaterial de la Humanidad por la UNESCO en 2020?",
        opciones: ["Chacarera", "Zamba", "Chamamé", "Cueca"],
        correcta: 2,
        explicacion: "El chamamé nació en la región guaranítica del litoral, con fuerte presencia en Corrientes, y la UNESCO lo reconoció como patrimonio en 2020."
    },

    {
        categoria: "Cultura",
        tema: "Lenguas de la región",
        pregunta: "¿Qué lengua indígena es cooficial junto con el castellano en la provincia de Corrientes?",
        opciones: ["Quechua", "Mapudungun", "Wichí", "Guaraní"],
        correcta: 3,
        explicacion: "Desde 2004 el guaraní es lengua oficial de Corrientes, junto con el castellano. Se habla en muchos hogares y aparece en nombres de lugares, comidas y canciones."
    },

    {
        categoria: "Localidades",
        tema: "Ciudades de frontera",
        pregunta: "¿Qué ciudad correntina está sobre el río Uruguay, frente a la ciudad brasileña de Uruguaiana?",
        opciones: ["Goya", "Paso de los Libres", "Esquina", "Mercedes"],
        correcta: 1,
        explicacion: "Paso de los Libres y Uruguaiana están enfrentadas, y un puente internacional las une. Es uno de los pasos fronterizos más importantes con Brasil."
    },

    {
        categoria: "Localidades",
        tema: "Puerta al Iberá",
        pregunta: "¿Qué localidad, ubicada junto a la laguna Iberá, es una de las principales puertas de entrada a los Esteros del Iberá?",
        opciones: ["Monte Caseros", "Colonia Carlos Pellegrini", "Esquina", "Curuzú Cuatiá"],
        correcta: 1,
        explicacion: "Colonia Carlos Pellegrini está a orillas de la laguna Iberá y desde allí salen paseos en lancha, caminatas y cabalgatas para conocer los esteros."
    }

];


// -----------------------------------------------------
// 4. VARIABLES DEL ESTADO DEL JUEGO
// -----------------------------------------------------

// Estados posibles:
//   "reposo"       -> se puede girar la ruleta
//   "girando"      -> la ruleta está girando
//   "respondiendo" -> hay una pregunta esperando respuesta
//   "terminada"    -> se respondió la última pregunta (falta ver resultados)
//   "final"        -> se muestra la pantalla de resultados
let estado = "reposo";

let puntaje = 0;
let respondidas = 0;
let aciertos = 0;
let errores = 0;
let rachaActual = 0;

let preguntasUsadas = new Set();   // índices de preguntas que ya salieron
let preguntaActual = null;
let rotacionActual = 0;            // grados acumulados de la ruleta

let sonidoActivo = true;
let contextoAudio = null;


// -----------------------------------------------------
// 5. ELEMENTOS DEL HTML
// -----------------------------------------------------

const ruleta = document.getElementById("ruleta");
const zonaRuleta = document.getElementById("zonaRuleta");
const botonGirar = document.getElementById("botonGirar");
const botonSiguiente = document.getElementById("botonSiguiente");
const botonSonido = document.getElementById("botonSonido");
const botonReiniciar = document.getElementById("botonReiniciar");
const indicacion = document.getElementById("indicacion");
const leyenda = document.getElementById("leyenda");

const marcadorPuntaje = document.getElementById("puntaje");
const contador = document.getElementById("contador");
const totalPreguntas = document.getElementById("totalPreguntas");
const marcadorRacha = document.getElementById("racha");

const zonaJuego = document.getElementById("zonaJuego");
const tarjetaVacia = document.getElementById("tarjetaVacia");
const textoVacio = document.getElementById("textoVacio");
const tarjetaPregunta = document.getElementById("tarjetaPregunta");
const etiquetaCategoria = document.getElementById("categoria");
const progreso = document.getElementById("progreso");
const tema = document.getElementById("tema");
const enunciado = document.getElementById("pregunta");
const opciones = document.getElementById("opciones");

const retro = document.getElementById("retro");
const veredicto = document.getElementById("veredicto");
const respuestaCorrecta = document.getElementById("respuestaCorrecta");
const explicacion = document.getElementById("explicacion");

const pantallaFinal = document.getElementById("pantallaFinal");
const tituloFinal = document.getElementById("tituloFinal");
const finalPorcentaje = document.getElementById("finalPorcentaje");
const finalPuntaje = document.getElementById("finalPuntaje");
const finalAciertos = document.getElementById("finalAciertos");
const finalErrores = document.getElementById("finalErrores");
const finalRespondidas = document.getElementById("finalRespondidas");
const finalMensaje = document.getElementById("finalMensaje");


// -----------------------------------------------------
// 6. FUNCIONES AUXILIARES
// -----------------------------------------------------

// ¿La persona pidió menos animaciones en su sistema?
function prefiereMenosMovimiento() {
    return Boolean(
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
}

// Mezcla una lista (algoritmo de Fisher-Yates)
function mezclar(lista) {
    const copia = lista.slice();

    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }

    return copia;
}

function buscarCategoria(nombre) {
    return categorias.find(function(c) {
        return c.nombre === nombre;
    });
}


// -----------------------------------------------------
// 7. SONIDOS (se generan con el navegador, sin archivos)
// -----------------------------------------------------

// Devuelve el contexto de audio, o null si el sonido está apagado o no existe
function obtenerAudio() {
    if (!sonidoActivo) {
        return null;
    }

    try {
        if (!contextoAudio) {
            const ContextoAudio = window.AudioContext || window.webkitAudioContext;

            if (!ContextoAudio) {
                return null;
            }

            contextoAudio = new ContextoAudio();
        }

        if (contextoAudio.state === "suspended") {
            contextoAudio.resume();
        }

        return contextoAudio;
    } catch (error) {
        return null;
    }
}

// Reproduce una nota corta: frecuencia (Hz), cuándo empieza, cuánto dura
function tono(frecuencia, inicio, duracion, tipo, volumen) {
    const ctx = obtenerAudio();

    if (!ctx) {
        return;
    }

    try {
        const oscilador = ctx.createOscillator();
        const ganancia = ctx.createGain();
        const t0 = ctx.currentTime + inicio;

        oscilador.type = tipo || "sine";
        oscilador.frequency.value = frecuencia;

        ganancia.gain.setValueAtTime(0.0001, t0);
        ganancia.gain.exponentialRampToValueAtTime(volumen || 0.12, t0 + 0.01);
        ganancia.gain.exponentialRampToValueAtTime(0.0001, t0 + duracion);

        oscilador.connect(ganancia);
        ganancia.connect(ctx.destination);

        oscilador.start(t0);
        oscilador.stop(t0 + duracion + 0.05);
    } catch (error) {
        // Si falla el audio, el juego sigue funcionando igual
    }
}

// Clics que se van espaciando, como una ruleta que frena
function sonidoGiro() {
    const cantidadClics = prefiereMenosMovimiento() ? 3 : 24;

    for (let k = 0; k < cantidadClics; k++) {
        const segundos = (DURACION_GIRO_MS / 1000) * Math.pow(k / cantidadClics, 1.8);
        tono(640, segundos, 0.05, "triangle", 0.08);
    }
}

function sonidoAcierto() {
    [523, 659, 784, 1047].forEach(function(nota, i) {
        tono(nota, i * 0.09, 0.2, "sine", 0.13);
    });
}

function sonidoError() {
    tono(196, 0, 0.25, "triangle", 0.12);
    tono(147, 0.15, 0.35, "triangle", 0.12);
}

function sonidoFinal(porcentaje) {
    const notas = porcentaje >= 50 ? [523, 659, 784, 1047, 1319] : [392, 330, 262];

    notas.forEach(function(nota, i) {
        tono(nota, i * 0.12, 0.25, "sine", 0.13);
    });
}

function alternarSonido() {
    sonidoActivo = !sonidoActivo;
    actualizarBotonSonido();

    if (sonidoActivo) {
        tono(784, 0, 0.15, "sine", 0.12);  // confirma que el sonido volvió
    }
}

function actualizarBotonSonido() {
    botonSonido.setAttribute("aria-pressed", String(sonidoActivo));
    botonSonido.textContent = sonidoActivo ? "🔊 Sonido: sí" : "🔇 Sonido: no";
}


// -----------------------------------------------------
// 8. CONSTRUIR LA RULETA Y LA LEYENDA
// -----------------------------------------------------

// Cada categoría ocupa un sector del mismo tamaño
function crearRuleta() {
    const gradosPorSector = 360 / categorias.length;

    // Fondo con un color por sector
    const tramos = categorias.map(function(categoria, i) {
        return categoria.color + " " + (i * gradosPorSector) + "deg " + ((i + 1) * gradosPorSector) + "deg";
    });

    ruleta.style.background = "conic-gradient(" + tramos.join(", ") + ")";
    ruleta.style.setProperty("--sector", gradosPorSector + "deg");

    // Etiqueta (ícono + nombre) en el medio de cada sector
    categorias.forEach(function(categoria, i) {
        const etiqueta = document.createElement("div");
        etiqueta.className = "sector-etiqueta";
        etiqueta.style.setProperty("--ang", (i * gradosPorSector + gradosPorSector / 2) + "deg");

        const icono = document.createElement("span");
        icono.className = "sector-icono";
        icono.textContent = categoria.icono;

        const nombre = document.createElement("span");
        nombre.textContent = categoria.nombre;

        etiqueta.appendChild(icono);
        etiqueta.appendChild(nombre);
        ruleta.appendChild(etiqueta);
    });

    // Leyenda con la cantidad de preguntas de cada categoría
    categorias.forEach(function(categoria) {
        const cantidad = preguntas.filter(function(p) {
            return p.categoria === categoria.nombre;
        }).length;

        const item = document.createElement("li");

        const punto = document.createElement("span");
        punto.className = "leyenda-punto";
        punto.style.background = categoria.color;
        punto.setAttribute("aria-hidden", "true");

        item.appendChild(punto);
        item.appendChild(document.createTextNode(categoria.nombre + " (" + cantidad + ")"));
        leyenda.appendChild(item);
    });
}

// Vuelve la ruleta a su posición inicial sin animación
function reiniciarRuleta() {
    ruleta.style.transition = "none";
    ruleta.style.transform = "rotate(0deg)";
    void ruleta.offsetWidth;   // fuerza al navegador a aplicar el cambio
    ruleta.style.transition = "";
    rotacionActual = 0;
}


// -----------------------------------------------------
// 9. GIRAR LA RULETA
// -----------------------------------------------------

// Elige una pregunta que todavía no haya salido en esta partida
function elegirPreguntaNueva() {
    const disponibles = [];

    preguntas.forEach(function(pregunta, indice) {
        if (!preguntasUsadas.has(indice)) {
            disponibles.push(indice);
        }
    });

    const indiceElegido = disponibles[Math.floor(Math.random() * disponibles.length)];
    preguntasUsadas.add(indiceElegido);

    return preguntas[indiceElegido];
}

// Calcula cuántos grados hay que girar para que la flecha (arriba)
// quede dentro del sector de la categoría de la pregunta elegida
function calcularGiro(nombreCategoria) {
    const gradosPorSector = 360 / categorias.length;
    const indiceSector = categorias.findIndex(function(c) {
        return c.nombre === nombreCategoria;
    });

    // Punto al azar dentro del sector (sin tocar los bordes)
    const puntoDestino = indiceSector * gradosPorSector + gradosPorSector * (0.15 + Math.random() * 0.7);

    // La ruleta gira en sentido horario: el punto que queda bajo la flecha
    // es 360 - (rotación mod 360)
    const rotacionNecesaria = (360 - puntoDestino) % 360;
    const rotacionPrevia = rotacionActual % 360;
    const diferencia = (rotacionNecesaria - rotacionPrevia + 360) % 360;

    return VUELTAS_COMPLETAS * 360 + diferencia;
}

// Espera a que termine la animación (con un respaldo por si el evento no llega)
function esperarFinGiro() {
    return new Promise(function(resolver) {
        let terminado = false;
        let temporizador = null;

        function terminar() {
            if (terminado) {
                return;
            }

            terminado = true;
            ruleta.removeEventListener("transitionend", alTerminarTransicion);
            clearTimeout(temporizador);
            resolver();
        }

        function alTerminarTransicion(evento) {
            if (evento.target === ruleta && evento.propertyName === "transform") {
                terminar();
            }
        }

        ruleta.addEventListener("transitionend", alTerminarTransicion);
        temporizador = setTimeout(terminar, DURACION_GIRO_MS + 600);
    });
}

function girarRuleta() {
    if (estado !== "reposo") {
        return;   // evita giros simultáneos
    }

    estado = "girando";
    actualizarBotones();

    // Ocultamos la pregunta anterior
    tarjetaPregunta.hidden = true;
    tarjetaVacia.hidden = false;
    textoVacio.textContent = "Girando… ¡suerte!";
    indicacion.textContent = "La ruleta está girando.";

    // 1) Elegimos la pregunta, 2) giramos hasta su categoría
    preguntaActual = elegirPreguntaNueva();
    rotacionActual += calcularGiro(preguntaActual.categoria);

    ruleta.style.setProperty("--duracion-giro", DURACION_GIRO_MS + "ms");
    ruleta.style.transform = "rotate(" + rotacionActual + "deg)";

    zonaRuleta.scrollIntoView({
        behavior: prefiereMenosMovimiento() ? "auto" : "smooth",
        block: "nearest"
    });

    sonidoGiro();

    esperarFinGiro().then(function() {
        if (estado !== "girando") {
            return;
        }

        estado = "respondiendo";
        actualizarBotones();
        mostrarPregunta();
    });
}


// -----------------------------------------------------
// 10. MOSTRAR LA PREGUNTA
// -----------------------------------------------------

function mostrarPregunta() {
    const categoria = buscarCategoria(preguntaActual.categoria);

    etiquetaCategoria.textContent = categoria.icono + " " + preguntaActual.categoria;
    etiquetaCategoria.style.background = categoria.color;
    progreso.textContent = "Pregunta " + preguntasUsadas.size + " de " + preguntas.length;
    tema.textContent = preguntaActual.tema;
    enunciado.textContent = preguntaActual.pregunta;

    // Preparamos las opciones y las mezclamos
    const listaOpciones = preguntaActual.opciones.map(function(texto, indice) {
        return { texto: texto, esCorrecta: indice === preguntaActual.correcta };
    });

    opciones.innerHTML = "";

    mezclar(listaOpciones).forEach(function(opcion, posicion) {
        const boton = document.createElement("button");
        boton.type = "button";
        boton.className = "opcion";
        boton.dataset.correcta = String(opcion.esCorrecta);

        const letra = document.createElement("span");
        letra.className = "opcion-letra";
        letra.textContent = String.fromCharCode(65 + posicion);   // A, B, C, D
        letra.setAttribute("aria-hidden", "true");

        const texto = document.createElement("span");
        texto.className = "opcion-texto";
        texto.textContent = opcion.texto;

        const marca = document.createElement("span");
        marca.className = "opcion-marca";

        boton.appendChild(letra);
        boton.appendChild(texto);
        boton.appendChild(marca);

        boton.addEventListener("click", function() {
            comprobarRespuesta(boton);
        });

        opciones.appendChild(boton);
    });

    // Limpiamos el resultado anterior
    retro.hidden = true;
    retro.className = "retro";

    tarjetaVacia.hidden = true;
    tarjetaPregunta.hidden = false;

    // Reiniciamos la animación de entrada
    tarjetaPregunta.classList.remove("entra");
    void tarjetaPregunta.offsetWidth;
    tarjetaPregunta.classList.add("entra");

    indicacion.textContent = "Elegí una respuesta.";

    tema.focus({ preventScroll: true });
    tarjetaPregunta.scrollIntoView({
        behavior: prefiereMenosMovimiento() ? "auto" : "smooth",
        block: "nearest"
    });
}


// -----------------------------------------------------
// 11. COMPROBAR LA RESPUESTA Y SUMAR PUNTOS
// -----------------------------------------------------

function comprobarRespuesta(botonElegido) {
    // Solo se puede responder una vez por pregunta
    if (estado !== "respondiendo") {
        return;
    }

    const acerto = botonElegido.dataset.correcta === "true";
    let puntosGanados = 0;
    let bono = 0;

    respondidas++;

    if (acerto) {
        bono = Math.min(rachaActual * BONO_POR_RACHA, BONO_MAXIMO);
        puntosGanados = PUNTOS_BASE + bono;
        puntaje += puntosGanados;
        aciertos++;
        rachaActual++;
    } else {
        errores++;
        rachaActual = 0;
    }

    // ¿Quedan preguntas por salir?
    estado = (preguntasUsadas.size === preguntas.length) ? "terminada" : "reposo";

    marcarOpciones(botonElegido);
    mostrarResultado(acerto, puntosGanados, bono);
    actualizarMarcador(true);
    actualizarBotones();

    if (acerto) {
        sonidoAcierto();
        lanzarConfeti();
    } else {
        sonidoError();
    }

    botonSiguiente.focus();
}

// Deshabilita las opciones y marca cuál era la correcta
function marcarOpciones(botonElegido) {
    const botones = opciones.querySelectorAll(".opcion");

    botones.forEach(function(boton) {
        const esCorrecta = boton.dataset.correcta === "true";
        const marca = boton.querySelector(".opcion-marca");

        boton.disabled = true;

        if (boton === botonElegido && esCorrecta) {
            boton.classList.add("correcta");
            marca.textContent = "✔ Tu respuesta";
        } else if (boton === botonElegido) {
            boton.classList.add("incorrecta");
            marca.textContent = "✖ Tu respuesta";
        } else if (esCorrecta) {
            boton.classList.add("revelada");
            marca.textContent = "✔ Era esta";
        }
    });
}

function mostrarResultado(acerto, puntosGanados, bono) {
    const textoCorrecto = preguntaActual.opciones[preguntaActual.correcta];

    if (acerto) {
        let detalle = "";

        if (bono > 0) {
            detalle = " (" + PUNTOS_BASE + " base + " + bono + " de racha)";
        }

        veredicto.textContent = "✅ ¡Correcto! +" + puntosGanados + " puntos" + detalle;
        retro.className = "retro acierto";
    } else {
        veredicto.textContent = "❌ Incorrecto. Esta vez sumaste 0 puntos.";
        retro.className = "retro fallo";
    }

    respuestaCorrecta.textContent = "Respuesta correcta: " + textoCorrecto;
    explicacion.textContent = "💡 " + preguntaActual.explicacion;

    retro.hidden = false;
}

// Lluvia corta de papelitos de colores
function lanzarConfeti() {
    if (prefiereMenosMovimiento()) {
        return;
    }

    const contenedor = document.createElement("div");
    contenedor.className = "confeti";
    contenedor.setAttribute("aria-hidden", "true");

    for (let i = 0; i < 18; i++) {
        const papelito = document.createElement("span");
        papelito.style.left = Math.random() * 100 + "%";
        papelito.style.background = categorias[i % categorias.length].color;
        papelito.style.animationDelay = Math.random() * 0.3 + "s";
        contenedor.appendChild(papelito);
    }

    tarjetaPregunta.appendChild(contenedor);

    setTimeout(function() {
        contenedor.remove();
    }, 1800);
}


// -----------------------------------------------------
// 12. ACTUALIZAR MARCADOR Y BOTONES
// -----------------------------------------------------

function actualizarMarcador(conAnimacion) {
    marcadorPuntaje.textContent = puntaje;
    contador.textContent = respondidas;
    totalPreguntas.textContent = preguntas.length;
    marcadorRacha.textContent = rachaActual;

    if (conAnimacion) {
        marcadorPuntaje.classList.remove("sube");
        void marcadorPuntaje.offsetWidth;
        marcadorPuntaje.classList.add("sube");
    }
}

// Texto y estado de los botones según la etapa del juego
function actualizarBotones() {
    let texto = "🎡 Girar la ruleta";
    let habilitado = false;

    if (estado === "reposo") {
        habilitado = true;
        texto = respondidas === 0 ? "🎡 Girar la ruleta" : "🎡 Girar de nuevo";
        indicacion.textContent = respondidas === 0
            ? "Tocá el botón para recibir tu primera pregunta."
            : "Tocá el botón para recibir la siguiente pregunta.";
    } else if (estado === "girando") {
        texto = "Girando…";
    } else if (estado === "respondiendo") {
        texto = "Respondé para continuar";
    } else if (estado === "terminada") {
        habilitado = true;
        texto = "🏁 Ver resultados";
        indicacion.textContent = "¡Respondiste todas las preguntas!";
    }

    botonGirar.textContent = texto;
    botonGirar.disabled = !habilitado;
    botonSiguiente.textContent = habilitado ? texto : "";
}

// Lo usan los dos botones: el de la ruleta y el de la tarjeta
function manejarBotonPrincipal() {
    if (estado === "reposo") {
        girarRuleta();
    } else if (estado === "terminada") {
        mostrarPantallaFinal();
    }
}


// -----------------------------------------------------
// 13. PANTALLA FINAL
// -----------------------------------------------------

function calcularPorcentaje() {
    if (respondidas === 0) {
        return 0;
    }

    return Math.round((aciertos / respondidas) * 100);
}

function elegirMensajeFinal(porcentaje) {
    if (respondidas === 0) {
        return "No respondiste ninguna pregunta. ¡Animate a jugar otra vez!";
    }

    if (porcentaje >= 90) {
        return "¡Excelente! Conocés Corrientes como un verdadero guardián del Iberá.";
    }

    if (porcentaje >= 70) {
        return "¡Muy bien! Tenés un gran conocimiento de nuestra provincia.";
    }

    if (porcentaje >= 50) {
        return "¡Buen intento! Repasá algunos temas y probá de nuevo.";
    }

    return "Todavía hay mucho por descubrir de Corrientes. ¡Jugá otra vez y seguí aprendiendo!";
}

function mostrarPantallaFinal() {
    if (estado !== "terminada") {
        return;
    }

    estado = "final";

    const porcentaje = calcularPorcentaje();

    finalPorcentaje.textContent = porcentaje;
    finalPuntaje.textContent = puntaje;
    finalAciertos.textContent = aciertos;
    finalErrores.textContent = errores;
    finalRespondidas.textContent = respondidas;
    finalMensaje.textContent = elegirMensajeFinal(porcentaje);

    zonaJuego.hidden = true;
    pantallaFinal.hidden = false;

    sonidoFinal(porcentaje);
    tituloFinal.focus();
}


// -----------------------------------------------------
// 14. INICIAR O REINICIAR LA PARTIDA
// -----------------------------------------------------

function iniciarPartida() {
    // Borramos todo rastro de la partida anterior
    puntaje = 0;
    respondidas = 0;
    aciertos = 0;
    errores = 0;
    rachaActual = 0;
    preguntasUsadas = new Set();
    preguntaActual = null;
    estado = "reposo";

    reiniciarRuleta();

    opciones.innerHTML = "";
    retro.hidden = true;
    retro.className = "retro";
    tarjetaPregunta.hidden = true;
    tarjetaVacia.hidden = false;
    textoVacio.textContent = "Tu pregunta va a aparecer acá.";

    pantallaFinal.hidden = true;
    zonaJuego.hidden = false;

    actualizarMarcador(false);
    actualizarBotones();
}

function volverAJugar() {
    iniciarPartida();
    botonGirar.focus();
}


// -----------------------------------------------------
// 15. EVENTOS Y ARRANQUE
// -----------------------------------------------------

botonGirar.addEventListener("click", manejarBotonPrincipal);
botonSiguiente.addEventListener("click", manejarBotonPrincipal);
botonReiniciar.addEventListener("click", volverAJugar);
botonSonido.addEventListener("click", alternarSonido);

crearRuleta();
actualizarBotonSonido();
iniciarPartida();
