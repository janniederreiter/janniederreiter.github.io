/* Measures habits around client relationships, not coach quality or income. */
window.CoachMatchTool = {
  kind:'relationships',
  slug:'client-relationship-health-check',
  title:'The Coach Client Relationship Health Check',
  questionKicker:'BEYOND THE LAST SESSION',
  resultKicker:'YOUR CLIENT RELATIONSHIP SNAPSHOT',
  introQuestion:'Think about your last five paid coaching clients, including those who have finished.',
  disclaimer:'A self-assessment of relationship-management practices, not a measure of coach quality. Clients may leave because their goals are complete — that can be an excellent outcome. Respect confidentiality, consent, and any agreed boundaries. Answers stay in this browser tab.',
  dimensions:[
    {key:'Closure',label:'Retention & closure'},
    {key:'Insight',label:'Client intelligence'},
    {key:'Advocacy',label:'Trust & advocacy'},
    {key:'Connection',label:'Long-term connection'}
  ],
  questions:[
    {dimension:'Closure',title:'When a coaching engagement ends, I review the client’s progress and agree on what happens next — even if that is no further coaching.',options:[
      {text:'Consistently',score:2},{text:'Sometimes',score:1},{text:'Rarely or never',score:0}]},
    {dimension:'Closure',title:'If a client stops booking unexpectedly, I understand why or make one respectful, appropriate check-in.',options:[
      {text:'Consistently',score:2},{text:'Sometimes',score:1},{text:'Rarely or never',score:0}]},
    {dimension:'Insight',title:'I ask new clients why they chose me, rather than another coach or option.',options:[
      {text:'Consistently',score:2},{text:'Sometimes',score:1},{text:'Rarely or never',score:0}]},
    {dimension:'Insight',title:'I learn what clients valued, what fell short, and what I could improve.',options:[
      {text:'Consistently',score:2},{text:'Sometimes',score:1},{text:'Rarely or never',score:0}]},
    {dimension:'Advocacy',title:'When appropriate, I invite clients to share their successes, and get permission before using any testimonial or example.',options:[
      {text:'Consistently',score:2},{text:'Sometimes',score:1},{text:'Rarely or never',score:0}]},
    {dimension:'Advocacy',title:'Satisfied clients have an easy, optional way to recommend me when it is genuinely relevant.',options:[
      {text:'Consistently',score:2},{text:'Sometimes',score:1},{text:'Rarely or never',score:0}]},
    {dimension:'Connection',title:'I maintain appropriate, welcome contact with former clients after our formal engagement ends.',options:[
      {text:'Consistently',score:2},{text:'Sometimes',score:1},{text:'Rarely or never',score:0}]},
    {dimension:'Connection',title:'I stay curious about the insights clients share and notice opportunities for mutual learning or introductions, only when welcome.',options:[
      {text:'Consistently',score:2},{text:'Sometimes',score:1},{text:'Rarely or never',score:0}]}
  ],
  outcomes:{
    Closure:{
      name:'The Open Loop',
      description:'Some engagements may end without a clear wrap-up, leaving you uncertain whether the client achieved their goals or still needs support.',
      actionName:'Close one relationship thoughtfully',
      action:'Review your last three completed engagements. For one where follow-up is welcome and appropriate, ask how things progressed — without pitching more sessions.',
      prompt:'Hi [name], I was thinking about our work on [topic]. How have things been going since we last spoke? No need to book anything — I would simply value hearing how you are.'
    },
    Insight:{
      name:'The Missing Insight',
      description:'You may be missing useful information about why people chose you and what they found most valuable.',
      actionName:'Ask two useful questions',
      action:'Ask a current or recently finished client, if they are comfortable, why they initially chose you and what part of your work together helped most.',
      prompt:'I am always improving my coaching. May I ask: what made you choose to work with me, and what has been most useful?'
    },
    Advocacy:{
      name:'The Quiet Success Story',
      description:'Clients may have achieved real progress, but others have little way of learning from those experiences.',
      actionName:'Invite one optional success story',
      action:'Ask one satisfied client whether they would be comfortable sharing a testimonial or anonymized success story. Permission is essential; a no is a complete answer.',
      prompt:'I am glad our work has been useful. Would you be comfortable sharing a short testimonial? Absolutely no pressure — and I would only share what you approve.'
    },
    Connection:{
      name:'The Lost Connection',
      description:'Once coaching ends, useful professional relationships can fade — including opportunities to learn, share something relevant, or reconnect.',
      actionName:'Reconnect without an agenda',
      action:'Share one genuinely relevant resource or opportunity with a former client, but only if staying in touch is welcome.',
      prompt:'Hi [name], I came across [resource] and remembered our conversations about [topic]. Thought you might find it useful. Hope things are going well.'
    }
  },
  allStrong:{
    name:'Your relationship foundations look strong',
    description:'Your answers suggest thoughtful practices beyond the initial booking. That is encouraging, but real client feedback matters more than any self-rating.',
    actionName:'Ask what you are not hearing',
    action:'Ask one former client, where appropriate, what would have made the coaching experience even more useful. Listen without selling or defending.',
    prompt:'Looking back on our work, is there one thing I could have done differently that would have made it even more helpful?'
  }
};
