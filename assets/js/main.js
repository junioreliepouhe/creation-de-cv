/* =============================================
   MAIN APPLICATION ORCHESTRATOR
============================================= */

var ST = { step: 0, domain: '', template: '', photo: null, totalSteps: 6 };
var bc = 0;

document.addEventListener('DOMContentLoaded', function () {
    initDOB();
    initPills();
    addEdu();
    addLang();
    renderSkills('autre');

    if (typeof loadFromLocal === 'function') loadFromLocal();

    /* Auto-save listeners */
    document.addEventListener('input', function (e) { if (e.target.closest('.main')) saveToLocal(); });
    document.addEventListener('change', function (e) { if (e.target.closest('.main')) saveToLocal(); });
});

/* --- INITIALIZATION --- */
function initDOB() {
    var sd = document.getElementById('dob_d'), sm = document.getElementById('dob_m'), sy = document.getElementById('dob_y');
    if (!sd || !sm || !sy) return;
    var ss = 'font-family:inherit;font-size:.84rem;padding:10px;border:1.5px solid var(--border);border-radius:10px;color:var(--ink);background:var(--bg);outline:none;width:100%;cursor:pointer;';
    sd.style.cssText = sm.style.cssText = sy.style.cssText = ss;
    sd.innerHTML = '<option value="">Jour</option>';
    sm.innerHTML = '<option value="">Mois</option>';
    sy.innerHTML = '<option value="">Année</option>';
    for (var i = 1; i <= 31; i++) { var o = document.createElement('option'); o.value = i; o.textContent = String(i).padStart(2, '0'); sd.appendChild(o); }
    for (var i = 0; i < 12; i++) { var o = document.createElement('option'); o.value = i + 1; o.textContent = MONTHS[i]; sm.appendChild(o); }
    for (var y = new Date().getFullYear() - 10; y >= 1940; y--) { var o = document.createElement('option'); o.value = y; o.textContent = y; sy.appendChild(o); }
}

function initPills() {
    var w = document.getElementById('pills'); if (!w) return;
    w.innerHTML = '';
    for (var i = 0; i <= ST.totalSteps; i++) {
        var d = document.createElement('div'); d.id = 'sp' + i;
        d.className = 'sp' + (i === 0 ? ' active' : '');
        w.appendChild(d);
    }
}

