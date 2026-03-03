/* =============================================
   CV RENDERING ENGINE
============================================= */

/* --- HELPERS --- */
function esc(s) { if (!s) return ''; return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

function safeHtml(s) {
    if (!s) return '';
    var escaped = String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    escaped = escaped
        .replace(/&lt;(\/?)strong&gt;/gi, '<$1strong>')
        .replace(/&lt;(\/?)b&gt;/gi, '<$1b>')
        .replace(/&lt;(\/?)em&gt;/gi, '<$1em>')
        .replace(/&lt;(\/?)i&gt;/gi, '<$1i>')
        .replace(/&lt;br\s*\/?&gt;/gi, '<br>');
    return escaped.replace(/\n/g, '<br>');
}

function eduDate(e) {
    var p = [];
    if (e.sy && e.sy !== 'Année') p.push(e.sy);
    if (e.ey && e.ey !== 'Année') p.push(e.ey);
    return p.join(' – ');
}

function expDate(e) { return [e.start, e.end].filter(Boolean).join(' – '); }

function photoEl(d, cls, ph) {
    if (d.photo) return '<img class="' + cls + '" src="' + d.photo + '" alt="photo">';
    return '<div class="' + ph + '">👤</div>';
}

function contacts(d, sep) {
    var p = [];
    if (d.phone) p.push('📞 ' + esc(d.phone));
    if (d.email) p.push('✉ ' + esc(d.email));
    if (d.city) p.push('📍 ' + esc(d.city));
    if (d.linkedin) p.push('in ' + esc(d.linkedin));
    if (d.website) p.push('🌐 ' + esc(d.website));
    if (d.dob) p.push('Né(e) le ' + esc(d.dob));
    if (d.nationality) p.push(esc(d.nationality));
    return p.join(sep || ' · ');
}

function renderLinks(d, cls) {
    if (!d.links || !d.links.length) return '';
    var h = '';
    d.links.forEach(function (l) {
        var url = l.url;
        var displayUrl = url.replace(/^https?:\/\//, '').replace(/^www\./, '');
        h += '<div class="' + (cls || '') + '" style="margin-top:6px;margin-bottom:8px">'
            + '<strong>' + esc(l.lbl) + ' :</strong> <a href="' + (url.indexOf('http') === 0 ? url : 'https://' + url) + '" target="_blank" style="color:inherit;text-decoration:underline">' + esc(displayUrl) + '</a>'
            + (l.desc ? '<div style="font-size:0.9em;opacity:0.8;margin-top:2px">' + safeHtml(l.desc) + '</div>' : '')
            + '</div>';
    });
    return h;
}

function expSection(d, headCls, itemFn) {
    var h = '';
    if (d.educations.length) { h += '<div class="' + headCls + '">Formation</div>'; d.educations.forEach(function (e) { h += itemFn(e.deg, e.sch + (e.cty ? ', ' + e.cty : ''), eduDate(e), e.desc, e.men); }); }
    if (d.experiences.length) { h += '<div class="' + headCls + '">Expériences</div>'; d.experiences.forEach(function (e) { h += itemFn(e.ttl, e.cmp, expDate(e), e.desc, ''); }); }
    if (d.projects && d.projects.length) { h += '<div class="' + headCls + '">Projets académiques</div>'; d.projects.forEach(function (p) { h += itemFn(p.nm, '', p.per, p.desc, ''); }); }
    if (d.activities && d.activities.length) { h += '<div class="' + headCls + '">Activités &amp; Bénévolat</div>'; d.activities.forEach(function (a) { h += itemFn(a.role, a.org, a.per, a.descA, ''); }); }
    return h;
}

/* --- DATA COLLECTION --- */
function gv(id) { var e = document.getElementById(id); return e ? e.value.trim() : ''; }

function collect() {
    var d = {};
    d.firstName = gv('firstName');
    d.lastName = gv('lastName');
    d.jobTitle = gv('jobTitle');
    d.nationality = gv('nationality');
    d.city = gv('city');
    d.phone = gv('phone');
    d.email = gv('email');
    d.linkedin = gv('linkedin');
    d.website = d.linkedin; /* Fallback for templates using .website */

    d.links = [];
    document.querySelectorAll('#linksBlocks .link-row').forEach(function (r) {
        var sel = r.querySelector('select');
        var inp = r.querySelector('input[type=text]');
        var ta = r.querySelector('textarea');
        var url = inp ? inp.value.trim() : '';
        if (url) d.links.push({ url: url, lbl: sel ? sel.value : 'Lien', desc: ta ? ta.value.trim() : '' });
    });

    d.profile = gv('profile');
    d.hobbies = gv('hobbies');
    d.photo = typeof ST !== 'undefined' ? ST.photo : null;

    var dd = document.getElementById('dob_d').value, dm = document.getElementById('dob_m').value, dy = document.getElementById('dob_y').value;
    d.dob = (dd && dm && dy) ? String(dd).padStart(2, '0') + '/' + String(dm).padStart(2, '0') + '/' + dy : '';

    /* Repeats */
    d.educations = [];
    document.querySelectorAll('#eduBlocks .rep-block').forEach(function (b) {
        var ins = b.querySelectorAll('input'); var sels = b.querySelectorAll('select'); var ta = b.querySelector('textarea');
        var deg = ins[0]?.value.trim() || ''; var sch = ins[1]?.value.trim() || '';
        if (deg || sch) d.educations.push({ deg: deg, sch: sch, cty: ins[2]?.value.trim() || '', men: ins[3]?.value.trim() || '', sy: sels[0]?.value || '', ey: sels[1]?.value || '', desc: ta?.value.trim() || '' });
    });

    d.experiences = [];
    if (!document.getElementById('noExp').checked) {
        document.querySelectorAll('#expBlocks .rep-block').forEach(function (b) {
            var ins = b.querySelectorAll('input'); var sels = b.querySelectorAll('select'); var ta = b.querySelector('textarea');
            var ttl = ins[0]?.value.trim() || ''; var cmp = ins[1]?.value.trim() || '';
            var start = [sels[0]?.value, sels[1]?.value].filter(x => x && x !== 'Mois' && x !== 'Année').join(' ');
            var end = sels[3]?.value === 'En cours' ? 'En cours' : [sels[2]?.value, sels[3]?.value].filter(x => x && x !== 'Mois' && x !== 'Année').join(' ');
            if (ttl || cmp) d.experiences.push({ ttl: ttl, cmp: cmp, start: start, end: end, desc: ta?.value.trim() || '' });
        });
    }

    d.projects = [];
    document.querySelectorAll('#projBlocks .rep-block').forEach(function (b) {
        var ins = b.querySelectorAll('input'); var ta = b.querySelector('textarea');
        if (ins[0]?.value.trim()) d.projects.push({ nm: ins[0].value.trim(), per: ins[1]?.value.trim() || '', desc: ta?.value.trim() || '' });
    });

    d.activities = [];
    document.querySelectorAll('#actBlocks .rep-block').forEach(function (b) {
        var ins = b.querySelectorAll('input');
        if (ins[0]?.value.trim()) d.activities.push({ role: ins[0].value.trim(), org: ins[1]?.value.trim() || '', per: ins[2]?.value.trim() || '', descA: ins[3]?.value.trim() || '' });
    });

    d.skills = [];
    document.querySelectorAll('.sk-tag.on').forEach(function (t) {
        var txt = t.textContent.replace('✕', '').trim(); if (txt) d.skills.push(txt);
    });

    d.languages = [];
    document.querySelectorAll('#langRows .lang-row').forEach(function (r) {
        var nm = r.querySelector('input')?.value.trim();
        var lv = r.querySelector('.ll.on')?.textContent;
        if (nm) d.languages.push({ nm: nm, lv: lv || '' });
    });

    return d;
}

/* --- MAIN RENDERERS --- */
function generateCV() {
    if (typeof ST === 'undefined' || !ST.template) { showToast('Choisissez un modèle (étape 2)'); return; }
    var d = collect();
    var html = renderTpl(d, ST.template);
    var out = document.getElementById('cv-out');
    if (!out) return;
    out.innerHTML = html;
    out.style.transform = '';
    out.style.transformOrigin = '';
    out.parentElement.style.height = '';
    setTimeout(function () {
        var cw = out.parentElement.clientWidth - 40; var cvW = out.scrollWidth;
        if (cvW > cw) { var sc = cw / cvW; out.style.transform = 'scale(' + sc + ')'; out.style.transformOrigin = 'top left'; out.parentElement.style.height = (out.scrollHeight * sc + 40) + 'px'; }
    }, 80);
}

function renderTpl(d, tpl) {
    /* Correction : NOM Prénom */
    var fN = d.firstName || '';
    var lN = (d.lastName || '').toUpperCase();
    var name = (lN + ' ' + fN).trim() || 'NOM Prénom';

    switch (tpl) {
        case 't2': return rT2(d, name);
        case 't3': return rT3(d, name);
        case 't4': return rT4(d, name);
        case 't5': return rT5(d, name);
        case 't6': return rT6(d, name);
        case 't7': return rT7(d, name);
        case 't8': return rT8(d, name);
        case 't9': return rT9(d, name);
        case 't10': return rT10(d, name);
        default: return rT1(d, name);
    }
}

/* Template Renderers (Simplified for space) */
function rT1(d, name) {
    var h = '<div class="cv-wrap cv-t1"><div class="top">' + photoEl(d, 'photo', 'photo') + '<div><div class="name">' + esc(name) + '</div>';
    if (d.jobTitle) h += '<div class="role">' + esc(d.jobTitle) + '</div>';
    h += '<div class="contacts">' + contacts(d, ' &nbsp;|&nbsp; ') + '</div></div></div>';
    if (d.profile) h += '<h2>Profil</h2><p class="profile">' + safeHtml(d.profile) + '</p>';
    h += renderLinks(d, 'website-badge');
    function item(t, o, dt, desc, men) {
        var r = '<div class="item"><div class="ihead"><span>' + esc(t) + '</span><span style="font-weight:400;font-size:12px;color:#718096">' + esc(dt) + '</span></div>';
        if (o) r += '<div class="isub">' + esc(o) + '</div>';
        if (men) r += '<div style="font-size:11px;color:#2563eb">Mention : ' + esc(men) + '</div>';
        if (desc) r += '<div class="idesc">' + safeHtml(desc) + '</div>';
        return r + '</div>';
    }
    h += expSection(d, 'h2', item);
    if (d.skills.length) h += '<h2>Compétences</h2><div class="skills">' + d.skills.map(s => '<span class="sk">' + esc(s) + '</span>').join('') + '</div>';
    if (d.languages.length) h += '<h2>Langues</h2><div class="langs">' + d.languages.map(l => '<span class="lang">' + esc(l.nm) + (l.lv ? ' — ' + esc(l.lv) : '') + '</span>').join('') + '</div>';
    if (d.hobbies) h += '<h2>Centres d\'intérêt</h2><p style="font-size:12px;color:#4a5568">' + esc(d.hobbies) + '</p>';
    return h + '</div>';
}

function rT2(d, name) {
    function sCI(t) { return '<div class="s-ci"><span class="s-dot"></span>' + esc(t) + '</div>'; }
    var h = '<div class="cv-wrap cv-t2"><div class="sidebar">' + photoEl(d, 'photo', 'photo');
    h += '<div class="s-name">' + esc(name) + '</div>';
    if (d.jobTitle) h += '<div class="s-role">' + esc(d.jobTitle) + '</div>';
    h += '<div class="s-sep"></div><div class="s-lbl">Contact</div>';
    if (d.phone) h += sCI(d.phone); if (d.email) h += sCI(d.email); if (d.city) h += sCI(d.city);
    if (d.linkedin) h += sCI(d.linkedin); if (d.website) h += sCI(d.website);
    if (d.dob || d.nationality) { h += '<div class="s-lbl">Infos</div>'; if (d.dob) h += sCI('Né(e) le ' + d.dob); if (d.nationality) h += sCI(d.nationality); }
    h += renderLinks(d, 's-ci');
    if (d.skills.length) { h += '<div class="s-lbl">Compétences</div>'; d.skills.forEach(s => { h += '<span class="s-sk">' + esc(s) + '</span>'; }); }
    if (d.languages.length) { h += '<div class="s-lbl">Langues</div>'; d.languages.forEach(l => { h += '<div class="s-lang"><span>' + esc(l.nm) + '</span><span class="s-lang-lv">' + esc(l.lv) + '</span></div>'; }); }
    if (d.hobbies) h += '<div class="s-lbl">Intérêts</div><div style="font-size:9.5px;color:rgba(255,255,255,.6)">' + esc(d.hobbies) + '</div>';
    h += '</div><div class="main">';
    if (d.jobTitle) h += '<div class="m-role">' + esc(d.jobTitle) + '</div>';
    if (d.profile) h += '<div class="m-profile">' + safeHtml(d.profile) + '</div>';
    function item(t, o, dt, desc, men) {
        var r = '<div class="item"><div class="ihead"><span class="ititle">' + esc(t) + '</span><span class="idate">' + esc(dt) + '</span></div>';
        if (o) r += '<div class="iorg">' + esc(o) + '</div>';
        if (men) r += '<div style="font-size:10.5px;color:#2563eb">Mention : ' + esc(men) + '</div>';
        if (desc) r += '<div class="idesc">' + safeHtml(desc) + '</div>';
        return r + '</div>';
    }
    h += expSection(d, 'h2', item);
    return h + '</div></div>';
}

function rT3(d, name) {
    var h = '<div class="cv-wrap cv-t3">';
    h += '<div class="top">' + photoEl(d, 'photo', 'photo') + '<div><div class="name">' + esc(name) + '</div>';
    if (d.jobTitle) h += '<div class="role">' + esc(d.jobTitle) + '</div>';
    h += '</div></div><div class="contacts">' + contacts(d, '</span><span>') + '</div>';
    if (d.profile) h += '<h2>Profil</h2><p class="profile">' + safeHtml(d.profile) + '</p>';
    h += renderLinks(d, 'site-link');
    function item(t, o, dt, desc, men) {
        var r = '<div class="item"><div class="idate">' + esc(dt) + '</div><div><div class="ititle">' + esc(t) + '</div>';
        if (o) r += '<div class="iorg">' + esc(o) + '</div>';
        if (men) r += '<div style="font-size:10px;color:#d97706;font-weight:700">Mention : ' + esc(men) + '</div>';
        if (desc) r += '<div class="idesc">' + safeHtml(desc) + '</div>';
        return r + '</div></div>';
    }
    h += expSection(d, 'h2', item);
    if (d.skills.length) h += '<h2>Compétences</h2><div class="skills">' + d.skills.map(s => '<span class="sk">' + esc(s) + '</span>').join('') + '</div>';
    if (d.languages.length) h += '<h2>Langues</h2><div class="langs">' + d.languages.map(l => '<div class="lang">' + esc(l.nm) + (l.lv ? ' — <strong>' + esc(l.lv) + '</strong>' : '') + '</div>').join('') + '</div>';
    if (d.hobbies) h += '<h2>Centres d\'intérêt</h2><p style="font-size:12px;color:#555">' + esc(d.hobbies) + '</p>';
    return h + '</div>';
}

function rT4(d, name) {
    function sCI(t) { return '<div class="s-ci"><span class="s-dot"></span>' + esc(t) + '</div>'; }
    var h = '<div class="cv-wrap cv-t4"><div class="sidebar">' + photoEl(d, 'photo', 'photo');
    h += '<div class="s-name">' + esc(name) + '</div>';
    if (d.jobTitle) h += '<div class="s-role">' + esc(d.jobTitle) + '</div>';
    h += '<div class="s-sep"></div><div class="s-lbl">Contact</div>';
    if (d.phone) h += sCI(d.phone); if (d.email) h += sCI(d.email); if (d.city) h += sCI(d.city);
    if (d.linkedin) h += sCI(d.linkedin); if (d.website) h += sCI(d.website);
    if (d.dob || d.nationality) { h += '<div class="s-lbl">Infos</div>'; if (d.dob) h += sCI('Né(e) le ' + d.dob); if (d.nationality) h += sCI(d.nationality); }
    h += renderLinks(d, 's-ci');
    if (d.skills.length) { h += '<div class="s-lbl">Compétences</div>'; d.skills.forEach(s => { h += '<span class="s-sk">' + esc(s) + '</span>'; }); }
    if (d.languages.length) { h += '<div class="s-lbl">Langues</div>'; d.languages.forEach(l => { h += '<div class="s-lang"><span>' + esc(l.nm) + '</span><span class="s-lang-lv">' + esc(l.lv) + '</span></div>'; }); }
    h += '</div><div class="main">';
    if (d.jobTitle) h += '<div class="m-role">' + esc(d.jobTitle) + '</div>';
    if (d.profile) h += '<div class="m-profile">' + safeHtml(d.profile) + '</div>';
    function item(t, o, dt, desc, men) {
        var r = '<div class="item"><div class="ihead"><span class="ititle">' + esc(t) + '</span><span class="idate">' + esc(dt) + '</span></div>';
        if (o) r += '<div class="iorg">' + esc(o) + '</div>';
        if (men) r += '<div style="font-size:10px;color:#6366f1">Mention : ' + esc(men) + '</div>';
        if (desc) r += '<div class="idesc">' + safeHtml(desc) + '</div>';
        return r + '</div>';
    }
    h += expSection(d, 'h2', item);
    return h + '</div></div>';
}

function rT5(d, name) {
    var h = '<div class="cv-wrap cv-t5"><div class="top"><div class="photo-row">' + photoEl(d, 'photo', 'photo') + '<div><div class="name">' + esc(name) + '</div>';
    if (d.jobTitle) h += '<div class="role">' + esc(d.jobTitle) + '</div>';
    h += '</div></div><div class="contacts">' + contacts(d, ' · ') + '</div></div>';
    if (d.profile) h += '<h2>Profil</h2><p class="profile">' + safeHtml(d.profile) + '</p>';
    h += renderLinks(d, '');
    function item(t, o, dt, desc, men) {
        var r = '<div class="item"><div class="idate">' + esc(dt) + '</div><div><div class="ititle">' + esc(t) + '</div>';
        if (o) r += '<div class="iorg">' + esc(o) + '</div>';
        if (men) r += '<div style="font-size:10.5px;color:#555">Mention : ' + esc(men) + '</div>';
        if (desc) r += '<div class="idesc">' + safeHtml(desc) + '</div>';
        return r + '</div></div>';
    }
    h += expSection(d, 'h2', item);
    if (d.skills.length) h += '<h2>Compétences</h2><div class="skills">' + d.skills.map(s => '<span class="sk">' + esc(s) + '</span>').join('') + '</div>';
    if (d.languages.length) h += '<h2>Langues</h2><div class="langs">' + d.languages.map(l => '<div class="lang">' + esc(l.nm) + (l.lv ? ' — ' + esc(l.lv) : '') + '</div>').join('') + '</div>';
    return h + '</div>';
}

function rT6(d, name) {
    var h = '<div class="cv-wrap cv-t6"><div class="header">' + photoEl(d, 'photo', 'photo') + '<div class="h-info"><div class="h-name">' + esc(name) + '</div>';
    if (d.jobTitle) h += '<div class="h-role">' + esc(d.jobTitle) + '</div>';
    h += '<div class="h-contacts">';
    if (d.phone) h += '<span class="h-c">📞 ' + esc(d.phone) + '</span>';
    if (d.email) h += '<span class="h-c">✉ ' + esc(d.email) + '</span>';
    if (d.city) h += '<span class="h-c">📍 ' + esc(d.city) + '</span>';
    if (d.linkedin) h += '<span class="h-c">in ' + esc(d.linkedin) + '</span>';
    h += '</div></div></div><div class="body"><div class="left">';
    if (d.profile) h += '<div class="sect"><div class="s-ttl">Profil</div><p style="font-size:11px;color:#475569;line-height:1.6">' + safeHtml(d.profile) + '</p></div>';
    h += renderLinks(d, 's-ci');
    if (d.skills.length) { h += '<div class="sect"><div class="s-ttl">Compétences</div>'; d.skills.forEach(s => { h += '<span class="s-sk">' + esc(s) + '</span>'; }); h += '</div>'; }
    if (d.languages.length) { h += '<div class="sect"><div class="s-ttl">Langues</div>'; d.languages.forEach(l => { h += '<div class="s-lang"><span>' + esc(l.nm) + '</span><span>' + esc(l.lv) + '</span></div>'; }); h += '</div>'; }
    h += '</div><div class="right">';
    function item(t, o, dt, desc, men) {
        var r = '<div class="item"><div class="ihead"><span class="ititle">' + esc(t) + '</span><span class="idate">' + esc(dt) + '</span></div>';
        if (o) r += '<div class="iorg">' + esc(o) + '</div>';
        if (men) r += '<div style="font-size:10px;color:#1e40af">Mention : ' + esc(men) + '</div>';
        if (desc) r += '<div class="idesc">' + safeHtml(desc) + '</div>';
        return r + '</div>';
    }
    h += expSection(d, 'h2', item);
    return h + '</div></div></div>';
}

function rT7(d, name) {
    function sCI(t) { return '<div class="s-ci"><span class="s-dot"></span>' + esc(t) + '</div>'; }
    var h = '<div class="cv-wrap cv-t7"><div class="sidebar">' + photoEl(d, 'photo', 'photo');
    h += '<div class="s-name">' + esc(name) + '</div>';
    if (d.jobTitle) h += '<div class="s-role">' + esc(d.jobTitle) + '</div>';
    h += '<div class="s-sep"></div><div class="s-lbl">Contact</div>';
    if (d.phone) h += sCI(d.phone); if (d.email) h += sCI(d.email); if (d.city) h += sCI(d.city);
    if (d.linkedin) h += sCI(d.linkedin); if (d.website) h += sCI(d.website);
    h += renderLinks(d, 's-ci');
    if (d.skills.length) { h += '<div class="s-lbl">Compétences</div>'; d.skills.forEach(s => { h += '<span class="s-sk">' + esc(s) + '</span>'; }); }
    h += '</div><div class="main">';
    if (d.jobTitle) h += '<div class="m-role">' + esc(d.jobTitle) + '</div>';
    if (d.profile) h += '<div class="m-profile">' + safeHtml(d.profile) + '</div>';
    function item(t, o, dt, desc, men) {
        var r = '<div class="item"><div class="ihead"><span class="ititle">' + esc(t) + '</span><span class="idate">' + esc(dt) + '</span></div>';
        if (o) r += '<div class="iorg">' + esc(o) + '</div>';
        if (men) r += '<div style="font-size:10px;color:#059669">Mention : ' + esc(men) + '</div>';
        if (desc) r += '<div class="idesc">' + safeHtml(desc) + '</div>';
        return r + '</div>';
    }
    h += expSection(d, 'h2', item);
    return h + '</div></div>';
}

function rT8(d, name) {
    var h = '<div class="cv-wrap cv-t8"><div class="header">' + photoEl(d, 'photo', 'photo') + '<div><div class="h-name">' + esc(name) + '</div>';
    if (d.jobTitle) h += '<div class="h-role">' + esc(d.jobTitle) + '</div>';
    h += '<div class="h-contacts">' + contacts(d, ' <span>·</span> ') + '</div></div></div><div class="body">';
    if (d.profile) h += '<div class="m-profile">' + safeHtml(d.profile) + '</div>';
    h += renderLinks(d, '');
    function item(t, o, dt, desc, men) {
        var r = '<div class="item"><div class="ihead"><span class="ititle">' + esc(t) + '</span><span class="idate">' + esc(dt) + '</span></div>';
        if (o) r += '<div class="iorg">' + esc(o) + '</div>';
        if (men) r += '<div style="font-size:10px;color:#c0544a">Mention : ' + esc(men) + '</div>';
        if (desc) r += '<div class="idesc">' + safeHtml(desc) + '</div>';
        return r + '</div>';
    }
    h += '<div class="grid2">';
    h += '<div><h2>Formation</h2>' + d.educations.map(e => item(e.deg, e.sch, eduDate(e), e.desc, e.men)).join('') + '</div>';
    h += '<div><h2>Expériences</h2>' + d.experiences.map(e => item(e.ttl, e.cmp, expDate(e), e.desc, '')).join('') + '</div>';
    h += '</div>' + expSection({ educations: [], experiences: [], projects: d.projects, activities: d.activities }, 'h2', item);
    if (d.skills.length) h += '<h2>Compétences</h2><div class="skills">' + d.skills.map(s => '<span class="sk">' + esc(s) + '</span>').join('') + '</div>';
    return h + '</div></div>';
}

function rT9(d, name) {
    var h = '<div class="cv-wrap cv-t9"><div class="header">' + photoEl(d, 'photo', 'photo') + '<div><div class="h-name">' + esc(name) + '</div>';
    if (d.jobTitle) h += '<div class="h-role">' + esc(d.jobTitle) + '</div>';
    h += '<div class="h-contacts">' + contacts(d, ' <span>·</span> ') + '</div></div></div><div class="body"><div class="left">';
    if (d.profile) h += '<div class="s-lbl">Profil</div><p style="font-size:10.5px;color:rgba(255,255,255,.6)">' + safeHtml(d.profile) + '</p>';
    h += renderLinks(d, 's-ci');
    if (d.skills.length) { h += '<div class="s-lbl">Compétences</div>'; d.skills.forEach(s => { h += '<span class="s-sk">' + esc(s) + '</span>'; }); }
    h += '</div><div class="right">';
    function item(t, o, dt, desc, men) {
        var r = '<div class="item"><div class="ihead"><span class="ititle">' + esc(t) + '</span><span class="idate">' + esc(dt) + '</span></div>';
        if (o) r += '<div class="iorg">' + esc(o) + '</div>';
        if (men) r += '<div style="font-size:10px;color:#818cf8">Mention : ' + esc(men) + '</div>';
        if (desc) r += '<div class="idesc">' + safeHtml(desc) + '</div>';
        return r + '</div>';
    }
    h += expSection(d, 'h2', item);
    return h + '</div></div></div>';
}

function rT10(d, name) {
    var h = '<div class="cv-wrap cv-t10"><div class="header">' + photoEl(d, 'photo', 'photo') + '<div class="h-info"><div class="h-name">' + esc(name) + '</div>';
    if (d.jobTitle) h += '<div class="h-role">' + esc(d.jobTitle) + '</div>';
    h += '</div></div><div class="sub-bar">' + contacts(d, ' <span>·</span> ') + '</div><div class="body"><div class="left">';
    if (d.profile) h += '<p class="m-profile">' + safeHtml(d.profile) + '</p>';
    h += renderLinks(d, '');
    function item(t, o, dt, desc, men) {
        var r = '<div class="item"><div class="ihead"><span class="ititle">' + esc(t) + '</span><span class="idate">' + esc(dt) + '</span></div>';
        if (o) r += '<div class="iorg">' + esc(o) + '</div>';
        if (men) r += '<div style="font-size:10px;color:#f59e0b;font-weight:700">Mention : ' + esc(men) + '</div>';
        if (desc) r += '<div class="idesc">' + safeHtml(desc) + '</div>';
        return r + '</div>';
    }
    h += expSection({ educations: d.educations, experiences: [], projects: d.projects, activities: d.activities }, 'h2', item);
    h += '</div><div class="right">';
    if (d.experiences.length) { h += '<h2>Expériences</h2>'; d.experiences.forEach(e => { h += item(e.ttl, e.cmp, expDate(e), e.desc, ''); }); }
    if (d.skills.length) h += '<h2>Compétences</h2><div class="skills">' + d.skills.map(s => '<span class="sk">' + esc(s) + '</span>').join('') + '</div>';
    return h + '</div></div></div>';
}
/* --- MINI PREVIEWS (FOR SELECTION) --- */
function renderThumbnails(domain) {
    var cfg = DOMAIN[domain] || DOMAIN.autre;
    var dummy = {
        firstName: 'Elie',
        lastName: 'POUHE',
        jobTitle: cfg.titlePH.replace('Ex : ', ''),
        email: 'contact@exemple.com',
        phone: '+237 600 000 000',
        city: 'Yaoundé, Cameroun',
        profile: cfg.profilePH.replace('Ex : ', '').substring(0, 100) + '...',
        educations: [{ deg: 'Master Informatique', sch: 'Université', sy: '2020', ey: '2022' }],
        experiences: [{ ttl: 'Poste Actuel', cmp: 'Entreprise X', start: 'Janv 2023', end: 'En cours' }],
        skills: cfg.skills.slice(0, 5),
        languages: [{ nm: 'Français', lv: 'Maternel' }, { nm: 'Anglais', lv: 'Bilingue' }],
        links: [],
        projects: [],
        activities: [],
        photo: null
    };

    for (var i = 1; i <= 10; i++) {
        var id = 't' + i;
        var container = document.querySelector('.cv-mini.' + id);
        if (container) {
            container.innerHTML = renderTpl(dummy, id);
        }
    }
}
