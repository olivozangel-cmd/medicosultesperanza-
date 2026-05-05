const padecimientos = {
    "insolacion": {
        preguntas: ["¿Presentas temperatura corporal superior a 39°C?", "¿Sientes la piel roja, caliente y seca (sin sudor)?", "¿Experimentas confusión o pérdida de agilidad mental?"],
        niveles: ["Fatiga por calor leve.", "Agotamiento moderado.", "ALERTA: Posible golpe de calor."],
        consejo: "Es vital el enfriamiento por evaporación; rocíe agua tibia sobre la piel y use ventiladores.",
        habitos: { accion: "Ambiente fresco y elevar piernas.", dieta: "Suero oral con electrolitos.", prevencion: "Ropa de algodón y evitar sol 11:00-16:00." },
        link: "https://medlineplus.gov/spanish/heatillness.html",
        auxilio: { pasos: ["1. Mover a la sombra inmediatamente.", "2. Quitar exceso de ropa.", "3. Aplicar paños húmedos fríos.", "4. Dar agua solo si está consciente."], img: "https://vivienda.buenosaires.gob.ar/assets/images/noticias/golpe-de-calor.jpg" }
    },
    "estomacal": {
        preguntas: ["¿El dolor es punzante?", "¿Presentas náuseas?", "¿Cambios en color de heces?"],
        niveles: ["Indigestión funcional.", "Gastritis leve.", "Cuadro agudo / Infección."],
        consejo: "Siga la dieta BRAT (bananas, arroz, manzana y tostadas).",
        habitos: { accion: "Compresas tibias en abdomen.", dieta: "Alimentos al vapor.", prevencion: "Masticar 20 veces cada bocado." },
        link: "https://www.mayoclinic.org/es/diseases-conditions/gastritis/symptoms-causes/syc-20355807",
        auxilio: { pasos: ["1. Reposo en posición fetal.", "2. No dar alimentos sólidos.", "3. Hidratación constante.", "4. Calor suave en la zona."], img: "https://i.pinimg.com/736x/8a/63/0e/8a630e6919904269e8020e501570773d.jpg" }
    },
    "cabeza": {
        preguntas: ["¿Dolor pulsátil de un solo lado?", "¿Ves destellos de luz?", "¿Impide tus actividades?"],
        niveles: ["Cefalea tensional.", "Migraña en desarrollo.", "Crisis severa."],
        consejo: "Mantener horario de sueño regular es clave.",
        habitos: { accion: "Masajear sienes con aceites.", dieta: "Evitar embutidos.", prevencion: "Pausas visuales (regla 20-20-20)." },
        link: "https://medlineplus.gov/spanish/headache.html",
        auxilio: { pasos: ["1. Lugar oscuro y silencioso.", "2. Paño frío en frente.", "3. Evitar pantallas.", "4. Presionar sienes."], img: "https://www.fisioterapia-online.com/sites/default/files/styles/full_width/public/infografias/infografia_puntos_gatillo_cefaleas_y_migranas.jpg" }
    },
    "deshidratacion": {
        preguntas: ["¿Orina color ámbar?", "¿Mareos al pararte?", "¿Elasticidad de piel baja?"],
        niveles: ["Deshidratación marginal.", "Moderada.", "Severa."],
        consejo: "Beber agua a sorbos pequeños constantemente.",
        habitos: { accion: "Beber líquidos poco a poco.", dieta: "Sandía, pepino y piña.", prevencion: "Recordatorios de hidratación." },
        link: "https://www.mayoclinic.org/es/diseases-conditions/dehydration/symptoms-causes/syc-20354086",
        auxilio: { pasos: ["1. Sentar a la sombra.", "2. Dar suero oral.", "3. Aflojar ropa.", "4. Monitorear confusión."], img: "https://s1.significados.com/foto/rehidratacion-oral_bg.jpg" }
    },
    "muscular": {
        preguntas: ["¿Inflamación visible?", "¿Aumenta el dolor al tacto?", "¿Movilidad limitada?"],
        niveles: ["Mialgia leve.", "Contractura grado 1.", "Desgarro probable."],
        consejo: "Aplique método R.I.C.E (Reposo, Hielo, Compresión, Elevación).",
        habitos: { accion: "Alternar frío y calor.", dieta: "Potasio y Magnesio.", prevencion: "Estiramientos post-ejercicio." },
        link: "https://medlineplus.gov/spanish/musclepain.html",
        auxilio: { pasos: ["1. Reposo total.", "2. Hielo envuelto en tela.", "3. Vendar sin apretar.", "4. Elevar zona afectada."], img: "https://clinica-pueblo-nuevo.com/wp-content/uploads/2021/05/metodo-rice-primeros-auxilios.jpg" }
    },
    "desmayo": {
        preguntas: ["¿Palpitaciones antes?", "¿Ocurrió sentado?", "¿Tardó en orientarse?"],
        niveles: ["Síncope vasovagal.", "Hipotensión ortostática.", "Síncope origen incierto."],
        consejo: "Si marea, tense músculos de las piernas.",
        habitos: { accion: "Piernas elevadas 15 min.", dieta: "Agua mineral y sal.", prevencion: "Evitar cambios bruscos de posición." },
        link: "https://www.mayoclinic.org/es/diseases-conditions/fainting/symptoms-causes/syc-20353389",
        auxilio: { pasos: ["1. Acostar boca arriba.", "2. Elevar piernas a 30cm.", "3. Asegurar aire fresco.", "4. No dar comida hasta alerta."], img: "https://previews.123rf.com/images/elenabsl/elenabsl1504/elenabsl150400007/38580635-primeros-auxilios-para-el-desmayo-procedimiento-de-emergencia-correcta-ilustraci%C3%B3n.jpg" }
    }
};

