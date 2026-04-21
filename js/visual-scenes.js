// =====================================================================
// CNH Brasil · Módulo Visual de Trânsito — Canvas Engine v2
// Gráficos realistas idênticos ao Simulador CTB
// =====================================================================

// ── Utilitários de cor ────────────────────────────────────────────
function vsAdjColor(hex, amt) {
  try {
    const n = parseInt(hex.replace('#',''), 16);
    const r = Math.max(0,Math.min(255,(n>>16)+amt));
    const g = Math.max(0,Math.min(255,((n>>8)&0xFF)+amt));
    const b = Math.max(0,Math.min(255,(n&0xFF)+amt));
    return 'rgb('+r+','+g+','+b+')';
  } catch(e){ return hex; }
}

// ── Desenho de carro realista ──────────────────────────────────────
function vsDrawCar(ctx, x, y, angle, color, opts) {
  opts = opts || {};
  var w=opts.w||18, h=opts.h||34;
  var brakeLights=opts.brakeLights||false;
  var headlights=opts.headlights||false;
  var label=opts.label||'';
  var alpha=opts.alpha!=null?opts.alpha:1;
  var violator=opts.violator||false;

  ctx.save();
  ctx.globalAlpha=alpha;
  ctx.translate(x,y);
  ctx.rotate(angle+Math.PI/2);

  // Sombra
  ctx.fillStyle='rgba(0,0,0,.42)';
  ctx.beginPath(); ctx.ellipse(1,3,w*0.78,h*0.38,0,0,Math.PI*2); ctx.fill();

  if(violator){
    var fa=.5+Math.sin(Date.now()*.012)*.5;
    ctx.strokeStyle='rgba(239,68,68,'+fa+')'; ctx.lineWidth=3;
    ctx.strokeRect(-w/2-7,-h/2-7,w+14,h+14);
  }

  // Pneus (4 rodas)
  var ww=2.8,wh=4.5,wx=w*0.5+0.3;
  ctx.fillStyle='#0a0a0a';
  [-1,1].forEach(function(sx){
    [-h*0.32,h*0.32].forEach(function(wy){
      ctx.beginPath(); ctx.roundRect(sx*wx-ww/2,wy-wh/2,ww,wh,1.2); ctx.fill();
    });
  });
  ctx.fillStyle='#303030';
  [-1,1].forEach(function(sx){
    [-h*0.32,h*0.32].forEach(function(wy){
      ctx.beginPath(); ctx.arc(sx*wx,wy,1,0,Math.PI*2); ctx.fill();
    });
  });

  // Corpo com gradiente
  var bg=ctx.createLinearGradient(-w/2,0,w/2,0);
  bg.addColorStop(0,vsAdjColor(color,-30));
  bg.addColorStop(.5,color);
  bg.addColorStop(1,vsAdjColor(color,-45));
  ctx.shadowColor='rgba(0,0,0,.5)'; ctx.shadowBlur=4; ctx.shadowOffsetY=1;
  ctx.fillStyle=bg;
  ctx.beginPath(); ctx.roundRect(-w/2,-h/2,w,h,5); ctx.fill();
  ctx.shadowBlur=0; ctx.shadowOffsetY=0;

  // Highlight topo
  var hg=ctx.createLinearGradient(0,-h/2,0,-h/2+h*0.18);
  hg.addColorStop(0,'rgba(255,255,255,.2)'); hg.addColorStop(1,'rgba(255,255,255,0)');
  ctx.fillStyle=hg; ctx.beginPath(); ctx.roundRect(-w/2,-h/2,w,h*0.18,[5,5,0,0]); ctx.fill();

  // Janela dianteira
  var wd=ctx.createLinearGradient(0,-h/2+h*0.1,0,-h/2+h*0.38);
  wd.addColorStop(0,'rgba(147,210,255,.78)'); wd.addColorStop(1,'rgba(100,170,220,.42)');
  ctx.fillStyle=wd; ctx.beginPath(); ctx.roundRect(-w*0.36,-h/2+h*0.1,w*0.72,h*0.24,3); ctx.fill();
  ctx.fillStyle='rgba(255,255,255,.22)';
  ctx.beginPath(); ctx.roundRect(-w*0.3,-h/2+h*0.11,w*0.22,h*0.1,2); ctx.fill();

  // Janela traseira
  ctx.fillStyle='rgba(147,210,255,.44)';
  ctx.beginPath(); ctx.roundRect(-w*0.32,-h/2+h*0.62,w*0.64,h*0.16,2); ctx.fill();

  // Detalhe lateral
  ctx.fillStyle=vsAdjColor(color,-55);
  ctx.beginPath(); ctx.roundRect(-w/2+1,-h*0.08,w-2,h*0.18,2); ctx.fill();

  // Espelhos
  ctx.fillStyle=vsAdjColor(color,-40);
  ctx.beginPath(); ctx.rect(-w/2-2.5,-h*0.24,3,5); ctx.fill();
  ctx.beginPath(); ctx.rect(w/2-0.5,-h*0.24,3,5); ctx.fill();

  // Faróis
  if(headlights){ ctx.fillStyle='#ffffe8'; ctx.shadowColor='#ffff99'; ctx.shadowBlur=14; }
  else { ctx.fillStyle='#fef9c3'; }
  ctx.beginPath(); ctx.roundRect(-w*0.43,-h/2,w*0.28,h*0.058,2); ctx.fill();
  ctx.beginPath(); ctx.roundRect( w*0.15,-h/2,w*0.28,h*0.058,2); ctx.fill();
  ctx.shadowBlur=0;

  // Lanternas traseiras
  if(brakeLights){ctx.fillStyle='#ff2200';ctx.shadowColor='#ff2200';ctx.shadowBlur=10;}
  else{ctx.fillStyle='#7f1d1d';}
  ctx.beginPath(); ctx.roundRect(-w*0.44,h/2-h*0.075,w*0.28,h*0.065,2); ctx.fill();
  ctx.beginPath(); ctx.roundRect( w*0.16,h/2-h*0.075,w*0.28,h*0.065,2); ctx.fill();
  ctx.shadowBlur=0;

  ctx.restore();

  if(label){
    ctx.save();
    ctx.font='bold 10px DM Sans,sans-serif'; ctx.textAlign='center';
    ctx.fillStyle='#f8fafc'; ctx.shadowColor='rgba(0,0,0,.9)'; ctx.shadowBlur=4;
    ctx.fillText(label,x,y-h/2-9);
    ctx.shadowBlur=0; ctx.restore();
  }
}

