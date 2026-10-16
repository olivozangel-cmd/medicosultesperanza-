const padecimientos = {
    "sunstroke": {
        preguntas: ["Do you have a body temperature above 39°C (102.2°F)?", "Does your skin feel red, hot, and dry?", "Are you experiencing confusion?"],
        niveles: ["Mild heat fatigue.", "Moderate exhaustion.", "ALERT: Possible heatstroke."],
        consejo: "Evaporative cooling is vital; spray with lukewarm water.",
        habitos: { accion: "Cool environment.", dieta: "Oral rehydration salts.", prevencion: "Avoid sun from 11 AM to 4 PM." },
        link: "https://medlineplus.gov/heatillness.html",
        auxilio: { 
            pasos: ["Move to the shade.", "Remove excess clothing.", "Apply damp cloths."], 
            img: "insolacion.avif" 
        }
    },
    "stomachache": {
        preguntas: ["Is the pain sharp?", "Are you experiencing nausea?", "Any changes in stool color?"],
        niveles: ["Functional indigestion.", "Mild gastritis.", "Infection."],
        consejo: "Follow the BRAT diet (bananas, rice, applesauce, toast).",
        habitos: { accion: "Warm compresses.", dieta: "Steamed foods.", prevencion: "Chew food thoroughly (20 times)." },
        link: "https://www.mayoclinic.org/diseases-conditions/gastritis/symptoms-causes/syc-20355807",
        auxilio: { 
            pasos: ["Fetal position rest.", "Constant hydration.", "Gentle warmth."], 
            img: "dolor estomacal.jpg" 
        }
    },
    "headache": {
        preguntas: ["Is it a throbbing pain on one side?", "Do you see flashing lights?", "Does it interfere with your daily activities?"],
        niveles: ["Tension headache.", "Migraine.", "Severe crisis."],
        consejo: "Maintain a regular sleep schedule.",
        habitos: { accion: "Massage temples.", dieta: "Avoid processed meats.", prevencion: "Follow the 20-20-20 rule." },
        link: "https://medlineplus.gov/headache.html",
        auxilio: { 
            pasos: ["Dark room.", "Cold compress.", "No screen time."], 
            img: "dolor de cabeza.png" 
        }
    },
    "dehydration": {
        preguntas: ["Is your urine amber-colored?", "Do you feel dizzy when standing up?", "Is your skin dry?"],
        niveles: ["Mild.", "Moderate.", "Severe."],
        consejo: "Drink water in small, constant sips.",
        habitos: { accion: "Fluids gradually.", dieta: "Watermelon and cucumber.", prevencion: "Water reminders." },
        link: "https://www.mayoclinic.org/diseases-conditions/dehydration/symptoms-causes/syc-20354086",
        auxilio: { 
            pasos: ["Shade.", "Oral rehydration solution.", "Loosen clothing."], 
            img: "deshidratacion.webp" 
        }
    },
    "musclepain": {
        preguntas: ["Is there swelling?", "Is it tender to the touch?", "Is mobility limited?"],
        niveles: ["Myalgia.", "Muscle spasm / contracture.", "Strain or tear."],
        consejo: "Apply the R.I.C.E. method.",
        habitos: { accion: "Cold and heat therapy.", dieta: "Potassium intake.", prevencion: "Stretching." },
        link: "https://medlineplus.gov/musclepain.html",
        auxilio: { 
            pasos: ["Rest.", "Wrapped ice pack.", "Elevate the affected area."], 
            img: "dolor muscular.png" 
        }
    },
    "fainting": {
        preguntas: ["Did you experience heart palpitations?", "Did it happen while sitting or standing?", "Did it take time to regain orientation?"],
        niveles: ["Vasovagal syncope.", "Hypotension.", "Uncertain origin."],
        consejo: "Tense your leg muscles.",
        habitos: { accion: "Elevated legs.", dieta: "Mineral water.", prevencion: "Avoid sudden position changes." },
        link: "https://www.mayoclinic.org/diseases-conditions/fainting/symptoms-causes/syc-20353389",
        auxilio: { 
            pasos: ["Lie flat on your back.", "Elevate legs.", "Fresh air."], 
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
        return alert("Please enter your name and select at least one symptom.");
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

    let reporteDiag = `<h3>Report: ${document.getElementById('nombre').value}</h3>`;
    let reporteHab = `<strong>🩺 Combined Recommendations:</strong><br>`;
    let enlaces = "";

    listaSintomasElegidos.forEach(s => {
        const info = padecimientos[s];
        const sis = respuestasTemporales.filter(r => r.pad === s && r.res === 'yes').length;
        const diagIdx = sis === 0 ? 0 : (sis > 2 ? 2 : sis - 1);

        reporteDiag += `<p><b>${s.toUpperCase()}:</b> ${info.niveles[diagIdx]}</p>`;
        reporteHab += `<div class="mt-20"><b>${s}:</b> ${info.consejo} <br>✅ Action: ${info.habitos.accion}</div>`;
        enlaces += `<a href="${info.link}" target="_blank">→ ${s} Guide</a><br>`;
    });

    document.getElementById('diagnostico-box').innerHTML = reporteDiag;
    document.getElementById('recomendaciones-box').innerHTML = reporteHab;
    document.getElementById('habitos-contenido').innerHTML = reporteHab;
    document.getElementById('link-referencia').innerHTML = enlaces;
}

function abrirPrimerosAuxilios() {
    const checks = document.querySelectorAll('.sintoma-check:checked');
    const seleccion = Array.from(checks).map(c => c.value);

    if (seleccion.length === 0) return alert("Please select symptoms in the Analysis section first.");

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
        'pap': "<h4>P.F.A. (Psychological First Aid)</h4><p>1. Active listening.<br>2. Breathing technique 4-4-4.<br>3. Grounding technique 5-4-3-2-1.</p>",
        'adhd': "<h4>ADHD</h4><p>- Short, clear instructions.<br>- Direct eye contact.<br>- Active movement breaks.</p>",
        'autism': "<h4>ASD</h4><p>- Anticipate changes.<br>- Literal language.<br>- Calm, quiet spaces.</p>",
        'neuro': "<h4>Neurodevelopment</h4><p>- Extra time.<br>- Clear structure.<br>- Positive reinforcement.</p>"
    };
    document.getElementById('contenido-psicologia').innerHTML = guias[tipo];
}