let paso = 0; let respuestas = []; let padecimientoActual = "";

function showSection(id) {
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
}

function actualizarPadecimientos() {
    const grupo = document.getElementById('grupo-sintomas').value;
    const select = document.getElementById('padecimiento-especifico');
    select.innerHTML = '<option value="">Seleccione síntoma...</option>';
    if(grupo === "1") {
        select.innerHTML += '<option value="insolacion">Insolación</option><option value="estomacal">Dolor Estomacal</option><option value="cabeza">Dolor de Cabeza</option>';
    } else if(grupo === "2") {
        select.innerHTML += '<option value="deshidratacion">Deshidratación</option><option value="muscular">Dolor Muscular</option><option value="desmayo">Desmayo Leve</option>';
    }
    select.classList.remove('hidden');
}

function iniciarCuestionario() {
    padecimientoActual = document.getElementById('padecimiento-especifico').value;
    const nombre = document.getElementById('nombre').value;
    if(!nombre || !padecimientoActual) return alert("Por favor completa tus datos.");
    document.getElementById('paso-registro').classList.add('hidden');
    document.getElementById('preguntas-contenedor').classList.remove('hidden');
    paso = 0; respuestas = [];
    actualizarPregunta();
}

function actualizarPregunta() {
    document.getElementById('pregunta-texto').innerText = padecimientos[padecimientoActual].preguntas[paso];
}

function responder(val) {
    respuestas.push(val);
    paso++;
    if(paso < padecimientos[padecimientoActual].preguntas.length) {
        actualizarPregunta();
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    document.getElementById('preguntas-contenedor').classList.add('hidden');
    document.getElementById('resultado-final').classList.remove('hidden');
    const info = padecimientos[padecimientoActual];
    const conteoSi = respuestas.filter(r => r === 'si').length;
    let diagIndice = conteoSi === 0 ? 0 : conteoSi - 1;
    document.getElementById('diagnostico-box').innerHTML = `<h3>Reporte: ${document.getElementById('nombre').value}</h3><p>Evaluación: ${info.niveles[diagIndice]}</p>`;
    const htmlHabitos = `<strong>🩺 Prescripción:</strong><p>${info.consejo}</p><div>✅ Acción: ${info.habitos.accion}</div><div>🍎 Dieta: ${info.habitos.dieta}</div>`;
    document.getElementById('recomendaciones-box').innerHTML = htmlHabitos;
    document.getElementById('habitos-contenido').innerHTML = htmlHabitos;
    document.getElementById('link-referencia').innerHTML = `<a href="${info.link}" target="_blank">→ Ver Protocolo Clínico</a>`;
}

function abrirPrimerosAuxilios() {
    const p = document.getElementById('padecimiento-especifico').value;
    if(!p) return alert("Primero selecciona un síntoma en 'Análisis del Paciente'");
    const info = padecimientos[p].auxilio;
    document.getElementById('auxilio-contenido').innerHTML = `<h3 style="color:#dc3545">Actuación para: ${p.toUpperCase()}</h3><center><img src="${info.img}" class="img-auxilio"></center><ul>${info.pasos.map(paso => `<li>${paso}</li>`).join('')}</ul>`;
    showSection('primeros-auxilios');
}

// GUIAS PSICOLOGICAS
function mostrarGuiaPsic(tipo) {
    const cont = document.getElementById('contenido-psicologia');
    const guias = {
        'pap': "<h4>P.A.P.</h4><p>1. Escucha activa.<br>2. Respiración 4-4-4.<br>3. Técnica 5-4-3-2-1 para ansiedad.</p>",
        'tdah': "<h4>TDAH</h4><p>- Instrucciones cortas.<br>- Contacto visual directo.<br>- Permitir pausas activas.</p>",
        'autismo': "<h4>TEA</h4><p>- Anticipar cambios de rutina.<br>- Lenguaje literal (no sarcasmo).<br>- Espacios tranquilos sin ruidos.</p>",
        'neuro': "<h4>Neurodesarrollo</h4><p>- Tiempo extra para procesar.<br>- Estructura clara en el aula.<br>- Refuerzo positivo constante.</p>"
    };
    cont.innerHTML = guias[tipo];
}