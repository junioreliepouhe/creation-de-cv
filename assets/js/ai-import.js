/* =============================================
   AI IMPORT MODULE (Gemini API)
============================================= */

/* 
  IMPORTANT: Since this is a client-side app, you must provide 
  your Gemini API Key. For production, ideally you should use a 
  backend proxy to keep the key secret.
*/
var GEMINI_MODEL = "gemini-1.5-flash";

async function importCV(inp) {
    if (!inp.files || !inp.files[0]) return;
    var file = inp.files[0];
    var ext = file.name.split('.').pop().toLowerCase();
    var st = document.getElementById('importStatus');

    st.style.cssText = 'display:flex;align-items:center;gap:10px;color:var(--accent);font-size:.85rem;font-weight:600;margin-top:12px;padding:14px 16px;background:var(--al);border-radius:12px';
    st.innerHTML = '<div class="spinner" style="width:20px;height:20px;border-width:2px;flex-shrink:0"></div>'
        + '<div><strong>Lecture du document...</strong><br><span style="font-weight:400;opacity:.8">Extraction des informations via Gemini IA</span></div>';

    if (!window.GEMINI_API_KEY) {
        if (window.CV_CONFIG && window.CV_CONFIG.GEMINI_API_KEY) {
            window.GEMINI_API_KEY = window.CV_CONFIG.GEMINI_API_KEY;
        } else {
            var key = prompt("Veuillez entrer votre clé API Gemini pour l'import intelligent :");
            if (key) window.GEMINI_API_KEY = key;
            else {
                st.style.color = 'var(--red)';
                st.innerHTML = '&#9888; Clé API manquante.';
                return;
            }
        }
    }

    if (ext === 'docx') {
        handleWordImport(file, st);
    } else if (ext === 'pdf') {
        handlePDFImport(file, st);
    } else {
        st.style.color = 'var(--red)';
        st.innerHTML = '&#9888; Format non supporté (.docx ou .pdf uniquement).';
    }
}

async function handleWordImport(file, st) {
    try {
        console.log("Démarrage import Word...");
        if (!window.mammoth) {
            console.log("Chargement de Mammoth.js...");
            await loadScript('https://cdn.jsdelivr.net/npm/mammoth@1.6.0/mammoth.browser.min.js');
        }
        var r = new FileReader();
        r.onload = async function (e) {
            try {
                console.log("Fichier lu, extraction texte...");
                var res = await mammoth.extractRawText({ arrayBuffer: e.target.result });
                var txt = res.value || '';
                if (!txt.trim()) throw new Error("Document vide");

                console.log("Texte extrait (longueur):", txt.length);
                st.innerHTML = '<div class="spinner" style="width:20px;height:20px;border-width:2px;flex-shrink:0"></div>'
                    + '<div><strong>Analyse par Gemini...</strong><br><span style="font-weight:400;opacity:.8">Extraction structurée de vos données</span></div>';
                extractWithGemini(txt, st);
            } catch (innerErr) {
                console.error("Erreur Mammoth:", innerErr);
                st.style.color = 'var(--red)';
                st.innerHTML = '&#9888; Erreur lors de l\'extraction du texte Word.';
            }
        };
        r.onerror = () => { throw new Error("Erreur lecture fichier"); };
        r.readAsArrayBuffer(file);
    } catch (err) {
        console.error("Erreur handleWordImport:", err);
        st.style.color = 'var(--red)';
        st.innerHTML = '&#9888; Erreur lors de la lecture Word.';
    }
}

async function handlePDFImport(file, st) {
    var r = new FileReader();
    r.onload = async function (e) {
        var base64 = e.target.result.split(',')[1];
        st.innerHTML = '<div class="spinner" style="width:20px;height:20px;border-width:2px;flex-shrink:0"></div>'
            + '<div><strong>Analyse Multimodale Gemini...</strong><br><span style="font-weight:400;opacity:.8">Lecture du PDF et extraction des informations</span></div>';
        extractPDFWithGemini(base64, st);
    };
    r.readAsDataURL(file);
}

