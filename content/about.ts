export const about = {
  mission: "I help regulated enterprises put AI to work safely and at scale.",
  paragraphs: [
    "As a Distinguished Engineer at Wells Fargo, I advise technology leadership on enterprise generative and agentic AI. I helped shape the bank's AI strategy and led the architecture of its AI-augmented software lifecycle. Before that, at USAA, I built the enterprise machine learning platform that brought the company's data scientists onto one governed environment.",
    "My point of view is simple: guardrails, provenance and policy belong in the design, not bolted on afterwards. I write about that here and on LinkedIn.",
  ],
  // "How I think and lead": stated plainly, in my words. No employer specifics.
  principles: {
    ai: [
      {
        title: "The harness matters more than the model.",
        text: "Models change every quarter. The context, tools, guardrails and evaluation around them are what an enterprise owns, and they are what make the output trustworthy.",
      },
      {
        title: "Governance goes into the design.",
        text: "A control that only exists as a review at the end will be outrun by agents. Policy has to run as code in the pipeline and the platform.",
      },
      {
        title: "Context is curated, not collected.",
        text: "Agents are only as good as what they are allowed to know. Knowledge that is owned, dated and reviewed beats a bigger index.",
      },
      {
        title: "Prove it before you scale it.",
        text: "Every pilot gets a measurable outcome and a gate. If it cannot show value on a shared dashboard, it does not get more money.",
      },
      {
        title: "Provenance before velocity.",
        text: "If we cannot show why an AI system produced something, we cannot ship it in a regulated business, however fast it was written.",
      },
    ],
    lead: [
      {
        title: "Extreme ownership.",
        text: "I own the outcome of every program I lead, including the parts I did not directly control. When something fails, I start with what I could have done differently and fix the plan; when it works, the teams who built it get the credit. The idea comes from Jocko Willink and Leif Babin's book of the same name, and it holds up in a bank as well as anywhere.",
      },
      {
        title: "Influence without authority.",
        text: "Most of the architecture change I have led crossed teams that did not report to me. Working examples and shared metrics moved them; mandates did not.",
      },
      {
        title: "Make the right way the easy way.",
        text: "Paved roads, templates and platforms change behavior faster than standards documents do.",
      },
      {
        title: "Build it before you mandate it.",
        text: "I ship a working reference first and write the standard from what we learned. The Architecture-as-Code prototype at aac.muthub.org is one example.",
      },
    ],
  },
  career: [
    { period: "2022 – present", org: "Wells Fargo", detail: "Distinguished Engineer (2026 – present); Principal Architect, Chief Technology Office (2022 – 2026)" },
    { period: "2012 – 2022", org: "USAA", detail: "Staff Engineer and Lead Software Engineer, Data & Analytics Platform; earlier, systems engineering and the Machine Learning Lab" },
    { period: "2004 – 2012", org: "Bunge North America", detail: "IT Technical Manager, Middleware Platforms; earlier, systems administration" },
  ],
  education: [
    { degree: "M.S., Computer Science", school: "University of Oklahoma" },
    { degree: "B.E., Electronics & Communication Engineering", school: "Madurai Kamaraj University" },
  ],
  certifications: ["Google Cloud (2)", "AWS (2)", "ArchiMate", "BizzDesign", "TIBCO (2)", "IBM WebSphere (6)"],
  bios: {
    short:
      "Muthukrishnan (Muthu) Bommiah is a Distinguished Engineer at Wells Fargo, where he advises technology leadership on enterprise generative and agentic AI and led the architecture of the bank's AI-augmented software lifecycle. Earlier, at USAA, he built the enterprise machine learning platform. He writes about governed AI in banking at muthub.org.",
    long:
      "Muthukrishnan (Muthu) Bommiah is a Distinguished Engineer at Wells Fargo, where he advises technology leadership on enterprise generative and agentic AI. He helped shape the bank's AI strategy, led the architecture of its AI-augmented software lifecycle and built an Architecture-as-Code control plane that checks designs automatically before they reach production. Before Wells Fargo, Muthu spent a decade at USAA, where he built the enterprise machine learning platform that brought data scientists onto one governed environment and made model deployment dramatically faster. Earlier he led middleware and enterprise platforms at Bunge. He holds an M.S. in Computer Science from the University of Oklahoma and writes about governed AI, the AI-native software lifecycle and enterprise data platforms at muthub.org.",
  },
  reach: {
    yes: ["Conference talks and panels", "Podcasts and interviews", "Advisory boards", "Peer exchanges with AI and architecture leaders in regulated industries"],
    no: ["Vendor sales pitches", "Questions about my employer's systems or customers"],
  },
}

// The Now page: what I'm focused on this quarter. Update monthly and change `updated`.
export const now = {
  updated: "2026-10-11",
  items: [
    "Scaling governed agentic AI across the software lifecycle: moving from the developer's inner loop to the delivery outer loop.",
    "Architecture-as-Code: policy that runs in the pipeline and inside coding agents, not in review meetings.",
    "Enterprise context engineering: giving agents durable, trusted knowledge with clear owners and evidence.",
    "Writing: turning my LinkedIn posts into essays here, and launching a monthly note on AI in banking.",
  ],
}
