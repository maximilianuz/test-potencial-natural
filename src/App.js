import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PART1_END = 9;

// ======================================================================
// 1. CSS COMPLETO Y OPTIMIZADO PARA MÓVILES (INTOCABLE)
// ======================================================================
const G = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  :root{
    --gold:#c8aa6e;--gold-d:rgba(200,170,110,0.11);--gold-b:rgba(200,170,110,0.26);
    --bg:#05050b;--card:#0c0c18;--card2:#0f0f1e;
    --text:rgba(255,255,255,0.9);--muted:rgba(255,255,255,0.62);
    --setter:#7aafd4;--closer:#d4826e;--open:#8fc88a;--cons:#b48adc;--motiv:#f0c060;
  }
  html,body,#root{background:var(--bg);min-height:100vh}
  body{color:var(--text);font-family:'DM Sans',sans-serif;line-height:1.68}
  .shell{position:relative;z-index:1;max-width:650px;margin:0 auto;padding:52px 28px 96px;
    min-height:100vh;display:flex;flex-direction:column;justify-content:center}
  h1{font-family:'Cormorant Garamond',serif;font-size:clamp(1.9rem,5vw,2.9rem);font-weight:300;
    line-height:1.16;color:#fff;margin-bottom:1rem;letter-spacing:-0.01em}
  h2{font-family:'Cormorant Garamond',serif;font-size:clamp(1.2rem,3.4vw,1.68rem);font-weight:400;
    line-height:1.3;color:#fff;margin-bottom:1.2rem}
  .ey{font-size:.7rem;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(--gold);display:block;margin-bottom:1rem}
  p{color:var(--muted);font-weight:300;font-size:1.05rem;line-height:1.65;margin-bottom:.9rem}
  .lead{font-size:1.1rem;color:rgba(255,255,255,0.75);font-weight:300;line-height:1.7}
  strong{font-weight:500;color:rgba(255,255,255,.9)}
  .intro-bar{display:flex;gap:14px;align-items:center;margin-bottom:2.2rem}
  .bar-s{height:2px;flex:1;border-radius:2px;background:var(--setter)}
  .bar-c{height:2px;flex:1;border-radius:2px;background:var(--closer)}
  .bar-dot{width:7px;height:7px;border-radius:50%;background:var(--gold);box-shadow:0 0 8px rgba(200,170,110,.55)}
  .pill-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:1.5rem}
  .pill{border:1px solid rgba(255,255,255,.15);border-radius:20px;padding:6px 14px;font-size:.8rem;color:var(--muted)}
  .prog{margin-bottom:2rem}
  .prog-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
  .prog-dim{font-size:.7rem;letter-spacing:.18em;text-transform:uppercase;font-weight:500}
  .prog-count{font-size:.75rem;color:var(--muted)}
  .prog-track{width:100%;height:3px;background:rgba(255,255,255,.08);border-radius:3px;overflow:hidden}
  .prog-fill{height:100%;border-radius:3px;transition:width .55s cubic-bezier(.4,0,.2,1)}
  .ddots{display:flex;gap:4px;margin-bottom:1.5rem}
  .ddot{height:3px;border-radius:3px;flex:1;background:rgba(255,255,255,.08);transition:background .4s}
  .ddot.done{background:var(--gold)}.ddot.active{background:rgba(200,170,110,.5)}
  .opts{display:flex;flex-direction:column;gap:10px;margin:1.5rem 0 .5rem}
  .opt{background:var(--card);border:1px solid rgba(255,255,255,.1);border-radius:8px;
    padding:16px 18px;cursor:pointer;display:flex;align-items:flex-start;gap:14px;
    text-align:left;width:100%;font-family:'DM Sans',sans-serif;color:var(--text);
    font-size:1rem;font-weight:300;line-height:1.5;transition:all .2s;min-height:52px}
  .opt:hover{border-color:var(--gold-b);background:rgba(200,170,110,.05)}
  .opt.sel{border-color:var(--gold);background:var(--gold-d);color:#fff}
  .opt-ltr{width:26px;height:26px;border-radius:50%;border:1px solid rgba(255,255,255,.2);
    display:flex;align-items:center;justify-content:center;font-size:.75rem;font-weight:500;
    flex-shrink:0;margin-top:0px;transition:all .2s;color:var(--muted)}
  .opt.sel .opt-ltr{background:var(--gold);border-color:var(--gold);color:#05050b}
  .fb-trigger{background:transparent;border:none;border-top:1px solid rgba(255,255,255,.08);
    width:100%;padding:14px 0 0;margin-top:6px;text-align:left;cursor:pointer;
    font-family:'DM Sans',sans-serif;font-size:.85rem;color:var(--muted);transition:color .2s;
    display:flex;align-items:center;gap:8px;min-height:44px}
  .fb-trigger:hover{color:rgba(255,255,255,.8)}
  .fb-badge{font-size:.65rem;border:1px solid rgba(255,255,255,.2);border-radius:4px;padding:3px 8px}
  .fb-box{background:var(--card2);border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:18px;margin-bottom:1.2rem}
  .fb-lbl{font-size:.65rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:.8rem;display:block}
  .open-card{background:var(--card);border:1px solid rgba(143,200,138,.25);border-radius:10px;padding:22px;margin:1.5rem 0 .5rem}
  .open-ey{font-size:.65rem;letter-spacing:.18em;text-transform:uppercase;color:var(--open);display:block;margin-bottom:.8rem}
  textarea{width:100%;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.15);
    border-radius:8px;padding:14px 16px;color:#fff;font-family:'DM Sans',sans-serif;
    font-size:1rem;font-weight:300;line-height:1.6;resize:vertical;min-height:110px;
    outline:none;transition:border-color .2s}
  textarea:focus{border-color:rgba(143,200,138,.5)}
  textarea::placeholder{color:rgba(255,255,255,.3)}
  .char-h{font-size:.75rem;color:rgba(255,255,255,.3);margin-top:6px;text-align:right}
  .sc-ov{display:flex;flex-direction:column;align-items:center;padding:30px 0;gap:1.2rem}
  .sc-txt{font-size:.8rem;letter-spacing:.14em;text-transform:uppercase;color:var(--open)}
  .sc-ok{display:flex;align-items:center;gap:10px;font-size:.9rem;color:rgba(143,200,138,.9)}
  .sc-ck{width:24px;height:24px;border-radius:50%;background:rgba(143,200,138,.15);border:1px solid var(--open);display:flex;align-items:center;justify-content:center;font-size:.8rem}
  .topic-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:1.5rem 0}
  .tbtn{background:var(--card);border:1px solid rgba(255,255,255,.1);border-radius:8px;
    padding:16px 14px;cursor:pointer;text-align:left;font-family:'DM Sans',sans-serif;
    transition:all .2s;display:flex;align-items:center;gap:10px;color:var(--muted);
    font-size:.95rem;font-weight:300;line-height:1.4;width:100%;min-height:52px}
  .tbtn:hover{border-color:var(--gold-b)}.tbtn.sel{border-color:var(--gold);background:var(--gold-d);color:#fff}
  .t-ico{font-size:1.2rem;flex-shrink:0}
  .t-chk{width:16px;height:16px;border-radius:50%;border:1.5px solid rgba(255,255,255,.2);
    display:flex;align-items:center;justify-content:center;font-size:.6rem;margin-left:auto;flex-shrink:0;transition:all .2s}
  .tbtn.sel .t-chk{background:var(--gold);border-color:var(--gold);color:#05050b}
  .ibox{background:rgba(200,170,110,.07);border:1px solid rgba(200,170,110,.25);border-radius:8px;
    padding:16px 18px;margin:1.5rem 0;font-size:.95rem;color:rgba(255,255,255,.75);font-weight:300;line-height:1.65}
  .ibox-lbl{font-size:.65rem;letter-spacing:.16em;text-transform:uppercase;color:var(--gold);margin-bottom:6px;display:block}
  .niche-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:1.5rem 0}
  .niche-btn{background:var(--card);border:1px solid rgba(255,255,255,.1);border-radius:8px;
    padding:18px 14px;cursor:pointer;text-align:center;color:var(--muted);
    font-family:'DM Sans',sans-serif;font-weight:300;font-size:.95rem;transition:all .2s;width:100%;min-height:52px}
  .niche-btn:hover{border-color:var(--gold-b)}.niche-btn.sel{border-color:var(--gold);background:var(--gold-d);color:#fff}
  .n-ico{font-size:1.6rem;display:block;margin-bottom:8px}
  .chat-wrap{background:var(--card);border:1px solid rgba(255,255,255,.1);border-radius:10px;overflow:hidden;margin:1.2rem 0}
  .chat-msgs{max-height:350px;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px;scroll-behavior:smooth}
  .chat-msgs::-webkit-scrollbar{width:4px}.chat-msgs::-webkit-scrollbar-thumb{background:rgba(255,255,255,.15);border-radius:4px}
  .cmsg{display:flex;align-items:flex-start;gap:10px;max-width:90%}
  .cmsg.alex{align-self:flex-start}.cmsg.user{align-self:flex-end;flex-direction:row-reverse}
  .cmsg-av{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.75rem;font-weight:500;flex-shrink:0}
  .cmsg.alex .cmsg-av{background:rgba(110,159,200,.15);color:var(--setter);border:1px solid rgba(110,159,200,.25)}
  .cmsg.user .cmsg-av{background:rgba(200,170,110,.1);color:var(--gold);border:1px solid var(--gold-b)}
  .cmsg-txt{border-radius:12px;padding:12px 15px;font-size:.95rem;font-weight:300;line-height:1.55}
  .cmsg.alex .cmsg-txt{background:rgba(255,255,255,.08);color:rgba(255,255,255,.85);border-radius:4px 12px 12px 12px}
  .cmsg.user .cmsg-txt{background:rgba(200,170,110,.12);border:1px solid rgba(200,170,110,.25);color:#fff;border-radius:12px 4px 12px 12px}
  .typing{display:flex;gap:5px;padding:12px 15px;background:rgba(255,255,255,.08);border-radius:4px 12px 12px 12px;width:fit-content}
  .tdot{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.4);animation:tb 1.2s infinite}
  .tdot:nth-child(2){animation-delay:.15s}.tdot:nth-child(3){animation-delay:.3s}
  @keyframes tb{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-5px)}}
  .chat-footer{padding:12px 15px;border-top:1px solid rgba(255,255,255,.08)}
  .chat-row{display:flex;gap:10px;align-items:flex-end}
  .chat-ta{flex:1;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.15);
    border-radius:8px;padding:12px 14px;color:#fff;font-family:'DM Sans',sans-serif;
    font-size:.95rem;resize:none;min-height:48px;max-height:110px;outline:none;transition:border-color .2s;font-weight:300}
  .chat-ta:focus{border-color:rgba(200,170,110,.4)}.chat-ta::placeholder{color:rgba(255,255,255,.3)}.chat-ta:disabled{opacity:.4}
  .btn-send{background:var(--gold);color:#05050b;font-family:'DM Sans',sans-serif;font-weight:500;font-size:.85rem;
    padding:12px 18px;border:none;border-radius:6px;cursor:pointer;transition:background .2s;white-space:nowrap;height:48px}
  .btn-send:hover{background:#d9bf86}.btn-send:disabled{opacity:.3;cursor:not-allowed}
  .turn-h{font-size:.7rem;color:rgba(255,255,255,.3);text-align:right;margin-top:6px}
  .btn-gold{background:var(--gold);color:#05050b;font-family:'DM Sans',sans-serif;font-weight:500;
    font-size:.95rem;letter-spacing:.05em;padding:15px 28px;border:none;border-radius:6px;
    cursor:pointer;transition:background .2s,opacity .2s;display:inline-flex;align-items:center;gap:8px;margin-top:1.5rem;min-height:52px}
  .btn-gold:hover{background:#d9bf86}.btn-gold:disabled{opacity:.25;cursor:not-allowed}
  .btn-ghost{background:transparent;border:none;color:var(--muted);font-family:'DM Sans',sans-serif;
    font-size:.9rem;font-weight:300;cursor:pointer;padding:10px 0;margin-top:8px;transition:color .2s;display:block;min-height:44px}
  .btn-ghost:hover{color:var(--text)}
  .field{margin-bottom:15px}
  .field label{display:block;font-size:.7rem;letter-spacing:.17em;text-transform:uppercase;color:var(--gold);margin-bottom:6px}
  .field input{width:100%;background:var(--card);border:1px solid rgba(255,255,255,.1);border-radius:6px;
    padding:14px 16px;color:#fff;font-family:'DM Sans',sans-serif;font-size:1rem;outline:none;transition:border-color .2s;min-height:52px}
  .field input:focus{border-color:var(--gold)}.field input::placeholder{color:rgba(255,255,255,.25)}
  .loader-c{text-align:center;padding:80px 0}
  .dots{display:flex;gap:8px;justify-content:center;margin-top:1.8rem}
  .dot{width:10px;height:10px;border-radius:50%;background:var(--gold);animation:pulse 1.3s infinite}
  .dot:nth-child(2){animation-delay:.2s}.dot:nth-child(3){animation-delay:.4s}
  @keyframes pulse{0%,80%,100%{transform:scale(.6);opacity:.3}40%{transform:scale(1);opacity:1}}
  .pause-banner{background:linear-gradient(135deg,rgba(110,159,200,.08),rgba(200,170,110,.08));
    border:1px solid rgba(200,170,110,.2);border-radius:10px;padding:15px 18px;
    margin-bottom:1.8rem;display:flex;align-items:center;gap:12px}
  .pb-text{font-size:.85rem;color:rgba(255,255,255,.6);font-weight:300;line-height:1.5;margin:0}
  .pb-text strong{color:rgba(255,255,255,.9);font-weight:400}
  .alex-intro{display:flex;align-items:flex-start;gap:12px;margin:1.5rem 0 1.8rem}
  .alex-av{width:38px;height:38px;border-radius:50%;background:rgba(110,159,200,.15);border:1px solid rgba(110,159,200,.3);
    display:flex;align-items:center;justify-content:center;font-size:.9rem;flex-shrink:0;color:var(--setter)}
  .alex-nm{font-size:.65rem;letter-spacing:.1em;text-transform:uppercase;color:var(--setter);margin-bottom:6px}
  .alex-bbl{background:rgba(255,255,255,.08);border-radius:4px 12px 12px 12px;padding:14px 16px;color:rgba(255,255,255,.85);font-size:.95rem;font-weight:300;line-height:1.58}
  .profile-badge{display:inline-block;border:1px solid var(--gold);border-radius:4px;
    padding:6px 14px;font-size:.7rem;letter-spacing:.22em;text-transform:uppercase;color:var(--gold);margin-bottom:1.2rem}
  .zone-wrap{margin-bottom:1.5rem}
  .zone-lbl{font-size:.65rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:.3rem}
  .zone-nm{font-family:'Cormorant Garamond',serif;font-size:1.4rem;font-weight:300;color:rgba(255,255,255,.9)}
  .spec-wrap{margin:1.4rem 0 2rem}
  .spec-labels{display:flex;justify-content:space-between;font-size:.7rem;letter-spacing:.13em;text-transform:uppercase;margin-bottom:8px}
  .spec-s{color:var(--setter)}.spec-c{color:var(--closer)}
  .spec-track{height:8px;border-radius:8px;position:relative;
    background:linear-gradient(90deg,var(--setter) 0%,rgba(255,255,255,.06) 50%,var(--closer) 100%)}
  .spec-marker{width:18px;height:18px;border-radius:50%;background:#fff;border:3px solid var(--gold);
    position:absolute;top:50%;transform:translate(-50%,-50%);box-shadow:0 0 12px rgba(200,170,110,.5)}
  .spec-pct{text-align:center;margin-top:8px;font-size:.8rem;color:var(--muted)}
  .traits{display:flex;flex-direction:column;gap:8px;margin:1.5rem 0 1.8rem}
  .trait{background:var(--card);border:1px solid rgba(255,255,255,.1);border-radius:8px;
    padding:14px 16px;display:flex;align-items:flex-start;gap:12px;font-size:.95rem;color:var(--muted);font-weight:300}
  .divider{width:100%;height:1px;background:linear-gradient(90deg,transparent,rgba(200,170,110,.25),transparent);margin:1.8rem 0}
  .matices-box{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);
    border-left:3px solid var(--gold);border-radius:0 8px 8px 0;padding:16px 20px;
    margin:1.5rem 0;font-size:1rem;color:rgba(255,255,255,.7);font-weight:300;line-height:1.7;font-style:italic}
  .matices-lbl{font-size:.65rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(200,170,110,.7);margin-bottom:8px;display:block;font-style:normal;font-weight:500}
  
  .congruence-alert {background:rgba(212,130,110,.08); border:1px solid rgba(212,130,110,.3); border-left:3px solid var(--closer); border-radius:0 8px 8px 0; padding:16px 20px; margin:1.5rem 0; font-size:.95rem; color:rgba(255,255,255,.8); font-weight:300; line-height:1.6;}
  .congruence-alert strong {color: var(--closer);}
  
  .disclaimer {font-size: .8rem; color: rgba(255,255,255,.45); line-height: 1.5; font-style: italic; border-left: 2px solid rgba(255,255,255,.1); padding-left: 12px; margin-bottom: 2rem;}

  .dims-title{font-size:.7rem;letter-spacing:.18em;text-transform:uppercase;color:var(--gold);margin-bottom:1.2rem;font-weight:500}
  .dim-row{margin-bottom:14px}
  .dim-top{display:flex;justify-content:space-between;font-size:.8rem;margin-bottom:6px}
  .dim-name{color:rgba(255,255,255,.7);font-weight:400}
  .dbt{height:5px;background:rgba(255,255,255,.08);border-radius:5px;overflow:hidden}
  .dbf{height:100%;border-radius:5px}
  .sci-section{margin:1.8rem 0}
  .sci-header{display:flex;align-items:center;gap:12px;margin-bottom:1.2rem}
  .sci-ico{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0}
  .sci-meta{flex:1}
  .sci-lbl{font-size:.65rem;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);margin-bottom:3px}
  .sci-name{font-size:.95rem;color:#fff;font-weight:400}
  .cons-meter-wrap{display:flex;flex-direction:column;gap:6px;margin-bottom:.5rem}
  .cons-track{width:100%;height:8px;background:rgba(255,255,255,.08);border-radius:8px;overflow:hidden}
  .cons-fill{height:100%;border-radius:8px;background:linear-gradient(90deg,rgba(180,138,220,.5),var(--cons))}
  .cons-labels{display:flex;justify-content:space-between;font-size:.7rem;color:rgba(255,255,255,.4)}
  .motiv-tag{display:inline-flex;align-items:center;gap:8px;border:1px solid rgba(240,192,96,.3);
    background:rgba(240,192,96,.08);border-radius:20px;padding:6px 15px;font-size:.85rem;color:rgba(240,192,96,.9);font-weight:300}
  .motiv-dot{width:7px;height:7px;border-radius:50%;background:var(--motiv)}
  .flow-cards{display:flex;flex-direction:column;gap:8px;margin-top:1.2rem}
  .flow-card{background:var(--card);border:1px solid rgba(143,200,138,.18);border-radius:8px;
    padding:14px 18px;display:flex;align-items:flex-start;gap:12px}
  .flow-num{font-family:'Cormorant Garamond',serif;font-size:1.8rem;font-weight:300;
    color:rgba(143,200,138,.4);line-height:1;flex-shrink:0;margin-top:-2px}
  .flow-txt{font-size:.95rem;color:rgba(255,255,255,.7);font-weight:300;line-height:1.6}
  .skeleton{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:8px;animation:shimmer 1.8s ease-in-out infinite}
  @keyframes shimmer{0%,100%{opacity:.4}50%{opacity:.8}}
  .dev-box{background:var(--card2);border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:18px 20px;margin-top:1.2rem}
  .dev-dim{font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);margin-bottom:.8rem;display:block}
  .dev-txt{font-size:.95rem;color:rgba(255,255,255,.75);font-weight:300;line-height:1.7}
`;

// ======================================================================
// 2. DATOS ESTÁTICOS Y DICCIONARIOS (COMPLETOS)
// ======================================================================
const DIMS = [
  {id:"comm",   label:"Comunicación",          setter:"Escucha activa",      closer:"Directo y asertivo"},
  {id:"orient", label:"Orientación",           setter:"Relaciones",          closer:"Resultados"},
  {id:"ei",     label:"Inteligencia emocional",setter:"Alta sintonía",       closer:"IE orientada a acción"},
  {id:"values", label:"Valores",               setter:"Proceso y confianza", closer:"Impacto y velocidad"},
  {id:"press",  label:"Presión y rechazo",     setter:"Reflexivo",           closer:"Alta tolerancia"},
  {id:"pace",   label:"Ritmo",                 setter:"Largo plazo",         closer:"Ciclo corto"},
];

const Q = [
  {id:"c1",dim:"comm",type:"closed",text:"Alguien se te acerca muy frustrado por un problema, y aunque no fue tu culpa directa, sos la persona que tiene enfrente. ¿Cuál es tu instinto natural?",opts:[
    {l:"A",t:"Dejar que se descargue, hacer preguntas para entender bien, y desde ahí calmar las aguas.",w:{s:2,c:0,e:0}},
    {l:"B",t:"Interrumpir la queja educadamente para ir directo a la solución práctica. El problema ya está.",w:{s:0,c:2,e:0}},
    {l:"C",t:"Explicarle con calma por qué pasó el error para que entienda el contexto antes de avanzar.",w:{s:1,c:1,e:0}},
    {l:"D",t:"Honestamente, trato de evitar estas confrontaciones o busco que alguien más intervenga.",w:{s:0,c:0,e:2}},
  ]},
  {id:"c2",dim:"comm",type:"closed",text:"Un amigo te viene a contar por tercera vez el mismo problema, pero no toma ninguna acción para cambiarlo. ¿Cómo lo manejás?",opts:[
    {l:"A",t:"Le hago preguntas que lo lleven a darse cuenta por sí mismo de por qué se sabotea.",w:{s:2,c:0,e:0}},
    {l:"B",t:"Le marco el patrón directamente: 'Ya hablamos de esto. ¿Qué vas a hacer diferente hoy?'",w:{s:0,c:2,e:0}},
    {l:"C",t:"Lo escucho porque es mi amigo, pero dejo que tome sus propias decisiones a su tiempo.",w:{s:1,c:1,e:0}},
    {l:"D",t:"Trato de esquivar el tema o le doy la razón rápido para no tener que seguir escuchando.",w:{s:0,c:0,e:2}},
  ]},
  {id:"c3",dim:"comm",type:"closed-fb",text:"Alguien no entiende lo que querés decir después de tu segunda explicación. ¿Qué hacés?",
    opts:[
      {l:"A",t:"Busco una analogía que conecte con su experiencia.",w:{s:2,c:0,e:0}},
      {l:"B",t:"Soy más específico y directo — sin rodeos esta vez.",w:{s:0,c:2,e:0}},
      {l:"C",t:"Le propongo que lo procese por escrito y volvemos.",w:{s:1,c:1,e:0}},
      {l:"D",t:"Me rindo internamente y asumo que simplemente no nos vamos a entender.",w:{s:0,c:0,e:2}},
    ],
    fb:{text:"Cuando explicás algo y alguien no entiende, ¿qué sentís primero?",opts:[
      {l:"A",t:"Curiosidad — quiero entender qué parte no conectó.",w:{s:2,c:0,e:0}},
      {l:"B",t:"Ligera frustración, pero enseguida busco otra manera.",w:{s:0,c:2,e:0}},
      {l:"C",t:"Calma — el entendimiento lleva tiempo.",w:{s:1,c:1,e:0}},
      {l:"D",t:"Agotamiento, prefiero dejar la charla ahí.",w:{s:0,c:0,e:2}},
    ]}},
  {id:"c4",dim:"comm",type:"closed",text:"¿Con cuál de estas afirmaciones te identificás más?",opts:[
    {l:"A",t:"\"Primero escucho. Después, si tengo algo útil para decir, lo digo.\"",w:{s:2,c:0,e:0}},
    {l:"B",t:"\"El tiempo es valioso. Prefiero ser claro desde el principio.\"",w:{s:0,c:2,e:0}},
    {l:"C",t:"\"Adapto mi estilo a quien tengo enfrente.\"",w:{s:1,c:1,e:0}},
    {l:"D",t:"\"Prefiero comunicarme por mensaje de texto antes que hablar en persona o por llamada.\"",w:{s:0,c:0,e:2}},
  ]},
  {id:"o1",dim:"orient",type:"closed",text:"Si pudieras elegir entre dos proyectos, preferirías...",opts:[
    {l:"A",t:"Construir relaciones sólidas con pocas personas clave, a lo largo del tiempo.",w:{s:2,c:0,e:0}},
    {l:"B",t:"Resultados concretos y medibles semana a semana.",w:{s:0,c:2,e:0}},
    {l:"C",t:"Libertad total para organizar tu tiempo y método.",w:{s:1,c:1,e:0}},
    {l:"D",t:"Un proyecto donde me digan exactamente qué hacer sin tener que tomar decisiones grandes.",w:{s:0,c:0,e:2}},
  ]},
  {id:"o2",dim:"orient",type:"closed",text:"¿Qué te da más satisfacción genuina?",opts:[
    {l:"A",t:"Que alguien te diga \"Confío totalmente en vos\" — y lo sienta de verdad.",w:{s:2,c:0,e:0}},
    {l:"B",t:"Haber cumplido un objetivo que te pusiste con claridad.",w:{s:0,c:2,e:0}},
    {l:"C",t:"Haber aprendido algo nuevo que cambia cómo ves las cosas.",w:{s:1,c:1,e:0}},
    {l:"D",t:"Terminar mis tareas a tiempo para desconectar y no pensar más en responsabilidades.",w:{s:0,c:0,e:2}},
  ]},
  {id:"o3",dim:"orient",type:"closed-fb",text:"Pensá en algo que considerás un éxito personal. ¿Qué fue lo más importante de ese logro?",
    opts:[
      {l:"A",t:"Las relaciones que construí en el proceso — esas personas todavía están.",w:{s:2,c:0,e:0}},
      {l:"B",t:"El resultado concreto que logré — tangible, medible.",w:{s:0,c:2,e:0}},
      {l:"C",t:"La forma en que lo hice — el método fue lo que lo hizo posible.",w:{s:1,c:1,e:0}},
      {l:"D",t:"Que se terminó y pude relajarme.",w:{s:0,c:0,e:2}},
    ],
    fb:{text:"Cuando algo que hacés sale bien, ¿qué es lo primero que sentís?",opts:[
      {l:"A",t:"Satisfacción por las personas que participaron o se beneficiaron.",w:{s:2,c:0,e:0}},
      {l:"B",t:"Orgullo por el resultado en sí — lo que se logró.",w:{s:0,c:2,e:0}},
      {l:"C",t:"Alivio y ganas de entender qué funcionó para repetirlo.",w:{s:1,c:1,e:0}},
      {l:"D",t:"Tranquilidad de que ya nadie me va a presionar con eso.",w:{s:0,c:0,e:2}},
    ]}},
  {id:"o4",dim:"orient",type:"closed",text:"Cuando algo no sale como esperabas, ¿qué te molesta más?",opts:[
    {l:"A",t:"Que alguna relación o confianza se vio afectada.",w:{s:2,c:0,e:0}},
    {l:"B",t:"No haber llegado al resultado que me propuse.",w:{s:0,c:2,e:0}},
    {l:"C",t:"No haberlo podido anticipar — faltó análisis.",w:{s:1,c:1,e:0}},
    {l:"D",t:"Tener que dar explicaciones a los demás sobre por qué falló.",w:{s:0,c:0,e:2}},
  ]},
  {id:"open1",dim:"values",type:"open",
    text:"Describí en pocas palabras qué tipo de actividad te hace sentir que valió la pena el día.",
    placeholder:"No hay respuesta correcta — escribí lo primero que se te venga..."},
  {id:"ei1",dim:"ei",type:"closed-fb",text:"Alguien está claramente molesto con vos. Lo primero que hacés es...",
    opts:[
      {l:"A",t:"Entender cómo se siente antes de explicarme o defenderme.",w:{s:2,c:0,e:0}},
      {l:"B",t:"Aclarar el malentendido lo antes posible.",w:{s:0,c:2,e:0}},
      {l:"C",t:"Darle espacio y volver al tema cuando esté más tranquilo.",w:{s:1,c:1,e:0}},
      {l:"D",t:"Me pongo a la defensiva o me retiro inmediatamente de la situación.",w:{s:0,c:0,e:2}},
    ],
    fb:{text:"Cuando alguien cerca tuyo está enojado, ¿qué tendés a hacer naturalmente?",opts:[
      {l:"A",t:"Noto su estado y ajusto cómo me relaciono con esa persona.",w:{s:2,c:0,e:0}},
      {l:"B",t:"Lo dejo pasar — no es asunto mío si no me involucra.",w:{s:0,c:2,e:0}},
      {l:"C",t:"Trato de entender qué pasó antes de hacer cualquier cosa.",w:{s:1,c:1,e:0}},
      {l:"D",t:"Me contagio de su mal humor o me alejo para no lidiar con eso.",w:{s:0,c:0,e:2}},
    ]}},
  {id:"ei2",dim:"ei",type:"closed",text:"Percibís que alguien no está cómodo en una conversación. ¿Qué hacés?",opts:[
    {l:"A",t:"Lo noto y ajusto el tono — hago algo para que se sienta más a gusto.",w:{s:2,c:0,e:0}},
    {l:"B",t:"Lo señalo directamente: \"¿Hay algo que te preocupa?\"",w:{s:0,c:2,e:0}},
    {l:"C",t:"Continúo normalmente — no quiero ponerlo en evidencia.",w:{s:1,c:1,e:0}},
    {l:"D",t:"Termino la charla rápido, me incomodan los silencios raros.",w:{s:0,c:0,e:2}},
  ]},
  {id:"ei3",dim:"ei",type:"closed",text:"¿En qué situación te sentís más en tu elemento?",opts:[
    {l:"A",t:"Acompañar a alguien en un proceso difícil — estar presente.",w:{s:2,c:0,e:0}},
    {l:"B",t:"Ayudar a alguien a tomar una decisión que lleva tiempo evitando.",w:{s:0,c:2,e:0}},
    {l:"C",t:"Explicar algo complejo de manera tan simple que hace click.",w:{s:1,c:1,e:0}},
    {l:"D",t:"Hacer mi propio trabajo sin tener que gestionar las emociones de nadie.",w:{s:0,c:0,e:2}},
  ]},
  {id:"open2",dim:"ei",type:"open",
    text:"Pensá en alguien con quien tenés una buena relación. ¿Qué creés que hacés naturalmente que genera esa conexión?",
    placeholder:"Puede ser algo pequeño o algo grande..."},
  {id:"v1",dim:"values",type:"closed",text:"Al final de un día agotador, ¿qué pensamiento te hace sentir que valió la pena?",opts:[
    {l:"A",t:"'Hoy ayudé a alguien a ver algo con claridad' o 'Alguien confió en mí'.",w:{s:2,c:0,e:0}},
    {l:"B",t:"'Hoy taché el objetivo principal de la lista' o 'Logré avanzar algo difícil'.",w:{s:0,c:2,e:0}},
    {l:"C",t:"'Hice las cosas bien, a mi manera y sin deberle nada a nadie'.",w:{s:1,c:1,e:0}},
    {l:"D",t:"'Por fin se terminó y puedo volver a lo mío'.",w:{s:0,c:0,e:2}},
  ]},
  {id:"p1",dim:"press",type:"closed-fb",text:"Propusiste algo con convicción y alguien te dijo que no de forma tajante. ¿Qué sentís?",
    opts:[
      {l:"A",t:"Incomodidad — me pregunto qué pude haber hecho diferente.",w:{s:2,c:0,e:0}},
      {l:"B",t:"Curiosidad — quiero entender por qué y si es definitivo.",w:{s:0,c:2,e:0}},
      {l:"C",t:"Depende del contexto y de cómo me lo dijeron.",w:{s:1,c:1,e:0}},
      {l:"D",t:"Rechazo personal, me cuesta volver a proponer algo después de eso.",w:{s:0,c:0,e:2}},
    ],
    fb:{text:"Cuando alguien no está de acuerdo con algo que pensás, ¿cuál es tu primera reacción interna?",opts:[
      {l:"A",t:"Un poco de incomodidad — me pregunto si me equivoqué.",w:{s:2,c:0,e:0}},
      {l:"B",t:"Interés — quiero entender desde dónde lo ven ellos.",w:{s:0,c:2,e:0}},
      {l:"C",t:"Calma — cada uno puede tener su perspectiva.",w:{s:1,c:1,e:0}},
      {l:"D",t:"Prefiero no discutir, les doy la razón para evitar el debate.",w:{s:0,c:0,e:2}},
    ]}},
  {id:"p2",dim:"press",type:"closed",text:"Estás organizando algo y, a último momento, un factor externo arruina los planes. ¿Tu mente en el minuto uno?",opts:[
    {l:"A",t:"Me preocupo por los involucrados y busco cómo contenerlos.",w:{s:2,c:0,e:0}},
    {l:"B",t:"Escaneo rápido qué está bajo mi control y ejecuto el plan B.",w:{s:0,c:2,e:0}},
    {l:"C",t:"Siento la frustración, me tomo un momento y después veo qué hacer.",w:{s:1,c:1,e:0}},
    {l:"D",t:"Siento que es el fin del mundo, me paralizo un buen rato.",w:{s:0,c:0,e:2}},
  ]},
  {id:"cons1",dim:null,type:"hidden-cons",text:"Elegís hacer algo. ¿Qué pasa con más frecuencia?",opts:[
    {l:"A",t:"Lo hago cuando dije que lo iba a hacer — casi sin excepción.",cons:2},
    {l:"B",t:"La mayoría de las veces sí, aunque a veces se va corriendo.",cons:1},
    {l:"C",t:"Me manejo más por cómo estoy en el momento que por lo planeado.",cons:0},
  ]},
  {id:"mot1",dim:null,type:"hidden-motiv",text:"¿Qué te llevaría a dedicarte a una profesión independiente?",opts:[
    {l:"A",t:"Generar un cambio real en la vida de las personas con las que hablo.",intr:2},
    {l:"B",t:"La libertad de manejar mis ingresos y tiempos sin depender de nadie.",intr:1},
    {l:"C",t:"Los resultados económicos que puede generar.",intr:0},
  ]},
];

const TOPICS=[
  {id:"transform",label:"Transformación personal",icon:"🌱",w:{s:1.5,c:0}},
  {id:"results",label:"Resultados y métricas",icon:"📊",w:{s:0,c:1.5}},
  {id:"obstacles",label:"Obstáculos internos",icon:"🧠",w:{s:1.5,c:0}},
  {id:"invest",label:"Inversión y retorno",icon:"💰",w:{s:0,c:1.5}},
  {id:"journey",label:"Historia y contexto",icon:"🗺️",w:{s:1.5,c:0}},
  {id:"vision",label:"Hacia dónde querés ir",icon:"🎯",w:{s:1.5,c:0}},
];

const ROLE_DICTIONARY = {
  setter: {
    title: "El Setter (Apertura y Confianza)",
    desc: "Es quien inicia la relación. Su talento no es 'vender', sino detectar si hay un problema que vale la pena resolver. Es ideal si preferís construir un puente de confianza antes de proponer una solución."
  },
  closer: {
    title: "El Closer (Resolución y Decisión)",
    desc: "Es quien ayuda a dar el paso final. Su talento es la claridad y la firmeza. Es ideal si sos directo/a y sentís satisfacción al ayudar a otros a tomar decisiones que han estado postergando."
  },
  appointment: {
    title: "Prospector Digital (Estrategia y Chat)",
    desc: "Es el arquitecto del flujo. Su talento está en el análisis escrito. Es ideal si preferís trabajar por objetivos claros, sos muy organizado/a y te sentís más cómodo/a por chat que en llamada."
  }
};

const NICHES=[
  {id:"wellness",label:"Bienestar & Salud",icon:"🌿"},
  {id:"finance",label:"Finanzas personales",icon:"📈"},
  {id:"coaching",label:"Coaching & Desarrollo",icon:"🧠"},
  {id:"vida_real",label:"Vida Cotidiana (Recomendado)",icon:"☕"},
];

const ALEX={
  wellness:"Hola. Llevo meses queriendo hacer algo con mi salud, pero no sé si este es el momento. ¿Me podés contar cómo funciona?",
  finance:"Hola. Tengo deudas y quiero organizarme, pero no sé si puedo invertir en un acompañamiento ahora. ¿De qué se trata?",
  coaching:"Hola. Estoy en un momento de transición profesional y busco orientación, pero ya intenté cosas antes que no funcionaron.",
  vida_real:"No sé qué hacer. Hace meses vengo diciendo que voy a cambiar de rumbo porque estoy agotado, pero siempre encuentro una excusa. ¿Vos qué harías?",
};

const PROFILES={
  setter:{title:"Setter",color:"var(--setter)",subtitle:"El arquitecto de la confianza.",
    desc:"Tu forma natural de relacionarte genera ambientes donde las personas confían rápido. Sabés indagar sin interrogar.",
    traits:[
      {icon:"🤝",t:"Construís rapport genuino como reflejo de quién sos."},
      {icon:"💬",t:"Tus preguntas abren el diálogo."},
      {icon:"🌱",t:"Zona de impacto: Primeras interacciones."}
    ]},
  closer:{title:"Closer",color:"var(--closer)",subtitle:"El catalizador de decisiones.",
    desc:"Operás con claridad. Sabés manejar la fricción y transformar dudas en resoluciones. Te sentís cómodo con la verdad directa.",
    traits:[
      {icon:"⚡",t:"Mantenés el foco bajo presión."},
      {icon:"🔍",t:"Detectás el problema real de fondo."},
      {icon:"✅",t:"Zona de impacto: Conversaciones definitorias."}
    ]},
  appointment:{title:"Prospector / Chat Setter",color:"#9b59b6",subtitle:"El estratega silencioso.",
    desc:"Tu zona genial está en crear oportunidades por escrito. Gestionás DMs y filtrás prospectos de forma estratégica.",
    traits:[
      {icon:"📱",t:"Manejás múltiples chats con fluidez."},
      {icon:"🧩",t:"Buscás patrones sin el desgaste de una llamada."},
      {icon:"🎯",t:"Zona de impacto: Generación de leads."}
    ]}
};

// ======================================================================
// 3. MOTOR NLP LOCAL (Cero Tokens, 100% Privado)
// ======================================================================
const localNLP = {
  analyzeText: (text) => {
    const txt = text.toLowerCase();
    const setterKeywords = ['escuchar', 'entender', 'ayudar', 'proceso', 'sentir', 'confianza', 'preguntar', 'empatía', 'acompañar', 'por qué', 'cómo'];
    const closerKeywords = ['lograr', 'decisión', 'resultado', 'impacto', 'directo', 'ahora', 'objetivo', 'resolver', 'acción', 'hacer', 'concreto'];
    let s = 1, c = 1;
    setterKeywords.forEach(w => { if(txt.includes(w)) s += 1.5; });
    closerKeywords.forEach(w => { if(txt.includes(w)) c += 1.5; });
    const questionCount = (txt.match(/\?/g) || []).length;
    if (questionCount > 0) s += questionCount;
    return { s: Math.min(5, Math.round(s)), c: Math.min(5, Math.round(c)) };
  },
  getDynamicReply: (niche, userMsg, turnIndex) => {
    const pools = {
      vida_real: ["Creo que mi mayor miedo es fracasar y perder lo poco que tengo.", "¿Cómo doy el primer paso sin equivocarme?", "Me dejás pensando bastante. Gracias."],
      default: ["No sé cómo aplicaría esto a mi situación.", "¿Qué pasa si no veo resultados rápido?", "Lo voy a revisar y evaluar los números."]
    };
    const pool = pools[niche] || pools.default;
    return pool[turnIndex] || pool[pool.length - 1];
  }
};

async function scoreOpen(qt, ans, dim) {
  await new Promise(r => setTimeout(r, 600)); 
  const analysis = localNLP.analyzeText(ans);
  return { s: Math.min(2, Math.floor(analysis.s / 2)), c: Math.min(2, Math.floor(analysis.c / 2)) };
}

async function getAlexReply(opener, exch, msg, isLast, niche) {
  await new Promise(r => setTimeout(r, 1000)); 
  return localNLP.getDynamicReply(niche, msg, exch.length);
}

async function scoreRoleplay(userMsgs, niche) {
  await new Promise(r => setTimeout(r, 1200));
  const fullText = userMsgs.join(" ");
  const analysis = localNLP.analyzeText(fullText);
  return { s: analysis.s, c: analysis.c, er: 2, insight: "Evalución de patrones completada." };
}

// ======================================================================
// 4. LÓGICA DE CÓMPUTO Y CONGRUENCIA
// ======================================================================
function getTopicInsight(ids){
  const ts=ids.map(id=>TOPICS.find(t=>t.id===id));
  const s=ts.filter(t=>t?.w?.s>t?.w?.c).length;
  const c=ts.filter(t=>t?.w?.c>t?.w?.s).length;
  if(s>=2)return"Esta elección revela una orientación natural hacia la conexión. Generás confianza naturalmente antes de proponer algo.";
  if(c>=2)return"Esta elección revela orientación a resultados. Te sentís cómodo/a dirigiendo la interacción hacia una decisión.";
  return"Combinaste temas de relación y resultado. Esto sugiere un perfil muy flexible y adaptable.";
}

function getZoneLabel(s, isApp){
  if(isApp) return "Texting y Generación Estratégica";
  if(s>=73)return"Setter definido";if(s>=57)return"Setter con instinto resolutivo";
  if(s>=43)return"Perfil transversal híbrido";if(s>=27)return"Closer con rasgos consultivos";return"Closer definido";
}

function compute(answers,selTopics,chatScores,niche,rpInsight){
  let tS=0, tC=0, tE=0; const dm={}; 
  DIMS.forEach(d=>{dm[d.id]={s:0,c:0,mx:0}});
  let consScore=0, motivScore=0;

  Q.forEach(q=>{
    const a=answers[q.id];if(a==null)return;
    if(q.type==="hidden-cons"){consScore+=a.cons||0;return;}
    if(q.type==="hidden-motiv"){motivScore+=a.intr||0;return;}
    dm[q.dim].s+=a.s; dm[q.dim].c+=a.c; dm[q.dim].mx+=2; 
    tS+=a.s; tC+=a.c; tE+=(a.e||0);
  });
  
  selTopics.forEach(id=>{
    const t=TOPICS.find(x=>x.id===id);if(!t)return;
    tS+=t.w.s; tC+=t.w.c; dm["values"].s+=t.w.s; dm["values"].c+=t.w.c; dm["values"].mx+=2;
  });

  const theorySpct = Math.round((tS / (tS + tC || 1)) * 100);
  let congruenceWarning = null;

  if(chatScores){
    const practSpct = Math.round((chatScores.s / (chatScores.s + chatScores.c || 1)) * 100);
    if (Math.abs(theorySpct - practSpct) > 30) {
      const realProfile = practSpct > 50 ? "Setter" : "Closer";
      congruenceWarning = `Tu test múltiple-choice indica una tendencia distinta, pero en la simulación bajo presión actuaste con instintos de ${realProfile}. A veces "forzamos" un estilo por presión externa, pero tu talento natural fluye mejor en la dinámica de ${realProfile}.`;
    }
    tS+=chatScores.s*2; tC+=chatScores.c*2;
  }

  const tot=tS+tC||1; 
  let finalSpct=Math.round((tS/tot)*100); 
  let profile = finalSpct >= 50 ? "setter" : "closer";
  if (tE >= 4) profile = "appointment"; // Filtro de Evasión

  const dims=DIMS.map(d=>{
    const v=dm[d.id];const mx=v.mx||1;
    const sp=Math.round((v.s/mx)*100);const cp=Math.round((v.c/mx)*100);
    return{...d,sp,cp,tendency:sp>=cp?"setter":"closer"};
  });
  
  const weakDim=[...dims].sort((a,b)=>{
    const pA=a.tendency==="setter"?a.sp:a.cp;
    return pA-Math.max(a.sp, a.cp);
  })[0];
  
  const motivType=motivScore>=4?"intrinsic":motivScore>=2?"mixed":"extrinsic";
  return{profile, sPct:finalSpct, cPct:100-finalSpct, dims, niche, rpInsight, congruenceWarning, topics:selTopics.map(id=>TOPICS.find(t=>t.id===id)?.label), consScore, motivScore, motivType, weakDim};
}

async function genMatices(res) {
  await new Promise(r => setTimeout(r, 600));
  const profName = PROFILES[res.profile].title;
  const altNiche = res.niche === 'vida_real' ? 'Coaching & Desarrollo' : 'Vida Cotidiana / Consultoría';
  return `Tu perfil de ${profName} destaca por una mezcla natural de ${res.dims[0].tendency} y ${res.dims[1].tendency}. Aunque elegiste un escenario específico, tu capacidad sugiere que también brillarías en el nicho de "${altNiche}".`;
}

async function genFlow(res) {
  await new Promise(r => setTimeout(r, 500));
  if(res.profile === 'appointment') return ["Gestionando flujos de leads masivos.", "Filtrando perfiles estratégicamente.", "Operando sin la presión de la llamada."];
  return res.profile === 'setter' 
    ? ["Iniciando conversaciones desde la curiosidad.", "Ayudando a otros a descubrir sus bloqueos.", "Creando confianza sin presión de venta rápida."]
    : ["Resolviendo problemas bajo presión de tiempo.", "Llevando charlas ambiguas a conclusiones firmes.", "Manejando fricción directa con empatía."];
}

async function genDevPath(res, weakDim) {
  await new Promise(r => setTimeout(r, 400));
  return `En los próximos 30 días, enfocate en fortalecer tu dimensión de ${weakDim?.label || 'organización'}. Intentá aplicar un enfoque más analítico al menos una vez al día en tus charlas cotidianas.`;
}

// ======================================================================
// 5. COMPONENTE PRINCIPAL (REACT UI)
// ======================================================================
export default function App(){
  const[stage,setStage]=useState("intro");
  const[qIdx,setQIdx]=useState(0);
  const[answers,setAnswers]=useState({});
  const[selOpt,setSelOpt]=useState(null);
  const[openText,setOpenText]=useState("");
  const[fbActive,setFbActive]=useState(false);
  const[fbSel,setFbSel]=useState(null);
  const[aiWork,setAiWork]=useState(false);
  const[aiDone,setAiDone]=useState(false);
  const[pStep,setPStep]=useState("topics");
  const[selTopics,setSelTopics]=useState([]);
  const[topicIns,setTopicIns]=useState("");
  const[niche,setNiche]=useState(null);
  const[chatMsgs,setChatMsgs]=useState([]);
  const[chatIn,setChatIn]=useState("");
  const[chatLoad,setChatLoad]=useState(false);
  const[turns,setTurns]=useState(0);
  const[exch,setExch]=useState([]);
  const[chatSc,setChatSc]=useState({s:0,c:0,er:0});
  const[rpIns,setRpIns]=useState("");
  const chatEndRef=useRef(null);
  const[lead,setLead]=useState({name:"",email:""});
  const[result,setResult]=useState(null);
  const[sending,setSending]=useState(false);
  const[matices,setMatices]=useState("");
  const[flowC,setFlowC]=useState([]);
  const[devP,setDevP]=useState("");
  const[aiL,setAiL]=useState({m:true,f:true,d:true});

  useEffect(()=>{chatEndRef.current?.scrollIntoView({behavior:"smooth"});},[chatMsgs]);

  const totalQ=Q.length;const q=Q[Math.min(qIdx,totalQ-1)];
  const dimIdx=DIMS.findIndex(d=>d.id===q?.dim);
  const prog=stage==="quiz"?(qIdx/totalQ)*100:0;
  const isHid=q?.type==="hidden-cons"||q?.type==="hidden-motiv";
  const isFb=q?.type==="closed-fb";const isOp=q?.type==="open";
  const aq=fbActive&&q?.fb?{text:q.fb.text,opts:q.fb.opts}:{text:q?.text,opts:q?.opts||[]};
  const asel=fbActive?fbSel:selOpt;const setAsel=fbActive?setFbSel:setSelOpt;
  const dimLbl=q?.type==="hidden-cons"?"Consistencia":q?.type==="hidden-motiv"?"Motivación":DIMS.find(d=>d.id===q?.dim)?.label||"";
  const dimCol=isOp?"var(--open)":q?.type==="hidden-cons"?"var(--cons)":q?.type==="hidden-motiv"?"var(--motiv)":"var(--gold)";

  const rst=()=>{setSelOpt(null);setFbActive(false);setFbSel(null);setOpenText("");setAiWork(false);setAiDone(false);};
  const adv=()=>{rst();if(qIdx===PART1_END-1){setPStep("topics");setStage("pause");}else if(qIdx===totalQ-1){setStage("capture");}else setQIdx(i=>i+1);};
  const back=()=>{if(fbActive){setFbActive(false);setFbSel(null);return;}rst();if(qIdx===0)setStage("intro");else setQIdx(i=>i-1);};
  
  const commit=(opts,idx,hid)=>{
    if(hid==="cons")setAnswers(p=>({...p,[q.id]:{cons:opts[idx].cons}}));
    else if(hid==="motiv")setAnswers(p=>({...p,[q.id]:{intr:opts[idx].intr}}));
    else{const w=opts[idx].w;setAnswers(p=>({...p,[q.id]:{s:w.s,c:w.c,e:w.e||0}}));}
    adv();
  };
  const submitOpen=async()=>{setAiWork(true);const sc=await scoreOpen(q.text,openText,q.dim);setAnswers(p=>({...p,[q.id]:sc}));setAiWork(false);setAiDone(true);setTimeout(adv,1000);};
  const pBack=()=>{const i=["topics","insight","niche","roleplay-intro","chat","chat-insight"].indexOf(pStep);if(i<=0){setQIdx(PART1_END-1);rst();setStage("quiz");}else{if(pStep==="chat"&&turns>0)return;setPStep(["topics","insight","niche","roleplay-intro","chat","chat-insight"][i-1]);}};
  const togTopic=id=>setSelTopics(p=>p.includes(id)?p.filter(x=>x!==id):p.length<2?[...p,id]:p);
  const startRP=()=>{const opener=ALEX[niche]||ALEX.vida_real;setChatMsgs([{role:"alex",text:opener}]);setExch([]);setTurns(0);setChatIn("");setPStep("chat");};
  
  const send=async()=>{
    const msg=chatIn.trim();if(!msg||chatLoad)return;setChatIn("");const isLast=turns===2;
    setChatMsgs(p=>[...p,{role:"user",text:msg}]);setChatLoad(true);
    const ar=await getAlexReply(ALEX[niche],exch,msg,isLast,niche);
    setChatMsgs(p=>[...p,{role:"alex",text:ar}]);setExch(p=>[...p,{u:msg,a:ar}]);setTurns(t=>t+1);
    if(isLast){const sc=await scoreRoleplay(exch.map(e=>e.u).concat(msg),niche);setChatSc(sc);setRpIns(sc.insight);setChatLoad(false);setPStep("chat-insight");}else setChatLoad(false);
  };
  
  const capture=async()=>{
    setSending(true);
    
    // Preparando datos para Zapier/Make
    const capture = async () => {
    setSending(true);
    
    // Estos son los datos que viajarán a Make
    const payload = {
      name: lead.name,
      email: lead.email,
      profile: PROFILES[result.profile].title, // Envía "Setter" o "Closer" en vez de el ID
      sPct: result.sPct,
      cPct: result.cPct,
      congruence: result.congruenceWarning || "Perfil Congruente",
      weakDim: result.weakDim?.label || "General",
      matices: matices
    };

    try {
      // AQUÍ PEGA TU URL DE MAKE (La que empieza con https://hook.us1.make.com/...)
      await fetch("https://hook.eu1.make.com/o3lp3x7zcqyjk2ebpda531naz2176ys2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      console.log("Datos enviados a Make correctamente");
    } catch (e) {
      console.error("Error al enviar a Make:", e);
    }
    
    setSending(false);
    setStage("loading");
    // ... sigue el resto del código igual

      {/* STAGE: INTRO */}
      {stage==="intro"&&(
        <motion.div key="intro" initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-14}}>
          <div className="intro-bar"><div className="bar-s"/><div className="bar-dot"/><div className="bar-c"/></div>
          <span className="ey">Diagnóstico Natural</span>
          <h1>Monetizá tu forma de<br/>relacionarte.</h1>
          <p className="lead">Tus años resolviendo problemas y empatizando con personas son la materia prima exacta del Alto Ticket. No se requiere experiencia previa en ventas.</p>
          <div className="pill-row">{["Evaluación adaptativa","Roleplay en vivo","Motor de Congruencia","Test de 15 min"].map(t=><span key={t} className="pill">{t}</span>)}</div>
          <button className="btn-gold" onClick={()=>setStage("quiz")}>Empezar diagnóstico →</button>
        </motion.div>
      )}

      {/* STAGE: QUIZ */}
      {stage==="quiz"&&q&&(
        <motion.div key={`q-${qIdx}-${fbActive}`} initial={{opacity:0,x:26}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}}>
          {qIdx===PART1_END&&<div className="pause-banner"><span style={{fontSize:"1.4rem",flexShrink:0}}>💬</span><p className="pb-text"><strong>Segunda parte.</strong> Ya completaste la pausa interactiva. Continuamos con las dimensiones restantes.</p></div>}
          {!isHid&&<div className="ddots">{DIMS.map((d,i)=><div key={d.id} className={`ddot ${i<dimIdx?"done":i===dimIdx?"active":""}`}/>)}</div>}
          <div className="prog">
            <div className="prog-top"><span className="prog-dim" style={{color:dimCol}}>{dimLbl}{isOp?" · libre":""}</span><span className="prog-count">{qIdx+1}/{totalQ}</span></div>
            <div className="prog-track"><div className="prog-fill" style={{width:`${prog}%`,background:'var(--gold)'}}/></div>
          </div>
          {isOp?(<>
            <h2>{q.text}</h2>
            <div className="open-card"><span className="open-ey">Análisis en tiempo real</span>
              <AnimatePresence mode="wait">
                {aiWork&&<motion.div key="w" className="sc-ov" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><span className="sc-txt">Procesando patrones léxicos</span><div className="dots"><div className="dot" style={{background:"var(--open)"}}/><div className="dot" style={{background:"var(--open)"}}/><div className="dot" style={{background:"var(--open)"}}/></div></motion.div>}
                {!aiWork&&aiDone&&<motion.div key="d" className="sc-ov" initial={{opacity:0,scale:.95}} animate={{opacity:1,scale:1}}><div className="sc-ok"><div className="sc-ck">✓</div>Respuesta registrada</div></motion.div>}
                {!aiWork&&!aiDone&&<motion.div key="in" initial={{opacity:0}} animate={{opacity:1}}><textarea value={openText} onChange={e=>setOpenText(e.target.value)} placeholder={q.placeholder} maxLength={400}/><div className="char-h">{openText.length}/400</div></motion.div>}
              </AnimatePresence>
            </div>
            {!aiWork&&!aiDone&&<><button className="btn-gold" disabled={openText.trim().length<5} onClick={submitOpen}>Procesar respuesta →</button><button className="btn-ghost" onClick={back}>← Volver</button></>}
          </>):(<>
            <AnimatePresence mode="wait">
              {fbActive?<motion.div key="fb" initial={{opacity:0,y:-7}} animate={{opacity:1,y:0}}><div className="fb-box"><span className="fb-lbl">Versión alternativa</span><h2 style={{marginBottom:0,fontSize:"clamp(1.1rem,3vw,1.48rem)"}}>{q.fb?.text}</h2></div></motion.div>
                :<motion.h2 key="mq" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,transition:{duration:.14}}}>{q.text}</motion.h2>}
            </AnimatePresence>
            <div className="opts">{aq.opts.map((o,i)=><button key={i} className={`opt ${asel===i?"sel":""}`} onClick={()=>setAsel(i)}><span className="opt-ltr">{o.l}</span><span>{o.t}</span></button>)}</div>
            {isFb&&!fbActive&&<button className="fb-trigger" onClick={()=>{setSelOpt(null);setFbActive(true);}}><span className="fb-badge">alternativa</span>Mostrame una versión distinta de esta pregunta</button>}
            <button className="btn-gold" disabled={asel===null} onClick={()=>commit(aq.opts,asel,q.type==="hidden-cons"?"cons":q.type==="hidden-motiv"?"motiv":false)}>{qIdx<totalQ-1?"Siguiente →":"Ver mi perfil →"}</button>
            <button className="btn-ghost" onClick={back}>← Volver</button>
          </>)}
        </motion.div>
      )}

      {/* STAGE: PAUSE & ROLEPLAY */}
      {stage==="pause"&&(
        <motion.div key={`p-${pStep}`} initial={{opacity:0,x:pStep==="topics"?0:18}} animate={{opacity:1,x:0}} exit={{opacity:0}}>
          {pStep==="topics"&&<>
            <span className="ey" style={{color:"rgba(200,170,110,.65)"}}>⏸ Pausa interactiva</span>
            <h2>¿Sobre qué temas te sentís más natural hablando?</h2><p>Elegí exactamente 2.</p>
            <div className="topic-grid">{TOPICS.map(t=><button key={t.id} className={`tbtn ${selTopics.includes(t.id)?"sel":""}`} onClick={()=>togTopic(t.id)}><span className="t-ico">{t.icon}</span><span style={{flex:1}}>{t.label}</span><span className="t-chk">{selTopics.includes(t.id)?"✓":""}</span></button>)}</div>
            <button className="btn-gold" disabled={selTopics.length!==2} onClick={()=>{setTopicIns(getTopicInsight(selTopics));setPStep("insight");}}>Continuar →</button>
            <button className="btn-ghost" onClick={pBack}>← Volver al test</button>
          </>}
          {pStep==="insight"&&<>
            <span className="ey">Tu orientación natural</span>
            <h2>Temas elegidos: {selTopics.map(id=>TOPICS.find(t=>t.id===id)?.label).join(" · ")}</h2>
            <div className="ibox"><span className="ibox-lbl">Qué revela tu elección</span>{topicIns}</div>
            <p>A continuación, entraremos al simulador conversacional.</p>
            <button className="btn-gold" onClick={()=>setPStep("niche")}>Continuar →</button>
            <button className="btn-ghost" onClick={()=>setPStep("topics")}>← Volver</button>
          </>}
          {pStep==="niche"&&<>
            <span className="ey">Roleplay · Configuración</span>
            <h2>Elegí el escenario de la charla</h2>
            <p>Seleccioná "Vida Cotidiana" si preferís un entorno sin tecnicismos de negocios.</p>
            <div className="niche-grid">{NICHES.map(n=><button key={n.id} className={`niche-btn ${niche===n.id?"sel":""}`} onClick={()=>setNiche(n.id)}><span className="n-ico">{n.icon}</span>{n.label}</button>)}</div>
            <button className="btn-gold" disabled={!niche} onClick={()=>setPStep("roleplay-intro")}>Comenzar roleplay →</button>
            <button className="btn-ghost" onClick={()=>setPStep("insight")}>← Volver</button>
          </>}
          {pStep==="roleplay-intro"&&<>
            <span className="ey">Roleplay · Escenario</span>
            <h2>Vas a hablar con Alex</h2>
            <p>Respondé como lo harías naturalmente. Nuestro motor analizará tu empatía y claridad bajo fricción real.</p>
            <div className="alex-intro"><div className="alex-av">👤</div><div><div className="alex-nm">Alex</div><div className="alex-bbl">{ALEX[niche]||ALEX.vida_real}</div></div></div>
            <button className="btn-gold" onClick={startRP}>Responder a Alex →</button>
            <button className="btn-ghost" onClick={()=>setPStep("niche")}>← Volver</button>
          </>}
          {pStep==="chat"&&<>
            <span className="ey">Roleplay · {turns<3?`Intercambio ${turns+1} de 3`:"Completado"}</span>
            <div className="chat-wrap">
              <div className="chat-msgs">
                {chatMsgs.map((m,i)=><div key={i} className={`cmsg ${m.role}`}><div className="cmsg-av">{m.role==="alex"?"A":"Vos"}</div><div className="cmsg-txt">{m.text}</div></div>)}
                {chatLoad&&<div className="cmsg alex"><div className="cmsg-av">A</div><div className="typing"><div className="tdot"/><div className="tdot"/><div className="tdot"/></div></div>}
                <div ref={chatEndRef}/>
              </div>
              {turns<3&&<div className="chat-footer"><div className="chat-row">
                <textarea className="chat-ta" value={chatIn} onChange={e=>setChatIn(e.target.value)} placeholder="Escribí tu respuesta..." disabled={chatLoad} rows={2} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}}/>
                <button className="btn-send" disabled={chatLoad||!chatIn.trim()} onClick={send}>{chatLoad?"...":"Enviar"}</button>
              </div><div className="turn-h">Enter para enviar · Shift+Enter nueva línea</div></div>}
            </div>
          </>}
          {pStep==="chat-insight"&&<>
            <span className="ey">Roleplay · Análisis</span>
            <h2>Conversación completada</h2>
            <p>Este patrón se cruzará con tus respuestas anteriores para medir tu congruencia.</p>
            <button className="btn-gold" onClick={()=>{setQIdx(PART1_END);setStage("quiz");}}>Continuar con el test →</button>
          </>}
        </motion.div>
      )}

      {/* STAGE: CAPTURE LEADS */}
      {stage==="capture"&&(
        <motion.div key="capture" initial={{opacity:0,y:18}} animate={{opacity:1,y:0}}>
          <span className="ey">Análisis completado</span><h2>¿A dónde te mando el reporte final?</h2>
          <div style={{margin:"2rem 0"}}>
            <div className="field"><label>Nombre</label><input type="text" placeholder="Tu nombre" value={lead.name} onChange={e=>setLead(p=>({...p,name:e.target.value}))}/></div>
            <div className="field"><label>Email</label><input type="email" placeholder="tu@email.com" value={lead.email} onChange={e=>setLead(p=>({...p,email:e.target.value}))}/></div>
          </div>
          <button className="btn-gold" disabled={sending||!lead.name||!lead.email} onClick={capture}>{sending?"Procesando...":"Generar mi perfil completo →"}</button>
        </motion.div>
      )}

      {/* STAGE: LOADING */}
      {stage==="loading"&&(
        <motion.div key="loading" initial={{opacity:0}} animate={{opacity:1}}>
          <div className="loader-c">
            <span className="ey">Construyendo tu perfil integrado</span>
            <p style={{marginTop:".8rem"}}>Cruzando datos de congruencia y patrones léxicos...</p>
            <div className="dots"><div className="dot"/><div className="dot"/><div className="dot"/></div>
          </div>
        </motion.div>
      )}

      {/* STAGE: RESULT */}
      {stage==="result"&&result&&(()=>{
        const prof=PROFILES[result.profile];
        const isApp = result.profile === 'appointment';
        const zone= getZoneLabel(result.sPct, isApp);
        const consPct=Math.round((result.consScore/6)*100);
        const mLbl=result.motivType==="intrinsic"?"Motivación intrínseca":result.motivType==="mixed"?"Motivación mixta":"Motivación extrínseca";
        const mDesc=result.motivType==="intrinsic"?"Impulsado/a por impacto y sentido genuino.":result.motivType==="mixed"?"Combinás autonomía con incentivo concreto.":"El resultado es tu principal motor.";
        
        return(
          <motion.div key="result" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
            <span className="profile-badge">Perfil identificado</span>
            <div className="zone-wrap"><div className="zone-lbl">Tu zona genial</div><div className="zone-nm">{zone}</div></div>
            <h1 style={{color:prof.color,marginBottom:".35rem"}}>{prof.title}</h1>
            <p style={{fontStyle:"italic",color:prof.color,fontSize:"1rem",marginBottom:"1rem"}}>{prof.subtitle}</p>
            
            <p className="disclaimer">
              <strong>Nota clínica:</strong> Este perfil es una radiografía de tus instintos actuales. A medida que sumes conocimientos y confianza, tu cerebro desarrollará nuevas rutas. Tu perfil puede, y va a, evolucionar.
            </p>

            <p className="lead">{prof.desc}</p>
            
            {!isApp && (
              <div className="spec-wrap">
                <div className="spec-labels"><span className="spec-s">Setter</span><span className="spec-c">Closer</span></div>
                <div className="spec-track"><motion.div className="spec-marker" initial={{left:"50%"}} animate={{left:`${result.sPct}%`}} transition={{duration:1.1,delay:.3,ease:"easeOut"}}/></div>
                <div className="spec-pct">{result.sPct}% Setter · {result.cPct}% Closer</div>
              </div>
            )}

            <div className="traits">{prof.traits.map((t,i)=><motion.div key={i} className="trait" initial={{opacity:0,x:-10}} animate={{opacity:1,x:0,transition:{delay:.14+i*.09}}}><span>{t.icon}</span><span>{t.t}</span></motion.div>)}</div>
            
            {result.congruenceWarning && (
              <motion.div className="congruence-alert" initial={{opacity:0}} animate={{opacity:1,transition:{delay:.4}}}>
                <span className="matices-lbl" style={{color:'var(--closer)'}}>Alerta de Congruencia</span>
                {result.congruenceWarning}
              </motion.div>
            )}

            {aiL.m
              ?<div style={{height:"68px",margin:"1.5rem 0",borderRadius:"0 8px 8px 0"}} className="skeleton"/>
              :matices&&<motion.div className="matices-box" initial={{opacity:0}} animate={{opacity:1,transition:{delay:.2}}}><span className="matices-lbl">Nota de matices</span>{matices}</motion.div>}
            
            <div className="divider"/>
            
            <div className="sci-section">
              <div className="sci-header">
                <div className="sci-ico" style={{background:"rgba(180,138,220,.1)",border:"1px solid rgba(180,138,220,.25)"}}>🧩</div>
                <div className="sci-meta"><div className="sci-lbl">Big Five · Factor de Consistencia</div><div className="sci-name">Disciplina Operativa</div></div>
              </div>
              <div className="cons-meter-wrap">
                <div className="cons-track"><motion.div className="cons-fill" style={{width:`${consPct}%`}} initial={{width:0}} animate={{width:`${consPct}%`,transition:{duration:.9,delay:.4}}}/></div>
                <div className="cons-labels"><span>En desarrollo</span><span style={{color:consPct>60?"var(--cons)":"rgba(255,255,255,.4)"}}>{consPct>=70?"Alta ventaja operativa":consPct>=40?"Moderada":"Necesita estructura"}</span><span>Alta</span></div>
              </div>
            </div>

            <div className="sci-section">
              <div className="sci-header">
                <div className="sci-ico" style={{background:"rgba(240,192,96,.1)",border:"1px solid rgba(240,192,96,.25)"}}>⚡</div>
                <div className="sci-meta"><div className="sci-lbl">SDT · Autodeterminación</div><div className="sci-name">Motor Principal</div></div>
              </div>
              <div className="motiv-tag"><span className="motiv-dot"/>{mLbl}</div>
              <p style={{fontSize:".85rem",color:"rgba(255,255,255,.45)",marginTop:".8rem",marginBottom:0}}>{mDesc}</p>
            </div>

            <div className="divider"/>
            <p className="dims-title">Desglose Psicométrico</p>
            {result.dims.map((d,i)=>{const iS=d.tendency==="setter";const col=iS?"var(--setter)":"var(--closer)";const pct=iS?d.sp:d.cp;const isW=result.weakDim?.id===d.id;return(
              <motion.div key={d.id} className="dim-row" initial={{opacity:0}} animate={{opacity:1,transition:{delay:.28+i*.07}}}>
                <div className="dim-top">
                  <span className="dim-name">{d.label}{isW&&<span style={{fontSize:".6rem",marginLeft:"8px",color:"rgba(200,170,110,.6)",letterSpacing:".1em"}}> ↑ FOCO DE CRECIMIENTO</span>}</span>
                  <span style={{fontSize:".75rem",color:col}}>{iS?d.setter:d.closer}</span>
                </div>
                <div className="dbt"><motion.div className="dbf" style={{background:col}} initial={{width:0}} animate={{width:`${pct}%`,transition:{delay:.38+i*.07,duration:.8}}}/></div>
              </motion.div>);})}
            
            <div className="divider"/>
            <div className="sci-section">
              <div className="sci-header">
                <div className="sci-ico" style={{background:"rgba(143,200,138,.1)",border:"1px solid rgba(143,200,138,.25)"}}>🌊</div>
                <div className="sci-meta"><div className="sci-lbl">Estado de Flow</div><div className="sci-name">Condiciones de máximo rendimiento</div></div>
              </div>
              <div className="flow-cards">
                {aiL.f?[1,2,3].map(i=><div key={i} className="skeleton" style={{height:"60px",marginTop:"10px"}}/>)
                  :flowC.length>0?flowC.map((c,i)=><motion.div key={i} className="flow-card" initial={{opacity:0,x:-10}} animate={{opacity:1,x:0,transition:{delay:.1+i*.12}}}><span className="flow-num">{i+1}</span><span className="flow-txt">{c}</span></motion.div>)
                  :<p style={{fontSize:".9rem",fontStyle:"italic"}}>Generando...</p>}
              </div>
            </div>

            <div className="divider"/>
            
            <div className="sci-section">
              <div className="sci-header">
                <div className="sci-ico" style={{background:"rgba(200,170,110,.1)",border:"1px solid rgba(200,170,110,.25)"}}>📚</div>
                <div className="sci-meta">
                  <div className="sci-lbl">Diccionario de Perfiles</div>
                  <div className="sci-name">Entendiendo tu resultado</div>
                </div>
              </div>
              <div className="flow-cards">
                {Object.values(ROLE_DICTIONARY).map((role, i) => (
                  <div key={i} style={{marginBottom:'1rem'}}>
                    <strong style={{color:'var(--gold)', display:'block', marginBottom:'4px'}}>{role.title}</strong>
                    <p style={{fontSize:'.9rem', lineHeight:'1.5'}}>{role.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="disclaimer" style={{marginTop:'2rem'}}>
              Hemos enviado un desglose detallado y con diseño premium a tu casilla de correo: <strong>{lead.email}</strong>. Revisá tu carpeta de Promociones o Spam si no lo ves en unos minutos.
            </div>

            <button className="btn-ghost" style={{textAlign:"center",width:"100%",marginTop:"1.2rem"}} onClick={reset}>Reiniciar diagnóstico</button>
          </motion.div>
        );
      })()}

    </AnimatePresence></div>
  );
}