async function extractWithGemini(text, stEl) {
    var url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${window.GEMINI_API_KEY}`;
    var prompt = buildExtractionPrompt(text);

    try {
        var resp = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { responseMimeType: "application/json" }
            })
        });

        if (!resp.ok) {
            var errorData = await resp.json();
            console.error("Gemini API Error:", errorData);
            throw new Error(errorData.error?.message || "Erreur API");
        }

        var data = await resp.json();
        var resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        processAIResponse(resultText, stEl);
    } catch (err) {
        console.error("Network/Gemini Error:", err);
        stEl.style.color = 'var(--red)';
        if (err.message.includes("Failed to fetch") || err.name === "TypeError") {
            stEl.innerHTML = '&#9888; <strong>Erreur de connexion :</strong> Impossible de joindre les serveurs Google. Vérifiez votre connexion internet ou VPN.';
        } else {
            stEl.innerHTML = '&#9888; Erreur Gemini : ' + err.message;
        }
    }
}

async function extractPDFWithGemini(base64, stEl) {
    var url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${window.GEMINI_API_KEY}`;
    var promptText = buildExtractionPrompt("");

    try {
        var resp = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [
                        { inline_data: { mime_type: "application/pdf", data: base64 } },
                        { text: promptText }
                    ]
                }],
                generationConfig: { responseMimeType: "application/json" }
            })
        });

        if (!resp.ok) {
            var errorData = await resp.json();
            throw new Error(errorData.error?.message || "Erreur API PDF");
        }

        var data = await resp.json();
        var resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        processAIResponse(resultText, stEl);
    } catch (err) {
        console.error("Gemini PDF Error:", err);
        stEl.style.color = 'var(--red)';
        if (err.message.includes("Failed to fetch")) {
            stEl.innerHTML = '&#9888; <strong>Erreur de connexion :</strong> Accès bloqué ou serveur indisponible.';
        } else {
            stEl.innerHTML = '&#9888; Erreur Gemini PDF : ' + err.message;
        }
    }
}

function processAIResponse(txt, stEl) {
    try {
        var json = JSON.parse(txt);
        fillAllFields(json);
        stEl.style.background = 'rgba(45,106,79,.1)'; stEl.style.color = 'var(--sage)';
        stEl.innerHTML = '&#10003; <div><strong>Importation réussie !</strong><br><span style="font-weight:400">Vos champs ont été remplis par Gemini.</span></div>';
        setTimeout(function () { goStep(1); }, 1500);
    } catch (e) {
        stEl.style.color = 'var(--red)';
        stEl.innerHTML = '&#9888; Erreur de traitement des données IA.';
    }
}

function buildExtractionPrompt(cvText) {
    return `Analyse ce CV et extrait TOUTES les informations vers cet objet JSON. 
Respecte strictement les types de champs.
Si une information manque, laisse une chaîne vide.

JSON Format:
{
  "firstName": "",
  "lastName": "",
  "jobTitle": "",
  "email": "",
  "phone": "",
  "city": "",
  "nationality": "",
  "dob": "JJ/MM/AAAA",
  "linkedin": "",
  "links": [{"lbl": "GitHub", "url": "", "desc": ""}],
  "profile": "résumé complet",
  "educations": [{"deg": "diplôme", "sch": "école", "cty": "ville", "men": "mention", "sy": "2018", "ey": "2021", "desc": ""}],
  "experiences": [{"ttl": "poste", "cmp": "entreprise", "start": "Mois 2020", "end": "Mois 2022", "desc": ""}],
  "skills": ["compétence1"],
  "languages": [{"nm": "Français", "lv": "Maternel"}],
  "hobbies": "loisirs"
}

CV CONTENT:
${cvText}`;
}

function loadScript(src) {
    return new Promise((res, rej) => {
        var s = document.createElement('script');
        s.src = src;
        s.onload = res;
        s.onerror = rej;
        document.head.appendChild(s);
    });
}
