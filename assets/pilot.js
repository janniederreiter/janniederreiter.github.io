/* Single source of truth for the Founder Pilot invitation across every tool. */
(function () {
  'use strict';
  const pilot = {
    label: 'A DIFFERENT WAY TO GET DISCOVERED',
    heading: 'What if the right clients could find you without becoming a full-time content creator?',
    description: 'We are exploring CoachMatch: a way to connect credible, experienced coaches with ambitious professionals who are ready to do the work. We are looking for a small group of coaches to help shape our Founder Pilot.',
    button: 'I’m interested in the Founder Pilot',
    url: 'https://forms.gle/7bbsxKaiJN9wjS3c6',
    note: 'This opens a forms survey - No signup required'
  };
  const escape = (value) => String(value ?? '').replace(/[&<>"']/g, ch => ({
    '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
  })[ch]);
  window.CoachMatchPilot = pilot;
  window.CoachMatchPilotCard = function () {
    return `<section class="pilot-box" aria-label="CoachMatch Founder Pilot">
      <span class="result-kicker">${escape(pilot.label)}</span>
      <h3>${escape(pilot.heading)}</h3>
      <p>${escape(pilot.description)}</p>
      <a class="button" href="${escape(pilot.url)}" target="_blank" rel="noopener noreferrer">${escape(pilot.button)} →</a>
      <p class="pilot-note">${escape(pilot.note)}</p>
    </section>`;
  };
})();
