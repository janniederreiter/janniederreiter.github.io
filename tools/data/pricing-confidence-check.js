/* More frequent friction = higher score; this does NOT calculate an optimal fee. */
window.CoachMatchTool = {
  kind:'pricing',
  slug:'pricing-confidence-check',
  title:'The Coach Pricing Confidence Check',
  questionKicker:'THE SALES CONVERSATION CHECK',
  resultKicker:'YOUR PRICING CONFIDENCE SNAPSHOT',
  introQuestion:'Think of your last few real conversations with prospective paying clients.',
  disclaimer:'A quick self-check of sales habits — not a recommendation for a specific fee or a guarantee of higher sales. Fair pricing also depends on your market, scope, demand, and experience. Answers stay in this browser tab.',
  dimensions:[
    {key:'Discount',label:'Discounting'},
    {key:'Comfort',label:'Fee confidence'},
    {key:'Value',label:'Value clarity'}
  ],
  questions:[
    {dimension:'Discount',title:'I offer a discount or cheaper option before the prospect asks for one.',options:[
      {text:'Often',score:2},{text:'Sometimes',score:1},{text:'Rarely or never',score:0}]},
    {dimension:'Discount',title:'I have reduced my fee to win a client without reducing what I deliver.',options:[
      {text:'Often',score:2},{text:'Sometimes',score:1},{text:'Rarely or never',score:0}]},
    {dimension:'Comfort',title:'I delay talking about fees because I don’t want to sound transactional.',options:[
      {text:'Often',score:2},{text:'Sometimes',score:1},{text:'Rarely or never',score:0}]},
    {dimension:'Comfort',title:'After naming my price, I quickly start explaining or justifying it.',options:[
      {text:'Often',score:2},{text:'Sometimes',score:1},{text:'Rarely or never',score:0}]},
    {dimension:'Value',title:'When describing my offer, I mostly talk about hours, sessions, and what is included.',options:[
      {text:'Often',score:2},{text:'Sometimes',score:1},{text:'Rarely or never',score:0}]},
    {dimension:'Value',title:'When a prospect asks why my coaching is worth the fee, I struggle to explain the specific value.',options:[
      {text:'Often',score:2},{text:'Sometimes',score:1},{text:'Rarely or never',score:0}]}
  ],
  outcomes:{
    Discount:{
      name:'The Quiet Discounter',
      description:'You may be negotiating against yourself before you know whether your actual fee is the obstacle.',
      actionName:'Keep your price; change the scope instead',
      action:'Write down your standard package and one genuinely smaller package. If budget comes up, you can discuss less scope rather than automatically discounting the same work.',
      prompt:'My fee for [full package] is [amount]. If you need a smaller starting point, we could explore [reduced scope] for [amount].'
    },
    Comfort:{
      name:'The Reluctant Seller',
      description:'The coaching feels natural. Saying what it costs can feel like something you have to apologize for.',
      actionName:'Practice one calm fee sentence',
      action:'Say your price in one clear sentence, aloud, three times. Do not apologize or offer a discount before the prospect responds.',
      prompt:'For [scope of work], the fee is [amount]. Would you like me to explain how we would work together?'
    },
    Value:{
      name:'The Session Seller',
      description:'Prospects may see the format of your coaching but struggle to connect it to the problem they want to solve.',
      actionName:'Lead with the client problem',
      action:'Before listing sessions or features, explain who you help, the problem you work on, and a realistic outcome you support. Avoid promising results you cannot control.',
      prompt:'I help [specific professional] work through [specific problem] toward [realistic goal] using [your approach].'
    }
  },
  allStrong:{
    name:'Your sales habits look steady',
    description:'Your answers do not reveal an obvious pricing-confidence habit. That does not establish whether your current fees are optimal.',
    actionName:'Check real conversion, not just confidence',
    action:'Review your last five serious enquiries. Record what you quoted, whether they booked, and any reasons they gave for deciding not to proceed.',
    prompt:'Enquiry → fee quoted → booked or not → prospect’s stated reason → what I can learn.'
  }
};
