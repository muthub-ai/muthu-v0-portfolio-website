import type { Block, ThemeSlug } from "./site"

// Essays adapted from Muthu's LinkedIn posts and Medium articles.
// status "draft": shown only in local preview (pnpm dev) or when NEXT_PUBLIC_SHOW_DRAFTS=true.
// To publish: set status to "published" and fill `published` (YYYY-MM-DD).

export interface Essay {
  slug: string
  title: string
  summary: string
  theme: ThemeSlug
  status: "draft" | "published"
  published?: string
  updated?: string
  plannedFor: string
  source: string
  related: string[]
  series?: { name: string; part: number }
  body: Block[]
}

export const essays: Essay[] = [
  {
    "slug": "architecture-that-runs",
    "title": "Architecture that runs: why AI-era governance must be code",
    "summary": "AI now writes code faster than any review board can read it, while architecture still moves at meeting speed. Governance has to become something that executes in the pipeline and in the agent's context.",
    "theme": "governed-ai",
    "status": "published",
    "published": "2026-05-12",
    "plannedFor": "Nov 2026",
    "source": "Adapted from my LinkedIn posts of May 2 and May 10, 2026.",
    "related": [
      "model-is-a-tool-harness-is-the-strategy",
      "spec-driven-development-for-regulated-industries"
    ],
    "body": [
      {
        "type": "p",
        "text": "**If AI is writing your code, your architecture has to become something that runs.** We gave engineers assistants that produce code far faster than any review board can read it, and we kept architecture moving at human speed. That mismatch is quietly breaking the software lifecycle."
      },
      {
        "type": "p",
        "text": "AI coding agents do not *understand* your enterprise. They optimize for finishing the task in front of them. Without guardrails they produce code that violates policy, integrations that bypass approved patterns, and data flows that should not exist. At scale, that is not productivity. It is automated technical debt, and it arrives later as higher run cost and clogged release pipelines."
      },
      {
        "type": "h2",
        "text": "The evidence points the same way"
      },
      {
        "type": "p",
        "text": "This is not a hypothetical worry. Google's 2024 DORA research found that as AI adoption increased, it was accompanied by [an estimated 1.5% decrease in delivery throughput and a 7.2% reduction in delivery stability](https://cloud.google.com/blog/products/devops-sre/announcing-the-2024-dora-report). The same study saw gains in documentation quality, code quality and code review speed. Individuals got faster. The delivery system got shakier."
      },
      {
        "type": "p",
        "text": "The [2025 DORA report](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report) moved the picture forward without changing its shape: AI adoption now related positively to delivery throughput but still negatively to stability. I agree with the report's explanation. Acceleration exposes weaknesses downstream, and without controls such as automated testing and fast feedback loops, more change means more instability. I would add one control that most enterprises have never automated, which is architectural conformance. We test whether code works. We rarely test whether it belongs."
      },
      {
        "type": "figure",
        "name": "architecture-as-code"
      },
      {
        "type": "h2",
        "text": "Architecture is still treated as documentation"
      },
      {
        "type": "p",
        "text": "For most of my career, architecture governance has meant documents, diagrams and review boards. Architecture was something you read, not something that runs. That model was slow but survivable when software changed a few times a quarter. It is obsolete now."
      },
      {
        "type": "p",
        "text": "Michael Nygard named the root problem in 2011 when he proposed architecture decision records: [\"Large documents are never kept up to date.\"](https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions) He was describing human teams. An agent that commits dozens of times a day widens the gap between the document and the code faster than any architect can close it."
      },
      {
        "type": "p",
        "text": "In the large regulated banks I have worked in, the architecture review board was usually the most experienced room in the building and also one of the slowest steps in delivery. That was nobody's fault. The board was being asked to do by reading what should have been done by execution."
      },
      {
        "type": "quote",
        "text": "Architecture is not what you say you'll build; it's what you actually allow into production."
      },
      {
        "type": "h2",
        "text": "What changes when architecture is machine-readable"
      },
      {
        "type": "p",
        "text": "To make the shift concrete, I built a public prototype at [aac.muthub.org](https://aac.muthub.org). Five things change when architecture is machine-readable and version-controlled:"
      },
      {
        "type": "ol",
        "items": [
          "**The plan becomes executable.** Architecture lives in structured formats (YAML or JSON with a small vocabulary), not slide diagrams, and becomes a real source of truth with an owner and a history.",
          "**Code becomes guided.** AI agents pull approved patterns through a machine-readable context layer, so they generate compliant code by design instead of by luck.",
          "**Reviews become deterministic.** Policy-as-code enforces standards in CI/CD and replaces subjective manual review for the questions that have a right answer.",
          "**Operations become measurable.** Because the architecture is data, risk exposure, cost and technical debt become queries rather than quarterly slide exercises.",
          "**Drift becomes visible, and fixable.** What is running is continuously compared with what was designed, so divergence cannot hide until an audit finds it."
        ]
      },
      {
        "type": "p",
        "text": "None of these ideas is new on its own. The Thoughtworks Technology Radar put architectural fitness functions in Trial back in 2017, describing a way to [\"communicate, validate and preserve architectural characteristics in an automated, continual manner\"](https://www.thoughtworks.com/radar/techniques/architectural-fitness-function). What has changed is the audience. The consumer of the rule is now an agent as well as a pipeline."
      },
      {
        "type": "h2",
        "text": "Policy without enforcement is a suggestion"
      },
      {
        "type": "p",
        "text": "The enforcement layer already exists. [Open Policy Agent](https://www.openpolicyagent.org/docs) is built on the idea that it \"decouples policy decision-making from policy enforcement.\" In practice that means the architecture team owns the rule, the platform team owns the gate, and neither has to rewrite the other's code when a standard changes."
      },
      {
        "type": "p",
        "text": "The delivery channel matters as much as the rules. The Model Context Protocol gives coding assistants an open, standard way to reach external systems, so an assistant can query the architecture repository and validate its own output before anything is committed. That is how architectural control scales across thousands of developers: governance in the terminal, where the code is written, instead of in a meeting two weeks later."
      },
      {
        "type": "h2",
        "text": "Where I disagree with the usual advice"
      },
      {
        "type": "p",
        "text": "The common advice is to start with policy-as-code gates in CI. I think that is the wrong first move. Gates alone turn the architecture function into a red light that agents hit after the work is done. Every rejection costs a full cycle, and teams quickly learn to route around the gate. Give agents the approved patterns and schemas first, then add the gate to catch what the context missed. Prevention at generation time is far cheaper than rejection at merge time."
      },
      {
        "type": "p",
        "text": "The second trade-off is how much to encode. Not every architectural judgment belongs in Rego. My decision rule is simple: if two senior architects would reach the same answer from the same facts, encode it. If they would argue, keep it a human decision and record it as an ADR. Over time the arguments settle and become rules. Programs that try to encode everything on day one stall in policy debates and never ship a single check."
      },
      {
        "type": "p",
        "text": "The third is exceptions. A policy engine without a formal waiver process gets switched off within a quarter, usually by someone senior under deadline pressure. Treat every exception as a record with an owner, a risk rating and an expiry date, and the engine stays on."
      },
      {
        "type": "h2",
        "text": "One rule, followed end to end"
      },
      {
        "type": "p",
        "text": "It helps to watch a single rule travel through the whole system. Take a standard most banks already have on paper: every new data store must declare the classification of the data it holds, and anything holding customer data must be encrypted with managed keys."
      },
      {
        "type": "p",
        "text": "In the document world, that rule lives in a standards page. An engineer may or may not read it, a reviewer may or may not catch the gap, and an auditor finds the unencrypted bucket eighteen months later. In the executable world, the rule exists once, as data. The agent's context layer serves the approved storage pattern with the classification field already in the template, so the first draft is usually right. The pipeline check rejects any store that has no classification or the wrong key type, and it says exactly which field failed. If a team genuinely cannot comply yet, it files a waiver with an owner and an expiry, and the check honors it until that date."
      },
      {
        "type": "p",
        "text": "Notice what the architect did not do: attend a meeting, read a diff or chase a team by email. The architect's work moved upstream into writing the rule well and deciding what counts as an acceptable exception. That is a better use of the most experienced people in the building, and in my experience it is also the part of the job they enjoy most."
      },
      {
        "type": "h2",
        "text": "The outer loop is where the next gains are"
      },
      {
        "type": "p",
        "text": "Last year's gains came from the developer's inner loop: writing, completing and explaining code. This year's will come from automating the outer loop, where review, compliance and release still wait in queues. That is where Architecture-as-Code pays for itself."
      },
      {
        "type": "p",
        "text": "I have seen this pattern before. When we consolidated 360 data scientists onto one governed ML platform at USAA, model deployment went from eight weeks to five days. The lesson I took was that the speed came from building the controls into the platform rather than stacking them in front of it. Agents will follow the same rule. The organizations that encode their architecture will let agents move quickly inside it, and the ones that keep it in documents will keep slowing everything down to read."
      },
      {
        "type": "monday",
        "items": [
          "Pick **five** architecture standards where two senior architects would always agree, and assign an owner to rewrite each as a machine-readable rule.",
          "Choose one standard, such as data classification on new data stores, and run it as a non-blocking pipeline check for one product line to measure violations.",
          "Expose your approved patterns to coding assistants through one read-only context endpoint before adding any new merge gate.",
          "Stand up a waiver register where every exception has a named owner, a risk rating and an expiry date, and move existing exceptions into it."
        ]
      },
      {
        "type": "p",
        "text": "So here is the question I would put to any CIO or chief architect: which of your architecture standards could an AI agent check for itself today, before it writes a line of code?"
      },
      {
        "type": "bottomLine",
        "text": "If AI is writing your code, your architecture cannot stay passive. It has to become the system the AI listens to, with rules that run in the agent's context and in the pipeline, and exceptions that are owned and dated."
      }
    ]
  },
  {
    "slug": "the-ai-native-sdlc",
    "title": "The AI-native SDLC: when typing code stops being the bottleneck",
    "summary": "AI has made writing code cheap. Verification, trusted context and human judgment are now the scarce resources, and teams that redesign their lifecycle around them will pull away from teams that only add assistants.",
    "theme": "ai-native-sdlc",
    "status": "published",
    "published": "2026-07-28",
    "plannedFor": "Nov 2026",
    "source": "Adapted from my LinkedIn writing on the AI-native SDLC, 2026.",
    "related": [
      "architecture-that-runs",
      "capture-the-why"
    ],
    "body": [
      {
        "type": "p",
        "text": "**We have commoditized typing code, and that is the least interesting thing about the AI-native software lifecycle.** A few years ago enterprises were debating whether a model could write a working function. Now coding agents, background repair bots and AI help in every phase of delivery are routine on strong teams. The question has moved from whether AI can produce code to whether the organization can absorb it safely."
      },
      {
        "type": "p",
        "text": "My view, after watching this play out in large regulated enterprises, is that the winners will not be the teams with the best assistant. They will be the teams that rebuilt the lifecycle around the new scarcities: verification, trusted context and human judgment. Six shifts separate those teams from the ones bolting AI onto the old process."
      },
      {
        "type": "h2",
        "text": "The evidence is more awkward than the demos"
      },
      {
        "type": "p",
        "text": "Start with what the data says, because it is not the story vendors tell. [DORA's 2024 research](https://cloud.google.com/blog/products/devops-sre/announcing-the-2024-dora-report) found that a 25% increase in AI adoption was associated with better documentation, code quality and review speed, but also with an estimated 1.5% drop in delivery throughput and a 7.2% drop in delivery stability. Individual output went up. The system did not keep pace."
      },
      {
        "type": "p",
        "text": "A year later, [the 2025 DORA report](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report) found 90% of respondents using AI at work and, this time, a positive link to throughput. Stability was still the casualty. DORA's framing is the one I quote most often to executives: AI does not fix a team, it amplifies what is already there."
      },
      {
        "type": "p",
        "text": "Then there is perception. In [METR's randomized study](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) of 16 experienced open-source developers working on 246 real issues, the developers took 19% longer when AI was allowed, yet afterwards still believed it had sped them up by 20%. In February 2026 METR published newer data on late-2025 tools and changed its study design, so I do not treat the number as permanent. The lesson I take is about measurement: if experienced engineers cannot feel the difference, self-reported productivity is not evidence."
      },
      {
        "type": "figure",
        "name": "ai-native-sdlc"
      },
      {
        "type": "h2",
        "text": "Spend the saved time on better problems"
      },
      {
        "type": "p",
        "text": "When syntax speed stops being the constraint, the bottleneck becomes creative problem solving: framing the right problem, choosing between designs, deciding what not to build. The best teams I have seen reinvest the time AI saves into better solutions. Weaker ones simply produce more code, which means more to review, more to secure and more to run."
      },
      {
        "type": "p",
        "text": "A simple test works here. Ask each team where its saved hours went. If the answer is \"more tickets closed\", you have bought volume. If the answer is \"we prototyped three approaches before committing\" or \"we finally paid down that brittle integration\", you have bought quality."
      },
      {
        "type": "p",
        "text": "There is a failure mode hiding in that test. When generation is cheap, teams stop throwing work away. A prototype that took a week used to die quietly if it was wrong; one that took an afternoon gets polished and shipped because it already exists. I now ask teams to treat agent output as disposable by default, and to judge a spike by whether the design deserves to survive."
      },
      {
        "type": "h2",
        "text": "A lifecycle that remembers"
      },
      {
        "type": "p",
        "text": "Static knowledge management is giving way to a lifecycle that learns. Every fixed bug, review comment and agreed pattern should update the context the next agent works from, so the organization gets smarter with every commit instead of repeating the same mistakes at machine speed."
      },
      {
        "type": "p",
        "text": "The trap is assuming more context is better. [Anthropic's engineers describe context](https://anthropic.com/engineering/effective-context-engineering-for-ai-agents) as a finite attention budget and argue for the smallest possible set of high-signal tokens. That matches what I see in practice. An agent fed a thousand stale wiki pages does worse than one fed twenty current, owned ones. Compounded learning needs pruning and ownership as much as capture. Context has a half-life, and someone has to be accountable for it."
      },
      {
        "type": "h2",
        "text": "Architecture that agents can execute"
      },
      {
        "type": "p",
        "text": "Stale diagrams on a wiki are finished as a control. Architecture defined as code, machine-readable, version-controlled and testable, can be checked by an agent before a human ever opens the pull request. I built a small public [Architecture-as-Code prototype](https://aac.muthub.org) to test this idea, and the most useful thing it showed me was that a decision only becomes enforceable once it carries its rationale with it. The *what* of implementation finally links to the *why* of business intent."
      },
      {
        "type": "p",
        "text": "This is also how the inner and outer loops start to merge. When an agent can pull production signals, architecture rules and past incident lessons into the editor, defects get caught while the developer is still in context. We stop shifting left in stages and start collapsing feedback from days to minutes."
      },
      {
        "type": "h2",
        "text": "Verification becomes the senior job"
      },
      {
        "type": "p",
        "text": "As the cost of generating code approaches zero, verification becomes the most expensive resource in the lifecycle. Senior engineers move from builder to auditor: confirming that the flood of agent-written changes matches business intent, security standards and the architecture the firm actually approved."
      },
      {
        "type": "p",
        "text": "Here is where I disagree with a common assumption. Many leaders plan AI capacity by counting generation: seats, tokens, agents. The binding constraint is review capacity, and it does not scale with licenses. If agents triple the number of pull requests and your review practice stays the same, you have not tripled throughput. You have built a queue, or worse, a rubber stamp. Plan verification the way you plan production capacity, with automated tests, policy checks and evidence capture first, and human judgment reserved for the decisions that need it."
      },
      {
        "type": "p",
        "text": "The decision rule I use for how closely a human must look comes down to two questions: how far can this change reach, and how quickly can we undo it? A test fixture or an internal report query is narrow and reversible, so automated checks and a light human pass are enough. A change to an entitlement rule, a payment path or a shared library is wide and hard to unwind, so it gets a named senior reviewer no matter who or what wrote it."
      },
      {
        "type": "p",
        "text": "Notice that the author does not appear in that rule. Treating agent code as uniquely suspect wastes review time on trivial changes. Treating it like a trusted colleague's work lets wide changes through on reputation that the agent never earned."
      },
      {
        "type": "p",
        "text": "Rubber-stamping deserves its own warning. When one reviewer approves forty agent pull requests in an afternoon, the approval record looks perfect and means very little. I would rather see fewer approvals with comments that show real reasoning. Sample a handful each month and ask the reviewer to walk a peer through one of them. You find out quickly whether your maker/checker control still works."
      },
      {
        "type": "quote",
        "text": "Code fast, verify hard, and keep the humans in the loop."
      },
      {
        "type": "h2",
        "text": "Measure flow and trust, not output"
      },
      {
        "type": "p",
        "text": "Velocity metrics are table stakes but incomplete. DORA's four keys remain essential for stability, and I would watch change failure rate more closely than ever, since that is where AI risk shows up first. Developer experience measures such as SPACE and simple satisfaction scores matter more, not less, because automated output can hide a team that is worn out from reviewing machine work."
      },
      {
        "type": "p",
        "text": "I would add two measures most dashboards lack: how long it takes to verify a change, and how often accepted AI changes are reworked within a month. Both tell you whether the speed is real or borrowed."
      },
      {
        "type": "h2",
        "text": "The foundation is trusted knowledge"
      },
      {
        "type": "p",
        "text": "The quality of an AI-native lifecycle will not be decided by how well an agent writes code. It will be decided by the chain around the code: intent, requirements, design, plan, code, tests, approvals and production learnings, versioned and traceable so people and agents work from the same context. DORA's 2025 AI capabilities model points the same way, naming healthy data ecosystems, AI-accessible internal data and strong version control among the practices that magnify AI's benefit."
      },
      {
        "type": "monday",
        "items": [
          "Ask each delivery lead to state, in one sentence, where their team's AI-saved hours went last quarter, then compare the answers side by side.",
          "Add time-to-verify and 30-day rework rate for accepted AI changes to your engineering dashboard, next to change failure rate.",
          "Sample ten recently approved agent pull requests and have each reviewer explain the change to a peer.",
          "Pick the most used context source your agents read and assign it a named **owner** and a review date."
        ]
      },
      {
        "type": "p",
        "text": "That raises the harder question. When the knowledge guiding an agent is outdated, conflicting or unowned, AI helps us make the wrong decision faster. Enterprise scale needs current engineering knowledge with clear owners, policies agents can read and apply, guardrails that cannot be bypassed, evidence captured at each important step, and people accountable for judgment and risk. That is a platform investment, not a tooling purchase. If you audited the context your agents used last week, how much of it would have a named owner?"
      },
      {
        "type": "bottomLine",
        "text": "Code fast, verify hard, and keep the humans in the loop. The real investment is trusted knowledge and controls that live inside the engineering flow, not an approval step bolted on at the end."
      }
    ]
  },
  {
    "slug": "model-is-a-tool-harness-is-the-strategy",
    "title": "Model is a tool, harness is the strategy",
    "summary": "Handing an AI agent a production codebase without a harness is like putting a teenager in a sports car with no dual brakes. Deterministic guardrails and sensors, owned as a platform, are what make agents safe to scale.",
    "theme": "governed-ai",
    "status": "published",
    "published": "2026-05-26",
    "plannedFor": "Dec 2026",
    "source": "Adapted from my LinkedIn post of May 23, 2026.",
    "related": [
      "architecture-that-runs",
      "if-you-cant-prove-why-an-ai-wrote-it"
    ],
    "body": [
      {
        "type": "p",
        "text": "**The best time to stop a bad commit is before it is written, not after it is deployed.** That one idea is the whole case for harness engineering, and it is why I think most enterprise AI programs are spending their attention in the wrong place."
      },
      {
        "type": "p",
        "text": "Enterprise teams are handing AI agents the keys to production codebases. It is the equivalent of putting a teenager in a high-performance sports car with no dual brakes and no driving instructor. The car is impressive. The outcome depends almost entirely on what surrounds it."
      },
      {
        "type": "p",
        "text": "To scale agentic AI safely in the software lifecycle, we need to shift attention from model selection to the harness: the context, constraints and checks that surround the model. A good harness does more than monitor an agent. It governs it, with two mechanisms that should be deterministic wherever possible."
      },
      {
        "type": "h2",
        "text": "The industry is converging on the same vocabulary"
      },
      {
        "type": "p",
        "text": "This is no longer a niche view. Birgitta Böckeler at Thoughtworks wrote in February 2026 that a harness is the [\"tooling and practices\" that keep AI agents in check](https://www.martinfowler.com/articles/exploring-gen-ai/harness-engineering-memo.html), and she frames its elements as *guides* and *sensors*, each either computational or inferential. That maps closely to how I have been describing it: guardrails that shape what the agent does, and sensors that catch what it got wrong."
      },
      {
        "type": "p",
        "text": "Anthropic's engineering team arrived at similar conclusions from the builder's side. In their write-up on [harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents), the agent works on one feature at a time against a JSON feature list where every item starts as failing, and the prompt states, \"It is unacceptable to remove or edit tests.\" They also report that the model often marked features complete without verifying them end to end. Read that twice. The model was capable. Without a sensor, it was also overconfident."
      },
      {
        "type": "figure",
        "name": "agent-harness"
      },
      {
        "type": "h2",
        "text": "Guardrails: the lanes on the road"
      },
      {
        "type": "p",
        "text": "Before an agent writes a single line, the harness constrains it. It decides which tools the agent can call, which data it can see, which patterns it must follow and which standards apply. With Architecture-as-Code, those constraints come from a machine-readable source rather than a wiki page the agent never reads."
      },
      {
        "type": "p",
        "text": "The OWASP guidance on [excessive agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/) is the best checklist I know for this layer. It traces the risk to three root causes (excessive functionality, excessive permissions and excessive autonomy) and recommends enforcing authorization in downstream systems \"rather than relying on an LLM to decide\" whether an action is allowed. That last point is the one teams skip. A prompt that says \"never touch production data\" is a request. A credential that cannot reach production data is a guardrail."
      },
      {
        "type": "h2",
        "text": "Sensors: the automated brakes"
      },
      {
        "type": "p",
        "text": "When an agent does make a mistake, sensors react immediately. Linters, type checkers, schema validators, policy checks and tests catch the error, reject the change and hand the failure back so the agent can correct itself. Human engineers should not spend their attention debugging an agent's basic failures."
      },
      {
        "type": "p",
        "text": "Here is where I part ways with some of the current enthusiasm. It is tempting to use a second model as the sensor for the first: an LLM reviewer judging LLM output. That has a place for questions of style and design intent. For anything with a right answer (does this call an unapproved service, does this table hold customer data, does this test still pass) use a deterministic check. An inferential sensor that is right most of the time is a second source of error when it matters. Anthropic's own [guide to building agents](https://www.anthropic.com/engineering/building-effective-agents) warns that autonomy brings \"the potential for compounding errors\" and recommends sandboxed testing with appropriate guardrails. Stacking probabilistic judges does not remove that risk. Deterministic sensors bound it."
      },
      {
        "type": "quote",
        "text": "Model is a tool. Harness is the strategy."
      },
      {
        "type": "h2",
        "text": "Why the model is the least durable part"
      },
      {
        "type": "p",
        "text": "Models change every few months, and the right model for a task today will not be the right one next year. The context you give agents, the policies they must satisfy and the checks they must pass are what stay. Separate what the model infers from what the system actually permits, and a model upgrade never breaks your controls."
      },
      {
        "type": "p",
        "text": "This has a budget implication many leaders miss. Money spent on a model evaluation depreciates on the vendor's release cycle. Money spent on the harness compounds: every new standard, test and policy improves every agent and every future model. When I review an AI program, I ask what share of the effort goes into the harness versus model selection and prompt tuning. In the programs that struggle, the harness share is usually small."
      },
      {
        "type": "h2",
        "text": "How harnesses fail"
      },
      {
        "type": "p",
        "text": "Harnesses fail in predictable ways, and almost none of them involve the model getting dumber. The first is the agent that can edit its own sensors. If an agent can modify the test, loosen the lint rule or add an ignore comment, a determined optimizer will eventually do exactly that to make the build go green. That is why the instruction in Anthropic's harness about never removing or editing tests matters so much, and why I would not rely on the instruction alone. Sensor configuration should sit outside the agent's write permissions, and any change to it should need a human approval."
      },
      {
        "type": "p",
        "text": "The second is the flaky sensor. A check that fails randomly teaches agents and engineers the same lesson: retry until it passes. Within weeks nobody treats a failure as information. One flaky check can do more damage to a harness than a missing one, so I quarantine unreliable checks quickly rather than leave them running."
      },
      {
        "type": "p",
        "text": "The third is the harness that is too tight. When every change trips a dozen rules, developers stop using the agent or quietly turn the harness off for their repository. The fix is to measure both directions: how often sensors catch real problems, and how often they block work that was fine."
      },
      {
        "type": "h2",
        "text": "Who owns the harness"
      },
      {
        "type": "p",
        "text": "In large regulated enterprises, the instinct is to let each team configure its own agent. That produces hundreds of slightly different harnesses, each with its own gaps. Böckeler's memo points at a better model, harness templates that share common guides and sensors across an organization. I would go further and treat the harness as a platform product, with an owner, a backlog, tests of its own and a release process."
      },
      {
        "type": "p",
        "text": "The platform team owns the shared guardrails and sensors. Product teams add local rules on top and can tighten them but not loosen them. Risk and architecture define the policies as code. Everyone gets the same baseline, and an auditor can inspect one harness instead of hundreds."
      },
      {
        "type": "p",
        "text": "The most useful early metric is the sensor rejection rate by rule. When one rule rejects agent output constantly, either the agent lacks context about that standard or the standard is unclear. Both are fixable, and both are invisible if you only measure how much code the agents produce."
      },
      {
        "type": "h2",
        "text": "Building the track first"
      },
      {
        "type": "p",
        "text": "A practical order of work: first restrict what agents can reach, then give them the approved patterns and standards as context, then add deterministic checks to the pipeline, and only then widen their autonomy. Each step earns the right to the next. Teams that start with autonomy and add controls later spend months cleaning up what the agent already merged."
      },
      {
        "type": "monday",
        "items": [
          "Inventory the tools, credentials and data every coding agent in your organization can reach today, and remove anything that exceeds its current task.",
          "Move test files, lint configuration and policy rules outside agent write permissions so any change to a sensor requires human approval.",
          "Start reporting sensor rejection rate by rule for agent-generated changes, and review the top three offending rules with their owners.",
          "Assign a single platform owner for shared agent guardrails and sensors, with a backlog that product teams can submit rules to."
        ]
      },
      {
        "type": "p",
        "text": "Code fast, verify hard, and keep the humans in the loop. Where in your delivery pipeline would a deterministic sensor have caught the last serious mistake an agent made?"
      },
      {
        "type": "bottomLine",
        "text": "Most teams are racing to deploy agents. The teams that win are building the track first: guardrails from machine-readable standards, deterministic sensors in the pipeline, and a harness owned as a platform that outlives any single model."
      }
    ]
  },
  {
    "slug": "if-you-cant-prove-why-an-ai-wrote-it",
    "title": "If you can't prove why an AI wrote it, you can't ship it",
    "summary": "Shipping AI-generated code without recording where it came from is unmanaged risk. Regulated teams need deterministic provenance for non-deterministic models: line-level attribution, Git-native session history and AI bills of materials.",
    "theme": "governed-ai",
    "status": "published",
    "published": "2026-02-24",
    "plannedFor": "Dec 2026",
    "source": "Adapted from my LinkedIn post of February 21, 2026.",
    "related": [
      "model-is-a-tool-harness-is-the-strategy",
      "adopting-mcp-in-a-bank"
    ],
    "body": [
      {
        "type": "p",
        "text": "**If you cannot prove why an AI wrote a function, you cannot safely deploy it.** Shipping AI-generated code without tracking its origin and reasoning looks like velocity. In a regulated environment it is unmanaged risk with a delayed invoice."
      },
      {
        "type": "p",
        "text": "When a remote agent introduces a vulnerability, the first question from risk and audit will be simple: which model produced this, from what instruction, and who approved it? Most teams today cannot answer. We need **deterministic provenance** for non-deterministic models, and it is time to extend the software bill of materials into an **AI bill of materials**."
      },
      {
        "type": "h2",
        "text": "Provenance is an old idea with a new gap"
      },
      {
        "type": "p",
        "text": "The software supply chain community already solved part of this. SLSA defines provenance as [\"the verifiable information about software artifacts describing where, when and how something was produced.\"](https://slsa.dev/spec/v1.0/provenance) Build systems can now attest to what they built. That covers the pipeline from source to artifact."
      },
      {
        "type": "p",
        "text": "The gap is upstream of the source. `git blame` tells you which account committed a line. It does not tell you whether a person wrote it, an agent wrote it, or a person accepted an agent's suggestion after a quick look. When the author field is a developer and the actual author is a model, your audit trail is accurate and misleading at the same time."
      },
      {
        "type": "h2",
        "text": "The problem with autonomous agents"
      },
      {
        "type": "p",
        "text": "Remote and multi-agent platforms work asynchronously. They read codebases, run terminal commands and commit changes with little oversight. If an agent hallucinates a dependency or corrupts a configuration file mid-task, an ordinary rollback is not enough. You have to revert both the code and the agent's working context, or it repeats the same mistake from the same bad assumptions."
      },
      {
        "type": "p",
        "text": "There is also a timing problem that I think gets too little attention. Provenance has to be captured when the code is created. It cannot be reconstructed afterwards. Prompts, intermediate reasoning and tool calls are ephemeral by default. If the record was not written at the moment of generation, no forensic effort will recover it six months later when an examiner asks."
      },
      {
        "type": "h2",
        "text": "Three patterns for code provenance"
      },
      {
        "type": "ol",
        "items": [
          "**Attribution mapping.** A vendor-neutral record maps specific line ranges to the model and conversation that produced them, creating an audit trail for debugging after deployment.",
          "**Git-native session state.** The AI session itself becomes version-controlled metadata: prompts, reasoning and token usage stored alongside the code, so both the code and the agent's context can be recovered.",
          "**Centralized telemetry and governance.** Platform audit logs and code referencing satisfy baseline governance, but abstract step-by-step reasoning away from the version-control history."
        ]
      },
      {
        "type": "p",
        "text": "The first pattern now has a concrete form. [Agent Trace](https://agent-trace.dev/) is an open specification started by Cursor and published as a version 0.1.0 RFC in January 2026. It records file paths, line ranges, a model identifier, a link to the producing conversation and a contributor type of human, AI, mixed or unknown, and its schema covers Git, Mercurial and Jujutsu. It is a request for comments, not a settled standard, but it is the first vendor-neutral format I have seen that asks the right questions. The second pattern has tools too. Earlier this month Entire [released its open-source CLI](https://entire.io/blog/hello-entire-world), which hooks into Git to capture agent sessions as checkpoints on a separate branch and lets you rewind to a known-good state."
      },
      {
        "type": "p",
        "text": "These patterns are complementary, not competing. Attribution answers \"what did the AI touch?\" Session state answers \"why did it do that?\" Central telemetry answers \"is this happening across the enterprise, and is it within policy?\" A regulated team needs all three answers, at different levels of detail for different audiences."
      },
      {
        "type": "h2",
        "text": "What I found testing it"
      },
      {
        "type": "p",
        "text": "I evaluated a Git-native checkpointing tool locally with Claude Code, using an auto-commit strategy. It created a checkpoint after every agent response, capturing system state and reasoning without manual effort. When the agent drifted and corrupted a file, one rewind command restored both the codebase and the agent's memory to the last known-good state."
      },
      {
        "type": "p",
        "text": "The experience changed how I think about rollback. Reverting code is a solved problem. Reverting *intent* is not, and that is what actually stops an agent from making the same mistake twice. It also raised a trade-off I had not anticipated: session history contains whatever the developer typed, which can include customer details, credentials pasted by mistake or internal design notes. Capturing everything creates a new store of sensitive data. Provenance records need the same classification, retention and access controls as the code they describe, and possibly stricter ones."
      },
      {
        "type": "h2",
        "text": "From SBOM to AI-BOM"
      },
      {
        "type": "p",
        "text": "Line-level attribution covers the code. The models and data behind your AI systems need their own inventory. CycloneDX's [ML-BOM](https://cyclonedx.org/capabilities/mlbom/) extends the bill of materials to represent models, datasets and their dependencies, including dataset provenance and training configuration. Pair that with code attribution and you can answer the question regulators will ask with increasing frequency: which model versions touched which production systems?"
      },
      {
        "type": "p",
        "text": "The [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) gives the governance frame, organized around Govern, Map, Measure and Manage, with a generative AI profile published in July 2024. None of it works without records. You cannot measure or manage what you never captured."
      },
      {
        "type": "h2",
        "text": "A decision rule for depth"
      },
      {
        "type": "p",
        "text": "Not every line needs the same treatment. My rule of thumb is that provenance depth should scale with blast radius. Internal tooling can live with attribution and central logs. Code that moves money, touches customer data or enforces a control should carry full session history and named human approval, retained for as long as the code runs. The goal is a proportionate record, set in policy, not maximum logging everywhere."
      },
      {
        "type": "p",
        "text": "Starting is less work than it sounds. Pick an attribution format, preferably an open one, and require it from the coding tools you buy. Decide where session history lives and who can read it. Then add one pipeline check that refuses a merge into a high-risk repository when the provenance record is missing. That last step matters most. Provenance that is optional decays the same way architecture documents do: everyone agrees it is valuable, and nobody keeps it current."
      },
      {
        "type": "p",
        "text": "So I will ask the question I put to my own teams: if an examiner pointed at one AI-written function in production tomorrow, how long would it take you to show who prompted it, which model wrote it and who approved it?"
      },
      {
        "type": "bottomLine",
        "text": "Provenance is not paperwork. It is what lets a regulated team say yes to agents: every change traceable to its intent, its model and the person who approved it, captured at creation and governed like the code itself."
      }
    ]
  },
  {
    "slug": "spec-driven-development-for-regulated-industries",
    "title": "Spec-driven development for regulated industries: audit the contract, not every line",
    "summary": "For complex work in regulated sectors, prompt-to-code cannot pass an audit. Making the specification the contract an AI must fulfil can, provided the spec stays anchored to the code and machines check conformance.",
    "theme": "ai-native-sdlc",
    "status": "published",
    "published": "2025-10-21",
    "plannedFor": "Dec 2026",
    "source": "Adapted from my LinkedIn post of October 18, 2025.",
    "related": [
      "architecture-that-runs",
      "the-ai-native-sdlc"
    ],
    "body": [
      {
        "type": "p",
        "text": "**For complex work in regulated industries, prompt-to-code is a non-starter, and the specification has to become the contract the AI must fulfil.** Tools built around this idea have appeared quickly over the past few months, and the enthusiasm is running ahead of the evidence. The risk, unpredictability and lack of verifiability of free-form prompting are not acceptable when an examiner can ask why a system behaves the way it does."
      },
      {
        "type": "p",
        "text": "Spec-driven development is the responsible path. The engineer's job shifts from writing boilerplate to designing precise, machine-readable specifications, and the spec becomes the single source of truth. But the idea has been oversold in places, and the regulated version of it looks different from the startup version."
      },
      {
        "type": "h2",
        "text": "Why prompt-to-code fails the audit test"
      },
      {
        "type": "p",
        "text": "A prompt is a conversation. It is not versioned with intent, it is rarely reviewed, and the same prompt can produce different code tomorrow. When something goes wrong in production, the trail from business requirement to running code passes through a chat window nobody kept."
      },
      {
        "type": "p",
        "text": "In the large banks I have worked in, the questions after an incident are always the same. What was this supposed to do? Who approved that? What evidence shows it does what was approved? Prompt-to-code has no good answer to any of them. A spec does, if it is written and governed properly."
      },
      {
        "type": "p",
        "text": "There is a quieter problem too. Prompts encode decisions that nobody reviewed as decisions. A developer who types \"store the customer details\" has made a data-retention choice without realizing it. A spec forces those choices into the open, where a privacy or security partner can see and challenge them."
      },
      {
        "type": "figure",
        "name": "spec-driven"
      },
      {
        "type": "h2",
        "text": "What changes in the lifecycle"
      },
      {
        "type": "ul",
        "items": [
          "**Design first.** We define the *what* in a formal spec: decomposed requirements, OpenAPI contracts for APIs, schemas for data, types for functions, and the security and data-handling rules that apply. Precise inputs and outputs constrain the AI to a narrow, testable task.",
          "**AI implements.** Agents write the *how*: implementation code that must conform to the spec.",
          "**Humans validate.** Effort moves to validating the spec and the AI's adherence to it, rather than to typing the code."
        ]
      },
      {
        "type": "p",
        "text": "[GitHub's Spec Kit](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit) captures this flow well, with specify, plan and tasks phases and a human checkpoint after each. Its pitch to enterprises is that security and compliance requirements get written into the spec and plan from day one rather than arriving as review comments at the end. I agree with that direction. The toolkit does not enforce those constraints for you, though. It relies on the agent reading them and a human checking the result."
      },
      {
        "type": "h2",
        "text": "The honest critique"
      },
      {
        "type": "p",
        "text": "The most useful analysis I have read is [Birgitta Böckeler's review of Kiro, Spec Kit and Tessl](https://www.martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html) on martinfowler.com. She separates three levels: *spec-first*, where a spec guides one task; *spec-anchored*, where the spec is kept and evolved with the feature; and *spec-as-source*, where humans edit only the spec and never the code."
      },
      {
        "type": "p",
        "text": "Her concerns deserve attention from anyone presenting this to a risk committee. A small bug ballooned into four user stories with 16 acceptance criteria. Spec Kit generated so many verbose markdown files that she wrote she would rather review code. Agents sometimes ignored the spec anyway. Regenerating from the same spec produced different code. And she draws the parallel to model-driven development, which struggled in business applications, warning that we could end up with inflexibility and non-determinism together."
      },
      {
        "type": "p",
        "text": "There is a deeper risk underneath her critique. Rich Sutton's [bitter lesson](https://www.incompleteideas.net/IncIdeas/BitterLesson.html) is that general methods which scale with computation beat handcrafted knowledge \"by a large margin.\" Elaborate, opinionated workflows and lengthy spec files that are hard to review are handcrafted rules for AI, and some of today's spec ceremony may age badly as models improve."
      },
      {
        "type": "h2",
        "text": "Spec-anchored, not spec-as-source"
      },
      {
        "type": "p",
        "text": "My position for regulated firms is specific. Aim for spec-anchored and treat spec-as-source as a research bet, not a control strategy. If the same spec yields different code on each run, the spec alone cannot be your evidence of behavior. The tested, reviewed code that actually ships is still what the regulator cares about."
      },
      {
        "type": "p",
        "text": "Second, keep the prose small and the formal parts large. Most of the value comes from artifacts machines can check: API contracts, schemas, type signatures, data classification tags, entitlement rules. A thousand words of natural-language requirements is just a longer prompt. The test I use is blunt. If a line in the spec cannot fail a build, it is guidance, not a contract. A fragment like this is more useful to an auditor than pages of user stories, because every line points at something that can pass or fail:"
      },
      {
        "type": "code",
        "lang": "yaml",
        "text": "feature: payment-status-api\ncontract: openapi/payment-status.v3.yaml\nrisk_tier: high\ndata:\n  classification: confidential\n  pii_fields: [account_number]\n  logging: masked\ncontrols:\n  - id: entitlement-check\n    test: tests/authz/test_entitlements.py\n  - id: no-pii-in-logs\n    test: policy/log_masking.rego"
      },
      {
        "type": "p",
        "text": "Third, match ceremony to risk. A copy change on an internal tool does not need a constitution and sixteen acceptance criteria. A change to how customer data is classified does. Tiering the process by risk is how you avoid the overhead Böckeler describes while keeping rigor where examiners will look. In practice, the first spec a team writes for a regulated service takes longer than the code would have. The fifth is faster, because the shared parts (data classes, entitlement patterns, logging rules) become reusable modules that every new spec imports."
      },
      {
        "type": "h2",
        "text": "Why spec programs decay"
      },
      {
        "type": "p",
        "text": "The failure I see most often is not a bad first spec. It is drift. An incident at two in the morning gets fixed in the code, the fix is correct, and nobody updates the spec. Three months later the spec describes a system that no longer exists, and the audit trail it was meant to provide points confidently at the wrong behavior. A drifted spec is worse than none, because people trust it."
      },
      {
        "type": "p",
        "text": "Two rules prevent most of this. First, any change to a spec-anchored service that does not reference a spec version fails the pipeline. Emergency fixes are included; they get a short window to amend the spec, not an exemption. Second, each spec has a named owner on the business side as well as in engineering. Engineers can keep contract files accurate, but only someone accountable for the business outcome can say whether a requirement is still the requirement."
      },
      {
        "type": "p",
        "text": "The other quiet failure is the spec written after the code to satisfy a process. It is easy to spot: the spec matches the implementation perfectly, accidents included. A spec that never disagreed with the code was never doing any work. When I review a program, I ask to see one spec change that caused code to be rejected. If nobody can show me one, the process is documentation, not control."
      },
      {
        "type": "h2",
        "text": "Make conformance mechanical"
      },
      {
        "type": "p",
        "text": "The business case is simple to state. Velocity, because low-level repetitive coding is automated. Predictability, because a formal contract sharply reduces ambiguity and hallucination. Auditability, because the spec becomes the primary artifact for compliance and security review, and it is far more efficient to audit a spec than thousands of lines of generated code."
      },
      {
        "type": "p",
        "text": "There is a condition attached, and it is the point I most want leaders to take away. Auditing the spec instead of the code is only legitimate when conformance between them is checked by machines: contract tests generated from the OpenAPI file, schema validation in the pipeline, policy-as-code for data handling, all tied to the spec version. Without that link you have not reduced the audit burden. You have moved the gap from the code to the space between the spec and the code, where nobody is looking. [DORA's 2025 research](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report) adds a practical warning: AI raises change volume, and without strong testing, version control and fast feedback, that volume turns into instability."
      },
      {
        "type": "monday",
        "items": [
          "Choose one high-risk service and mark which lines of its current specification could fail a build today.",
          "Add a pipeline check that rejects changes to spec-anchored services when the commit does not reference a spec version.",
          "Name a business owner alongside the engineering owner for each spec on your most examined system.",
          "Define three risk tiers for spec ceremony and publish which kinds of change fall into each."
        ]
      },
      {
        "type": "p",
        "text": "Done this way, spec-driven development turns generative AI from a helpful but unreliable assistant into a disciplined engineering tool that a risk partner can reason about. Done carelessly, it produces piles of markdown that look like governance and are not. Which parts of your current specifications could fail a build today?"
      },
      {
        "type": "bottomLine",
        "text": "Make the spec the contract, keep it anchored to the code, and let machines prove conformance. That is the balance regulated industries need between innovation and control."
      }
    ]
  },
  {
    "slug": "capture-the-why",
    "title": "Capture the why: the knowledge layer enterprise agents are missing",
    "summary": "Most enterprise AI pilots hit the same wall: systems record what happened, but the reasoning behind decisions evaporates. Durable, governed context about the why is the real foundation for useful agents.",
    "theme": "data-ai-platforms",
    "status": "published",
    "published": "2026-07-14",
    "plannedFor": "Jan 2027",
    "source": "Adapted from my LinkedIn writing on living documentation and the enterprise knowledge layer.",
    "related": [
      "the-ai-native-sdlc",
      "agent-first-data-architecture"
    ],
    "body": [
      {
        "type": "p",
        "text": "**The bottleneck in enterprise AI is rarely the model; it is that the organization never recorded why it does what it does.** Better models keep arriving every few months. The missing knowledge layer underneath them does not fix itself."
      },
      {
        "type": "h2",
        "text": "Enterprise amnesia"
      },
      {
        "type": "p",
        "text": "Most enterprise AI pilots hit the same wall, and I have started calling it enterprise amnesia. An agent retrieves a little context, calls a tool and takes an action. Then the session closes. The context evaporates, the reasoning disappears, and the next agent starts from scratch, as if the organization had never faced that question before."
      },
      {
        "type": "p",
        "text": "People suffer from the same thing, only more slowly. Michael Nygard put it well back in 2011 when he proposed [architecture decision records](https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions): one of the hardest things to track over the life of a project is the motivation behind decisions. Without it, a newcomer can either accept a decision blindly or reverse it blindly, and both can do damage. An agent is a permanent newcomer. It arrives fresh in every session."
      },
      {
        "type": "h2",
        "text": "Systems of record keep the what"
      },
      {
        "type": "p",
        "text": "Traditional systems track the *what*: files, tickets, code diffs, transactions. The *why* (the intent, the policies evaluated, the alternatives ruled out, the exception someone approved) mostly lives in meetings, chat threads and people's heads. Reading the code tells you what happens. It rarely tells you why it has to happen that way, or what breaks if you change it."
      },
      {
        "type": "p",
        "text": "Foundation Capital gave this gap a useful name. In their essay on [context graphs](https://foundationcapital.com/context-graphs-ais-trillion-dollar-opportunity/), Jaya Gupta and Ashu Garg describe decision traces (the policy applied, the exception granted, the precedent relied on) and a context graph as a living record of decision traces stitched across entities and time so precedent becomes searchable. They also argue that data warehouses receive data after decisions are made, so they sit in the read path rather than the write path. I agree with that point more than with any market sizing. If you want the why, you have to capture it where the decision happens."
      },
      {
        "type": "p",
        "text": "One clarification matters here, and the Foundation Capital authors make it too: a context graph is not the model's reasoning. Logging an agent's chain of thought is useful for debugging, but it records what one model said to itself in one session. The why an enterprise needs is institutional: which policy applied, who approved the exception, what precedent it followed, and what changed as a result. Those facts should be true no matter which model read them."
      },
      {
        "type": "h2",
        "text": "Context engineering needs something to engineer"
      },
      {
        "type": "p",
        "text": "Context engineering has become a standard term, for good reason. Anthropic's engineering team defines it as [curating and maintaining the optimal set of tokens during inference](https://anthropic.com/engineering/effective-context-engineering-for-ai-agents), and argues for finding the smallest possible set of high-signal tokens for a task. They also describe agents writing structured notes to memory outside the context window so they can pick up long tasks later."
      },
      {
        "type": "p",
        "text": "Here is the point I think gets missed. Context engineering is a retrieval and selection discipline. It can choose the best available context, but it cannot invent context the organization never captured. If the reason a control exists was never written down, no prompt, retriever or memory scheme will surface it. The enterprise knowledge layer is the supply side of context engineering, and most companies are trying to optimize demand without any supply."
      },
      {
        "type": "h2",
        "text": "A living document that lies is worse than none"
      },
      {
        "type": "p",
        "text": "Tools that regenerate documentation from code on every commit are improving quickly, and I use them. They are still far from fully accurate, and they share a blind spot: generated from code, they describe what the code does, which is the part we already had. The why has to come from people or from capture at decision time."
      },
      {
        "type": "p",
        "text": "A wrong living document is more dangerous than no documentation, because agents and people both treat it as a source of truth. So every piece of knowledge in the layer needs trust signals: where it came from, when it was last confirmed, who reviewed it, and whether it was written by a person or inferred by a model. Without those signals, you are scaling confident errors."
      },
      {
        "type": "h2",
        "text": "Design choices that make knowledge durable"
      },
      {
        "type": "ul",
        "items": [
          "**Decisions as first-class objects.** Store each decision with its evidence, the rules applied and the outcome, so decisions compound into queryable institutional memory instead of vanishing into logs.",
          "**Capture in flight, not after the fact.** An explanation written afterwards can sound plausible and still be wrong. Accountability means recording the state, inputs and policy checks while the decision is being made.",
          "**Deterministic policy gates.** Let models handle messy language, but enforce critical rules deterministically, and keep what the model inferred separate from what the system permitted.",
          "**Separate reasoning from durable truth.** Models change faster than enterprise architecture. Entities, relationships and decision histories should outlive any model, so an upgrade never breaks what the organization knows."
        ]
      },
      {
        "type": "p",
        "text": "The last one is the choice I see teams regret skipping. When knowledge lives inside a particular model's fine-tuning or a particular vendor's memory feature, each model change becomes a knowledge migration. Keep the durable layer boring, open and owned by the enterprise."
      },
      {
        "type": "h2",
        "text": "A decision trace, worked through"
      },
      {
        "type": "p",
        "text": "Take an architecture waiver, the kind every large technology organization grants every week. A team wants to run a service on a database pattern the standards do not allow, because a deadline is close and the approved option is not ready. A review board says yes, for twelve months, with conditions."
      },
      {
        "type": "p",
        "text": "What usually survives is a ticket marked approved. What should survive is small and specific: the standard being waived and its version, the reason given, the alternatives considered and why they were rejected, the conditions attached, the named approver, the expiry date and the systems affected. That is perhaps ten fields and a paragraph. It takes the requester a few minutes if the review tool asks at the moment of approval, and it is close to impossible to reconstruct a year later."
      },
      {
        "type": "p",
        "text": "Now consider who reads it. Eleven months on, an agent preparing a change to that service can see that the waiver is about to expire and that one of its conditions was never met. A new architect asking why the service looks different from its peers gets the answer in one lookup. An auditor sampling exceptions finds the evidence attached to the decision instead of scattered across email. One record serves three readers, which is why I think decision capture pays for itself faster than most documentation efforts."
      },
      {
        "type": "h2",
        "text": "Where to start"
      },
      {
        "type": "p",
        "text": "Do not start with a company-wide knowledge program. Pick one decision flow that is high-stakes, exception-heavy and repeated often, such as a credit exception or an architecture waiver. Capture decision traces in the workflow itself, link them to the policies and evidence involved, and then measure one thing: can the next person or agent facing a similar case find the precedent and understand it?"
      },
      {
        "type": "p",
        "text": "In large regulated organizations I have worked in, the people who carry the why are usually a handful of senior engineers and risk partners whose calendars are already full. A knowledge layer that captures their reasoning as a by-product of the work, rather than as extra documentation, is the only version I have seen survive."
      },
      {
        "type": "monday",
        "items": [
          "Pick one exception-heavy decision flow, such as architecture waivers, and list the fields a reviewer would need to understand it a year later.",
          "Add required rationale, approver and expiry fields to that flow's approval form so the why is recorded when the decision is made.",
          "Ask an agent to explain three past exceptions using only recorded material, and note what it could not find.",
          "Label every generated document in one repository with whether a person or a model wrote it and when it was last confirmed."
        ]
      },
      {
        "type": "p",
        "text": "Every enterprise has decisions it keeps relitigating because nobody can find the reasoning from last time. Which decision in your organization would you capture first if you could?"
      },
      {
        "type": "bottomLine",
        "text": "If your agent cannot produce the evidence, policy version, tool actions and decision context behind a high-stakes action, you do not yet have an auditable agent. The teams that pull ahead will be the ones that build durable institutional memory, whatever model they happen to run."
      }
    ]
  },
  {
    "slug": "adopting-mcp-in-a-bank",
    "title": "Adopting MCP in a bank: the four risks to solve first",
    "summary": "The Model Context Protocol standardizes how agents connect to tools and data. It is silent on whether they should. Four risk areas a regulated institution should resolve before agents get tools.",
    "theme": "governed-ai",
    "status": "published",
    "published": "2025-04-22",
    "plannedFor": "Jan 2027",
    "source": "Adapted from my LinkedIn post of April 18, 2025.",
    "related": [
      "if-you-cant-prove-why-an-ai-wrote-it",
      "model-is-a-tool-harness-is-the-strategy"
    ],
    "body": [
      {
        "type": "p",
        "text": "**MCP standardizes how an agent connects to a tool; it does nothing to decide whether that agent should be allowed to.** After months of looking at the Model Context Protocol through the eyes of a bank's architecture review, that is the sentence I keep coming back to. The protocol is good. It is also, by design, silent on most of the questions a regulator, an auditor or a model risk officer will ask."
      },
      {
        "type": "p",
        "text": "That silence is not a flaw. A wire protocol should not encode a bank's risk appetite. But it means the work that matters most sits outside the spec, and teams that treat a working MCP connection as a finished integration are measuring the wrong thing. Here are the four areas I would resolve before any agent in a regulated institution gets a tool that can change anything."
      },
      {
        "type": "h2",
        "text": "Security: the attack surface is the tool description"
      },
      {
        "type": "p",
        "text": "Most security reviews start by asking whether the server is patched and authenticated. Those questions matter, but the more interesting risks live where traditional API review never looked. Earlier this month, [Invariant Labs described tool poisoning attacks](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks), in which hidden instructions inside a tool's description steer the model while the user sees only a short, harmless tool name. The same research showed two variants that should worry anyone running a shared environment: a server that changes its tool description after the client approved it (a rug pull), and a malicious server whose description changes how the agent uses a different, trusted server."
      },
      {
        "type": "p",
        "text": "The lesson for a bank is uncomfortable. Text that a model reads behaves like code, even if no engineer would call it that. The current specification says as much: [clients must treat tool annotations as untrusted unless they come from trusted servers](https://modelcontextprotocol.io/specification/2025-03-26/server/tools), and a human should always be able to deny a tool call. Prompt injection sits at the top of the [OWASP Top 10 for LLM Applications 2025](https://genai.owasp.org/llm-top-10/), with excessive agency not far behind. In MCP those two risks meet."
      },
      {
        "type": "p",
        "text": "My working rule is that tool metadata gets the same treatment as code. It is pinned, hashed and diffed on every change, and a changed description goes back through approval. Teams find this tedious until the first time a description changes underneath them."
      },
      {
        "type": "figure",
        "name": "mcp-gateway"
      },
      {
        "type": "h2",
        "text": "Auditability: reconstruct the decision behind the call"
      },
      {
        "type": "p",
        "text": "Supervisors expect lineage, explainability and decisions you can defend after the fact. MCP gives you a clean record of the tool call: which tool, which arguments, what came back. That record is necessary and nowhere near sufficient. When an examiner asks why a customer's limit changed, the agent called update_limit is not an answer."
      },
      {
        "type": "p",
        "text": "What you need is the chain around the call: the user request, the context the model saw, the policy version that permitted the action, the identity the agent acted under, and the human approval if one was required. Most of that lives in the host application, not the protocol. In my experience the teams that get this right design the audit record first and build the agent around it. Teams that bolt logging on later end up with mountains of tool traces and still cannot answer the examiner's question."
      },
      {
        "type": "h2",
        "text": "Privacy and residency: context is a data flow"
      },
      {
        "type": "p",
        "text": "Every time an agent pulls a customer record into its context window, that record has moved. It may have left a region, reached a third-party model provider, or landed in a log nobody classified. Banks already have strong rules for data minimization and purpose limitation. The gap is that agents create new, implicit data flows that existing controls never see."
      },
      {
        "type": "p",
        "text": "The fix is mostly plumbing. Classify each MCP server by the highest sensitivity of data it can return. Filter or tokenize sensitive fields at the server, before they reach the model, instead of trusting a prompt to ignore them. Keep regional deployments of servers that touch regulated data, and record the model endpoint as a processor in your data maps. None of this is new. It has to be applied to a new kind of pipe."
      },
      {
        "type": "h2",
        "text": "Maturity: plan for a protocol that keeps moving"
      },
      {
        "type": "p",
        "text": "The protocol has changed a lot in a short time. The [March 2025 authorization specification](https://modelcontextprotocol.io/specification/2025-03-26/basic/authorization) brings OAuth 2.1 to HTTP transports and requires PKCE for every client. That is progress, but authorization is still optional, local servers read credentials from the environment, and the example flow has each MCP server acting as its own authorization server. A bank already has an identity provider. I would require servers to accept its tokens, scope each token to one server, and never pass a received token through to downstream APIs."
      },
      {
        "type": "p",
        "text": "Registries will help once they exist. The project's published roadmap plans an official MCP Registry for centralized server discovery, designed as an API layer that marketplaces build on. Until then, public directories offer discovery, not assurance, and a bank should not wait. Build an internal catalog: assess each public server once, publish the approved versions internally, block everything else. Legacy integration, performance at enterprise scale and the upkeep of many small servers are still real costs. I budget for them as ongoing platform work, not a one-time project."
      },
      {
        "type": "h2",
        "text": "A worked example: onboarding one server"
      },
      {
        "type": "p",
        "text": "Abstract controls are easier to agree with than to apply, so here is how I would take a single MCP server from request to production. Suppose a team wants an agent to look up a customer's recent transactions to help service staff answer questions."
      },
      {
        "type": "p",
        "text": "First, classify the server by the most sensitive thing it can return, which here is customer financial data. That one decision sets the rest: regional deployment, field-level masking for account numbers, and a model endpoint approved for that data class. Second, scope it to read-only, with a token bound to that server alone and no ability to pass it downstream. Third, pin the tool descriptions, hash them, and register the approved version in the internal catalog so a later change triggers review instead of silently taking effect."
      },
      {
        "type": "p",
        "text": "Fourth, write the audit record before the agent exists: who asked, under which identity, which policy version allowed it, what the model saw and what it returned. Then run it with a person reviewing every response for a defined period. Only when the record can answer a mock examiner's question end to end would I consider a second tool, and a write tool would go through the same steps again with a mandatory human approval in front of it. The pattern is slow for the first server and fast for the tenth, because the controls are reused."
      },
      {
        "type": "h2",
        "text": "Use the risk framework you already have"
      },
      {
        "type": "p",
        "text": "The mistake I see most often is a parallel governance track for agents. Banks already run model risk management, third-party risk management, data governance and change control. MCP adoption should plug into all four. A vendor's MCP server is a third-party component. An agent that makes or influences decisions belongs in the model inventory. A changed tool description is a change, and it goes through change control."
      },
      {
        "type": "p",
        "text": "The [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) and its Generative AI Profile give engineers and risk partners a shared vocabulary built around govern, map, measure and manage. I use it less as a checklist and more as a translation layer, so that both sides mean the same thing when they say a control exists."
      },
      {
        "type": "p",
        "text": "One sequencing rule has served me well. Start with read-only tools on low-sensitivity data, with a human approving every action. Widen scope only when the audit record proves you can reconstruct what happened. Autonomy is earned with evidence, one tool at a time."
      },
      {
        "type": "quote",
        "text": "Architecture is not what you say you'll build; it's what you actually allow into production."
      },
      {
        "type": "monday",
        "items": [
          "Inventory every MCP server already in use across engineering, including local ones in developer tools, and classify each by the most sensitive data it can return.",
          "Require tool descriptions to be pinned, hashed and diffed, and route any changed description back through approval like a code change.",
          "Draft the audit record schema for one agent use case and test whether it can answer a mock examiner's question end to end.",
          "Stand up an internal catalog of approved MCP servers and block agents from connecting to any server that is not listed in it."
        ]
      },
      {
        "type": "p",
        "text": "The security concerns are real, and I think they are solvable with controls banks already know how to run. What I am still testing is where the line should sit between what a person must approve and what an agent may do alone. Where have you drawn that line for MCP tools in your organization, and what evidence moved it?"
      },
      {
        "type": "bottomLine",
        "text": "MCP solves connectivity. Trust is still an architecture problem: identity, policy, audit and a governed server catalog decide whether a bank can use it safely."
      }
    ]
  },
  {
    "slug": "agent-first-data-architecture",
    "title": "Agent-first data architecture: five principles",
    "summary": "Data platforms built for people asking questions will strain when the main consumer is software taking actions. Five principles for designing data platforms where agents are first-class users, and why an open lakehouse helps.",
    "theme": "data-ai-platforms",
    "status": "published",
    "published": "2025-09-30",
    "plannedFor": "Feb 2027",
    "source": "Adapted from my LinkedIn posts of September 2025 and my Medium writing on lakehouse architecture.",
    "related": [
      "capture-the-why",
      "adopting-mcp-in-a-bank"
    ],
    "body": [
      {
        "type": "p",
        "text": "**Data platforms built for people asking questions will strain once the main consumer is software taking actions.** For twenty years we optimized for the analyst with a dashboard: a person who reads a chart, notices that a number looks off, and asks a colleague. An agent does none of that. It reads your metadata literally, queries at machine speed, and acts on what it finds."
      },
      {
        "type": "p",
        "text": "That shift is coming faster than most data roadmaps assume. [Gartner predicts](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027) that by 2028 at least 15% of day-to-day work decisions will be made autonomously through agentic AI, up from zero in 2024. Here are the five principles I use when I look at whether a platform is ready for that consumer."
      },
      {
        "type": "h2",
        "text": "1. Design for the machine consumer first"
      },
      {
        "type": "p",
        "text": "Treat agents as first-class users of the architecture, with interfaces and contracts designed for them rather than bolted onto human dashboards. Zhamak Dehghani's [data mesh principles](https://martinfowler.com/articles/data-mesh-principles.html) already asked us to treat data as a product, with qualities such as discoverability, understandability and trustworthiness. Agents are the most demanding customer that idea has ever had, because they cannot walk over and ask what a column means."
      },
      {
        "type": "p",
        "text": "The practical consequence surprises people. A vague column description used to be a minor annoyance. For an agent it is a bug, because the model will confidently fill the gap with a guess. Metadata quality moves from documentation hygiene to production correctness."
      },
      {
        "type": "p",
        "text": "This is why I push for data contracts on any dataset an agent can reach: a published schema, an owner, freshness expectations and a description written for a reader who has no tribal knowledge. If a contract breaks, the agent should get an explicit error rather than silently stale data."
      },
      {
        "type": "h2",
        "text": "2. Supply context, and less of it"
      },
      {
        "type": "p",
        "text": "Agents need to discover, understand and use data without a person approving every request. That means the platform has to provide context for reasoning as well as rows. But more is not better. Anthropic's engineering team describes [context as a finite resource with diminishing marginal returns](https://anthropic.com/engineering/effective-context-engineering-for-ai-agents), and recommends just-in-time retrieval, where agents hold lightweight identifiers and load the underlying data with tools when they need it."
      },
      {
        "type": "p",
        "text": "For data platforms this changes API design. Return aggregates, samples and pointers before full result sets. Make it cheap for an agent to ask what exists before it asks for everything. A query that dumps ten thousand rows into a context window is not helpful to the agent; it degrades the reasoning you were trying to support."
      },
      {
        "type": "h2",
        "text": "3. Engineer for bursts and runaway loops"
      },
      {
        "type": "p",
        "text": "The platform must scale automatically and handle simultaneous requests from many independent agents. Peak load is the easy part to plan for. The harder failure mode is an agent stuck in a retry loop, or a planner that fans a single task out into hundreds of queries."
      },
      {
        "type": "p",
        "text": "So elasticity needs a counterweight. Set quotas and cost budgets per agent identity as well as per application. Cache aggressively, because agents ask the same questions far more often than people do. Make it easy to see which agent is driving which workload, so the on-call engineer can stop one misbehaving process without shutting down the rest."
      },
      {
        "type": "h2",
        "text": "4. Put meaning in the platform"
      },
      {
        "type": "p",
        "text": "Move beyond raw tables. Serve semantic models, knowledge graphs and ontologies so agents understand relationships and business meaning beyond column names. The test I use is simple: ask three agents to compute active customers and see whether they agree."
      },
      {
        "type": "p",
        "text": "If they do not, you have a semantics problem that no model upgrade will fix. Agree on business definitions once, publish them as governed objects, and make agents use them. An agent that calculates a key metric three different ways is worse than having no agent at all, because it produces three confident answers."
      },
      {
        "type": "h2",
        "text": "5. Automate governance at machine speed"
      },
      {
        "type": "p",
        "text": "Agents need their own identities, fine-grained access control and full observability. Auditing and compliance have to run as fast as the agents do, which rules out quarterly access reviews and manual approvals as the main line of defense. Data mesh called this federated computational governance: policies written as code and enforced by the platform."
      },
      {
        "type": "p",
        "text": "Agent-to-agent traffic raises the stakes further. Protocols such as Google's [Agent2Agent](https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/), which complements MCP by letting agents from different vendors collaborate, mean data can pass through several agents before anyone acts on it. Lineage has to follow the data through each of those hops."
      },
      {
        "type": "p",
        "text": "Writes deserve separate treatment. Most agent-ready designs I review focus on read access, because that is where pilots start. The harder problems arrive when agents write back: updating a record, opening a case, adjusting a parameter. Writes need idempotency so a retried call does not double-apply, a clear compensating action for when the agent is wrong, and a record of which agent changed what. I would not let an agent write to a governed table until all three exist. The [OWASP guidance on excessive agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/) adds a point I wish more teams followed: enforce authorization in the downstream system rather than trusting the model to decide whether an action is allowed."
      },
      {
        "type": "h2",
        "text": "Where I disagree with the common advice"
      },
      {
        "type": "p",
        "text": "The common advice is to make all your data AI-ready before agents arrive. I think that is a plan to never start. No large enterprise will finish cleaning, describing and contracting its whole estate, and the attempt consumes the budget that should go to the few datasets agents actually need."
      },
      {
        "type": "p",
        "text": "I prefer a narrow, certified surface. Pick the ten or twenty data products the first agent use cases depend on, bring those to the standard in this essay, and make everything else unreachable by default. Agents get what has been certified, not whatever a service account happens to see. That reverses the usual pattern, where an agent inherits broad read access from a legacy integration account and the team discovers months later what it could touch."
      },
      {
        "type": "p",
        "text": "There is a useful side effect. The certified list becomes a demand signal. When a new use case needs a dataset that is not on it, the request goes to the data owner with a business reason attached, and the use case that needs the data funds the work to bring it up to standard. Data quality stops being an endless cleanup program and becomes a queue ranked by value."
      },
      {
        "type": "h2",
        "text": "Why an open lakehouse matters here"
      },
      {
        "type": "p",
        "text": "For years we kept operational and analytical data in separate worlds: one for reporting, another for ambitious AI projects. That divide added complexity, governance risk and drag. Unifying them on an open lakehouse, with one governed source of truth, is what makes agent-first access practical, because there is one place to enforce policy."
      },
      {
        "type": "p",
        "text": "Open table formats add something agents specifically need. [Apache Iceberg](https://iceberg.apache.org/) lets many engines work safely with the same tables at the same time, and supports time travel so a query can run against exactly the same table snapshot later. That second feature is underrated. If an agent records the snapshot it read alongside each decision, you can replay the decision against the data it actually saw. That is the difference between an explanation and a reconstruction."
      },
      {
        "type": "p",
        "text": "I learned the value of one governed path at USAA, when we consolidated 360 data scientists onto a single ML platform and cut model deployment from eight weeks to five days. The speed came from standardization, not heroics. Agents will reward the same discipline, and punish its absence faster."
      },
      {
        "type": "monday",
        "items": [
          "List every dataset your current agent pilots can reach and compare it with the datasets they actually need.",
          "Ask three teams' agents to compute active customers and bring the differing answers to your data governance council.",
          "Set per-agent query quotas and cost budgets on your main warehouse before the next pilot goes live.",
          "Block agent writes to governed tables until each has idempotency, a compensating action and per-agent change records."
        ]
      },
      {
        "type": "p",
        "text": "Most platforms I look at score well on one or two of these principles and poorly on the rest. Which of the five would your platform fail first if a thousand agents showed up tomorrow?"
      },
      {
        "type": "bottomLine",
        "text": "The goal is a platform where agents can reason and act safely on governed data. Start by finding which of these five principles your platform violates today, and fix that one first."
      }
    ]
  }
]

