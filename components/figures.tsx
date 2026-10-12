// Architecture figures drawn as inline SVG. Colours come only from theme tokens,
// so every figure follows light and dark mode. Server component: no hooks.

export type FigureName =
  | "ai-native-sdlc"
  | "architecture-as-code"
  | "agent-harness"
  | "controlled-data-movement"
  | "context-layer"
  | "mcp-gateway"
  | "ml-platform-lifecycle"
  | "spec-driven"

export const figureMeta: Record<FigureName, { title: string; alt: string; caption: string }> = {
  "ai-native-sdlc": {
    title: "Code fast, verify hard",
    alt: "Flow from spec or intent to a coding agent, then a highlighted verification harness of tests, policy checks and security scans, then human review and production. Failures loop back to the coding agent to fix and retry.",
    caption: "In an AI-native lifecycle the bottleneck moves from writing code to verifying it. The harness decides what reaches a human, and what reaches production.",
  },
  "architecture-as-code": {
    title: "Architecture that runs",
    alt: "Decisions and standards written as policy feed a highlighted architecture control plane, which drives pull request checks, CI/CD gates and agent context. Production telemetry reports drift back to the control plane.",
    caption: "Architecture as code: decisions and standards become a control plane that pull requests, pipelines and agents all consult, and production drift flows back to it.",
  },
  "agent-harness": {
    title: "The agent harness",
    alt: "A small model box sits at the centre of a highlighted harness made of six parts: context, tools, guardrails, evaluation, human approval and observability.",
    caption: "Model is a tool. Harness is the strategy. Most of what makes an agent safe and useful lives around the model, not inside it.",
  },
  "controlled-data-movement": {
    title: "Controlled data movement",
    alt: "Data moves from a source zone to a target zone only through a highlighted governed path of classify, approve, protect and record lineage, steered by a policy engine. A dashed ungoverned copy path is blocked.",
    caption: "Data moves only through approved patterns. The governed path is the easy path, and every other route is closed.",
  },
  "context-layer": {
    title: "A curated context layer",
    alt: "Scattered sources such as documents, tickets, code, chat and decisions pass through curation (capture, review, owner, freshness) into a highlighted curated context layer that is self-describing, which serves both people and agents.",
    caption: "Context needs curation, not collection. A small, owned, dated layer serves people and agents better than every document ever written.",
  },
  "mcp-gateway": {
    title: "One control point for agent tools",
    alt: "Agents reach approved MCP servers and enterprise systems only through a highlighted MCP gateway that checks identity, a registry allowlist and policy, and keeps an audit log. A dashed unregistered server is blocked.",
    caption: "One control point. Every agent call to a tool passes the same gateway, so identity, allowlisting, policy and audit happen once, everywhere.",
  },
  "ml-platform-lifecycle": {
    title: "The ML platform lifecycle",
    alt: "A loop from data to features, training, a highlighted validate and risk review step, deployment and monitoring, with monitoring feeding back to data for retraining.",
    caption: "The governed path from idea to production. Validation and risk review sit inside the loop, so every retrain passes the same gate.",
  },
  "spec-driven": {
    title: "Spec-driven development",
    alt: "A highlighted spec, the contract, flows to plan, tasks and code. Tests trace back to the spec, and a reviewer or auditor reviews the spec rather than every line of code.",
    caption: "The spec is the contract. Plans, tasks and code follow from it, tests trace back to it, and review effort goes where it matters most.",
  },
}

