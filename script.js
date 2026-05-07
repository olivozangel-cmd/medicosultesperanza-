const padecimientos = {
    "insolacion": {
        preguntas: ["¿Presentas temperatura corporal superior a 39°C?", "¿Sientes la piel roja, caliente y seca?", "¿Experimentas confusión?"],
        niveles: ["Fatiga por calor leve.", "Agotamiento moderado.", "ALERTA: Posible golpe de calor."],
        consejo: "Es vital el enfriamiento por evaporación; rocíe agua tibia.",
        habitos: { accion: "Ambiente fresco.", dieta: "Suero oral.", prevencion: "Evitar sol 11-16h." },
        link: "https://medlineplus.gov/spanish/heatillness.html",
        auxilio: { 
            pasos: ["Mover a la sombra.", "Quitar ropa.", "Paños húmedos."], 
            img: "insolacion.avif" 
        }
    },
    "estomacal": {
        preguntas: ["¿El dolor es punzante?", "¿Presentas náuseas?", "¿Cambios en color de heces?"],
        niveles: ["Indigestión funcional.", "Gastritis leve.", "Infección."],
        consejo: "Siga la dieta BRAT (bananas, arroz, manzana, tostadas).",
        habitos: { accion: "Compresas tibias.", dieta: "Alimentos al vapor.", prevencion: "Masticar 20 veces." },
        link: "https://www.mayoclinic.org/es/diseases-conditions/gastritis/symptoms-causes/syc-20355807",
        auxilio: { 
            pasos: ["Reposo fetal.", "Hidratación constante.", "Calor suave."], 
            img: "dolor estomacal.jpg" 
        }
    },
    "cabeza": {
        preguntas: ["¿Dolor pulsátil de un solo lado?", "¿Ves destellos?", "¿Impide tus actividades?"],
        niveles: ["Cefalea tensional.", "Migraña.", "Crisis severa."],
        consejo: "Mantener horario de sueño regular.",
        habitos: { accion: "Masajear sienes.", dieta: "Evitar embutidos.", prevencion: "Regla 20-20-20." },
        link: "https://medlineplus.gov/spanish/headache.html",
        auxilio: { 
            pasos: ["Lugar oscuro.", "Paño frío.", "Sin pantallas."], 
            img: "dolor de cabeza.png" 
        }
    },
    "deshidratacion": {
        preguntas: ["¿Orina color ámbar?", "¿Mareos al pararte?", "¿Piel seca?"],
        niveles: ["Leve.", "Moderada.", "Severa."],
        consejo: "Beber agua a sorbos constantes.",
        habitos: { accion: "Líquidos poco a poco.", dieta: "Sandía y pepino.", prevencion: "Recordatorios de agua." },
        link: "https://www.mayoclinic.org/es/diseases-conditions/dehydration/symptoms-causes/syc-20354086",
        auxilio: { 
            pasos: ["Sombra.", "Suero oral.", "Aflojar ropa."], 
            img: "deshidratacion.webp" 
        }
    },
    "muscular": {
        preguntas: ["¿Inflamación?", "¿Dolor al tacto?", "¿Movilidad limitada?"],
        niveles: ["Mialgia.", "Contractura.", "Desgarro."],
        consejo: "Aplique método R.I.C.E.",
        habitos: { accion: "Frío y calor.", dieta: "Potasio.", prevencion: "Estiramientos." },
        link: "https://medlineplus.gov/spanish/musclepain.html",
        auxilio: { 
            pasos: ["Reposo.", "Hielo envuelto.", "Elevar zona."], 
            img: "dolor muscular.png" 
        }
    },
    "desmayo": {
        preguntas: ["¿Palpitaciones?", "¿Ocurrió sentado?", "¿Tardó en orientarse?"],
        niveles: ["Síncope vasovagal.", "Hipotensión.", "Origen incierto."],
        consejo: "Tense músculos de las piernas.",
        habitos: { accion: "Piernas elevadas.", dieta: "Agua mineral.", prevencion: "Evitar cambios bruscos." },
        link: "https://www.mayoclinic.org/es/diseases-conditions/fainting/symptoms-causes/syc-20353389",
        auxilio: { 
            pasos: ["Acostar boca arriba.", "Elevar piernas.", "Aire fresco."], 
            img: "desmayo.webp" 
        }
    }
};

let listaSintomasElegidos = [];
let indiceActualSintoma = 0;
let indicePregunta = 0;
let respuestasTemporales = [];

