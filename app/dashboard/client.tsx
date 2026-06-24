'use client'

import { useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase-client'
import { useRouter } from 'next/navigation'

interface Props {
  user: {
    id: string
    email: string
    nome: string
    role: string
  }
}

const SISTEMA_CSS = `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:#F0F2F5;color:#111827;font-size:13px}
.app{display:flex;min-height:100vh}
.sb{width:210px;background:#0C1C36;display:flex;flex-direction:column;position:fixed;top:0;left:0;height:100vh;z-index:50;transition:transform .2s}
.sb-brand{padding:16px 14px 12px;border-bottom:1px solid rgba(255,255,255,.07)}
.sb-dot{width:30px;height:30px;background:#2563EB;border-radius:8px;display:flex;align-items:center;justify-content:center;margin-bottom:8px;font-size:14px;color:#fff}
.sb-name{font-size:13px;font-weight:700;color:#fff}.sb-sub{font-size:10px;color:rgba(255,255,255,.3);margin-top:1px}
.sb-nav{padding:7px 6px;flex:1;overflow-y:auto}
.sb-sec{font-size:9px;font-weight:700;color:rgba(255,255,255,.22);letter-spacing:1px;text-transform:uppercase;padding:10px 8px 3px}
.nb{display:flex;align-items:center;gap:8px;width:100%;padding:8px 9px;border:none;background:none;cursor:pointer;border-radius:6px;font-size:12px;font-weight:500;color:rgba(255,255,255,.44);text-align:left;margin-bottom:1px;border-left:2px solid transparent;transition:all .12s}
.nb:hover{background:rgba(255,255,255,.06);color:rgba(255,255,255,.8)}
.nb.on{background:rgba(37,99,235,.2);color:#93C5FD;border-left-color:#3B82F6}
.nb-bdg{margin-left:auto;background:#DC2626;color:#fff;border-radius:8px;font-size:9px;font-weight:700;padding:1px 5px}
.sb-foot{padding:9px 14px;border-top:1px solid rgba(255,255,255,.05);font-size:9px;color:rgba(255,255,255,.16);text-align:center}
.main{margin-left:210px;display:flex;flex-direction:column;flex:1;min-width:0}
.topbar{background:#fff;border-bottom:1px solid #E5E7EB;padding:0 20px;height:50px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:40;gap:10px;min-width:0}
.tb-menu{display:none;background:none;border:none;cursor:pointer;font-size:20px;color:#6B7280;padding:4px}
.tb-title{font-size:14px;font-weight:700;color:#0C1C36;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.tb-sub{font-size:10px;color:#6B7280;margin-top:1px}
.tb-alert{display:flex;align-items:center;gap:5px;background:#FEE2E2;border:1px solid #FCA5A5;border-radius:6px;padding:4px 9px;font-size:11px;font-weight:600;color:#991B1B;white-space:nowrap;flex-shrink:0}
.page{padding:18px 20px}
.kgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(125px,1fr));gap:10px;margin-bottom:16px}
.kc{background:#fff;border-radius:9px;border:1px solid #E5E7EB;padding:12px 13px}
.kc-l{font-size:9px;font-weight:600;color:#6B7280;text-transform:uppercase;letter-spacing:.4px;margin-bottom:4px}
.kc-v{font-size:20px;font-weight:700;line-height:1}.kc-sub{font-size:10px;color:#6B7280;margin-top:3px}
.card{background:#fff;border-radius:9px;border:1px solid #E5E7EB;overflow:hidden;margin-bottom:11px}
.card-h{padding:10px 15px;border-bottom:1px solid #F3F4F6;display:flex;align-items:center;justify-content:space-between;gap:8px}
.card-t{font-size:12px;font-weight:700;color:#0C1C36}.card-b{padding:13px 15px}
.btn{display:inline-flex;align-items:center;gap:5px;padding:6px 13px;border-radius:6px;font-size:12px;font-weight:600;cursor:pointer;border:none;transition:all .12s;white-space:nowrap}
.bp{background:#2563EB;color:#fff}.bp:hover{background:#1D4ED8}
.bs{background:#fff;color:#374151;border:1px solid #E5E7EB}.bs:hover{background:#F9FAFB}
.bi{background:#fff;color:#6B7280;border:1px solid #E5E7EB;border-radius:5px;padding:3px 7px;cursor:pointer;font-size:12px}
.bi:hover{background:#F3F4F6}
.bdg{display:inline-flex;align-items:center;padding:2px 7px;border-radius:4px;font-size:10px;font-weight:600;white-space:nowrap}
.fg{display:flex;flex-direction:column;gap:3px}
.lb{font-size:10px;font-weight:600;color:#374151}
.inp{width:100%;padding:6px 9px;border:1px solid #E5E7EB;border-radius:6px;font-size:12px;color:#111827;background:#fff;outline:none;font-family:inherit}
.inp:focus{border-color:#2563EB;box-shadow:0 0 0 2px rgba(37,99,235,.1)}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}
.g4{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:10px}
.sdiv{display:flex;align-items:center;gap:6px;font-size:9px;font-weight:700;color:#0C1C36;text-transform:uppercase;letter-spacing:.7px;padding:4px 0 8px;border-bottom:2px solid #EEF2FF;margin-bottom:12px}
.tw{border-radius:9px;border:1px solid #E5E7EB;overflow:hidden}
.tw-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch;border-radius:9px}
table{width:100%;border-collapse:collapse;font-size:12px;min-width:600px}
thead tr{background:#F9FAFB}
th{padding:7px 11px;text-align:left;font-size:9px;font-weight:700;color:#6B7280;text-transform:uppercase;letter-spacing:.5px;border-bottom:1px solid #E5E7EB;white-space:nowrap}
td{padding:8px 11px;border-bottom:1px solid #F3F4F6;color:#374151;vertical-align:middle}
tr:last-child td{border-bottom:none}
tr:hover td{background:#FAFBFF}
.ov{display:none;position:fixed;inset:0;background:rgba(10,20,40,.5);z-index:200;overflow-y:auto;padding:16px}
.ov.show{display:flex;align-items:flex-start;justify-content:center}
.mbox{background:#fff;border-radius:12px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,.15)}
.mh{padding:14px 18px 11px;border-bottom:1px solid #F3F4F6;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;background:#fff;z-index:2}
.mh h2{font-size:14px;font-weight:700;color:#0C1C36}
.mb{padding:15px 18px;max-height:82vh;overflow-y:auto}
.fbar{height:4px;background:#EEF2FF;border-radius:2px;overflow:hidden;margin-top:4px}
.ff{height:100%;background:#2563EB;border-radius:2px}
.kanban{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:10px;align-items:start}
.kb-col{background:#F9FAFB;border-radius:9px;border:1px solid #E5E7EB;overflow:hidden}
.kb-head{padding:8px 12px;font-size:11px;font-weight:700;border-bottom:1px solid #E5E7EB;display:flex;align-items:center;justify-content:space-between}
.kb-body{padding:7px;min-height:50px}
.kb-card{background:#fff;border-radius:7px;border:1px solid #E5E7EB;border-left:3px solid;padding:9px 10px;margin-bottom:5px;cursor:pointer;transition:box-shadow .12s}
.kb-card:hover{box-shadow:0 3px 10px rgba(0,0,0,.09)}
.fc{background:#fff;border-radius:9px;border:1px solid #E5E7EB;border-left:3px solid;padding:12px 13px;cursor:pointer;margin-bottom:8px;transition:box-shadow .12s}
.fc:hover{box-shadow:0 4px 12px rgba(0,0,0,.09)}
.fu-urg{border-left-color:#DC2626}.fu-hoj{border-left-color:#D97706}.fu-ok{border-left-color:#059669}.fu-fut{border-left-color:#D1D5DB}
.tl{display:flex;gap:9px;padding-bottom:11px}
.tl-dot{width:8px;height:8px;border-radius:50%;background:#2563EB;flex-shrink:0;margin-top:3px}
.tl-line{width:1px;background:#E5E7EB;flex:1;margin-top:4px}
.ck-row{display:flex;align-items:center;justify-content:space-between;padding:6px 9px;border-radius:6px;border:1px solid #E5E7EB;margin-bottom:4px}
.alert{display:flex;align-items:center;gap:8px;padding:8px 11px;border-radius:7px;margin-bottom:8px;font-size:11px;font-weight:500}
.al-r{background:#FEF2F2;border:1px solid #FCA5A5;color:#991B1B}
.al-a{background:#FFFBEB;border:1px solid #FDE68A;color:#92400E}
.al-b{background:#EFF6FF;border:1px solid #BFDBFE;color:#1D4ED8}
.chips{display:flex;gap:5px;margin-bottom:11px;flex-wrap:wrap}
.chip{padding:4px 10px;border-radius:5px;border:1px solid #E5E7EB;background:#fff;font-size:11px;font-weight:500;cursor:pointer;color:#6B7280}
.chip.on{background:#0C1C36;color:#fff;border-color:#0C1C36}
.filter-row{display:flex;gap:6px;margin-bottom:12px;flex-wrap:wrap;align-items:center}
.tab-bar{display:flex;border-bottom:2px solid #F3F4F6;margin-bottom:14px;overflow-x:auto}
.tab-btn{padding:7px 14px;border:none;background:none;cursor:pointer;font-size:12px;font-weight:500;color:#6B7280;border-bottom:2px solid transparent;margin-bottom:-2px;white-space:nowrap}
.tab-btn.on{color:#2563EB;border-bottom-color:#2563EB;font-weight:700}
.audit-item{display:flex;gap:8px;padding:5px 0;border-bottom:1px solid #F3F4F6;font-size:11px}
.audit-item:last-child{border-bottom:none}
.drow{display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid #F3F4F6;font-size:11px}
.drow:last-child{border-bottom:none}
.dk{color:#6B7280}.dv{font-weight:600;text-align:right;max-width:58%}
.user-card{background:#fff;border-radius:9px;border:1px solid #E5E7EB;padding:13px 16px;display:flex;align-items:center;gap:13px;margin-bottom:8px}
.user-av{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;flex-shrink:0}
.role-bdg{display:inline-flex;align-items:center;padding:2px 9px;border-radius:20px;font-size:10px;font-weight:700}
.gcal-btn{display:inline-flex;align-items:center;gap:5px;padding:5px 11px;background:#fff;border:1px solid #E5E7EB;border-radius:6px;font-size:11px;font-weight:600;cursor:pointer;color:#374151;text-decoration:none}
.gcal-btn:hover{background:#EFF6FF;border-color:#2563EB;color:#2563EB}
.conf-bdg{display:inline-flex;align-items:center;gap:4px;background:#FEF3C7;color:#92400E;border:1px solid #FDE68A;border-radius:5px;padding:2px 7px;font-size:10px;font-weight:600;cursor:pointer;margin-left:5px}

/* ── RESPONSIVE ── */
@media(max-width:900px){
  .cal-wrap{grid-template-columns:1fr}
}
@media(max-width:768px){
  .sb{transform:translateX(-100%)}
  .sb.open{transform:translateX(0)}
  .main{margin-left:0}
  .tb-menu{display:block}
  .page{padding:12px 14px}
  .g4{grid-template-columns:1fr 1fr}
  .kgrid{grid-template-columns:repeat(auto-fit,minmax(100px,1fr))}
  .mbox{max-width:100%!important;margin:0!important;border-radius:12px 12px 0 0!important}
  .ov{align-items:flex-end!important;padding:0!important}
  .mb{max-height:85vh}
  .kanban{grid-template-columns:repeat(auto-fill,minmax(220px,1fr))}
  .fc{min-width:0}
  .topbar{padding:0 12px}
  .tb-title{font-size:13px}
}
@media(max-width:480px){
  .g3,.g4{grid-template-columns:1fr}
  .g2{grid-template-columns:1fr}
  .filter-row{flex-direction:column;align-items:stretch}
  .filter-row .inp,.filter-row select,.filter-row .btn{width:100%}
  .kgrid{grid-template-columns:repeat(2,1fr)}
  .kc-v{font-size:17px}
  table{min-width:420px}
  .kanban{grid-template-columns:1fr;overflow-x:auto}
  .cal-days .cal-day{min-height:52px;padding:3px}
  .cal-day-num{font-size:11px}
  .cal-event{font-size:9px;padding:1px 3px}
  .drow{flex-direction:column;gap:1px}
  .drow .dv{text-align:left;max-width:100%}
  .tab-btn{padding:6px 9px;font-size:11px}
  .tl{gap:6px}
  .user-card{flex-wrap:wrap}
}



/* ── AGENDA / CALENDARIO ── */
.cal-wrap{display:grid;grid-template-columns:1fr 340px;gap:16px;align-items:start}
.cal-grid{background:#fff;border-radius:10px;border:1px solid #E5E7EB;overflow:hidden}
.cal-header{display:flex;align-items:center;justify-content:space-between;padding:13px 18px;border-bottom:1px solid #F3F4F6;background:#fff}
.cal-title{font-size:14px;font-weight:700;color:#0C1C36}
.cal-nav{display:flex;gap:6px}
.cal-nav button{background:#F3F4F6;border:none;border-radius:6px;padding:4px 10px;cursor:pointer;font-size:13px;font-weight:600;color:#374151}
.cal-nav button:hover{background:#E5E7EB}
.cal-days-header{display:grid;grid-template-columns:repeat(7,1fr);border-bottom:1px solid #F3F4F6}
.cal-day-label{padding:7px 0;text-align:center;font-size:10px;font-weight:700;color:#9CA3AF;text-transform:uppercase;letter-spacing:.5px}
.cal-days{display:grid;grid-template-columns:repeat(7,1fr)}
.cal-day{min-height:78px;padding:6px;border-right:1px solid #F3F4F6;border-bottom:1px solid #F3F4F6;cursor:pointer;transition:background .1s;position:relative}
.cal-day:hover{background:#F9FAFB}
.cal-day.other-month{background:#FAFAFA}
.cal-day.today .cal-day-num{background:#2563EB;color:#fff;border-radius:50%;width:22px;height:22px;display:inline-flex;align-items:center;justify-content:center}
.cal-day.selected{background:#EFF6FF}
.cal-day-num{font-size:12px;font-weight:500;color:#374151;display:inline-block;width:22px;text-align:center;line-height:22px}
.cal-day.other-month .cal-day-num{color:#D1D5DB}
.cal-event{font-size:10px;font-weight:600;padding:2px 5px;border-radius:4px;margin-bottom:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;cursor:pointer;line-height:1.4}
.cal-event.ev-evento{background:#DBEAFE;color:#1D4ED8}
.cal-event.ev-trava{background:#FEF3C7;color:#92400E}
.cal-event.ev-voo{background:#D1FAE5;color:#065F46}
.cal-event.ev-hotel{background:#EDE9FE;color:#6D28D9}
.cal-event.ev-logistica{background:#CCFBF1;color:#0F766E}
.cal-sidebar{display:flex;flex-direction:column;gap:12px}
.cal-day-detail{background:#fff;border-radius:10px;border:1px solid #E5E7EB;overflow:hidden}
.cal-day-detail-header{padding:11px 14px;border-bottom:1px solid #F3F4F6;font-size:12px;font-weight:700;color:#0C1C36}
.logistica-item{display:flex;align-items:flex-start;gap:10px;padding:9px 13px;border-bottom:1px solid #F3F4F6}
.logistica-item:last-child{border-bottom:none}
.logistica-icon{width:28px;height:28px;border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0}



.sb-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:49}
.sb-overlay.show{display:block}`

const SISTEMA_HTML = `<div class="app">
  <div class="sb-overlay" id="sbOverlay" onclick="closeSidebar()"></div>
<nav class="sb" id="sidebar">
    <div class="sb-brand"><div class="sb-dot">&#9733;</div><div class="sb-name">Diego Borges</div><div class="sb-sub">Gestao de Eventos</div></div>
    <div class="sb-nav" id="sbNav"></div>
    <div class="sb-foot">v5.0 Sistema de Eventos</div>
  </nav>
  <div class="main">
    <div class="topbar">
      <button class="tb-menu" id="menuBtn">&#9776;</button>
      <div style="flex:1"><div class="tb-title" id="pageTitle">Dashboard</div><div class="tb-sub" id="pageSub"></div></div>
      <div id="topbarRight"></div>
    </div>
    <div class="page" id="pageContent"></div>
  </div>
  <div class="ov" id="modalOv">
    <div class="mbox" id="modalBox" style="max-width:860px">
      <div class="mh"><h2 id="modalTitle"></h2><button class="bi" id="modalCloseBtn" style="font-size:17px;padding:2px 8px">&#10005;</button></div>
      <div class="mb" id="modalBody"></div>
    </div>
  </div>
  <div id="toast" style="display:none;position:fixed;bottom:20px;right:20px;background:#FEF3C7;border:1px solid #FDE68A;border-radius:9px;padding:12px 16px;font-size:12px;color:#92400E;z-index:500;max-width:320px;box-shadow:0 4px 16px rgba(0,0,0,.12)"></div>
  <!-- AUTH SCREEN -->
  <div id="authScreen" style="display:flex;position:fixed;inset:0;background:#0C1C36;z-index:9999;align-items:center;justify-content:center">
    <div style="background:#fff;border-radius:16px;padding:36px 40px;width:min(400px,92vw);max-height:90vh;overflow-y:auto;box-shadow:0 24px 64px rgba(0,0,0,.4)">
      <div style="text-align:center;margin-bottom:24px">
        <div style="width:48px;height:48px;background:#2563EB;border-radius:13px;display:inline-flex;align-items:center;justify-content:center;font-size:24px;color:#fff;margin-bottom:12px">&#9733;</div>
        <div style="font-size:18px;font-weight:700;color:#0C1C36">Diego Borges</div>
        <div style="font-size:12px;color:#6B7280;margin-top:3px">Gestao de Eventos</div>
      </div>
      <div id="authErr" style="display:none;background:#FEF2F2;border:1px solid #FCA5A5;border-radius:7px;padding:8px 12px;font-size:12px;color:#991B1B;margin-bottom:14px">Usuario ou senha incorretos.</div>
      <label style="font-size:11px;font-weight:600;color:#374151;display:block;margin-bottom:4px">Usuario</label>
      <input id="authUser" type="text" placeholder="seu usuario" autocomplete="username" style="width:100%;padding:9px 12px;border:1px solid #D1D5DB;border-radius:8px;font-size:13px;outline:none;font-family:inherit;margin-bottom:14px;box-sizing:border-box">
      <label style="font-size:11px;font-weight:600;color:#374151;display:block;margin-bottom:4px">Senha</label>
      <input id="authPass" type="password" placeholder="senha" autocomplete="current-password" style="width:100%;padding:9px 12px;border:1px solid #D1D5DB;border-radius:8px;font-size:13px;outline:none;font-family:inherit;margin-bottom:4px;box-sizing:border-box">
      <button id="loginBtn" style="width:100%;padding:10px;background:#2563EB;color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer;margin-top:12px">Entrar</button>
    </div>
  </div>
</div>
<script>
// ------------------------------------------------
// CONSTANTES
// ------------------------------------------------
var SFUNIL = ["Contato Inicial","Agendar primeira reuniao","Reuniao 1 agendada","Aguardando retorno","Proposta enviada","Cliente analisando","Reuniao final","Confirmado","Contrato em criacao","Contrato em assinatura","Contrato assinado","Evento concluido","Adiado"];
var TIPOS = ["Imersao","Palestra","Workshop","Palestra + Workshop","Evento Fechado"];
var PRIOR = ["Baixa","Media","Alta"];
var FUNCOES = ["Dono","Marketing","Gestor comercial","Produtor","Financeiro","Coordenador","Outro"];
var SCONT = ["Aguardando assinatura","Vagas reservadas","Assinado","Em revisao","Cancelado"];
var TPARC = ["Divulgacao","Apoio comercial","Indicacao","Estrutura","Producao","Espaco","Marketing","Patrocinio","Outro"];
var SPARC = ["Em conversa","Confirmado","Pendente","Encerrado","Nao aprovado"];
var CATLINK = ["Marca / Identidade Visual","Redes Sociais","Contratos","Propostas","Fotos e Videos","Materiais de Divulgacao","Apresentacoes","Fornecedores","Parceiros","Drive / Arquivos","Orcamentos","Comprovantes","Outros"];
var CKO = ["Pendente","Em andamento","Concluido","Nao se aplica"];
var DESPO = ["Pago","Parceria","Pendente","Nao se aplica"];
var FTIPOS = ["WhatsApp","Ligacao","Email","Reuniao presencial","Reuniao online","Instagram"];
var LEAD_STATUS = ["Novo Lead","Em conversa","Proposta enviada","Negociacao","Fechado - Virou Evento","Perdido"];

var FP = {"Contato Inicial":8,"Agendar primeira reuniao":15,"Reuniao 1 agendada":25,"Aguardando retorno":33,"Proposta enviada":44,"Cliente analisando":54,"Reuniao final":65,"Confirmado":75,"Contrato em criacao":82,"Contrato em assinatura":88,"Contrato assinado":95,"Evento concluido":100,"Adiado":0};
var SC = {"Contato Inicial":["#F3F4F6","#6B7280"],"Agendar primeira reuniao":["#EFF6FF","#2563EB"],"Reuniao 1 agendada":["#DBEAFE","#1D4ED8"],"Aguardando retorno":["#FFFBEB","#B45309"],"Proposta enviada":["#FEF3C7","#92400E"],"Cliente analisando":["#FEF9C3","#713F12"],"Reuniao final":["#EDE9FE","#6D28D9"],"Confirmado":["#D1FAE5","#065F46"],"Contrato em criacao":["#ECFDF5","#059669"],"Contrato em assinatura":["#ECFDF5","#047857"],"Contrato assinado":["#A7F3D0","#064E3B"],"Evento concluido":["#CCFBF1","#0F766E"],"Adiado":["#FEE2E2","#991B1B"]};
var PC = {"Alta":["#FEE2E2","#991B1B"],"Media":["#FEF3C7","#92400E"],"Baixa":["#D1FAE5","#065F46"]};
var CKC = {"Concluido":["#D1FAE5","#065F46"],"Em andamento":["#FEF3C7","#92400E"],"Pendente":["#FEE2E2","#991B1B"],"Nao se aplica":["#F3F4F6","#9CA3AF"]};
var DC = {"Pago":["#D1FAE5","#065F46"],"Parceria":["#EDE9FE","#6D28D9"],"Pendente":["#FEE2E2","#991B1B"],"Nao se aplica":["#F3F4F6","#9CA3AF"]};
var LEAD_SC = {"Novo Lead":["#EFF6FF","#2563EB"],"Em conversa":["#DBEAFE","#1D4ED8"],"Proposta enviada":["#FEF3C7","#92400E"],"Negociacao":["#EDE9FE","#6D28D9"],"Fechado - Virou Evento":["#D1FAE5","#065F46"],"Perdido":["#FEE2E2","#991B1B"]};

// ------------------------------------------------
// AUTH / USUARIOS
// ------------------------------------------------
var ROLES = {
  admin:    {label:"Admin",        color:"#1D4ED8", bg:"#DBEAFE", desc:"Acesso total + gestao de usuarios"},
  manager:  {label:"Gerente",      color:"#065F46", bg:"#D1FAE5", desc:"Acesso total, sem gestao de usuarios"},
  producao: {label:"Producao",     color:"#6D28D9", bg:"#EDE9FE", desc:"Leads, Follow-up, Eventos, Checklist e Custos"},
  viewer:   {label:"Visualizador", color:"#92400E", bg:"#FEF3C7", desc:"Somente leitura"}
};
var ROLE_TABS = {
  admin:    ["dashboard","leads","followup","agenda","eventos","checklist","custos","parceiros","links","usuarios"],
  manager:  ["dashboard","leads","followup","agenda","eventos","checklist","custos","parceiros","links"],
  producao: ["dashboard","leads","followup","agenda","eventos","checklist","custos"],
  viewer:   ["dashboard","agenda","eventos","checklist"]
};

var users = [
  {id:"u1", nome:"Diego Borges", usuario:"diego",    senha:"diego2024",    role:"admin",    ativo:true},
  {id:"u2", nome:"Adriano",      usuario:"adriano",   senha:"adriano2024",  role:"manager",  ativo:true},
  {id:"u3", nome:"Producao",     usuario:"producao",  senha:"prod2024",     role:"producao", ativo:true},
  {id:"u4", nome:"Visitante",    usuario:"viewer",    senha:"view2024",     role:"viewer",   ativo:true}
];
var currentUser = null;

function doLogin() {
  var u = document.getElementById("authUser").value.trim().toLowerCase();
  var p = document.getElementById("authPass").value;
  var found = null;
  for (var i = 0; i < users.length; i++) {
    if (users[i].usuario.toLowerCase() === u && users[i].senha === p && users[i].ativo) {
      found = users[i]; break;
    }
  }
  var err = document.getElementById("authErr");
  if (!found) {
    err.style.display = "block";
    document.getElementById("authPass").value = "";
    return;
  }
  currentUser = found;
  document.getElementById("authScreen").style.display = "none";
  var allowed = ROLE_TABS[currentUser.role] || [];
  if (allowed.indexOf(tab) === -1) tab = allowed[0];
  renderAll();
}

function doLogout() {
  currentUser = null; tab = "dashboard";
  document.getElementById("authScreen").style.display = "flex";
  document.getElementById("authUser").value = "";
  document.getElementById("authPass").value = "";
  document.getElementById("authErr").style.display = "none";
  document.getElementById("pageContent").innerHTML = "";
  document.getElementById("sbNav").innerHTML = "";
}

function canEdit() { return currentUser && currentUser.role !== "viewer"; }
function canTab(t) { return currentUser && (ROLE_TABS[currentUser.role]||[]).indexOf(t) !== -1; }
function uInitials(n) { return n.split(" ").map(function(w){return w[0];}).slice(0,2).join("").toUpperCase(); }
function uColor(r) { return ({admin:"#2563EB",manager:"#059669",producao:"#7C3AED",viewer:"#D97706"})[r]||"#6B7280"; }
function roleBdg(role) {
  var r = ROLES[role] || ROLES.viewer;
  return '<span class="role-bdg" style="background:'+r.bg+';color:'+r.color+'">'+r.label+"</span>";
}

// ------------------------------------------------
// UTILS
// ------------------------------------------------
function uid() { return Math.random().toString(36).slice(2,9); }
function fmt(n) { return (parseFloat(n)||0).toLocaleString("pt-BR",{style:"currency",currency:"BRL"}); }
function fD(d) { if(!d) return ""; var p=d.split("-"); return p.length===3?p[2]+"/"+p[1]+"/"+p[0]:d; }
function today() { return new Date().toISOString().slice(0,10); }
function nowStr() {
  var d = new Date();
  return d.toLocaleDateString("pt-BR")+" "+d.toLocaleTimeString("pt-BR");
}
function diff(ds) {
  if (!ds) return null;
  return Math.round((new Date(ds+"T12:00:00")-new Date(today()+"T12:00:00"))/86400000);
}
function addD(ds, n) {
  if (!ds) return "";
  var d = new Date(ds+"T12:00:00"); d.setDate(d.getDate()+n);
  return d.toISOString().slice(0,10);
}
function esc(s) {
  return String(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}
function gv(id) { var el=document.getElementById(id); return el?el.value||"":""; }
function calcMeta(t) { return ({Imersao:200,Palestra:300,Workshop:100,"Palestra + Workshop":300})[t]||null; }
function calcTrava(d) {
  if (!d) return "";
  var dt=new Date(d+"T12:00:00"),a=new Date(dt),b=new Date(dt);
  a.setDate(dt.getDate()-1); b.setDate(dt.getDate()+1);
  function f(x){return String(x.getDate()).padStart(2,"0")+"/"+String(x.getMonth()+1).padStart(2,"0")+"/"+x.getFullYear();}
  return f(a)+" a "+f(b);
}
function calcRes(tipo, qtd, meta) {
  if (tipo==="Evento Fechado") return "Nao se aplica";
  if (!meta||!qtd) return "";
  return Number(qtd)>=meta?"Meta batida":"Abaixo da meta";
}
function calcAcao(s) {
  if (!s) return "";
  return ["Evento concluido","Contrato assinado","Confirmado","Contrato em criacao","Contrato em assinatura"].indexOf(s)!==-1?"Acompanhar / OK":"Entrar em contato";
}
function calcLimCK(tipo, d) { return tipo==="Imersao"&&d?addD(d,-5):""; }
function urgCls(p) {
  var d=diff(p);
  if(d===null)return"fu-fut";if(d<0)return"fu-urg";if(d===0)return"fu-hoj";if(d<=3)return"fu-ok";return"fu-fut";
}
function checkConflicts(data, ignoreId) {
  if (!data) return [];
  var res = [];
  for (var i=0;i<ev.length;i++) {
    var e=ev[i];
    if (e.id===ignoreId||!e.data) continue;
    var de=addD(e.data,-1), at=addD(e.data,1);
    if (data>=de&&data<=at) res.push({empresa:e.empresa,data:e.data,trava:calcTrava(e.data)});
  }
  return res;
}
function showToast(msg, ms) {
  var t=document.getElementById("toast");
  t.innerHTML=msg; t.style.display="block";
  clearTimeout(window._tt);
  window._tt=setTimeout(function(){t.style.display="none";}, ms||3000);
}
function bdg(label, map) {
  var c=(map&&map[label])||["#F3F4F6","#9CA3AF"];
  return '<span class="bdg" style="background:'+c[0]+';color:'+c[1]+'">'+esc(label)+"</span>";
}
function sBdg(s){return bdg(s,SC);}
function pBdg(p){return bdg(p,PC);}
function fbar(s,w) { return '<div class="fbar"'+(w?' style="width:'+w+'px"':'')+' ><div class="ff" style="width:'+(FP[s]||0)+'%"></div></div>'; }
function inpF(label,id,val,type) { return '<div class="fg"><span class="lb">'+esc(label)+'</span><input class="inp" id="'+esc(id)+'" type="'+(type||"text")+'" value="'+esc(val||"")+'"></div>'; }
function selF(label,id,val,opts) { return '<div class="fg"><span class="lb">'+esc(label)+'</span><select class="inp" id="'+esc(id)+'"><option value="">Selecionar...</option>'+opts.map(function(o){return'<option'+(o===val?' selected':'')+'>'+esc(o)+'</option>';}).join("")+'</select></div>'; }
function taF(label,id,val,rows) { return '<div class="fg"><span class="lb">'+esc(label)+'</span><textarea class="inp" id="'+esc(id)+'" rows="'+(rows||2)+'" style="resize:vertical">'+esc(val||"")+'</textarea></div>'; }
function sdiv(label) { return '<div class="sdiv">+ '+label+'</div>'; }
function autoF(label,val,cls) { return '<div class="fg"><span class="lb">'+esc(label)+'</span><div class="inp '+(cls||"")+'">'+esc(val||"---")+'</div></div>'; }

// ------------------------------------------------
// DADOS
// ------------------------------------------------
var ev = [
];

var leads = [
];


// ------------------------------------------------
// AGENDA / LOGISTICA
// ------------------------------------------------
var logistica = [
];

var calMes = new Date().getMonth();
var calAno = new Date().getFullYear();
var calSelDia = null;

var par = [];

var lnk = [];


// ------------------------------------------------
// STATE
// ------------------------------------------------
var tab = "dashboard";
var evF = {q:"",s:"",t:"",c:""};
var fuF = "todos";
var leadKanban = true;
var custoEdit = null;

// ------------------------------------------------
// TABS / NAV
// ------------------------------------------------
var TABS = [
  {id:"dashboard",l:"Dashboard",sec:"geral"},
  {id:"leads",    l:"Leads",    sec:"geral",alert:true},
  {id:"followup", l:"Follow-up",sec:"geral"},
  {id:"eventos",  l:"Eventos",  sec:"comercial"},
  {id:"checklist",l:"Checklist",sec:"operacional"},
  {id:"custos",   l:"Custos",   sec:"operacional"},
  {id:"parceiros",l:"Parceiros",sec:"operacional"},
  {id:"links",    l:"Links Uteis",sec:"operacional"},
  {id:"agenda",   l:"Agenda",   sec:"geral"},
  {id:"usuarios", l:"Usuarios", sec:"admin"}
];
var SECLABELS = {geral:"Geral",comercial:"Comercial",operacional:"Operacional",admin:"Administracao"};

function renderNav() {
  if (!currentUser) { document.getElementById("sbNav").innerHTML=""; return; }
  var allowed = ROLE_TABS[currentUser.role]||[];
  var urg = 0;
  for (var i=0;i<leads.length;i++) { var d=diff(leads[i].prazoAcao); if(d!==null&&d<0&&["Fechado - Virou Evento","Perdido"].indexOf(leads[i].status)===-1) urg++; }
  var h = "";
  var secs = ["geral","comercial","operacional"];
  if (currentUser.role==="admin") secs.push("admin");
  secs.forEach(function(sec) {
    var secTabs = TABS.filter(function(t){return t.sec===sec&&allowed.indexOf(t.id)!==-1;});
    if (!secTabs.length) return;
    h += '<div class="sb-sec">'+SECLABELS[sec]+"</div>";
    secTabs.forEach(function(t) {
      h += '<button class="nb'+(tab===t.id?" on":"")+'" onclick="setTab(\\''+t.id+'\\')">'+t.l+(t.alert&&urg>0?'<span class="nb-bdg">'+urg+"</span>":"")+"</button>";
    });
  });
  var r = ROLES[currentUser.role]||ROLES.viewer;
  h += '<div style="margin-top:12px;padding:9px;background:rgba(255,255,255,.06);border-radius:7px">';
  h += '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">';
  h += '<div style="width:28px;height:28px;border-radius:50%;background:'+uColor(currentUser.role)+'33;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:'+uColor(currentUser.role)+'">'+uInitials(currentUser.nome)+"</div>";
  h += '<div><div style="font-size:11px;font-weight:600;color:#fff">'+esc(currentUser.nome)+"</div>";
  h += '<span class="role-bdg" style="background:'+r.bg+';color:'+r.color+'">'+r.label+"</span></div></div>";
  h += '<button onclick="doLogout()" style="width:100%;padding:5px;background:rgba(220,38,38,.15);border:1px solid rgba(220,38,38,.3);border-radius:6px;color:#FCA5A5;font-size:11px;font-weight:600;cursor:pointer">Sair</button></div>';
  document.getElementById("sbNav").innerHTML = h;
}

function renderTopbar() {
  var titles = {dashboard:"Dashboard",leads:"Leads e Contatos",followup:"Follow-up",eventos:"Eventos",checklist:"Checklist Operacional",custos:"Custos",parceiros:"Parceiros",links:"Links Uteis",usuarios:"Usuarios"};
  var urgFu = 0;
  for (var i=0;i<ev.length;i++) { var d=diff(ev[i].prazoAcao); if(d!==null&&d<0&&["Evento concluido","Contrato assinado"].indexOf(ev[i].status)===-1) urgFu++; }
  document.getElementById("pageTitle").textContent = titles[tab]||tab;
  document.getElementById("pageSub").textContent = ev.length+" eventos  "+leads.length+" leads  "+par.length+" parceiros";
  document.getElementById("topbarRight").innerHTML = (tab==="followup"&&urgFu>0)?'<div class="tb-alert">!! '+urgFu+' acao'+(urgFu>1?"oes":"")+" vencida"+(urgFu>1?"s":"")+'</div>':"";
}

function setTab(t) {
  if (!canTab(t)) return;
  tab=t; document.getElementById("sidebar").classList.remove("open");
  var ov=document.getElementById("sbOverlay");if(ov)ov.classList.remove("show");
  renderAll();
}
function renderAll() { renderNav(); renderTopbar(); renderPage(); }
function renderPage() {
  if (!currentUser) { document.getElementById("pageContent").innerHTML=""; return; }
  var pages = {dashboard:pgDashboard,leads:pgLeads,followup:pgFollowup,agenda:pgAgenda,eventos:pgEventos,checklist:pgChecklist,custos:pgCustos,parceiros:pgParceiros,links:pgLinks,usuarios:pgUsuarios};
  document.getElementById("pageContent").innerHTML = (pages[tab]||pgDashboard)();
}

// ------------------------------------------------
// MODAL
// ------------------------------------------------
function openModal() { document.getElementById("modalOv").classList.add("show"); }
function closeModal() { document.getElementById("modalOv").classList.remove("show"); }

// ------------------------------------------------
// GOOGLE CALENDAR
// ------------------------------------------------
function openGcal(eid, who) {
  var e = null;
  for (var i=0;i<ev.length;i++) if(ev[i].id===eid){e=ev[i];break;}
  if (!e||!e.data) return;
  var title = encodeURIComponent("[Diego Borges] "+e.tipo+" - "+e.empresa);
  var start = addD(e.data,-1).replace(/-/g,"");
  var end = addD(e.data,2).replace(/-/g,"");
  var loc = encodeURIComponent(e.cidade||"");
  var note = who==="producao"?"Agenda bloqueada: Producao (logistica)":"Agenda bloqueada: Diego Borges (deslocamento + evento + retorno)";
  var details = encodeURIComponent("Tipo: "+e.tipo+"\\nEmpresa: "+e.empresa+"\\nResponsavel: "+e.responsavel+" ("+e.contato+")\\nCidade: "+e.cidade+"\\nStatus: "+e.status+"\\nValor: "+fmt(e.valorContrato)+"\\nTrava: "+calcTrava(e.data)+"\\n\\n"+note+(e.obs?"\\n\\nObs: "+e.obs:""));
  window.open("https://calendar.google.com/calendar/render?action=TEMPLATE&text="+title+"&dates="+start+"/"+end+"&location="+loc+"&details="+details,"_blank");
}

// ------------------------------------------------
// DASHBOARD
// ------------------------------------------------
function pgDashboard() {
  var tot=ev.length,conf=0,ass=0,acP=0,mBat=0,mAbx=0,tC=0,tR=0,tCusto=0,vagas=0;
  for(var i=0;i<ev.length;i++){
    var e=ev[i];
    if(e.status==="Confirmado") conf++;
    if(e.status==="Contrato assinado") ass++;
    if(calcAcao(e.status)==="Entrar em contato") acP++;
    var m=calcMeta(e.tipo),r=calcRes(e.tipo,e.qtdVendida,m);
    if(r==="Meta batida") mBat++;
    if(r==="Abaixo da meta") mAbx++;
    tC+=parseFloat(e.valorContrato)||0;
    tR+=parseFloat(e.entrada)||0;
    var c=e.custos||{};
    tCusto+=(parseFloat(c.viagem)||0)+(parseFloat(c.imersao)||0)+(parseFloat(c.espaco)||0)+(parseFloat(c.outros)||0);
    (c.extras||[]).forEach(function(x){tCusto+=parseFloat(x.valor)||0;});
    if(e.vagasReservadas) vagas++;
  }
  var laU=leads.filter(function(l){return["Fechado - Virou Evento","Perdido"].indexOf(l.status)===-1;}).length;
  var byS=SFUNIL.map(function(s){return{s:s,n:ev.filter(function(e){return e.status===s;}).length};}).filter(function(x){return x.n>0;});
  var maxN=Math.max.apply(null,byS.map(function(x){return x.n;}).concat([1]));
  var urgEv=[];
  for(var i=0;i<ev.length;i++){var d=diff(ev[i].prazoAcao);if(d!==null&&d<=3&&["Evento concluido","Contrato assinado"].indexOf(ev[i].status)===-1) urgEv.push(ev[i]);}
  urgEv.sort(function(a,b){return(diff(a.prazoAcao)||99)-(diff(b.prazoAcao)||99);});
  urgEv=urgEv.slice(0,4);

  var h='<div class="kgrid">';
  [[tot,"Total Eventos","#2563EB"],[conf,"Confirmados","#059669"],[ass,"Ct. Assinados","#059669"],[acP,"Acao Pendente","#DC2626"],[mBat,"Metas Batidas","#059669"],[vagas,"Vagas Reserv.",vagas>0?"#D97706":"#9CA3AF"],[laU,"Leads Ativos","#7C3AED"],[par.length,"Parceiros","#6B7280"]].forEach(function(x){
    h+='<div class="kc"><div class="kc-l">'+x[1]+'</div><div class="kc-v" style="color:'+x[2]+'">'+x[0]+"</div></div>";
  });
  h+='</div><div class="kgrid">';
  h+='<div class="kc"><div class="kc-l">Total Contratos</div><div class="kc-v" style="color:#2563EB;font-size:15px">'+fmt(tC)+"</div></div>";
  h+='<div class="kc"><div class="kc-l">Recebido</div><div class="kc-v" style="color:#059669;font-size:15px">'+fmt(tR)+"</div></div>";
  h+='<div class="kc"><div class="kc-l">A Receber</div><div class="kc-v" style="color:#D97706;font-size:15px">'+fmt(tC-tR)+"</div></div>";
  h+='<div class="kc"><div class="kc-l">Custo Total</div><div class="kc-v" style="color:#DC2626;font-size:15px">'+fmt(tCusto)+"</div></div>";
  h+='</div><div style="display:grid;grid-template-columns:1.4fr 1fr;gap:13px;margin-bottom:12px">';
  h+='<div class="card"><div class="card-h"><span class="card-t">Funil Comercial</span></div><div class="card-b" style="padding:8px 14px">';
  byS.forEach(function(x){var c=SC[x.s]||["#F3F4F6","#6B7280"];h+='<div style="display:flex;align-items:center;gap:7px;margin-bottom:5px"><span style="font-size:10px;width:155px;flex-shrink:0">'+esc(x.s)+'</span><div style="flex:1;background:#F3F4F6;border-radius:3px;height:17px;overflow:hidden"><div style="width:'+Math.round(x.n/maxN*100)+'%;height:100%;background:'+c[0]+';border-left:3px solid '+c[1]+'"></div></div><span style="font-size:11px;font-weight:700;width:18px;text-align:right;color:'+c[1]+'">'+x.n+"</span></div>";});
  h+='</div></div>';
  h+='<div class="card"><div class="card-h"><span class="card-t" style="color:'+(urgEv.some(function(e){return diff(e.prazoAcao)<0;})?"#DC2626":"#0C1C36")+'">Acoes Urgentes</span></div><div class="card-b" style="padding:6px 12px">';
  if(!urgEv.length){h+='<p style="color:#9CA3AF;font-size:11px;padding:8px 0">Tudo em dia</p>';}
  urgEv.forEach(function(e){var d=diff(e.prazoAcao);h+='<div style="margin-bottom:6px;padding:7px 9px;border-radius:6px;background:'+(d<0?"#FEF2F2":d===0?"#FFFBEB":"#F0FDF4")+';border-left:3px solid '+(d<0?"#DC2626":d===0?"#D97706":"#059669")+'"><div style="display:flex;justify-content:space-between"><span style="font-size:11px;font-weight:600">'+esc(e.empresa)+'</span><span style="font-size:9px;font-weight:700;color:'+(d<0?"#DC2626":d===0?"#D97706":"#059669")+'">'+(d<0?Math.abs(d)+"d venc.":d===0?"hoje":d+"d")+'</span></div><p style="font-size:10px;color:#6B7280;margin-top:1px">'+esc(e.proximaAcao||"---")+"</p></div>";});
  h+='</div></div></div>';
  if(vagas>0){
    h+='<div class="card" style="border-color:#FDE68A"><div class="card-h" style="background:#FFFBEB"><span class="card-t" style="color:#92400E">Vagas Reservadas - Aguardando Fechamento</span></div><div class="tw-wrap"><div class="tw"><table><thead><tr><th>Empresa</th><th>Data</th><th>Valor</th><th>Fechamento</th><th>Status Contrato</th></tr></thead><tbody>';
    ev.filter(function(e){return e.vagasReservadas;}).forEach(function(e){h+='<tr><td style="font-weight:600">'+esc(e.empresa)+'</td><td>'+fD(e.data)+'</td><td style="color:#2563EB;font-weight:600">'+fmt(e.valorContrato)+'</td><td>'+esc(e.fechamentoCom)+'</td><td>'+esc(e.statusContrato)+'</td></tr>';});
    h+='</tbody></table></div></div></div>';
  }
  return h;
}

// ------------------------------------------------
// LEADS
// ------------------------------------------------
function pgLeads() {
  var h='<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;flex-wrap:wrap;gap:8px">';
  h+='<div class="chips" style="margin-bottom:0"><button class="chip'+(leadKanban?" on":"")+"\\" onclick=\\"setLeadKanban(true)\\">Kanban</button><button class=\\"chip"+(!leadKanban?" on":"")+"\\" onclick=\\"setLeadKanban(false)\\">Lista</button></div>";
  if(canEdit()) h+='<button class="btn bp" onclick="abrirLead(null)">+ Novo Lead</button>';
  h+='</div>';
  h+=leadKanban?renderLeadKanban():renderLeadLista();
  return h;
}
function renderLeadKanban() {
  var h='<div class="kanban">';
  LEAD_STATUS.forEach(function(col){
    var items=leads.filter(function(l){return l.status===col;});
    var c=LEAD_SC[col]||["#F3F4F6","#9CA3AF"];
    h+='<div class="kb-col"><div class="kb-head" style="background:'+c[0]+';color:'+c[1]+'">'+esc(col)+'<span style="background:'+c[1]+';color:'+c[0]+';border-radius:8px;font-size:9px;padding:1px 5px">'+items.length+'</span></div><div class="kb-body">';
    items.forEach(function(l){
      var d=diff(l.prazoAcao),urg=d!==null&&d<0;
      h+='<div class="kb-card" style="border-left-color:'+(urg?"#DC2626":c[1])+'" onclick="abrirLead(\\''+l.id+'\\')">';
      h+='<div style="font-size:12px;font-weight:700;margin-bottom:2px">'+esc(l.nome)+'</div>';
      h+='<div style="font-size:10px;color:#6B7280;margin-bottom:5px">'+esc(l.empresa)+' - '+esc(l.cidade)+'</div>';
      h+=pBdg(l.prioridade);
      if(l.proximaAcao) h+='<div style="margin-top:5px;font-size:10px;color:#6B7280;background:#F9FAFB;border-radius:4px;padding:3px 7px">-> '+esc(l.proximaAcao)+'</div>';
      if(d!==null) h+='<div style="margin-top:4px;font-size:10px;font-weight:700;color:'+(urg?"#DC2626":d===0?"#D97706":"#059669")+'">'+(urg?"!! "+Math.abs(d)+"d vencido":d===0?"Hoje":d+"d")+'</div>';
      if(canEdit()) {
        h+='<div style="display:flex;gap:4px;margin-top:7px">';
        var idx=LEAD_STATUS.indexOf(col);
        if(idx<LEAD_STATUS.length-2) h+='<button class="btn bp" style="font-size:10px;padding:3px 7px" onclick="event.stopPropagation();moverLead(\\''+l.id+'\\')">Avan&ccedil;ar</button>';
        if(col!=="Fechado - Virou Evento"&&col!=="Perdido") h+='<button class="btn bs" style="font-size:10px;padding:3px 7px" onclick="event.stopPropagation();virarEvento(\\''+l.id+'\\')">Evento</button>';
        h+='</div>';
      }
      h+='</div>';
    });
    if(canEdit()) h+='<button class="btn bs" style="width:100%;justify-content:center;font-size:11px;margin-top:3px" onclick="abrirLead(null,\\''+col+'\\')">+ Adicionar</button>';
    h+='</div></div>';
  });
  return h+'</div>';
}
function renderLeadLista() {
  var h='<div class="tw-wrap"><div class="tw"><table><thead><tr><th>Nome</th><th>Empresa</th><th>Cidade</th><th>Status</th><th>Prior.</th><th>Prazo</th><th></th></tr></thead><tbody>';
  if(!leads.length) h+='<tr><td colspan="7" style="text-align:center;padding:32px;color:#9CA3AF">Nenhum lead.</td></tr>';
  leads.forEach(function(l){
    var d=diff(l.prazoAcao),c=LEAD_SC[l.status]||["#F3F4F6","#9CA3AF"];
    h+='<tr><td style="font-weight:600">'+esc(l.nome)+'<div style="font-size:10px;color:#9CA3AF">'+esc(l.contato)+'</div></td><td>'+esc(l.empresa)+'</td><td>'+esc(l.cidade)+'</td>';
    h+='<td><span class="bdg" style="background:'+c[0]+';color:'+c[1]+'">'+esc(l.status)+'</span></td><td>'+pBdg(l.prioridade)+'</td>';
    h+='<td style="font-size:11px;font-weight:600;color:'+(d===null?"#9CA3AF":d<0?"#DC2626":d===0?"#D97706":"#374151")+'">'+(l.prazoAcao?(d<0?"!! "+Math.abs(d)+"d":d===0?"Hoje":fD(l.prazoAcao)):"---")+'</td>';
    h+='<td><div style="display:flex;gap:3px">';
    if(canEdit()&&l.status!=="Fechado - Virou Evento") h+='<button class="btn bp" style="font-size:10px;padding:3px 8px" onclick="virarEvento(\\''+l.id+'\\')">Evento</button>';
    if(canEdit()) h+='<button class="bi" onclick="abrirLead(\\''+l.id+'\\')">✎</button>';
    h+='</div></td></tr>';
  });
  return h+'</tbody></table></div></div>';
}
function moverLead(lid) {
  var l=null; for(var i=0;i<leads.length;i++) if(leads[i].id===lid){l=leads[i];break;}
  if(!l) return;
  var idx=LEAD_STATUS.indexOf(l.status);
  var next=LEAD_STATUS[Math.min(idx+1,LEAD_STATUS.length-1)];
  if(next===l.status) return;
  l.audit=(l.audit||[]).concat([{ts:nowStr(),campo:"Status",de:l.status,para:next}]);
  l.status=next;
  if(l.status==="Fechado - Virou Evento") criarEventoDoLead(l);
  else renderPage();
}
function virarEvento(lid) {
  var l=null; for(var i=0;i<leads.length;i++) if(leads[i].id===lid){l=leads[i];break;}
  if(!l) return;
  var old=l.status; l.status="Fechado - Virou Evento";
  l.audit=(l.audit||[]).concat([{ts:nowStr(),campo:"Status",de:old,para:"Fechado - Virou Evento"}]);
  criarEventoDoLead(l);
}
function criarEventoDoLead(l) {
  var novoEv={id:uid(),data:"",tipo:l.tipo||"",qtdVendida:"",cidade:l.cidade||"",empresa:l.empresa||"",responsavel:l.nome||"",funcao:"",contato:l.contato||"",status:"Contato Inicial",prioridade:l.prioridade||"Media",ultimoContato:today(),proximaAcao:"Agendar data do evento",prazoAcao:"",obs:l.interesse||"",linkRelacionado:"",valorContrato:"",entrada:"",statusContrato:"",fechamentoCom:"",vagasReservadas:false,
    fu:[{id:uid(),data:today(),tipo:"Conversao de Lead",contato:l.nome,resumo:"Lead convertido em evento. Empresa: "+l.empresa+". Interesse: "+(l.interesse||"---"),status:"Realizado",prox:"Agendar data do evento",prazo:""}],
    custos:{viagem:"",imersao:"",espaco:"",outros:"",extras:[]},obs_c:"",link_c:"",
    ck:{items:[{nome:"Som e Imagem",status:"Pendente",tipo:""},{nome:"Receptivo",status:"Pendente",tipo:""}],uber:"",hosp:"",alim:"",obs:""},
    audit:[{ts:nowStr(),campo:"Criacao",de:"---",para:"Criado do lead: "+l.nome+" ("+l.empresa+")"}]};
  ev.push(novoEv);
  tab="eventos"; renderAll();
  setTimeout(function(){showToast("Evento criado para "+l.empresa+"! Complete os dados.",4000);abrirEv(novoEv.id);},120);
}
function delLead(id){leads=leads.filter(function(l){return l.id!==id;});renderAll();}
function abrirLead(lid, preStatus) {
  var l=null; for(var i=0;i<leads.length;i++) if(leads[i].id===lid){l=leads[i];break;}
  var d=l||{id:uid(),nome:"",empresa:"",cidade:"",contato:"",tipo:"",interesse:"",status:preStatus||"Novo Lead",prioridade:"Media",proximaAcao:"",prazoAcao:"",obs:"",criadoEm:today(),audit:[]};
  document.getElementById("modalTitle").textContent=l?"Editar Lead":"Novo Lead";
  document.getElementById("modalBox").style.maxWidth="560px";
  var h='<div style="display:flex;flex-direction:column;gap:11px">';
  h+=sdiv("Dados do Lead");
  h+='<div class="g2">'+inpF("Nome","ld_nome",d.nome)+inpF("Empresa","ld_emp",d.empresa)+'</div>';
  h+='<div class="g3">'+inpF("Cidade","ld_cid",d.cidade)+inpF("Contato","ld_cont",d.contato)+selF("Tipo","ld_tipo",d.tipo,TIPOS)+'</div>';
  h+=taF("Interesse / Observacoes","ld_int",d.interesse||d.obs,3);
  h+=sdiv("Status");
  h+='<div class="g3">'+selF("Status","ld_st",d.status,LEAD_STATUS)+selF("Prioridade","ld_pr",d.prioridade,PRIOR)+inpF("Prazo Prox. Acao","ld_pa",d.prazoAcao,"date")+'</div>';
  h+=inpF("Proxima Acao","ld_pxa",d.proximaAcao);
  if(l&&(l.audit||[]).length){
    h+=sdiv("Historico");
    h+='<div style="background:#F9FAFB;border-radius:7px;padding:9px;max-height:100px;overflow-y:auto">';
    var au=[].concat(l.audit||[]).reverse();
    au.forEach(function(a){h+='<div class="audit-item"><span style="color:#6B7280;white-space:nowrap;min-width:130px">'+a.ts+'</span><span><b>'+a.campo+':</b> '+esc(a.de)+' > <b>'+esc(a.para)+'</b></span></div>';});
    h+='</div>';
  }
  h+='<div style="display:flex;gap:7px;justify-content:flex-end;padding-top:8px;border-top:1px solid #F3F4F6">';
  if(l&&l.status!=="Fechado - Virou Evento") h+='<button class="btn bs" onclick="closeModal();virarEvento(\\''+d.id+'\\')">Virar Evento</button>';
  h+='<button class="btn bs" onclick="closeModal()">Cancelar</button>';
  h+='<button class="btn bp" onclick="salvarLead(\\''+d.id+'\\','+(!l)+')">Salvar</button>';
  h+='</div></div>';
  document.getElementById("modalBody").innerHTML=h;
  openModal();
}
function salvarLead(lid,isNew){
  var old=null; for(var i=0;i<leads.length;i++) if(leads[i].id===lid){old=leads[i];break;}
  var nst=gv("ld_st");
  var audit=(old&&old.status!==nst)?(old.audit||[]).concat([{ts:nowStr(),campo:"Status",de:old.status,para:nst}]):(old&&old.audit||[]);
  var l={id:lid,nome:gv("ld_nome"),empresa:gv("ld_emp"),cidade:gv("ld_cid"),contato:gv("ld_cont"),tipo:gv("ld_tipo"),interesse:gv("ld_int"),status:nst,prioridade:gv("ld_pr"),proximaAcao:gv("ld_pxa"),prazoAcao:gv("ld_pa"),obs:"",criadoEm:isNew?today():(old&&old.criadoEm||today()),audit:audit};
  if(isNew) leads.push(l); else for(var i=0;i<leads.length;i++) if(leads[i].id===lid){leads[i]=l;break;}
  closeModal(); renderAll();
}

// ------------------------------------------------
// FOLLOW-UP
// ------------------------------------------------
function pgFollowup() {
  var ativ=ev.filter(function(e){return e.status!=="Evento concluido";});
  var urgC=ativ.filter(function(e){return urgCls(e.prazoAcao)==="fu-urg";}).length;
  var hojC=ativ.filter(function(e){return urgCls(e.prazoAcao)==="fu-hoj";}).length;
  var fil=ativ.filter(function(e){
    if(fuF==="urg") return urgCls(e.prazoAcao)==="fu-urg";
    if(fuF==="hoj") return urgCls(e.prazoAcao)==="fu-hoj";
    if(fuF==="prx") return ["fu-urg","fu-hoj","fu-ok"].indexOf(urgCls(e.prazoAcao))!==-1;
    return true;
  }).sort(function(a,b){return(diff(a.prazoAcao)||999)-(diff(b.prazoAcao)||999);});
  var h='<div class="chips">';
  [["todos","Todos"],["urg",urgC>0?"Vencidos ("+urgC+")":"Vencidos"],["hoj",hojC>0?"Hoje ("+hojC+")":"Hoje"],["prx","Proximos 3d"]].forEach(function(x){
    h+='<button class="chip'+(fuF===x[0]?" on":"")+'" onclick="setFuF(\\''+x[0]+'\\')">'+x[1]+'</button>';
  });
  h+='</div>';
  if(urgC>0) h+='<div class="alert al-r">!! '+urgC+' acao'+(urgC>1?"oes":"")+" vencida"+(urgC>1?"s":"")+" - entre em contato agora.</div>";
  if(hojC>0) h+='<div class="alert al-a">Hoje: '+hojC+' acao'+(hojC>1?"oes":"")+" com prazo hoje.</div>";
  h+='<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:9px">';
  fil.forEach(function(e){
    var u=urgCls(e.prazoAcao),d=diff(e.prazoAcao);
    var last=(e.fu||[]).slice(-1)[0];
    h+='<div class="fc '+u+'" onclick="openFuModal(\\''+e.id+'\\')">';
    h+='<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:7px"><div><div style="font-size:12px;font-weight:700">'+esc(e.empresa)+'</div><div style="font-size:10px;color:#6B7280;margin-top:1px">'+esc(e.cidade)+' - '+esc(e.tipo)+'</div></div>';
    h+='<div style="display:flex;flex-direction:column;align-items:flex-end;gap:3px">'+sBdg(e.status)+pBdg(e.prioridade)+'</div></div>';
    if(e.proximaAcao) h+='<div style="background:#F9FAFB;border-radius:5px;padding:5px 8px;margin-bottom:7px;border:1px solid #F3F4F6"><div style="font-size:9px;font-weight:700;color:#9CA3AF;text-transform:uppercase;letter-spacing:.4px;margin-bottom:1px">Proxima Acao</div><div style="font-size:11px;font-weight:600">'+esc(e.proximaAcao)+'</div></div>';
    h+='<div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:10px;font-weight:700;color:'+(u==="fu-urg"?"#DC2626":u==="fu-hoj"?"#D97706":u==="fu-ok"?"#059669":"#9CA3AF")+'">'+(e.prazoAcao?(d<0?"!! "+Math.abs(d)+"d venc.":d===0?"Hoje":d===1?"Amanha":d+"d"):"Sem prazo")+'</span>';
    h+='<button class="btn bp" style="font-size:10px;padding:4px 9px" onclick="event.stopPropagation();openFuModal(\\''+e.id+'\\')">+ Follow-up</button></div>';
    if(last) h+='<div style="margin-top:7px;padding-top:6px;border-top:1px solid #F3F4F6;font-size:10px;color:#9CA3AF"><b>Ultimo:</b> '+fD(last.data)+' - '+esc(last.tipo)+' - '+esc((last.resumo||"").slice(0,55))+'</div>';
    h+='</div>';
  });
  if(!fil.length) h+='<div style="grid-column:1/-1;padding:36px;text-align:center;color:#9CA3AF">Nenhum evento para este filtro.</div>';
  return h+'</div>';
}
function openFuModal(eid) {
  var e=null; for(var i=0;i<ev.length;i++) if(ev[i].id===eid){e=ev[i];break;}
  if(!e) return;
  var rest=(parseFloat(e.valorContrato)||0)-(parseFloat(e.entrada)||0);
  var fuSts={"Realizado":["#D1FAE5","#065F46"],"Aguardando resposta":["#FEF3C7","#92400E"],"Sem resposta":["#FEE2E2","#991B1B"]};
  var hist=[].concat(e.fu||[]).reverse();
  document.getElementById("modalTitle").textContent="Follow-up - "+e.empresa;
  document.getElementById("modalBox").style.maxWidth="860px";
  var h='<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">';
  h+='<div><div style="background:#F9FAFB;border-radius:8px;border:1px solid #E5E7EB;padding:12px;margin-bottom:12px">';
  [["Data",fD(e.data)],["Cidade",e.cidade],["Tipo",e.tipo],["Empresa",e.empresa],["Responsavel",e.responsavel],["Contato",e.contato],["Contrato",fmt(e.valorContrato)],["Entrada",fmt(e.entrada)],["Restante",fmt(rest)]].forEach(function(x){
    h+='<div class="drow"><span class="dk">'+x[0]+'</span><span class="dv">'+esc(x[1])+'</span></div>';
  });
  h+=fbar(e.status)+'</div>';
  h+='<div style="font-size:11px;font-weight:700;color:#0C1C36;margin-bottom:9px">Historico ('+hist.length+')</div>';
  if(!hist.length) h+='<p style="font-size:11px;color:#9CA3AF;font-style:italic">Nenhum follow-up.</p>';
  hist.forEach(function(f,i){
    h+='<div class="tl"><div style="display:flex;flex-direction:column;align-items:center"><div class="tl-dot"></div>'+(i<hist.length-1?'<div class="tl-line"></div>':'')+'</div>';
    h+='<div style="flex:1;padding-bottom:'+(i<hist.length-1?10:0)+'px"><div style="display:flex;justify-content:space-between;margin-bottom:2px"><span style="font-size:11px;font-weight:700">'+esc(f.tipo)+'</span><span style="font-size:9px;color:#9CA3AF">'+fD(f.data)+'</span></div>';
    if(f.contato) h+='<span style="font-size:9px;color:#9CA3AF">com '+esc(f.contato)+' - </span>';
    h+=bdg(f.status,fuSts);
    if(f.resumo) h+='<p style="font-size:11px;margin:3px 0">'+esc(f.resumo)+'</p>';
    if(f.prox) h+='<div style="padding:3px 7px;background:#EFF6FF;border-radius:5px;font-size:10px;color:#2563EB;font-weight:600">-> '+esc(f.prox)+(f.prazo?" ate "+fD(f.prazo):"")+'</div>';
    h+='</div></div>';
  });
  h+='</div><div>';
  h+='<div style="font-size:11px;font-weight:700;color:#0C1C36;margin-bottom:10px">Novo Follow-up</div>';
  h+='<div style="display:flex;flex-direction:column;gap:9px">';
  h+='<div class="g3">'+inpF("Data","fu_d",today(),"date")+selF("Tipo","fu_t","WhatsApp",FTIPOS)+inpF("Com quem","fu_c",e.responsavel)+'</div>';
  h+=taF("Resumo do contato","fu_r","",3);
  h+='<div class="g2">'+inpF("Proxima Acao","fu_pa","")+inpF("Prazo","fu_pp","","date")+'</div>';
  h+=selF("Status","fu_s","Realizado",["Realizado","Aguardando resposta","Sem resposta"]);
  h+='<div style="display:flex;gap:7px;justify-content:flex-end;padding-top:7px;border-top:1px solid #F3F4F6">';
  h+='<button class="btn bs" onclick="closeModal()">Cancelar</button>';
  h+='<button class="btn bp" onclick="salvarFU(\\''+e.id+'\\')">Registrar</button>';
  h+='</div></div></div></div>';
  document.getElementById("modalBody").innerHTML=h;
  openModal();
}
function salvarFU(eid){
  var fu={id:uid(),data:gv("fu_d"),tipo:gv("fu_t"),contato:gv("fu_c"),resumo:gv("fu_r"),prox:gv("fu_pa"),prazo:gv("fu_pp"),status:gv("fu_s")};
  for(var i=0;i<ev.length;i++){
    if(ev[i].id===eid){
      ev[i].fu=(ev[i].fu||[]).concat([fu]);
      ev[i].ultimoContato=fu.data;
      if(fu.prox) ev[i].proximaAcao=fu.prox;
      if(fu.prazo) ev[i].prazoAcao=fu.prazo;
      break;
    }
  }
  closeModal(); renderAll();
}

// ------------------------------------------------
// EVENTOS
// ------------------------------------------------
function pgEventos() {
  var cids=[];
  ev.forEach(function(e){if(e.cidade&&cids.indexOf(e.cidade)===-1) cids.push(e.cidade);});
  var fil=ev.filter(function(e){
    if(evF.s&&e.status!==evF.s) return false;
    if(evF.t&&e.tipo!==evF.t) return false;
    if(evF.c&&e.cidade!==evF.c) return false;
    if(evF.q){var q=evF.q.toLowerCase();return(e.empresa||"").toLowerCase().indexOf(q)!==-1||(e.cidade||"").toLowerCase().indexOf(q)!==-1||(e.responsavel||"").toLowerCase().indexOf(q)!==-1;}
    return true;
  }).sort(function(a,b){return(a.data||"").localeCompare(b.data||"");});
  var h='<div class="filter-row">';
  h+='<input class="inp" placeholder="Buscar..." value="'+esc(evF.q)+'" oninput="evF.q=this.value;renderPage()" style="flex:1;min-width:160px">';
  h+='<select class="inp" style="width:auto" onchange="evF.s=this.value;renderPage()"><option value="">Todos status</option>'+SFUNIL.map(function(s){return'<option'+(evF.s===s?" selected":"")+'>'+esc(s)+'</option>';}).join("")+'</select>';
  h+='<select class="inp" style="width:auto" onchange="evF.t=this.value;renderPage()"><option value="">Todos tipos</option>'+TIPOS.map(function(t){return'<option'+(evF.t===t?" selected":"")+'>'+esc(t)+'</option>';}).join("")+'</select>';
  h+='<select class="inp" style="width:auto" onchange="evF.c=this.value;renderPage()"><option value="">Todas cidades</option>'+cids.map(function(c){return'<option'+(evF.c===c?" selected":"")+'>'+esc(c)+'</option>';}).join("")+'</select>';
  if(canEdit()) h+='<button class="btn bp" onclick="abrirEv(null)">+ Novo Evento</button>';
  h+='</div><div class="tw-wrap"><div class="tw"><table><thead><tr><th>Data</th><th>Trava</th><th>Empresa</th><th>Cidade</th><th>Tipo</th><th>Status</th><th>Acao</th><th>Prior.</th><th>Result.</th><th>Contrato</th><th>Prazo</th><th>CK</th><th></th></tr></thead><tbody>';
  if(!fil.length) h+='<tr><td colspan="13" style="text-align:center;padding:32px;color:#9CA3AF">Nenhum evento.</td></tr>';
  fil.forEach(function(e){
    var meta=calcMeta(e.tipo),res=calcRes(e.tipo,e.qtdVendida,meta),acao=calcAcao(e.status),trava=calcTrava(e.data);
    var d=diff(e.prazoAcao),isW=d!==null&&d<0&&["Evento concluido","Contrato assinado"].indexOf(e.status)===-1;
    var rest=(parseFloat(e.valorContrato)||0)-(parseFloat(e.entrada)||0);
    var ckItems=e.ck&&e.ck.items||[];
    var ckPend=ckItems.some(function(x){return x.status==="Pendente"||x.status==="Em andamento";});
    var conflicts=checkConflicts(e.data,e.id);
    h+='<tr style="'+(isW?"background:#FFF8F8":"")+'"><td style="white-space:nowrap;font-weight:600;font-size:11px">'+fD(e.data)+(conflicts.length?'<span class="conf-bdg" onclick="alert(\\'Conflito com: '+conflicts.map(function(c){return esc(c.empresa);}).join(", ")+'\\')">!! conflito</span>':'')+'</td>';
    h+='<td style="font-size:10px;color:#9CA3AF;white-space:nowrap">'+esc(trava)+'</td>';
    h+='<td><div style="font-weight:600;font-size:12px">'+esc(e.empresa)+'</div><div style="font-size:10px;color:#9CA3AF">'+esc(e.responsavel)+'</div></td>';
    h+='<td>'+esc(e.cidade)+'</td><td><span class="bdg" style="background:#EFF6FF;color:#2563EB">'+esc(e.tipo)+'</span></td>';
    h+='<td>'+sBdg(e.status)+fbar(e.status,70)+'</td>';
    h+='<td>'+bdg(acao,{"Entrar em contato":["#FEE2E2","#991B1B"],"Acompanhar / OK":["#D1FAE5","#065F46"]})+'</td>';
    h+='<td>'+pBdg(e.prioridade)+'</td>';
    h+='<td>'+(res?bdg(res,{"Meta batida":["#D1FAE5","#065F46"],"Abaixo da meta":["#FEE2E2","#991B1B"],"Nao se aplica":["#F3F4F6","#9CA3AF"]}):"")+'</td>';
    h+='<td style="font-size:11px"><div style="color:#2563EB;font-weight:600">'+fmt(e.valorContrato)+'</div><div style="font-size:10px;color:'+(rest>0?"#D97706":"#059669")+'">Rest: '+fmt(rest)+'</div></td>';
    h+='<td style="font-size:11px;font-weight:600;color:'+(d===null?"#9CA3AF":d<0?"#DC2626":d===0?"#D97706":"#374151")+'">'+(e.prazoAcao?(d<0?"!! "+Math.abs(d)+"d":d===0?"Hoje":fD(e.prazoAcao)):"---")+'</td>';
    h+='<td>'+bdg(ckPend?"Pendente":"OK",{"Pendente":["#FEE2E2","#991B1B"],"OK":["#D1FAE5","#065F46"]})+'</td>';
    h+='<td><div style="display:flex;gap:3px"><button class="bi" onclick="abrirDetalhe(\\''+e.id+'\\')" title="Ver detalhes">👁</button>';
    if(canEdit()) h+='<button class="bi" onclick="abrirEv(\\''+e.id+'\\')">✎</button><button class="bi" style="color:#DC2626;border-color:#FCA5A5" onclick="delEv(\\''+e.id+'\\')">🗑</button>';
    h+='</div></td></tr>';
  });
  h+='</tbody></table></div></div>';
  return h;
}
function delEv(id){if(confirm("Remover este evento?")){ev=ev.filter(function(e){return e.id!==id;});renderAll();}}

function abrirDetalhe(eid) {
  var e=null; for(var i=0;i<ev.length;i++) if(ev[i].id===eid){e=ev[i];break;}
  if(!e) return;
  var rest=(parseFloat(e.valorContrato)||0)-(parseFloat(e.entrada)||0);
  var c=e.custos||{};
  var tot=(parseFloat(c.viagem)||0)+(parseFloat(c.imersao)||0)+(parseFloat(c.espaco)||0)+(parseFloat(c.outros)||0);
  (c.extras||[]).forEach(function(x){tot+=parseFloat(x.valor)||0;});
  var fuSts={"Realizado":["#D1FAE5","#065F46"],"Aguardando resposta":["#FEF3C7","#92400E"],"Sem resposta":["#FEE2E2","#991B1B"]};
  var hist=[].concat(e.fu||[]).reverse();
  var ckItems=e.ck&&e.ck.items||[];
  var conflicts=checkConflicts(e.data,e.id);
  document.getElementById("modalTitle").textContent="Detalhes - "+e.empresa;
  document.getElementById("modalBox").style.maxWidth="800px";
  var h='<div class="tab-bar">'+["Visao Geral","Checklist","Follow-ups ("+hist.length+")","Custos","Auditoria ("+((e.audit||[]).length)+")"].map(function(l,i){return'<button class="tab-btn'+(i===0?" on":"")+'" id="dt'+i+'" onclick="showDT('+i+')">'+l+'</button>';}).join("")+'</div>';
  if(conflicts.length) h+='<div class="alert al-a">!! Esta data conflita com: '+conflicts.map(function(c){return'<b>'+esc(c.empresa)+'</b> ('+fD(c.data)+')';}).join(", ")+'. Verifique a agenda antes de confirmar.</div>';
  // Tab 0
  h+='<div id="dtp0"><div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">';
  h+='<div>'+sdiv("Dados");
  [["Data",fD(e.data)],["Trava",calcTrava(e.data)],["Tipo",e.tipo],["Cidade",e.cidade],["Empresa",e.empresa],["Responsavel",e.responsavel+" - "+e.funcao],["Contato",e.contato]].forEach(function(x){h+='<div class="drow"><span class="dk">'+x[0]+'</span><span class="dv">'+esc(x[1])+'</span></div>';});
  h+='</div><div>'+sdiv("Contrato");
  [["Valor",fmt(e.valorContrato)],["Entrada",fmt(e.entrada)],["Restante",fmt(rest)],["Status Contrato",e.statusContrato||"---"],["Fechamento",e.fechamentoCom||"---"],["Vagas Reservadas",e.vagasReservadas?"Sim":"Nao"]].forEach(function(x){h+='<div class="drow"><span class="dk">'+x[0]+'</span><span class="dv">'+esc(x[1])+'</span></div>';});
  h+=sdiv("Status")+sBdg(e.status)+" "+pBdg(e.prioridade)+fbar(e.status);
  [["Acao Nec.",calcAcao(e.status)],["Proxima Acao",e.proximaAcao||"---"],["Prazo",fD(e.prazoAcao)]].forEach(function(x){h+='<div class="drow"><span class="dk">'+x[0]+'</span><span class="dv">'+esc(x[1])+'</span></div>';});
  h+='</div></div></div>';
  // Tab 1 CK
  h+='<div id="dtp1" style="display:none"><div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">';
  h+='<div><div style="font-size:9px;font-weight:700;color:#9CA3AF;text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px">Itens</div>';
  if(!ckItems.length) h+='<p style="font-size:11px;color:#9CA3AF;font-style:italic">Sem itens</p>';
  ckItems.forEach(function(it){var cc=CKC[it.status]||["#F3F4F6","#9CA3AF"];h+='<div class="ck-row" style="background:'+cc[0]+'22"><div><div style="font-size:11px;font-weight:600">'+esc(it.nome)+'</div>'+(it.tipo?'<div style="font-size:9px;color:#9CA3AF">'+esc(it.tipo)+'</div>':'')+'</div><span class="bdg" style="background:'+cc[0]+';color:'+cc[1]+'">'+esc(it.status)+'</span></div>';});
  h+='</div><div><div style="font-size:9px;font-weight:700;color:#9CA3AF;text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px">Despesas</div>';
  [["Uber",e.ck&&e.ck.uber,DC],["Hospedagem",e.ck&&e.ck.hosp,DC],["Alimentacao",e.ck&&e.ck.alim,DC]].filter(function(x){return x[1];}).forEach(function(x){var cc=x[2][x[1]]||["#F3F4F6","#9CA3AF"];h+='<div class="ck-row" style="background:'+cc[0]+'22"><div style="font-size:11px;font-weight:600">'+x[0]+'</div><span class="bdg" style="background:'+cc[0]+';color:'+cc[1]+'">'+esc(x[1])+'</span></div>';});
  h+='</div></div></div>';
  // Tab 2 FU
  h+='<div id="dtp2" style="display:none">';
  if(!hist.length) h+='<p style="font-size:11px;color:#9CA3AF;font-style:italic">Nenhum follow-up.</p>';
  hist.forEach(function(f,i){h+='<div class="tl"><div style="display:flex;flex-direction:column;align-items:center"><div class="tl-dot"></div>'+(i<hist.length-1?'<div class="tl-line"></div>':'')+'</div><div style="flex:1;padding-bottom:'+(i<hist.length-1?10:0)+'px"><div style="display:flex;justify-content:space-between;margin-bottom:2px"><span style="font-size:11px;font-weight:700">'+esc(f.tipo)+'</span><span style="font-size:9px;color:#9CA3AF">'+fD(f.data)+'</span></div>'+(f.contato?'<span style="font-size:9px;color:#9CA3AF">com '+esc(f.contato)+' - </span>':'')+bdg(f.status,fuSts)+(f.resumo?'<p style="font-size:11px;margin:3px 0">'+esc(f.resumo)+'</p>':'')+(f.prox?'<div style="padding:3px 7px;background:#EFF6FF;border-radius:5px;font-size:10px;color:#2563EB;font-weight:600">-> '+esc(f.prox)+(f.prazo?" ate "+fD(f.prazo):"")+'</div>':'')+'</div></div>';});
  h+='</div>';
  // Tab 3 Custos
  h+='<div id="dtp3" style="display:none">';
  [["Viagem",c.viagem,"#D97706"],["Imersao",c.imersao,"#7C3AED"],["Espaco",c.espaco,"#2563EB"],["Outros",c.outros,"#6B7280"]].forEach(function(x){h+='<div class="drow"><span class="dk">'+x[0]+'</span><span class="dv" style="color:'+x[2]+'">'+fmt(x[1])+'</span></div>';});
  (c.extras||[]).forEach(function(x){h+='<div class="drow"><span class="dk">+ '+esc(x.nome)+'</span><span class="dv">'+fmt(x.valor)+'</span></div>';});
  h+='<div style="padding:7px 0;display:flex;justify-content:space-between;font-weight:700;border-top:2px solid #F3F4F6;margin-top:4px"><span>Total</span><span style="color:#DC2626">'+fmt(tot)+'</span></div></div>';
  // Tab 4 Audit
  h+='<div id="dtp4" style="display:none">';
  var au=[].concat(e.audit||[]).reverse();
  if(!au.length) h+='<p style="font-size:11px;color:#9CA3AF;font-style:italic">Nenhuma alteracao registrada.</p>';
  au.forEach(function(a){h+='<div class="audit-item"><span style="color:#9CA3AF;white-space:nowrap;min-width:140px">'+a.ts+'</span><span><b>'+a.campo+':</b> '+esc(a.de)+' > <b style="color:#2563EB">'+esc(a.para)+'</b></span></div>';});
  h+='</div>';
  // Footer
  h+='<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;padding-top:10px;border-top:1px solid #F3F4F6;margin-top:10px">';
  h+='<div style="display:flex;gap:6px;flex-wrap:wrap"><a class="gcal-btn" href="#" onclick="openGcal(\\''+e.id+'\\',\\'diego\\');return false">📅 Agenda Diego</a><a class="gcal-btn" href="#" onclick="openGcal(\\''+e.id+'\\',\\'producao\\');return false">📅 Agenda Producao</a></div>';
  h+='<div style="display:flex;gap:6px"><button class="btn bs" onclick="closeModal()">Fechar</button>'+(canEdit()?'<button class="btn bp" onclick="closeModal();abrirEv(\\''+e.id+'\\')">Editar</button>':'')+'</div></div>';
  document.getElementById("modalBody").innerHTML=h;
  openModal();
}
function showDT(n){for(var i=0;i<5;i++){var b=document.getElementById("dt"+i),p=document.getElementById("dtp"+i);if(b)b.classList.toggle("on",i===n);if(p)p.style.display=i===n?"block":"none";}}

function abrirEv(eid) {
  var e=null; for(var i=0;i<ev.length;i++) if(ev[i].id===eid){e=ev[i];break;}
  var d=e||{id:uid(),data:"",tipo:"",qtdVendida:"",cidade:"",empresa:"",responsavel:"",funcao:"",contato:"",status:"Contato Inicial",prioridade:"Media",ultimoContato:"",proximaAcao:"",prazoAcao:"",obs:"",linkRelacionado:"",valorContrato:"",entrada:"",statusContrato:"",fechamentoCom:"",vagasReservadas:false,fu:[],custos:{viagem:"",imersao:"",espaco:"",outros:"",extras:[]},obs_c:"",link_c:"",ck:{items:[{nome:"Som e Imagem",status:"Pendente",tipo:""},{nome:"Receptivo",status:"Pendente",tipo:""}],uber:"",hosp:"",alim:"",obs:""},audit:[]};
  var meta=calcMeta(d.tipo),rest=(parseFloat(d.valorContrato)||0)-(parseFloat(d.entrada)||0);
  var res=calcRes(d.tipo,d.qtdVendida,meta),acao=calcAcao(d.status),trava=calcTrava(d.data);
  var limck=calcLimCK(d.tipo,d.data);
  var ck=d.ck||{},ckItems=ck.items||[],extras=(d.custos&&d.custos.extras)||[];
  document.getElementById("modalTitle").textContent=e?"Editar Evento":"Novo Evento";
  document.getElementById("modalBox").style.maxWidth="860px";
  var h='<div style="display:flex;flex-direction:column;gap:14px">';
  h+=sdiv("Dados do Evento");
  h+='<div class="g3">'+inpF("Data","ev_data",d.data,"date")+selF("Tipo","ev_tipo",d.tipo,TIPOS)+autoF("Trava (auto)",trava,"")+'</div>';
  h+='<div class="g2">'+inpF("Cidade","ev_cidade",d.cidade)+inpF("Empresa / Contratante","ev_emp",d.empresa)+'</div>';
  h+='<div id="ev_conf"></div>';
  h+='<div class="g3">'+inpF("Responsavel","ev_resp",d.responsavel)+selF("Funcao","ev_func",d.funcao,FUNCOES)+inpF("Contato","ev_cont",d.contato)+'</div>';
  if(d.tipo!=="Evento Fechado"){
    h+=sdiv("Meta e Publico");
    h+='<div class="g3">'+autoF("Meta de Publico (auto)",meta?meta+" pessoas":"---","")+inpF("Qtd. Vendida","ev_qtd",d.qtdVendida,"number")+autoF("Resultado (auto)",res||"---","")+'</div>';
  }
  h+=sdiv("Contrato e Pagamento");
  h+='<div class="g4">'+inpF("Valor Contrato (R$)","ev_vc",d.valorContrato,"number")+inpF("Entrada (R$)","ev_ent",d.entrada,"number")+autoF("Restante (auto)",fmt(rest),"")+selF("Fechamento com","ev_fch",d.fechamentoCom,["Diego","Producao"])+'</div>';
  h+='<div class="g3">'+selF("Status do Contrato","ev_sc",d.statusContrato,SCONT)+'<div class="fg"><span class="lb">Vagas Reservadas?</span><div style="display:flex;gap:16px;padding-top:7px">'+["Sim","Nao"].map(function(o){return'<label style="display:flex;gap:5px;align-items:center;font-size:12px;cursor:pointer"><input type="radio" name="ev_vag" value="'+(o==="Sim")+'"'+(d.vagasReservadas===(o==="Sim")?" checked":"")+">"+o+'</label>';}).join("")+'</div></div>'+inpF("Link","ev_link",d.linkRelacionado)+'</div>';
  h+=sdiv("Status Comercial");
  h+='<div class="g4">'+selF("Status","ev_st",d.status,SFUNIL)+selF("Prioridade","ev_pr",d.prioridade,PRIOR)+inpF("Ultimo Contato","ev_uc",d.ultimoContato,"date")+inpF("Prazo Prox. Acao","ev_pa",d.prazoAcao,"date")+'</div>';
  h+='<div class="g2">'+autoF("Acao Necessaria (auto)",acao||"---","")+" "+inpF("Proxima Acao","ev_pxa",d.proximaAcao)+'</div>';
  h+=taF("Observacoes","ev_obs",d.obs);
  h+=sdiv("Checklist Operacional");
  h+='<div style="background:#F9FAFB;border-radius:8px;border:1px solid #E5E7EB;padding:13px">';
  if(limck) h+='<div style="margin-bottom:10px;display:inline-flex;align-items:center;gap:5px;padding:4px 10px;background:#FFFBEB;border-radius:5px;font-size:10px;color:#92400E;font-weight:500;border:1px solid #FDE68A">Data limite CK: '+fD(limck)+'</div>';
  h+='<div id="ck_items_container">';
  ckItems.forEach(function(it,i){h+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr auto;gap:7px;margin-bottom:6px;align-items:center"><input class="inp" id="cki_n_'+i+'" value="'+esc(it.nome)+'" placeholder="Nome"><select class="inp" id="cki_s_'+i+'">'+CKO.map(function(o){return'<option'+(o===it.status?" selected":"")+'>'+esc(o)+'</option>';}).join("")+'</select><input class="inp" id="cki_t_'+i+'" value="'+esc(it.tipo||"")+'" placeholder="Tipo/detalhe"><button class="bi" style="color:#DC2626;border-color:#FCA5A5" onclick="this.closest(\\'div\\').remove()">x</button></div>';});
  h+='</div><button class="btn bs" style="font-size:11px;margin-top:4px" onclick="addCkItem()">+ Item</button>';
  h+='<div style="margin-top:10px;font-size:9px;font-weight:700;color:#9CA3AF;text-transform:uppercase;margin-bottom:7px">Despesas</div>';
  h+='<div class="g3">'+selF("Uber","ck_uber",ck.uber,DESPO)+selF("Hospedagem","ck_hosp",ck.hosp,DESPO)+selF("Alimentacao","ck_alim",ck.alim,DESPO)+'</div>';
  h+=taF("Obs. Checklist","ck_obs",ck.obs);
  h+='</div>';
  h+=sdiv("Custos do Evento");
  h+='<div class="g4">'+inpF("Viagem (R$)","cu_v",d.custos&&d.custos.viagem,"number")+inpF("Imersao (R$)","cu_i",d.custos&&d.custos.imersao,"number")+inpF("Espaco (R$)","cu_e",d.custos&&d.custos.espaco,"number")+inpF("Outros (R$)","cu_o",d.custos&&d.custos.outros,"number")+'</div>';
  h+='<div id="cu_extras">';
  extras.forEach(function(x,i){h+='<div style="display:grid;grid-template-columns:1fr 1fr auto;gap:8px;margin-bottom:6px;align-items:center"><input class="inp" id="cx_n_'+i+'" value="'+esc(x.nome)+'" placeholder="Nome do custo extra"><input class="inp" id="cx_v_'+i+'" type="number" value="'+(x.valor||"")+'"><button class="bi" style="color:#DC2626;border-color:#FCA5A5" onclick="this.closest(\\'div\\').remove()">x</button></div>';});
  h+='</div><button class="btn bs" style="font-size:11px" onclick="addExtra()">+ Custo extra</button>';
  h+='<div style="display:flex;gap:7px;justify-content:flex-end;padding-top:10px;border-top:1px solid #F3F4F6;margin-top:6px">';
  h+='<button class="btn bs" onclick="closeModal()">Cancelar</button>';
  h+='<button class="btn bp" onclick="salvarEv(\\''+d.id+'\\','+(!e)+')">Salvar Evento</button>';
  h+='</div></div>';
  document.getElementById("modalBody").innerHTML=h;
  openModal();
  var evDataEl=document.getElementById("ev_data");
  if(evDataEl){
    evDataEl.addEventListener("change",function(){
      var cfls=checkConflicts(this.value,d.id),w=document.getElementById("ev_conf");
      if(w) w.innerHTML=cfls.length?'<div class="alert al-a">!! Conflito! Bate com: '+cfls.map(function(c){return'<b>'+esc(c.empresa)+'</b> (trava: '+c.trava+')';}).join(", ")+'. Verifique a agenda.</div>':"";
    });
  }
}
function addCkItem(){
  var cont=document.getElementById("ck_items_container");if(!cont)return;
  var idx=cont.querySelectorAll("[id^='cki_n_']").length;
  var div=document.createElement("div");
  div.style.cssText="display:grid;grid-template-columns:1fr 1fr 1fr auto;gap:7px;margin-bottom:6px;align-items:center";
  div.innerHTML='<input class="inp" id="cki_n_'+idx+'" placeholder="Nome do item"><select class="inp" id="cki_s_'+idx+'">'+CKO.map(function(o){return'<option>'+esc(o)+'</option>';}).join("")+'</select><input class="inp" id="cki_t_'+idx+'" placeholder="Tipo/detalhe"><button class="bi" style="color:#DC2626;border-color:#FCA5A5" onclick="this.closest(\\'div\\').remove()">x</button>';
  cont.appendChild(div);
}
function addExtra(){
  var cont=document.getElementById("cu_extras");if(!cont)return;
  var idx=cont.querySelectorAll("[id^='cx_n_']").length;
  var div=document.createElement("div");
  div.style.cssText="display:grid;grid-template-columns:1fr 1fr auto;gap:8px;margin-bottom:6px;align-items:center";
  div.innerHTML='<input class="inp" id="cx_n_'+idx+'" placeholder="Nome do custo extra"><input class="inp" id="cx_v_'+idx+'" type="number"><button class="bi" style="color:#DC2626;border-color:#FCA5A5" onclick="this.closest(\\'div\\').remove()">x</button>';
  cont.appendChild(div);
}
function salvarEv(eid,isNew){
  var oldE=null; for(var i=0;i<ev.length;i++) if(ev[i].id===eid){oldE=ev[i];break;}
  var vag=document.querySelector("input[name='ev_vag']:checked");
  vag=vag?vag.value==="true":false;
  var nst=gv("ev_st"),nent=gv("ev_ent"),nvc=gv("ev_vc");
  var audit=[].concat(oldE&&oldE.audit||[]);
  if(oldE){
    if(oldE.status!==nst) audit.push({ts:nowStr(),campo:"Status",de:oldE.status,para:nst});
    if(String(oldE.entrada)!==nent&&nent) audit.push({ts:nowStr(),campo:"Entrada",de:fmt(oldE.entrada),para:fmt(nent)});
    if(String(oldE.valorContrato)!==nvc&&nvc) audit.push({ts:nowStr(),campo:"Valor Contrato",de:fmt(oldE.valorContrato),para:fmt(nvc)});
  }
  var ckCont=document.getElementById("ck_items_container"),ckItems=[];
  if(ckCont){ckCont.querySelectorAll("[id^='cki_n_']").forEach(function(el){var i=el.id.split("_").pop(),nome=el.value.trim();if(nome)ckItems.push({nome:nome,status:gv("cki_s_"+i)||"Pendente",tipo:gv("cki_t_"+i)||""}); });}
  var exCont=document.getElementById("cu_extras"),extras=[];
  if(exCont){exCont.querySelectorAll("[id^='cx_n_']").forEach(function(el){var i=el.id.split("_").pop(),nome=el.value.trim();if(nome)extras.push({nome:nome,valor:parseFloat(gv("cx_v_"+i))||0});});}
  var e={id:eid,data:gv("ev_data"),tipo:gv("ev_tipo"),qtdVendida:parseFloat(gv("ev_qtd"))||0,cidade:gv("ev_cidade"),empresa:gv("ev_emp"),responsavel:gv("ev_resp"),funcao:gv("ev_func"),contato:gv("ev_cont"),status:nst,prioridade:gv("ev_pr"),ultimoContato:gv("ev_uc"),proximaAcao:gv("ev_pxa"),prazoAcao:gv("ev_pa"),obs:gv("ev_obs"),linkRelacionado:gv("ev_link"),valorContrato:parseFloat(nvc)||0,entrada:parseFloat(nent)||0,statusContrato:gv("ev_sc"),fechamentoCom:gv("ev_fch"),vagasReservadas:vag,fu:isNew?[]:(oldE&&oldE.fu||[]),
    custos:{viagem:parseFloat(gv("cu_v"))||0,imersao:parseFloat(gv("cu_i"))||0,espaco:parseFloat(gv("cu_e"))||0,outros:parseFloat(gv("cu_o"))||0,extras:extras},
    obs_c:isNew?"":(oldE&&oldE.obs_c||""),link_c:isNew?"":(oldE&&oldE.link_c||""),
    ck:{items:ckItems,uber:gv("ck_uber"),hosp:gv("ck_hosp"),alim:gv("ck_alim"),obs:gv("ck_obs")},audit:audit};
  if(isNew) ev.push(e); else for(var i=0;i<ev.length;i++) if(ev[i].id===eid){ev[i]=e;break;}
  closeModal(); renderAll();
}

// ------------------------------------------------
// CHECKLIST
// ------------------------------------------------
function pgChecklist(){
  var evs=ev.filter(function(e){return e.data;}).sort(function(a,b){return(a.data||"").localeCompare(b.data||"");});
  if(!evs.length) return '<p style="color:#9CA3AF;text-align:center;padding:36px">Nenhum evento cadastrado.</p>';
  var h="";
  evs.forEach(function(e){
    var ck=e.ck||{},items=ck.items||[],limck=calcLimCK(e.tipo,e.data);
    var allOk=items.length>0&&items.every(function(x){return x.status==="Concluido";}),hasPend=items.some(function(x){return x.status==="Pendente";});
    var bc=hasPend?"#DC2626":allOk?"#059669":"#D97706",sck=hasPend?"Pendente":allOk?"Concluido":"Em andamento";
    var sc=hasPend?"#FEE2E2":allOk?"#D1FAE5":"#FEF3C7",cc=hasPend?"#991B1B":allOk?"#065F46":"#92400E";
    h+='<div class="card" style="border-left:3px solid '+bc+'">';
    h+='<div class="card-h"><div><span style="font-size:12px;font-weight:700">'+esc(e.empresa)+'</span><span style="font-size:10px;color:#9CA3AF;margin-left:8px">'+esc(e.cidade)+' - '+fD(e.data)+'</span><span class="bdg" style="background:#EFF6FF;color:#2563EB;margin-left:6px">'+esc(e.tipo)+'</span></div>';
    h+='<div style="display:flex;align-items:center;gap:6px"><span class="bdg" style="background:'+sc+';color:'+cc+'">'+sck+'</span>'+(canEdit()?'<button class="btn bp" style="font-size:10px;padding:3px 8px" onclick="editarChecklist(\\''+e.id+'\\')">Editar</button>':'')+'</div></div>';
    h+='<div class="card-b">';
    if(limck) h+='<div style="display:inline-flex;align-items:center;gap:5px;margin-bottom:10px;padding:4px 10px;background:#FFFBEB;border-radius:5px;font-size:10px;color:#92400E;font-weight:500;border:1px solid #FDE68A">Data limite: '+fD(limck)+'</div>';
    h+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">';
    h+='<div><div style="font-size:9px;font-weight:700;color:#9CA3AF;text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px">Itens ('+items.length+')</div>';
    if(!items.length) h+='<p style="font-size:11px;color:#9CA3AF;font-style:italic">Clique em Editar para adicionar itens</p>';
    items.forEach(function(it){var cc2=CKC[it.status]||["#F3F4F6","#9CA3AF"];h+='<div class="ck-row" style="background:'+cc2[0]+'22"><div><div style="font-size:11px;font-weight:600">'+esc(it.nome)+'</div>'+(it.tipo?'<div style="font-size:9px;color:#9CA3AF">'+esc(it.tipo)+'</div>':'')+'</div><span class="bdg" style="background:'+cc2[0]+';color:'+cc2[1]+'">'+esc(it.status)+'</span></div>';});
    h+='</div><div><div style="font-size:9px;font-weight:700;color:#9CA3AF;text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px">Despesas</div>';
    [["Uber",ck.uber,DC],["Hospedagem",ck.hosp,DC],["Alimentacao",ck.alim,DC]].filter(function(x){return x[1];}).forEach(function(x){var cc2=x[2][x[1]]||["#F3F4F6","#9CA3AF"];h+='<div class="ck-row" style="background:'+cc2[0]+'22"><div style="font-size:11px;font-weight:600">'+x[0]+'</div><span class="bdg" style="background:'+cc2[0]+';color:'+cc2[1]+'">'+esc(x[1])+'</span></div>';});
    h+='</div></div>';
    if(ck.obs) h+='<div style="margin-top:8px;padding:6px 9px;background:#F9FAFB;border-radius:5px;font-size:10px;color:#9CA3AF">Obs: '+esc(ck.obs)+'</div>';
    h+='</div></div>';
  });
  return h;
}
function editarChecklist(eid){
  var e=null; for(var i=0;i<ev.length;i++) if(ev[i].id===eid){e=ev[i];break;}
  if(!e) return;
  var ck=e.ck||{},items=ck.items||[];
  document.getElementById("modalTitle").textContent="Checklist - "+e.empresa;
  document.getElementById("modalBox").style.maxWidth="680px";
  var h='<div style="display:flex;flex-direction:column;gap:12px"><div class="alert al-b">Adicione quantos itens precisar. Cada item pode ter um nome, status e tipo/detalhe personalizado.</div>'+sdiv("Itens do Checklist");
  h+='<div id="ck_edit_items">';
  items.forEach(function(it,i){h+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr auto;gap:7px;margin-bottom:6px;align-items:center"><input class="inp" id="ckei_n_'+i+'" value="'+esc(it.nome)+'" placeholder="Nome"><select class="inp" id="ckei_s_'+i+'">'+CKO.map(function(o){return'<option'+(o===it.status?" selected":"")+'>'+esc(o)+'</option>';}).join("")+'</select><input class="inp" id="ckei_t_'+i+'" value="'+esc(it.tipo||"")+'" placeholder="Tipo/detalhe"><button class="bi" style="color:#DC2626;border-color:#FCA5A5" onclick="this.closest(\\'div\\').remove()">x</button></div>';});
  h+='</div><button class="btn bs" style="font-size:11px" onclick="addCkEditItem()">+ Adicionar item</button>';
  h+=sdiv("Despesas");
  h+='<div class="g3">'+selF("Uber","cke_uber",ck.uber,DESPO)+selF("Hospedagem","cke_hosp",ck.hosp,DESPO)+selF("Alimentacao","cke_alim",ck.alim,DESPO)+'</div>';
  h+=taF("Observacoes","cke_obs",ck.obs);
  h+='<div style="display:flex;gap:7px;justify-content:flex-end;padding-top:8px;border-top:1px solid #F3F4F6"><button class="btn bs" onclick="closeModal()">Cancelar</button><button class="btn bp" onclick="salvarCK(\\''+eid+'\\')">Salvar</button></div></div>';
  document.getElementById("modalBody").innerHTML=h;
  openModal();
}
function addCkEditItem(){
  var cont=document.getElementById("ck_edit_items");if(!cont)return;
  var idx=cont.querySelectorAll("[id^='ckei_n_']").length;
  var div=document.createElement("div");
  div.style.cssText="display:grid;grid-template-columns:1fr 1fr 1fr auto;gap:7px;margin-bottom:6px;align-items:center";
  div.innerHTML='<input class="inp" id="ckei_n_'+idx+'" placeholder="Nome"><select class="inp" id="ckei_s_'+idx+'">'+CKO.map(function(o){return'<option>'+esc(o)+'</option>';}).join("")+'</select><input class="inp" id="ckei_t_'+idx+'" placeholder="Tipo/detalhe"><button class="bi" style="color:#DC2626;border-color:#FCA5A5" onclick="this.closest(\\'div\\').remove()">x</button>';
  cont.appendChild(div);
}
function salvarCK(eid){
  var cont=document.getElementById("ck_edit_items"),items=[];
  if(cont){cont.querySelectorAll("[id^='ckei_n_']").forEach(function(el){var i=el.id.split("_").pop(),nome=el.value.trim();if(nome)items.push({nome:nome,status:gv("ckei_s_"+i)||"Pendente",tipo:gv("ckei_t_"+i)||""});});}
  for(var i=0;i<ev.length;i++){if(ev[i].id===eid){ev[i].ck={items:items,uber:gv("cke_uber"),hosp:gv("cke_hosp"),alim:gv("cke_alim"),obs:gv("cke_obs")};break;}}
  closeModal(); renderAll();
}

// ------------------------------------------------
// CUSTOS
// ------------------------------------------------
function pgCustos(){
  var tot={v:0,i:0,e:0,o:0,ex:{}};
  ev.forEach(function(e){var c=e.custos||{};tot.v+=(parseFloat(c.viagem)||0);tot.i+=(parseFloat(c.imersao)||0);tot.e+=(parseFloat(c.espaco)||0);tot.o+=(parseFloat(c.outros)||0);(c.extras||[]).forEach(function(x){var k=x.nome||"Extra";tot.ex[k]=(tot.ex[k]||0)+(parseFloat(x.valor)||0);});});
  var totalG=tot.v+tot.i+tot.e+tot.o+Object.keys(tot.ex).reduce(function(s,k){return s+tot.ex[k];},0);
  var h='<div class="kgrid" style="margin-bottom:13px">';
  h+='<div class="kc"><div class="kc-l">Total Geral</div><div class="kc-v" style="color:#DC2626;font-size:14px">'+fmt(totalG)+'</div></div>';
  h+='<div class="kc"><div class="kc-l">Viagem</div><div class="kc-v" style="color:#D97706;font-size:14px">'+fmt(tot.v)+'</div></div>';
  h+='<div class="kc"><div class="kc-l">Imersao</div><div class="kc-v" style="color:#7C3AED;font-size:14px">'+fmt(tot.i)+'</div></div>';
  h+='<div class="kc"><div class="kc-l">Espaco</div><div class="kc-v" style="color:#2563EB;font-size:14px">'+fmt(tot.e)+'</div></div>';
  h+='<div class="kc"><div class="kc-l">Outros</div><div class="kc-v" style="font-size:14px">'+fmt(tot.o)+'</div></div>';
  Object.keys(tot.ex).forEach(function(k){h+='<div class="kc"><div class="kc-l">'+esc(k)+'</div><div class="kc-v" style="font-size:13px">'+fmt(tot.ex[k])+'</div></div>';});
  h+='</div><div class="tw-wrap"><div class="tw"><table><thead><tr><th>Evento</th><th>Tipo</th><th>Viagem</th><th>Imersao</th><th>Espaco</th><th>Outros</th><th>Itens Extras</th><th>Total (auto)</th><th></th></tr></thead><tbody>';
  ev.filter(function(e){return e.empresa||e.data;}).forEach(function(e){
    var c=e.custos||{},ex=c.extras||[];
    var t=(parseFloat(c.viagem)||0)+(parseFloat(c.imersao)||0)+(parseFloat(c.espaco)||0)+(parseFloat(c.outros)||0)+ex.reduce(function(s,x){return s+(parseFloat(x.valor)||0);},0);
    h+='<tr><td><div style="font-weight:600;font-size:12px">'+esc(e.empresa)+'</div><div style="font-size:10px;color:#9CA3AF">'+fD(e.data)+'</div></td>';
    h+='<td><span class="bdg" style="background:#EFF6FF;color:#2563EB">'+esc(e.tipo)+'</span></td>';
    h+='<td>'+(c.viagem?fmt(c.viagem):"---")+'</td><td>'+(c.imersao?fmt(c.imersao):"---")+'</td><td>'+(c.espaco?fmt(c.espaco):"---")+'</td><td>'+(c.outros?fmt(c.outros):"---")+'</td>';
    h+='<td>'+(ex.length?ex.map(function(x){return'<div style="white-space:nowrap">'+esc(x.nome)+': <b>'+fmt(x.valor)+'</b></div>';}).join(""):"---")+'</td>';
    h+='<td style="font-weight:700;color:'+(t>0?"#2563EB":"#9CA3AF")+'">'+(t>0?fmt(t):"---")+'</td>';
    h+='<td>'+(canEdit()?'<button class="bi" onclick="abrirEv(\\''+e.id+'\\')">✎</button>':'')+'</td></tr>';
  });
  h+='</tbody><tfoot><tr style="background:#F9FAFB;font-weight:700"><td colspan="2" style="padding:7px 11px;font-size:11px">Totais</td><td style="padding:7px 11px;color:#D97706">'+fmt(tot.v)+'</td><td style="padding:7px 11px;color:#7C3AED">'+fmt(tot.i)+'</td><td style="padding:7px 11px">'+fmt(tot.e)+'</td><td style="padding:7px 11px">'+fmt(tot.o)+'</td><td style="padding:7px 11px">'+Object.keys(tot.ex).map(function(k){return esc(k)+': '+fmt(tot.ex[k]);}).join("<br>")+'</td><td style="padding:7px 11px;color:#DC2626">'+fmt(totalG)+'</td><td></td></tr></tfoot></table></div></div>';
  return h;
}


// ------------------------------------------------
// AGENDA / CALENDARIO
// ------------------------------------------------
function pgAgenda() {
  var meses = ["Janeiro","Fevereiro","Marco","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
  var diasSem = ["Dom","Seg","Ter","Qua","Qui","Sex","Sab"];
  var todayStr = today();
  var todayD = new Date(todayStr+"T12:00:00");

  // Build set of days with events/travas/logistica
  function getDayItems(y, m, d) {
    var ds = y+"-"+String(m+1).padStart(2,"0")+"-"+String(d).padStart(2,"0");
    var items = [];
    // Eventos
    ev.forEach(function(e) {
      if (e.data === ds) items.push({tipo:"ev-evento", label:e.empresa, ref:e.id, kind:"evento"});
      // Trava: day before and after
      if (e.data) {
        var de = addD(e.data,-1), at = addD(e.data,1);
        if (ds === de || ds === at) items.push({tipo:"ev-trava", label:"Trava: "+e.empresa, ref:e.id, kind:"trava"});
      }
    });
    // Logistica
    logistica.forEach(function(l) {
      if (l.data === ds) {
        var lbl = (l.tipo==="voo"?"Voo":"Hotel")+": "+l.descricao.slice(0,20);
        items.push({tipo:"ev-"+l.tipo, label:lbl, ref:l.id, kind:l.tipo});
      }
    });
    return items;
  }

  var firstDay = new Date(calAno, calMes, 1).getDay();
  var daysInMonth = new Date(calAno, calMes+1, 0).getDate();
  var daysInPrev = new Date(calAno, calMes, 0).getDate();

  // Summary counts
  var evMes = ev.filter(function(e){
    return e.data && e.data.slice(0,7) === calAno+"-"+String(calMes+1).padStart(2,"0");
  });
  var logMes = logistica.filter(function(l){
    return l.data && l.data.slice(0,7) === calAno+"-"+String(calMes+1).padStart(2,"0");
  });

  var h = '<div class="cal-wrap">';
  // Left: calendar grid
  h += '<div><div class="cal-grid">';
  h += '<div class="cal-header">';
  h += '<div class="cal-title">'+meses[calMes]+" "+calAno+'</div>';
  h += '<div style="display:flex;align-items:center;gap:8px">';
  h += '<div class="cal-nav"><button onclick="calNavMes(-1)">‹</button><button onclick="calNavMes(1)">›</button></div>';
  h += (canEdit() ? '<button class="btn bp" style="font-size:11px;padding:5px 11px" onclick="abrirLogisticaForm(null,null)">+ Adicionar</button>' : '');
  h += '</div></div>';

  // Day labels
  h += '<div class="cal-days-header">';
  diasSem.forEach(function(d){h+='<div class="cal-day-label">'+d+'</div>';});
  h += '</div>';

  // Days grid
  h += '<div class="cal-days">';
  var dayCount = 0;
  // Prev month days
  for (var i = firstDay-1; i >= 0; i--) {
    var dd = daysInPrev - i;
    h += '<div class="cal-day other-month"><span class="cal-day-num">'+dd+'</span></div>';
    dayCount++;
  }
  // Current month
  for (var d = 1; d <= daysInMonth; d++) {
    var ds = calAno+"-"+String(calMes+1).padStart(2,"0")+"-"+String(d).padStart(2,"0");
    var isToday = ds === todayStr;
    var isSel = ds === calSelDia;
    var items = getDayItems(calAno, calMes, d);
    h += '<div class="cal-day'+(isToday?' today':'')+(isSel?' selected':'')+(dayCount%7===0?' sun':'')+'" onclick="calSelectDay(\\'' + ds + '\\')">'; 
    h += '<span class="cal-day-num">'+d+'</span>';
    items.slice(0,2).forEach(function(it){
      h += '<div class="cal-event '+it.tipo+'" title="'+esc(it.label)+'">'+esc(it.label)+'</div>';
    });
    if(items.length>2) h += '<div style="font-size:9px;color:#9CA3AF">+'+( items.length-2)+' mais</div>';
    h += '</div>';
    dayCount++;
  }
  // Next month padding
  var rem = 7 - (dayCount % 7);
  if (rem < 7) {
    for (var nd = 1; nd <= rem; nd++) {
      h += '<div class="cal-day other-month"><span class="cal-day-num">'+nd+'</span></div>';
    }
  }
  h += '</div></div>';

  // Legend
  h += '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px;padding:10px 14px;background:#fff;border-radius:9px;border:1px solid #E5E7EB;">';
  [["ev-evento","Evento"],["ev-trava","Trava de Agenda"],["ev-voo","Voo"],["ev-hotel","Hotel"],["ev-logistica","Logistica"]].forEach(function(x){
    h += '<span class="cal-event '+x[0]+'" style="font-size:10px;margin:0">'+x[1]+'</span>';
  });
  h += '</div>';

  // Month summary
  h += '<div style="margin-top:10px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">';
  h += '<div class="kc"><div class="kc-l">Eventos no Mes</div><div class="kc-v" style="color:#2563EB">'+evMes.length+'</div></div>';
  h += '<div class="kc"><div class="kc-l">Voos/Hoteis</div><div class="kc-v" style="color:#059669">'+logMes.length+'</div></div>';
  var trava = 0;
  evMes.forEach(function(){trava+=3;});
  h += '<div class="kc"><div class="kc-l">Dias Bloqueados</div><div class="kc-v" style="color:#D97706">'+trava+'</div></div>';
  h += '</div></div>';

  // Right: sidebar
  h += '<div class="cal-sidebar">';

  // Selected day detail
  if (calSelDia) {
    var selItems = [];
    var ds2 = calSelDia;
    ev.forEach(function(e){
      if(e.data===ds2) selItems.push({kind:"evento",e:e});
      if(e.data&&(addD(e.data,-1)===ds2||addD(e.data,1)===ds2)) selItems.push({kind:"trava",e:e});
    });
    logistica.forEach(function(l){if(l.data===ds2) selItems.push({kind:l.tipo,l:l});});

    h += '<div class="cal-day-detail">';
    h += '<div class="cal-day-detail-header">'+fD(calSelDia)+(canEdit()?'<button class="btn bp" style="font-size:10px;padding:3px 8px;float:right" onclick="abrirLogisticaForm(null,\\''+calSelDia+'\\')">+ Add</button>':'')+'</div>';
    if(!selItems.length) {
      h += '<div style="padding:16px;font-size:12px;color:#9CA3AF;text-align:center">Dia livre</div>';
    } else {
      selItems.forEach(function(item){
        if(item.kind==="evento"){
          var e2=item.e;
          h += '<div class="logistica-item"><div class="logistica-icon" style="background:#DBEAFE;color:#1D4ED8">📅</div>';
          h += '<div style="flex:1;min-width:0"><div style="font-size:12px;font-weight:700">'+esc(e2.empresa)+'</div>';
          h += '<div style="font-size:10px;color:#9CA3AF">'+esc(e2.tipo)+' - '+esc(e2.cidade)+'</div>';
          h += '<div style="margin-top:3px">'+bdg(e2.status,SC)+'</div></div>';
          h += (canEdit()?'<button class="bi" onclick="abrirDetalhe(\\''+e2.id+'\\')">👁</button>':'');
          h += '</div>';
        } else if(item.kind==="trava"){
          var e3=item.e;
          h += '<div class="logistica-item"><div class="logistica-icon" style="background:#FEF3C7;color:#92400E">🔒</div>';
          h += '<div style="flex:1"><div style="font-size:12px;font-weight:700">Trava: '+esc(e3.empresa)+'</div>';
          h += '<div style="font-size:10px;color:#9CA3AF">Evento em '+fD(e3.data)+'</div></div></div>';
        } else {
          var l2=item.l;
          var icon=l2.tipo==="voo"?"✈":l2.tipo==="hotel"?"🏛":"🚔";
          var iconBg=l2.tipo==="voo"?"background:#D1FAE5;color:#065F46":l2.tipo==="hotel"?"background:#EDE9FE;color:#6D28D9":"background:#CCFBF1;color:#0F766E";
          h += '<div class="logistica-item"><div class="logistica-icon" style="'+iconBg+'">'+icon+'</div>';
          h += '<div style="flex:1;min-width:0"><div style="font-size:12px;font-weight:700">'+esc(l2.descricao)+'</div>';
          h += '<div style="font-size:10px;color:#9CA3AF">'+esc(l2.horario||"")+(l2.valor?' - '+fmt(l2.valor):'')+'</div>';
          h += (l2.obs?'<div style="font-size:10px;color:#9CA3AF">'+esc(l2.obs)+'</div>':'');
          h += '<div style="margin-top:3px">'+bdg(l2.status||"",{"Confirmado":["#D1FAE5","#065F46"],"Pendente":["#FEE2E2","#991B1B"],"Reservado":["#FEF3C7","#92400E"]})+'</div></div>';
          h += (canEdit()?'<div style="display:flex;gap:3px"><button class="bi" data-id="'+l2.id+'" onclick="abrirLogisticaForm(this.dataset.id,null)">&#9998;</button><button class="bi" style="color:#DC2626;border-color:#FCA5A5" data-id2="'+l2.id+'" onclick="delLogistica(this.dataset.id2)">&#128465;</button></div>':'');
          h += '</div>';
        }
      });
    }
    h += '</div>';
  } else {
    h += '<div style="background:#fff;border-radius:10px;border:1px solid #E5E7EB;padding:20px;text-align:center;color:#9CA3AF;font-size:12px">Clique em um dia para ver os detalhes</div>';
  }

  // Upcoming logistica
  h += '<div class="cal-day-detail">';
  h += '<div class="cal-day-detail-header">Proximos Voos e Hoteis</div>';
  var upcoming = logistica.filter(function(l){return l.data >= todayStr;}).sort(function(a,b){return a.data.localeCompare(b.data);}).slice(0,6);
  if(!upcoming.length) {
    h += '<div style="padding:14px;font-size:12px;color:#9CA3AF;text-align:center">Nenhum registro</div>';
  }
  upcoming.forEach(function(l){
    var icon=l.tipo==="voo"?"✈":l.tipo==="hotel"?"🏛":"🚔";
    var iconBg=l.tipo==="voo"?"background:#D1FAE5;color:#065F46":l.tipo==="hotel"?"background:#EDE9FE;color:#6D28D9":"background:#CCFBF1;color:#0F766E";
    var evRef = l.eventoId ? ev.find(function(e){return e.id===l.eventoId;}) : null;
    h += '<div class="logistica-item"><div class="logistica-icon" style="'+iconBg+'">'+icon+'</div>';
    h += '<div style="flex:1;min-width:0"><div style="font-size:11px;font-weight:700">'+esc(l.descricao)+'</div>';
    h += '<div style="font-size:10px;color:#9CA3AF">'+fD(l.data)+(l.horario?' - '+esc(l.horario):'')+'</div>';
    h += (evRef?'<div style="font-size:10px;color:#2563EB">'+esc(evRef.empresa)+'</div>':'');
    h += '</div><span style="font-size:10px;font-weight:600;color:#2563EB;flex-shrink:0">'+fmt(l.valor)+'</span></div>';
  });
  h += '</div>';

  // Total logistica costs
  var totalVoos = logistica.reduce(function(s,l){return s+(l.tipo==="voo"?parseFloat(l.valor)||0:0);},0);
  var totalHoteis = logistica.reduce(function(s,l){return s+(l.tipo==="hotel"?parseFloat(l.valor)||0:0);},0);
  h += '<div style="background:#fff;border-radius:10px;border:1px solid #E5E7EB;padding:13px">';
  h += '<div style="font-size:11px;font-weight:700;color:#0C1C36;margin-bottom:10px">Resumo de Custos</div>';
  h += '<div class="drow"><span class="dk">Total Voos</span><span class="dv" style="color:#065F46">'+fmt(totalVoos)+'</span></div>';
  h += '<div class="drow"><span class="dk">Total Hoteis</span><span class="dv" style="color:#6D28D9">'+fmt(totalHoteis)+'</span></div>';
  h += '<div class="drow" style="font-weight:700"><span class="dk">Total Logistica</span><span class="dv" style="color:#DC2626">'+fmt(totalVoos+totalHoteis)+'</span></div>';
  h += '</div>';

  h += '</div></div>'; // sidebar + wrap
  return h;
}

function calNavMes(dir) { calMes += dir; if(calMes>11){calMes=0;calAno++;} if(calMes<0){calMes=11;calAno--;} renderPage(); }
function calSelectDay(ds) { calSelDia = (calSelDia===ds)?null:ds; renderPage(); }

function delLogistica(id) {
  if(confirm("Remover?")) { logistica=logistica.filter(function(l){return l.id!==id;}); renderPage(); }
}

function abrirLogisticaForm(lid, preData) {
  var l = lid ? logistica.find(function(x){return x.id===lid;}) : null;
  var d = l || {id:uid(),eventoId:"",tipo:"voo",data:preData||today(),dataFim:"",descricao:"",horario:"",valor:"",status:"Confirmado",obs:""};
  
  // Build event options
  var evOpts = ev.filter(function(e){return e.empresa;}).map(function(e){return {id:e.id,label:e.empresa+" - "+fD(e.data)};});
  
  document.getElementById("modalTitle").textContent = l ? "Editar Registro" : "Novo Voo / Hotel / Logistica";
  document.getElementById("modalBox").style.maxWidth = "580px";
  
  var h = '<div style="display:flex;flex-direction:column;gap:12px">';
  h += sdiv("Tipo de Registro");
  h += '<div class="fg"><span class="lb">Tipo</span><div style="display:flex;gap:10px;flex-wrap:wrap">';
  [["voo","✈ Voo"],["hotel","🏛 Hotel"],["logistica","🚔 Logistica/Transporte"],["outro","📋 Outro"]].forEach(function(x){
    h += '<label style="display:flex;gap:6px;align-items:center;font-size:12px;cursor:pointer;padding:5px 10px;border-radius:6px;border:1px solid '+(d.tipo===x[0]?"#2563EB":"#E5E7EB")+';background:'+(d.tipo===x[0]?"#EFF6FF":"#fff")+'"><input type="radio" name="log_tipo" value="'+x[0]+'"'+(d.tipo===x[0]?" checked":"")+' onchange="updateLogForm()">'+x[1]+'</label>';
  });
  h += '</div></div>';
  
  h += sdiv("Dados");
  h += '<div class="g2">';
  h += inpF("Data","log_data",d.data,"date");
  h += '<div id="log_datafim_wrap" style="'+(d.tipo!=="hotel"?"display:none":"")+'">' + inpF("Data Checkout","log_datafim",d.dataFim,"date") + '</div>';
  h += '</div>';
  h += inpF("Descricao (ex: GOL 1234, Hotel Ibis SP)","log_desc",d.descricao);
  h += '<div class="g2">' + inpF("Horario (ex: 14:30)","log_hora",d.horario) + inpF("Valor (R$)","log_val",d.valor,"number") + '</div>';
  
  // Vincular evento
  h += '<div class="fg"><span class="lb">Vincular a Evento (opcional)</span><select class="inp" id="log_evid"><option value="">Nenhum</option>';
  evOpts.forEach(function(e){h+='<option value="'+e.id+'"'+(d.eventoId===e.id?" selected":"")+'>'+esc(e.label)+'</option>';});
  h += '</select></div>';
  
  h += selF("Status","log_st",d.status,["Confirmado","Reservado","Pendente","Cancelado"]);
  h += taF("Observacoes","log_obs",d.obs);
  
  h += '<div style="display:flex;gap:7px;justify-content:flex-end;padding-top:8px;border-top:1px solid #F3F4F6">';
  h += '<button class="btn bs" onclick="closeModal()">Cancelar</button>';
  h += '<button class="btn bp" onclick="salvarLogistica(\\''+d.id+'\\','+(!l)+')">Salvar</button>';
  h += '</div></div>';
  
  document.getElementById("modalBody").innerHTML = h;
  openModal();
}

function updateLogForm() {
  var tipo = document.querySelector("input[name='log_tipo']:checked");
  if(!tipo) return;
  var wrap = document.getElementById("log_datafim_wrap");
  if(wrap) wrap.style.display = tipo.value==="hotel"?"":"none";
}

function salvarLogistica(lid, isNew) {
  var tipo = document.querySelector("input[name='log_tipo']:checked");
  var l = {
    id: lid,
    tipo: tipo ? tipo.value : "outro",
    data: gv("log_data"),
    dataFim: gv("log_datafim"),
    descricao: gv("log_desc"),
    horario: gv("log_hora"),
    valor: parseFloat(gv("log_val")) || 0,
    eventoId: gv("log_evid"),
    status: gv("log_st"),
    obs: gv("log_obs")
  };
  if(isNew) logistica.push(l);
  else for(var i=0;i<logistica.length;i++) if(logistica[i].id===lid){logistica[i]=l;break;}
  closeModal();
  renderPage();
}

// ------------------------------------------------
// PARCEIROS
// ------------------------------------------------
function pgParceiros(){
  var psc={"Em conversa":["#EFF6FF","#2563EB"],"Confirmado":["#D1FAE5","#065F46"],"Pendente":["#FEF3C7","#92400E"],"Encerrado":["#F3F4F6","#6B7280"],"Nao aprovado":["#FEE2E2","#991B1B"]};
  var h='<div style="display:flex;justify-content:flex-end;margin-bottom:12px">'+(canEdit()?'<button class="btn bp" onclick="abrirParc(null)">+ Novo Parceiro</button>':'')+'</div>';
  h+='<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:10px">';
  if(!par.length) h+='<div style="grid-column:1/-1;padding:36px;text-align:center;color:#9CA3AF">Nenhum parceiro.</div>';
  par.forEach(function(p){
    var c=psc[p.status]||["#F3F4F6","#9CA3AF"];
    h+='<div class="card" style="padding:13px"><div style="display:flex;justify-content:space-between;margin-bottom:8px"><div><div style="font-weight:700;font-size:13px">'+esc(p.nome)+'</div>'+(p.empresa?'<div style="font-size:10px;color:#9CA3AF">'+esc(p.empresa)+'</div>':'')+'</div><span class="bdg" style="background:'+c[0]+';color:'+c[1]+'">'+esc(p.status)+'</span></div>';
    h+='<div style="display:flex;flex-direction:column;gap:3px;font-size:11px;color:#9CA3AF;margin-bottom:8px">'+(p.tipo?'<span>'+esc(p.tipo)+'</span>':'')+(p.cidade?'<span>'+esc(p.cidade)+'</span>':'')+(p.contato?'<span>'+esc(p.contato)+'</span>':'')+(p.eventoRel?'<span>'+esc(p.eventoRel)+'</span>':'')+'</div>';
    if(p.obs) h+='<p style="font-size:10px;color:#9CA3AF;padding:4px 7px;background:#F9FAFB;border-radius:5px;margin-bottom:8px">'+esc(p.obs)+'</p>';
    h+='<div style="display:flex;gap:5px">'+(canEdit()?'<button class="btn bs" style="flex:1;justify-content:center;font-size:11px" onclick="abrirParc(\\''+p.id+'\\')">Editar</button><button class="bi" style="color:#DC2626;border-color:#FCA5A5" onclick="delParc(\\''+p.id+'\\')">🗑</button>':'')+'</div></div>';
  });
  return h+'</div>';
}
function delParc(id){if(confirm("Remover?")){par=par.filter(function(p){return p.id!==id;});renderAll();}}
function abrirParc(pid){
  var p=null; for(var i=0;i<par.length;i++) if(par[i].id===pid){p=par[i];break;}
  var d=p||{id:uid(),nome:"",empresa:"",cidade:"",tipo:"",contato:"",eventoRel:"",status:"Em conversa",obs:""};
  document.getElementById("modalTitle").textContent=p?"Editar Parceiro":"Novo Parceiro";
  document.getElementById("modalBox").style.maxWidth="540px";
  var h='<div style="display:flex;flex-direction:column;gap:10px"><div class="g2">'+inpF("Nome","pa_nome",d.nome)+inpF("Empresa","pa_emp",d.empresa)+'</div><div class="g2">'+inpF("Cidade","pa_cid",d.cidade)+selF("Tipo","pa_tipo",d.tipo,TPARC)+'</div><div class="g2">'+inpF("Contato","pa_cont",d.contato)+selF("Status","pa_st",d.status,SPARC)+'</div>'+inpF("Evento Relacionado","pa_ev",d.eventoRel)+taF("Observacoes","pa_obs",d.obs)+'<div style="display:flex;gap:7px;justify-content:flex-end;padding-top:7px;border-top:1px solid #F3F4F6"><button class="btn bs" onclick="closeModal()">Cancelar</button><button class="btn bp" onclick="salvarParc(\\''+d.id+'\\','+(!p)+')">Salvar</button></div></div>';
  document.getElementById("modalBody").innerHTML=h;
  openModal();
}
function salvarParc(pid,isNew){
  var p={id:pid,nome:gv("pa_nome"),empresa:gv("pa_emp"),cidade:gv("pa_cid"),tipo:gv("pa_tipo"),contato:gv("pa_cont"),eventoRel:gv("pa_ev"),status:gv("pa_st"),obs:gv("pa_obs")};
  if(isNew) par.push(p); else for(var i=0;i<par.length;i++) if(par[i].id===pid){par[i]=p;break;}
  closeModal(); renderAll();
}

// ------------------------------------------------
// LINKS
// ------------------------------------------------
function pgLinks(){
  var grp={};
  CATLINK.forEach(function(c){var it=lnk.filter(function(l){return l.categoria===c;});if(it.length) grp[c]=it;});
  var h='<div style="display:flex;justify-content:flex-end;margin-bottom:12px">'+(canEdit()?'<button class="btn bp" onclick="abrirLink()">+ Novo Link</button>':'')+'</div>';
  if(!lnk.length) h+='<div style="padding:36px;text-align:center;color:#9CA3AF">Nenhum link cadastrado.</div>';
  Object.keys(grp).forEach(function(cat){
    h+='<div style="margin-bottom:16px"><div style="font-size:9px;font-weight:700;color:#9CA3AF;text-transform:uppercase;letter-spacing:1px;margin-bottom:7px;padding-bottom:5px;border-bottom:1px solid #F3F4F6">'+esc(cat)+'</div>';
    grp[cat].forEach(function(l){
      h+='<div style="display:flex;align-items:center;gap:10px;padding:9px 12px;background:#fff;border-radius:8px;border:1px solid #E5E7EB;margin-bottom:5px">';
      h+='<span style="font-size:14px;color:#2563EB;flex-shrink:0">🔗</span>';
      h+='<div style="flex:1;min-width:0"><a href="'+esc(l.link)+'" target="_blank" style="font-size:12px;font-weight:600;color:#2563EB;text-decoration:none">'+esc(l.nome)+'</a>'+(l.obs?'<div style="font-size:10px;color:#9CA3AF;margin-top:1px">'+esc(l.obs)+'</div>':'')+'</div>';
      h+=(l.eventoRel?'<span style="font-size:10px;color:#9CA3AF;flex-shrink:0">'+esc(l.eventoRel)+'</span>':'');
      h+=(canEdit()?'<button class="bi" style="color:#DC2626;border-color:#FCA5A5;flex-shrink:0" onclick="delLink(\\''+l.id+'\\')">🗑</button>':'');
      h+='</div>';
    });
    h+='</div>';
  });
  return h;
}
function delLink(id){if(confirm("Remover?")){lnk=lnk.filter(function(l){return l.id!==id;});renderAll();}}
function abrirLink(){
  document.getElementById("modalTitle").textContent="Novo Link";
  document.getElementById("modalBox").style.maxWidth="520px";
  var h='<div style="display:flex;flex-direction:column;gap:10px">'+selF("Categoria","lk_cat","",CATLINK)+inpF("Nome","lk_nome","")+inpF("URL","lk_url","")+'<div class="g2">'+inpF("Responsavel","lk_resp","")+inpF("Evento Relacionado","lk_ev","")+'</div>'+taF("Observacoes","lk_obs","")+'<div style="display:flex;gap:7px;justify-content:flex-end;padding-top:7px;border-top:1px solid #F3F4F6"><button class="btn bs" onclick="closeModal()">Cancelar</button><button class="btn bp" onclick="salvarLink()">Salvar</button></div></div>';
  document.getElementById("modalBody").innerHTML=h;
  openModal();
}
function salvarLink(){
  lnk.push({id:uid(),categoria:gv("lk_cat"),nome:gv("lk_nome"),link:gv("lk_url"),responsavel:gv("lk_resp"),eventoRel:gv("lk_ev"),obs:gv("lk_obs")});
  closeModal(); renderAll();
}

// ------------------------------------------------
// USUARIOS
// ------------------------------------------------
function pgUsuarios(){
  if(!currentUser||currentUser.role!=="admin") return '<div style="padding:40px;text-align:center;color:#9CA3AF">Acesso restrito a administradores.</div>';
  var h='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:8px"><div style="font-size:13px;font-weight:700;color:#0C1C36">Usuarios ('+users.length+')</div><button class="btn bp" onclick="abrirUserForm(null)">+ Novo Usuario</button></div>';
  h+='<div class="alert al-b"><b>Perfis:</b> ';
  h+=Object.keys(ROLES).map(function(k){var r=ROLES[k];return'<span class="role-bdg" style="background:'+r.bg+';color:'+r.color+';margin:0 4px">'+r.label+'</span> '+r.desc;}).join(" | ");
  h+='</div>';
  users.forEach(function(u){
    var rc=uColor(u.role);
    h+='<div class="user-card"><div class="user-av" style="background:'+rc+'22;color:'+rc+'">'+uInitials(u.nome)+'</div>';
    h+='<div style="flex:1;min-width:0"><div style="display:flex;align-items:center;gap:7px;flex-wrap:wrap"><span style="font-size:13px;font-weight:700">'+esc(u.nome)+'</span>'+roleBdg(u.role)+(!u.ativo?'<span class="role-bdg" style="background:#F3F4F6;color:#6B7280">Inativo</span>':'')+(u.id===currentUser.id?'<span class="role-bdg" style="background:#ECFDF5;color:#065F46">Voce</span>':'')+'</div><div style="font-size:11px;color:#9CA3AF;margin-top:2px">Login: <b>'+esc(u.usuario)+'</b></div></div>';
    h+='<div style="display:flex;gap:5px;flex-shrink:0"><button class="bi" onclick="abrirUserForm(\\''+u.id+'\\')">✎</button>';
    if(u.id!==currentUser.id){
      h+='<button class="bi" style="color:'+(u.ativo?"#DC2626":"#059669")+';border-color:'+(u.ativo?"#FCA5A5":"#A7F3D0")+'" onclick="toggleUserAtivo(\\''+u.id+'\\')">'+(u.ativo?"Desativar":"Ativar")+'</button>';
      h+='<button class="bi" style="color:#DC2626;border-color:#FCA5A5" onclick="delUser(\\''+u.id+'\\')">🗑</button>';
    }
    h+='</div></div>';
  });
  return h;
}
function toggleUserAtivo(uid_){for(var i=0;i<users.length;i++) if(users[i].id===uid_){users[i].ativo=!users[i].ativo;break;} renderPage();}
function delUser(uid_){if(confirm("Remover usuario?")){users=users.filter(function(u){return u.id!==uid_;});renderPage();}}
function abrirUserForm(uid_){
  var u=null; for(var i=0;i<users.length;i++) if(users[i].id===uid_){u=users[i];break;}
  var d=u||{id:uid(),nome:"",usuario:"",senha:"",role:"viewer",ativo:true};
  document.getElementById("modalTitle").textContent=u?"Editar Usuario":"Novo Usuario";
  document.getElementById("modalBox").style.maxWidth="440px";
  var h='<div style="display:flex;flex-direction:column;gap:11px">'+inpF("Nome completo","usr_nome",d.nome)+'<div class="g2">'+inpF("Usuario (login)","usr_user",d.usuario)+inpF("Senha","usr_pass",d.senha)+'</div>'+selF("Perfil de acesso","usr_role",d.role,Object.keys(ROLES));
  h+='<div id="roleDescBox" style="background:#F9FAFB;border-radius:6px;padding:8px 11px;font-size:11px;color:#9CA3AF">'+(ROLES[d.role]&&ROLES[d.role].desc||"")+'</div>';
  h+='<div class="fg"><span class="lb">Status</span><div style="display:flex;gap:16px;padding-top:6px">'+["Ativo","Inativo"].map(function(o){return'<label style="display:flex;gap:5px;align-items:center;font-size:12px;cursor:pointer"><input type="radio" name="usr_ativo" value="'+(o==="Ativo")+'"'+(d.ativo===(o==="Ativo")?" checked":"")+">"+o+'</label>';}).join("")+'</div></div>';
  h+='<div style="display:flex;gap:7px;justify-content:flex-end;padding-top:8px;border-top:1px solid #F3F4F6"><button class="btn bs" onclick="closeModal()">Cancelar</button><button class="btn bp" onclick="salvarUser(\\''+d.id+'\\','+(!u)+')">Salvar</button></div></div>';
  document.getElementById("modalBody").innerHTML=h;
  var roleEl=document.getElementById("usr_role");
  if(roleEl) roleEl.addEventListener("change",function(){var b=document.getElementById("roleDescBox");if(b)b.textContent=(ROLES[this.value]&&ROLES[this.value].desc)||"";});
  openModal();
}
function salvarUser(uid_,isNew){
  var ativo=document.querySelector("input[name='usr_ativo']:checked");
  ativo=ativo?ativo.value==="true":true;
  var u={id:uid_,nome:gv("usr_nome"),usuario:gv("usr_user"),senha:gv("usr_pass"),role:gv("usr_role"),ativo:ativo};
  if(!u.nome||!u.usuario||!u.senha){alert("Preencha nome, usuario e senha.");return;}
  for(var i=0;i<users.length;i++){if(users[i].usuario.toLowerCase()===u.usuario.toLowerCase()&&users[i].id!==uid_){alert("Usuario ja existe.");return;}}
  if(isNew) users.push(u); else for(var i=0;i<users.length;i++) if(users[i].id===uid_){users[i]=u;break;}
  if(currentUser&&currentUser.id===uid_) currentUser=u;
  closeModal(); renderAll();
}


// ------------------------------------------------
// STATE SETTERS (callable from inline HTML)
// ------------------------------------------------
function setFuF(v) { fuF = v; renderPage(); }
function setLeadKanban(v) { leadKanban = v; renderPage(); }
function setEvF(key, val) { evF[key] = val; renderPage(); }

// ------------------------------------------------
// EXPOSE TO WINDOW (needed for onclick in HTML strings)
// ------------------------------------------------
window.setTab = setTab;
window.doLogin = doLogin;
window.doLogout = doLogout;
window.closeModal = closeModal;
window.openModal = openModal;
window.renderPage = renderPage;
window.renderAll = renderAll;
// Leads
window.abrirLead = abrirLead;
window.salvarLead = salvarLead;
window.delLead = delLead;
window.moverLead = moverLead;
window.virarEvento = virarEvento;
// Follow-up
window.openFuModal = openFuModal;
window.salvarFU = salvarFU;
// Eventos
window.abrirEv = abrirEv;
window.salvarEv = salvarEv;
window.delEv = delEv;
window.abrirDetalhe = abrirDetalhe;
window.showDT = showDT;
window.addCkItem = addCkItem;
window.addExtra = addExtra;
window.checkConflicts = checkConflicts;
window.openGcal = openGcal;
// Checklist
window.editarChecklist = editarChecklist;
window.salvarCK = salvarCK;
window.addCkEditItem = addCkEditItem;
// Parceiros
window.abrirParc = abrirParc;
window.salvarParc = salvarParc;
window.delParc = delParc;
// Links
window.abrirLink = abrirLink;
window.salvarLink = salvarLink;
window.delLink = delLink;
// Usuarios
window.abrirUserForm = abrirUserForm;
window.salvarUser = salvarUser;
window.delUser = delUser;
window.toggleUserAtivo = toggleUserAtivo;
// evF filter state (used in oninput/onchange)
window.evF = evF;
window.fuF = fuF;
window.leadKanban = leadKanban;
window.setFuF = setFuF;
window.pgAgenda = pgAgenda;
window.calNavMes = calNavMes;
window.calSelectDay = calSelectDay;
window.abrirLogisticaForm = abrirLogisticaForm;
window.salvarLogistica = salvarLogistica;
window.delLogistica = delLogistica;
window.updateLogForm = updateLogForm;
window.setLeadKanban = setLeadKanban;
window.setEvF = setEvF;

// ------------------------------------------------
// EVENT LISTENERS
// ------------------------------------------------
document.getElementById("loginBtn").addEventListener("click", doLogin);
document.getElementById("authPass").addEventListener("keydown", function(e){if(e.key==="Enter")doLogin();});
document.getElementById("authUser").addEventListener("keydown", function(e){if(e.key==="Enter")doLogin();});
document.getElementById("menuBtn").addEventListener("click", function(){
  var open = document.getElementById("sidebar").classList.toggle("open");
  document.getElementById("sbOverlay").classList.toggle("show", open);
});
window.closeSidebar = function() {
  document.getElementById("sidebar").classList.remove("open");
  document.getElementById("sbOverlay").classList.remove("show");
};
document.getElementById("modalCloseBtn").addEventListener("click", closeModal);
document.getElementById("modalOv").addEventListener("click", function(e){if(e.target===this)closeModal();});

// ------------------------------------------------
// INIT — show login screen, wait for login
// ------------------------------------------------
document.getElementById("authScreen").style.display = "flex";

</script>`

const SISTEMA_JS = `// ------------------------------------------------
// CONSTANTES
// ------------------------------------------------
var SFUNIL = ["Contato Inicial","Agendar primeira reuniao","Reuniao 1 agendada","Aguardando retorno","Proposta enviada","Cliente analisando","Reuniao final","Confirmado","Contrato em criacao","Contrato em assinatura","Contrato assinado","Evento concluido","Adiado"];
var TIPOS = ["Imersao","Palestra","Workshop","Palestra + Workshop","Evento Fechado"];
var PRIOR = ["Baixa","Media","Alta"];
var FUNCOES = ["Dono","Marketing","Gestor comercial","Produtor","Financeiro","Coordenador","Outro"];
var SCONT = ["Aguardando assinatura","Vagas reservadas","Assinado","Em revisao","Cancelado"];
var TPARC = ["Divulgacao","Apoio comercial","Indicacao","Estrutura","Producao","Espaco","Marketing","Patrocinio","Outro"];
var SPARC = ["Em conversa","Confirmado","Pendente","Encerrado","Nao aprovado"];
var CATLINK = ["Marca / Identidade Visual","Redes Sociais","Contratos","Propostas","Fotos e Videos","Materiais de Divulgacao","Apresentacoes","Fornecedores","Parceiros","Drive / Arquivos","Orcamentos","Comprovantes","Outros"];
var CKO = ["Pendente","Em andamento","Concluido","Nao se aplica"];
var DESPO = ["Pago","Parceria","Pendente","Nao se aplica"];
var FTIPOS = ["WhatsApp","Ligacao","Email","Reuniao presencial","Reuniao online","Instagram"];
var LEAD_STATUS = ["Novo Lead","Em conversa","Proposta enviada","Negociacao","Fechado - Virou Evento","Perdido"];

var FP = {"Contato Inicial":8,"Agendar primeira reuniao":15,"Reuniao 1 agendada":25,"Aguardando retorno":33,"Proposta enviada":44,"Cliente analisando":54,"Reuniao final":65,"Confirmado":75,"Contrato em criacao":82,"Contrato em assinatura":88,"Contrato assinado":95,"Evento concluido":100,"Adiado":0};
var SC = {"Contato Inicial":["#F3F4F6","#6B7280"],"Agendar primeira reuniao":["#EFF6FF","#2563EB"],"Reuniao 1 agendada":["#DBEAFE","#1D4ED8"],"Aguardando retorno":["#FFFBEB","#B45309"],"Proposta enviada":["#FEF3C7","#92400E"],"Cliente analisando":["#FEF9C3","#713F12"],"Reuniao final":["#EDE9FE","#6D28D9"],"Confirmado":["#D1FAE5","#065F46"],"Contrato em criacao":["#ECFDF5","#059669"],"Contrato em assinatura":["#ECFDF5","#047857"],"Contrato assinado":["#A7F3D0","#064E3B"],"Evento concluido":["#CCFBF1","#0F766E"],"Adiado":["#FEE2E2","#991B1B"]};
var PC = {"Alta":["#FEE2E2","#991B1B"],"Media":["#FEF3C7","#92400E"],"Baixa":["#D1FAE5","#065F46"]};
var CKC = {"Concluido":["#D1FAE5","#065F46"],"Em andamento":["#FEF3C7","#92400E"],"Pendente":["#FEE2E2","#991B1B"],"Nao se aplica":["#F3F4F6","#9CA3AF"]};
var DC = {"Pago":["#D1FAE5","#065F46"],"Parceria":["#EDE9FE","#6D28D9"],"Pendente":["#FEE2E2","#991B1B"],"Nao se aplica":["#F3F4F6","#9CA3AF"]};
var LEAD_SC = {"Novo Lead":["#EFF6FF","#2563EB"],"Em conversa":["#DBEAFE","#1D4ED8"],"Proposta enviada":["#FEF3C7","#92400E"],"Negociacao":["#EDE9FE","#6D28D9"],"Fechado - Virou Evento":["#D1FAE5","#065F46"],"Perdido":["#FEE2E2","#991B1B"]};

// ------------------------------------------------
// AUTH / USUARIOS
// ------------------------------------------------
var ROLES = {
  admin:    {label:"Admin",        color:"#1D4ED8", bg:"#DBEAFE", desc:"Acesso total + gestao de usuarios"},
  manager:  {label:"Gerente",      color:"#065F46", bg:"#D1FAE5", desc:"Acesso total, sem gestao de usuarios"},
  producao: {label:"Producao",     color:"#6D28D9", bg:"#EDE9FE", desc:"Leads, Follow-up, Eventos, Checklist e Custos"},
  viewer:   {label:"Visualizador", color:"#92400E", bg:"#FEF3C7", desc:"Somente leitura"}
};
var ROLE_TABS = {
  admin:    ["dashboard","leads","followup","agenda","eventos","checklist","custos","parceiros","links","usuarios"],
  manager:  ["dashboard","leads","followup","agenda","eventos","checklist","custos","parceiros","links"],
  producao: ["dashboard","leads","followup","agenda","eventos","checklist","custos"],
  viewer:   ["dashboard","agenda","eventos","checklist"]
};

var users = [
  {id:"u1", nome:"Diego Borges", usuario:"diego",    senha:"diego2024",    role:"admin",    ativo:true},
  {id:"u2", nome:"Adriano",      usuario:"adriano",   senha:"adriano2024",  role:"manager",  ativo:true},
  {id:"u3", nome:"Producao",     usuario:"producao",  senha:"prod2024",     role:"producao", ativo:true},
  {id:"u4", nome:"Visitante",    usuario:"viewer",    senha:"view2024",     role:"viewer",   ativo:true}
];
var currentUser = null;

function doLogin() {
  var u = document.getElementById("authUser").value.trim().toLowerCase();
  var p = document.getElementById("authPass").value;
  var found = null;
  for (var i = 0; i < users.length; i++) {
    if (users[i].usuario.toLowerCase() === u && users[i].senha === p && users[i].ativo) {
      found = users[i]; break;
    }
  }
  var err = document.getElementById("authErr");
  if (!found) {
    err.style.display = "block";
    document.getElementById("authPass").value = "";
    return;
  }
  currentUser = found;
  document.getElementById("authScreen").style.display = "none";
  var allowed = ROLE_TABS[currentUser.role] || [];
  if (allowed.indexOf(tab) === -1) tab = allowed[0];
  renderAll();
}

function doLogout() {
  currentUser = null; tab = "dashboard";
  document.getElementById("authScreen").style.display = "flex";
  document.getElementById("authUser").value = "";
  document.getElementById("authPass").value = "";
  document.getElementById("authErr").style.display = "none";
  document.getElementById("pageContent").innerHTML = "";
  document.getElementById("sbNav").innerHTML = "";
}

function canEdit() { return currentUser && currentUser.role !== "viewer"; }
function canTab(t) { return currentUser && (ROLE_TABS[currentUser.role]||[]).indexOf(t) !== -1; }
function uInitials(n) { return n.split(" ").map(function(w){return w[0];}).slice(0,2).join("").toUpperCase(); }
function uColor(r) { return ({admin:"#2563EB",manager:"#059669",producao:"#7C3AED",viewer:"#D97706"})[r]||"#6B7280"; }
function roleBdg(role) {
  var r = ROLES[role] || ROLES.viewer;
  return '<span class="role-bdg" style="background:'+r.bg+';color:'+r.color+'">'+r.label+"</span>";
}

// ------------------------------------------------
// UTILS
// ------------------------------------------------
function uid() { return Math.random().toString(36).slice(2,9); }
function fmt(n) { return (parseFloat(n)||0).toLocaleString("pt-BR",{style:"currency",currency:"BRL"}); }
function fD(d) { if(!d) return ""; var p=d.split("-"); return p.length===3?p[2]+"/"+p[1]+"/"+p[0]:d; }
function today() { return new Date().toISOString().slice(0,10); }
function nowStr() {
  var d = new Date();
  return d.toLocaleDateString("pt-BR")+" "+d.toLocaleTimeString("pt-BR");
}
function diff(ds) {
  if (!ds) return null;
  return Math.round((new Date(ds+"T12:00:00")-new Date(today()+"T12:00:00"))/86400000);
}
function addD(ds, n) {
  if (!ds) return "";
  var d = new Date(ds+"T12:00:00"); d.setDate(d.getDate()+n);
  return d.toISOString().slice(0,10);
}
function esc(s) {
  return String(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}
function gv(id) { var el=document.getElementById(id); return el?el.value||"":""; }
function calcMeta(t) { return ({Imersao:200,Palestra:300,Workshop:100,"Palestra + Workshop":300})[t]||null; }
function calcTrava(d) {
  if (!d) return "";
  var dt=new Date(d+"T12:00:00"),a=new Date(dt),b=new Date(dt);
  a.setDate(dt.getDate()-1); b.setDate(dt.getDate()+1);
  function f(x){return String(x.getDate()).padStart(2,"0")+"/"+String(x.getMonth()+1).padStart(2,"0")+"/"+x.getFullYear();}
  return f(a)+" a "+f(b);
}
function calcRes(tipo, qtd, meta) {
  if (tipo==="Evento Fechado") return "Nao se aplica";
  if (!meta||!qtd) return "";
  return Number(qtd)>=meta?"Meta batida":"Abaixo da meta";
}
function calcAcao(s) {
  if (!s) return "";
  return ["Evento concluido","Contrato assinado","Confirmado","Contrato em criacao","Contrato em assinatura"].indexOf(s)!==-1?"Acompanhar / OK":"Entrar em contato";
}
function calcLimCK(tipo, d) { return tipo==="Imersao"&&d?addD(d,-5):""; }
function urgCls(p) {
  var d=diff(p);
  if(d===null)return"fu-fut";if(d<0)return"fu-urg";if(d===0)return"fu-hoj";if(d<=3)return"fu-ok";return"fu-fut";
}
function checkConflicts(data, ignoreId) {
  if (!data) return [];
  var res = [];
  for (var i=0;i<ev.length;i++) {
    var e=ev[i];
    if (e.id===ignoreId||!e.data) continue;
    var de=addD(e.data,-1), at=addD(e.data,1);
    if (data>=de&&data<=at) res.push({empresa:e.empresa,data:e.data,trava:calcTrava(e.data)});
  }
  return res;
}
function showToast(msg, ms) {
  var t=document.getElementById("toast");
  t.innerHTML=msg; t.style.display="block";
  clearTimeout(window._tt);
  window._tt=setTimeout(function(){t.style.display="none";}, ms||3000);
}
function bdg(label, map) {
  var c=(map&&map[label])||["#F3F4F6","#9CA3AF"];
  return '<span class="bdg" style="background:'+c[0]+';color:'+c[1]+'">'+esc(label)+"</span>";
}
function sBdg(s){return bdg(s,SC);}
function pBdg(p){return bdg(p,PC);}
function fbar(s,w) { return '<div class="fbar"'+(w?' style="width:'+w+'px"':'')+' ><div class="ff" style="width:'+(FP[s]||0)+'%"></div></div>'; }
function inpF(label,id,val,type) { return '<div class="fg"><span class="lb">'+esc(label)+'</span><input class="inp" id="'+esc(id)+'" type="'+(type||"text")+'" value="'+esc(val||"")+'"></div>'; }
function selF(label,id,val,opts) { return '<div class="fg"><span class="lb">'+esc(label)+'</span><select class="inp" id="'+esc(id)+'"><option value="">Selecionar...</option>'+opts.map(function(o){return'<option'+(o===val?' selected':'')+'>'+esc(o)+'</option>';}).join("")+'</select></div>'; }
function taF(label,id,val,rows) { return '<div class="fg"><span class="lb">'+esc(label)+'</span><textarea class="inp" id="'+esc(id)+'" rows="'+(rows||2)+'" style="resize:vertical">'+esc(val||"")+'</textarea></div>'; }
function sdiv(label) { return '<div class="sdiv">+ '+label+'</div>'; }
function autoF(label,val,cls) { return '<div class="fg"><span class="lb">'+esc(label)+'</span><div class="inp '+(cls||"")+'">'+esc(val||"---")+'</div></div>'; }

// ------------------------------------------------
// DADOS
// ------------------------------------------------
var ev = [
];

var leads = [
];


// ------------------------------------------------
// AGENDA / LOGISTICA
// ------------------------------------------------
var logistica = [
];

var calMes = new Date().getMonth();
var calAno = new Date().getFullYear();
var calSelDia = null;

var par = [];

var lnk = [];


// ------------------------------------------------
// STATE
// ------------------------------------------------
var tab = "dashboard";
var evF = {q:"",s:"",t:"",c:""};
var fuF = "todos";
var leadKanban = true;
var custoEdit = null;

// ------------------------------------------------
// TABS / NAV
// ------------------------------------------------
var TABS = [
  {id:"dashboard",l:"Dashboard",sec:"geral"},
  {id:"leads",    l:"Leads",    sec:"geral",alert:true},
  {id:"followup", l:"Follow-up",sec:"geral"},
  {id:"eventos",  l:"Eventos",  sec:"comercial"},
  {id:"checklist",l:"Checklist",sec:"operacional"},
  {id:"custos",   l:"Custos",   sec:"operacional"},
  {id:"parceiros",l:"Parceiros",sec:"operacional"},
  {id:"links",    l:"Links Uteis",sec:"operacional"},
  {id:"agenda",   l:"Agenda",   sec:"geral"},
  {id:"usuarios", l:"Usuarios", sec:"admin"}
];
var SECLABELS = {geral:"Geral",comercial:"Comercial",operacional:"Operacional",admin:"Administracao"};

function renderNav() {
  if (!currentUser) { document.getElementById("sbNav").innerHTML=""; return; }
  var allowed = ROLE_TABS[currentUser.role]||[];
  var urg = 0;
  for (var i=0;i<leads.length;i++) { var d=diff(leads[i].prazoAcao); if(d!==null&&d<0&&["Fechado - Virou Evento","Perdido"].indexOf(leads[i].status)===-1) urg++; }
  var h = "";
  var secs = ["geral","comercial","operacional"];
  if (currentUser.role==="admin") secs.push("admin");
  secs.forEach(function(sec) {
    var secTabs = TABS.filter(function(t){return t.sec===sec&&allowed.indexOf(t.id)!==-1;});
    if (!secTabs.length) return;
    h += '<div class="sb-sec">'+SECLABELS[sec]+"</div>";
    secTabs.forEach(function(t) {
      h += '<button class="nb'+(tab===t.id?" on":"")+'" onclick="setTab(\\''+t.id+'\\')">'+t.l+(t.alert&&urg>0?'<span class="nb-bdg">'+urg+"</span>":"")+"</button>";
    });
  });
  var r = ROLES[currentUser.role]||ROLES.viewer;
  h += '<div style="margin-top:12px;padding:9px;background:rgba(255,255,255,.06);border-radius:7px">';
  h += '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">';
  h += '<div style="width:28px;height:28px;border-radius:50%;background:'+uColor(currentUser.role)+'33;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:'+uColor(currentUser.role)+'">'+uInitials(currentUser.nome)+"</div>";
  h += '<div><div style="font-size:11px;font-weight:600;color:#fff">'+esc(currentUser.nome)+"</div>";
  h += '<span class="role-bdg" style="background:'+r.bg+';color:'+r.color+'">'+r.label+"</span></div></div>";
  h += '<button onclick="doLogout()" style="width:100%;padding:5px;background:rgba(220,38,38,.15);border:1px solid rgba(220,38,38,.3);border-radius:6px;color:#FCA5A5;font-size:11px;font-weight:600;cursor:pointer">Sair</button></div>';
  document.getElementById("sbNav").innerHTML = h;
}

function renderTopbar() {
  var titles = {dashboard:"Dashboard",leads:"Leads e Contatos",followup:"Follow-up",eventos:"Eventos",checklist:"Checklist Operacional",custos:"Custos",parceiros:"Parceiros",links:"Links Uteis",usuarios:"Usuarios"};
  var urgFu = 0;
  for (var i=0;i<ev.length;i++) { var d=diff(ev[i].prazoAcao); if(d!==null&&d<0&&["Evento concluido","Contrato assinado"].indexOf(ev[i].status)===-1) urgFu++; }
  document.getElementById("pageTitle").textContent = titles[tab]||tab;
  document.getElementById("pageSub").textContent = ev.length+" eventos  "+leads.length+" leads  "+par.length+" parceiros";
  document.getElementById("topbarRight").innerHTML = (tab==="followup"&&urgFu>0)?'<div class="tb-alert">!! '+urgFu+' acao'+(urgFu>1?"oes":"")+" vencida"+(urgFu>1?"s":"")+'</div>':"";
}

function setTab(t) {
  if (!canTab(t)) return;
  tab=t; document.getElementById("sidebar").classList.remove("open");
  var ov=document.getElementById("sbOverlay");if(ov)ov.classList.remove("show");
  renderAll();
}
function renderAll() { renderNav(); renderTopbar(); renderPage(); }
function renderPage() {
  if (!currentUser) { document.getElementById("pageContent").innerHTML=""; return; }
  var pages = {dashboard:pgDashboard,leads:pgLeads,followup:pgFollowup,agenda:pgAgenda,eventos:pgEventos,checklist:pgChecklist,custos:pgCustos,parceiros:pgParceiros,links:pgLinks,usuarios:pgUsuarios};
  document.getElementById("pageContent").innerHTML = (pages[tab]||pgDashboard)();
}

// ------------------------------------------------
// MODAL
// ------------------------------------------------
function openModal() { document.getElementById("modalOv").classList.add("show"); }
function closeModal() { document.getElementById("modalOv").classList.remove("show"); }

// ------------------------------------------------
// GOOGLE CALENDAR
// ------------------------------------------------
function openGcal(eid, who) {
  var e = null;
  for (var i=0;i<ev.length;i++) if(ev[i].id===eid){e=ev[i];break;}
  if (!e||!e.data) return;
  var title = encodeURIComponent("[Diego Borges] "+e.tipo+" - "+e.empresa);
  var start = addD(e.data,-1).replace(/-/g,"");
  var end = addD(e.data,2).replace(/-/g,"");
  var loc = encodeURIComponent(e.cidade||"");
  var note = who==="producao"?"Agenda bloqueada: Producao (logistica)":"Agenda bloqueada: Diego Borges (deslocamento + evento + retorno)";
  var details = encodeURIComponent("Tipo: "+e.tipo+"\\nEmpresa: "+e.empresa+"\\nResponsavel: "+e.responsavel+" ("+e.contato+")\\nCidade: "+e.cidade+"\\nStatus: "+e.status+"\\nValor: "+fmt(e.valorContrato)+"\\nTrava: "+calcTrava(e.data)+"\\n\\n"+note+(e.obs?"\\n\\nObs: "+e.obs:""));
  window.open("https://calendar.google.com/calendar/render?action=TEMPLATE&text="+title+"&dates="+start+"/"+end+"&location="+loc+"&details="+details,"_blank");
}

// ------------------------------------------------
// DASHBOARD
// ------------------------------------------------
function pgDashboard() {
  var tot=ev.length,conf=0,ass=0,acP=0,mBat=0,mAbx=0,tC=0,tR=0,tCusto=0,vagas=0;
  for(var i=0;i<ev.length;i++){
    var e=ev[i];
    if(e.status==="Confirmado") conf++;
    if(e.status==="Contrato assinado") ass++;
    if(calcAcao(e.status)==="Entrar em contato") acP++;
    var m=calcMeta(e.tipo),r=calcRes(e.tipo,e.qtdVendida,m);
    if(r==="Meta batida") mBat++;
    if(r==="Abaixo da meta") mAbx++;
    tC+=parseFloat(e.valorContrato)||0;
    tR+=parseFloat(e.entrada)||0;
    var c=e.custos||{};
    tCusto+=(parseFloat(c.viagem)||0)+(parseFloat(c.imersao)||0)+(parseFloat(c.espaco)||0)+(parseFloat(c.outros)||0);
    (c.extras||[]).forEach(function(x){tCusto+=parseFloat(x.valor)||0;});
    if(e.vagasReservadas) vagas++;
  }
  var laU=leads.filter(function(l){return["Fechado - Virou Evento","Perdido"].indexOf(l.status)===-1;}).length;
  var byS=SFUNIL.map(function(s){return{s:s,n:ev.filter(function(e){return e.status===s;}).length};}).filter(function(x){return x.n>0;});
  var maxN=Math.max.apply(null,byS.map(function(x){return x.n;}).concat([1]));
  var urgEv=[];
  for(var i=0;i<ev.length;i++){var d=diff(ev[i].prazoAcao);if(d!==null&&d<=3&&["Evento concluido","Contrato assinado"].indexOf(ev[i].status)===-1) urgEv.push(ev[i]);}
  urgEv.sort(function(a,b){return(diff(a.prazoAcao)||99)-(diff(b.prazoAcao)||99);});
  urgEv=urgEv.slice(0,4);

  var h='<div class="kgrid">';
  [[tot,"Total Eventos","#2563EB"],[conf,"Confirmados","#059669"],[ass,"Ct. Assinados","#059669"],[acP,"Acao Pendente","#DC2626"],[mBat,"Metas Batidas","#059669"],[vagas,"Vagas Reserv.",vagas>0?"#D97706":"#9CA3AF"],[laU,"Leads Ativos","#7C3AED"],[par.length,"Parceiros","#6B7280"]].forEach(function(x){
    h+='<div class="kc"><div class="kc-l">'+x[1]+'</div><div class="kc-v" style="color:'+x[2]+'">'+x[0]+"</div></div>";
  });
  h+='</div><div class="kgrid">';
  h+='<div class="kc"><div class="kc-l">Total Contratos</div><div class="kc-v" style="color:#2563EB;font-size:15px">'+fmt(tC)+"</div></div>";
  h+='<div class="kc"><div class="kc-l">Recebido</div><div class="kc-v" style="color:#059669;font-size:15px">'+fmt(tR)+"</div></div>";
  h+='<div class="kc"><div class="kc-l">A Receber</div><div class="kc-v" style="color:#D97706;font-size:15px">'+fmt(tC-tR)+"</div></div>";
  h+='<div class="kc"><div class="kc-l">Custo Total</div><div class="kc-v" style="color:#DC2626;font-size:15px">'+fmt(tCusto)+"</div></div>";
  h+='</div><div style="display:grid;grid-template-columns:1.4fr 1fr;gap:13px;margin-bottom:12px">';
  h+='<div class="card"><div class="card-h"><span class="card-t">Funil Comercial</span></div><div class="card-b" style="padding:8px 14px">';
  byS.forEach(function(x){var c=SC[x.s]||["#F3F4F6","#6B7280"];h+='<div style="display:flex;align-items:center;gap:7px;margin-bottom:5px"><span style="font-size:10px;width:155px;flex-shrink:0">'+esc(x.s)+'</span><div style="flex:1;background:#F3F4F6;border-radius:3px;height:17px;overflow:hidden"><div style="width:'+Math.round(x.n/maxN*100)+'%;height:100%;background:'+c[0]+';border-left:3px solid '+c[1]+'"></div></div><span style="font-size:11px;font-weight:700;width:18px;text-align:right;color:'+c[1]+'">'+x.n+"</span></div>";});
  h+='</div></div>';
  h+='<div class="card"><div class="card-h"><span class="card-t" style="color:'+(urgEv.some(function(e){return diff(e.prazoAcao)<0;})?"#DC2626":"#0C1C36")+'">Acoes Urgentes</span></div><div class="card-b" style="padding:6px 12px">';
  if(!urgEv.length){h+='<p style="color:#9CA3AF;font-size:11px;padding:8px 0">Tudo em dia</p>';}
  urgEv.forEach(function(e){var d=diff(e.prazoAcao);h+='<div style="margin-bottom:6px;padding:7px 9px;border-radius:6px;background:'+(d<0?"#FEF2F2":d===0?"#FFFBEB":"#F0FDF4")+';border-left:3px solid '+(d<0?"#DC2626":d===0?"#D97706":"#059669")+'"><div style="display:flex;justify-content:space-between"><span style="font-size:11px;font-weight:600">'+esc(e.empresa)+'</span><span style="font-size:9px;font-weight:700;color:'+(d<0?"#DC2626":d===0?"#D97706":"#059669")+'">'+(d<0?Math.abs(d)+"d venc.":d===0?"hoje":d+"d")+'</span></div><p style="font-size:10px;color:#6B7280;margin-top:1px">'+esc(e.proximaAcao||"---")+"</p></div>";});
  h+='</div></div></div>';
  if(vagas>0){
    h+='<div class="card" style="border-color:#FDE68A"><div class="card-h" style="background:#FFFBEB"><span class="card-t" style="color:#92400E">Vagas Reservadas - Aguardando Fechamento</span></div><div class="tw-wrap"><div class="tw"><table><thead><tr><th>Empresa</th><th>Data</th><th>Valor</th><th>Fechamento</th><th>Status Contrato</th></tr></thead><tbody>';
    ev.filter(function(e){return e.vagasReservadas;}).forEach(function(e){h+='<tr><td style="font-weight:600">'+esc(e.empresa)+'</td><td>'+fD(e.data)+'</td><td style="color:#2563EB;font-weight:600">'+fmt(e.valorContrato)+'</td><td>'+esc(e.fechamentoCom)+'</td><td>'+esc(e.statusContrato)+'</td></tr>';});
    h+='</tbody></table></div></div></div>';
  }
  return h;
}

// ------------------------------------------------
// LEADS
// ------------------------------------------------
function pgLeads() {
  var h='<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;flex-wrap:wrap;gap:8px">';
  h+='<div class="chips" style="margin-bottom:0"><button class="chip'+(leadKanban?" on":"")+"\\" onclick=\\"setLeadKanban(true)\\">Kanban</button><button class=\\"chip"+(!leadKanban?" on":"")+"\\" onclick=\\"setLeadKanban(false)\\">Lista</button></div>";
  if(canEdit()) h+='<button class="btn bp" onclick="abrirLead(null)">+ Novo Lead</button>';
  h+='</div>';
  h+=leadKanban?renderLeadKanban():renderLeadLista();
  return h;
}
function renderLeadKanban() {
  var h='<div class="kanban">';
  LEAD_STATUS.forEach(function(col){
    var items=leads.filter(function(l){return l.status===col;});
    var c=LEAD_SC[col]||["#F3F4F6","#9CA3AF"];
    h+='<div class="kb-col"><div class="kb-head" style="background:'+c[0]+';color:'+c[1]+'">'+esc(col)+'<span style="background:'+c[1]+';color:'+c[0]+';border-radius:8px;font-size:9px;padding:1px 5px">'+items.length+'</span></div><div class="kb-body">';
    items.forEach(function(l){
      var d=diff(l.prazoAcao),urg=d!==null&&d<0;
      h+='<div class="kb-card" style="border-left-color:'+(urg?"#DC2626":c[1])+'" onclick="abrirLead(\\''+l.id+'\\')">';
      h+='<div style="font-size:12px;font-weight:700;margin-bottom:2px">'+esc(l.nome)+'</div>';
      h+='<div style="font-size:10px;color:#6B7280;margin-bottom:5px">'+esc(l.empresa)+' - '+esc(l.cidade)+'</div>';
      h+=pBdg(l.prioridade);
      if(l.proximaAcao) h+='<div style="margin-top:5px;font-size:10px;color:#6B7280;background:#F9FAFB;border-radius:4px;padding:3px 7px">-> '+esc(l.proximaAcao)+'</div>';
      if(d!==null) h+='<div style="margin-top:4px;font-size:10px;font-weight:700;color:'+(urg?"#DC2626":d===0?"#D97706":"#059669")+'">'+(urg?"!! "+Math.abs(d)+"d vencido":d===0?"Hoje":d+"d")+'</div>';
      if(canEdit()) {
        h+='<div style="display:flex;gap:4px;margin-top:7px">';
        var idx=LEAD_STATUS.indexOf(col);
        if(idx<LEAD_STATUS.length-2) h+='<button class="btn bp" style="font-size:10px;padding:3px 7px" onclick="event.stopPropagation();moverLead(\\''+l.id+'\\')">Avan&ccedil;ar</button>';
        if(col!=="Fechado - Virou Evento"&&col!=="Perdido") h+='<button class="btn bs" style="font-size:10px;padding:3px 7px" onclick="event.stopPropagation();virarEvento(\\''+l.id+'\\')">Evento</button>';
        h+='</div>';
      }
      h+='</div>';
    });
    if(canEdit()) h+='<button class="btn bs" style="width:100%;justify-content:center;font-size:11px;margin-top:3px" onclick="abrirLead(null,\\''+col+'\\')">+ Adicionar</button>';
    h+='</div></div>';
  });
  return h+'</div>';
}
function renderLeadLista() {
  var h='<div class="tw-wrap"><div class="tw"><table><thead><tr><th>Nome</th><th>Empresa</th><th>Cidade</th><th>Status</th><th>Prior.</th><th>Prazo</th><th></th></tr></thead><tbody>';
  if(!leads.length) h+='<tr><td colspan="7" style="text-align:center;padding:32px;color:#9CA3AF">Nenhum lead.</td></tr>';
  leads.forEach(function(l){
    var d=diff(l.prazoAcao),c=LEAD_SC[l.status]||["#F3F4F6","#9CA3AF"];
    h+='<tr><td style="font-weight:600">'+esc(l.nome)+'<div style="font-size:10px;color:#9CA3AF">'+esc(l.contato)+'</div></td><td>'+esc(l.empresa)+'</td><td>'+esc(l.cidade)+'</td>';
    h+='<td><span class="bdg" style="background:'+c[0]+';color:'+c[1]+'">'+esc(l.status)+'</span></td><td>'+pBdg(l.prioridade)+'</td>';
    h+='<td style="font-size:11px;font-weight:600;color:'+(d===null?"#9CA3AF":d<0?"#DC2626":d===0?"#D97706":"#374151")+'">'+(l.prazoAcao?(d<0?"!! "+Math.abs(d)+"d":d===0?"Hoje":fD(l.prazoAcao)):"---")+'</td>';
    h+='<td><div style="display:flex;gap:3px">';
    if(canEdit()&&l.status!=="Fechado - Virou Evento") h+='<button class="btn bp" style="font-size:10px;padding:3px 8px" onclick="virarEvento(\\''+l.id+'\\')">Evento</button>';
    if(canEdit()) h+='<button class="bi" onclick="abrirLead(\\''+l.id+'\\')">✎</button>';
    h+='</div></td></tr>';
  });
  return h+'</tbody></table></div></div>';
}
function moverLead(lid) {
  var l=null; for(var i=0;i<leads.length;i++) if(leads[i].id===lid){l=leads[i];break;}
  if(!l) return;
  var idx=LEAD_STATUS.indexOf(l.status);
  var next=LEAD_STATUS[Math.min(idx+1,LEAD_STATUS.length-1)];
  if(next===l.status) return;
  l.audit=(l.audit||[]).concat([{ts:nowStr(),campo:"Status",de:l.status,para:next}]);
  l.status=next;
  if(l.status==="Fechado - Virou Evento") criarEventoDoLead(l);
  else renderPage();
}
function virarEvento(lid) {
  var l=null; for(var i=0;i<leads.length;i++) if(leads[i].id===lid){l=leads[i];break;}
  if(!l) return;
  var old=l.status; l.status="Fechado - Virou Evento";
  l.audit=(l.audit||[]).concat([{ts:nowStr(),campo:"Status",de:old,para:"Fechado - Virou Evento"}]);
  criarEventoDoLead(l);
}
function criarEventoDoLead(l) {
  var novoEv={id:uid(),data:"",tipo:l.tipo||"",qtdVendida:"",cidade:l.cidade||"",empresa:l.empresa||"",responsavel:l.nome||"",funcao:"",contato:l.contato||"",status:"Contato Inicial",prioridade:l.prioridade||"Media",ultimoContato:today(),proximaAcao:"Agendar data do evento",prazoAcao:"",obs:l.interesse||"",linkRelacionado:"",valorContrato:"",entrada:"",statusContrato:"",fechamentoCom:"",vagasReservadas:false,
    fu:[{id:uid(),data:today(),tipo:"Conversao de Lead",contato:l.nome,resumo:"Lead convertido em evento. Empresa: "+l.empresa+". Interesse: "+(l.interesse||"---"),status:"Realizado",prox:"Agendar data do evento",prazo:""}],
    custos:{viagem:"",imersao:"",espaco:"",outros:"",extras:[]},obs_c:"",link_c:"",
    ck:{items:[{nome:"Som e Imagem",status:"Pendente",tipo:""},{nome:"Receptivo",status:"Pendente",tipo:""}],uber:"",hosp:"",alim:"",obs:""},
    audit:[{ts:nowStr(),campo:"Criacao",de:"---",para:"Criado do lead: "+l.nome+" ("+l.empresa+")"}]};
  ev.push(novoEv);
  tab="eventos"; renderAll();
  setTimeout(function(){showToast("Evento criado para "+l.empresa+"! Complete os dados.",4000);abrirEv(novoEv.id);},120);
}
function delLead(id){leads=leads.filter(function(l){return l.id!==id;});renderAll();}
function abrirLead(lid, preStatus) {
  var l=null; for(var i=0;i<leads.length;i++) if(leads[i].id===lid){l=leads[i];break;}
  var d=l||{id:uid(),nome:"",empresa:"",cidade:"",contato:"",tipo:"",interesse:"",status:preStatus||"Novo Lead",prioridade:"Media",proximaAcao:"",prazoAcao:"",obs:"",criadoEm:today(),audit:[]};
  document.getElementById("modalTitle").textContent=l?"Editar Lead":"Novo Lead";
  document.getElementById("modalBox").style.maxWidth="560px";
  var h='<div style="display:flex;flex-direction:column;gap:11px">';
  h+=sdiv("Dados do Lead");
  h+='<div class="g2">'+inpF("Nome","ld_nome",d.nome)+inpF("Empresa","ld_emp",d.empresa)+'</div>';
  h+='<div class="g3">'+inpF("Cidade","ld_cid",d.cidade)+inpF("Contato","ld_cont",d.contato)+selF("Tipo","ld_tipo",d.tipo,TIPOS)+'</div>';
  h+=taF("Interesse / Observacoes","ld_int",d.interesse||d.obs,3);
  h+=sdiv("Status");
  h+='<div class="g3">'+selF("Status","ld_st",d.status,LEAD_STATUS)+selF("Prioridade","ld_pr",d.prioridade,PRIOR)+inpF("Prazo Prox. Acao","ld_pa",d.prazoAcao,"date")+'</div>';
  h+=inpF("Proxima Acao","ld_pxa",d.proximaAcao);
  if(l&&(l.audit||[]).length){
    h+=sdiv("Historico");
    h+='<div style="background:#F9FAFB;border-radius:7px;padding:9px;max-height:100px;overflow-y:auto">';
    var au=[].concat(l.audit||[]).reverse();
    au.forEach(function(a){h+='<div class="audit-item"><span style="color:#6B7280;white-space:nowrap;min-width:130px">'+a.ts+'</span><span><b>'+a.campo+':</b> '+esc(a.de)+' > <b>'+esc(a.para)+'</b></span></div>';});
    h+='</div>';
  }
  h+='<div style="display:flex;gap:7px;justify-content:flex-end;padding-top:8px;border-top:1px solid #F3F4F6">';
  if(l&&l.status!=="Fechado - Virou Evento") h+='<button class="btn bs" onclick="closeModal();virarEvento(\\''+d.id+'\\')">Virar Evento</button>';
  h+='<button class="btn bs" onclick="closeModal()">Cancelar</button>';
  h+='<button class="btn bp" onclick="salvarLead(\\''+d.id+'\\','+(!l)+')">Salvar</button>';
  h+='</div></div>';
  document.getElementById("modalBody").innerHTML=h;
  openModal();
}
function salvarLead(lid,isNew){
  var old=null; for(var i=0;i<leads.length;i++) if(leads[i].id===lid){old=leads[i];break;}
  var nst=gv("ld_st");
  var audit=(old&&old.status!==nst)?(old.audit||[]).concat([{ts:nowStr(),campo:"Status",de:old.status,para:nst}]):(old&&old.audit||[]);
  var l={id:lid,nome:gv("ld_nome"),empresa:gv("ld_emp"),cidade:gv("ld_cid"),contato:gv("ld_cont"),tipo:gv("ld_tipo"),interesse:gv("ld_int"),status:nst,prioridade:gv("ld_pr"),proximaAcao:gv("ld_pxa"),prazoAcao:gv("ld_pa"),obs:"",criadoEm:isNew?today():(old&&old.criadoEm||today()),audit:audit};
  if(isNew) leads.push(l); else for(var i=0;i<leads.length;i++) if(leads[i].id===lid){leads[i]=l;break;}
  closeModal(); renderAll();
}

// ------------------------------------------------
// FOLLOW-UP
// ------------------------------------------------
function pgFollowup() {
  var ativ=ev.filter(function(e){return e.status!=="Evento concluido";});
  var urgC=ativ.filter(function(e){return urgCls(e.prazoAcao)==="fu-urg";}).length;
  var hojC=ativ.filter(function(e){return urgCls(e.prazoAcao)==="fu-hoj";}).length;
  var fil=ativ.filter(function(e){
    if(fuF==="urg") return urgCls(e.prazoAcao)==="fu-urg";
    if(fuF==="hoj") return urgCls(e.prazoAcao)==="fu-hoj";
    if(fuF==="prx") return ["fu-urg","fu-hoj","fu-ok"].indexOf(urgCls(e.prazoAcao))!==-1;
    return true;
  }).sort(function(a,b){return(diff(a.prazoAcao)||999)-(diff(b.prazoAcao)||999);});
  var h='<div class="chips">';
  [["todos","Todos"],["urg",urgC>0?"Vencidos ("+urgC+")":"Vencidos"],["hoj",hojC>0?"Hoje ("+hojC+")":"Hoje"],["prx","Proximos 3d"]].forEach(function(x){
    h+='<button class="chip'+(fuF===x[0]?" on":"")+'" onclick="setFuF(\\''+x[0]+'\\')">'+x[1]+'</button>';
  });
  h+='</div>';
  if(urgC>0) h+='<div class="alert al-r">!! '+urgC+' acao'+(urgC>1?"oes":"")+" vencida"+(urgC>1?"s":"")+" - entre em contato agora.</div>";
  if(hojC>0) h+='<div class="alert al-a">Hoje: '+hojC+' acao'+(hojC>1?"oes":"")+" com prazo hoje.</div>";
  h+='<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:9px">';
  fil.forEach(function(e){
    var u=urgCls(e.prazoAcao),d=diff(e.prazoAcao);
    var last=(e.fu||[]).slice(-1)[0];
    h+='<div class="fc '+u+'" onclick="openFuModal(\\''+e.id+'\\')">';
    h+='<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:7px"><div><div style="font-size:12px;font-weight:700">'+esc(e.empresa)+'</div><div style="font-size:10px;color:#6B7280;margin-top:1px">'+esc(e.cidade)+' - '+esc(e.tipo)+'</div></div>';
    h+='<div style="display:flex;flex-direction:column;align-items:flex-end;gap:3px">'+sBdg(e.status)+pBdg(e.prioridade)+'</div></div>';
    if(e.proximaAcao) h+='<div style="background:#F9FAFB;border-radius:5px;padding:5px 8px;margin-bottom:7px;border:1px solid #F3F4F6"><div style="font-size:9px;font-weight:700;color:#9CA3AF;text-transform:uppercase;letter-spacing:.4px;margin-bottom:1px">Proxima Acao</div><div style="font-size:11px;font-weight:600">'+esc(e.proximaAcao)+'</div></div>';
    h+='<div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:10px;font-weight:700;color:'+(u==="fu-urg"?"#DC2626":u==="fu-hoj"?"#D97706":u==="fu-ok"?"#059669":"#9CA3AF")+'">'+(e.prazoAcao?(d<0?"!! "+Math.abs(d)+"d venc.":d===0?"Hoje":d===1?"Amanha":d+"d"):"Sem prazo")+'</span>';
    h+='<button class="btn bp" style="font-size:10px;padding:4px 9px" onclick="event.stopPropagation();openFuModal(\\''+e.id+'\\')">+ Follow-up</button></div>';
    if(last) h+='<div style="margin-top:7px;padding-top:6px;border-top:1px solid #F3F4F6;font-size:10px;color:#9CA3AF"><b>Ultimo:</b> '+fD(last.data)+' - '+esc(last.tipo)+' - '+esc((last.resumo||"").slice(0,55))+'</div>';
    h+='</div>';
  });
  if(!fil.length) h+='<div style="grid-column:1/-1;padding:36px;text-align:center;color:#9CA3AF">Nenhum evento para este filtro.</div>';
  return h+'</div>';
}
function openFuModal(eid) {
  var e=null; for(var i=0;i<ev.length;i++) if(ev[i].id===eid){e=ev[i];break;}
  if(!e) return;
  var rest=(parseFloat(e.valorContrato)||0)-(parseFloat(e.entrada)||0);
  var fuSts={"Realizado":["#D1FAE5","#065F46"],"Aguardando resposta":["#FEF3C7","#92400E"],"Sem resposta":["#FEE2E2","#991B1B"]};
  var hist=[].concat(e.fu||[]).reverse();
  document.getElementById("modalTitle").textContent="Follow-up - "+e.empresa;
  document.getElementById("modalBox").style.maxWidth="860px";
  var h='<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">';
  h+='<div><div style="background:#F9FAFB;border-radius:8px;border:1px solid #E5E7EB;padding:12px;margin-bottom:12px">';
  [["Data",fD(e.data)],["Cidade",e.cidade],["Tipo",e.tipo],["Empresa",e.empresa],["Responsavel",e.responsavel],["Contato",e.contato],["Contrato",fmt(e.valorContrato)],["Entrada",fmt(e.entrada)],["Restante",fmt(rest)]].forEach(function(x){
    h+='<div class="drow"><span class="dk">'+x[0]+'</span><span class="dv">'+esc(x[1])+'</span></div>';
  });
  h+=fbar(e.status)+'</div>';
  h+='<div style="font-size:11px;font-weight:700;color:#0C1C36;margin-bottom:9px">Historico ('+hist.length+')</div>';
  if(!hist.length) h+='<p style="font-size:11px;color:#9CA3AF;font-style:italic">Nenhum follow-up.</p>';
  hist.forEach(function(f,i){
    h+='<div class="tl"><div style="display:flex;flex-direction:column;align-items:center"><div class="tl-dot"></div>'+(i<hist.length-1?'<div class="tl-line"></div>':'')+'</div>';
    h+='<div style="flex:1;padding-bottom:'+(i<hist.length-1?10:0)+'px"><div style="display:flex;justify-content:space-between;margin-bottom:2px"><span style="font-size:11px;font-weight:700">'+esc(f.tipo)+'</span><span style="font-size:9px;color:#9CA3AF">'+fD(f.data)+'</span></div>';
    if(f.contato) h+='<span style="font-size:9px;color:#9CA3AF">com '+esc(f.contato)+' - </span>';
    h+=bdg(f.status,fuSts);
    if(f.resumo) h+='<p style="font-size:11px;margin:3px 0">'+esc(f.resumo)+'</p>';
    if(f.prox) h+='<div style="padding:3px 7px;background:#EFF6FF;border-radius:5px;font-size:10px;color:#2563EB;font-weight:600">-> '+esc(f.prox)+(f.prazo?" ate "+fD(f.prazo):"")+'</div>';
    h+='</div></div>';
  });
  h+='</div><div>';
  h+='<div style="font-size:11px;font-weight:700;color:#0C1C36;margin-bottom:10px">Novo Follow-up</div>';
  h+='<div style="display:flex;flex-direction:column;gap:9px">';
  h+='<div class="g3">'+inpF("Data","fu_d",today(),"date")+selF("Tipo","fu_t","WhatsApp",FTIPOS)+inpF("Com quem","fu_c",e.responsavel)+'</div>';
  h+=taF("Resumo do contato","fu_r","",3);
  h+='<div class="g2">'+inpF("Proxima Acao","fu_pa","")+inpF("Prazo","fu_pp","","date")+'</div>';
  h+=selF("Status","fu_s","Realizado",["Realizado","Aguardando resposta","Sem resposta"]);
  h+='<div style="display:flex;gap:7px;justify-content:flex-end;padding-top:7px;border-top:1px solid #F3F4F6">';
  h+='<button class="btn bs" onclick="closeModal()">Cancelar</button>';
  h+='<button class="btn bp" onclick="salvarFU(\\''+e.id+'\\')">Registrar</button>';
  h+='</div></div></div></div>';
  document.getElementById("modalBody").innerHTML=h;
  openModal();
}
function salvarFU(eid){
  var fu={id:uid(),data:gv("fu_d"),tipo:gv("fu_t"),contato:gv("fu_c"),resumo:gv("fu_r"),prox:gv("fu_pa"),prazo:gv("fu_pp"),status:gv("fu_s")};
  for(var i=0;i<ev.length;i++){
    if(ev[i].id===eid){
      ev[i].fu=(ev[i].fu||[]).concat([fu]);
      ev[i].ultimoContato=fu.data;
      if(fu.prox) ev[i].proximaAcao=fu.prox;
      if(fu.prazo) ev[i].prazoAcao=fu.prazo;
      break;
    }
  }
  closeModal(); renderAll();
}

// ------------------------------------------------
// EVENTOS
// ------------------------------------------------
function pgEventos() {
  var cids=[];
  ev.forEach(function(e){if(e.cidade&&cids.indexOf(e.cidade)===-1) cids.push(e.cidade);});
  var fil=ev.filter(function(e){
    if(evF.s&&e.status!==evF.s) return false;
    if(evF.t&&e.tipo!==evF.t) return false;
    if(evF.c&&e.cidade!==evF.c) return false;
    if(evF.q){var q=evF.q.toLowerCase();return(e.empresa||"").toLowerCase().indexOf(q)!==-1||(e.cidade||"").toLowerCase().indexOf(q)!==-1||(e.responsavel||"").toLowerCase().indexOf(q)!==-1;}
    return true;
  }).sort(function(a,b){return(a.data||"").localeCompare(b.data||"");});
  var h='<div class="filter-row">';
  h+='<input class="inp" placeholder="Buscar..." value="'+esc(evF.q)+'" oninput="evF.q=this.value;renderPage()" style="flex:1;min-width:160px">';
  h+='<select class="inp" style="width:auto" onchange="evF.s=this.value;renderPage()"><option value="">Todos status</option>'+SFUNIL.map(function(s){return'<option'+(evF.s===s?" selected":"")+'>'+esc(s)+'</option>';}).join("")+'</select>';
  h+='<select class="inp" style="width:auto" onchange="evF.t=this.value;renderPage()"><option value="">Todos tipos</option>'+TIPOS.map(function(t){return'<option'+(evF.t===t?" selected":"")+'>'+esc(t)+'</option>';}).join("")+'</select>';
  h+='<select class="inp" style="width:auto" onchange="evF.c=this.value;renderPage()"><option value="">Todas cidades</option>'+cids.map(function(c){return'<option'+(evF.c===c?" selected":"")+'>'+esc(c)+'</option>';}).join("")+'</select>';
  if(canEdit()) h+='<button class="btn bp" onclick="abrirEv(null)">+ Novo Evento</button>';
  h+='</div><div class="tw-wrap"><div class="tw"><table><thead><tr><th>Data</th><th>Trava</th><th>Empresa</th><th>Cidade</th><th>Tipo</th><th>Status</th><th>Acao</th><th>Prior.</th><th>Result.</th><th>Contrato</th><th>Prazo</th><th>CK</th><th></th></tr></thead><tbody>';
  if(!fil.length) h+='<tr><td colspan="13" style="text-align:center;padding:32px;color:#9CA3AF">Nenhum evento.</td></tr>';
  fil.forEach(function(e){
    var meta=calcMeta(e.tipo),res=calcRes(e.tipo,e.qtdVendida,meta),acao=calcAcao(e.status),trava=calcTrava(e.data);
    var d=diff(e.prazoAcao),isW=d!==null&&d<0&&["Evento concluido","Contrato assinado"].indexOf(e.status)===-1;
    var rest=(parseFloat(e.valorContrato)||0)-(parseFloat(e.entrada)||0);
    var ckItems=e.ck&&e.ck.items||[];
    var ckPend=ckItems.some(function(x){return x.status==="Pendente"||x.status==="Em andamento";});
    var conflicts=checkConflicts(e.data,e.id);
    h+='<tr style="'+(isW?"background:#FFF8F8":"")+'"><td style="white-space:nowrap;font-weight:600;font-size:11px">'+fD(e.data)+(conflicts.length?'<span class="conf-bdg" onclick="alert(\\'Conflito com: '+conflicts.map(function(c){return esc(c.empresa);}).join(", ")+'\\')">!! conflito</span>':'')+'</td>';
    h+='<td style="font-size:10px;color:#9CA3AF;white-space:nowrap">'+esc(trava)+'</td>';
    h+='<td><div style="font-weight:600;font-size:12px">'+esc(e.empresa)+'</div><div style="font-size:10px;color:#9CA3AF">'+esc(e.responsavel)+'</div></td>';
    h+='<td>'+esc(e.cidade)+'</td><td><span class="bdg" style="background:#EFF6FF;color:#2563EB">'+esc(e.tipo)+'</span></td>';
    h+='<td>'+sBdg(e.status)+fbar(e.status,70)+'</td>';
    h+='<td>'+bdg(acao,{"Entrar em contato":["#FEE2E2","#991B1B"],"Acompanhar / OK":["#D1FAE5","#065F46"]})+'</td>';
    h+='<td>'+pBdg(e.prioridade)+'</td>';
    h+='<td>'+(res?bdg(res,{"Meta batida":["#D1FAE5","#065F46"],"Abaixo da meta":["#FEE2E2","#991B1B"],"Nao se aplica":["#F3F4F6","#9CA3AF"]}):"")+'</td>';
    h+='<td style="font-size:11px"><div style="color:#2563EB;font-weight:600">'+fmt(e.valorContrato)+'</div><div style="font-size:10px;color:'+(rest>0?"#D97706":"#059669")+'">Rest: '+fmt(rest)+'</div></td>';
    h+='<td style="font-size:11px;font-weight:600;color:'+(d===null?"#9CA3AF":d<0?"#DC2626":d===0?"#D97706":"#374151")+'">'+(e.prazoAcao?(d<0?"!! "+Math.abs(d)+"d":d===0?"Hoje":fD(e.prazoAcao)):"---")+'</td>';
    h+='<td>'+bdg(ckPend?"Pendente":"OK",{"Pendente":["#FEE2E2","#991B1B"],"OK":["#D1FAE5","#065F46"]})+'</td>';
    h+='<td><div style="display:flex;gap:3px"><button class="bi" onclick="abrirDetalhe(\\''+e.id+'\\')" title="Ver detalhes">👁</button>';
    if(canEdit()) h+='<button class="bi" onclick="abrirEv(\\''+e.id+'\\')">✎</button><button class="bi" style="color:#DC2626;border-color:#FCA5A5" onclick="delEv(\\''+e.id+'\\')">🗑</button>';
    h+='</div></td></tr>';
  });
  h+='</tbody></table></div></div>';
  return h;
}
function delEv(id){if(confirm("Remover este evento?")){ev=ev.filter(function(e){return e.id!==id;});renderAll();}}

function abrirDetalhe(eid) {
  var e=null; for(var i=0;i<ev.length;i++) if(ev[i].id===eid){e=ev[i];break;}
  if(!e) return;
  var rest=(parseFloat(e.valorContrato)||0)-(parseFloat(e.entrada)||0);
  var c=e.custos||{};
  var tot=(parseFloat(c.viagem)||0)+(parseFloat(c.imersao)||0)+(parseFloat(c.espaco)||0)+(parseFloat(c.outros)||0);
  (c.extras||[]).forEach(function(x){tot+=parseFloat(x.valor)||0;});
  var fuSts={"Realizado":["#D1FAE5","#065F46"],"Aguardando resposta":["#FEF3C7","#92400E"],"Sem resposta":["#FEE2E2","#991B1B"]};
  var hist=[].concat(e.fu||[]).reverse();
  var ckItems=e.ck&&e.ck.items||[];
  var conflicts=checkConflicts(e.data,e.id);
  document.getElementById("modalTitle").textContent="Detalhes - "+e.empresa;
  document.getElementById("modalBox").style.maxWidth="800px";
  var h='<div class="tab-bar">'+["Visao Geral","Checklist","Follow-ups ("+hist.length+")","Custos","Auditoria ("+((e.audit||[]).length)+")"].map(function(l,i){return'<button class="tab-btn'+(i===0?" on":"")+'" id="dt'+i+'" onclick="showDT('+i+')">'+l+'</button>';}).join("")+'</div>';
  if(conflicts.length) h+='<div class="alert al-a">!! Esta data conflita com: '+conflicts.map(function(c){return'<b>'+esc(c.empresa)+'</b> ('+fD(c.data)+')';}).join(", ")+'. Verifique a agenda antes de confirmar.</div>';
  // Tab 0
  h+='<div id="dtp0"><div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">';
  h+='<div>'+sdiv("Dados");
  [["Data",fD(e.data)],["Trava",calcTrava(e.data)],["Tipo",e.tipo],["Cidade",e.cidade],["Empresa",e.empresa],["Responsavel",e.responsavel+" - "+e.funcao],["Contato",e.contato]].forEach(function(x){h+='<div class="drow"><span class="dk">'+x[0]+'</span><span class="dv">'+esc(x[1])+'</span></div>';});
  h+='</div><div>'+sdiv("Contrato");
  [["Valor",fmt(e.valorContrato)],["Entrada",fmt(e.entrada)],["Restante",fmt(rest)],["Status Contrato",e.statusContrato||"---"],["Fechamento",e.fechamentoCom||"---"],["Vagas Reservadas",e.vagasReservadas?"Sim":"Nao"]].forEach(function(x){h+='<div class="drow"><span class="dk">'+x[0]+'</span><span class="dv">'+esc(x[1])+'</span></div>';});
  h+=sdiv("Status")+sBdg(e.status)+" "+pBdg(e.prioridade)+fbar(e.status);
  [["Acao Nec.",calcAcao(e.status)],["Proxima Acao",e.proximaAcao||"---"],["Prazo",fD(e.prazoAcao)]].forEach(function(x){h+='<div class="drow"><span class="dk">'+x[0]+'</span><span class="dv">'+esc(x[1])+'</span></div>';});
  h+='</div></div></div>';
  // Tab 1 CK
  h+='<div id="dtp1" style="display:none"><div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">';
  h+='<div><div style="font-size:9px;font-weight:700;color:#9CA3AF;text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px">Itens</div>';
  if(!ckItems.length) h+='<p style="font-size:11px;color:#9CA3AF;font-style:italic">Sem itens</p>';
  ckItems.forEach(function(it){var cc=CKC[it.status]||["#F3F4F6","#9CA3AF"];h+='<div class="ck-row" style="background:'+cc[0]+'22"><div><div style="font-size:11px;font-weight:600">'+esc(it.nome)+'</div>'+(it.tipo?'<div style="font-size:9px;color:#9CA3AF">'+esc(it.tipo)+'</div>':'')+'</div><span class="bdg" style="background:'+cc[0]+';color:'+cc[1]+'">'+esc(it.status)+'</span></div>';});
  h+='</div><div><div style="font-size:9px;font-weight:700;color:#9CA3AF;text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px">Despesas</div>';
  [["Uber",e.ck&&e.ck.uber,DC],["Hospedagem",e.ck&&e.ck.hosp,DC],["Alimentacao",e.ck&&e.ck.alim,DC]].filter(function(x){return x[1];}).forEach(function(x){var cc=x[2][x[1]]||["#F3F4F6","#9CA3AF"];h+='<div class="ck-row" style="background:'+cc[0]+'22"><div style="font-size:11px;font-weight:600">'+x[0]+'</div><span class="bdg" style="background:'+cc[0]+';color:'+cc[1]+'">'+esc(x[1])+'</span></div>';});
  h+='</div></div></div>';
  // Tab 2 FU
  h+='<div id="dtp2" style="display:none">';
  if(!hist.length) h+='<p style="font-size:11px;color:#9CA3AF;font-style:italic">Nenhum follow-up.</p>';
  hist.forEach(function(f,i){h+='<div class="tl"><div style="display:flex;flex-direction:column;align-items:center"><div class="tl-dot"></div>'+(i<hist.length-1?'<div class="tl-line"></div>':'')+'</div><div style="flex:1;padding-bottom:'+(i<hist.length-1?10:0)+'px"><div style="display:flex;justify-content:space-between;margin-bottom:2px"><span style="font-size:11px;font-weight:700">'+esc(f.tipo)+'</span><span style="font-size:9px;color:#9CA3AF">'+fD(f.data)+'</span></div>'+(f.contato?'<span style="font-size:9px;color:#9CA3AF">com '+esc(f.contato)+' - </span>':'')+bdg(f.status,fuSts)+(f.resumo?'<p style="font-size:11px;margin:3px 0">'+esc(f.resumo)+'</p>':'')+(f.prox?'<div style="padding:3px 7px;background:#EFF6FF;border-radius:5px;font-size:10px;color:#2563EB;font-weight:600">-> '+esc(f.prox)+(f.prazo?" ate "+fD(f.prazo):"")+'</div>':'')+'</div></div>';});
  h+='</div>';
  // Tab 3 Custos
  h+='<div id="dtp3" style="display:none">';
  [["Viagem",c.viagem,"#D97706"],["Imersao",c.imersao,"#7C3AED"],["Espaco",c.espaco,"#2563EB"],["Outros",c.outros,"#6B7280"]].forEach(function(x){h+='<div class="drow"><span class="dk">'+x[0]+'</span><span class="dv" style="color:'+x[2]+'">'+fmt(x[1])+'</span></div>';});
  (c.extras||[]).forEach(function(x){h+='<div class="drow"><span class="dk">+ '+esc(x.nome)+'</span><span class="dv">'+fmt(x.valor)+'</span></div>';});
  h+='<div style="padding:7px 0;display:flex;justify-content:space-between;font-weight:700;border-top:2px solid #F3F4F6;margin-top:4px"><span>Total</span><span style="color:#DC2626">'+fmt(tot)+'</span></div></div>';
  // Tab 4 Audit
  h+='<div id="dtp4" style="display:none">';
  var au=[].concat(e.audit||[]).reverse();
  if(!au.length) h+='<p style="font-size:11px;color:#9CA3AF;font-style:italic">Nenhuma alteracao registrada.</p>';
  au.forEach(function(a){h+='<div class="audit-item"><span style="color:#9CA3AF;white-space:nowrap;min-width:140px">'+a.ts+'</span><span><b>'+a.campo+':</b> '+esc(a.de)+' > <b style="color:#2563EB">'+esc(a.para)+'</b></span></div>';});
  h+='</div>';
  // Footer
  h+='<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;padding-top:10px;border-top:1px solid #F3F4F6;margin-top:10px">';
  h+='<div style="display:flex;gap:6px;flex-wrap:wrap"><a class="gcal-btn" href="#" onclick="openGcal(\\''+e.id+'\\',\\'diego\\');return false">📅 Agenda Diego</a><a class="gcal-btn" href="#" onclick="openGcal(\\''+e.id+'\\',\\'producao\\');return false">📅 Agenda Producao</a></div>';
  h+='<div style="display:flex;gap:6px"><button class="btn bs" onclick="closeModal()">Fechar</button>'+(canEdit()?'<button class="btn bp" onclick="closeModal();abrirEv(\\''+e.id+'\\')">Editar</button>':'')+'</div></div>';
  document.getElementById("modalBody").innerHTML=h;
  openModal();
}
function showDT(n){for(var i=0;i<5;i++){var b=document.getElementById("dt"+i),p=document.getElementById("dtp"+i);if(b)b.classList.toggle("on",i===n);if(p)p.style.display=i===n?"block":"none";}}

function abrirEv(eid) {
  var e=null; for(var i=0;i<ev.length;i++) if(ev[i].id===eid){e=ev[i];break;}
  var d=e||{id:uid(),data:"",tipo:"",qtdVendida:"",cidade:"",empresa:"",responsavel:"",funcao:"",contato:"",status:"Contato Inicial",prioridade:"Media",ultimoContato:"",proximaAcao:"",prazoAcao:"",obs:"",linkRelacionado:"",valorContrato:"",entrada:"",statusContrato:"",fechamentoCom:"",vagasReservadas:false,fu:[],custos:{viagem:"",imersao:"",espaco:"",outros:"",extras:[]},obs_c:"",link_c:"",ck:{items:[{nome:"Som e Imagem",status:"Pendente",tipo:""},{nome:"Receptivo",status:"Pendente",tipo:""}],uber:"",hosp:"",alim:"",obs:""},audit:[]};
  var meta=calcMeta(d.tipo),rest=(parseFloat(d.valorContrato)||0)-(parseFloat(d.entrada)||0);
  var res=calcRes(d.tipo,d.qtdVendida,meta),acao=calcAcao(d.status),trava=calcTrava(d.data);
  var limck=calcLimCK(d.tipo,d.data);
  var ck=d.ck||{},ckItems=ck.items||[],extras=(d.custos&&d.custos.extras)||[];
  document.getElementById("modalTitle").textContent=e?"Editar Evento":"Novo Evento";
  document.getElementById("modalBox").style.maxWidth="860px";
  var h='<div style="display:flex;flex-direction:column;gap:14px">';
  h+=sdiv("Dados do Evento");
  h+='<div class="g3">'+inpF("Data","ev_data",d.data,"date")+selF("Tipo","ev_tipo",d.tipo,TIPOS)+autoF("Trava (auto)",trava,"")+'</div>';
  h+='<div class="g2">'+inpF("Cidade","ev_cidade",d.cidade)+inpF("Empresa / Contratante","ev_emp",d.empresa)+'</div>';
  h+='<div id="ev_conf"></div>';
  h+='<div class="g3">'+inpF("Responsavel","ev_resp",d.responsavel)+selF("Funcao","ev_func",d.funcao,FUNCOES)+inpF("Contato","ev_cont",d.contato)+'</div>';
  if(d.tipo!=="Evento Fechado"){
    h+=sdiv("Meta e Publico");
    h+='<div class="g3">'+autoF("Meta de Publico (auto)",meta?meta+" pessoas":"---","")+inpF("Qtd. Vendida","ev_qtd",d.qtdVendida,"number")+autoF("Resultado (auto)",res||"---","")+'</div>';
  }
  h+=sdiv("Contrato e Pagamento");
  h+='<div class="g4">'+inpF("Valor Contrato (R$)","ev_vc",d.valorContrato,"number")+inpF("Entrada (R$)","ev_ent",d.entrada,"number")+autoF("Restante (auto)",fmt(rest),"")+selF("Fechamento com","ev_fch",d.fechamentoCom,["Diego","Producao"])+'</div>';
  h+='<div class="g3">'+selF("Status do Contrato","ev_sc",d.statusContrato,SCONT)+'<div class="fg"><span class="lb">Vagas Reservadas?</span><div style="display:flex;gap:16px;padding-top:7px">'+["Sim","Nao"].map(function(o){return'<label style="display:flex;gap:5px;align-items:center;font-size:12px;cursor:pointer"><input type="radio" name="ev_vag" value="'+(o==="Sim")+'"'+(d.vagasReservadas===(o==="Sim")?" checked":"")+">"+o+'</label>';}).join("")+'</div></div>'+inpF("Link","ev_link",d.linkRelacionado)+'</div>';
  h+=sdiv("Status Comercial");
  h+='<div class="g4">'+selF("Status","ev_st",d.status,SFUNIL)+selF("Prioridade","ev_pr",d.prioridade,PRIOR)+inpF("Ultimo Contato","ev_uc",d.ultimoContato,"date")+inpF("Prazo Prox. Acao","ev_pa",d.prazoAcao,"date")+'</div>';
  h+='<div class="g2">'+autoF("Acao Necessaria (auto)",acao||"---","")+" "+inpF("Proxima Acao","ev_pxa",d.proximaAcao)+'</div>';
  h+=taF("Observacoes","ev_obs",d.obs);
  h+=sdiv("Checklist Operacional");
  h+='<div style="background:#F9FAFB;border-radius:8px;border:1px solid #E5E7EB;padding:13px">';
  if(limck) h+='<div style="margin-bottom:10px;display:inline-flex;align-items:center;gap:5px;padding:4px 10px;background:#FFFBEB;border-radius:5px;font-size:10px;color:#92400E;font-weight:500;border:1px solid #FDE68A">Data limite CK: '+fD(limck)+'</div>';
  h+='<div id="ck_items_container">';
  ckItems.forEach(function(it,i){h+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr auto;gap:7px;margin-bottom:6px;align-items:center"><input class="inp" id="cki_n_'+i+'" value="'+esc(it.nome)+'" placeholder="Nome"><select class="inp" id="cki_s_'+i+'">'+CKO.map(function(o){return'<option'+(o===it.status?" selected":"")+'>'+esc(o)+'</option>';}).join("")+'</select><input class="inp" id="cki_t_'+i+'" value="'+esc(it.tipo||"")+'" placeholder="Tipo/detalhe"><button class="bi" style="color:#DC2626;border-color:#FCA5A5" onclick="this.closest(\\'div\\').remove()">x</button></div>';});
  h+='</div><button class="btn bs" style="font-size:11px;margin-top:4px" onclick="addCkItem()">+ Item</button>';
  h+='<div style="margin-top:10px;font-size:9px;font-weight:700;color:#9CA3AF;text-transform:uppercase;margin-bottom:7px">Despesas</div>';
  h+='<div class="g3">'+selF("Uber","ck_uber",ck.uber,DESPO)+selF("Hospedagem","ck_hosp",ck.hosp,DESPO)+selF("Alimentacao","ck_alim",ck.alim,DESPO)+'</div>';
  h+=taF("Obs. Checklist","ck_obs",ck.obs);
  h+='</div>';
  h+=sdiv("Custos do Evento");
  h+='<div class="g4">'+inpF("Viagem (R$)","cu_v",d.custos&&d.custos.viagem,"number")+inpF("Imersao (R$)","cu_i",d.custos&&d.custos.imersao,"number")+inpF("Espaco (R$)","cu_e",d.custos&&d.custos.espaco,"number")+inpF("Outros (R$)","cu_o",d.custos&&d.custos.outros,"number")+'</div>';
  h+='<div id="cu_extras">';
  extras.forEach(function(x,i){h+='<div style="display:grid;grid-template-columns:1fr 1fr auto;gap:8px;margin-bottom:6px;align-items:center"><input class="inp" id="cx_n_'+i+'" value="'+esc(x.nome)+'" placeholder="Nome do custo extra"><input class="inp" id="cx_v_'+i+'" type="number" value="'+(x.valor||"")+'"><button class="bi" style="color:#DC2626;border-color:#FCA5A5" onclick="this.closest(\\'div\\').remove()">x</button></div>';});
  h+='</div><button class="btn bs" style="font-size:11px" onclick="addExtra()">+ Custo extra</button>';
  h+='<div style="display:flex;gap:7px;justify-content:flex-end;padding-top:10px;border-top:1px solid #F3F4F6;margin-top:6px">';
  h+='<button class="btn bs" onclick="closeModal()">Cancelar</button>';
  h+='<button class="btn bp" onclick="salvarEv(\\''+d.id+'\\','+(!e)+')">Salvar Evento</button>';
  h+='</div></div>';
  document.getElementById("modalBody").innerHTML=h;
  openModal();
  var evDataEl=document.getElementById("ev_data");
  if(evDataEl){
    evDataEl.addEventListener("change",function(){
      var cfls=checkConflicts(this.value,d.id),w=document.getElementById("ev_conf");
      if(w) w.innerHTML=cfls.length?'<div class="alert al-a">!! Conflito! Bate com: '+cfls.map(function(c){return'<b>'+esc(c.empresa)+'</b> (trava: '+c.trava+')';}).join(", ")+'. Verifique a agenda.</div>':"";
    });
  }
}
function addCkItem(){
  var cont=document.getElementById("ck_items_container");if(!cont)return;
  var idx=cont.querySelectorAll("[id^='cki_n_']").length;
  var div=document.createElement("div");
  div.style.cssText="display:grid;grid-template-columns:1fr 1fr 1fr auto;gap:7px;margin-bottom:6px;align-items:center";
  div.innerHTML='<input class="inp" id="cki_n_'+idx+'" placeholder="Nome do item"><select class="inp" id="cki_s_'+idx+'">'+CKO.map(function(o){return'<option>'+esc(o)+'</option>';}).join("")+'</select><input class="inp" id="cki_t_'+idx+'" placeholder="Tipo/detalhe"><button class="bi" style="color:#DC2626;border-color:#FCA5A5" onclick="this.closest(\\'div\\').remove()">x</button>';
  cont.appendChild(div);
}
function addExtra(){
  var cont=document.getElementById("cu_extras");if(!cont)return;
  var idx=cont.querySelectorAll("[id^='cx_n_']").length;
  var div=document.createElement("div");
  div.style.cssText="display:grid;grid-template-columns:1fr 1fr auto;gap:8px;margin-bottom:6px;align-items:center";
  div.innerHTML='<input class="inp" id="cx_n_'+idx+'" placeholder="Nome do custo extra"><input class="inp" id="cx_v_'+idx+'" type="number"><button class="bi" style="color:#DC2626;border-color:#FCA5A5" onclick="this.closest(\\'div\\').remove()">x</button>';
  cont.appendChild(div);
}
function salvarEv(eid,isNew){
  var oldE=null; for(var i=0;i<ev.length;i++) if(ev[i].id===eid){oldE=ev[i];break;}
  var vag=document.querySelector("input[name='ev_vag']:checked");
  vag=vag?vag.value==="true":false;
  var nst=gv("ev_st"),nent=gv("ev_ent"),nvc=gv("ev_vc");
  var audit=[].concat(oldE&&oldE.audit||[]);
  if(oldE){
    if(oldE.status!==nst) audit.push({ts:nowStr(),campo:"Status",de:oldE.status,para:nst});
    if(String(oldE.entrada)!==nent&&nent) audit.push({ts:nowStr(),campo:"Entrada",de:fmt(oldE.entrada),para:fmt(nent)});
    if(String(oldE.valorContrato)!==nvc&&nvc) audit.push({ts:nowStr(),campo:"Valor Contrato",de:fmt(oldE.valorContrato),para:fmt(nvc)});
  }
  var ckCont=document.getElementById("ck_items_container"),ckItems=[];
  if(ckCont){ckCont.querySelectorAll("[id^='cki_n_']").forEach(function(el){var i=el.id.split("_").pop(),nome=el.value.trim();if(nome)ckItems.push({nome:nome,status:gv("cki_s_"+i)||"Pendente",tipo:gv("cki_t_"+i)||""}); });}
  var exCont=document.getElementById("cu_extras"),extras=[];
  if(exCont){exCont.querySelectorAll("[id^='cx_n_']").forEach(function(el){var i=el.id.split("_").pop(),nome=el.value.trim();if(nome)extras.push({nome:nome,valor:parseFloat(gv("cx_v_"+i))||0});});}
  var e={id:eid,data:gv("ev_data"),tipo:gv("ev_tipo"),qtdVendida:parseFloat(gv("ev_qtd"))||0,cidade:gv("ev_cidade"),empresa:gv("ev_emp"),responsavel:gv("ev_resp"),funcao:gv("ev_func"),contato:gv("ev_cont"),status:nst,prioridade:gv("ev_pr"),ultimoContato:gv("ev_uc"),proximaAcao:gv("ev_pxa"),prazoAcao:gv("ev_pa"),obs:gv("ev_obs"),linkRelacionado:gv("ev_link"),valorContrato:parseFloat(nvc)||0,entrada:parseFloat(nent)||0,statusContrato:gv("ev_sc"),fechamentoCom:gv("ev_fch"),vagasReservadas:vag,fu:isNew?[]:(oldE&&oldE.fu||[]),
    custos:{viagem:parseFloat(gv("cu_v"))||0,imersao:parseFloat(gv("cu_i"))||0,espaco:parseFloat(gv("cu_e"))||0,outros:parseFloat(gv("cu_o"))||0,extras:extras},
    obs_c:isNew?"":(oldE&&oldE.obs_c||""),link_c:isNew?"":(oldE&&oldE.link_c||""),
    ck:{items:ckItems,uber:gv("ck_uber"),hosp:gv("ck_hosp"),alim:gv("ck_alim"),obs:gv("ck_obs")},audit:audit};
  if(isNew) ev.push(e); else for(var i=0;i<ev.length;i++) if(ev[i].id===eid){ev[i]=e;break;}
  closeModal(); renderAll();
}

// ------------------------------------------------
// CHECKLIST
// ------------------------------------------------
function pgChecklist(){
  var evs=ev.filter(function(e){return e.data;}).sort(function(a,b){return(a.data||"").localeCompare(b.data||"");});
  if(!evs.length) return '<p style="color:#9CA3AF;text-align:center;padding:36px">Nenhum evento cadastrado.</p>';
  var h="";
  evs.forEach(function(e){
    var ck=e.ck||{},items=ck.items||[],limck=calcLimCK(e.tipo,e.data);
    var allOk=items.length>0&&items.every(function(x){return x.status==="Concluido";}),hasPend=items.some(function(x){return x.status==="Pendente";});
    var bc=hasPend?"#DC2626":allOk?"#059669":"#D97706",sck=hasPend?"Pendente":allOk?"Concluido":"Em andamento";
    var sc=hasPend?"#FEE2E2":allOk?"#D1FAE5":"#FEF3C7",cc=hasPend?"#991B1B":allOk?"#065F46":"#92400E";
    h+='<div class="card" style="border-left:3px solid '+bc+'">';
    h+='<div class="card-h"><div><span style="font-size:12px;font-weight:700">'+esc(e.empresa)+'</span><span style="font-size:10px;color:#9CA3AF;margin-left:8px">'+esc(e.cidade)+' - '+fD(e.data)+'</span><span class="bdg" style="background:#EFF6FF;color:#2563EB;margin-left:6px">'+esc(e.tipo)+'</span></div>';
    h+='<div style="display:flex;align-items:center;gap:6px"><span class="bdg" style="background:'+sc+';color:'+cc+'">'+sck+'</span>'+(canEdit()?'<button class="btn bp" style="font-size:10px;padding:3px 8px" onclick="editarChecklist(\\''+e.id+'\\')">Editar</button>':'')+'</div></div>';
    h+='<div class="card-b">';
    if(limck) h+='<div style="display:inline-flex;align-items:center;gap:5px;margin-bottom:10px;padding:4px 10px;background:#FFFBEB;border-radius:5px;font-size:10px;color:#92400E;font-weight:500;border:1px solid #FDE68A">Data limite: '+fD(limck)+'</div>';
    h+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">';
    h+='<div><div style="font-size:9px;font-weight:700;color:#9CA3AF;text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px">Itens ('+items.length+')</div>';
    if(!items.length) h+='<p style="font-size:11px;color:#9CA3AF;font-style:italic">Clique em Editar para adicionar itens</p>';
    items.forEach(function(it){var cc2=CKC[it.status]||["#F3F4F6","#9CA3AF"];h+='<div class="ck-row" style="background:'+cc2[0]+'22"><div><div style="font-size:11px;font-weight:600">'+esc(it.nome)+'</div>'+(it.tipo?'<div style="font-size:9px;color:#9CA3AF">'+esc(it.tipo)+'</div>':'')+'</div><span class="bdg" style="background:'+cc2[0]+';color:'+cc2[1]+'">'+esc(it.status)+'</span></div>';});
    h+='</div><div><div style="font-size:9px;font-weight:700;color:#9CA3AF;text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px">Despesas</div>';
    [["Uber",ck.uber,DC],["Hospedagem",ck.hosp,DC],["Alimentacao",ck.alim,DC]].filter(function(x){return x[1];}).forEach(function(x){var cc2=x[2][x[1]]||["#F3F4F6","#9CA3AF"];h+='<div class="ck-row" style="background:'+cc2[0]+'22"><div style="font-size:11px;font-weight:600">'+x[0]+'</div><span class="bdg" style="background:'+cc2[0]+';color:'+cc2[1]+'">'+esc(x[1])+'</span></div>';});
    h+='</div></div>';
    if(ck.obs) h+='<div style="margin-top:8px;padding:6px 9px;background:#F9FAFB;border-radius:5px;font-size:10px;color:#9CA3AF">Obs: '+esc(ck.obs)+'</div>';
    h+='</div></div>';
  });
  return h;
}
function editarChecklist(eid){
  var e=null; for(var i=0;i<ev.length;i++) if(ev[i].id===eid){e=ev[i];break;}
  if(!e) return;
  var ck=e.ck||{},items=ck.items||[];
  document.getElementById("modalTitle").textContent="Checklist - "+e.empresa;
  document.getElementById("modalBox").style.maxWidth="680px";
  var h='<div style="display:flex;flex-direction:column;gap:12px"><div class="alert al-b">Adicione quantos itens precisar. Cada item pode ter um nome, status e tipo/detalhe personalizado.</div>'+sdiv("Itens do Checklist");
  h+='<div id="ck_edit_items">';
  items.forEach(function(it,i){h+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr auto;gap:7px;margin-bottom:6px;align-items:center"><input class="inp" id="ckei_n_'+i+'" value="'+esc(it.nome)+'" placeholder="Nome"><select class="inp" id="ckei_s_'+i+'">'+CKO.map(function(o){return'<option'+(o===it.status?" selected":"")+'>'+esc(o)+'</option>';}).join("")+'</select><input class="inp" id="ckei_t_'+i+'" value="'+esc(it.tipo||"")+'" placeholder="Tipo/detalhe"><button class="bi" style="color:#DC2626;border-color:#FCA5A5" onclick="this.closest(\\'div\\').remove()">x</button></div>';});
  h+='</div><button class="btn bs" style="font-size:11px" onclick="addCkEditItem()">+ Adicionar item</button>';
  h+=sdiv("Despesas");
  h+='<div class="g3">'+selF("Uber","cke_uber",ck.uber,DESPO)+selF("Hospedagem","cke_hosp",ck.hosp,DESPO)+selF("Alimentacao","cke_alim",ck.alim,DESPO)+'</div>';
  h+=taF("Observacoes","cke_obs",ck.obs);
  h+='<div style="display:flex;gap:7px;justify-content:flex-end;padding-top:8px;border-top:1px solid #F3F4F6"><button class="btn bs" onclick="closeModal()">Cancelar</button><button class="btn bp" onclick="salvarCK(\\''+eid+'\\')">Salvar</button></div></div>';
  document.getElementById("modalBody").innerHTML=h;
  openModal();
}
function addCkEditItem(){
  var cont=document.getElementById("ck_edit_items");if(!cont)return;
  var idx=cont.querySelectorAll("[id^='ckei_n_']").length;
  var div=document.createElement("div");
  div.style.cssText="display:grid;grid-template-columns:1fr 1fr 1fr auto;gap:7px;margin-bottom:6px;align-items:center";
  div.innerHTML='<input class="inp" id="ckei_n_'+idx+'" placeholder="Nome"><select class="inp" id="ckei_s_'+idx+'">'+CKO.map(function(o){return'<option>'+esc(o)+'</option>';}).join("")+'</select><input class="inp" id="ckei_t_'+idx+'" placeholder="Tipo/detalhe"><button class="bi" style="color:#DC2626;border-color:#FCA5A5" onclick="this.closest(\\'div\\').remove()">x</button>';
  cont.appendChild(div);
}
function salvarCK(eid){
  var cont=document.getElementById("ck_edit_items"),items=[];
  if(cont){cont.querySelectorAll("[id^='ckei_n_']").forEach(function(el){var i=el.id.split("_").pop(),nome=el.value.trim();if(nome)items.push({nome:nome,status:gv("ckei_s_"+i)||"Pendente",tipo:gv("ckei_t_"+i)||""});});}
  for(var i=0;i<ev.length;i++){if(ev[i].id===eid){ev[i].ck={items:items,uber:gv("cke_uber"),hosp:gv("cke_hosp"),alim:gv("cke_alim"),obs:gv("cke_obs")};break;}}
  closeModal(); renderAll();
}

// ------------------------------------------------
// CUSTOS
// ------------------------------------------------
function pgCustos(){
  var tot={v:0,i:0,e:0,o:0,ex:{}};
  ev.forEach(function(e){var c=e.custos||{};tot.v+=(parseFloat(c.viagem)||0);tot.i+=(parseFloat(c.imersao)||0);tot.e+=(parseFloat(c.espaco)||0);tot.o+=(parseFloat(c.outros)||0);(c.extras||[]).forEach(function(x){var k=x.nome||"Extra";tot.ex[k]=(tot.ex[k]||0)+(parseFloat(x.valor)||0);});});
  var totalG=tot.v+tot.i+tot.e+tot.o+Object.keys(tot.ex).reduce(function(s,k){return s+tot.ex[k];},0);
  var h='<div class="kgrid" style="margin-bottom:13px">';
  h+='<div class="kc"><div class="kc-l">Total Geral</div><div class="kc-v" style="color:#DC2626;font-size:14px">'+fmt(totalG)+'</div></div>';
  h+='<div class="kc"><div class="kc-l">Viagem</div><div class="kc-v" style="color:#D97706;font-size:14px">'+fmt(tot.v)+'</div></div>';
  h+='<div class="kc"><div class="kc-l">Imersao</div><div class="kc-v" style="color:#7C3AED;font-size:14px">'+fmt(tot.i)+'</div></div>';
  h+='<div class="kc"><div class="kc-l">Espaco</div><div class="kc-v" style="color:#2563EB;font-size:14px">'+fmt(tot.e)+'</div></div>';
  h+='<div class="kc"><div class="kc-l">Outros</div><div class="kc-v" style="font-size:14px">'+fmt(tot.o)+'</div></div>';
  Object.keys(tot.ex).forEach(function(k){h+='<div class="kc"><div class="kc-l">'+esc(k)+'</div><div class="kc-v" style="font-size:13px">'+fmt(tot.ex[k])+'</div></div>';});
  h+='</div><div class="tw-wrap"><div class="tw"><table><thead><tr><th>Evento</th><th>Tipo</th><th>Viagem</th><th>Imersao</th><th>Espaco</th><th>Outros</th><th>Itens Extras</th><th>Total (auto)</th><th></th></tr></thead><tbody>';
  ev.filter(function(e){return e.empresa||e.data;}).forEach(function(e){
    var c=e.custos||{},ex=c.extras||[];
    var t=(parseFloat(c.viagem)||0)+(parseFloat(c.imersao)||0)+(parseFloat(c.espaco)||0)+(parseFloat(c.outros)||0)+ex.reduce(function(s,x){return s+(parseFloat(x.valor)||0);},0);
    h+='<tr><td><div style="font-weight:600;font-size:12px">'+esc(e.empresa)+'</div><div style="font-size:10px;color:#9CA3AF">'+fD(e.data)+'</div></td>';
    h+='<td><span class="bdg" style="background:#EFF6FF;color:#2563EB">'+esc(e.tipo)+'</span></td>';
    h+='<td>'+(c.viagem?fmt(c.viagem):"---")+'</td><td>'+(c.imersao?fmt(c.imersao):"---")+'</td><td>'+(c.espaco?fmt(c.espaco):"---")+'</td><td>'+(c.outros?fmt(c.outros):"---")+'</td>';
    h+='<td>'+(ex.length?ex.map(function(x){return'<div style="white-space:nowrap">'+esc(x.nome)+': <b>'+fmt(x.valor)+'</b></div>';}).join(""):"---")+'</td>';
    h+='<td style="font-weight:700;color:'+(t>0?"#2563EB":"#9CA3AF")+'">'+(t>0?fmt(t):"---")+'</td>';
    h+='<td>'+(canEdit()?'<button class="bi" onclick="abrirEv(\\''+e.id+'\\')">✎</button>':'')+'</td></tr>';
  });
  h+='</tbody><tfoot><tr style="background:#F9FAFB;font-weight:700"><td colspan="2" style="padding:7px 11px;font-size:11px">Totais</td><td style="padding:7px 11px;color:#D97706">'+fmt(tot.v)+'</td><td style="padding:7px 11px;color:#7C3AED">'+fmt(tot.i)+'</td><td style="padding:7px 11px">'+fmt(tot.e)+'</td><td style="padding:7px 11px">'+fmt(tot.o)+'</td><td style="padding:7px 11px">'+Object.keys(tot.ex).map(function(k){return esc(k)+': '+fmt(tot.ex[k]);}).join("<br>")+'</td><td style="padding:7px 11px;color:#DC2626">'+fmt(totalG)+'</td><td></td></tr></tfoot></table></div></div>';
  return h;
}


// ------------------------------------------------
// AGENDA / CALENDARIO
// ------------------------------------------------
function pgAgenda() {
  var meses = ["Janeiro","Fevereiro","Marco","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
  var diasSem = ["Dom","Seg","Ter","Qua","Qui","Sex","Sab"];
  var todayStr = today();
  var todayD = new Date(todayStr+"T12:00:00");

  // Build set of days with events/travas/logistica
  function getDayItems(y, m, d) {
    var ds = y+"-"+String(m+1).padStart(2,"0")+"-"+String(d).padStart(2,"0");
    var items = [];
    // Eventos
    ev.forEach(function(e) {
      if (e.data === ds) items.push({tipo:"ev-evento", label:e.empresa, ref:e.id, kind:"evento"});
      // Trava: day before and after
      if (e.data) {
        var de = addD(e.data,-1), at = addD(e.data,1);
        if (ds === de || ds === at) items.push({tipo:"ev-trava", label:"Trava: "+e.empresa, ref:e.id, kind:"trava"});
      }
    });
    // Logistica
    logistica.forEach(function(l) {
      if (l.data === ds) {
        var lbl = (l.tipo==="voo"?"Voo":"Hotel")+": "+l.descricao.slice(0,20);
        items.push({tipo:"ev-"+l.tipo, label:lbl, ref:l.id, kind:l.tipo});
      }
    });
    return items;
  }

  var firstDay = new Date(calAno, calMes, 1).getDay();
  var daysInMonth = new Date(calAno, calMes+1, 0).getDate();
  var daysInPrev = new Date(calAno, calMes, 0).getDate();

  // Summary counts
  var evMes = ev.filter(function(e){
    return e.data && e.data.slice(0,7) === calAno+"-"+String(calMes+1).padStart(2,"0");
  });
  var logMes = logistica.filter(function(l){
    return l.data && l.data.slice(0,7) === calAno+"-"+String(calMes+1).padStart(2,"0");
  });

  var h = '<div class="cal-wrap">';
  // Left: calendar grid
  h += '<div><div class="cal-grid">';
  h += '<div class="cal-header">';
  h += '<div class="cal-title">'+meses[calMes]+" "+calAno+'</div>';
  h += '<div style="display:flex;align-items:center;gap:8px">';
  h += '<div class="cal-nav"><button onclick="calNavMes(-1)">‹</button><button onclick="calNavMes(1)">›</button></div>';
  h += (canEdit() ? '<button class="btn bp" style="font-size:11px;padding:5px 11px" onclick="abrirLogisticaForm(null,null)">+ Adicionar</button>' : '');
  h += '</div></div>';

  // Day labels
  h += '<div class="cal-days-header">';
  diasSem.forEach(function(d){h+='<div class="cal-day-label">'+d+'</div>';});
  h += '</div>';

  // Days grid
  h += '<div class="cal-days">';
  var dayCount = 0;
  // Prev month days
  for (var i = firstDay-1; i >= 0; i--) {
    var dd = daysInPrev - i;
    h += '<div class="cal-day other-month"><span class="cal-day-num">'+dd+'</span></div>';
    dayCount++;
  }
  // Current month
  for (var d = 1; d <= daysInMonth; d++) {
    var ds = calAno+"-"+String(calMes+1).padStart(2,"0")+"-"+String(d).padStart(2,"0");
    var isToday = ds === todayStr;
    var isSel = ds === calSelDia;
    var items = getDayItems(calAno, calMes, d);
    h += '<div class="cal-day'+(isToday?' today':'')+(isSel?' selected':'')+(dayCount%7===0?' sun':'')+'" onclick="calSelectDay(\\'' + ds + '\\')">'; 
    h += '<span class="cal-day-num">'+d+'</span>';
    items.slice(0,2).forEach(function(it){
      h += '<div class="cal-event '+it.tipo+'" title="'+esc(it.label)+'">'+esc(it.label)+'</div>';
    });
    if(items.length>2) h += '<div style="font-size:9px;color:#9CA3AF">+'+( items.length-2)+' mais</div>';
    h += '</div>';
    dayCount++;
  }
  // Next month padding
  var rem = 7 - (dayCount % 7);
  if (rem < 7) {
    for (var nd = 1; nd <= rem; nd++) {
      h += '<div class="cal-day other-month"><span class="cal-day-num">'+nd+'</span></div>';
    }
  }
  h += '</div></div>';

  // Legend
  h += '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px;padding:10px 14px;background:#fff;border-radius:9px;border:1px solid #E5E7EB;">';
  [["ev-evento","Evento"],["ev-trava","Trava de Agenda"],["ev-voo","Voo"],["ev-hotel","Hotel"],["ev-logistica","Logistica"]].forEach(function(x){
    h += '<span class="cal-event '+x[0]+'" style="font-size:10px;margin:0">'+x[1]+'</span>';
  });
  h += '</div>';

  // Month summary
  h += '<div style="margin-top:10px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">';
  h += '<div class="kc"><div class="kc-l">Eventos no Mes</div><div class="kc-v" style="color:#2563EB">'+evMes.length+'</div></div>';
  h += '<div class="kc"><div class="kc-l">Voos/Hoteis</div><div class="kc-v" style="color:#059669">'+logMes.length+'</div></div>';
  var trava = 0;
  evMes.forEach(function(){trava+=3;});
  h += '<div class="kc"><div class="kc-l">Dias Bloqueados</div><div class="kc-v" style="color:#D97706">'+trava+'</div></div>';
  h += '</div></div>';

  // Right: sidebar
  h += '<div class="cal-sidebar">';

  // Selected day detail
  if (calSelDia) {
    var selItems = [];
    var ds2 = calSelDia;
    ev.forEach(function(e){
      if(e.data===ds2) selItems.push({kind:"evento",e:e});
      if(e.data&&(addD(e.data,-1)===ds2||addD(e.data,1)===ds2)) selItems.push({kind:"trava",e:e});
    });
    logistica.forEach(function(l){if(l.data===ds2) selItems.push({kind:l.tipo,l:l});});

    h += '<div class="cal-day-detail">';
    h += '<div class="cal-day-detail-header">'+fD(calSelDia)+(canEdit()?'<button class="btn bp" style="font-size:10px;padding:3px 8px;float:right" onclick="abrirLogisticaForm(null,\\''+calSelDia+'\\')">+ Add</button>':'')+'</div>';
    if(!selItems.length) {
      h += '<div style="padding:16px;font-size:12px;color:#9CA3AF;text-align:center">Dia livre</div>';
    } else {
      selItems.forEach(function(item){
        if(item.kind==="evento"){
          var e2=item.e;
          h += '<div class="logistica-item"><div class="logistica-icon" style="background:#DBEAFE;color:#1D4ED8">📅</div>';
          h += '<div style="flex:1;min-width:0"><div style="font-size:12px;font-weight:700">'+esc(e2.empresa)+'</div>';
          h += '<div style="font-size:10px;color:#9CA3AF">'+esc(e2.tipo)+' - '+esc(e2.cidade)+'</div>';
          h += '<div style="margin-top:3px">'+bdg(e2.status,SC)+'</div></div>';
          h += (canEdit()?'<button class="bi" onclick="abrirDetalhe(\\''+e2.id+'\\')">👁</button>':'');
          h += '</div>';
        } else if(item.kind==="trava"){
          var e3=item.e;
          h += '<div class="logistica-item"><div class="logistica-icon" style="background:#FEF3C7;color:#92400E">🔒</div>';
          h += '<div style="flex:1"><div style="font-size:12px;font-weight:700">Trava: '+esc(e3.empresa)+'</div>';
          h += '<div style="font-size:10px;color:#9CA3AF">Evento em '+fD(e3.data)+'</div></div></div>';
        } else {
          var l2=item.l;
          var icon=l2.tipo==="voo"?"✈":l2.tipo==="hotel"?"🏛":"🚔";
          var iconBg=l2.tipo==="voo"?"background:#D1FAE5;color:#065F46":l2.tipo==="hotel"?"background:#EDE9FE;color:#6D28D9":"background:#CCFBF1;color:#0F766E";
          h += '<div class="logistica-item"><div class="logistica-icon" style="'+iconBg+'">'+icon+'</div>';
          h += '<div style="flex:1;min-width:0"><div style="font-size:12px;font-weight:700">'+esc(l2.descricao)+'</div>';
          h += '<div style="font-size:10px;color:#9CA3AF">'+esc(l2.horario||"")+(l2.valor?' - '+fmt(l2.valor):'')+'</div>';
          h += (l2.obs?'<div style="font-size:10px;color:#9CA3AF">'+esc(l2.obs)+'</div>':'');
          h += '<div style="margin-top:3px">'+bdg(l2.status||"",{"Confirmado":["#D1FAE5","#065F46"],"Pendente":["#FEE2E2","#991B1B"],"Reservado":["#FEF3C7","#92400E"]})+'</div></div>';
          h += (canEdit()?'<div style="display:flex;gap:3px"><button class="bi" data-id="'+l2.id+'" onclick="abrirLogisticaForm(this.dataset.id,null)">&#9998;</button><button class="bi" style="color:#DC2626;border-color:#FCA5A5" data-id2="'+l2.id+'" onclick="delLogistica(this.dataset.id2)">&#128465;</button></div>':'');
          h += '</div>';
        }
      });
    }
    h += '</div>';
  } else {
    h += '<div style="background:#fff;border-radius:10px;border:1px solid #E5E7EB;padding:20px;text-align:center;color:#9CA3AF;font-size:12px">Clique em um dia para ver os detalhes</div>';
  }

  // Upcoming logistica
  h += '<div class="cal-day-detail">';
  h += '<div class="cal-day-detail-header">Proximos Voos e Hoteis</div>';
  var upcoming = logistica.filter(function(l){return l.data >= todayStr;}).sort(function(a,b){return a.data.localeCompare(b.data);}).slice(0,6);
  if(!upcoming.length) {
    h += '<div style="padding:14px;font-size:12px;color:#9CA3AF;text-align:center">Nenhum registro</div>';
  }
  upcoming.forEach(function(l){
    var icon=l.tipo==="voo"?"✈":l.tipo==="hotel"?"🏛":"🚔";
    var iconBg=l.tipo==="voo"?"background:#D1FAE5;color:#065F46":l.tipo==="hotel"?"background:#EDE9FE;color:#6D28D9":"background:#CCFBF1;color:#0F766E";
    var evRef = l.eventoId ? ev.find(function(e){return e.id===l.eventoId;}) : null;
    h += '<div class="logistica-item"><div class="logistica-icon" style="'+iconBg+'">'+icon+'</div>';
    h += '<div style="flex:1;min-width:0"><div style="font-size:11px;font-weight:700">'+esc(l.descricao)+'</div>';
    h += '<div style="font-size:10px;color:#9CA3AF">'+fD(l.data)+(l.horario?' - '+esc(l.horario):'')+'</div>';
    h += (evRef?'<div style="font-size:10px;color:#2563EB">'+esc(evRef.empresa)+'</div>':'');
    h += '</div><span style="font-size:10px;font-weight:600;color:#2563EB;flex-shrink:0">'+fmt(l.valor)+'</span></div>';
  });
  h += '</div>';

  // Total logistica costs
  var totalVoos = logistica.reduce(function(s,l){return s+(l.tipo==="voo"?parseFloat(l.valor)||0:0);},0);
  var totalHoteis = logistica.reduce(function(s,l){return s+(l.tipo==="hotel"?parseFloat(l.valor)||0:0);},0);
  h += '<div style="background:#fff;border-radius:10px;border:1px solid #E5E7EB;padding:13px">';
  h += '<div style="font-size:11px;font-weight:700;color:#0C1C36;margin-bottom:10px">Resumo de Custos</div>';
  h += '<div class="drow"><span class="dk">Total Voos</span><span class="dv" style="color:#065F46">'+fmt(totalVoos)+'</span></div>';
  h += '<div class="drow"><span class="dk">Total Hoteis</span><span class="dv" style="color:#6D28D9">'+fmt(totalHoteis)+'</span></div>';
  h += '<div class="drow" style="font-weight:700"><span class="dk">Total Logistica</span><span class="dv" style="color:#DC2626">'+fmt(totalVoos+totalHoteis)+'</span></div>';
  h += '</div>';

  h += '</div></div>'; // sidebar + wrap
  return h;
}

function calNavMes(dir) { calMes += dir; if(calMes>11){calMes=0;calAno++;} if(calMes<0){calMes=11;calAno--;} renderPage(); }
function calSelectDay(ds) { calSelDia = (calSelDia===ds)?null:ds; renderPage(); }

function delLogistica(id) {
  if(confirm("Remover?")) { logistica=logistica.filter(function(l){return l.id!==id;}); renderPage(); }
}

function abrirLogisticaForm(lid, preData) {
  var l = lid ? logistica.find(function(x){return x.id===lid;}) : null;
  var d = l || {id:uid(),eventoId:"",tipo:"voo",data:preData||today(),dataFim:"",descricao:"",horario:"",valor:"",status:"Confirmado",obs:""};
  
  // Build event options
  var evOpts = ev.filter(function(e){return e.empresa;}).map(function(e){return {id:e.id,label:e.empresa+" - "+fD(e.data)};});
  
  document.getElementById("modalTitle").textContent = l ? "Editar Registro" : "Novo Voo / Hotel / Logistica";
  document.getElementById("modalBox").style.maxWidth = "580px";
  
  var h = '<div style="display:flex;flex-direction:column;gap:12px">';
  h += sdiv("Tipo de Registro");
  h += '<div class="fg"><span class="lb">Tipo</span><div style="display:flex;gap:10px;flex-wrap:wrap">';
  [["voo","✈ Voo"],["hotel","🏛 Hotel"],["logistica","🚔 Logistica/Transporte"],["outro","📋 Outro"]].forEach(function(x){
    h += '<label style="display:flex;gap:6px;align-items:center;font-size:12px;cursor:pointer;padding:5px 10px;border-radius:6px;border:1px solid '+(d.tipo===x[0]?"#2563EB":"#E5E7EB")+';background:'+(d.tipo===x[0]?"#EFF6FF":"#fff")+'"><input type="radio" name="log_tipo" value="'+x[0]+'"'+(d.tipo===x[0]?" checked":"")+' onchange="updateLogForm()">'+x[1]+'</label>';
  });
  h += '</div></div>';
  
  h += sdiv("Dados");
  h += '<div class="g2">';
  h += inpF("Data","log_data",d.data,"date");
  h += '<div id="log_datafim_wrap" style="'+(d.tipo!=="hotel"?"display:none":"")+'">' + inpF("Data Checkout","log_datafim",d.dataFim,"date") + '</div>';
  h += '</div>';
  h += inpF("Descricao (ex: GOL 1234, Hotel Ibis SP)","log_desc",d.descricao);
  h += '<div class="g2">' + inpF("Horario (ex: 14:30)","log_hora",d.horario) + inpF("Valor (R$)","log_val",d.valor,"number") + '</div>';
  
  // Vincular evento
  h += '<div class="fg"><span class="lb">Vincular a Evento (opcional)</span><select class="inp" id="log_evid"><option value="">Nenhum</option>';
  evOpts.forEach(function(e){h+='<option value="'+e.id+'"'+(d.eventoId===e.id?" selected":"")+'>'+esc(e.label)+'</option>';});
  h += '</select></div>';
  
  h += selF("Status","log_st",d.status,["Confirmado","Reservado","Pendente","Cancelado"]);
  h += taF("Observacoes","log_obs",d.obs);
  
  h += '<div style="display:flex;gap:7px;justify-content:flex-end;padding-top:8px;border-top:1px solid #F3F4F6">';
  h += '<button class="btn bs" onclick="closeModal()">Cancelar</button>';
  h += '<button class="btn bp" onclick="salvarLogistica(\\''+d.id+'\\','+(!l)+')">Salvar</button>';
  h += '</div></div>';
  
  document.getElementById("modalBody").innerHTML = h;
  openModal();
}

function updateLogForm() {
  var tipo = document.querySelector("input[name='log_tipo']:checked");
  if(!tipo) return;
  var wrap = document.getElementById("log_datafim_wrap");
  if(wrap) wrap.style.display = tipo.value==="hotel"?"":"none";
}

function salvarLogistica(lid, isNew) {
  var tipo = document.querySelector("input[name='log_tipo']:checked");
  var l = {
    id: lid,
    tipo: tipo ? tipo.value : "outro",
    data: gv("log_data"),
    dataFim: gv("log_datafim"),
    descricao: gv("log_desc"),
    horario: gv("log_hora"),
    valor: parseFloat(gv("log_val")) || 0,
    eventoId: gv("log_evid"),
    status: gv("log_st"),
    obs: gv("log_obs")
  };
  if(isNew) logistica.push(l);
  else for(var i=0;i<logistica.length;i++) if(logistica[i].id===lid){logistica[i]=l;break;}
  closeModal();
  renderPage();
}

// ------------------------------------------------
// PARCEIROS
// ------------------------------------------------
function pgParceiros(){
  var psc={"Em conversa":["#EFF6FF","#2563EB"],"Confirmado":["#D1FAE5","#065F46"],"Pendente":["#FEF3C7","#92400E"],"Encerrado":["#F3F4F6","#6B7280"],"Nao aprovado":["#FEE2E2","#991B1B"]};
  var h='<div style="display:flex;justify-content:flex-end;margin-bottom:12px">'+(canEdit()?'<button class="btn bp" onclick="abrirParc(null)">+ Novo Parceiro</button>':'')+'</div>';
  h+='<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:10px">';
  if(!par.length) h+='<div style="grid-column:1/-1;padding:36px;text-align:center;color:#9CA3AF">Nenhum parceiro.</div>';
  par.forEach(function(p){
    var c=psc[p.status]||["#F3F4F6","#9CA3AF"];
    h+='<div class="card" style="padding:13px"><div style="display:flex;justify-content:space-between;margin-bottom:8px"><div><div style="font-weight:700;font-size:13px">'+esc(p.nome)+'</div>'+(p.empresa?'<div style="font-size:10px;color:#9CA3AF">'+esc(p.empresa)+'</div>':'')+'</div><span class="bdg" style="background:'+c[0]+';color:'+c[1]+'">'+esc(p.status)+'</span></div>';
    h+='<div style="display:flex;flex-direction:column;gap:3px;font-size:11px;color:#9CA3AF;margin-bottom:8px">'+(p.tipo?'<span>'+esc(p.tipo)+'</span>':'')+(p.cidade?'<span>'+esc(p.cidade)+'</span>':'')+(p.contato?'<span>'+esc(p.contato)+'</span>':'')+(p.eventoRel?'<span>'+esc(p.eventoRel)+'</span>':'')+'</div>';
    if(p.obs) h+='<p style="font-size:10px;color:#9CA3AF;padding:4px 7px;background:#F9FAFB;border-radius:5px;margin-bottom:8px">'+esc(p.obs)+'</p>';
    h+='<div style="display:flex;gap:5px">'+(canEdit()?'<button class="btn bs" style="flex:1;justify-content:center;font-size:11px" onclick="abrirParc(\\''+p.id+'\\')">Editar</button><button class="bi" style="color:#DC2626;border-color:#FCA5A5" onclick="delParc(\\''+p.id+'\\')">🗑</button>':'')+'</div></div>';
  });
  return h+'</div>';
}
function delParc(id){if(confirm("Remover?")){par=par.filter(function(p){return p.id!==id;});renderAll();}}
function abrirParc(pid){
  var p=null; for(var i=0;i<par.length;i++) if(par[i].id===pid){p=par[i];break;}
  var d=p||{id:uid(),nome:"",empresa:"",cidade:"",tipo:"",contato:"",eventoRel:"",status:"Em conversa",obs:""};
  document.getElementById("modalTitle").textContent=p?"Editar Parceiro":"Novo Parceiro";
  document.getElementById("modalBox").style.maxWidth="540px";
  var h='<div style="display:flex;flex-direction:column;gap:10px"><div class="g2">'+inpF("Nome","pa_nome",d.nome)+inpF("Empresa","pa_emp",d.empresa)+'</div><div class="g2">'+inpF("Cidade","pa_cid",d.cidade)+selF("Tipo","pa_tipo",d.tipo,TPARC)+'</div><div class="g2">'+inpF("Contato","pa_cont",d.contato)+selF("Status","pa_st",d.status,SPARC)+'</div>'+inpF("Evento Relacionado","pa_ev",d.eventoRel)+taF("Observacoes","pa_obs",d.obs)+'<div style="display:flex;gap:7px;justify-content:flex-end;padding-top:7px;border-top:1px solid #F3F4F6"><button class="btn bs" onclick="closeModal()">Cancelar</button><button class="btn bp" onclick="salvarParc(\\''+d.id+'\\','+(!p)+')">Salvar</button></div></div>';
  document.getElementById("modalBody").innerHTML=h;
  openModal();
}
function salvarParc(pid,isNew){
  var p={id:pid,nome:gv("pa_nome"),empresa:gv("pa_emp"),cidade:gv("pa_cid"),tipo:gv("pa_tipo"),contato:gv("pa_cont"),eventoRel:gv("pa_ev"),status:gv("pa_st"),obs:gv("pa_obs")};
  if(isNew) par.push(p); else for(var i=0;i<par.length;i++) if(par[i].id===pid){par[i]=p;break;}
  closeModal(); renderAll();
}

// ------------------------------------------------
// LINKS
// ------------------------------------------------
function pgLinks(){
  var grp={};
  CATLINK.forEach(function(c){var it=lnk.filter(function(l){return l.categoria===c;});if(it.length) grp[c]=it;});
  var h='<div style="display:flex;justify-content:flex-end;margin-bottom:12px">'+(canEdit()?'<button class="btn bp" onclick="abrirLink()">+ Novo Link</button>':'')+'</div>';
  if(!lnk.length) h+='<div style="padding:36px;text-align:center;color:#9CA3AF">Nenhum link cadastrado.</div>';
  Object.keys(grp).forEach(function(cat){
    h+='<div style="margin-bottom:16px"><div style="font-size:9px;font-weight:700;color:#9CA3AF;text-transform:uppercase;letter-spacing:1px;margin-bottom:7px;padding-bottom:5px;border-bottom:1px solid #F3F4F6">'+esc(cat)+'</div>';
    grp[cat].forEach(function(l){
      h+='<div style="display:flex;align-items:center;gap:10px;padding:9px 12px;background:#fff;border-radius:8px;border:1px solid #E5E7EB;margin-bottom:5px">';
      h+='<span style="font-size:14px;color:#2563EB;flex-shrink:0">🔗</span>';
      h+='<div style="flex:1;min-width:0"><a href="'+esc(l.link)+'" target="_blank" style="font-size:12px;font-weight:600;color:#2563EB;text-decoration:none">'+esc(l.nome)+'</a>'+(l.obs?'<div style="font-size:10px;color:#9CA3AF;margin-top:1px">'+esc(l.obs)+'</div>':'')+'</div>';
      h+=(l.eventoRel?'<span style="font-size:10px;color:#9CA3AF;flex-shrink:0">'+esc(l.eventoRel)+'</span>':'');
      h+=(canEdit()?'<button class="bi" style="color:#DC2626;border-color:#FCA5A5;flex-shrink:0" onclick="delLink(\\''+l.id+'\\')">🗑</button>':'');
      h+='</div>';
    });
    h+='</div>';
  });
  return h;
}
function delLink(id){if(confirm("Remover?")){lnk=lnk.filter(function(l){return l.id!==id;});renderAll();}}
function abrirLink(){
  document.getElementById("modalTitle").textContent="Novo Link";
  document.getElementById("modalBox").style.maxWidth="520px";
  var h='<div style="display:flex;flex-direction:column;gap:10px">'+selF("Categoria","lk_cat","",CATLINK)+inpF("Nome","lk_nome","")+inpF("URL","lk_url","")+'<div class="g2">'+inpF("Responsavel","lk_resp","")+inpF("Evento Relacionado","lk_ev","")+'</div>'+taF("Observacoes","lk_obs","")+'<div style="display:flex;gap:7px;justify-content:flex-end;padding-top:7px;border-top:1px solid #F3F4F6"><button class="btn bs" onclick="closeModal()">Cancelar</button><button class="btn bp" onclick="salvarLink()">Salvar</button></div></div>';
  document.getElementById("modalBody").innerHTML=h;
  openModal();
}
function salvarLink(){
  lnk.push({id:uid(),categoria:gv("lk_cat"),nome:gv("lk_nome"),link:gv("lk_url"),responsavel:gv("lk_resp"),eventoRel:gv("lk_ev"),obs:gv("lk_obs")});
  closeModal(); renderAll();
}

// ------------------------------------------------
// USUARIOS
// ------------------------------------------------
function pgUsuarios(){
  if(!currentUser||currentUser.role!=="admin") return '<div style="padding:40px;text-align:center;color:#9CA3AF">Acesso restrito a administradores.</div>';
  var h='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:8px"><div style="font-size:13px;font-weight:700;color:#0C1C36">Usuarios ('+users.length+')</div><button class="btn bp" onclick="abrirUserForm(null)">+ Novo Usuario</button></div>';
  h+='<div class="alert al-b"><b>Perfis:</b> ';
  h+=Object.keys(ROLES).map(function(k){var r=ROLES[k];return'<span class="role-bdg" style="background:'+r.bg+';color:'+r.color+';margin:0 4px">'+r.label+'</span> '+r.desc;}).join(" | ");
  h+='</div>';
  users.forEach(function(u){
    var rc=uColor(u.role);
    h+='<div class="user-card"><div class="user-av" style="background:'+rc+'22;color:'+rc+'">'+uInitials(u.nome)+'</div>';
    h+='<div style="flex:1;min-width:0"><div style="display:flex;align-items:center;gap:7px;flex-wrap:wrap"><span style="font-size:13px;font-weight:700">'+esc(u.nome)+'</span>'+roleBdg(u.role)+(!u.ativo?'<span class="role-bdg" style="background:#F3F4F6;color:#6B7280">Inativo</span>':'')+(u.id===currentUser.id?'<span class="role-bdg" style="background:#ECFDF5;color:#065F46">Voce</span>':'')+'</div><div style="font-size:11px;color:#9CA3AF;margin-top:2px">Login: <b>'+esc(u.usuario)+'</b></div></div>';
    h+='<div style="display:flex;gap:5px;flex-shrink:0"><button class="bi" onclick="abrirUserForm(\\''+u.id+'\\')">✎</button>';
    if(u.id!==currentUser.id){
      h+='<button class="bi" style="color:'+(u.ativo?"#DC2626":"#059669")+';border-color:'+(u.ativo?"#FCA5A5":"#A7F3D0")+'" onclick="toggleUserAtivo(\\''+u.id+'\\')">'+(u.ativo?"Desativar":"Ativar")+'</button>';
      h+='<button class="bi" style="color:#DC2626;border-color:#FCA5A5" onclick="delUser(\\''+u.id+'\\')">🗑</button>';
    }
    h+='</div></div>';
  });
  return h;
}
function toggleUserAtivo(uid_){for(var i=0;i<users.length;i++) if(users[i].id===uid_){users[i].ativo=!users[i].ativo;break;} renderPage();}
function delUser(uid_){if(confirm("Remover usuario?")){users=users.filter(function(u){return u.id!==uid_;});renderPage();}}
function abrirUserForm(uid_){
  var u=null; for(var i=0;i<users.length;i++) if(users[i].id===uid_){u=users[i];break;}
  var d=u||{id:uid(),nome:"",usuario:"",senha:"",role:"viewer",ativo:true};
  document.getElementById("modalTitle").textContent=u?"Editar Usuario":"Novo Usuario";
  document.getElementById("modalBox").style.maxWidth="440px";
  var h='<div style="display:flex;flex-direction:column;gap:11px">'+inpF("Nome completo","usr_nome",d.nome)+'<div class="g2">'+inpF("Usuario (login)","usr_user",d.usuario)+inpF("Senha","usr_pass",d.senha)+'</div>'+selF("Perfil de acesso","usr_role",d.role,Object.keys(ROLES));
  h+='<div id="roleDescBox" style="background:#F9FAFB;border-radius:6px;padding:8px 11px;font-size:11px;color:#9CA3AF">'+(ROLES[d.role]&&ROLES[d.role].desc||"")+'</div>';
  h+='<div class="fg"><span class="lb">Status</span><div style="display:flex;gap:16px;padding-top:6px">'+["Ativo","Inativo"].map(function(o){return'<label style="display:flex;gap:5px;align-items:center;font-size:12px;cursor:pointer"><input type="radio" name="usr_ativo" value="'+(o==="Ativo")+'"'+(d.ativo===(o==="Ativo")?" checked":"")+">"+o+'</label>';}).join("")+'</div></div>';
  h+='<div style="display:flex;gap:7px;justify-content:flex-end;padding-top:8px;border-top:1px solid #F3F4F6"><button class="btn bs" onclick="closeModal()">Cancelar</button><button class="btn bp" onclick="salvarUser(\\''+d.id+'\\','+(!u)+')">Salvar</button></div></div>';
  document.getElementById("modalBody").innerHTML=h;
  var roleEl=document.getElementById("usr_role");
  if(roleEl) roleEl.addEventListener("change",function(){var b=document.getElementById("roleDescBox");if(b)b.textContent=(ROLES[this.value]&&ROLES[this.value].desc)||"";});
  openModal();
}
function salvarUser(uid_,isNew){
  var ativo=document.querySelector("input[name='usr_ativo']:checked");
  ativo=ativo?ativo.value==="true":true;
  var u={id:uid_,nome:gv("usr_nome"),usuario:gv("usr_user"),senha:gv("usr_pass"),role:gv("usr_role"),ativo:ativo};
  if(!u.nome||!u.usuario||!u.senha){alert("Preencha nome, usuario e senha.");return;}
  for(var i=0;i<users.length;i++){if(users[i].usuario.toLowerCase()===u.usuario.toLowerCase()&&users[i].id!==uid_){alert("Usuario ja existe.");return;}}
  if(isNew) users.push(u); else for(var i=0;i<users.length;i++) if(users[i].id===uid_){users[i]=u;break;}
  if(currentUser&&currentUser.id===uid_) currentUser=u;
  closeModal(); renderAll();
}


// ------------------------------------------------
// STATE SETTERS (callable from inline HTML)
// ------------------------------------------------
function setFuF(v) { fuF = v; renderPage(); }
function setLeadKanban(v) { leadKanban = v; renderPage(); }
function setEvF(key, val) { evF[key] = val; renderPage(); }

// ------------------------------------------------
// EXPOSE TO WINDOW (needed for onclick in HTML strings)
// ------------------------------------------------
window.setTab = setTab;
window.doLogin = doLogin;
window.doLogout = doLogout;
window.closeModal = closeModal;
window.openModal = openModal;
window.renderPage = renderPage;
window.renderAll = renderAll;
// Leads
window.abrirLead = abrirLead;
window.salvarLead = salvarLead;
window.delLead = delLead;
window.moverLead = moverLead;
window.virarEvento = virarEvento;
// Follow-up
window.openFuModal = openFuModal;
window.salvarFU = salvarFU;
// Eventos
window.abrirEv = abrirEv;
window.salvarEv = salvarEv;
window.delEv = delEv;
window.abrirDetalhe = abrirDetalhe;
window.showDT = showDT;
window.addCkItem = addCkItem;
window.addExtra = addExtra;
window.checkConflicts = checkConflicts;
window.openGcal = openGcal;
// Checklist
window.editarChecklist = editarChecklist;
window.salvarCK = salvarCK;
window.addCkEditItem = addCkEditItem;
// Parceiros
window.abrirParc = abrirParc;
window.salvarParc = salvarParc;
window.delParc = delParc;
// Links
window.abrirLink = abrirLink;
window.salvarLink = salvarLink;
window.delLink = delLink;
// Usuarios
window.abrirUserForm = abrirUserForm;
window.salvarUser = salvarUser;
window.delUser = delUser;
window.toggleUserAtivo = toggleUserAtivo;
// evF filter state (used in oninput/onchange)
window.evF = evF;
window.fuF = fuF;
window.leadKanban = leadKanban;
window.setFuF = setFuF;
window.pgAgenda = pgAgenda;
window.calNavMes = calNavMes;
window.calSelectDay = calSelectDay;
window.abrirLogisticaForm = abrirLogisticaForm;
window.salvarLogistica = salvarLogistica;
window.delLogistica = delLogistica;
window.updateLogForm = updateLogForm;
window.setLeadKanban = setLeadKanban;
window.setEvF = setEvF;

// ------------------------------------------------
// EVENT LISTENERS
// ------------------------------------------------
document.getElementById("loginBtn").addEventListener("click", doLogin);
document.getElementById("authPass").addEventListener("keydown", function(e){if(e.key==="Enter")doLogin();});
document.getElementById("authUser").addEventListener("keydown", function(e){if(e.key==="Enter")doLogin();});
document.getElementById("menuBtn").addEventListener("click", function(){
  var open = document.getElementById("sidebar").classList.toggle("open");
  document.getElementById("sbOverlay").classList.toggle("show", open);
});
window.closeSidebar = function() {
  document.getElementById("sidebar").classList.remove("open");
  document.getElementById("sbOverlay").classList.remove("show");
};
document.getElementById("modalCloseBtn").addEventListener("click", closeModal);
document.getElementById("modalOv").addEventListener("click", function(e){if(e.target===this)closeModal();});

// ------------------------------------------------
// INIT — show login screen, wait for login
// ------------------------------------------------
document.getElementById("authScreen").style.display = "flex";`

const SUPABASE_INTEGRATION = `
// ============================================================
// SUPABASE INTEGRATION
// Wraps all save/delete functions to sync with Supabase
// ============================================================
(function() {

  // Wait for __sb to be available
  function waitForSb(cb, tries) {
    tries = tries || 0;
    if (tries > 20) return;
    if (window.__sb) { cb(); return; }
    setTimeout(function() { waitForSb(cb, tries + 1); }, 200);
  }

  // Helper: map JS object keys to snake_case for Supabase
  function evToDb(e) {
    return {
      id: e.id,
      data: e.data || null,
      tipo: e.tipo || null,
      qtd_vendida: e.qtdVendida || 0,
      cidade: e.cidade || null,
      empresa: e.empresa || null,
      responsavel: e.responsavel || null,
      funcao: e.funcao || null,
      contato: e.contato || null,
      status: e.status || null,
      prioridade: e.prioridade || null,
      ultimo_contato: e.ultimoContato || null,
      proxima_acao: e.proximaAcao || null,
      prazo_acao: e.prazoAcao || null,
      obs: e.obs || null,
      link_relacionado: e.linkRelacionado || null,
      valor_contrato: parseFloat(e.valorContrato) || 0,
      entrada: parseFloat(e.entrada) || 0,
      status_contrato: e.statusContrato || null,
      fechamento_com: e.fechamentoCom || null,
      vagas_reservadas: e.vagasReservadas || false,
      custos: e.custos || {},
      obs_c: e.obs_c || null,
      link_c: e.link_c || null,
      fu: e.fu || [],
      ck: e.ck || {},
      audit: e.audit || []
    };
  }

  function leadToDb(l) {
    return {
      id: l.id,
      nome: l.nome || null,
      empresa: l.empresa || null,
      cidade: l.cidade || null,
      contato: l.contato || null,
      tipo: l.tipo || null,
      interesse: l.interesse || null,
      status: l.status || null,
      prioridade: l.prioridade || null,
      proxima_acao: l.proximaAcao || null,
      prazo_acao: l.prazoAcao || null,
      obs: l.obs || null,
      audit: l.audit || []
    };
  }

  function parcToDb(p) {
    return {
      id: p.id,
      nome: p.nome || null,
      empresa: p.empresa || null,
      cidade: p.cidade || null,
      tipo: p.tipo || null,
      contato: p.contato || null,
      evento_rel: p.eventoRel || null,
      status: p.status || null,
      obs: p.obs || null
    };
  }

  function linkToDb(l) {
    return {
      id: l.id,
      categoria: l.categoria || null,
      nome: l.nome || null,
      link: l.link || null,
      responsavel: l.responsavel || null,
      evento_rel: l.eventoRel || null,
      obs: l.obs || null
    };
  }

  function logToDb(l) {
    return {
      id: l.id,
      evento_id: l.eventoId || null,
      tipo: l.tipo || null,
      data: l.data || null,
      data_fim: l.dataFim || null,
      descricao: l.descricao || null,
      horario: l.horario || null,
      valor: parseFloat(l.valor) || 0,
      status: l.status || null,
      obs: l.obs || null
    };
  }

  function dbToEv(r) {
    return {
      id: r.id,
      data: r.data || '',
      tipo: r.tipo || '',
      qtdVendida: r.qtd_vendida || 0,
      cidade: r.cidade || '',
      empresa: r.empresa || '',
      responsavel: r.responsavel || '',
      funcao: r.funcao || '',
      contato: r.contato || '',
      status: r.status || 'Contato Inicial',
      prioridade: r.prioridade || 'Media',
      ultimoContato: r.ultimo_contato || '',
      proximaAcao: r.proxima_acao || '',
      prazoAcao: r.prazo_acao || '',
      obs: r.obs || '',
      linkRelacionado: r.link_relacionado || '',
      valorContrato: r.valor_contrato || 0,
      entrada: r.entrada || 0,
      statusContrato: r.status_contrato || '',
      fechamentoCom: r.fechamento_com || '',
      vagasReservadas: r.vagas_reservadas || false,
      custos: r.custos || {viagem:0,imersao:0,espaco:0,outros:0,extras:[]},
      obs_c: r.obs_c || '',
      link_c: r.link_c || '',
      fu: r.fu || [],
      ck: r.ck || {items:[],uber:'',hosp:'',alim:'',obs:''},
      audit: r.audit || []
    };
  }

  function dbToLead(r) {
    return {
      id: r.id,
      nome: r.nome || '',
      empresa: r.empresa || '',
      cidade: r.cidade || '',
      contato: r.contato || '',
      tipo: r.tipo || '',
      interesse: r.interesse || '',
      status: r.status || 'Novo Lead',
      prioridade: r.prioridade || 'Media',
      proximaAcao: r.proxima_acao || '',
      prazoAcao: r.prazo_acao || '',
      obs: r.obs || '',
      criadoEm: r.created_at ? r.created_at.slice(0,10) : '',
      audit: r.audit || []
    };
  }

  function dbToParc(r) {
    return {
      id: r.id,
      nome: r.nome || '',
      empresa: r.empresa || '',
      cidade: r.cidade || '',
      tipo: r.tipo || '',
      contato: r.contato || '',
      eventoRel: r.evento_rel || '',
      status: r.status || 'Em conversa',
      obs: r.obs || ''
    };
  }

  function dbToLink(r) {
    return {
      id: r.id,
      categoria: r.categoria || '',
      nome: r.nome || '',
      link: r.link || '',
      responsavel: r.responsavel || '',
      eventoRel: r.evento_rel || '',
      obs: r.obs || ''
    };
  }

  function dbToLog(r) {
    return {
      id: r.id,
      eventoId: r.evento_id || '',
      tipo: r.tipo || 'outro',
      data: r.data || '',
      dataFim: r.data_fim || '',
      descricao: r.descricao || '',
      horario: r.horario || '',
      valor: r.valor || 0,
      status: r.status || 'Confirmado',
      obs: r.obs || ''
    };
  }

  // Load all data from Supabase on init
  async function loadData() {
    var sb = window.__sb;
    if (!sb) return;
    try {
      var results = await Promise.all([
        sb.from('eventos').select('*').order('data'),
        sb.from('leads').select('*').order('created_at'),
        sb.from('parceiros').select('*'),
        sb.from('links').select('*'),
        sb.from('logistica').select('*').order('data')
      ]);

      if (results[0].data) window.ev = results[0].data.map(dbToEv);
      if (results[1].data) window.leads = results[1].data.map(dbToLead);
      if (results[2].data) window.par = results[2].data.map(dbToParc);
      if (results[3].data) window.lnk = results[3].data.map(dbToLink);
      if (results[4].data) window.logistica = results[4].data.map(dbToLog);

      if (typeof window.renderAll === 'function') window.renderAll();
    } catch(e) {
      console.error('Supabase load error:', e);
    }
  }

  // Wrap save functions
  waitForSb(function() {
    var sb = window.__sb;

    // EVENTOS
    var _salvarEv = window.salvarEv;
    window.salvarEv = function(eid, isNew) {
      _salvarEv(eid, isNew);
      // Find the saved event
      setTimeout(function() {
        var e = (window.ev || []).find(function(x) { return x.id === eid; });
        if (e) sb.from('eventos').upsert(evToDb(e)).then(function(r) { if (r.error) console.error('Save ev:', r.error); });
      }, 50);
    };

    var _delEv = window.delEv;
    window.delEv = function(id) {
      _delEv(id);
      sb.from('eventos').delete().eq('id', id).then(function(r) { if (r.error) console.error('Del ev:', r.error); });
    };

    // LEADS
    var _salvarLead = window.salvarLead;
    window.salvarLead = function(lid, isNew) {
      _salvarLead(lid, isNew);
      setTimeout(function() {
        var l = (window.leads || []).find(function(x) { return x.id === lid; });
        if (l) sb.from('leads').upsert(leadToDb(l)).then(function(r) { if (r.error) console.error('Save lead:', r.error); });
      }, 50);
    };

    var _delLead = window.delLead;
    window.delLead = function(id) {
      _delLead(id);
      sb.from('leads').delete().eq('id', id).then(function(r) { if (r.error) console.error('Del lead:', r.error); });
    };

    // PARCEIROS
    var _salvarParc = window.salvarParc;
    window.salvarParc = function(pid, isNew) {
      _salvarParc(pid, isNew);
      setTimeout(function() {
        var p = (window.par || []).find(function(x) { return x.id === pid; });
        if (p) sb.from('parceiros').upsert(parcToDb(p)).then(function(r) { if (r.error) console.error('Save parc:', r.error); });
      }, 50);
    };

    var _delParc = window.delParc;
    window.delParc = function(id) {
      _delParc(id);
      sb.from('parceiros').delete().eq('id', id).then(function(r) { if (r.error) console.error('Del parc:', r.error); });
    };

    // LINKS
    var _salvarLink = window.salvarLink;
    window.salvarLink = function() {
      _salvarLink();
      setTimeout(function() {
        var l = (window.lnk || []).slice(-1)[0];
        if (l) sb.from('links').upsert(linkToDb(l)).then(function(r) { if (r.error) console.error('Save link:', r.error); });
      }, 50);
    };

    var _delLink = window.delLink;
    window.delLink = function(id) {
      _delLink(id);
      sb.from('links').delete().eq('id', id).then(function(r) { if (r.error) console.error('Del link:', r.error); });
    };

    // LOGISTICA
    var _salvarLog = window.salvarLogistica;
    window.salvarLogistica = function(lid, isNew) {
      _salvarLog(lid, isNew);
      setTimeout(function() {
        var l = (window.logistica || []).find(function(x) { return x.id === lid; });
        if (l) sb.from('logistica').upsert(logToDb(l)).then(function(r) { if (r.error) console.error('Save log:', r.error); });
      }, 50);
    };

    var _delLog = window.delLogistica;
    window.delLogistica = function(id) {
      _delLog(id);
      sb.from('logistica').delete().eq('id', id).then(function(r) { if (r.error) console.error('Del log:', r.error); });
    };

    // FOLLOW-UP (saved as part of evento)
    var _salvarFU = window.salvarFU;
    window.salvarFU = function(eid) {
      _salvarFU(eid);
      setTimeout(function() {
        var e = (window.ev || []).find(function(x) { return x.id === eid; });
        if (e) sb.from('eventos').upsert(evToDb(e)).then(function(r) { if (r.error) console.error('Save FU:', r.error); });
      }, 50);
    };

    // CHECKLIST (saved as part of evento)
    var _salvarCK = window.salvarCK;
    window.salvarCK = function(eid) {
      _salvarCK(eid);
      setTimeout(function() {
        var e = (window.ev || []).find(function(x) { return x.id === eid; });
        if (e) sb.from('eventos').upsert(evToDb(e)).then(function(r) { if (r.error) console.error('Save CK:', r.error); });
      }, 50);
    };

    // Load data from Supabase
    loadData();
  });

})();
`

export default function DashboardClient({ user }: Props) {
  const router = useRouter()
  const supabase = createClient()
  const mounted = useRef(false)

  useEffect(() => {
    if (mounted.current) return
    mounted.current = true

    // Inject CSS
    const style = document.createElement('style')
    style.textContent = SISTEMA_CSS
    document.head.appendChild(style)

    // Inject HTML
    document.body.innerHTML = SISTEMA_HTML

    // Expose Supabase client to window for integration script
    ;(window as any).__sb = supabase

    // Expose logout
    ;(window as any).__supabaseLogout = async () => {
      await supabase.auth.signOut()
      router.push('/login')
    }

    // Inject system JS
    const script = document.createElement('script')
    script.textContent = SISTEMA_JS
    document.body.appendChild(script)

    // Auto-login with Supabase user
    setTimeout(() => {
      try {
        const w = window as any

        w.doLogout = async () => {
          await w.__supabaseLogout()
        }

        const role = user.role || 'viewer'
        w.currentUser = {
          id: user.id,
          nome: user.nome,
          usuario: user.email,
          senha: '',
          role: role,
          ativo: true,
        }

        const authScreen = document.getElementById('authScreen')
        if (authScreen) authScreen.style.display = 'none'

        if (typeof w.renderAll === 'function') w.renderAll()

        // Inject Supabase integration (load data + wrap save functions)
        const integrationScript = document.createElement('script')
        integrationScript.textContent = SUPABASE_INTEGRATION
        document.body.appendChild(integrationScript)

      } catch (e) {
        console.error('Sistema init error:', e)
      }
    }, 150)

    // Auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') router.push('/login')
    })

    return () => {
      subscription.unsubscribe()
      style.remove()
    }
  }, [])

  return <div id="sistema-root" />
}
