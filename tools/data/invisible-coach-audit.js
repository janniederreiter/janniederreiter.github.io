/* Edit this file to change the copy, questions, scoring and outcome actions. */
window.CoachMatchTool = {
  slug: 'invisible-coach-audit',
  title: 'The Invisible Coach Audit',
  eyebrow: 'Free tool for experienced coaches',
  headline: 'Great coach. <em>Hard to find?</em>',
  introduction: 'You get results for your clients. But would the next right client find you, trust you, and know how to hire you?',
  meta: ['3 questions', '2 minutes', '1 useful fix'],
  introQuestion: 'Pick the answer closest to your current reality. This is about your marketing setup, not your coaching ability.',
  questions: [
    {
      dimension: 'Find',
      title: 'If someone needed a career or business coach like you tomorrow, how could they discover you?',
      hint: 'Think about a stranger, not someone already in your network.',
      options: [
        {text: 'Mostly through referrals or word of mouth.', score: 0},
        {text: 'Via LinkedIn or my website, if they know what to search for.', score: 1},
        {text: 'Through relevant searches, communities, or established channels where my ideal clients already look.', score: 2}
      ]
    },
    {
      dimension: 'Trust',
      title: 'If a stranger landed on your profile today, what evidence would they see that you help people like them?',
      hint: 'Not what you could explain on a call — what they can actually see.',
      options: [
        {text: 'Mostly my qualifications, experience, and a description of my services.', score: 0},
        {text: 'Some testimonials or examples, but not clearly connected to my ideal clients.', score: 1},
        {text: 'Specific, credible client outcomes or examples, shared appropriately.', score: 2}
      ]
    },
    {
      dimension: 'Choose',
      title: 'Could a stranger quickly tell whether you are the right coach for them — and what to do next?',
      hint: 'Imagine they give your profile ten seconds.',
      options: [
        {text: 'Not really. They would need to ask me what I offer.', score: 0},
        {text: 'Eventually, but they would have to read around or search for the next step.', score: 1},
        {text: 'Yes. Who I help, what we work on, and the next step are obvious.', score: 2}
      ]
    }
  ],
  outcomes: {
    Find: {
      name: 'The Hidden Expert',
      description: 'Your answers suggest a discoverability bottleneck: people who already know you might recommend you, but strangers may have few ways to find you. That does not mean you need to become an influencer.',
      actionName: 'Show up where one real client question already exists',
      action: 'In the next 10 minutes, find one active discussion where your ideal clients are asking about career moves or business growth. Answer one question helpfully, without a pitch. Start with a real problem, not a content calendar.',
      prompt: 'A useful first question to ask yourself about [their challenge] is [question]. Once you know that, try [one practical next step].'
    },
    Trust: {
      name: 'The Undersold Expert',
      description: 'Your expertise may be real, but people who have never met you might not see enough specific evidence to feel confident reaching out. Qualifications tell them who you are; relevant proof helps them picture what you can help with.',
      actionName: 'Turn one genuine result into a concrete example',
      action: 'Write a short, accurate example of a client problem you helped with and what changed. Only publish information you have permission to share; otherwise keep the example fully anonymous and non-identifying.',
      prompt: 'I worked with [type of professional] facing [specific challenge]. We focused on [approach], and the outcome was [accurate, observable change].'
    },
    Choose: {
      name: 'The Hard-to-Hire Coach',
      description: 'Someone might like what they see but still wonder whether your coaching is for them. If your offer or next step is vague, interested prospects may drift away without making contact.',
      actionName: 'Make your headline do one clear job',
      action: 'Rewrite the first line of your profile so it names your specific client and the situation you help with. Then put one simple contact or booking action directly underneath it.',
      prompt: 'I help [specific professionals] navigate [specific challenge] so they can [realistic outcome]. Start here: [one clear next step].'
    }
  },
  allStrong: {
    name: 'Your basics look strong',
    description: 'Your answers suggest you have the essentials in place: a route to discovery, visible proof, and a clear next step. But a self-check cannot tell you how well those elements convert in practice.',
    actionName: 'Check what happens in real conversations',
    action: 'Review your last five serious enquiries. Where did they find you? What persuaded them to reach out? At what point did interest turn into a conversation — or stop?',
    prompt: 'For my last five enquiries: source → what they were looking for → whether they contacted me → what happened next.'
  },
  pilot: {
    heading: 'What if the right clients could find you without becoming a full-time content creator?',
    description: 'We are exploring CoachMatch: a way to connect credible, experienced coaches with ambitious professionals who are ready to do the work. We are looking for a small group of coaches to help shape our Founder Pilot.',
    email: 'janniederreiter@gmail.com',
    subject: 'CoachMatch Founder Pilot — Invisible Coach Audit',
    button: 'I’m interested in the Founder Pilot'
  }
};
