/* =============================================
   AI IMPORT MODULE (Gemini API)
============================================= */

/* 
  IMPORTANT: Since this is a client-side app, you must provide 
  your Gemini API Key. For production, ideally you should use a 
  backend proxy to keep the key secret.
*/
var GEMINI_MODEL = "gemini-2.0-flash-lite";
var API_VERSION = "v1";

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

async function getValidKeys() {
    var keys = [];
    if (window.CV_CONFIG && window.CV_CONFIG.GEMINI_API_KEYS) {
        keys = [...window.CV_CONFIG.GEMINI_API_KEYS];
    } else if (window.GEMINI_API_KEY) {
        keys = [window.GEMINI_API_KEY];
    }
    return keys;
}

async function extractWithGemini(text, stEl) {
    var keys = await getValidKeys();
    var prompt = buildExtractionPrompt(text);

    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var url = `https://generativelanguage.googleapis.com/${API_VERSION}/models/${GEMINI_MODEL}:generateContent?key=${key}`;

        try {
            console.log(`Essai avec la clé Gemini n°${i + 1}...`);
            var resp = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                })
            });

            if (!resp.ok) {
                var errorData = await resp.json();
                var msg = errorData.error?.message || "";
                console.warn(`Clé n°${i + 1} échouée:`, msg);

                // Si c'est un problème de quota (429) ou de modèle non trouvé (404), on essaie la clé suivante
                if (resp.status === 429 || resp.status === 404 || resp.status === 403) {
                    continue;
                }
                throw new Error(msg || "Erreur API");
            }

            var data = await resp.json();
            var resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;
            processAIResponse(resultText, stEl);
            return; // Succès !

        } catch (err) {
            if (i === keys.length - 1) { // Dernière clé
                console.error("Toutes les clés ont échoué:", err);
                stEl.style.color = 'var(--red)';

                // Si l'erreur mentionne l'activation de l'API, on met le lien en évidence
                if (err.message.includes("Generative Language API has not been used") || err.message.includes("disabled")) {
                    var projId = err.message.match(/project (\d+)/)?.[1] || "1047506806121";
                    var activationUrl = `https://console.developers.google.com/apis/api/generativelanguage.googleapis.com/overview?project=${projId}`;
                    stEl.innerHTML = `
                        &#9888; <strong>Action requise :</strong> L'API de secours n'est pas activée.<br>
                        <a href="${activationUrl}" target="_blank" style="color:white; background:var(--red); padding:5px 10px; border-radius:5px; text-decoration:none; display:inline-block; margin-top:10px">
                            Activer l'API Gemini ici ➜
                        </a><br>
                        <small style="opacity:0.8;display:block;margin-top:5px">Puis réessayez l'importation.</small>
                    `;
                } else {
                    stEl.innerHTML = '&#9888; Erreur Gemini : ' + err.message;
                }
            }
        }
    }
}

async function extractPDFWithGemini(base64, stEl) {
    var keys = await getValidKeys();
    var promptText = buildExtractionPrompt("");

    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var url = `https://generativelanguage.googleapis.com/${API_VERSION}/models/${GEMINI_MODEL}:generateContent?key=${key}`;

        try {
            console.log(`Essai (PDF) avec la clé Gemini n°${i + 1}...`);
            var resp = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [
                            { inline_data: { mime_type: "application/pdf", data: base64 } },
                            { text: promptText }
                        ]
                    }]
                })
            });

            if (!resp.ok) {
                var errorData = await resp.json();
                var msg = errorData.error?.message || "";
                console.warn(`Clé PDF n°${i + 1} échouée:`, msg);

                if (resp.status === 429 || resp.status === 404 || resp.status === 403) {
                    continue;
                }
                throw new Error(msg || "Erreur API PDF");
            }

            var data = await resp.json();
            var resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;
            processAIResponse(resultText, stEl);
            return;

        } catch (err) {
            if (i === keys.length - 1) {
                console.error("Toutes les clés PDF ont échoué:", err);
                stEl.style.color = 'var(--red)';

                if (err.message.includes("not been used") || err.message.includes("disabled")) {
                    var projId = err.message.match(/project (\d+)/)?.[1] || "1047506806121";
                    var activationUrl = `https://console.developers.google.com/apis/api/generativelanguage.googleapis.com/overview?project=${projId}`;
                    stEl.innerHTML = `
                        &#9888; <strong>Action requise (Clé de secours) :</strong><br>
                        <a href="${activationUrl}" target="_blank" style="color:white; background:var(--red); padding:5px 10px; border-radius:5px; text-decoration:none; display:inline-block; margin-top:10px">
                            Activer l'API ici ➜
                        </a>
                    `;
                } else {
                    stEl.innerHTML = '&#9888; Erreur Gemini PDF : ' + err.message;
                }
            }
        }
    }
}

function processAIResponse(txt, stEl) {
    try {
        console.log("Traitement de la réponse AI...");

        // Nettoyage de la réponse au cas où l'IA ajoute des balises ```json
        var cleanJson = txt.replace(/```json/g, '').replace(/```/g, '').trim();
        var json = JSON.parse(cleanJson);

        // Sécurité : on s'assure que fillAllFields ne bloque pas tout
        try {
            fillAllFields(json);
        } catch (fillErr) {
            console.error("Erreur durant fillAllFields:", fillErr);
        }

        stEl.style.background = 'rgba(45,106,79,.1)';
        stEl.style.color = 'var(--sage)';
        stEl.innerHTML = `
            <div style="display:flex; align-items:center; gap:12px; width:100%">
                <span style="font-size:1.5rem">&#10003;</span>
                <div style="flex:1">
                    <strong>Importation réussie !</strong><br>
                    <span style="font-weight:400; font-size:0.85rem">Vos informations ont été extraites.</span>
                </div>
                <button class="btn-next" onclick="goStep(1)" style="padding: 8px 16px; font-size: 0.8rem; margin:0">
                    Continuer ➜
                </button>
            </div>
        `;

        // Redirection automatique après 3 secondes si l'utilisateur ne clique pas
        setTimeout(function () {
            if (ST.step === 0) goStep(1);
        }, 3000);

    } catch (e) {
        console.error("Erreur parse AI:", e);
        stEl.style.color = 'var(--red)';
        stEl.innerHTML = '&#9888; Erreur de traitement des données IA.';
    }
}

function buildExtractionPrompt(cvText) {
    return `Analyse ce CV et extrait TOUTES les informations vers cet objet JSON. 
IMPORTANT: TA RÉPONSE DOIT ÊTRE UNIQUEMENT LE CODE JSON BRUT. PAS DE TEXTE AVANT OU APRÈS.

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

async function listAvailableModels() {
    var url = `https://generativelanguage.googleapis.com/v1/models?key=${window.GEMINI_API_KEY}`;
    console.log("Diagnostic : Liste des modèles disponibles pour cette clé...");
    try {
        var resp = await fetch(url);
        var data = await resp.json();
        console.log("MODÈLES DISPONIBLES :", data);
        if (data.models) {
            console.table(data.models.map(m => ({ name: m.name, version: m.version, displayName: m.displayName })));
        }
    } catch (e) {
        console.error("Erreur durant le diagnostic des modèles:", e);
    }
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