function AiNativeSdlc() {
  return (
    <>
      <defs>
        <marker id="fig-ai-native-sdlc-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" markerUnits="userSpaceOnUse" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" className="fill-muted" />
        </marker>
      </defs>
      <rect x="10" y="100" width="100" height="80" rx="6" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" fontWeight="600">
        <tspan x="60" y="130">Spec /</tspan>
        <tspan x="60" y="150">intent</tspan>
      </text>
      <rect x="140" y="100" width="100" height="80" rx="6" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" fontWeight="600">
        <tspan x="190" y="130">Coding</tspan>
        <tspan x="190" y="150">agent</tspan>
      </text>
      <rect x="270" y="30" width="180" height="220" rx="6" className="fill-accent-soft stroke-accent" strokeWidth="2" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" fontWeight="600">
        <tspan x="360" y="52">Verification</tspan>
        <tspan x="360" y="72">harness</tspan>
      </text>
      <rect x="288" y="104" width="144" height="34" rx="6" className="fill-page stroke-line" strokeWidth="1.5" />
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="360" y="121">tests</text>
      <rect x="288" y="148" width="144" height="34" rx="6" className="fill-page stroke-line" strokeWidth="1.5" />
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="360" y="165">policy checks</text>
      <rect x="288" y="192" width="144" height="34" rx="6" className="fill-page stroke-line" strokeWidth="1.5" />
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="360" y="209">security scan</text>
      <rect x="480" y="100" width="100" height="80" rx="6" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" fontWeight="600">
        <tspan x="530" y="130">Human</tspan>
        <tspan x="530" y="150">review</tspan>
      </text>
      <rect x="610" y="100" width="100" height="80" rx="6" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" fontWeight="600" x="660" y="140">Production</text>
      <path d="M110 140 H136" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-ai-native-sdlc-arrow)" />
      <path d="M240 140 H266" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-ai-native-sdlc-arrow)" />
      <path d="M450 140 H476" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-ai-native-sdlc-arrow)" />
      <path d="M580 140 H606" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-ai-native-sdlc-arrow)" />
      <path d="M360 250 V292 H190 V184" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-ai-native-sdlc-arrow)" />
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="275" y="312">fails: fix and retry</text>
    </>
  )
}

function ArchitectureAsCode() {
  return (
    <>
      <defs>
        <marker id="fig-architecture-as-code-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" markerUnits="userSpaceOnUse" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" className="fill-muted" />
        </marker>
      </defs>
      <rect x="16" y="82" width="190" height="64" rx="6" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" fontWeight="600" x="111" y="102">Decisions</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="111" y="127">ADRs</text>
      <rect x="16" y="194" width="190" height="64" rx="6" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" fontWeight="600" x="111" y="214">Standards</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="111" y="239">as policy</text>
      <rect x="260" y="110" width="190" height="120" rx="6" className="fill-accent-soft stroke-accent" strokeWidth="2" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" fontWeight="600">
        <tspan x="355" y="150">Architecture</tspan>
        <tspan x="355" y="170">control plane</tspan>
      </text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="355" y="202">versioned, testable</text>
      <rect x="510" y="30" width="194" height="64" rx="6" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" fontWeight="600" x="607" y="50">Pull request</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="607" y="75">checks</text>
      <rect x="510" y="120" width="194" height="64" rx="6" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" fontWeight="600" x="607" y="140">CI/CD</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="607" y="165">gates</text>
      <rect x="510" y="210" width="194" height="64" rx="6" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" fontWeight="600" x="607" y="230">Agent context</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="607" y="255">via MCP</text>
      <rect x="510" y="320" width="194" height="60" rx="6" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" fontWeight="600" x="607" y="338">Production</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="607" y="363">telemetry</text>
      <path d="M206 114 H230 V150 H256" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-architecture-as-code-arrow)" />
      <path d="M206 226 H230 V190 H256" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-architecture-as-code-arrow)" />
      <path d="M450 150 H478 V62 H506" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-architecture-as-code-arrow)" />
      <path d="M450 170 H506" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-architecture-as-code-arrow)" />
      <path d="M450 190 H478 V242 H506" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-architecture-as-code-arrow)" />
      <path d="M607 274 V316" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-architecture-as-code-arrow)" />
      <path d="M510 350 H355 V234" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-architecture-as-code-arrow)" />
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="432" y="334">drift</text>
    </>
  )
}