/* --- NAVIGATION --- */
function goStep(n) {
    var curStepEl = document.getElementById('step' + ST.step);
    var nextStepEl = document.getElementById('step' + n);
    if (curStepEl) curStepEl.classList.remove('active');
    ST.step = n;
    if (nextStepEl) nextStepEl.classList.add('active');

    var pct = (n / ST.totalSteps) * 100;
    var pf = document.getElementById('pf');
    if (pf) pf.style.width = pct + '%';

    var sctr = document.getElementById('sctr');
    if (sctr) sctr.textContent = n === 0 ? 'Accueil' : 'Etape ' + n + ' / ' + (ST.totalSteps - 1);

    for (var i = 0; i <= ST.totalSteps; i++) {
        var d = document.getElementById('sp' + i);
        if (!d) continue;
        if (i < n) d.className = 'sp done'; else if (i === n) d.className = 'sp active'; else d.className = 'sp';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (n === 6) setTimeout(generateCV, 150);
}

function goNext(cur) {
    if (cur === 1 && !ST.domain) { showErr('e1'); return; }
    if (cur === 2 && !ST.template) { showErr('e2'); return; }
    if (cur === 3 && !gv('firstName') && !gv('lastName')) { showToast('⚠️ Entrez votre prénom et nom (obligatoire)'); return; }
    goStep(cur + 1);
}

function showErr(id) {
    var e = document.getElementById(id); if (!e) return;
    e.classList.add('show');
    setTimeout(() => e.classList.remove('show'), 3500);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

function showToast(msg) {
    var t = document.getElementById('toast'); if (!t) return;
    t.textContent = msg; t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3500);
}

/* --- SELECTION --- */
function selDom(el) {
    document.querySelectorAll('.dom-card').forEach(c => c.classList.remove('sel'));
    el.classList.add('sel');
    ST.domain = el.dataset.d;
    var cfg = DOMAIN[ST.domain] || DOMAIN.autre;

    document.getElementById('tipStu').style.display = ST.domain === 'etudiant' ? 'flex' : 'none';

    setTxt('lbl-title', cfg.titleLabel); setTxt('h-title', cfg.titleHint);
    setAttr('jobTitle', 'placeholder', cfg.titlePH);
    setTxt('h-nat', cfg.cityHint); setTxt('h-phone', cfg.phoneHint);
    setTxt('h-email', cfg.emailHint); setTxt('h-linkedin', cfg.linkedinHint);
    setTxt('lbl-website', cfg.websiteLabel + ' (Optionnel)'); setTxt('h-website', cfg.websiteHint);
    setTxt('projUrlTitle', cfg.projUrlTitle); setTxt('projUrlTip', cfg.projUrlTip);
    setTxt('lbl-projUrl', cfg.projUrlLabel); setAttr('projUrl', 'placeholder', cfg.projUrlPH);
    setTxt('lbl-projDesc', cfg.projDescLabel); setAttr('projDesc', 'placeholder', cfg.projDescPH);
    setTxt('profileTip', cfg.profileTip); setAttr('profile', 'placeholder', cfg.profilePH);

    setTxt('s4sub', cfg.s4sub); setTxt('eduTitle', cfg.eduTitle); setTxt('eduSubtitle', cfg.eduSub);
    setTxt('expTitle', cfg.expTitle); setTxt('expSubtitle', cfg.expSub); setTxt('noExpLbl', cfg.noExpLbl);

    if (document.getElementById('tipStu4')) document.getElementById('tipStu4').style.display = ST.domain === 'etudiant' ? 'flex' : 'none';
    if (document.getElementById('projCard')) document.getElementById('projCard').style.display = cfg.showProjCard ? 'block' : 'none';
    if (document.getElementById('actCard')) document.getElementById('actCard').style.display = cfg.showActCard ? 'block' : 'none';

    setTxt('skillsSubtitle', cfg.skillsSub); setTxt('langsTip', cfg.langsTip); setTxt('hobbiesHint', cfg.hobbiesHint);
    renderSkills(ST.domain);

    document.getElementById('e1').classList.remove('show');
    setTimeout(() => document.querySelector('#step1 .nav')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 200);
}

function selTpl(el) {
    document.querySelectorAll('.tpl-card').forEach(c => c.classList.remove('sel'));
    el.classList.add('sel'); ST.template = el.dataset.t;
    document.getElementById('e2').classList.remove('show');
    setTimeout(() => document.querySelector('#step2 .nav')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 200);
}

function setTxt(id, v) { var e = document.getElementById(id); if (e && v) e.textContent = v; }
function setAttr(id, attr, v) { var e = document.getElementById(id); if (e && v) e.setAttribute(attr, v); }

/* --- PHOTO --- */
function handlePhoto(input) {
    if (!input.files?.[0]) return;
    var r = new FileReader();
    r.onload = function (e) {
        ST.photo = e.target.result;
        document.getElementById('photoPreview').innerHTML = '<img src="' + ST.photo + '" alt="photo">';
    };
    r.readAsDataURL(input.files[0]);
}

/* --- BLOCKS MANAGEMENT --- */
function rmB(id) { var e = document.getElementById(id); if (e) e.remove(); }

function addEdu() {
    var id = 'edu' + (++bc); var el = document.createElement('div'); el.className = 'rep-block'; el.id = id;
    el.innerHTML = '<button class="rem-btn" onclick="rmB(\'' + id + '\')">✕</button>'
        + '<div class="rep-num">Formation</div>'
        + '<div class="fg"><div class="field"><label>Diplôme / Titre obtenu *</label><input type="text" placeholder="Ex : Master Informatique"></div>'
        + '<div class="field"><label>Établissement *</label><input type="text" placeholder="Ex : Université de Yaoundé I"></div></div>'
        + '<div class="fg"><div class="field"><label>Ville / Pays</label><input type="text" placeholder="Ex : Yaoundé, Cameroun"></div>'
        + '<div class="field"><label>Mention <span class="opt">Optionnel</span></label><input type="text" placeholder="Ex : Très Bien"></div></div>'
        + '<div class="fg"><div class="field"><label>Début</label>' + mSel(yOnlyOpts(), 'Année') + '</div>'
        + '<div class="field"><label>Fin</label>' + mSel(yOpts(), 'Année') + '</div></div>'
        + '<div class="fg f1"><div class="field"><label>Description <span class="opt">Optionnel</span></label><textarea rows="2"></textarea></div></div>';
    document.getElementById('eduBlocks').appendChild(el);
}

function addExp() {
    var id = 'exp' + (++bc); var el = document.createElement('div'); el.className = 'rep-block'; el.id = id;
    el.innerHTML = '<button class="rem-btn" onclick="rmB(\'' + id + '\')">✕</button>'
        + '<div class="rep-num">Expérience</div>'
        + '<div class="fg"><div class="field"><label>Poste *</label><input type="text" placeholder="Ex : Développeur Web"></div>'
        + '<div class="field"><label>Entreprise *</label><input type="text" placeholder="Nom de l\'entreprise"></div></div>'
        + '<div class="fg"><div class="field"><label>Début</label><div class="date-duo">' + mSel(mOpts(), 'Mois') + mSel(yOpts(), 'Année') + '</div></div>'
        + '<div class="field"><label>Fin</label><div class="date-duo">' + mSel(mOpts(), 'Mois') + mSel(yOpts(), 'Année') + '</div></div></div>'
        + '<div class="fg f1"><div class="field"><label>Missions</label><textarea rows="3"></textarea></div></div>';
    document.getElementById('expBlocks').appendChild(el);
}

function addProj() {
    var id = 'prj' + (++bc); var el = document.createElement('div'); el.className = 'rep-block'; el.id = id;
    el.innerHTML = '<button class="rem-btn" onclick="rmB(\'' + id + '\')">✕</button>'
        + '<div class="fg"><div class="field"><label>Nom du projet *</label><input type="text"></div>'
        + '<div class="field"><label>Période</label><input type="text"></div></div>'
        + '<div class="fg f1"><div class="field"><label>Description *</label><textarea rows="2"></textarea></div></div>';
    document.getElementById('projBlocks').appendChild(el);
}

function addAct() {
    var id = 'act' + (++bc); var el = document.createElement('div'); el.className = 'rep-block'; el.id = id;
    el.innerHTML = '<button class="rem-btn" onclick="rmB(\'' + id + '\')">✕</button>'
        + '<div class="fg"><div class="field"><label>Rôle *</label><input type="text"></div>'
        + '<div class="field"><label>Organisation</label><input type="text"></div></div>'
        + '<div class="fg f1"><div class="field"><label>Action</label><input type="text"></div></div>';
    document.getElementById('actBlocks').appendChild(el);
}

function addLang() {
    var gid = 'lg' + Date.now();
    var row = document.createElement('div'); row.className = 'lang-row';
    var levs = ['Débutant', 'Intermédiaire', 'Courant', 'Bilingue', 'Maternel'];
    var lh = '<div class="lang-levels">' + levs.map(l => '<span class="ll" data-g="' + gid + '" onclick="selLL(this,\'' + gid + '\')">' + l + '</span>').join('') + '</div>';
    row.innerHTML = '<input type="text" placeholder="Langue">' + lh + '<button class="rem-btn" onclick="this.parentElement.remove()">✕</button>';
    document.getElementById('langRows').appendChild(row);
}

function selLL(el, g) { document.querySelectorAll('[data-g="' + g + '"]').forEach(e => e.classList.remove('on')); el.classList.add('on'); }

function mSel(opts, ph) {
    var ss = 'font-family:inherit;font-size:.84rem;padding:10px;border:1.5px solid var(--border);border-radius:10px;background:var(--bg);width:100%;';
    return '<select style="' + ss + '"><option value="">' + ph + '</option>' + opts.map(o => '<option value="' + o.v + '">' + o.l + '</option>').join('') + '</select>';
}
function yOpts() { var y = new Date().getFullYear(); var a = []; for (var i = 0; i <= 45; i++) { a.push({ v: y - i, l: y - i }); } a.push({ v: 'En cours', l: 'En cours ✓' }); return a; }
function yOnlyOpts() { var y = new Date().getFullYear(); var a = []; for (var i = 0; i <= 45; i++) { a.push({ v: y - i, l: y - i }); } return a; }
function mOpts() { return MONTHS.map(m => ({ v: m, l: m })); }

function renderSkills(domain) {
    var cloud = document.getElementById('skillCloud'); if (!cloud) return;
    var skills = (DOMAIN[domain] || DOMAIN.autre).skills;
    cloud.innerHTML = '';
    skills.forEach(s => {
        var t = document.createElement('span'); t.className = 'sk-tag'; t.textContent = s;
        t.onclick = () => t.classList.toggle('on');
        cloud.appendChild(t);
    });
}

function addCustomSkill() {
    var inp = document.getElementById('customSkill'); var v = inp.value.trim(); if (!v) return;
    var t = document.createElement('span'); t.className = 'sk-tag on';
    t.innerHTML = v + ' <span style="cursor:pointer;margin-left:4px" onclick="this.parentElement.remove()">✕</span>';
    document.getElementById('skillCloud').appendChild(t); inp.value = '';
}

function addLink() {
    var id = 'lnk' + (++bc); var row = document.createElement('div'); row.className = 'link-row'; row.id = id;
    row.style.cssText = 'border:1.5px dashed var(--border2);border-radius:12px;padding:12px;margin-bottom:12px;display:flex;flex-direction:column;gap:10px;position:relative;background:rgba(247,245,240,0.5)';
    var optTxt = ['GitHub', 'Portfolio', 'Site web', 'Lien'].map(l => '<option>' + l + '</option>').join('');
    row.innerHTML = '<button type="button" onclick="rmB(\'' + id + '\')" class="rem-btn">&#x2715;</button>'
        + '<div style="display:flex;gap:8px;flex-wrap:wrap"><select style="width:120px;padding:8px;border-radius:8px">' + optTxt + '</select>'
        + '<input type="text" placeholder="URL" style="flex:1;padding:8px;border-radius:8px"></div>'
        + '<textarea placeholder="Description" style="padding:8px;border-radius:8px;min-height:50px"></textarea>';
    document.getElementById('linksBlocks').appendChild(row);
}

/* --- DOWNLOADS --- */
function downloadPDF() {
    var el = document.getElementById('cv-out'); if (!el?.innerHTML.trim()) { showToast('Générez d\'abord votre CV !'); return; }
    window.print();
}

function downloadWord() {
    var el = document.getElementById('cv-out'); if (!el?.innerHTML.trim()) { showToast('Générez d\'abord votre CV !'); return; }
    document.getElementById('loading').classList.add('show');
    if (window.docx) { _buildWord(); }
    else {
        var s = document.createElement('script');
        s.src = 'https://cdn.jsdelivr.net/npm/docx@8.5.0/build/index.umd.min.js';
        s.onload = _buildWord;
        s.onerror = () => { document.getElementById('loading').classList.remove('show'); showToast('Erreur : Bibliothèque Word bloquée.'); };
        document.head.appendChild(s);
    }
}

async function _buildWord() {
    try {
        var d = collect(); var name = (d.lastName.toUpperCase() + ' ' + d.firstName).trim() || 'Mon CV';
        var { Paragraph: Para, TextRun: TR, Document: Doc, Packer, ExternalHyperlink: EL, ImageRun: IMG } = window.docx;

        function t(s, o) { return new TR({ text: String(s || ''), ...o }); }
        function p(ch, o) { return new Para({ children: Array.isArray(ch) ? ch : [ch], ...o }); }
        function h(s) { return p([t(s, { bold: true, size: 26, color: '14213D' })], { spacing: { before: 200, after: 80 } }); }

        var ch = [];
        if (d.photo) {
            try {
                var b64Data = d.photo.split(',')[1];
                ch.push(p([new IMG({ data: Uint8Array.from(atob(b64Data), c => c.charCodeAt(0)), transformation: { width: 90, height: 90 } })]));
            } catch (e) { }
        }
        ch.push(p([t(name, { bold: true, size: 48 })]));
        if (d.jobTitle) ch.push(p([t(d.jobTitle, { size: 26, color: '2563EB' })]));

        var doc = new Doc({ sections: [{ children: ch }] });
        var blob = await Packer.toBlob(doc);
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a'); a.href = url; a.download = 'CV_' + name.replace(/\s+/g, '_') + '.docx';
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        showToast('Fichier Word téléchargé !');
    } catch (e) { showToast('Erreur Word.'); }
    document.getElementById('loading').classList.remove('show');
}

/* --- PERSISTENCE --- */
function saveToLocal() {
    try {
        var d = collect(); d._nav = { step: ST.step, domain: ST.domain, tpl: ST.template };
        localStorage.setItem('creacv_autosave', JSON.stringify(d));
    } catch (e) { }
}

function loadFromLocal() {
    try {
        var s = localStorage.getItem('creacv_autosave'); if (!s) return;
        var d = JSON.parse(s);
        if (d._nav) {
            if (d._nav.domain) {
                var card = document.querySelector(`.dom-card[data-d="${d._nav.domain}"]`);
                if (card) selDom(card);
            }
            if (d._nav.tpl) {
                var card = document.querySelector(`.tpl-card[data-t="${d._nav.tpl}"]`);
                if (card) selTpl(card);
            }
            /* Note: We don't restore the step automatically to avoid confusing the user */
        }
        /* Fill fields logic would go here if needed */
    } catch (e) { }
}

/* --- AI DATA FILLING --- */
function fillAllFields(d) {
    if (!d) return;
    function sv(id, val) { var e = document.getElementById(id); if (e && val !== undefined) e.value = val; }

    sv('firstName', d.firstName);
    sv('lastName', d.lastName);
    sv('jobTitle', d.jobTitle);
    sv('email', d.email);
    sv('phone', d.phone);
    sv('city', d.city);
    sv('nationality', d.nationality);
    sv('linkedin', d.linkedin);
    sv('profile', d.profile);
    sv('hobbies', d.hobbies);

    if (d.dob) {
        var parts = d.dob.split('/');
        if (parts.length === 3) {
            var dd = document.getElementById('dob_d'), dm = document.getElementById('dob_m'), dy = document.getElementById('dob_y');
            if (dd) { dd.value = parseInt(parts[0], 10); }
            if (dm) { dm.value = parseInt(parts[1], 10); }
            if (dy) { dy.value = parts[2]; }
        }
    }

    if (d.links && d.links.length) {
        var lb = document.getElementById('linksBlocks');
        if (lb) {
            lb.innerHTML = '';
            d.links.forEach(l => {
                if (!l.url) return;
                addLink();
                var rows = document.querySelectorAll('#linksBlocks .link-row');
                var lr = rows[rows.length - 1];
                if (lr) {
                    var sel = lr.querySelector('select'), inp = lr.querySelector('input'), ta = lr.querySelector('textarea');
                    if (sel && l.lbl) sel.value = l.lbl;
                    if (inp) inp.value = l.url;
                    if (ta && l.desc) ta.value = l.desc;
                }
            });
        }
    }

    if (d.educations && d.educations.length) {
        var eb = document.getElementById('eduBlocks');
        if (eb) {
            eb.innerHTML = '';
            d.educations.forEach(e => {
                addEdu();
                var blocks = document.querySelectorAll('#eduBlocks .rep-block');
                var b = blocks[blocks.length - 1];
                var ins = b.querySelectorAll('input'), sels = b.querySelectorAll('select'), ta = b.querySelector('textarea');
                if (ins[0]) ins[0].value = e.deg || '';
                if (ins[1]) ins[1].value = e.sch || '';
                if (ins[2]) ins[2].value = e.cty || '';
                if (ins[3]) ins[3].value = e.men || '';
                if (sels[0] && e.sy) sels[0].value = e.sy;
                if (sels[1] && e.ey) sels[1].value = e.ey;
                if (ta) ta.value = e.desc || '';
            });
        }
    }

    if (d.experiences && d.experiences.length) {
        var noExp = document.getElementById('noExp');
        if (noExp) noExp.checked = false;
        var exb = document.getElementById('expBlocks');
        if (exb) {
            exb.innerHTML = '';
            var expSec = document.getElementById('expSection');
            if (expSec) expSec.style.display = 'block';
            d.experiences.forEach(e => {
                addExp();
                var blocks = document.querySelectorAll('#expBlocks .rep-block');
                var b = blocks[blocks.length - 1];
                var ins = b.querySelectorAll('input'), sels = b.querySelectorAll('select'), ta = b.querySelector('textarea');
                if (ins[0]) ins[0].value = e.ttl || '';
                if (ins[1]) ins[1].value = e.cmp || '';
                if (ta) ta.value = e.desc || '';
                if (e.start) {
                    var sp = e.start.split(' ');
                    var mo = MONTHS.findIndex(m => sp[0] && m.toLowerCase().indexOf(sp[0].toLowerCase()) === 0);
                    if (mo > -1 && sels[0]) sels[0].value = mo + 1;
                    var yr = sp.find(s => s.match(/^\d{4}$/));
                    if (yr && sels[1]) sels[1].value = yr;
                }
                if (e.end) {
                    if (e.end === 'En cours') { if (sels[3]) sels[3].value = 'En cours'; }
                    else {
                        var sp = e.end.split(' ');
                        var mo = MONTHS.findIndex(m => sp[0] && m.toLowerCase().indexOf(sp[0].toLowerCase()) === 0);
                        if (mo > -1 && sels[2]) sels[2].value = mo + 1;
                        var yr = sp.find(s => s.match(/^\d{4}$/));
                        if (yr && sels[3]) sels[3].value = yr;
                    }
                }
            });
        }
    }

    if (d.skills && d.skills.length) {
        document.querySelectorAll('.sk-tag').forEach(t => {
            var txt = t.textContent.replace('✕', '').trim();
            if (d.skills.includes(txt)) t.classList.add('on');
        });
    }

    if (d.languages && d.languages.length) {
        var lrw = document.getElementById('langRows');
        if (lrw) {
            lrw.innerHTML = '';
            d.languages.forEach(l => {
                addLang();
                var rows = document.querySelectorAll('#langRows .lang-row');
                var r = rows[rows.length - 1];
                if (r) {
                    var inp = r.querySelector('input'); if (inp) inp.value = l.nm || '';
                    var ls = r.querySelectorAll('.ll');
                    ls.forEach(lv => { if (l.lv && lv.textContent === l.lv) lv.classList.add('on'); });
                }
            });
        }
    }
    saveToLocal();
}
