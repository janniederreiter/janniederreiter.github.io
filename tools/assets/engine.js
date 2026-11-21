/* CoachMatch assessments: shared renderer and scoring, no libraries or data collection.
   Configuration stays in tools/data/<slug>.js. */
(function () {
  'use strict';
  const tool = window.CoachMatchTool;
  const root = document.getElementById('tool-root');
  if (!tool || !root) return;

  const state = {step: 0, answers: Array(tool.questions.length).fill(null), result: false};
  const embedded = new URLSearchParams(window.location.search).get('embed') === '1';
  if (embedded) document.documentElement.classList.add('embed-mode');
  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[ch]));
  const letter = n => String.fromCharCode(65 + n);
  const answersValid = () => state.answers.every((answer, i) => Number.isInteger(answer) && answer >= 0 && answer < tool.questions[i].options.length);

  function scoreAnswers(config, answers) {
    if (!answers.every((a,i) => Number.isInteger(a) && a >= 0 && a < config.questions[i].options.length)) throw new Error('Complete all questions first.');
    const kind = config.kind || 'visibility';
    if (kind === 'style') {
      const sum = axis => config.questions.reduce((s,q,i) => s + (q.axis === axis ? q.options[answers[i]].score : 0), 0);
      const direct = sum('approach') >= 2;
      const clarity = sum('focus') >= 2;
      const key = direct ? (clarity ? 'challenger' : 'builder') : (clarity ? 'navigator' : 'experimenter');
      return {kind, category:key, outcome:config.outcomes[key], metrics:[
        {label:'Your approach', description: direct ? 'Direct & challenging' : 'Exploratory & reflective'},
        {label:'Your focus', description: clarity ? 'Clarity & decisions' : 'Action & learning'}
      ], ties:[]};
    }
    let metrics;
    if (kind === 'visibility') {
      metrics = config.questions.map((q,i) => ({key:q.dimension, label:q.dimension, score:q.options[answers[i]].score, max:2}));
    } else {
      metrics = config.dimensions.map(d => ({key:d.key, label:d.label, score:0, max:0}));
      config.questions.forEach((q,i) => {
        const m = metrics.find(m => m.key === q.dimension);
        if (!m) throw new Error('Missing dimension: '+q.dimension);
        m.score += q.options[answers[i]].score;
        m.max += q.maxScore ?? Math.max(...q.options.map(o=>o.score));
      });
    }
    const values = metrics.map(m=>m.score);
    const strongest = kind==='pricing' ? Math.max(...values) : Math.min(...values);
    const ties = metrics.filter(m=>m.score===strongest).map(m=>m.label);
    const strong = kind === 'visibility' ? values.every(x=>x===2) :
      kind === 'pricing' ? values.every(x=>x===0) :
      kind === 'relationships' ? values.every(x=>x>=3) : false;
    const key = strong ? 'Strong' : metrics.find(m=>m.score===strongest).key;
    return {kind, category:key, outcome:strong?config.allStrong:config.outcomes[key], metrics, ties:strong?[]:ties};
  }
  // Exposed for lightweight regression tests and new tools; does not store visitor answers.
  window.CoachMatchScore = (config, answers) => scoreAnswers(config,answers);

  function getResult() { return scoreAnswers(tool,state.answers); }
  function postHeight() {
    if (!embedded || window.parent===window) return;
    const height=Math.ceil(Math.max(document.body.scrollHeight,document.documentElement.scrollHeight));
    window.parent.postMessage({type:'coachmatch:height',slug:tool.slug,height},'*');
  }
  function render() {
    state.result ? renderResult() : renderQuestion();
    window.requestAnimationFrame(postHeight);
  }
  function focusRoot() {
    root.setAttribute('tabindex','-1');
    root.focus({preventScroll:true});
    root.scrollIntoView({block:'start',behavior:'auto'});
  }
  function renderQuestion() {
    const index=state.step;
    const q=tool.questions[index];
    const selected=state.answers[index];
    root.innerHTML=`
      <div class="quiz-content">
        <div class="quiz-top"><span class="mini-label">${esc(tool.questionKicker||'THE QUICK CHECK')}</span><span class="counter" aria-live="polite">${index+1} / ${tool.questions.length}</span></div>
        <div class="progress" role="progressbar" aria-label="Quiz progress" aria-valuemin="0" aria-valuemax="${tool.questions.length}" aria-valuenow="${index}"><div class="progress-fill" style="width:${index/tool.questions.length*100}%"></div></div>
        <section aria-labelledby="question-label">
          <h2 class="question-title" id="question-label">${esc(q.title)}</h2>
          <p class="question-context">${esc(q.hint||tool.introQuestion||'Choose the answer closest to your experience.')}</p>
          <fieldset class="question-fieldset"><legend>${esc(q.title)}</legend>
          <div class="options">${q.options.map((o,j)=>`<label class="option"><input type="radio" name="question-${index}" value="${j}" ${selected===j?'checked':''}><span class="option-letter" aria-hidden="true">${letter(j)}</span><span class="option-text">${esc(o.text)}</span></label>`).join('')}</div>
          </fieldset>
        </section>
        <div class="quiz-actions">
          ${index>0?'<button type="button" class="button linklike" id="back">← Back</button>':'<span></span>'}
          <button type="button" id="next" class="button btn-right" ${selected===null?'disabled':''}>${index+1===tool.questions.length?'See my result →':'Next question →'}</button>
        </div>
      </div>`;
    root.querySelectorAll('input[type="radio"]').forEach(r=>r.addEventListener('change',e=>{
      state.answers[index]=Number(e.target.value);
      root.querySelector('#next').disabled=false;
    }));
    const back=root.querySelector('#back');
    if (back) back.addEventListener('click',()=>{state.step--;render();focusRoot();});
    root.querySelector('#next').addEventListener('click',()=>{
      if(state.answers[index]===null)return;
      if(index===tool.questions.length-1)state.result=true;
      else state.step++;
      render();focusRoot();
    });
  }
  function metricCards(result) {
    if (result.kind==='style') return `<div class="style-axes">${result.metrics.map(m=>`<div class="score-box"><span class="score-label">${esc(m.label)}</span><strong>${esc(m.description)}</strong></div>`).join('')}</div>`;
    return `<div class="snapshot ${result.metrics.length===4?'snapshot-four':''}" aria-label="Assessment scores">${result.metrics.map(m=>{
      const caption = result.kind==='visibility' ? ['Needs work','Partly clear','Looks clear'][m.score] : `${m.score} / ${m.max}`;
      return `<div class="score-box"><div class="score-label">${esc(m.label)}</div><div class="meter" role="meter" aria-label="${esc(m.label)}" aria-valuemin="0" aria-valuemax="${m.max}" aria-valuenow="${m.score}"><div class="meter-fill" style="width:${m.max?m.score/m.max*100:0}%"></div></div><div class="score-caption">${esc(caption)}</div></div>`;
    }).join('')}</div>`;
  }
  function resultContent(result) {
    const o=result.outcome;
    if(result.kind==='style') {
      return `<div class="match-panel"><span class="result-kicker">THE CLIENT WHO MAY FIT YOU BEST</span><p>${esc(o.client)}</p><h3>Why this may work</h3><p>${esc(o.fit)}</p><h3>Where to be careful</h3><p>${esc(o.misfit)}</p></div>
        <div class="fix-card"><span class="result-kicker">YOUR STARTING POINT</span><h3>A way to describe your coaching</h3><div class="template">${esc(o.prompt)}</div><div class="share-row"><span class="disclaimer">Adapt this to your actual experience.</span><button type="button" class="button secondary" id="copy-prompt">Copy wording</button></div></div>`;
    }
    return `<div class="fix-card"><span class="result-kicker">${esc(result.kind==='visibility'?'ONE SMALL FIX':'YOUR NEXT SMALL STEP')}</span><h3>${esc(o.actionName)}</h3><p>${esc(o.action)}</p><div class="template">${esc(o.prompt)}</div><div class="share-row"><span class="disclaimer">Copy this starting point and adapt it.</span><button type="button" class="button secondary" id="copy-prompt">Copy wording</button></div></div>`;
  }
  function renderResult() {
    if (!answersValid()) return;
    const result=getResult();
    const o=result.outcome;
    const tieNote = result.ties.length>1 ? `<p class="disclaimer">${esc(result.ties.join(' and '))} scored equally. This is one possible starting point — choose the one that resonates with your real client conversations.</p>` : '';
    root.innerHTML=`<div class="quiz-content">
      <span class="result-kicker">${esc(tool.resultKicker||'YOUR PERSONALIZED RESULT')}</span>
      <h2 class="result-heading">${esc(o.name)}</h2>
      <p class="result-explain">${esc(o.description)}</p>
      ${metricCards(result)}
      ${tieNote}
      ${resultContent(result)}
      <p class="disclaimer">${esc(tool.disclaimer||'This is a short self-assessment, not a guarantee of client results. Your answers are not sent anywhere.')}</p>
      ${window.CoachMatchPilotCard ? window.CoachMatchPilotCard() : ''}
      <div class="share-row"><button type="button" class="button secondary" id="copy-result">Copy my result</button><button type="button" class="button linklike" id="restart">↺ Retake check</button></div>
    </div>`;
    root.querySelector('#copy-prompt').addEventListener('click',e=>copyText(o.prompt,e.currentTarget));
    root.querySelector('#copy-result').addEventListener('click',e=>copyText(buildSummary(result),e.currentTarget));
    root.querySelector('#restart').addEventListener('click',()=>{state.result=false;state.step=0;state.answers.fill(null);render();focusRoot();});
  }
  function buildSummary(result) {
    const metricText=result.kind==='style' ? result.metrics.map(m=>`${m.label}: ${m.description}`).join('\n') : result.metrics.map(m=>`${m.label}: ${m.score}/${m.max}`).join(' · ');
    const o=result.outcome;
    return `${tool.title}\nResult: ${o.name}\n${metricText}\n\n${result.kind==='style'?`Best-fit hypothesis: ${o.client}\n`:`Small step: ${o.actionName}\n${o.action}\n`}\n${o.prompt}\n\nhttps://janniederreiter.com/tools/${tool.slug}/`;
  }
  async function copyText(value, btn) {
    const old=btn.textContent;
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard not available');
      await navigator.clipboard.writeText(value);
      btn.textContent='Copied ✓';
    } catch (_) {
      const area=document.createElement('textarea');
      area.value=value;area.setAttribute('readonly','');area.style.position='fixed';area.style.opacity='0';
      document.body.appendChild(area);area.select();
      try {if(!document.execCommand('copy'))throw new Error('copy failed');btn.textContent='Copied ✓';}
      catch (error) {btn.textContent='Could not copy';}
      finally {area.remove();}
    }
    setTimeout(()=>{btn.textContent=old;},2200);
  }
  window.addEventListener('message',e=>{if(e.source===window.parent && e.data?.type==='coachmatch:request-height')postHeight();});
  if (embedded && 'ResizeObserver' in window) new ResizeObserver(postHeight).observe(document.body);
  window.addEventListener('load',postHeight);
  render();
})();