function AgentHarness() {
  return (
    <>
      <defs>
        <marker id="fig-agent-harness-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" markerUnits="userSpaceOnUse" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" className="fill-muted" />
        </marker>
      </defs>
      <rect x="30" y="20" width="660" height="380" rx="6" className="fill-accent-soft stroke-accent" strokeWidth="2" />
      <text className="fill-accent font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" fontWeight="600" letterSpacing="0.06em" x="360" y="46">THE HARNESS</text>
      <rect x="62" y="72" width="186" height="68" rx="6" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" fontWeight="600" x="155" y="94">Context</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="155" y="119">what it knows</text>
      <rect x="267" y="72" width="186" height="68" rx="6" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" fontWeight="600" x="360" y="94">Tools</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="360" y="119">what it can do</text>
      <rect x="472" y="72" width="186" height="68" rx="6" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" fontWeight="600" x="565" y="94">Guardrails</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="565" y="119">what it must not do</text>
      <rect x="62" y="300" width="186" height="68" rx="6" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" fontWeight="600" x="155" y="322">Evaluation</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="155" y="347">is it right</text>
      <rect x="267" y="300" width="186" height="68" rx="6" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" fontWeight="600" x="360" y="322">Human approval</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="360" y="347">who signs off</text>
      <rect x="472" y="300" width="186" height="68" rx="6" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" fontWeight="600" x="565" y="322">Observability</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="565" y="347">what happened</text>
      <path d="M155.0 140 L308.75 188" className="fill-none stroke-line" strokeWidth="1.5" />
      <path d="M360.0 140 L360.0 188" className="fill-none stroke-line" strokeWidth="1.5" />
      <path d="M565.0 140 L411.25 188" className="fill-none stroke-line" strokeWidth="1.5" />
      <path d="M155.0 300 L308.75 244" className="fill-none stroke-line" strokeWidth="1.5" />
      <path d="M360.0 300 L360.0 244" className="fill-none stroke-line" strokeWidth="1.5" />
      <path d="M565.0 300 L411.25 244" className="fill-none stroke-line" strokeWidth="1.5" />
      <rect x="300" y="188" width="120" height="56" rx="6" className="fill-chip stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" fontWeight="600" x="360" y="216">Model</text>
    </>
  )
}

function ControlledDataMovement() {
  return (
    <>
      <defs>
        <marker id="fig-controlled-data-movement-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" markerUnits="userSpaceOnUse" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" className="fill-muted" />
        </marker>
      </defs>
      <rect x="250" y="16" width="220" height="56" rx="6" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" fontWeight="600" x="360" y="44">Policy engine</text>
      <path d="M360 72 V106" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-controlled-data-movement-arrow)" />
      <rect x="16" y="180" width="120" height="100" rx="6" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" fontWeight="600">
        <tspan x="76" y="220">Source</tspan>
        <tspan x="76" y="240">zone</tspan>
      </text>
      <rect x="584" y="180" width="120" height="100" rx="6" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" fontWeight="600">
        <tspan x="644" y="220">Target</tspan>
        <tspan x="644" y="240">zone</tspan>
      </text>
      <rect x="170" y="110" width="380" height="240" rx="6" className="fill-accent-soft stroke-accent" strokeWidth="2" />
      <text className="fill-accent font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" fontWeight="600" letterSpacing="0.06em" x="360" y="134">GOVERNED PATH</text>
      <rect x="190" y="154" width="340" height="38" rx="6" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="start" dominantBaseline="middle" fontWeight="600" x="206" y="173">Classify</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="end" dominantBaseline="middle" x="514" y="173">sensitivity</text>
      <rect x="190" y="202" width="340" height="38" rx="6" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="start" dominantBaseline="middle" fontWeight="600" x="206" y="221">Approve</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="end" dominantBaseline="middle" x="514" y="221">owner, purpose</text>
      <rect x="190" y="250" width="340" height="38" rx="6" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="start" dominantBaseline="middle" fontWeight="600" x="206" y="269">Protect</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="end" dominantBaseline="middle" x="514" y="269">encrypt or mask</text>
      <rect x="190" y="298" width="340" height="38" rx="6" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="start" dominantBaseline="middle" fontWeight="600" x="206" y="317">Record lineage</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="end" dominantBaseline="middle" x="514" y="317">source to target</text>
      <path d="M136 230 H166" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-controlled-data-movement-arrow)" />
      <path d="M550 230 H580" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-controlled-data-movement-arrow)" />
      <path d="M76 280 V396 H300" className="fill-none stroke-muted" strokeWidth="1.5" strokeDasharray="5 4" />
      <circle cx="318" cy="396" r="12" className="fill-page stroke-ink" strokeWidth="1.5" />
      <path d="M312 390 L324 402 M324 390 L312 402" className="fill-none stroke-ink" strokeWidth="2" strokeLinecap="round" />
      <text className="fill-muted font-sans" fontSize="14" textAnchor="start" dominantBaseline="middle" x="344" y="396">ungoverned copy: blocked</text>
    </>
  )
}

