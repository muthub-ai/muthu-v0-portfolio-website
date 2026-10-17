import type { Essay } from "./essays"

// "Context Engineering" series (5 parts). Ideas only: no employer systems, names, figures or diagrams.
// External sources are linked inline so readers (and AI assistants) can check every claim.

export const contextSeries = { name: "Context Engineering", slug: "context-engineering" }

export const contextEngineeringEssays: Essay[] = [
  {
    "slug": "the-cost-of-unmanaged-context",
    "title": "The cost of unmanaged context",
    "summary": "Enterprises budget for compute, models and licenses, but almost none budget for the context those models depend on. Unmanaged context is the largest cost nobody tracks, and every new AI agent adds to it.",
    "theme": "context-engineering",
    "status": "published",
    "published": "2026-06-02",
    "plannedFor": "Jun 2026",
    "source": "Part 1 of the Context Engineering series.",
    "related": [
      "context-fragmentation",
      "capture-the-why"
    ],
    "series": {
      "name": "Context Engineering",
      "part": 1
    },
    "body": [
      {
        "type": "p",
        "text": "**Unmanaged context is the most expensive line item in enterprise technology, and almost nobody tracks it.** Every enterprise I know can tell you what it spends on cloud, on model APIs and on software licenses. Very few can tell you what it spends on context: the knowledge a person or an agent needs before they can do anything useful. What does this application depend on? Why was it built this way? Who owns it? What broke last time, and how was it fixed?"
      },
      {
        "type": "p",
        "text": "That knowledge is real and it is expensive to rebuild. In most organizations it is also completely unmanaged. For years we paid for it quietly, through meetings, chat threads and the patience of senior engineers. AI changes the math. Agents consume context at machine speed, and they amplify whatever quality of context they are given. Unmanaged context used to be an inefficiency. Now it is a risk."
      },
      {
        "type": "h2",
        "text": "The cost we already pay"
      },
      {
        "type": "p",
        "text": "The human cost is well documented. Panopto's workplace knowledge study found that knowledge workers spend [5.3 hours a week](https://www.hrdive.com/news/inefficient-knowledge-sharing-costs-large-us-businesses-47m-a-year/527892/) waiting for information from colleagues or recreating information that already exists, and that 42% of institutional knowledge is unique to the person who holds it. Atlassian's State of Teams 2025 put the waste at [2.4 billion hours a year](https://petri.com/inefficient-information-management-costing-businesses/) spent searching for information, and half of the workers surveyed said poor communication had teams duplicating work."
      },
      {
        "type": "p",
        "text": "Inside a technology organization the pattern is familiar. Every incident starts with the same scramble to rediscover dependencies. Every risk assessment re-interviews the same experts. Every modernization program opens with months of archaeology. Every new engineer spends a quarter learning things that someone, somewhere, already knew."
      },
      {
        "type": "p",
        "text": "We never book any of this as a cost. We call it onboarding, or due diligence, or an incident bridge. Because the spending has friendly names, it never appears in a business case, and nobody is ever asked to reduce it."
      },
      {
        "type": "h2",
        "text": "Why AI multiplies it"
      },
      {
        "type": "p",
        "text": "Models are remarkable at reasoning over what is in front of them and helpless about what is not. Anthropic describes context as [a critical but finite resource](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) and warns of *context rot*: as the token count grows, the model's ability to recall and use what is in the window declines. Thoughtworks' Birgitta Böckeler makes the same point for coding agents: [an agent's effectiveness goes down](https://martinfowler.com/articles/exploring-gen-ai/context-engineering-coding-agents.html) when it gets too much context, and the extra context costs money too."
      },
      {
        "type": "p",
        "text": "So the naive answer, give the agent everything, fails twice: it costs more and it performs worse. The opposite failure is just as common. MIT's NANDA research on enterprise generative AI reported that only about [5% of integrated pilots](https://www.zirous.com/insights/a-clearer-view-of-mits-genai-data-what-95-of-genai-projects-fail-really-means/) were generating real value, and the diagnosis that stuck with me was the learning gap: tools that do not retain context, do not adapt to the workflow, and make people supply the same background again and again."
      },
      {
        "type": "p",
        "text": "Here is the point I think most AI business cases miss. The marginal cost of a new agent is rarely the license. It is the context that agent has to assemble before it is useful. If every agent starts from zero, your context bill grows in step with your AI ambition."
      },
      {
        "type": "h2",
        "text": "Four hidden line items"
      },
      {
        "type": "ol",
        "items": [
          "**Rediscovery.** People and agents rebuild the same understanding for every incident, change, audit and project. This cost scales with every agent you deploy, because each one starts from nothing.",
          "**Inconsistency.** Two teams, or two agents, give different answers to the same question because they assembled context from different fragments. In a regulated business, an inconsistent answer is an audit finding waiting to be written.",
          "**Decay.** Context that was right last year and is wrong today. A stale runbook, or a page describing a retired system, is worse than no documentation, because people trust it.",
          "**Departure.** Knowledge that leaves with people. Every reorganization and every retirement is an unplanned deletion of institutional memory."
        ]
      },
      {
        "type": "h2",
        "text": "A familiar night"
      },
      {
        "type": "p",
        "text": "A payments service starts degrading at two in the morning. The on-call engineer has never touched it. The first forty minutes go to questions rather than fixes: which upstream systems feed it, what changed this week, whether this has happened before, who owns the database underneath it."
      },
      {
        "type": "p",
        "text": "The answers exist. They sit in a ticket from last spring, a post-mortem nobody linked, a configuration record with the wrong owner and the memory of a senior engineer who is asleep. Eventually the right person is paged, recognizes the pattern in two minutes and applies the fix they applied last time. In the large regulated banks I have worked in, I have watched some version of this scene more often than I can count."
      },
      {
        "type": "p",
        "text": "Nothing in that story shows up in a budget, yet the cost is real: minutes of customer impact, hours of senior attention, and a lesson that will be relearned next time because it still lives in one head. Put an AI agent on that bridge without curated context and very little changes. It searches the same fragments faster, and it is confidently wrong about which ones matter."
      },
      {
        "type": "h2",
        "text": "Why this is a leadership problem"
      },
      {
        "type": "p",
        "text": "Unmanaged context persists because nobody owns it. Data has chief data officers, code has engineering leaders, infrastructure has platform teams. Context, the connective tissue between all of them, has no budget line and no accountable executive. It is everyone's problem and no one's job, which is exactly how valuable things decay."
      },
      {
        "type": "p",
        "text": "That is why I treat context as an asset class rather than a tooling choice. Assets get owners, investment cases, quality measures and lifecycle management. Tools get bought, piloted and abandoned. Treat the context your agents depend on as a tool and you will rebuild it for every use case. Treat it as an asset and every use case makes it richer."
      },
      {
        "type": "h2",
        "text": "What stays yours when the models change"
      },
      {
        "type": "p",
        "text": "Models are becoming interchangeable. This year's frontier model is next year's commodity, and most large organizations already run several. What does not commoditize is the context those models reason over: how your systems connect, why decisions were made, what your policies require, what has gone wrong before. No vendor can sell you that, and when it is maintained it compounds. I would spend scarce architecture attention there before spending it on the next model evaluation."
      },
      {
        "type": "p",
        "text": "I learned a version of this on data platforms. When we consolidated 360 data scientists onto one ML platform at USAA, shared infrastructure paid off only when shared definitions and clear ownership came with it. Context for agents follows the same rule."
      },
      {
        "type": "p",
        "text": "Analysts are arriving at the same place. Gartner expects context engineering features to be built into [80% of the software tools used to build AI applications by 2028](https://atlan.com/know/gartner-context-graphs/), and Foundation Capital argues that the next great enterprise platforms will be [systems of record for decisions](https://ashugarg.substack.com/p/ais-trillion-dollar-opportunity-context), keeping the decision traces that today's systems simply throw away."
      },
      {
        "type": "h2",
        "text": "What managed context looks like"
      },
      {
        "type": "ul",
        "items": [
          "**Owned.** Every piece of context has an accountable owner, just like code and data.",
          "**Fresh.** It carries a verified date and a review-by date, so agents can tell when it has expired.",
          "**Traceable.** You can see where it came from and who checked it.",
          "**Governed.** Access, classification and retention follow the same rules as the systems it describes.",
          "**Reusable.** Built once and used by every person and agent, instead of reassembled per use case."
        ]
      },
      {
        "type": "p",
        "text": "None of this needs a moonshot. It needs context to be run as a product with an owner and a lifecycle, rather than left as a by-product of people talking to each other."
      },
      {
        "type": "h2",
        "text": "Start by measuring it"
      },
      {
        "type": "p",
        "text": "You cannot manage what you do not count. Pick one workflow, such as incident triage or change approval, and measure how long it takes to assemble the context before any real work starts. Count how many people get pulled in to answer the same questions. That number is your cost of unmanaged context, and in my experience it is large enough to fund the fix."
      },
      {
        "type": "monday",
        "items": [
          "Time the first hour of your next major incident and record how many minutes go to assembling context before anyone attempts a fix.",
          "Name one accountable **owner** for the context of your most critical application, with a review-by date attached.",
          "Add a context-assembly cost line to the business case template for every new AI agent proposal.",
          "Ask your architects to list the five questions engineers repeatedly ask about one tier-one service, and where each answer lives today."
        ]
      },
      {
        "type": "p",
        "text": "If you timed the first hour of your next major incident, how much of it would go to rediscovering something your organization already knew?"
      },
      {
        "type": "bottomLine",
        "text": "Context is the asset AI runs on, and most enterprises leave it unmanaged. Build it once, govern it once, and let every model you adopt reuse it. The rest of this series covers how."
      }
    ]
  },
  {
    "slug": "context-fragmentation",
    "title": "Context fragmentation: why your agents keep starting from zero",
    "summary": "The knowledge an agent needs is scattered across code, tickets, chat, wikis, incident tools and people's heads. Each fragment is accurate and useless alone. Fragmentation, more than model quality, is what makes enterprise agents brittle.",
    "theme": "context-engineering",
    "status": "published",
    "published": "2026-06-30",
    "plannedFor": "Jun 2026",
    "source": "Part 2 of the Context Engineering series.",
    "related": [
      "the-cost-of-unmanaged-context",
      "not-another-data-lake"
    ],
    "series": {
      "name": "Context Engineering",
      "part": 2
    },
    "body": [
      {
        "type": "p",
        "text": "**Your agents are brittle because your context is in pieces, and a better model will not fix that.** Ask a simple question about almost any enterprise application: *what breaks if this goes down?* The answer exists. It is just in eight places. Some of it is in the code, some in the configuration database, some in last year's incident tickets, some in an architecture diagram nobody has opened since it was approved, some in a chat thread, and the most important part is in the head of an engineer who is on vacation."
      },
      {
        "type": "p",
        "text": "That is context fragmentation. Each fragment is accurate on its own terms, and none of them answers the question. Every person or agent who needs the answer has to reassemble it from scratch, every time."
      },
      {
        "type": "h2",
        "text": "Where context lives today"
      },
      {
        "type": "ul",
        "items": [
          "**Code and pipelines** tell you *what* the system does, never *why*.",
          "**Tickets and backlogs** hold intent and decisions, buried in comment threads.",
          "**Incident and change records** hold failure modes and fixes, written under pressure and rarely revisited.",
          "**Configuration databases and catalogs** hold relationships, often incomplete or out of date.",
          "**Wikis and architecture documents** hold the design as approved, not as built.",
          "**Chat and meetings** hold the real reasoning, and then lose it.",
          "**People** hold everything else."
        ]
      },
      {
        "type": "p",
        "text": "Atlassian's State of Teams research found that executives and teams spend [a quarter of their workweek](https://petri.com/inefficient-information-management-costing-businesses/) just trying to find relevant data. Humans at least have colleagues to ask and instincts about which source to distrust. An agent has neither."
      },
      {
        "type": "h2",
        "text": "Why agents feel it first"
      },
      {
        "type": "p",
        "text": "A human expert carries an internal map: which wiki pages are stale, which team really owns a service, which dashboard to ignore. An agent has only what it retrieves. Give it fragments and it will stitch them into an answer that is plausible, consistent with each source, and wrong. The failure is quiet, which makes it worse than an error message."
      },
      {
        "type": "p",
        "text": "Google's announcement of the Open Knowledge Format named the problem directly: knowledge sits in [metadata catalogs, wikis, code comments and the heads of a few senior engineers](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing), and every agent builder ends up solving the same context-assembly problem from scratch. In a large enterprise that duplication happens inside one company. Every team building an assistant writes its own connectors, its own retrieval and its own prompts over the same scattered sources."
      },
      {
        "type": "h2",
        "text": "Three symptoms you will recognize"
      },
      {
        "type": "ol",
        "items": [
          "**Every AI use case rebuilds the same plumbing.** The incident assistant, the coding agent and the risk chatbot each connect to the same systems in slightly different ways, and each needs its own security review.",
          "**Agents disagree with each other.** Two assistants give different answers about the same application because they retrieved different fragments. Trust collapses the first time a senior leader notices.",
          "**Fixes do not stick.** Someone corrects a wrong answer in one tool, and the other tools never learn. The knowledge was corrected, but only in one fragment."
        ]
      },
      {
        "type": "h2",
        "text": "Why more retrieval is not the answer"
      },
      {
        "type": "p",
        "text": "The instinctive fix is a bigger index: connect everything, embed everything, let the agent search. It helps at first. But retrieval over fragments returns fragments. It does not decide which source is authoritative, which version is current, or how two facts relate. And because of [context rot](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents), pushing more raw material into the window often makes the answer worse."
      },
      {
        "type": "p",
        "text": "This is where I part ways with much of the common advice. Search quality is rarely the binding constraint. The binding constraint is that nobody has done the synthesis, so every query pays for it again, at inference time, with no memory of the last attempt."
      },
      {
        "type": "p",
        "text": "Andrej Karpathy's *LLM wiki* idea points somewhere better. Instead of re-deriving answers from raw sources on every query, the model [compiles knowledge once](https://noqta.tn/en/blog/karpathy-llm-wiki-knowledge-base-beyond-rag-2026) into maintained, linked pages and answers from those. Synthesis is done once, kept current and reused."
      },
      {
        "type": "h2",
        "text": "From fragments to one coherent unit"
      },
      {
        "type": "p",
        "text": "The organizing idea I keep returning to is simple: **give every application one coherent, governed body of context**, assembled from the fragments, owned by the team that runs it, and readable by people and agents alike. It is a curated layer, not a new system of record, and for each application it answers the same things: what it does, why it exists, what it depends on, what depends on it, how it fails, how it is secured and who to call."
      },
      {
        "type": "p",
        "text": "Once that unit exists, agents stop starting from zero. The incident assistant, the coding agent and the architecture reviewer all read the same context. A correction made once is a correction everywhere. The question *what breaks if this goes down?* becomes a lookup and a traversal instead of an investigation."
      },
      {
        "type": "p",
        "text": "In my experience a useful outline covers a handful of areas, the same way, for every application:"
      },
      {
        "type": "ul",
        "items": [
          "**Purpose:** the business capability it serves and who depends on it.",
          "**Architecture:** components, data flows and the patterns it follows.",
          "**Dependencies in both directions:** what it calls and what calls it, so blast radius can be traced.",
          "**Security and data handling:** classification, identities, controls and exceptions.",
          "**Resiliency and failure modes:** how it fails, how it recovers and what happened last time.",
          "**Operations:** runbooks, on-call ownership and recent changes.",
          "**Decisions:** the key trade-offs and why they were made."
        ]
      },
      {
        "type": "p",
        "text": "The outline matters as much as the content. When every application follows the same structure, an agent can move through any of them the same way, reading a short index first and opening detail only when needed. Anthropic describes this as [progressive disclosure](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents): letting an agent discover context layer by layer instead of loading everything up front."
      },
      {
        "type": "h2",
        "text": "Why regulated industries feel it more"
      },
      {
        "type": "p",
        "text": "In a bank or an insurer, fragmentation is also a control problem. When an examiner asks how a critical application depends on its upstream systems, or why a risk was accepted, the organization needs one answer with evidence. Fragmented context produces several answers, assembled by different people under time pressure. Consistency is a control, and fragmentation makes it impossible to demonstrate."
      },
      {
        "type": "p",
        "text": "AI governance raises the stakes. If an agent recommends an action, you need to show what it knew and where that knowledge came from. That is only practical when context lives in one governed place with clear provenance, rather than in whatever an agent happened to retrieve that afternoon."
      },
      {
        "type": "h2",
        "text": "Who funds the fix"
      },
      {
        "type": "p",
        "text": "Fixing fragmentation pays off on both sides of the ledger, and that is its quiet advantage in a budget conversation. Product teams change systems faster, reuse architecture instead of rediscovering it, and make portfolio decisions with a clear view of what depends on what. Incident responders trace blast radius in minutes, root-cause analysis rests on evidence rather than memory, and risk teams see exposure without commissioning a study. It is one of the rare investments that a technology leader and a risk leader will fund together, which in my experience is the best predictor that it survives the next budget cycle."
      },
      {
        "type": "h2",
        "text": "What to do first"
      },
      {
        "type": "ul",
        "items": [
          "**Map one critical workflow.** List every source a person consults to triage an incident or approve a change. That list is your fragmentation map.",
          "**Pick the unit.** For most technology organizations it is the application or service. Define what a complete body of context for one looks like.",
          "**Name an owner.** Context without an owner fragments again within a quarter.",
          "**Serve it once.** Expose it through one governed interface, for example an MCP server, so every agent uses the same context instead of building its own."
        ]
      },
      {
        "type": "monday",
        "items": [
          "Ask two of your AI assistants the same dependency question about one critical application and put their answers side by side.",
          "Inventory the connectors your teams built this year to the configuration database, ticketing and code systems, and flag the duplicates.",
          "Route the next correction to a wrong agent answer back to its source, then check whether every other assistant now reflects the fix."
        ]
      },
      {
        "type": "p",
        "text": "If you counted the connectors your teams have built to the same five systems this year, how many separate copies of the truth would you find?"
      },
      {
        "type": "bottomLine",
        "text": "Your agents are not failing because the models are weak. They are failing because the context is in pieces. Fix fragmentation once, at the level of the application, and every agent you deploy inherits the fix."
      }
    ]
  },
  {
    "slug": "not-another-data-lake",
    "title": "Not another data lake: context needs curation, not collection",
    "summary": "The tempting answer to fragmented context is to pour everything into one place. We tried that with data, and many lakes became swamps. A context layer has to be a curated overlay: retrieval-first, owned, and pointing back to the systems that hold the truth.",
    "theme": "context-engineering",
    "status": "published",
    "published": "2026-07-21",
    "plannedFor": "Jul 2026",
    "source": "Part 3 of the Context Engineering series.",
    "related": [
      "context-fragmentation",
      "passive-capture"
    ],
    "series": {
      "name": "Context Engineering",
      "part": 3
    },
    "body": [
      {
        "type": "p",
        "text": "**If you build your context layer the way most enterprises built their data lakes, you will get a swamp, and this time agents will drink from it with complete confidence.** When leaders first hear the case for an enterprise context layer, the same question arrives within minutes: *so we copy everything into one place?* I understand the instinct. I have spent much of my career on data platforms, and I remember the same promise a decade ago. Put all the data in the lake and insight will follow."
      },
      {
        "type": "p",
        "text": "It mostly did not. A recent fifteen-year retrospective, [What Went Wrong with Data Lakes?](https://arxiv.org/pdf/2606.08266), concludes that the root causes were largely organizational rather than technical. Teams ingested data without purpose, postponed schema and governance, and assumed that access meant usability. The paper's central idea is **governance debt**: the compounding cost of every deferred decision about ownership, metadata and quality, until the lake becomes a swamp."
      },
      {
        "type": "p",
        "text": "The same pattern is already forming around enterprise AI, and the stakes are higher. A swamp of data slows analysts down. A swamp of context makes agents wrong at scale."
      },
      {
        "type": "h2",
        "text": "Why bulk ingestion fails for context"
      },
      {
        "type": "ol",
        "items": [
          "**Volume is not knowledge.** A million chat messages and ten thousand tickets contain the answer to your question, alongside a hundred thousand wrong or outdated ones. Copying them does nothing to tell them apart.",
          "**Copies go stale.** The moment you duplicate a source, you own the problem of keeping it in sync, and context about running systems changes daily.",
          "**Copies multiply risk.** Every replica of sensitive operational data is another place to secure, classify, retain and audit. In a regulated enterprise that is a reason to say no.",
          "**Context rot.** More raw material in an agent's window [degrades its recall](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents). The goal is the smallest set of high-signal facts, not the largest pile."
        ]
      },
      {
        "type": "figure",
        "name": "context-layer"
      },
      {
        "type": "h2",
        "text": "A curated overlay instead"
      },
      {
        "type": "p",
        "text": "The alternative is an overlay: a thin, curated layer of knowledge that sits *on top of* the systems of record instead of replacing them. Four design principles make the difference."
      },
      {
        "type": "p",
        "text": "**Source systems stay authoritative.** The code repository remains the truth about code, the configuration database the truth about infrastructure, the ticketing system the truth about work. The context layer holds what those systems cannot: synthesis, relationships and rationale. Every claim links back to where it came from, so when the two disagree, everyone knows which one wins."
      },
      {
        "type": "p",
        "text": "**Retrieval-first, not copy-first.** Store pointers and summaries, and fetch details just in time. This is how Anthropic describes effective agents: keep [lightweight identifiers](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) such as file paths and load data when it is needed. A context layer should behave the same way at enterprise scale."
      },
      {
        "type": "p",
        "text": "**Ownership and governance from day one.** The data lake lesson fits in one sentence: decide ownership and metadata requirements first, because deferral is what turns a lake into a swamp. Every unit of context needs an owner, a classification and a review date before it is published. Zhamak Dehghani's [data mesh](https://martinfowler.com/articles/data-monolith-to-mesh.html) made the same argument for analytical data, that it should be a product owned by the domain that understands it. I would apply that thinking to context even more strictly, because an agent cannot tell a stale page from a current one unless someone has said so."
      },
      {
        "type": "p",
        "text": "**Not a production dependency.** A context layer should make people and agents faster and safer, but production systems must never need it to run. If it goes down, you lose speed, not service. That boundary keeps the blast radius small and the architecture honest, and it makes the risk conversation far shorter."
      },
      {
        "type": "p",
        "text": "Here is where I disagree with the common advice to start broad and prune later. Pruning almost never happens. Once a source is connected, someone's workflow depends on it, and removing it turns into a negotiation. Start narrow instead: one workflow, the handful of sources it truly needs, and an owner for each. Add a source only when a real question cannot be answered without it. This feels slow in the first quarter. By the third quarter it is faster, because the team is no longer arguing about which of four conflicting answers is right."
      },
      {
        "type": "h2",
        "text": "Collection versus curation"
      },
      {
        "type": "ul",
        "items": [
          "**A lake asks:** what can we ingest? **A context layer asks:** what does a person or agent need to know to act correctly?",
          "**A lake stores** raw records. **A context layer stores** synthesized knowledge with links to the records.",
          "**A lake grows** without limit. **A context layer stays** deliberately small, current and reviewed.",
          "**A lake's quality** is everyone's problem and no one's job. **A context layer's quality** belongs to named owners."
        ]
      },
      {
        "type": "h2",
        "text": "Signs you are building a context swamp"
      },
      {
        "type": "ul",
        "items": [
          "Content is added because a connector exists, not because a use case needs it.",
          "Nobody can say who owns a given piece of knowledge, or when it was last verified.",
          "The same fact appears in several places with different values.",
          "Agents cite sources that have since been retired or rewritten.",
          "Sensitive data shows up in places it was never classified for.",
          "Teams quietly go back to asking the expert, because the layer is not trusted."
        ]
      },
      {
        "type": "p",
        "text": "That last sign matches what the retrospective calls *governance gravity*: when governance on the new platform gets hard, organizations drift back to the older, more structured way of working, and the investment becomes shelfware. I have seen this happen with data platforms that were technically excellent. People did not reject the technology. They rejected answers they could not vouch for."
      },
      {
        "type": "h2",
        "text": "Retrieval that respects policy"
      },
      {
        "type": "p",
        "text": "A curated overlay still needs good retrieval, and no single technique is enough. Keyword search finds exact identifiers and error codes. Vector search finds meaning. Code and dependency graphs answer structural questions such as what depends on this. Ontologies resolve the vocabulary differences between teams. The routing layer that chooses among them must also enforce access control, so an agent acting for one user never retrieves knowledge that user is not entitled to see. In a regulated enterprise, policy-aware retrieval is the first requirement, not a later phase."
      },
      {
        "type": "h2",
        "text": "Governance debt, applied to context"
      },
      {
        "type": "p",
        "text": "The retrospective's most useful contribution is a vocabulary for decay, and applied to context the stages are easy to spot. First, content arrives faster than anyone can review it. Then ownership gaps appear, and nobody is sure which version to believe. Then quality slips and agents start citing stale facts. Finally trust collapses and people route around the platform."
      },
      {
        "type": "p",
        "text": "The interventions are the same as for data: assign ownership before you publish, require metadata at the door, put quality gates on what agents may treat as verified, and make the debt visible to leadership before it compounds. The cheapest moment to make these decisions is the beginning, which is exactly when teams are most tempted to skip them in favor of speed. My decision rule is blunt: if a source has no owner who will sign for it, it does not go in."
      },
      {
        "type": "h2",
        "text": "Isn't this just a knowledge graph?"
      },
      {
        "type": "p",
        "text": "Partly. Graphs are excellent for relationships, and Gartner's view, as [Atlan summarizes it](https://atlan.com/know/gartner-context-graphs/), is that context graphs augment knowledge graphs rather than replace them, adding a procedural layer of decisions, workflows and traces. But a graph is a representation, not a governance model. What matters is curation: who decides what goes in, how it is verified and when it expires. You can store a curated overlay as files, as a graph, or both. You cannot skip the curation."
      },
      {
        "type": "monday",
        "items": [
          "Audit the sources already connected to your AI assistants and flag every one that has no named owner willing to sign for it.",
          "Write a one-page admission rule requiring an owner, a classification and a review date before anything enters the context layer.",
          "Test whether an agent acting for a junior user can retrieve knowledge derived from records that user cannot open.",
          "Ask one team to list facts that appear in several places with different values, and name the authoritative source for each."
        ]
      },
      {
        "type": "p",
        "text": "Most enterprises already have the connectors to build a lake of context by next quarter. Do you have the owners to build a curated one?"
      },
      {
        "type": "bottomLine",
        "text": "We already know what happens when collection is mistaken for knowledge. Build the context layer as a curated overlay: small, owned, retrieval-first and pointing back to the source of truth. Otherwise you are building the next swamp, with agents swimming in it."
      }
    ]
  },
  {
    "slug": "passive-capture",
    "title": "Passive capture: knowledge that writes itself, with humans who approve it",
    "summary": "Documentation fails because it is a second job. The knowledge we need is already produced as a by-product of work: commits, tickets, incidents, reviews and decisions. Capture it passively, distill it, and keep a human approval gate before anything becomes trusted.",
    "theme": "context-engineering",
    "status": "published",
    "published": "2026-08-18",
    "plannedFor": "Aug 2026",
    "source": "Part 4 of the Context Engineering series.",
    "related": [
      "not-another-data-lake",
      "self-describing-knowledge-open-knowledge-format"
    ],
    "series": {
      "name": "Context Engineering",
      "part": 4
    },
    "body": [
      {
        "type": "p",
        "text": "**Documentation fails because it is a second job, so stop asking people to write it and start capturing what their work already produces.** Every enterprise has tried to fix knowledge with a documentation push. A wiki is launched, templates are written, teams are asked to keep pages current. Six months later the pages are stale and the effort quietly ends."
      },
      {
        "type": "p",
        "text": "The problem is design, not discipline. Engineers are measured on shipping, and writing about what they shipped always loses that contest. Yet the knowledge we want is already being produced every day, as a by-product of the work itself."
      },
      {
        "type": "h2",
        "text": "The exhaust of work"
      },
      {
        "type": "ul",
        "items": [
          "**Commits and pull requests** explain what changed and, in review comments, why.",
          "**Tickets** capture intent, acceptance criteria and the decisions made along the way.",
          "**Incidents and post-mortems** record failure modes, blast radius and fixes.",
          "**Change and problem records** capture what was approved, what went wrong and what was learned.",
          "**Architecture reviews and decision records** capture the trade-offs. Michael Nygard introduced [architecture decision records](https://www.redhat.com/en/blog/architecture-decision-records) in 2011 because the reasoning behind decisions stays with whoever made them, and newcomers are left guessing.",
          "**Chat** captures the real debate, and then scrolls it away."
        ]
      },
      {
        "type": "p",
        "text": "Foundation Capital calls the missing piece [decision traces](https://ashugarg.substack.com/p/ais-trillion-dollar-opportunity-context): the inputs gathered, the policy applied, the exception granted and who approved it. Systems of record keep the outcome and lose the trace. In their words, the reasoning connecting data to action was never treated as data in the first place. The opportunity is to capture it where the work happens, instead of asking people to reconstruct it later."
      },
      {
        "type": "h2",
        "text": "Passive, not automatic"
      },
      {
        "type": "p",
        "text": "Passive capture means harvesting these signals without asking anyone to do extra work. It does not mean publishing whatever a model extracts. Raw exhaust is noisy, sensitive and often wrong. Between capture and trust sits a distillation process with five steps."
      },
      {
        "type": "ol",
        "items": [
          "**Strip and redact.** Remove personal and sensitive data before anything else touches it. This is a security requirement, not an option.",
          "**Classify.** Decide what kind of knowledge a signal carries: a dependency, a failure mode, a decision, an owner, a runbook step.",
          "**Extract.** Pull out the lasting fact and discard the conversation around it.",
          "**Reconcile.** Merge it with what is already known, resolve conflicts and flag contradictions.",
          "**Approve.** A human who owns the application reviews the change before it becomes trusted context."
        ]
      },
      {
        "type": "h2",
        "text": "Why the human gate matters"
      },
      {
        "type": "p",
        "text": "It is tempting to remove the human to go faster. Resist it. Generated documentation becomes fluent long before it becomes reliable, which is the [trust gap I wrote about last year](/writing/living-documentation-trust-gap): a page that is 90% right still needs a human, because nobody knows which 10% is wrong. A confident, wrong page is more dangerous than an empty one, because people and agents trust it. In regulated industries the approval is also the evidence: it shows who verified a piece of knowledge and when."
      },
      {
        "type": "p",
        "text": "The trick is to make approval cheap. Do not ask owners to write. Ask them to review a proposed change, the way they already review a pull request. Agents do the drafting, merging and cross-referencing that humans neglect. As Karpathy put it in the gist behind the LLM wiki pattern, quoted in [Google's Open Knowledge Format announcement](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing), LLMs \"don't get bored, don't forget to update a cross-reference, and can touch 15 files in one pass.\" People supply the judgment."
      },
      {
        "type": "quote",
        "text": "Code fast, verify hard, and keep the humans in the loop."
      },
      {
        "type": "p",
        "text": "Here is the counterintuitive part. The human gate is what makes the system fast over time, not what slows it down. Without it, a single confidently wrong page can poison trust in the whole layer, and teams go back to asking the expert. With it, every approved fact carries a name and a date, and people stop double-checking."
      },
      {
        "type": "p",
        "text": "A practical decision rule keeps the gate cheap: tier it by consequence. A new contact name or a corrected link can be published as a clearly labeled draft and confirmed in a weekly batch. A new failure mode, a changed dependency, or anything that would alter how someone responds to an incident needs the owner's approval before agents treat it as verified. The review load stays small, and the risky changes still get a human."
      },
      {
        "type": "h2",
        "text": "A feedback loop, not a pipeline"
      },
      {
        "type": "p",
        "text": "Passive capture is not a one-way flow. Every time an agent uses context and a person corrects it (an answer was wrong, a dependency was missing, a runbook step was outdated) that correction is itself a signal. Feed it back through the same steps. Over time the knowledge corrects itself where it is used, which is the only place anyone notices errors."
      },
      {
        "type": "p",
        "text": "The failure mode to watch for is the rubber stamp. If owners approve every proposal within seconds, the gate has turned into theater. I would sample a few approved changes each month and check them against their sources, the way internal audit samples a control. When the sample turns up errors, the fix is usually upstream, in better classification or tighter extraction, rather than more reviewers."
      },
      {
        "type": "h2",
        "text": "An incident, end to end"
      },
      {
        "type": "p",
        "text": "Here is what this looks like in practice. An incident is resolved and its post-mortem is written, as it would be anyway. The capture process reads the record and the linked change, strips personal data, and classifies what it found: a new failure mode, a dependency that was never documented, and a runbook step that turned out to be wrong."
      },
      {
        "type": "p",
        "text": "It drafts three small updates to the application's context, each linked to its source, and opens them for review. The application owner approves two and corrects the third in a couple of minutes. The next time that failure appears, every person and agent sees the updated knowledge, with a note saying who verified it and when. No one wrote documentation, and the knowledge still improved, because it was harvested from work that had to happen anyway."
      },
      {
        "type": "h2",
        "text": "Security, privacy and restraint"
      },
      {
        "type": "p",
        "text": "Harvesting operational signals means touching sensitive material: customer identifiers in tickets, credentials pasted into chat, internal names in incident notes. Redaction has to happen at the very start, before classification or any model sees the content. Access rules should follow the source. If a person could not read the original ticket, they should not be able to read knowledge derived from it. Every derived fact keeps a link to its source, so an auditor can trace any statement back to the evidence."
      },
      {
        "type": "p",
        "text": "Restraint matters as much as reach. Some material should never be harvested: personal conversations, performance discussions, privileged legal advice, anything a person reasonably expected to be ephemeral. Be explicit about which sources are in scope, tell people, and prefer structured, work-related signals over ambient monitoring. A context layer that feels like surveillance will lose the trust it depends on, and the best knowledge comes from teams who see the system working for them."
      },
      {
        "type": "h2",
        "text": "How to know it is working"
      },
      {
        "type": "ul",
        "items": [
          "**Coverage:** the share of critical applications with current, owner-approved context.",
          "**Freshness:** the share of knowledge verified within its review window.",
          "**Reuse:** how often agents and people answer questions from the layer instead of escalating to an expert.",
          "**Time to context:** minutes from the start of an incident or change to having the background needed to act."
        ]
      },
      {
        "type": "h2",
        "text": "Where to start"
      },
      {
        "type": "ul",
        "items": [
          "**Start with incidents.** They are high-signal, already reviewed and painful enough that teams welcome help.",
          "**Capture decisions at the point of approval.** If an architecture or change review happens in a tool, record the rationale there, structured and linked.",
          "**Measure the approval load.** If owners spend more than a few minutes a week approving, the process is not filtering enough.",
          "**Track freshness.** Every captured fact gets a date and a review-by date, so decay is visible instead of silent."
        ]
      },
      {
        "type": "monday",
        "items": [
          "Take one incident from last month, have an agent draft the context updates its post-mortem implies, and ask the owner to review them.",
          "Publish a short list of sources in scope for capture, and those explicitly excluded, to the teams whose work it touches.",
          "Set a target for owner approval time, such as ten minutes a week, and measure it from the first pilot.",
          "Add a last-verified date and a review-by date to every runbook for one critical service."
        ]
      },
      {
        "type": "p",
        "text": "Think about the last major incident your teams resolved: how much of what they learned is written down anywhere an agent could find it today?"
      },
      {
        "type": "bottomLine",
        "text": "Stop asking people to document. Capture the knowledge their work already produces, distill it with agents, and keep a human approval gate before it becomes trusted. Knowledge that writes itself, with people who sign for it."
      }
    ]
  },
  {
    "slug": "self-describing-knowledge-open-knowledge-format",
    "title": "Self-describing knowledge: why the Open Knowledge Format matters, and what enterprises must add",
    "summary": "In June, Google Cloud published the Open Knowledge Format, and July's v0.2 added provenance, verification and freshness. It is the right foundation. Regulated enterprises still need to add ownership, classification and a policy for how much trust an agent needs before it acts.",
    "theme": "context-engineering",
    "status": "published",
    "published": "2026-09-15",
    "plannedFor": "Sep 2026",
    "source": "Part 5 of the Context Engineering series.",
    "related": [
      "passive-capture",
      "the-cost-of-unmanaged-context"
    ],
    "series": {
      "name": "Context Engineering",
      "part": 5
    },
    "body": [
      {
        "type": "p",
        "text": "**Knowledge for AI agents should live in plain files that state, on their face, who owns them and how far to trust them.** Throughout this series I have argued that context is the asset AI runs on, that it is fragmented, that it should be curated rather than collected, and that it can be captured from the work itself. The last question is the most practical one: what format should that knowledge take?"
      },
      {
        "type": "p",
        "text": "On June 12, 2026, Google Cloud published a candidate answer: the [Open Knowledge Format](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing), or OKF. Six weeks later Google shipped [OKF v0.2](https://cloud.google.com/blog/products/data-analytics/okf-v0-2-adds-trust-signals), which added provenance and trust signals. I think it gets the foundation right. I also think regulated enterprises need to build on top of it carefully, and together."
      },
      {
        "type": "h2",
        "text": "What OKF is"
      },
      {
        "type": "p",
        "text": "OKF is deliberately small. Knowledge is a directory of Markdown files, one concept per file, where the file path is the concept's identity. Each file carries YAML frontmatter, and only one field is required: `type`. A title, a description, a link to the live resource and tags are recommended. Concepts link to each other with ordinary Markdown links, which turns the directory into a graph. Optional index files support progressive disclosure, and optional log files record history. The [spec and reference code](https://github.com/GoogleCloudPlatform/open-knowledge-format) are public, and since August they have their own repository."
      },
      {
        "type": "p",
        "text": "Google's principles are the important part: minimally opinionated, producers and consumers independent of each other, and a **format, not a platform**, with no required cloud, database, model provider or SDK. Google describes OKF as formalizing the [LLM wiki pattern](https://noqta.tn/en/blog/karpathy-llm-wiki-knowledge-base-beyond-rag-2026) Karpathy popularized, and places it in the same family as convention files like AGENTS.md. I find it useful to think of three pieces: instructions for agents (AGENTS.md), executable workflows (skills), and reference knowledge. OKF fills the third."
      },
      {
        "type": "h2",
        "text": "Why plain files are the right foundation"
      },
      {
        "type": "ul",
        "items": [
          "**People and agents read the same thing.** Markdown renders in any editor and on GitHub, and models read it natively.",
          "**Version control comes free.** Put knowledge in Git and you get history, diffs, review, blame and rollback, the controls engineering already trusts.",
          "**Retrieval stays flexible.** The same files can feed keyword search, vector indexes or a graph.",
          "**Switching models stays cheap.** Knowledge outlives any one model, vendor or agent framework when it lives in an open format you own."
        ]
      },
      {
        "type": "h2",
        "text": "What enterprises must add: knowledge that vouches for itself"
      },
      {
        "type": "p",
        "text": "Here is my main argument. A regulated enterprise needs every concept to say not only what it *is* but whether it can be **trusted**, and v0.2 went a long way. It added `sources` for provenance, `generated` and `verified` to separate who wrote a concept from who confirmed it, trust tiers derived from them, a `status` lifecycle and a `stale_after` date. I would adopt those as written. What the core still does not say is who is *accountable*: a verifier checked a page once, an owner answers for it next quarter. There is no sensitivity field, and the trust tiers are explicitly advisory, so the rule for which tier an agent needs before it acts is left to each consumer. The spec lets producers add their own keys, and enterprises should converge on a common set."
      },
      {
        "type": "p",
        "text": "These are the fields I would standardize on, as a small enterprise profile on top of OKF v0.2:"
      },
      {
        "type": "ul",
        "items": [
          "**Identity:** a canonical identifier that ties the concept to the system it describes, so two sets of files never disagree about which application they mean.",
          "**Owner:** the accountable team, distinct from whoever generated or verified it.",
          "**Classification:** sensitivity and handling rules that travel with the knowledge.",
          "**Required trust:** the minimum tier an agent needs before acting on the concept, so the policy sits next to the content instead of inside every agent's prompt."
        ]
      },
      {
        "type": "p",
        "text": "In practice, an enterprise-profiled concept might look like this. Everything above the comment is OKF v0.2, and the rest are producer-defined fields, which the format explicitly allows:"
      },
      {
        "type": "code",
        "lang": "yaml",
        "text": "---\ntype: Application\ntitle: Payments Gateway\ndescription: Routes card authorizations between channels and processors.\nresource: https://catalog.example.com/apps/payments-gateway\ntags: [payments, tier-1]\nstatus: stable\nsources:\n  - id: gateway-repo\n    resource: https://git.example.com/payments/gateway\n  - id: pay-1042\n    resource: https://tickets.example.com/browse/PAY-1042\ngenerated: { by: capture_agent/v3, at: 2026-09-02T10:15:00Z }\nverified: { by: human:j.doe, at: 2026-09-03T09:00:00Z }\nstale_after: 2026-12-01T00:00:00Z\n# Enterprise profile (producer-defined)\nid: app:payments-gateway\nowner: team-payments-platform\nclassification: internal\nrequired_trust: human-reviewed\n---"
      },
      {
        "type": "p",
        "text": "Everything here is human-readable and diffable, and none of it requires a proprietary platform. An agent can decide at a glance whether to trust the content below it."
      },
      {
        "type": "h2",
        "text": "Agents that check before they answer"
      },
      {
        "type": "p",
        "text": "Self-describing knowledge changes agent behavior. An agent that can read trust signals can be told to prefer verified knowledge, label drafts as drafts, refuse to act on expired content, and cite its sources by default. That is the difference between an assistant that sounds right and one an auditor can work with."
      },
      {
        "type": "p",
        "text": "It also makes governance computable, the underrated benefit. You can measure how much of your knowledge is owned, fresh and verified, and where the gaps sit, with a script instead of a survey. Governance that can be counted gets funded. Governance that lives in a policy document gets audited once a year."
      },
      {
        "type": "h2",
        "text": "Consistency and progressive disclosure"
      },
      {
        "type": "p",
        "text": "Format is half the answer, and consistency is the other half. For a technology organization I would pair the format with a standard set of sections for every application: purpose, architecture and dependencies, security, failure modes, operations and recent changes. A standard outline lets agents move through any application the same way and lets you measure completeness across a portfolio."
      },
      {
        "type": "p",
        "text": "OKF's index files make that structure cheap to use. An agent reads a short index for an application, sees what exists, and opens only the concepts it needs. That is the file-system version of the just-in-time loading [Anthropic recommends](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents), and a direct answer to context rot. Log files add the history of what changed, when and why, which is exactly the decision trace that systems of record lose."
      },
      {
        "type": "h2",
        "text": "How it fits with what you already run"
      },
      {
        "type": "p",
        "text": "Self-describing knowledge does not replace your catalogs, repositories or configuration database. It sits on top of them and points back to them through the resource and sources fields. Serve the files through an MCP server and every coding agent, chat assistant and operations tool reads the same governed knowledge."
      },
      {
        "type": "h2",
        "text": "Keep the profile small"
      },
      {
        "type": "p",
        "text": "Once teams see the value of metadata, the temptation is to keep adding fields. I have watched this happen with data catalogs: dozens of attributes per table, most of them empty, quietly teaching everyone that the metadata cannot be trusted."
      },
      {
        "type": "p",
        "text": "My rule is that a field earns its place only if an agent or a control will act on it. Owner, classification and required trust pass that test easily, as do the core's verification and staleness fields, because each one changes what an agent is allowed to do. Most other details belong in the body of the file, where people can read them, rather than in frontmatter that implies someone maintains them."
      },
      {
        "type": "p",
        "text": "Enforce the profile where files are written, not where they are read. A check on the pull request that rejects a concept without an owner or a `stale_after` date costs almost nothing, and it stops decay before it starts."
      },
      {
        "type": "h2",
        "text": "Cautions"
      },
      {
        "type": "p",
        "text": "OKF is at v0.2, and it is early: two versions in six weeks and a new home in August. An [independent review of the spec](https://agentic-ai.readthedocs.io/en/latest/Standards/open-knowledge-format/), written at the v0.1 release, noted that it had no formal governance body, unlike AGENTS.md, which now sits with the Agentic AI Foundation under the Linux Foundation. That has not changed with v0.2: Google still publishes and controls the spec. Validators and ecosystem tooling are still forming, and I have not seen published benchmarks of retrieval or agent gains. Because the core is minimally opinionated, consistency inside a large organization depends on your own conventions."
      },
      {
        "type": "p",
        "text": "Treat it as a strong direction rather than a finished standard: adopt the core, pin the version you build against, keep your enterprise fields in a documented profile, and contribute back. The worst outcome would be every enterprise inventing its own incompatible extensions and recreating the fragmentation the format was meant to solve."
      },
      {
        "type": "monday",
        "items": [
          "Pick ten knowledge files for one critical application and check whether each could state its owner, sources and last verified date.",
          "Draft an enterprise profile of no more than four fields on top of the OKF v0.2 core and circulate it to architecture and risk.",
          "Add a pull request check that rejects any knowledge file missing an **owner** or a `stale_after` date.",
          "Instruct one internal agent to label anything below human-reviewed as draft and to decline actions based on stale knowledge."
        ]
      },
      {
        "type": "p",
        "text": "In the end, the format question is a readiness question. If your organization published its enterprise profile tomorrow, which of these fields would your current knowledge actually be able to fill in?"
      },
      {
        "type": "bottomLine",
        "text": "Knowledge for the AI era should be plain, portable and self-describing: Markdown people can read, structure agents can parse, and metadata that says who owns it, where it came from, when it expires and how far to trust it. OKF v0.2 now covers most of that. Enterprises should add ownership, classification and trust policy, together."
      }
    ]
  }
]