export interface Note {
  slug: string
  title: string
  summary: string
  status: "draft" | "published"
  published?: string
  plannedFor: string
  source: string
  body: Block[]
}

export const notes: Note[] = [
  {
    "slug": "living-documentation-trust-gap",
    "title": "Living documentation and the human trust gap",
    "summary": "Docs that regenerate on every commit describe what code does. The harder, more valuable problem is capturing why it exists.",
    "status": "published",
    "published": "2025-11-19",
    "plannedFor": "Nov 2026",
    "source": "Adapted from my LinkedIn post of November 17, 2025.",
    "body": [
      {
        "type": "p",
        "text": "**Documentation that rewrites itself on every commit is a real step forward, but it answers the wrong question for most enterprises.** I have used open-source tools in this space for a while now, and they are good at describing what a function or service does. Point one at a repository and you get a tidy, current wiki in minutes. That alone beats the stale Confluence pages most of us inherited."
      },
      {
        "type": "p",
        "text": "The problem is accuracy and intent. In a regulated bank, a document that is 90% right is not 90% useful, because nobody knows which 10% is wrong, so every page still needs a human review before anyone relies on it. And even a perfect description of the code says nothing about why the code exists: which policy it enforces, which business rule it encodes, which incident shaped that odd edge case."
      },
      {
        "type": "p",
        "text": "That is where I think the real race is. It is not about cleaner wikis. It is about an enterprise knowledge graph that links code to business intent, so an engineer, an auditor or an agent can trace a line of logic back to the decision that put it there. Generated docs are a useful input to that graph, not a replacement for it."
      },
      {
        "type": "p",
        "text": "Until we close that trust gap, we are just building faster ways to misunderstand our own systems."
      }
    ]
  },
  {
    "slug": "from-pair-programming-to-fleet-management",
    "title": "From pair programming to fleet management",
    "summary": "Editors now run local, background and cloud agents side by side. The leadership job shifts from writing code to designing the system that writes it.",
    "status": "published",
    "published": "2025-12-15",
    "plannedFor": "Dec 2026",
    "source": "Adapted from my LinkedIn post of December 13, 2025.",
    "body": [
      {
        "type": "p",
        "text": "**The bottleneck in AI-assisted development is often not the model, it is the cost of switching context.** Every time an engineer stops to set up a task, wait for a result and then reload the problem in their head, the speed gain from the model leaks away. One assistant in a chat pane is still pair programming, and pair programming does not scale past one pair."
      },
      {
        "type": "p",
        "text": "Multi-agent orchestration in the editor changes the shape of the work. A local agent handles strategy and quick answers. Background agents work in isolated worktrees on well-scoped tasks. Cloud agents take the heavy lifting, like large refactors or long test runs. Ideally all of them draw on the same repository instructions and context, so nobody has to re-explain the codebase each time."
      },
      {
        "type": "p",
        "text": "The useful distinction for leaders is between automation and orchestration. Automation is doing things right: one agent completing one task well. Orchestration is doing the right things: deciding which work goes to which agent, in what order, with what checks before anything merges. The second is an architecture and management problem, and that is where I see most teams underinvesting. The payoff is asynchronous execution. Engineers stop babysitting a single session and start reviewing the output of several, which is a different skill and needs different guardrails."
      },
      {
        "type": "p",
        "text": "Build the factory first; the widgets will follow."
      }
    ]
  },
  {
    "slug": "ai-is-an-amplifier",
    "title": "AI is an amplifier, not a silver bullet",
    "summary": "AI magnifies whatever is already in a team. Platform quality, clear policy and updated workflows decide whether that means strength or dysfunction.",
    "status": "published",
    "published": "2025-09-24",
    "plannedFor": "Dec 2026",
    "source": "Adapted from my LinkedIn post of September 23, 2025.",
    "body": [
      {
        "type": "p",
        "text": "**AI does not fix a team; it amplifies whatever is already there.** The [2025 DORA report](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report) put data behind what many of us had seen in practice: strong teams get stronger, and struggling teams find their existing problems highlighted and intensified. The greatest return came not from the AI tools themselves but from the quality of internal platforms, the clarity of workflows and the alignment of teams."
      },
      {
        "type": "p",
        "text": "That matches my experience. When we moved hundreds of data scientists onto one governed ML platform, the speedup came less from any clever tool and more from removing the dozens of small, inconsistent paths to production. Give AI a messy delivery system and it produces a mess at higher volume."
      },
      {
        "type": "p",
        "text": "Two other points from the research deserve more attention than they get. First, DORA recommends clarifying and socializing your AI policies. In my experience a clear policy is a blueprint, not a blockade: teams experiment more, not less, when they know where the lines are. Second, acceleration exposes weaknesses downstream. Faster coding only helps if testing, version control and feedback loops keep up. Otherwise you have moved the queue and called it productivity."
      },
      {
        "type": "p",
        "text": "Before buying another assistant, ask what it will amplify in your organization today."
      }
    ]
  }
]