function ContextLayer() {
  return (
    <>
      <defs>
        <marker id="fig-context-layer-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" markerUnits="userSpaceOnUse" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" className="fill-muted" />
        </marker>
      </defs>
      <rect x="16" y="30" width="120" height="44" rx="6" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" fontWeight="600" x="76" y="52">Documents</text>
      <path d="M136 52 L216 137.0" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-context-layer-arrow)" />
      <rect x="44" y="100" width="120" height="44" rx="6" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" fontWeight="600" x="104" y="122">Tickets</text>
      <path d="M164 122 L216 168.5" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-context-layer-arrow)" />
      <rect x="20" y="170" width="120" height="44" rx="6" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" fontWeight="600" x="80" y="192">Code</text>
      <path d="M140 192 L216 200.0" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-context-layer-arrow)" />
      <rect x="48" y="240" width="120" height="44" rx="6" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" fontWeight="600" x="108" y="262">Chat</text>
      <path d="M168 262 L216 231.5" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-context-layer-arrow)" />
      <rect x="24" y="310" width="120" height="44" rx="6" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" fontWeight="600" x="84" y="332">Decisions</text>
      <path d="M144 332 L216 263.0" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-context-layer-arrow)" />
      <rect x="220" y="110" width="150" height="180" rx="6" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" fontWeight="600" x="295" y="140">Curation</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="295" y="178">capture</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="295" y="204">review</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="295" y="230">owner</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="295" y="256">freshness</text>
      <path d="M370 200 H406" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-context-layer-arrow)" />
      <rect x="410" y="90" width="170" height="220" rx="6" className="fill-accent-soft stroke-accent" strokeWidth="2" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" fontWeight="600">
        <tspan x="495" y="166">Curated</tspan>
        <tspan x="495" y="186">context layer</tspan>
      </text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle">
        <tspan x="495" y="227">self-describing:</tspan>
        <tspan x="495" y="245">owner, source, date</tspan>
      </text>
      <rect x="624" y="142" width="82" height="56" rx="6" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" fontWeight="600" x="665" y="170">People</text>
      <rect x="624" y="222" width="82" height="56" rx="6" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" fontWeight="600" x="665" y="250">Agents</text>
      <path d="M580 170 H620" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-context-layer-arrow)" />
      <path d="M580 250 H620" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-context-layer-arrow)" />
    </>
  )
}

