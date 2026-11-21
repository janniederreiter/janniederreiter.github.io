/* Coaching-style preferences, not an assessment of skill or clinical compatibility. */
window.CoachMatchTool = {
  kind: 'style',
  slug: 'coaching-style-matcher',
  title: 'The Coaching Style Matcher',
  questionKicker: 'HOW DO YOU COACH?',
  resultKicker: 'YOUR COACHING MATCH PROFILE',
  introQuestion: 'Choose what you naturally do most often, even if both answers can work.',
  disclaimer: 'This is a conversation starter based on self-reported coaching preferences, not a validated measure of coach-client compatibility. A strong match also depends on each client’s goals, experience, boundaries and preferences. Answers stay in this browser tab.',
  questions: [
    {axis:'approach',title:'A client is torn between two career paths. You naturally...',options:[
      {text:'Challenge their assumptions and help them evaluate the trade-offs.',score:1},
      {text:'Explore what matters most before comparing the options.',score:0}]},
    {axis:'approach',title:'You spot a blind spot in a client’s thinking. You usually...',options:[
      {text:'Name it directly and explain what you are noticing.',score:1},
      {text:'Ask questions that help them discover it for themselves.',score:0}]},
    {axis:'approach',title:'A client asks, “What would you do in my position?” You tend to...',options:[
      {text:'Offer a perspective while leaving the decision with them.',score:1},
      {text:'Help them develop their own answer before sharing your view.',score:0}]},
    {axis:'focus',title:'Which coaching breakthrough energizes you more?',options:[
      {text:'A client finally sees which direction is right for them.',score:1},
      {text:'A client takes a meaningful step and learns from the outcome.',score:0}]},
    {axis:'focus',title:'A client has been stuck for weeks. Your first move is to...',options:[
      {text:'Revisit the decision or assumption that is keeping them stuck.',score:1},
      {text:'Help them pick a small action they can take this week.',score:0}]},
    {axis:'focus',title:'Which sign of progress stands out most to you?',options:[
      {text:'They understand their choices and priorities more clearly.',score:1},
      {text:'They have tried something tangible and can build on it.',score:0}]}
  ],
  outcomes: {
    challenger: {
      name:'The Strategic Challenger',
      description:'You tend to create clarity through direct thinking, constructive challenge, and decision-making.',
      client:'A capable professional facing a complex career or business decision who wants someone to pressure-test their thinking.',
      fit:'They welcome direct feedback, thoughtful debate, and clear trade-offs.',
      misfit:'A client primarily seeking a gentle exploratory space may prefer a different approach. Check this together rather than assuming.',
      prompt:'I help [specific professional] make [difficult decision] through constructive challenge, clearer options, and thoughtful trade-offs.'
    },
    navigator: {
      name:'The Reflective Navigator',
      description:'You tend to create clarity by helping people explore meaning, priorities, and their own conclusions.',
      client:'A professional reconsidering their direction or navigating a career transition who needs space to make sense of what matters.',
      fit:'They value reflection, nuance, and ownership of the final choice.',
      misfit:'Someone seeking an immediate prescriptive plan may want more directive support.',
      prompt:'I help [specific professional] navigate [career transition] by exploring what matters and finding a direction they can own.'
    },
    builder: {
      name:'The Momentum Builder',
      description:'You tend to combine direct feedback with practical structure to turn decisions into progress.',
      client:'An ambitious professional with a clear goal who needs prioritization, momentum, and someone to challenge missed commitments.',
      fit:'They appreciate deadlines, structure, accountability, and specific next steps.',
      misfit:'Someone still uncertain about their goal may need more exploratory work first.',
      prompt:'I help [specific professional] turn [stalled goal] into meaningful action with structure, accountability, and direct feedback.'
    },
    experimenter: {
      name:'The Experiment Partner',
      description:'You tend to help clients discover the next step through collaboration, action, and learning from experience.',
      client:'A professional exploring a career move or business idea who learns best by trying small experiments and reflecting on results.',
      fit:'They like testing ideas, adapting quickly, and co-creating their route forward.',
      misfit:'Someone looking for a fixed answer before taking any action may prefer another approach.',
      prompt:'I help [specific professional] explore [next move] through practical experiments, feedback, and small steps forward.'
    }
  }
};