function showSection(id) {
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
}

function iniciarCuestionario() {
    const checks = document.querySelectorAll('.sintoma-check:checked');
    listaSintomasElegidos = Array.from(checks).map(c => c.value);
    const nombre = document.getElementById('nombre').value;

    if (!nombre || listaSintomasElegidos.length === 0) {
        return alert("Por favor ingresa tu nombre y elige al menos un síntoma.");
    }

    indiceActualSintoma = 0;
    indicePregunta = 0;
    respuestasTemporales = [];
    
    document.getElementById('paso-registro').classList.add('hidden');
    document.getElementById('preguntas-contenedor').classList.remove('hidden');
    actualizarPregunta();
}

function actualizarPregunta() {
    const pad = listaSintomasElegidos[indiceActualSintoma];
    document.getElementById('pregunta-texto').innerText = `(${pad.toUpperCase()}) ${padecimientos[pad].preguntas[indicePregunta]}`;
}

function responder(val) {
    respuestasTemporales.push({ pad: listaSintomasElegidos[indiceActualSintoma], res: val });
    indicePregunta++;

    const padActual = listaSintomasElegidos[indiceActualSintoma];
    if (indicePregunta >= padecimientos[padActual].preguntas.length) {
        indiceActualSintoma++;
        indicePregunta = 0;
    }

    if (indiceActualSintoma < listaSintomasElegidos.length) {
        actualizarPregunta();
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    document.getElementById('preguntas-contenedor').classList.add('hidden');
    document.getElementById('resultado-final').classList.remove('hidden');

    let reporteDiag = `<h3>Reporte: ${document.getElementById('nombre').value}</h3>`;
    let reporteHab = `<strong>🩺 Recomendaciones Combinadas:</strong><br>`;
    let enlaces = "";

    listaSintomasElegidos.forEach(s => {
        const info = padecimientos[s];
        const sis = respuestasTemporales.filter(r => r.pad === s && r.res === 'si').length;
        const diagIdx = sis === 0 ? 0 : (sis > 2 ? 2 : sis - 1);

        reporteDiag += `<p><b>${s.toUpperCase()}:</b> ${info.niveles[diagIdx]}</p>`;
        reporteHab += `<div class="mt-20"><b>${s}:</b> ${info.consejo} <br>✅ Acción: ${info.habitos.accion}</div>`;
        enlaces += `<a href="${info.link}" target="_blank">→ Guía ${s}</a><br>`;
    });

    document.getElementById('diagnostico-box').innerHTML = reporteDiag;
    document.getElementById('recomendaciones-box').innerHTML = reporteHab;
    document.getElementById('habitos-contenido').innerHTML = reporteHab;
    document.getElementById('link-referencia').innerHTML = enlaces;
}

function abrirPrimerosAuxilios() {
    const checks = document.querySelectorAll('.sintoma-check:checked');
    const seleccion = Array.from(checks).map(c => c.value);

    if (seleccion.length === 0) return alert("Por favor, selecciona síntomas en el Análisis primero.");

    let htmlFinal = "";
    seleccion.forEach(s => {
        const aux = padecimientos[s].auxilio;
        htmlFinal += `
            <div style="border-bottom: 2px solid #ddd; padding-bottom: 20px; margin-bottom: 20px;">
                <h3 style="color:#dc3545">${s.toUpperCase()}</h3>
                <center><img src="${aux.img}" class="img-auxilio" alt="${s}"></center>
                <ul>${aux.pasos.map(p => `<li>${p}</li>`).join('')}</ul>
            </div>`;
    });
    
    document.getElementById('auxilio-contenido').innerHTML = htmlFinal;
    showSection('primeros-auxilios');
}

function mostrarGuiaPsic(tipo) {
    const guias = {
        'pap': "<h4>P.A.P.</h4><p>1. Escucha activa.<br>2. Respiración 4-4-4.<br>3. Técnica 5-4-3-2-1.</p>",
        'tdah': "<h4>TDAH</h4><p>- Instrucciones cortas.<br>- Contacto visual directo.<br>- Pausas activas.</p>",
        'autismo': "<h4>TEA</h4><p>- Anticipar cambios.<br>- Lenguaje literal.<br>- Espacios tranquilos.</p>",
        'neuro': "<h4>Neurodesarrollo</h4><p>- Tiempo extra.<br>- Estructura clara.<br>- Refuerzo positivo.</p>"
    };
    document.getElementById('contenido-psicologia').innerHTML = guias[tipo];
}