function McpGateway() {
  return (
    <>
      <defs>
        <marker id="fig-mcp-gateway-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" markerUnits="userSpaceOnUse" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" className="fill-muted" />
        </marker>
      </defs>
      <rect x="16" y="110" width="110" height="110" rx="6" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" fontWeight="600" x="71" y="165">Agents</text>
      <rect x="170" y="30" width="190" height="260" rx="6" className="fill-accent-soft stroke-accent" strokeWidth="2" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" fontWeight="600" x="265" y="60">MCP gateway</text>
      <rect x="186" y="88" width="158" height="36" rx="6" className="fill-page stroke-line" strokeWidth="1.5" />
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="265" y="106">identity</text>
      <rect x="186" y="136" width="158" height="36" rx="6" className="fill-page stroke-line" strokeWidth="1.5" />
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="265" y="154">registry allowlist</text>
      <rect x="186" y="184" width="158" height="36" rx="6" className="fill-page stroke-line" strokeWidth="1.5" />
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="265" y="202">policy</text>
      <rect x="186" y="232" width="158" height="36" rx="6" className="fill-page stroke-line" strokeWidth="1.5" />
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="265" y="250">audit log</text>
      <rect x="410" y="120" width="130" height="90" rx="6" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" fontWeight="600">
        <tspan x="475" y="155">Approved</tspan>
        <tspan x="475" y="175">MCP servers</tspan>
      </text>
      <rect x="584" y="120" width="120" height="90" rx="6" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" fontWeight="600">
        <tspan x="644" y="155">Enterprise</tspan>
        <tspan x="644" y="175">systems</tspan>
      </text>
      <path d="M126 165 H166" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-mcp-gateway-arrow)" />
      <path d="M360 165 H406" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-mcp-gateway-arrow)" />
      <path d="M540 165 H580" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-mcp-gateway-arrow)" />
      <rect x="410" y="320" width="130" height="64" rx="6" className="fill-panel stroke-muted" strokeWidth="1.5" strokeDasharray="5 4" />
      <text className="fill-muted font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" fontWeight="600">
        <tspan x="475" y="342">Unregistered</tspan>
        <tspan x="475" y="362">server</tspan>
      </text>
      <path d="M265 290 V352 H406" className="fill-none stroke-muted" strokeWidth="1.5" strokeDasharray="5 4" />
      <circle cx="338" cy="352" r="12" className="fill-page stroke-ink" strokeWidth="1.5" />
      <path d="M332 346 L344 358 M344 346 L332 358" className="fill-none stroke-ink" strokeWidth="2" strokeLinecap="round" />
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="338" y="384">blocked</text>
    </>
  )
}

function MlPlatformLifecycle() {
  return (
    <>
      <defs>
        <marker id="fig-ml-platform-lifecycle-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" markerUnits="userSpaceOnUse" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" className="fill-muted" />
        </marker>
      </defs>
      <rect x="55" y="40" width="170" height="64" rx="6" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" fontWeight="600" x="140" y="72">Data</text>
      <rect x="275" y="40" width="170" height="64" rx="6" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" fontWeight="600" x="360" y="72">Features</text>
      <rect x="495" y="40" width="170" height="64" rx="6" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" fontWeight="600" x="580" y="72">Train</text>
      <rect x="495" y="236" width="170" height="84" rx="6" className="fill-accent-soft stroke-accent" strokeWidth="2" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" fontWeight="600">
        <tspan x="580" y="268">Validate &</tspan>
        <tspan x="580" y="288">risk review</tspan>
      </text>
      <rect x="275" y="236" width="170" height="84" rx="6" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" fontWeight="600" x="360" y="278">Deploy</text>
      <rect x="55" y="236" width="170" height="84" rx="6" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" fontWeight="600" x="140" y="278">Monitor</text>
      <path d="M225.0 72 H271.0" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-ml-platform-lifecycle-arrow)" />
      <path d="M445.0 72 H491.0" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-ml-platform-lifecycle-arrow)" />
      <path d="M580 104 V232" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-ml-platform-lifecycle-arrow)" />
      <path d="M495.0 278 H449.0" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-ml-platform-lifecycle-arrow)" />
      <path d="M275.0 278 H229.0" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-ml-platform-lifecycle-arrow)" />
      <path d="M140 236 V108" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-ml-platform-lifecycle-arrow)" />
      <text className="fill-muted font-sans" fontSize="14" textAnchor="end" dominantBaseline="middle" x="128" y="170">retrain</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="360" y="170">one governed path</text>
    </>
  )
}

