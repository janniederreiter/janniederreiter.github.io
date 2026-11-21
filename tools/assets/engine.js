/* Reusable no-dependency engine for static handraiser pages. */
(function () {
  'use strict';
  const tool = window.CoachMatchTool;
  const root = document.getElementById('tool-root');
  if (!tool || !root) return;
  const state = {step:0, answers:Array(tool.questions.length).fill(null), result:false};
  const embedded = new URLSearchParams(window.location.search).get('embed') === '1';
  if (embedded) document.documentElement.classList.add('embed-mode');
  const escape = (value) => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const steps = tool.questions.length;
  const letter = (n) => String.fromCharCode(65+n);
  const getScores = () => state.answers.map((choice,i) => tool.questions[i].options[choice].score);
  const resultData = () => {
    const scores=getScores();
    const min=Math.min(...scores);
    const ties=scores.map((v,i)=>v===min?tool.questions[i].dimension:null).filter(Boolean);
    const strong=min===2;
    const first=ties[0];
    return {scores, ties, category:strong?'Strong':first, outcome:strong?tool.allStrong:tool.outcomes[first]};
  };
  function postHeight() {
    if (!embedded || window.parent===window) return;
    const height=Math.ceil(Math.max(document.body.scrollHeight, document.documentElement.scrollHeight));
    window.parent.postMessage({type:'coachmatch:height',slug:tool.slug,height}, '*');
  }
  function render() {
    if (state.result) renderResult();
    else renderQuestion();
    window.requestAnimationFrame(postHeight);
  }
  function renderQuestion() {
    const index=state.step;
    const q=tool.questions[index];
    const selected=state.answers[index];
    root.innerHTML=`
      <div class="quiz-content">
        <div class="quiz-top"><span class="mini-label">THE QUICK CHECK</span><span class="counter" aria-live="polite">${index+1} / ${steps}</span></div>
        <div class="progress" role="progressbar" aria-label="Quiz progress" aria-valuemin="0" aria-valuemax="${steps}" aria-valuenow="${index}"><div class="progress-fill" style="width:${index/steps*100}%"></div></div>
        <section aria-labelledby="question-label">
          <h2 class="question-title" id="question-label">${escape(q.title)}</h2>
          <p class="question-context">${escape(q.hint || tool.introQuestion)}</p>
          <fieldset class="question-fieldset"><legend>${escape(q.title)}</legend>
            <div class="options">${q.options.map((o,j)=>`
              <label class="option">
                <input type="radio" name="question-${index}" value="${j}" ${selected===j?'checked':''} />
                <span class="option-letter" aria-hidden="true">${letter(j)}</span>
                <span class="option-text">${escape(o.text)}</span>
              </label>`).join('')}</div>
          </fieldset>
        </section>
        <div class="quiz-actions">
          ${index>0?'<button type="button" class="button linklike" id="back">← Back</button>':'<span></span>'}
          <button type="button" id="next" class="button btn-right" ${selected===null?'disabled':''}>${index+1===steps?'See my result →':'Next question →'}</button>
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
      if(index===steps-1)state.result=true;
      else state.step++;
      render();focusRoot();
    });
  }
  function focusRoot() { root.setAttribute('tabindex','-1'); root.focus({preventScroll:true}); root.scrollIntoView({block:'start',behavior:'auto'}); }
  function renderResult() {
    const {scores,ties,category,outcome}=resultData();
    const metrics=tool.questions.map((q,i)=>({label:q.dimension, score:scores[i]}));
    root.innerHTML=`
      <div class="quiz-content">
        <span class="result-kicker">YOUR PERSONALIZED VISIBILITY SNAPSHOT</span>
        <h2 class="result-heading" id="result-heading">${escape(outcome.name)}</h2>
        <p class="result-explain">${escape(outcome.description)}</p>
        <div class="snapshot" aria-label="Your Find, Trust and Choose scores">
          ${metrics.map(m=>`<div class="score-box"><div class="score-label">${escape(m.label)}</div><div class="meter" role="meter" aria-label="${escape(m.label)}" aria-valuemin="0" aria-valuemax="2" aria-valuenow="${m.score}"><div class="meter-fill" style="width:${m.score*50}%"></div></div><div class="score-caption">${['Needs work','Partly clear','Looks clear'][m.score]}</div></div>`).join('')}
        </div>
        ${ties.length>1 && category!=='Strong'?`<p class="disclaimer">${escape(ties.join(' and '))} are equally worth reviewing. Start with one fix rather than trying to change everything.</p>`:''}
        <div class="fix-card">
          <span class="result-kicker">ONE SMALL FIX</span>
          <h3>${escape(outcome.actionName)}</h3>
          <p>${escape(outcome.action)}</p>
          <div class="template">${escape(outcome.prompt)}</div>
          <div class="share-row"><span class="disclaimer">Copy the starting point and adapt it.</span><button class="button secondary" type="button" id="copy-prompt">Copy prompt</button></div>
        </div>
        <p class="disclaimer">This is a short self-assessment, not a measure of coaching quality or a guarantee of getting more clients. Your answers stay in this browser tab unless you choose to send them.</p>
        <div class="pilot-box">
          <span class="result-kicker">A DIFFERENT WAY TO GET DISCOVERED</span>
          <h3>${escape(tool.pilot.heading)}</h3>
          <p>${escape(tool.pilot.description)}</p>
          <a class="button" id="pilot-link" href="${escape(makeMailto(outcome.name))}">${escape(tool.pilot.button)} →</a>
          <p style="font-size:12px;margin-bottom:0">This opens your email app. No signup required to use the audit.</p>
        </div>
        <div class="share-row"><button type="button" class="button secondary" id="copy-result">Copy my result</button><button type="button" class="button linklike" id="restart">↺ Retake audit</button></div>
      </div>`;
    root.querySelector('#copy-prompt').addEventListener('click',e=>copyText(outcome.prompt,e.currentTarget));
    root.querySelector('#copy-result').addEventListener('click',e=>copyText(buildSummary(),e.currentTarget));
    root.querySelector('#restart').addEventListener('click',()=>{state.result=false;state.step=0;state.answers.fill(null);render();focusRoot();});
  }
  function buildSummary() {
    const r=resultData();
    return `${tool.title}\nResult: ${r.outcome.name}\nFind: ${r.scores[0]}/2 · Trust: ${r.scores[1]}/2 · Choose: ${r.scores[2]}/2\n\nOne small fix: ${r.outcome.actionName}\n${r.outcome.action}\n\nhttps://janniederreiter.com/tools/${tool.slug}/`;
  }
  async function copyText(value,btn) {
    const old=btn.textContent;
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard not available');
      await navigator.clipboard.writeText(value);
      btn.textContent='Copied ✓';
    } catch (_) {
      const area=document.createElement('textarea');
      area.value=value;area.setAttribute('readonly','');
      area.style.position='fixed';area.style.opacity='0';
      document.body.appendChild(area);area.select();
      try { if(!document.execCommand('copy')) throw new Error('copy failed');btn.textContent='Copied ✓';}
      catch(e) {btn.textContent='Select and copy the text above';}
      finally {area.remove();}
    }
    setTimeout(()=>{btn.textContent=old},2200);
  }
  function makeMailto(name) {
    const subject=encodeURIComponent(tool.pilot.subject);
    const body=encodeURIComponent(`Hi,\n\nI completed the ${tool.title}. My result was: ${name}.\n\nI'd like to hear about the CoachMatch Founder Pilot.\n\nMy coaching specialism: [career / business / growth / other]\nYears of coaching experience: [your answer]\nNumber of paying clients coached so far: [your answer]\nCan I coach in English? [yes / no]\n\nThanks!`);
    return `mailto:${tool.pilot.email}?subject=${subject}&body=${body}`;
  }
  window.addEventListener('message',e=>{if(e.source===window.parent && e.data && e.data.type==='coachmatch:request-height') postHeight()});
  if (embedded && 'ResizeObserver' in window) new ResizeObserver(postHeight).observe(document.body);
  window.addEventListener('load',postHeight);
  render();
})();