// ── Desenho de moto realista ───────────────────────────────────────
function vsDrawMoto(ctx, x, y, angle, color, opts) {
  opts = opts || {};
  var headlights=opts.headlights||false;
  var brakeLights=opts.brakeLights||false;
  var helmet=opts.helmet!=null?opts.helmet:true;
  var label=opts.label||'';
  var alpha=opts.alpha!=null?opts.alpha:1;
  var cw=8, ch=18;
  ctx.save(); ctx.globalAlpha=alpha;
  ctx.translate(x,y); ctx.rotate(angle+Math.PI/2);

  ctx.fillStyle='rgba(0,0,0,.4)';
  ctx.beginPath(); ctx.ellipse(0,3,cw*0.8,ch*0.35,0,0,Math.PI*2); ctx.fill();

  ctx.fillStyle='#0a0a0a';
  ctx.beginPath(); ctx.ellipse(0,-ch*0.42,2.8,5,0,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#404040'; ctx.beginPath(); ctx.arc(0,-ch*0.42,1.2,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#0a0a0a';
  ctx.beginPath(); ctx.ellipse(0,ch*0.42,2.8,5,0,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#404040'; ctx.beginPath(); ctx.arc(0,ch*0.42,1.2,0,Math.PI*2); ctx.fill();

  ctx.fillStyle=color; ctx.shadowColor='rgba(0,0,0,.35)'; ctx.shadowBlur=4;
  ctx.beginPath(); ctx.roundRect(-cw/2+1,-ch/2+5,cw-2,ch-10,3); ctx.fill();
  ctx.shadowBlur=0;
  ctx.fillStyle=vsAdjColor(color,-25);
  ctx.beginPath(); ctx.roundRect(-cw/2+2,-ch*0.05,cw-4,ch*0.3,2); ctx.fill();

  ctx.strokeStyle='#2a2a2a'; ctx.lineWidth=1.4;
  ctx.beginPath(); ctx.moveTo(-cw*0.55,-ch*0.25); ctx.lineTo(cw*0.55,-ch*0.25); ctx.stroke();

  ctx.fillStyle='#0f172a';
  ctx.beginPath(); ctx.roundRect(-cw/2+2,-ch*0.12,cw-4,ch*0.42,3); ctx.fill();

  if(helmet){
    ctx.fillStyle='#0a0a0a'; ctx.beginPath(); ctx.arc(0,-ch*0.32,3.6,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='rgba(140,200,255,.7)';
    ctx.beginPath(); ctx.arc(0,-ch*0.30,3.0,Math.PI*1.1,Math.PI*1.9,false); ctx.closePath(); ctx.fill();
    ctx.fillStyle='rgba(255,255,255,.45)'; ctx.beginPath(); ctx.arc(-1.2,-ch*0.34,1,0,Math.PI*2); ctx.fill();
  } else {
    ctx.fillStyle='#fde0c4'; ctx.beginPath(); ctx.arc(0,-ch*0.32,3.2,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#1f1f1f'; ctx.beginPath(); ctx.arc(0,-ch*0.34,3.2,Math.PI,0,false); ctx.closePath(); ctx.fill();
  }

  if(headlights){
    ctx.fillStyle='#ffffe0'; ctx.shadowColor='#ffff99'; ctx.shadowBlur=14;
    ctx.beginPath(); ctx.arc(0,-ch*0.5,1.6,0,Math.PI*2); ctx.fill(); ctx.shadowBlur=0;
  }
  if(brakeLights){
    ctx.fillStyle='#ff2200'; ctx.shadowColor='#ff2200'; ctx.shadowBlur=8;
    ctx.beginPath(); ctx.arc(0,ch*0.5,1.4,0,Math.PI*2); ctx.fill(); ctx.shadowBlur=0;
  }
  ctx.restore();
  if(label){
    ctx.save(); ctx.font='bold 10px DM Sans,sans-serif'; ctx.textAlign='center';
    ctx.fillStyle='#f8fafc'; ctx.shadowColor='rgba(0,0,0,.9)'; ctx.shadowBlur=3;
    ctx.fillText(label,x,y-ch/2-10); ctx.shadowBlur=0; ctx.restore();
  }
}

// ── Ônibus / caminhão ──────────────────────────────────────────────
function vsDrawBus(ctx, x, y, angle, color, opts) {
  opts = opts || {};
  var label=opts.label||''; var alpha=opts.alpha!=null?opts.alpha:1; var brakeLights=opts.brakeLights||false;
  var cw=22, ch=58;
  ctx.save(); ctx.globalAlpha=alpha; ctx.translate(x,y); ctx.rotate(angle+Math.PI/2);
  ctx.fillStyle='rgba(0,0,0,.4)';
  ctx.beginPath(); ctx.ellipse(1,3,cw*0.8,ch*0.38,0,0,Math.PI*2); ctx.fill();
  var ww=3.2,wh=5.5,wx=cw*0.5+0.3;
  ctx.fillStyle='#0a0a0a';
  [-1,1].forEach(function(sx){[-ch*0.32,ch*0.32].forEach(function(wy){ctx.beginPath();ctx.roundRect(sx*wx-ww/2,wy-wh/2,ww,wh,1.2);ctx.fill();});});
  var bg=ctx.createLinearGradient(-cw/2,0,cw/2,0);
  bg.addColorStop(0,vsAdjColor(color,-30)); bg.addColorStop(.5,color); bg.addColorStop(1,vsAdjColor(color,-45));
  ctx.fillStyle=bg; ctx.shadowColor='rgba(0,0,0,.5)'; ctx.shadowBlur=4; ctx.shadowOffsetY=1;
  ctx.beginPath(); ctx.roundRect(-cw/2,-ch/2,cw,ch,3); ctx.fill();
  ctx.shadowBlur=0; ctx.shadowOffsetY=0;
  for(var i=0;i<3;i++){ctx.fillStyle='rgba(147,210,255,.58)';ctx.beginPath();ctx.roundRect(-cw*0.38,-ch*0.42+i*ch*0.22,cw*0.76,ch*0.16,2);ctx.fill();}
  ctx.fillStyle='#fef9c3';
  ctx.beginPath(); ctx.roundRect(-cw*0.42,-ch/2,cw*0.28,ch*0.055,2); ctx.fill();
  ctx.beginPath(); ctx.roundRect( cw*0.14,-ch/2,cw*0.28,ch*0.055,2); ctx.fill();
  ctx.fillStyle=brakeLights?'#ff2200':'#7f1d1d';
  ctx.beginPath(); ctx.roundRect(-cw*0.44,ch/2-ch*0.07,cw*0.28,ch*0.065,2); ctx.fill();
  ctx.beginPath(); ctx.roundRect( cw*0.16,ch/2-ch*0.07,cw*0.28,ch*0.065,2); ctx.fill();
  ctx.restore();
  if(label){ctx.save();ctx.font='bold 10px DM Sans,sans-serif';ctx.textAlign='center';ctx.fillStyle='#f8fafc';ctx.shadowColor='rgba(0,0,0,.9)';ctx.shadowBlur=3;ctx.fillText(label,x,y-ch/2-10);ctx.shadowBlur=0;ctx.restore();}
}

// ── Pedestre realista animado ──────────────────────────────────────
function vsDrawPedestrian(ctx, x, y, facing, bodyColor, opts) {
  opts = opts || {};
  var skinColor=opts.skinColor||'#fde0c4';
  var size=opts.size||1;
  var walkPhase=opts.walkPhase||0;
  var label=opts.label||'';
  var alpha=opts.alpha!=null?opts.alpha:1;
  var hairColor=opts.hairColor||'#3b2417';
  var s=size;

  ctx.save(); ctx.globalAlpha=alpha; ctx.translate(x,y); ctx.rotate(facing);

  // Sombra
  ctx.fillStyle='rgba(0,0,0,.32)';
  ctx.beginPath(); ctx.ellipse(0,20*s,7*s,2.2*s,0,0,Math.PI*2); ctx.fill();

  var legSwing=Math.sin(walkPhase)*14;

  // Perna esquerda
  ctx.save(); ctx.translate(-3*s,8*s); ctx.rotate(legSwing*Math.PI/180);
  ctx.fillStyle='#1e293b'; ctx.beginPath(); ctx.roundRect(-2*s,0,4*s,14*s,2); ctx.fill();
  ctx.fillStyle='#0a0a0a'; ctx.beginPath(); ctx.ellipse(-1*s,14*s,3*s,1.5*s,0,0,Math.PI*2); ctx.fill();
  ctx.restore();

  // Perna direita
  ctx.save(); ctx.translate(3*s,8*s); ctx.rotate(-legSwing*Math.PI/180);
  ctx.fillStyle='#1e293b'; ctx.beginPath(); ctx.roundRect(-2*s,0,4*s,14*s,2); ctx.fill();
  ctx.fillStyle='#0a0a0a'; ctx.beginPath(); ctx.ellipse(1*s,14*s,3*s,1.5*s,0,0,Math.PI*2); ctx.fill();
  ctx.restore();

  // Corpo
  ctx.fillStyle=bodyColor; ctx.shadowColor='rgba(0,0,0,.28)'; ctx.shadowBlur=3;
  ctx.beginPath(); ctx.roundRect(-6*s,-10*s,12*s,20*s,3); ctx.fill(); ctx.shadowBlur=0;

  var armSwing=-Math.sin(walkPhase)*18;

  // Braço esquerdo
  ctx.save(); ctx.translate(-7*s,-5*s); ctx.rotate(armSwing*Math.PI/180);
  ctx.fillStyle=bodyColor; ctx.beginPath(); ctx.roundRect(-2*s,0,4*s,12*s,2); ctx.fill();
  ctx.fillStyle=skinColor; ctx.beginPath(); ctx.arc(0,12*s,2.5*s,0,Math.PI*2); ctx.fill();
  ctx.restore();

  // Braço direito
  ctx.save(); ctx.translate(7*s,-5*s); ctx.rotate(-armSwing*Math.PI/180);
  ctx.fillStyle=bodyColor; ctx.beginPath(); ctx.roundRect(-2*s,0,4*s,12*s,2); ctx.fill();
  ctx.fillStyle=skinColor; ctx.beginPath(); ctx.arc(0,12*s,2.5*s,0,Math.PI*2); ctx.fill();
  ctx.restore();

  // Pescoço
  ctx.fillStyle=skinColor; ctx.beginPath(); ctx.roundRect(-2*s,-13*s,4*s,5*s,1); ctx.fill();

  // Cabeça
  ctx.fillStyle=skinColor; ctx.shadowColor='rgba(0,0,0,.18)'; ctx.shadowBlur=4;
  ctx.beginPath(); ctx.arc(0,-18*s,6.5*s,0,Math.PI*2); ctx.fill(); ctx.shadowBlur=0;

  // Cabelo
  ctx.fillStyle=hairColor;
  ctx.beginPath(); ctx.arc(0,-19*s,6*s,Math.PI,0); ctx.closePath(); ctx.fill();

  // Olhos
  ctx.fillStyle='#1e293b';
  ctx.beginPath(); ctx.arc(-2.5*s,-18*s,0.8*s,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(2.5*s,-18*s,0.8*s,0,Math.PI*2); ctx.fill();

  ctx.restore();
  if(label){
    ctx.save(); ctx.font='bold 10px DM Sans,sans-serif'; ctx.textAlign='center';
    ctx.fillStyle='#f8fafc'; ctx.shadowColor='rgba(0,0,0,.9)'; ctx.shadowBlur=4;
    ctx.fillText(label,x,y-29*s); ctx.shadowBlur=0; ctx.restore();
  }
}

// ── Semáforo realista ──────────────────────────────────────────────
function vsDrawTrafficLight(ctx, x, y, state) {
  var sz=11;
  var pg=ctx.createLinearGradient(x-2,0,x+2,0);
  pg.addColorStop(0,'#3a3a3a'); pg.addColorStop(.5,'#6a6a6a'); pg.addColorStop(1,'#3a3a3a');
  ctx.fillStyle=pg; ctx.fillRect(x-1.5,y-sz*4,3,sz*4);
  ctx.fillStyle='#2a2a2a'; ctx.beginPath(); ctx.ellipse(x,y,5,2,0,0,Math.PI*2); ctx.fill();
  var bx=x-sz/2-4,by=y-sz*3.6-6,bw=sz+8,bh=sz*3.4+8;
  ctx.fillStyle='rgba(0,0,0,.5)'; ctx.beginPath(); ctx.roundRect(bx+2,by+2,bw,bh,4); ctx.fill();
  var bodyG=ctx.createLinearGradient(bx,by,bx+bw,by);
  bodyG.addColorStop(0,'#0a0a0a'); bodyG.addColorStop(.5,'#1f1f1f'); bodyG.addColorStop(1,'#0a0a0a');
  ctx.fillStyle=bodyG; ctx.strokeStyle='#444'; ctx.lineWidth=1;
  ctx.beginPath(); ctx.roundRect(bx,by,bw,bh,4); ctx.fill(); ctx.stroke();
  var lc={red:'#ef4444',yellow:'#fbbf24',green:'#22c55e'};
  var sm={green:['off','off','green'],yellow:['off','yellow','off'],red:['red','off','off']};
  var sl=sm[state]||sm.red;
  for(var i=0;i<3;i++){
    var cy=y-sz*(2.8-i)-2;
    var lit=sl[i]!=='off';
    var c=lit?lc[sl[i]]:'#1a1a1a';
    ctx.fillStyle='#0a0a0a';
    ctx.beginPath();
    ctx.moveTo(x-sz/2-2,cy-sz/2-1); ctx.lineTo(x+sz/2+2,cy-sz/2-1);
    ctx.lineTo(x+sz/2+1,cy-sz/2-3); ctx.lineTo(x-sz/2-1,cy-sz/2-3);
    ctx.closePath(); ctx.fill();
    if(lit){ctx.shadowColor=lc[sl[i]]; ctx.shadowBlur=16;}
    ctx.fillStyle=c; ctx.beginPath(); ctx.arc(x,cy,sz/2,0,Math.PI*2); ctx.fill();
    if(lit){ctx.fillStyle='rgba(255,255,255,.55)';ctx.beginPath();ctx.arc(x-sz*.18,cy-sz*.18,sz*.18,0,Math.PI*2);ctx.fill();}
    ctx.shadowBlur=0;
    ctx.strokeStyle='#2a2a2a'; ctx.lineWidth=1;
    ctx.beginPath(); ctx.arc(x,cy,sz/2,0,Math.PI*2); ctx.stroke();
  }
}

// ── Estrada horizontal ─────────────────────────────────────────────
function vsDrawRoadH(ctx, W, H, yC, laneW, opts) {
  opts = opts || {};
  var showCrossWalk=opts.showCrossWalk||false;
  var cwX=opts.cwX||0, cwW=opts.cwW||110;
  var roadW=laneW*4;
  var y0=yC-roadW/2;

  ctx.fillStyle='#aab0b6'; ctx.fillRect(0,y0-13,W,13);
  ctx.fillStyle='#aab0b6'; ctx.fillRect(0,y0+roadW,W,13);
  ctx.fillStyle='#7a808a'; ctx.fillRect(0,y0-2,W,2);
  ctx.fillStyle='#7a808a'; ctx.fillRect(0,y0+roadW,W,2);
  ctx.strokeStyle='#8a9098'; ctx.lineWidth=0.7;
  for(var x2=0;x2<W;x2+=22){
    ctx.beginPath(); ctx.moveTo(x2,y0-13); ctx.lineTo(x2,y0-2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x2,y0+roadW+2); ctx.lineTo(x2,y0+roadW+13); ctx.stroke();
  }

  var ag=ctx.createLinearGradient(0,y0,0,y0+roadW);
  ag.addColorStop(0,'#26262a'); ag.addColorStop(.5,'#2e2e32'); ag.addColorStop(1,'#26262a');
  ctx.fillStyle=ag; ctx.fillRect(0,y0,W,roadW);

  if(showCrossWalk){
    var nS=6, sW=cwW/nS/1.65, gap=cwW/nS;
    ctx.fillStyle='rgba(248,250,252,0.92)';
    for(var i=0;i<nS;i++) ctx.fillRect(cwX+i*gap,y0,sW,roadW);
  }

  ctx.strokeStyle='#fbbf24'; ctx.lineWidth=1.6; ctx.setLineDash([]);
  ctx.beginPath(); ctx.moveTo(0,yC-1.5); ctx.lineTo(W,yC-1.5); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0,yC+1.5); ctx.lineTo(W,yC+1.5); ctx.stroke();

  ctx.setLineDash([22,14]); ctx.strokeStyle='rgba(255,255,255,.8)'; ctx.lineWidth=1.4;
  ctx.beginPath(); ctx.moveTo(0,yC-laneW*2); ctx.lineTo(W,yC-laneW*2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0,yC+laneW*2); ctx.lineTo(W,yC+laneW*2); ctx.stroke();
  ctx.setLineDash([]);

  ctx.strokeStyle='rgba(255,255,255,.7)'; ctx.lineWidth=1.2;
  ctx.beginPath(); ctx.moveTo(0,y0+1.5); ctx.lineTo(W,y0+1.5); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0,y0+roadW-1.5); ctx.lineTo(W,y0+roadW-1.5); ctx.stroke();
}

function vsDrawSpeedSign(ctx, x, y, spd) {
  ctx.save();
  ctx.strokeStyle='#888'; ctx.lineWidth=1.5;
  ctx.beginPath(); ctx.moveTo(x,y+13); ctx.lineTo(x,y+28); ctx.stroke();
  ctx.fillStyle='#fff'; ctx.strokeStyle='#cc0000'; ctx.lineWidth=2.5;
  ctx.beginPath(); ctx.arc(x,y,13,0,Math.PI*2); ctx.fill(); ctx.stroke();
  ctx.fillStyle='#cc0000'; ctx.font='bold 8px DM Sans,sans-serif';
  ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(spd,x,y);
  ctx.restore();
}

function vsDrawLabel(ctx, x, y, w, lines, opts) {
  opts = opts || {};
  var bg=opts.bg||'rgba(15,23,42,0.95)';
  var border=opts.border||'#3b82f6';
  var r=opts.r||8, pad=opts.pad||10;
  var lh=17;
  var h=lines.length*lh+pad*2-2;
  ctx.save();
  ctx.fillStyle=bg; ctx.strokeStyle=border; ctx.lineWidth=1.5;
  ctx.shadowColor='rgba(0,0,0,.6)'; ctx.shadowBlur=14;
  ctx.beginPath(); ctx.roundRect(x,y,w,h,r); ctx.fill(); ctx.stroke();
  ctx.shadowBlur=0;
  lines.forEach(function(line,i){
    ctx.font=line.font||'11px DM Sans,sans-serif';
    ctx.fillStyle=line.color||'#e8edf5';
    ctx.textAlign='left'; ctx.textBaseline='alphabetic';
    ctx.fillText(line.text,x+pad,y+pad+lh*i+lh*0.72);
  });
  ctx.restore();
}

function vsDrawStatusBar(ctx, W, H, text, type) {
  var bg=type==='danger'?'rgba(127,29,29,0.95)':type==='warn'?'rgba(120,53,14,0.95)':'rgba(20,83,45,0.92)';
  ctx.save();
  ctx.fillStyle=bg;
  ctx.beginPath(); ctx.roundRect(8,H-32,W-16,24,4); ctx.fill();
  ctx.font='bold 10px DM Sans,sans-serif'; ctx.textAlign='center'; ctx.fillStyle='#f8fafc';
  ctx.shadowColor='rgba(0,0,0,.5)'; ctx.shadowBlur=2;
  ctx.fillText(text,W/2,H-14);
  ctx.shadowBlur=0; ctx.restore();
}

// ═══════════════════════════════════════════════════════════════
// CENAS
// ═══════════════════════════════════════════════════════════════
var VISUAL_SCENES = [
  {
    id:'linhas-pista', icon:'━━',
    title:'Linhas do Pavimento',
    desc:'Entenda cada linha da pista — o que pode e o que é proibido',
    scenes:[
      {
        id:'linha-amarela-continua',
        title:'Linha Amarela Contínua — PROIBIDO Ultrapassar',
        rule:'Linha contínua amarela = NUNCA ultrapasse. Infração GRAVE: 5 pontos + R$195,23',
        status:'danger',
        render:function(ctx,W,H,t){
          var sky=ctx.createLinearGradient(0,0,0,H*.52);
          sky.addColorStop(0,'#87ceeb'); sky.addColorStop(1,'#c8e8f5');
          ctx.fillStyle=sky; ctx.fillRect(0,0,W,H*.52);
          ctx.fillStyle='#4a7c59'; ctx.fillRect(0,H*.52,W,H*.48);
          var yC=H*.54, laneW=30;
          vsDrawRoadH(ctx,W,H,yC,laneW);
          ctx.strokeStyle='#fbbf24'; ctx.lineWidth=4.5; ctx.setLineDash([]);
          ctx.beginPath(); ctx.moveTo(0,yC); ctx.lineTo(W,yC); ctx.stroke();
          var bx=(t*80%(W+100))-50;
          vsDrawCar(ctx,bx,yC+laneW/2+10,0,'#2563eb',{label:'✅ Correto'});
          var px=W-(t*65%(W+100))+30;
          vsDrawCar(ctx,px,yC-laneW/2-10,Math.PI,'#7c3aed',{});
          var wobble=Math.sin(t*1.6)*20;
          vsDrawCar(ctx,W*.42,yC+laneW/2+10+wobble,Math.sin(t*1.6)*.22,'#dc2626',{});
          if(Math.sin(t*4.5)>0){
            ctx.save(); ctx.font='bold 11px DM Sans'; ctx.textAlign='center';
            ctx.fillStyle='#ef4444'; ctx.shadowColor='rgba(0,0,0,.9)'; ctx.shadowBlur=4;
            ctx.fillText('🚫 PROIBIDO!',W*.42,yC-8); ctx.shadowBlur=0; ctx.restore();
          }
          vsDrawLabel(ctx,W*.55,8,W*.43,[
            {text:'⚠️ LINHA AMARELA CONTÍNUA',font:'bold 11px DM Sans',color:'#fbbf24'},
            {text:'Proibição TOTAL de ultrapassar',color:'#e8edf5'},
            {text:'Infração GRAVE · 5pts · R$195,23',color:'#fca5a5'},
          ],{border:'#fbbf24'});
          vsDrawStatusBar(ctx,W,H,'🚫 Cruzar a linha amarela contínua = Infração GRAVE · 5 pts · R$195,23','danger');
        }
      },
      {
        id:'linha-amarela-tracejada',
        title:'Linha Amarela Tracejada — Ultrapassagem Permitida',
        rule:'Linha tracejada amarela = ultrapassagem PERMITIDA quando há visibilidade e segurança.',
        status:'ok',
        render:function(ctx,W,H,t){
          var sky=ctx.createLinearGradient(0,0,0,H*.52);
          sky.addColorStop(0,'#87ceeb'); sky.addColorStop(1,'#c8e8f5');
          ctx.fillStyle=sky; ctx.fillRect(0,0,W,H*.52);
          ctx.fillStyle='#4a7c59'; ctx.fillRect(0,H*.52,W,H*.48);
          var yC=H*.54, laneW=30;
          vsDrawRoadH(ctx,W,H,yC,laneW);
          ctx.strokeStyle='#fbbf24'; ctx.lineWidth=4;
          ctx.setLineDash([38,22]); ctx.lineDashOffset=-(t*55%60);
          ctx.beginPath(); ctx.moveTo(0,yC); ctx.lineTo(W,yC); ctx.stroke();
          ctx.setLineDash([]);
          vsDrawCar(ctx,(t*38%(W+100))-50,yC+laneW/2+10,0,'#94a3b8',{label:'🐢 Lento'});
          var prog=(t*.16)%1;
          var ox,oy,oang=0;
          if(prog<.18){ox=W*.22+prog*W*.5;oy=yC+laneW/2+10;}
          else if(prog<.28){var p=(prog-.18)/.1;ox=W*.31+p*W*.12;oy=yC+laneW/2+10-p*(laneW+14);oang=-p*.3;}
          else if(prog<.62){ox=W*.43+(prog-.28)*W*1.6;oy=yC-laneW/2-10;}
          else if(prog<.72){var p2=(prog-.62)/.1;ox=W*.8+p2*W*.1;oy=yC-laneW/2-10+p2*(laneW+14);oang=p2*.3;}
          else{ox=W*.9+(prog-.72)*W*2;oy=yC+laneW/2+10;}
          vsDrawCar(ctx,ox,oy,oang,'#16a34a',{label:'✅ Ultrapassando'});
          vsDrawLabel(ctx,8,8,W*.44,[
            {text:'✅ LINHA TRACEJADA AMARELA',font:'bold 11px DM Sans',color:'#22c55e'},
            {text:'Ultrapassagem permitida com segurança',color:'#e8edf5'},
            {text:'Sinalize e verifique visibilidade!',color:'#bbf7d0'},
          ],{border:'#22c55e'});
          vsDrawStatusBar(ctx,W,H,'✅ Linha tracejada = permitido ultrapassar · Verifique visibilidade e sinalize antes!','ok');
        }
      },
      {
        id:'faixa-pedestres',
        title:'Faixa de Pedestres — Prioridade Absoluta',
        rule:'Pedestre na faixa = PARE. Parar SOBRE a faixa é infração GRAVE. Não dar preferência = 5 pontos.',
        status:'danger',
        render:function(ctx,W,H,t){
          var sky=ctx.createLinearGradient(0,0,0,H*.48);
          sky.addColorStop(0,'#87ceeb'); sky.addColorStop(1,'#bfdbfe');
          ctx.fillStyle=sky; ctx.fillRect(0,0,W,H*.48);
          ctx.fillStyle='#4a7c59'; ctx.fillRect(0,H*.82,W,H*.18);
          var yC=H*.62, laneW=34, cwX=W*.42, cwW=110;
          vsDrawRoadH(ctx,W,H,yC,laneW,{showCrossWalk:true,cwX:cwX,cwW:cwW});
          // Carro azul para ANTES da faixa
          var bprog=Math.min(1,(t*.14)%1.9);
          var bStopX=cwX-54;
          var bx=bprog<.4?(bprog/.4)*(bStopX+W*.08)-W*.08:bStopX;
          var bBrake=bprog>=.36;
          vsDrawCar(ctx,bx,yC+laneW/2+12,0,'#2563eb',{brakeLights:bBrake});
          if(bBrake){
            ctx.save();
            ctx.fillStyle='rgba(20,83,45,.95)'; ctx.strokeStyle='#22c55e'; ctx.lineWidth=1.5;
            ctx.beginPath(); ctx.roundRect(bx-48,yC+laneW/2-22,96,20,5); ctx.fill(); ctx.stroke();
            ctx.font='bold 10px DM Sans'; ctx.textAlign='center'; ctx.fillStyle='#86efac';
            ctx.fillText('✅ PAROU',bx,yC+laneW/2-8); ctx.restore();
          }
          // Carro vermelho SOBRE A FAIXA (posicionado claramente sobre ela)
          var redX=cwX+cwW*.38;
          var redY=yC-laneW/2-12;
          vsDrawCar(ctx,redX,redY,Math.PI,'#dc2626',{brakeLights:true});
          if(Math.sin(t*3.2)>0){
            ctx.save(); ctx.font='bold 11px DM Sans'; ctx.textAlign='center';
            ctx.fillStyle='#ef4444'; ctx.shadowColor='rgba(0,0,0,.9)'; ctx.shadowBlur=5;
            ctx.fillText('🚫 SOBRE A FAIXA!',redX,redY+30); ctx.shadowBlur=0; ctx.restore();
          }
          // Pedestres atravessando
          var ph=t*3;
          vsDrawPedestrian(ctx,cwX+(t*25%(cwW+50))-25,yC-3,Math.PI/2,'#3b82f6',{walkPhase:ph,size:.85});
          vsDrawPedestrian(ctx,cwX+(t*16+30)%(cwW+30)-15,yC+10,Math.PI/2,'#ec4899',{walkPhase:ph+1.2,size:.68,skinColor:'#fbbf24',hairColor:'#92400e'});
          vsDrawPedestrian(ctx,cwX-20,yC-laneW-30,0,'#1d4ed8',{walkPhase:0,size:.75,alpha:.85});
          vsDrawStatusBar(ctx,W,H,'⚠️ Pedestre na faixa = PARE. Parar sobre a faixa = infração GRAVE · 5 pts','danger');
        }
      }
    ]
  },
  {
    id:'semaforos', icon:'🚦',
    title:'Semáforos',
    desc:'Situações reais com semáforos: o que cada luz significa e como agir',
    scenes:[
      {
        id:'sinal-vermelho',
        title:'Sinal Vermelho — PARE Totalmente',
        rule:'Sinal vermelho = PARE COMPLETAMENTE. Avançar é infração GRAVÍSSIMA (7 pts) e causa de morte.',
        status:'danger',
        render:function(ctx,W,H,t){
          ctx.fillStyle='#0f172a'; ctx.fillRect(0,0,W,H);
          ctx.fillStyle='#374151'; ctx.fillRect(0,H*.68,W,H*.32);
          var yC=H*.57, laneW=30;
          vsDrawRoadH(ctx,W,H,yC,laneW);
          vsDrawTrafficLight(ctx,W*.46,yC-laneW-44,'red');
          var gp=(t*.12)%1.6;
          var gsx=gp<.5?(-W*.1+gp*W*1.4):(W*.4-laneW*2.5);
          vsDrawCar(ctx,gsx,yC+laneW/2+10,0,'#16a34a',{brakeLights:gp>=.46,label:gp>=.48?'✅ PAROU':''});
          var rx=(t*85%(W+100))-50;
          vsDrawCar(ctx,rx,yC-laneW/2-10,Math.PI,'#dc2626',{});
          if(rx>W*.05&&rx<W*.7&&Math.sin(t*4.5)>0){
            ctx.save(); ctx.font='bold 11px DM Sans'; ctx.textAlign='center';
            ctx.fillStyle='#ef4444'; ctx.shadowColor='rgba(0,0,0,.9)'; ctx.shadowBlur=5;
            ctx.fillText('🚫 AVANÇOU O VERMELHO!',rx,yC-laneW/2-36); ctx.shadowBlur=0; ctx.restore();
          }
          vsDrawLabel(ctx,8,8,W*.42,[
            {text:'🔴 LUZ VERMELHA',font:'bold 12px DM Sans',color:'#ef4444'},
            {text:'• PARE COMPLETAMENTE',color:'#f1f5f9'},
            {text:'• Aguarde o sinal verde',color:'#f1f5f9'},
            {text:'• GRAVÍSSIMA: 7 pts + suspensão',color:'#fca5a5'},
          ],{border:'#ef4444'});
          vsDrawStatusBar(ctx,W,H,'🔴 Avançar sinal vermelho = principal causa de mortes em cruzamentos urbanos','danger');
        }
      },
      {
        id:'sinal-amarelo',
        title:'Sinal Amarelo — Atenção: Prepare-se para Parar',
        rule:'Amarelo NÃO significa acelerar. Só passe se parar for mais perigoso que continuar.',
        status:'warning',
        render:function(ctx,W,H,t){
          ctx.fillStyle='#0f172a'; ctx.fillRect(0,0,W,H);
          ctx.fillStyle='#374151'; ctx.fillRect(0,H*.68,W,H*.32);
          var yC=H*.57, laneW=30;
          vsDrawRoadH(ctx,W,H,yC,laneW);
          vsDrawTrafficLight(ctx,W*.46,yC-laneW-44,'yellow');
          var pp=(t*.12)%1.6;
          var px=pp<.5?(-W*.1+pp*W*1.2):(W*.36-laneW*2.5);
          vsDrawCar(ctx,px,yC+laneW/2+10,0,'#7c3aed',{brakeLights:pp>=.44,label:'✅ Freando'});
          var rp=(t*.17)%1.3;
          var rx=rp>0.18?(-W*.1+(rp-.18)*W*2.6):-W*.1;
          vsDrawCar(ctx,rx,yC-laneW/2-10,Math.PI,'#dc2626',{});
          if(rx>W*.05&&rx<W*.65){
            ctx.save(); ctx.font='bold 11px DM Sans'; ctx.textAlign='center';
            ctx.fillStyle='#fbbf24'; ctx.shadowColor='rgba(0,0,0,.9)'; ctx.shadowBlur=3;
            ctx.fillText('🚫 Acelerou!',rx,yC-laneW/2-34); ctx.shadowBlur=0; ctx.restore();
          }
          vsDrawLabel(ctx,W*.55,8,W*.43,[
            {text:'🟡 LUZ AMARELA',font:'bold 12px DM Sans',color:'#fbbf24'},
            {text:'• Atenção: sinal vai fechar',color:'#f1f5f9'},
            {text:'• Prepare-se para parar',color:'#f1f5f9'},
            {text:'• NUNCA acelere no amarelo!',color:'#ef4444'},
          ],{border:'#fbbf24'});
          vsDrawStatusBar(ctx,W,H,'⚠️ Amarelo ≠ acelere! Avançar indevidamente no amarelo = infração GRAVE (5 pts)','warn');
        }
      },
      {
        id:'sinal-verde',
        title:'Sinal Verde — Prossiga com Atenção',
        rule:'Verde = pode avançar, MAS verifique antes! Pedestres ou carros podem ainda estar cruzando.',
        status:'ok',
        render:function(ctx,W,H,t){
          var sky=ctx.createLinearGradient(0,0,0,H*.48);
          sky.addColorStop(0,'#7dd3fc'); sky.addColorStop(1,'#bae6fd');
          ctx.fillStyle=sky; ctx.fillRect(0,0,W,H*.48);
          ctx.fillStyle='#4a7c59'; ctx.fillRect(0,H*.75,W,H*.25);
          var yC=H*.57, laneW=30, cwX=W*.44, cwW=80;
          vsDrawRoadH(ctx,W,H,yC,laneW,{showCrossWalk:true,cwX:cwX,cwW:cwW});
          vsDrawTrafficLight(ctx,W*.46,yC-laneW-44,'green');
          var bp=(t*.14)%1.6;
          var bx=W*.35+Math.max(0,bp-.2)*W*2.4;
          vsDrawCar(ctx,bx,yC+laneW/2+10,0,'#2563eb',{label:bp<.25?'✅ Avançando':''});
          var pedx=cwX+(t*20%(cwW+40))-20;
          vsDrawPedestrian(ctx,pedx,yC-laneW/2-10,Math.PI/2,'#f97316',{walkPhase:t*3,size:.8,label:'Ainda cruzando!'});
          vsDrawLabel(ctx,8,8,W*.38,[
            {text:'🟢 LUZ VERDE',font:'bold 12px DM Sans',color:'#22c55e'},
            {text:'• Pode avançar',color:'#f1f5f9'},
            {text:'• Verifique pedestres!',color:'#fbbf24'},
            {text:'• Verde ≠ via livre!',color:'#fbbf24'},
          ],{border:'#22c55e'});
          vsDrawStatusBar(ctx,W,H,'🟢 Sinal verde = pode avançar, mas sempre confirme se a via está livre antes!','ok');
        }
      }
    ]
  },
  {
    id:'tipos-via', icon:'🛣️',
    title:'Tipos de Via e Velocidades',
    desc:'Rodovias, vias urbanas, locais especiais e limites de velocidade',
    scenes:[
      {
        id:'rodovia-dupla',
        title:'Rodovia — Pista Dupla (máx. 110 km/h)',
        rule:'Pista dupla com divisor físico. Velocidade máxima 110 km/h. Use faixa da direita; esquerda = ultrapassagem.',
        status:'info',
        render:function(ctx,W,H,t){
          var sky=ctx.createLinearGradient(0,0,0,H*.5);
          sky.addColorStop(0,'#b8d4e8'); sky.addColorStop(1,'#dbeafe');
          ctx.fillStyle=sky; ctx.fillRect(0,0,W,H*.5);
          ctx.fillStyle='#4a7c59'; ctx.fillRect(0,H*.5,W,H*.5);
          var yC=H*.6, laneW=36;
          vsDrawRoadH(ctx,W,H,yC,laneW);
          vsDrawSpeedSign(ctx,W*.08,yC-laneW*2-16,'110');
          vsDrawCar(ctx,(t*78%(W+120))-60,yC+laneW/2+8,0,'#16a34a',{label:'✅ 85km/h'});
          vsDrawCar(ctx,((t*112+W*.3)%(W+120))-60,yC-laneW/2-8,0,'#2563eb',{label:'✅ 105km/h'});
          vsDrawBus(ctx,((t*42+W*.65)%(W+130))-65,yC+laneW*1.5+8,0,'#64748b',{label:'🚛 70km/h'});
          vsDrawLabel(ctx,W*.55,8,W*.43,[
            {text:'🛣️ RODOVIA — PISTA DUPLA',font:'bold 11px DM Sans',color:'#60a5fa'},
            {text:'• Velocidade máxima: 110 km/h',color:'#e8edf5'},
            {text:'• Faixa direita: tráfego normal',color:'#e8edf5'},
            {text:'• Faixa esquerda: ultrapassagem',color:'#e8edf5'},
          ],{border:'#3b82f6'});
          vsDrawStatusBar(ctx,W,H,'🛣️ Rodovia pista dupla · Máx. 110 km/h · Mantenha-se na faixa da direita','ok');
        }
      },
      {
        id:'via-urbana',
        title:'Via Arterial Urbana — Máx. 60 km/h',
        rule:'Em vias arteriais urbanas a velocidade máxima é 60 km/h. Atenção a semáforos, pedestres e motos.',
        status:'info',
        render:function(ctx,W,H,t){
          var sky=ctx.createLinearGradient(0,0,0,H*.44);
          sky.addColorStop(0,'#7dd3fc'); sky.addColorStop(1,'#bae6fd');
          ctx.fillStyle=sky; ctx.fillRect(0,0,W,H*.44);
          var blds=[[8,H*.06,55,H*.38,'#1e293b'],[70,H*.1,40,H*.34,'#172036'],[W*.55,H*.04,65,H*.4,'#1a2840'],[W*.72,H*.06,55,H*.36,'#1e2d3d']];
          blds.forEach(function(b){
            ctx.fillStyle=b[4]; ctx.fillRect(b[0],b[1],b[2],b[3]);
            for(var r=0;r<Math.floor(b[3]/12);r++) for(var c2=0;c2<Math.floor(b[2]/14);c2++){
              ctx.fillStyle=Math.sin(r*c2+t)>0.2?'rgba(255,230,120,.55)':'rgba(147,210,255,.25)';
              ctx.fillRect(b[0]+3+c2*13,b[1]+5+r*11,8,6);
            }
          });
          var yC=H*.6, laneW=30, cwX=W*.64, cwW=80;
          vsDrawRoadH(ctx,W,H,yC,laneW,{showCrossWalk:true,cwX:cwX,cwW:cwW});
          vsDrawSpeedSign(ctx,W*.08,yC-laneW*2-16,'60');
          vsDrawTrafficLight(ctx,W*.62,yC-laneW-44,'green');
          vsDrawCar(ctx,(t*52%(W+100))-50,yC+laneW/2+10,0,'#1d4ed8',{label:'55km/h ✅'});
          vsDrawCar(ctx,W-(t*44%(W+100))+30,yC-laneW/2-10,Math.PI,'#dc2626',{});
          vsDrawMoto(ctx,(t*78%(W+80))-40,yC+laneW/2+10,0,'#f59e0b',{helmet:true});
          vsDrawPedestrian(ctx,W*.2+(t*13%(W*.5)),yC+laneW*2+16,Math.PI/2,'#16a34a',{walkPhase:t*2.5,size:.75});
          vsDrawStatusBar(ctx,W,H,'🏙️ Via Arterial Urbana · Máx. 60 km/h · Atenção a semáforos e pedestres','ok');
        }
      },
      {
        id:'rotatoria',
        title:'Rotatória — Quem Está Dentro Tem Preferência',
        rule:'Na rotatória: quem está DENTRO tem preferência. Ao entrar, ceda passagem. Ao sair, use o pisca.',
        status:'info',
        render:function(ctx,W,H,t){
          var sky=ctx.createLinearGradient(0,0,0,H*.45);
          sky.addColorStop(0,'#bae6fd'); sky.addColorStop(1,'#e0f2fe');
          ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);
          ctx.fillStyle='#86efac'; ctx.fillRect(0,H*.5,W,H*.5);
          var cx=W/2, cy=H*.47, r=Math.min(W,H)*.22;
          ctx.fillStyle='#3a3a3e';
          ctx.fillRect(cx-r*.55,0,r*1.1,cy-r*.82);
          ctx.fillRect(cx-r*.55,cy+r*.82,r*1.1,H);
          ctx.fillRect(0,cy-r*.55,cx-r*.82,r*1.1);
          ctx.fillRect(cx+r*.82,cy-r*.55,W,r*1.1);
          ctx.fillStyle='#3a3a3e'; ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.fill();
          ctx.fillStyle='#16a34a'; ctx.beginPath(); ctx.arc(cx,cy,r*.52,0,Math.PI*2); ctx.fill();
          ctx.fillStyle='#22c55e'; ctx.beginPath(); ctx.arc(cx,cy,r*.38,0,Math.PI*2); ctx.fill();
          ctx.strokeStyle='rgba(255,255,255,.35)'; ctx.lineWidth=1.5; ctx.setLineDash([14,10]);
          ctx.beginPath(); ctx.arc(cx,cy,r*.75,0,Math.PI*2); ctx.stroke();
          ctx.setLineDash([]);
          ctx.font='bold 22px serif'; ctx.textAlign='center'; ctx.fillText('🌀',cx,cy+8);
          ctx.fillStyle='white'; ctx.strokeStyle='#ef4444'; ctx.lineWidth=2;
          ctx.beginPath(); ctx.moveTo(cx,cy+r*.82+4); ctx.lineTo(cx-12,cy+r*.82+20); ctx.lineTo(cx+12,cy+r*.82+20); ctx.closePath();
          ctx.fill(); ctx.stroke();
          var ang=t*.6;
          vsDrawCar(ctx,cx+Math.cos(ang)*r*.76,cy+Math.sin(ang)*r*.76,ang+Math.PI/2,'#2563eb',{label:'✅ Prioridade'});
          var ep=(t*.14)%2.2;
          var eY=ep<.75?H-(ep/.75)*(H-cy-r*1.05):cy+r*1.05;
          vsDrawCar(ctx,cx,Math.min(H,eY),ep<.75?0:Math.PI,'#16a34a',{
            brakeLights:ep>=.68&&ep<1.2, label:ep>=.68&&ep<1.2?'⏸ Cedendo':''
          });
          vsDrawLabel(ctx,8,8,W*.35,[
            {text:'🔄 ROTATÓRIA',font:'bold 11px DM Sans',color:'#22c55e'},
            {text:'• Dentro: preferência ABSOLUTA',color:'#e8edf5'},
            {text:'• Ao entrar: CEDA passagem',color:'#e8edf5'},
            {text:'• Ao sair: use o pisca-pisca',color:'#e8edf5'},
          ],{border:'#22c55e'});
          vsDrawStatusBar(ctx,W,H,'🔄 Rotatória: fluxo anti-horário · Dentro tem preferência · Sinalize ao sair!','ok');
        }
      }
    ]
  },
  {
    id:'ultrapassagem', icon:'🚗💨',
    title:'Ultrapassagem',
    desc:'Quando pode e quando não pode ultrapassar',
    scenes:[
      {
        id:'ultrapassagem-proibida',
        title:'Locais Proibidos para Ultrapassar',
        rule:'NUNCA ultrapasse em: curvas sem visibilidade, pontes, cruzamentos, linha contínua, faixa de pedestres.',
        status:'danger',
        render:function(ctx,W,H,t){
          var sky=ctx.createLinearGradient(0,0,0,H*.52);
          sky.addColorStop(0,'#7dd3fc'); sky.addColorStop(1,'#bfdbfe');
          ctx.fillStyle=sky; ctx.fillRect(0,0,W,H*.52);
          ctx.fillStyle='#4a7c59';
          ctx.beginPath(); ctx.moveTo(0,H*.53); ctx.quadraticCurveTo(W*.5,H*.28,W,H*.53);
          ctx.lineTo(W,H*.53); ctx.lineTo(0,H*.53); ctx.closePath(); ctx.fill();
          ctx.fillStyle='#4a7c59'; ctx.fillRect(0,H*.5,W,H*.5);
          var yC=H*.57, laneW=32;
          vsDrawRoadH(ctx,W,H,yC,laneW);
          ctx.strokeStyle='#fbbf24'; ctx.lineWidth=4.5; ctx.setLineDash([]);
          ctx.beginPath(); ctx.moveTo(0,yC); ctx.lineTo(W,yC); ctx.stroke();
          vsDrawCar(ctx,(t*33%(W+100))-50,yC+laneW/2+10,0,'#94a3b8',{label:'🐢 Lento'});
          var prog=(t*.18)%1;
          var rx=W*.2, ry=yC+laneW/2+10, rang=0;
          if(prog<.2){var p=prog/.2; ry-=p*(laneW+14); rang=-p*.28; rx=W*.2+p*W*.22;}
          else if(prog<.55){rx=W*.42+(prog-.2)*W*1.2; ry=yC-laneW/2-9;}
          else if(prog<.72){var p2=(prog-.55)/.17; ry=yC-laneW/2-9+p2*(laneW+14); rang=p2*.28; rx=W*.63;}
          else{rx=W*.3; ry=yC+laneW/2+10;}
          vsDrawCar(ctx,rx,ry,rang,'#dc2626',{});
          vsDrawCar(ctx,W-(t*62%(W+100))+30,yC-laneW/2-10,Math.PI,'#7c3aed',{});
          if(prog>.44&&prog<.68&&Math.sin(t*8)>0){
            ctx.save(); ctx.font='bold 18px serif'; ctx.textAlign='center';
            ctx.shadowColor='rgba(0,0,0,.9)'; ctx.shadowBlur=5;
            ctx.fillText('💥',W*.56,yC-32);
            ctx.font='bold 11px DM Sans'; ctx.fillStyle='#ef4444';
            ctx.fillText('COLISÃO FRONTAL!',W*.56,yC-14); ctx.shadowBlur=0; ctx.restore();
          }
          vsDrawLabel(ctx,8,8,W*.46,[
            {text:'🚫 PROIBIDO ULTRAPASSAR EM:',font:'bold 11px DM Sans',color:'#ef4444'},
            {text:'• Curvas e morros (visibilidade zero)',color:'#e8edf5'},
            {text:'• Linha amarela contínua',color:'#e8edf5'},
            {text:'• Pontes, viadutos e túneis',color:'#e8edf5'},
            {text:'• Cruzamentos e faixas de pedestres',color:'#e8edf5'},
          ],{bg:'rgba(127,29,29,0.95)',border:'#ef4444'});
          vsDrawStatusBar(ctx,W,H,'💥 Ultrapassagem em curva = maior causa de acidentes fatais no Brasil!','danger');
        }
      }
    ]
  },
  {
    id:'alcool-velocidade', icon:'🍺',
    title:'Álcool, Velocidade e Celular',
    desc:'As três infrações mais cobradas e mais perigosas',
    scenes:[
      {
        id:'lei-seca-visual',
        title:'Lei Seca — Tolerância ZERO no Brasil',
        rule:'TOLERÂNCIA ZERO: qualquer nível de álcool detectado = R$2.934,70 + suspensão 12 meses. Acima de 0,6g/L = CRIME.',
        status:'danger',
        render:function(ctx,W,H,t){
          ctx.fillStyle='#0f172a'; ctx.fillRect(0,0,W,H);
          [[8,H*.15,72,H*.55],[88,H*.1,48,H*.6],[W*.55,H*.12,68,H*.57],[W*.72,H*.18,58,H*.52]].forEach(function(b){
            ctx.fillStyle='#1e293b'; ctx.fillRect(b[0],b[1],b[2],b[3]);
            for(var r=0;r<Math.floor(b[3]/13);r++) for(var c2=0;c2<Math.floor(b[2]/13);c2++){
              ctx.fillStyle=Math.sin(r*3+c2*7+t*.1)>0.3?'rgba(255,230,120,.6)':'rgba(20,30,50,.7)';
              ctx.fillRect(b[0]+3+c2*12,b[1]+5+r*12,7,6);
            }
          });
          ctx.fillStyle='#374151'; ctx.fillRect(0,H*.7,W,H*.3);
          var yC=H*.6, laneW=30;
          vsDrawRoadH(ctx,W,H,yC,laneW);
          ctx.fillStyle='rgba(29,78,216,.9)';
          ctx.beginPath(); ctx.roundRect(W*.43,yC-laneW-42,W*.14,28,4); ctx.fill();
          ctx.font='bold 11px DM Sans'; ctx.textAlign='center'; ctx.fillStyle='#f8fafc';
          ctx.fillText('🚔 BLITZ',W/2,yC-laneW-23);
          var sp=Math.floor(t*3)%2;
          ctx.fillStyle=sp?'#3b82f6':'rgba(59,130,246,.1)';
          ctx.beginPath(); ctx.roundRect(W*.42,yC-laneW-57,22,13,3); ctx.fill();
          ctx.fillStyle=!sp?'#ef4444':'rgba(239,68,68,.1)';
          ctx.beginPath(); ctx.roundRect(W*.57-22,yC-laneW-57,22,13,3); ctx.fill();
          ctx.fillStyle='#ef4444'; ctx.fillRect(W*.34,yC-laneW-16,W*.32,7);
          for(var i=0;i<6;i++){ctx.fillStyle=i%2?'white':'transparent';ctx.fillRect(W*.34+i*W*.054,yC-laneW-16,W*.054,7);}
          var drunkX=(t*38%(W*.4))-W*.12;
          var wobY=Math.sin(t*2.4)*(laneW*.62);
          vsDrawCar(ctx,drunkX,yC+laneW/2+10+wobY,Math.sin(t*2.4)*.2,'#dc2626',{label:'🍺 Bêbado'});
          vsDrawLabel(ctx,8,8,W*.42,[
            {text:'🍺 LEI SECA · TOLERÂNCIA ZERO',font:'bold 11px DM Sans',color:'#ef4444'},
            {text:'• Qualquer álcool → R$2.934,70',color:'#fbbf24'},
            {text:'• Suspensão 12 meses + retenção',color:'#fbbf24'},
            {text:'• Acima 0,6g/L → CRIME (prisão)',color:'#fca5a5'},
            {text:'• Recusar bafômetro = mesma multa',color:'#e8edf5'},
          ],{bg:'rgba(127,29,29,0.95)',border:'#ef4444'});
          vsDrawStatusBar(ctx,W,H,'🍺 Dirigiu? Não bebeu. Bebeu? Não dirija. Tolerância ZERO no Brasil!','danger');
        }
      },
      {
        id:'excesso-velocidade',
        title:'Excesso de Velocidade — Distância de Frenagem',
        rule:'A cada 10 km/h a mais, a distância de frenagem aumenta muito. A 100km/h, você precisa de 100m para parar.',
        status:'warning',
        render:function(ctx,W,H,t){
          ctx.fillStyle='#0f172a'; ctx.fillRect(0,0,W,H);
          ctx.fillStyle='#374151'; ctx.fillRect(0,H*.7,W,H*.3);
          var lanes=[
            {y:H*.32,color:'#22c55e',label:'60km/h ✅',stop:.32},
            {y:H*.52,color:'#f59e0b',label:'80km/h ⚠️',stop:.52},
            {y:H*.72,color:'#ef4444',label:'100km/h 💥',stop:.72},
          ];
          lanes.forEach(function(ln){
            ctx.fillStyle='#2e2e32'; ctx.fillRect(0,ln.y-18,W,36);
            ctx.strokeStyle='rgba(255,255,255,.2)'; ctx.lineWidth=1; ctx.setLineDash([22,14]);
            ctx.beginPath(); ctx.moveTo(0,ln.y); ctx.lineTo(W,ln.y); ctx.stroke(); ctx.setLineDash([]);
            var obsX=W*.78;
            ctx.fillStyle='#fbbf24'; ctx.fillRect(obsX-3,ln.y-18,6,36);
            ctx.fillStyle='#ef4444'; ctx.beginPath(); ctx.arc(obsX,ln.y-22,7,0,Math.PI*2); ctx.fill();
            var prog=(t*.12+ln.stop*.25)%1.5;
            var cx2=prog<ln.stop?(prog/ln.stop)*(obsX-62):(obsX-62);
            vsDrawCar(ctx,cx2,ln.y,0,ln.color,{brakeLights:prog>ln.stop-.07,label:ln.label});
            if(prog>=ln.stop){
              var dist=Math.round(obsX-62-cx2+10);
              ctx.strokeStyle=ln.color+'99'; ctx.lineWidth=1.5; ctx.setLineDash([4,4]);
              ctx.beginPath(); ctx.moveTo(cx2+30,ln.y); ctx.lineTo(obsX-22,ln.y); ctx.stroke();
              ctx.setLineDash([]);
              ctx.font='bold 9px DM Mono'; ctx.textAlign='center'; ctx.fillStyle=ln.color;
              ctx.fillText('~'+dist+'px restante',cx2+(obsX-22-cx2)/2,ln.y-22);
            }
          });
          vsDrawLabel(ctx,W*.8,8,W*.19,[
            {text:'⚡ MULTAS',font:'bold 10px DM Sans',color:'#fbbf24'},
            {text:'até +20%: R$195',font:'9px DM Mono',color:'#22c55e'},
            {text:'+20-50%: R$293',font:'9px DM Mono',color:'#f59e0b'},
            {text:'+50%+: R$880',font:'9px DM Mono',color:'#ef4444'},
          ],{border:'#fbbf24'});
          vsDrawStatusBar(ctx,W,H,'Distância de frenagem cresce ao QUADRADO com a velocidade! Dupla vel. = 4× mais espaço!','warn');
        }
      }
    ]
  },
  {
    id:'manobras-reais', icon:'🎯',
    title:'Manobras e Situações Reais',
    desc:'Cruzamentos, conversões, estacionamento e situações do dia a dia',
    scenes:[
      {
        id:'cruzamento-sem-sinal',
        title:'Cruzamento Sem Sinalização — Preferência da Direita',
        rule:'Em cruzamento SEM placas ou semáforo, a preferência é de quem vem pela DIREITA (CTB Art. 29, III).',
        status:'warning',
        render:function(ctx,W,H,t){
          var sky=ctx.createLinearGradient(0,0,0,H*.42);
          sky.addColorStop(0,'#7dd3fc'); sky.addColorStop(1,'#bae6fd');
          ctx.fillStyle=sky; ctx.fillRect(0,0,W,H*.42);
          ctx.fillStyle='#86efac'; ctx.fillRect(0,H*.6,W,H*.4);
          var cxr=W*.5, cyr=H*.5, arm=68;
          ctx.fillStyle='#3a3a3e';
          ctx.fillRect(0,cyr-arm/2,W,arm);
          ctx.fillRect(cxr-arm/2,0,arm,H);
          ctx.strokeStyle='rgba(251,191,36,.55)'; ctx.lineWidth=1.8; ctx.setLineDash([14,10]);
          ctx.beginPath(); ctx.moveTo(0,cyr); ctx.lineTo(cxr-arm/2,cyr); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(cxr+arm/2,cyr); ctx.lineTo(W,cyr); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(cxr,0); ctx.lineTo(cxr,cyr-arm/2); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(cxr,cyr+arm/2); ctx.lineTo(cxr,H); ctx.stroke();
          ctx.setLineDash([]);
          var rp=(t*.13)%1;
          var redX=W-(rp*(W+100))+50;
          vsDrawCar(ctx,redX,cyr,Math.PI,'#dc2626',{label:Math.abs(redX-cxr)<90?'✅ PRIORIDADE':''});
          var bp=(t*.11)%1.8;
          var blueX=bp<.38?(bp/.38)*(cxr-arm*.55-24):bp<.8?(cxr-arm*.55-24):(cxr-arm*.55-24+(bp-.8)*W*2.6);
          var bBrake=bp>=.36&&bp<.78;
          vsDrawCar(ctx,Math.min(blueX,W+50),cyr+18,0,'#2563eb',{brakeLights:bBrake,label:bBrake?'⏸ CEDENDO':''});
          var aa=.4+Math.sin(t*3)*.4;
          ctx.save(); ctx.globalAlpha=aa;
          ctx.font='bold 24px serif'; ctx.textAlign='center'; ctx.fillText('←',W*.72,cyr-46);
          ctx.font='bold 10px DM Sans'; ctx.fillStyle='#22c55e'; ctx.fillText('PREFERÊNCIA',W*.72,cyr-28);
          ctx.restore();
          vsDrawLabel(ctx,8,8,W*.4,[
            {text:'⚠️ CRUZAMENTO SEM SINAL',font:'bold 11px DM Sans',color:'#fbbf24'},
            {text:'• Prioridade: vem da DIREITA',color:'#e8edf5'},
            {text:'• CTB Art. 29, Inciso III',color:'#94a3b8'},
            {text:'• Reduza e observe ao se aproximar',color:'#fbbf24'},
          ],{border:'#fbbf24'});
          vsDrawStatusBar(ctx,W,H,'⚠️ Sem sinalização = quem vem da direita tem preferência. Reduza e observe!','warn');
        }
      },
      {
        id:'faixa-pedestres-avancada',
        title:'Faixa de Pedestres — Comportamento Correto',
        rule:'O motorista DEVE parar para o pedestre na faixa, mesmo sem semáforo. Art. 214 CTB: infração GRAVE.',
        status:'ok',
        render:function(ctx,W,H,t){
          var sky=ctx.createLinearGradient(0,0,0,H*.47);
          sky.addColorStop(0,'#87ceeb'); sky.addColorStop(1,'#bfdbfe');
          ctx.fillStyle=sky; ctx.fillRect(0,0,W,H*.47);
          ctx.fillStyle='#4a7c59'; ctx.fillRect(0,H*.82,W,H*.18);
          var yC=H*.62, laneW=34, cwX=W*.43, cwW=112;
          vsDrawRoadH(ctx,W,H,yC,laneW,{showCrossWalk:true,cwX:cwX,cwW:cwW});
          vsDrawCar(ctx,cwX-52,yC+laneW/2+12,0,'#2563eb',{brakeLights:true});
          ctx.save();
          ctx.fillStyle='rgba(20,83,45,.96)'; ctx.strokeStyle='#22c55e'; ctx.lineWidth=1.5;
          ctx.beginPath(); ctx.roundRect(cwX-52-50,yC+laneW/2-24,100,22,5); ctx.fill(); ctx.stroke();
          ctx.font='bold 10px DM Sans'; ctx.textAlign='center'; ctx.fillStyle='#86efac';
          ctx.fillText('✅ PAROU CORRETAMENTE',cwX-52,yC+laneW/2-9); ctx.restore();
          var ph=t*3;
          vsDrawPedestrian(ctx,cwX+(t*24%(cwW+50))-25,yC-4,Math.PI/2,'#3b82f6',{walkPhase:ph,size:.85});
          vsDrawPedestrian(ctx,cwX+(t*16+25)%(cwW+30)-12,yC+12,Math.PI/2,'#ec4899',{walkPhase:ph+1.3,size:.68,skinColor:'#fbbf24',hairColor:'#92400e'});
          vsDrawPedestrian(ctx,cwX+(t*20+55)%(cwW+40)-28,yC-20,Math.PI/2,'#16a34a',{walkPhase:ph+2,size:.9});
          vsDrawPedestrian(ctx,cwX-18,yC-laneW-32,0,'#f97316',{walkPhase:0,size:.74,alpha:.82});
          vsDrawLabel(ctx,W*.72,16,W*.27,[
            {text:'✅ CORRETO',font:'bold 11px DM Sans',color:'#22c55e'},
            {text:'• Carro parou para pedestre',color:'#e8edf5'},
            {text:'• Prioridade ABSOLUTA na faixa',color:'#e8edf5'},
            {text:'• Art. 214 CTB',font:'10px DM Mono',color:'#94a3b8'},
          ],{border:'#22c55e'});
          vsDrawStatusBar(ctx,W,H,'✅ Pedestre na faixa = pare totalmente. Prioridade ABSOLUTA. Art. 214 CTB','ok');
        }
      }
    ]
  }
];

// ═══════════════════════════════════════════════════════════════
// ENGINE
// ═══════════════════════════════════════════════════════════════
var vsCurrentCategory=null, vsCurrentScene=null, vsAnimFrames={};

function vsStopAllAnimations(){
  Object.keys(vsAnimFrames).forEach(function(id){cancelAnimationFrame(vsAnimFrames[id]);});
  vsAnimFrames={};
}

function vsStartCanvasScene(canvasId,scene){
  if(vsAnimFrames[canvasId]) cancelAnimationFrame(vsAnimFrames[canvasId]);
  var canvas=document.getElementById(canvasId);
  if(!canvas) return;
  var ctx=canvas.getContext('2d');
  var t0=performance.now();
  function frame(now){
    var t=(now-t0)/1000;
    var W=canvas.width, H=canvas.height;
    ctx.clearRect(0,0,W,H);
    try{scene.render(ctx,W,H,t);}catch(e){console.warn('vsRender',e);}
    vsAnimFrames[canvasId]=requestAnimationFrame(frame);
  }
  vsAnimFrames[canvasId]=requestAnimationFrame(frame);
}

function vsResizeCanvas(canvasId){
  var canvas=document.getElementById(canvasId);
  if(!canvas) return;
  var wrap=canvas.parentElement;
  var W=wrap.clientWidth||700;
  canvas.width=W;
  canvas.height=Math.max(200,Math.min(320,W*.42));
}

function renderVisualModule(){
  var sec=document.getElementById('sec-visual');
  if(!sec) return;
  sec.innerHTML='<div class="section-title">🖼️ Guia Visual de Trânsito</div>'+
    '<div class="section-sub">Cenas interativas com animações realistas — veículos, pedestres e mecânica de trânsito real</div>'+
    '<div id="vs-cats" style="display:flex;gap:.4rem;margin-bottom:1.5rem;flex-wrap:wrap;padding-bottom:.5rem"></div>'+
    '<div id="vs-home" class="modules-grid" style="grid-template-columns:repeat(auto-fill,minmax(200px,1fr))"></div>'+
    '<div id="vs-scene-view" style="display:none">'+
      '<button class="back-btn" onclick="vsBackToCategory()">← Voltar</button>'+
      '<div id="vs-scene-inner"></div>'+
    '</div>';
  renderVsCategoryButtons();
  renderVsHome();
}

function renderVsCategoryButtons(){
  var el=document.getElementById('vs-cats');
  if(!el) return;
  var html='<button class="scenario-btn active" onclick="vsFilterCat(\'todas\',this)">Todas</button>';
  VISUAL_SCENES.forEach(function(cat){
    html+='<button class="scenario-btn" onclick="vsFilterCat(\''+cat.id+'\',this)">'+cat.icon+' '+cat.title+'</button>';
  });
  el.innerHTML=html;
}

function vsFilterCat(id,btn){
  document.querySelectorAll('#vs-cats .scenario-btn').forEach(function(b){b.classList.remove('active');});
  if(btn) btn.classList.add('active');
  vsCurrentCategory=id==='todas'?null:id;
  renderVsHome();
}

function renderVsHome(){
  var grid=document.getElementById('vs-home');
  if(!grid) return;
  vsStopAllAnimations();
  var cats=vsCurrentCategory?VISUAL_SCENES.filter(function(c){return c.id===vsCurrentCategory;}):VISUAL_SCENES;
  function bc(s){return s==='danger'?'#ef4444':s==='warning'?'#f59e0b':s==='ok'?'#22c55e':'#3b82f6';}
  function sl(s){return s==='danger'?'⛔ Infração/Perigo':s==='warning'?'⚠️ Atenção':s==='ok'?'✅ Correto':'ℹ️ Informação';}
  var html='';
  cats.forEach(function(cat){
    cat.scenes.forEach(function(scene){
      var b=bc(scene.status), l=sl(scene.status);
      html+='<div class="module-card" onclick="vsOpenScene(\''+cat.id+'\',\''+scene.id+'\')" style="border-left:4px solid '+b+';cursor:pointer">'+
        '<div class="module-icon">'+cat.icon+'</div>'+
        '<div class="module-title" style="font-size:.88rem">'+scene.title+'</div>'+
        '<div class="module-desc" style="font-size:.76rem;margin-top:.4rem;color:var(--muted)">'+scene.rule.substring(0,88)+'…</div>'+
        '<div style="margin-top:.8rem;font-size:.72rem;color:'+b+';font-weight:700;text-transform:uppercase">'+l+'</div>'+
        '</div>';
    });
  });
  grid.innerHTML=html;
}

function vsOpenScene(catId,sceneId){
  vsStopAllAnimations();
  var cat=VISUAL_SCENES.filter(function(c){return c.id===catId;})[0];
  var scene=cat?cat.scenes.filter(function(s){return s.id===sceneId;})[0]:null;
  if(!scene) return;
  vsCurrentScene=scene;
  document.getElementById('vs-home').style.display='none';
  document.getElementById('vs-cats').style.display='none';
  document.getElementById('vs-scene-view').style.display='block';
  var sc=scene.status==='danger'?'#ef4444':scene.status==='warning'?'#f59e0b':scene.status==='ok'?'#22c55e':'#3b82f6';
  var sl=scene.status==='danger'?'⛔ Infração/Perigo':scene.status==='warning'?'⚠️ Atenção':scene.status==='ok'?'✅ Correto':'ℹ️ Informação';
  var allScenes=[];
  VISUAL_SCENES.forEach(function(c){c.scenes.forEach(function(s){allScenes.push(Object.assign({},s,{catId:c.id}));});});
  var gi=allScenes.findIndex(function(s){return s.id===sceneId&&s.catId===catId;});
  var gPrev=gi>0?allScenes[gi-1]:null;
  var gNext=gi<allScenes.length-1?allScenes[gi+1]:null;
  var cid='vs-canvas-'+sceneId;
  document.getElementById('vs-scene-inner').innerHTML=
    '<div class="lesson-area" style="max-width:900px;margin:0 auto">'+
      '<div style="display:flex;align-items:center;gap:1rem;margin-bottom:1rem;flex-wrap:wrap">'+
        '<div style="font-size:1.02rem;font-weight:700;color:var(--fg)">'+scene.title+'</div>'+
        '<span style="background:'+sc+'22;color:'+sc+';border:1px solid '+sc+';padding:.18rem .7rem;border-radius:99px;font-size:.74rem;font-weight:700">'+sl+'</span>'+
      '</div>'+
      '<div class="vs-canvas-wrap" style="position:relative;border-radius:12px;overflow:hidden;border:2px solid '+sc+'55;box-shadow:0 8px 32px '+sc+'18;margin-bottom:1.1rem;background:#0a0e1a">'+
        '<canvas id="'+cid+'" style="display:block;width:100%;height:auto"></canvas>'+
        '<div style="position:absolute;bottom:0;left:0;right:0;background:linear-gradient(0deg,rgba(10,14,26,.96) 0%,transparent 100%);padding:.45rem .8rem .35rem;font-size:.68rem;color:#94a3b8;display:flex;justify-content:space-between;align-items:center;pointer-events:none">'+
          '<span>🎬 Cena interativa · animação ao vivo</span>'+
          '<span style="color:'+sc+';font-weight:600">'+sl+'</span>'+
        '</div>'+
      '</div>'+
      '<div class="'+(scene.status==='danger'?'warn-box':scene.status==='warning'?'highlight-box':'info-box')+'" style="margin-bottom:1rem;font-size:.88rem;line-height:1.7">'+
        '<strong>📋 Regra do CTB:</strong> '+scene.rule+
      '</div>'+
      '<div style="margin-bottom:1.4rem">'+
        '<button class="sim-btn" id="vs-tts-btn" onclick="vsToggleSceneTTS()" style="font-size:.84rem;padding:.5rem 1rem;display:inline-flex;align-items:center;gap:.5rem">'+
          '🔊 <span id="vs-tts-label">Ouvir regra em voz alta</span>'+
        '</button>'+
      '</div>'+
      '<div style="display:flex;gap:.8rem;justify-content:space-between;flex-wrap:wrap">'+
        (gPrev?'<button class="sim-btn" onclick="vsOpenScene(\''+gPrev.catId+'\',\''+gPrev.id+'\')" style="font-size:.8rem;padding:.55rem 1.1rem">← Anterior</button>':'<div></div>')+
        (gNext?'<button class="sim-btn sim-btn-primary" onclick="vsOpenScene(\''+gNext.catId+'\',\''+gNext.id+'\')" style="font-size:.8rem;padding:.55rem 1.1rem">Próxima Cena →</button>':'<div></div>')+
      '</div>'+
    '</div>';
  requestAnimationFrame(function(){
    vsResizeCanvas(cid);
    vsStartCanvasScene(cid,scene);
    try{
      var ro=new ResizeObserver(function(){vsResizeCanvas(cid);});
      var wrap=document.querySelector('.vs-canvas-wrap');
      if(wrap) ro.observe(wrap);
    }catch(e){}
  });
  document.getElementById('vs-scene-view').scrollIntoView({behavior:'smooth'});
}

function vsToggleSceneTTS(){
  if(!('speechSynthesis' in window)){alert('Seu navegador não suporta narração por voz.');return;}
  var synth=window.speechSynthesis;
  var label=document.getElementById('vs-tts-label');
  if(synth.speaking){synth.cancel();if(label)label.textContent='Ouvir regra em voz alta';return;}
  if(!vsCurrentScene) return;
  var tmp=document.createElement('div');tmp.innerHTML=vsCurrentScene.rule||'';
  var text=vsCurrentScene.title+'. '+tmp.textContent;
  var utter=new SpeechSynthesisUtterance(text);
  var lang=(typeof currentLang!=='undefined'&&currentLang==='en')?'en-US':'pt-BR';
  utter.lang=lang; utter.rate=1; utter.pitch=1;
  var voices=synth.getVoices();
  var match=voices.filter(function(v){return v.lang&&v.lang.toLowerCase().startsWith(lang.slice(0,2));})[0];
  if(match) utter.voice=match;
  utter.onstart=function(){if(label)label.textContent='⏹ Parar narração';};
  utter.onend=utter.onerror=function(){if(label)label.textContent='Ouvir regra em voz alta';};
  synth.speak(utter);
}

function vsBackToCategory(){
  if('speechSynthesis' in window) window.speechSynthesis.cancel();
  vsStopAllAnimations();
  document.getElementById('vs-home').style.display='';
  document.getElementById('vs-cats').style.display='';
  document.getElementById('vs-scene-view').style.display='none';
  vsCurrentScene=null;
}