function SpecDriven() {
  return (
    <>
      <defs>
        <marker id="fig-spec-driven-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" markerUnits="userSpaceOnUse" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" className="fill-muted" />
        </marker>
      </defs>
      <rect x="30" y="20" width="170" height="64" rx="6" className="fill-page stroke-strong" strokeWidth="1.5" />
      <circle cx="58" cy="44" r="7" className="fill-none stroke-ink" strokeWidth="1.5" />
      <path d="M45 68 C45 56 71 56 71 68" className="fill-none stroke-ink" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="start" dominantBaseline="middle" fontWeight="600" x="84" y="42">Reviewer</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="start" dominantBaseline="middle" x="84" y="64">or auditor</text>
      <path d="M115 84 V136" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-spec-driven-arrow)" />
      <text className="fill-muted font-sans" fontSize="14" textAnchor="start" dominantBaseline="middle" x="132" y="106">audit the contract, not every line</text>
      <rect x="30" y="140" width="170" height="84" rx="6" className="fill-accent-soft stroke-accent" strokeWidth="2" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" fontWeight="600" x="115" y="170">Spec</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="115" y="195">the contract</text>
      <rect x="250" y="150" width="120" height="64" rx="6" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" fontWeight="600" x="310" y="182">Plan</text>
      <rect x="415" y="150" width="120" height="64" rx="6" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" fontWeight="600" x="475" y="182">Tasks</text>
      <rect x="580" y="150" width="120" height="64" rx="6" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" fontWeight="600" x="640" y="182">Code</text>
      <path d="M200 182 H246" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-spec-driven-arrow)" />
      <path d="M370 182 H411" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-spec-driven-arrow)" />
      <path d="M535 182 H576" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-spec-driven-arrow)" />
      <rect x="580" y="280" width="120" height="64" rx="6" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" fontWeight="600" x="640" y="312">Tests</text>
      <path d="M640 214 V276" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-spec-driven-arrow)" />
      <path d="M580 312 H115 V228" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-spec-driven-arrow)" />
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="348" y="298">traces to</text>
    </>
  )
}

const figures: Record<FigureName, { height: number; Body: () => ReturnType<typeof AiNativeSdlc> }> = {
  "ai-native-sdlc": { height: 340, Body: AiNativeSdlc },
  "architecture-as-code": { height: 410, Body: ArchitectureAsCode },
  "agent-harness": { height: 420, Body: AgentHarness },
  "controlled-data-movement": { height: 424, Body: ControlledDataMovement },
  "context-layer": { height: 384, Body: ContextLayer },
  "mcp-gateway": { height: 410, Body: McpGateway },
  "ml-platform-lifecycle": { height: 350, Body: MlPlatformLifecycle },
  "spec-driven": { height: 366, Body: SpecDriven },
}

export function Figure({ name }: { name: FigureName }) {
  const meta = figureMeta[name]
  const { height, Body } = figures[name]
  const titleId = `fig-${name}-title`
  return (
    <figure className="not-prose my-10">
      <div className="overflow-x-auto rounded-md border border-line bg-panel p-4 sm:p-6">
        <svg
          role="img"
          aria-labelledby={titleId}
          viewBox={`0 0 720 ${height}`}
          className="h-auto w-full min-w-[560px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id={titleId}>{meta.alt}</title>
          <Body />
        </svg>
      </div>
      <figcaption className="mt-3 font-sans text-[15px] text-muted">{meta.caption}</figcaption>
    </figure>
  )
}
