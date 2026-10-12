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
  | "c4-context"
  | "c4-container"
  | "c4-component-mcp"
  | "c4-component-web"
  | "c4-code-sync"
  | "c4-deployment"
  | "c4-dynamic-change"

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
  "c4-context": {
    title: "Level 1: System context",
    alt: "System context diagram. Three people, an application engineer, an enterprise architect and a technology leader, use the Architecture as Code Platform. Around it sit five external systems: an AI coding assistant that reads standards and validates designs through MCP, GitHub Copilot Spaces that indexes standards and patterns, the npm registry that distributes the CLI and MCP server, GitHub that receives diagram previews on pull requests, and product teams' application repositories that validate their YAML in CI and evaluate policies.",
    caption: "Who uses the platform and what it touches, drawn from the platform's own model in model/aac-platform. People and agents reach the same Git repository through different doors.",
  },
  "c4-container": {
    title: "Level 2: Containers",
    alt: "Container diagram of the Architecture as Code Platform. Inside the system boundary are seven containers: the Web Dashboard and Diagram Editor, the MCP Server, the aac CLI, the Architecture Repository, the Documentation Microsite, the Governance Pipeline and the Policy Engine. The dashboard, the CLI and the MCP server read from the repository; the repository triggers the pipeline, which reads it back, tests policies with the Policy Engine, publishes the microsite and posts diagram previews to pull requests on GitHub. A technology leader and an enterprise architect use the dashboard, the architect also authors in the repository, an application engineer uses the CLI and the microsite, and an AI coding assistant reaches the MCP server. GitHub Copilot Spaces indexes the repository, and application repositories evaluate their choices against the Policy Engine.",
    caption: "Seven containers around one Git repository. The dashboard, CLI, MCP server and pipeline read the same YAML by four routes: the file system at build time, published schemas over HTTPS, a local clone and a Git checkout.",
  },
  "c4-component-mcp": {
    title: "Level 3: MCP Server components",
    alt: "Component diagram of the MCP Server. An AI coding assistant calls it over MCP on stdio. The entry point, bin/aac-mcp.ts, resolves the repository root with the repo resolver and creates the server through the server factory in server.ts, which registers resources, tools and prompts. Resources use the repo resolver and the schema loader. Tools use the repo resolver, the schema loader and the AJV validator. The repo resolver and the schema loader read files from a local clone of the Architecture Repository.",
    caption: "Drawn from the source code, because the platform's model stops at containers. Ten resources, three tools and two prompts sit on three small library modules.",
  },
  "c4-component-web": {
    title: "Level 3: Web Dashboard and Diagram Editor components",
    alt: "Component diagram of the Web Dashboard and Diagram Editor. An enterprise architect and a technology leader use the App Router pages. The pages compute the scorecard with the metrics module, render the YAML editor and the canvas, and load models with the model loaders, which read YAML from the Architecture Repository at build time. The editor and the canvas update the Zustand graph store; the canvas also filters nodes with the view filter and downloads Draw.io XML through the export module. The store validates YAML with Zod, converts between YAML and graph with the parser, and lays out nodes with the layout module. The Governance Pipeline renders diagrams with the same export, parser, layout and view filter modules.",
    caption: "Drawn from the source code, because the platform's model stops at containers. The parser, layout, view filter and export modules serve both the editor in the browser and the pipeline's diagram build.",
  },
  "c4-code-sync": {
    title: "Level 4: The YAML and canvas sync engine",
    alt: "Code diagram of the bidirectional sync engine. The Monaco editor pane calls updateFromYaml, debounced. It returns early if syncSource is 'canvas'; otherwise it sets syncSource to 'yaml', runs validateYamlContent with Zod, yamlToGraph and applyDagreLayout, then sets nodes and edges and clears syncSource. Invalid YAML sets parseError and keeps the last graph. The React Flow canvas pane calls updateFromCanvas on node drag stop and on connect. It returns early if syncSource is 'yaml'; otherwise it sets syncSource to 'canvas', runs graphToYaml, sets yamlText and clears syncSource. The editor shows yamlText from the useGraphStore Zustand store, and the canvas shows nodes and edges filtered by the active view with filterGraphByView.",
    caption: "Drawn from src/store/use-graph-store.ts and the two panes that call it. One syncSource flag stops each side from re-triggering the other, which is what lets two editable views of one model stay in step without a loop.",
  },
  "c4-deployment": {
    title: "Deployment: where each container runs",
    alt: "Deployment diagram. GitHub hosts three deployment nodes: GitHub Pages serving the Documentation Microsite, GitHub Actions runners running the Governance Pipeline and the Policy Engine, and the muthub-ai/aac Git repository holding the Architecture Repository. Vercel runs the Web Dashboard and Diagram Editor in the aac.muthub.org project. An engineer workstation runs the aac CLI and the MCP Server in a Node.js 22 runtime. The repository triggers the pipeline, the pipeline tests policies and publishes the microsite, and the dashboard, the CLI and the MCP server read from the repository.",
    caption: "Drawn from the deployment nodes in the platform's own model. Everything runs on GitHub, on Vercel or on the engineer's own machine.",
  },
  "c4-dynamic-change": {
    title: "Dynamic: a governed change, end to end",
    alt: "Dynamic diagram of one governed change in seven numbered steps. 1: an application engineer validates YAML locally with the aac CLI, or an AI coding assistant designs, validates and lints through the MCP Server. 2: the engineer opens a pull request on the Architecture Repository. 3: a webhook triggers the pipeline's lint and test gate. 4: five parallel stages run schema validation, the five compliance rules, OPA policy tests against the Policy Engine, catalog pages and diagrams. 5: the pipeline comments diagram previews on the pull request on GitHub. 6: an enterprise architect reviews, or a waiver is scaffolded. 7: on merge to main the pipeline publishes the Documentation Microsite, and Vercel rebuilds the Web Dashboard.",
    caption: "One change from a local edit to a published catalog. The same checks run on the engineer's machine and again in the pipeline, and a person still reviews before the merge.",
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

function C4Context() {
  return (
    <>
      <defs>
        <marker id="fig-c4-context-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" markerUnits="userSpaceOnUse" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" className="fill-muted" />
        </marker>
      </defs>
      <rect x="16" y="52" width="190" height="116" rx="18" className="fill-page stroke-ink" strokeWidth="1.5" />
      <circle cx="111" cy="39" r="17" className="fill-page stroke-ink" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="111" y="74" fontWeight="600">Application Engineer</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="111" y="93">[Person]</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="111" y="117">Designs and changes</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="111" y="135">systems, often through</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="111" y="153">an AI agent</text>
      <rect x="270" y="52" width="190" height="116" rx="18" className="fill-page stroke-ink" strokeWidth="1.5" />
      <circle cx="365" cy="39" r="17" className="fill-page stroke-ink" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="365" y="74" fontWeight="600">Enterprise Architect</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="365" y="93">[Person]</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="365" y="117">Authors standards and</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="365" y="135">models; reviews waivers</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="365" y="153">and PRs</text>
      <rect x="524" y="52" width="180" height="116" rx="18" className="fill-page stroke-ink" strokeWidth="1.5" />
      <circle cx="614" cy="39" r="17" className="fill-page stroke-ink" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="614" y="74" fontWeight="600">Technology Leader</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="614" y="93">[Person]</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="614" y="117">Tracks conformance,</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="614" y="135">risk and remediation</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="614" y="153">trends</text>
      <rect x="16" y="330" width="160" height="140" rx="6" className="fill-chip stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="96" y="351" fontWeight="600">AI Coding</text>
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="96" y="371" fontWeight="600">Assistant</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="96" y="390">[Software System]</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="96" y="414">Copilot, Cursor or</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="96" y="432">Claude Desktop in</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="96" y="450">the IDE</text>
      <rect x="320" y="320" width="230" height="150" rx="6" className="fill-accent-soft stroke-accent" strokeWidth="2" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="435" y="346" fontWeight="600">Architecture as Code</text>
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="435" y="366" fontWeight="600">Platform</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="435" y="385">[Software System]</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="435" y="409">One Git repository of YAML is</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="435" y="427">the source of truth for every</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="435" y="445">consumer</text>
      <rect x="16" y="666" width="160" height="130" rx="6" className="fill-chip stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="96" y="682" fontWeight="600">GitHub Copilot</text>
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="96" y="702" fontWeight="600">Spaces</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="96" y="721">[Software System]</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="96" y="745">Retrieval index over</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="96" y="763">standards and</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="96" y="781">patterns</text>
      <rect x="192" y="666" width="160" height="130" rx="6" className="fill-chip stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="272" y="701" fontWeight="600">npm Registry</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="272" y="720">[Software System]</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="272" y="744">Distributes the CLI</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="272" y="762">and MCP server</text>
      <rect x="368" y="666" width="160" height="130" rx="6" className="fill-chip stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="448" y="701" fontWeight="600">GitHub</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="448" y="720">[Software System]</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="448" y="744">Hosts the repo, PRs,</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="448" y="762">Actions and Pages</text>
      <rect x="544" y="666" width="160" height="130" rx="6" className="fill-chip stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="624" y="691" fontWeight="600">Application</text>
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="624" y="711" fontWeight="600">Repositories</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="624" y="730">[Software System]</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="624" y="754">Product teams&apos;</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="624" y="772">code repositories</text>
      <path d="M96 168 L96 326" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-context-arrow)" />
      <rect x="34.8" y="212.5" width="122.4" height="55" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="96" y="223">Asks for compliant</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="96" y="240">designs and code</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="96" y="257">[IDE chat]</text>
      <path d="M180 168 L362 316" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-context-arrow)" />
      <rect x="221.5" y="248.5" width="141" height="55" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="292" y="259">Validates architecture</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="292" y="276">and reads docs with</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="292" y="293">[Shell, HTTPS]</text>
      <path d="M410 168 L410 316" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-context-arrow)" />
      <rect x="326.2" y="180.5" width="167.7" height="55" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="410" y="191">Authors models and</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="410" y="208">reviews compliance in</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="410" y="225">[Git pull requests, HTTPS]</text>
      <path d="M590 168 L512 316" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-context-arrow)" />
      <rect x="490.2" y="248.5" width="131.7" height="55" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="556" y="259">Reads the executive</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="556" y="276">scorecard in</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="556" y="293">[HTTPS]</text>
      <path d="M176 445 L316 445" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-context-arrow)" />
      <rect x="179.4" y="368.5" width="137.2" height="55" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="248" y="379">Reads standards and</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="248" y="396">validates designs</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="248" y="413">[MCP over stdio]</text>
      <path d="M96 470 L96 662" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-context-arrow)" />
      <rect x="28.1" y="512.5" width="135.8" height="55" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="96" y="523">Retrieves grounding</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="96" y="540">context from</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="96" y="557">[GitHub MCP server]</text>
      <path d="M150 666 L342 474" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-context-arrow)" />
      <rect x="145.9" y="584.5" width="120.2" height="55" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="206" y="595">Indexes standards</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="206" y="612">and patterns from</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="206" y="629">[GitHub indexing]</text>
      <path d="M300 666 L392 474" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-context-arrow)" />
      <rect x="319.6" y="512.5" width="130.9" height="55" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="385" y="523">Distributes the</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="385" y="540">CLI and MCP server</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="385" y="557">[npm install]</text>
      <path d="M456 470 L456 662" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-context-arrow)" />
      <rect x="378.8" y="584.5" width="154.4" height="55" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="456" y="595">Posts diagram previews</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="456" y="612">to pull requests on</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="456" y="629">[GitHub REST API]</text>
      <path d="M604 666 L530 474" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-context-arrow)" />
      <rect x="495.6" y="512.5" width="188.9" height="55" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="590" y="523">Validate YAML in CI and</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="590" y="540">evaluate policies with</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="590" y="557">[GitHub Actions, OPA bundle]</text>
      <text className="fill-ink font-sans" fontSize="13" textAnchor="start" dominantBaseline="middle" x="150" y="818" fontWeight="600">Key</text>
      <circle cx="197" cy="814" r="4" className="fill-page stroke-ink" strokeWidth="1.5" />
      <rect x="188" y="819" width="18" height="8" rx="4" className="fill-page stroke-ink" strokeWidth="1.5" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="start" dominantBaseline="middle" x="214" y="818">Person</text>
      <rect x="275" y="811" width="22" height="14" rx="3" className="fill-accent-soft stroke-accent" strokeWidth="1.5" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="start" dominantBaseline="middle" x="303" y="818">System in focus</text>
      <rect x="419" y="811" width="22" height="14" rx="3" className="fill-chip stroke-strong" strokeWidth="1.5" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="start" dominantBaseline="middle" x="447" y="818">External system</text>
    </>
  )
}

function C4Container() {
  return (
    <>
      <defs>
        <marker id="fig-c4-container-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" markerUnits="userSpaceOnUse" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" className="fill-muted" />
        </marker>
      </defs>
      <rect x="16" y="56" width="140" height="136" rx="18" className="fill-page stroke-ink" strokeWidth="1.5" />
      <circle cx="86" cy="43" r="17" className="fill-page stroke-ink" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="86" y="78" fontWeight="600">Technology</text>
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="86" y="98" fontWeight="600">Leader</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="86" y="117">[Person]</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="86" y="141">Tracks</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="86" y="159">conformance</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="86" y="177">and risk</text>
      <rect x="168" y="56" width="162" height="136" rx="18" className="fill-page stroke-ink" strokeWidth="1.5" />
      <circle cx="249" cy="43" r="17" className="fill-page stroke-ink" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="249" y="87" fontWeight="600">Enterprise</text>
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="249" y="107" fontWeight="600">Architect</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="249" y="126">[Person]</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="249" y="150">Authors standards</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="249" y="168">and models</text>
      <rect x="524" y="56" width="180" height="136" rx="18" className="fill-page stroke-ink" strokeWidth="1.5" />
      <circle cx="614" cy="43" r="17" className="fill-page stroke-ink" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="614" y="87" fontWeight="600">Application</text>
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="614" y="107" fontWeight="600">Engineer</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="614" y="126">[Person]</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="614" y="150">Designs and changes</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="614" y="168">systems</text>
      <rect x="330" y="212" width="190" height="98" rx="6" className="fill-chip stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="425" y="231" fontWeight="600">AI Coding Assistant</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="425" y="250">[Software System]</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="425" y="274">Agent in the engineer&apos;s</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="425" y="292">IDE</text>
      <rect x="12" y="376" width="696" height="664" rx="10" className="fill-none stroke-muted" strokeWidth="1.5" strokeDasharray="6 4" />
      <rect x="28" y="424" width="150" height="160" rx="6" className="fill-accent-soft stroke-accent" strokeWidth="2" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="103" y="445" fontWeight="600">Web Dashboard</text>
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="103" y="465" fontWeight="600">and Diagram</text>
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="103" y="485" fontWeight="600">Editor</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="103" y="504">[Container: Next.js</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="103" y="522">16, React 19]</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="103" y="546">Scorecard and</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="103" y="564">diagram editor</text>
      <rect x="296" y="424" width="160" height="160" rx="6" className="fill-accent-soft stroke-accent" strokeWidth="2" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="376" y="447" fontWeight="600">MCP Server</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="376" y="466">[Container:</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="376" y="484">TypeScript, MCP</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="376" y="502">SDK, AJV]</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="376" y="526">Resources, tools</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="376" y="544">and prompts for AI</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="376" y="562">agents</text>
      <rect x="526" y="424" width="154" height="160" rx="6" className="fill-accent-soft stroke-accent" strokeWidth="2" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="603" y="456" fontWeight="600">aac CLI</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="603" y="475">[Container:</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="603" y="493">TypeScript,</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="603" y="511">Commander, AJV]</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="603" y="535">init, create and</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="603" y="553">validate commands</text>
      <rect x="272" y="676" width="208" height="130" rx="6" className="fill-accent-soft stroke-accent" strokeWidth="2" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="376" y="702" fontWeight="600">Architecture Repository</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="376" y="721">[Container: Git monorepo,</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="376" y="739">YAML, JSON Schema</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="376" y="757">2020-12]</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="376" y="781">Single source of truth</text>
      <rect x="526" y="676" width="154" height="148" rx="6" className="fill-accent-soft stroke-accent" strokeWidth="2" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="603" y="692" fontWeight="600">Documentation</text>
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="603" y="712" fontWeight="600">Microsite</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="603" y="731">[Container: Static</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="603" y="749">HTML,</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="603" y="767">Asciidoctor.js]</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="603" y="791">Catalogs and</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="603" y="809">diagrams</text>
      <rect x="286" y="890" width="154" height="130" rx="6" className="fill-accent-soft stroke-accent" strokeWidth="2" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="363" y="906" fontWeight="600">Governance</text>
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="363" y="926" fontWeight="600">Pipeline</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="363" y="945">[Container: GitHub</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="363" y="963">Actions, 9 jobs]</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="363" y="987">Lint and test gate,</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="363" y="1005">then parallel stages</text>
      <rect x="540" y="890" width="140" height="130" rx="6" className="fill-accent-soft stroke-accent" strokeWidth="2" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="610" y="907" fontWeight="600">Policy Engine</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="610" y="926">[Container: OPA,</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="610" y="944">Rego]</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="610" y="968">Security,</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="610" y="986">integration and</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="610" y="1004">FinOps rules</text>
      <rect x="60" y="1100" width="190" height="96" rx="6" className="fill-chip stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="155" y="1129" fontWeight="600">GitHub Copilot</text>
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="155" y="1149" fontWeight="600">Spaces</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="155" y="1168">[Software System]</text>
      <rect x="286" y="1100" width="154" height="96" rx="6" className="fill-chip stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="363" y="1139" fontWeight="600">GitHub</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="363" y="1158">[Software System]</text>
      <rect x="524" y="1100" width="180" height="96" rx="6" className="fill-chip stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="614" y="1129" fontWeight="600">Application</text>
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="614" y="1149" fontWeight="600">Repositories</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="614" y="1168">[Software System]</text>
      <path d="M60 192 L60 420" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-container-arrow)" />
      <rect x="10.2" y="222.5" width="131.7" height="55" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="76" y="233">Reads the executive</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="76" y="250">scorecard in</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="76" y="267">[HTTPS]</text>
      <path d="M176 192 L156 420" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-container-arrow)" />
      <rect x="103.9" y="300" width="112.1" height="72" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="160" y="310.5">Designs systems</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="160" y="327.5">and reviews</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="160" y="344.5">compliance in</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="160" y="361.5">[HTTPS]</text>
      <path d="M237 192 L237 650 L276 672" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-container-arrow)" />
      <rect x="177.8" y="216" width="124.5" height="72" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="240" y="226.5">Authors standards,</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="240" y="243.5">patterns and</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="240" y="260.5">models in</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="240" y="277.5">[Git pull requests]</text>
      <path d="M524 118 L440 118 L440 208" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-container-arrow)" />
      <rect x="378.8" y="132.5" width="122.4" height="55" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="440" y="143">Asks for compliant</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="440" y="160">designs and code</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="440" y="177">[IDE chat]</text>
      <path d="M400 310 L400 420" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-container-arrow)" />
      <rect x="342.8" y="312.5" width="114.4" height="55" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="400" y="323">Reads standards,</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="400" y="340">validates designs</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="400" y="357">[MCP over stdio]</text>
      <path d="M603 192 L603 420" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-container-arrow)" />
      <rect x="537.2" y="262.5" width="131.6" height="55" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="603" y="273">Scaffolds and</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="603" y="290">validates YAML with</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="603" y="307">[Shell]</text>
      <path d="M696 192 L696 750 L684 750" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-container-arrow)" />
      <rect x="584" y="592" width="104.1" height="72" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="636" y="602.5">Reads patterns,</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="636" y="619.5">standards and</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="636" y="636.5">waivers in</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="636" y="653.5">[HTTPS]</text>
      <path d="M103 584 L103 741 L268 741" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-container-arrow)" />
      <rect x="48.5" y="622.5" width="109" height="55" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="103" y="633">Loads models at</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="103" y="650">build time from</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="103" y="667">[File system]</text>
      <path d="M376 584 L376 672" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-container-arrow)" />
      <rect x="331.2" y="600.5" width="89.6" height="55" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="376" y="611">Reads a local</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="376" y="628">clone of</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="376" y="645">[File system]</text>
      <path d="M536 584 L470 672" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-container-arrow)" />
      <rect x="453.8" y="594" width="98.5" height="72" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="503" y="604.5">Fetches</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="503" y="621.5">published</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="503" y="638.5">schemas from</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="503" y="655.5">[HTTPS, ETag]</text>
      <path d="M326 806 L326 886" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-container-arrow)" />
      <rect x="289.1" y="827" width="73.8" height="38" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="326" y="837.5">Triggers</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="326" y="854.5">[webhook]</text>
      <path d="M406 886 L406 810" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-container-arrow)" />
      <rect x="369" y="827" width="74" height="38" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="406" y="837.5">Reads</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="406" y="854.5">[checkout]</text>
      <path d="M440 906 L568 830" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-container-arrow)" />
      <path d="M440 1000 L536 1000" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-container-arrow)" />
      <rect x="445" y="914" width="89.9" height="72" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="490" y="924.5">Formats,</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="490" y="941.5">compiles and</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="490" y="958.5">unit-tests</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="490" y="975.5">[OPA CLI]</text>
      <path d="M363 1020 L363 1096" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-container-arrow)" />
      <rect x="366" y="1042.5" width="154.4" height="55" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="443.2" y="1053">Posts diagram previews</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="443.2" y="1070">to PRs on</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="443.2" y="1087">[GitHub REST API]</text>
      <path d="M232 1100 L292 810" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-container-arrow)" />
      <rect x="141.8" y="902.5" width="120.2" height="55" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="201.9" y="913">Indexes standards</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="201.9" y="930">and patterns from</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="201.9" y="947">[GitHub indexing]</text>
      <path d="M664 1100 L664 1024" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-container-arrow)" />
      <rect x="548.2" y="1042.5" width="111.8" height="55" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="604.1" y="1053">Evaluate choices</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="604.1" y="1070">against</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="604.1" y="1087">[OPA bundle]</text>
      <text className="fill-ink font-sans" fontSize="13" textAnchor="start" dominantBaseline="middle" x="120" y="1230" fontWeight="600">Key</text>
      <circle cx="167" cy="1226" r="4" className="fill-page stroke-ink" strokeWidth="1.5" />
      <rect x="158" y="1231" width="18" height="8" rx="4" className="fill-page stroke-ink" strokeWidth="1.5" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="start" dominantBaseline="middle" x="184" y="1230">Person</text>
      <rect x="245" y="1223" width="22" height="14" rx="3" className="fill-accent-soft stroke-accent" strokeWidth="1.5" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="start" dominantBaseline="middle" x="273" y="1230">Container</text>
      <rect x="350.9" y="1223" width="22" height="14" rx="3" className="fill-chip stroke-strong" strokeWidth="1.5" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="start" dominantBaseline="middle" x="378.9" y="1230">External system</text>
      <rect x="494.8" y="1223" width="22" height="14" rx="3" className="fill-none stroke-muted" strokeWidth="1.5" strokeDasharray="4 3" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="start" dominantBaseline="middle" x="522.8" y="1230">Boundary</text>
      <rect x="22" y="991" width="211.5" height="40" rx="3" className="fill-panel" />
      <text className="fill-ink font-sans" fontSize="14" textAnchor="start" dominantBaseline="middle" x="26" y="1002" fontWeight="600">Architecture as Code Platform</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="start" dominantBaseline="middle" x="26" y="1020">[Software System]</text>
    </>
  )
}

function C4ComponentMcp() {
  return (
    <>
      <defs>
        <marker id="fig-c4-component-mcp-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" markerUnits="userSpaceOnUse" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" className="fill-muted" />
        </marker>
      </defs>
      <rect x="40" y="14" width="190" height="86" rx="6" className="fill-chip stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="135" y="36" fontWeight="600">AI Coding Assistant</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="135" y="55">[Software System]</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="135" y="79">Launched from the IDE</text>
      <rect x="12" y="162" width="696" height="656" rx="10" className="fill-none stroke-muted" strokeWidth="1.5" strokeDasharray="6 4" />
      <rect x="40" y="210" width="190" height="116" rx="6" className="fill-accent-soft stroke-accent" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="135" y="229" fontWeight="600">Entry point</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="135" y="248">[Component:</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="135" y="266">bin/aac-mcp.ts]</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="135" y="290">Parses --root, connects</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="135" y="308">the stdio transport</text>
      <rect x="380" y="210" width="220" height="116" rx="6" className="fill-accent-soft stroke-accent" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="490" y="238" fontWeight="600">Server factory</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="490" y="257">[Component: server.ts]</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="490" y="281">createServer() registers</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="490" y="299">resources, tools, prompts</text>
      <rect x="40" y="420" width="176" height="146" rx="6" className="fill-accent-soft stroke-accent" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="128" y="436" fontWeight="600">Resources</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="128" y="455">[Component:</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="128" y="473">resources/]</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="128" y="497">10 aac:// URIs:</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="128" y="515">systems, standards,</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="128" y="533">waivers, patterns,</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="128" y="551">schemas</text>
      <rect x="232" y="420" width="214" height="146" rx="6" className="fill-accent-soft stroke-accent" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="339" y="455.5" fontWeight="600">Tools</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="339" y="474.5">[Component: tools/]</text>
      <text className="fill-body font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="339" y="498">validate_architecture</text>
      <text className="fill-body font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="339" y="515">lint_compliance (5 rules)</text>
      <text className="fill-body font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="339" y="532">scaffold_waiver</text>
      <rect x="462" y="420" width="236" height="146" rx="6" className="fill-accent-soft stroke-accent" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="580" y="464" fontWeight="600">Prompts</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="580" y="483">[Component: prompts/]</text>
      <text className="fill-body font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="580" y="506.5">design_new_system</text>
      <text className="fill-body font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="580" y="523.5">request_architecture_exception</text>
      <rect x="40" y="680" width="176" height="120" rx="6" className="fill-accent-soft stroke-accent" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="128" y="701" fontWeight="600">Repo resolver</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="128" y="720">[Component:</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="128" y="738">lib/repo-resolver.ts]</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="128" y="762">Finds the root; reads</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="128" y="780">YAML, writes text</text>
      <rect x="232" y="680" width="214" height="120" rx="6" className="fill-accent-soft stroke-accent" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="339" y="701" fontWeight="600">Schema loader</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="339" y="720">[Component:</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="339" y="738">lib/schema-loader.ts]</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="339" y="762">loadSchema() for system,</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="339" y="780">pattern, standard, waiver</text>
      <rect x="462" y="680" width="236" height="120" rx="6" className="fill-accent-soft stroke-accent" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="580" y="701" fontWeight="600">Validator</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="580" y="720">[Component: lib/validator.ts,</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="580" y="738">AJV]</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="580" y="762">Draft-07 and 2020-12</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="580" y="780">validation; detects schema type</text>
      <rect x="40" y="896" width="406" height="70" rx="6" className="fill-chip stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="243" y="922" fontWeight="600">Architecture Repository</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="243" y="941">[Container: local clone of the Git monorepo]</text>
      <path d="M135 100 L135 206" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-component-mcp-arrow)" />
      <rect x="66.9" y="103.5" width="136.1" height="55" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="135" y="114">Calls tools and reads</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="135" y="131">resources over</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="135" y="148">[MCP over stdio]</text>
      <path d="M230 268 L376 268" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-component-mcp-arrow)" />
      <rect x="239.9" y="225" width="126.2" height="38" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="303" y="235.5">Creates the server</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="303" y="252.5">with createServer()</text>
      <path d="M40 300 L26 300 L26 740 L36 740" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-component-mcp-arrow)" />
      <rect x="30" y="353" width="151.2" height="38" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="105.6" y="363.5">Resolves the repo root</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="105.6" y="380.5">with resolveRepoRoot()</text>
      <path d="M420 326 L150 416" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-component-mcp-arrow)" />
      <rect x="237.4" y="365.5" width="65.2" height="21" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="270" y="376">Registers</text>
      <path d="M470 326 L380 416" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-component-mcp-arrow)" />
      <rect x="381.4" y="369.5" width="65.2" height="21" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="414" y="380">Registers</text>
      <path d="M560 326 L580 416" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-component-mcp-arrow)" />
      <rect x="539.4" y="359.5" width="65.2" height="21" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="572" y="370">Registers</text>
      <path d="M80 566 L80 676" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-component-mcp-arrow)" />
      <rect x="37.2" y="585" width="85.6" height="38" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="80" y="595.5">Reads YAML</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="80" y="612.5">with</text>
      <path d="M176 566 L330 676" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-component-mcp-arrow)" />
      <path d="M290 566 L150 676" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-component-mcp-arrow)" />
      <rect x="119.1" y="623" width="113.7" height="38" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="176" y="633.5">Reads and writes</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="176" y="650.5">files with</text>
      <rect x="234.8" y="619" width="92.5" height="38" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="281" y="629.5">Loads</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="281" y="646.5">schemas with</text>
      <path d="M400 566 L400 676" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-component-mcp-arrow)" />
      <rect x="361.8" y="602" width="92.5" height="38" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="408" y="612.5">Loads</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="408" y="629.5">schemas with</text>
      <path d="M446 566 L540 676" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-component-mcp-arrow)" />
      <rect x="493.6" y="610.5" width="132.7" height="21" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="560" y="621">Validates YAML with</text>
      <path d="M110 800 L110 892" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-component-mcp-arrow)" />
      <rect x="114" y="837" width="130.5" height="38" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="179.3" y="847.5">Reads and writes</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="179.3" y="864.5">files in [File system]</text>
      <path d="M340 800 L340 892" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-component-mcp-arrow)" />
      <rect x="344" y="837" width="136.6" height="38" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="412.3" y="847.5">Reads schema/*.json</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="412.3" y="864.5">[File system]</text>
      <text className="fill-ink font-sans" fontSize="13" textAnchor="start" dominantBaseline="middle" x="230" y="990" fontWeight="600">Key</text>
      <rect x="266" y="983" width="22" height="14" rx="3" className="fill-accent-soft stroke-accent" strokeWidth="1.5" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="start" dominantBaseline="middle" x="294" y="990">Component</text>
      <rect x="383.6" y="983" width="22" height="14" rx="3" className="fill-chip stroke-strong" strokeWidth="1.5" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="start" dominantBaseline="middle" x="411.6" y="990">Outside this container</text>
      <rect x="564" y="983" width="22" height="14" rx="3" className="fill-none stroke-muted" strokeWidth="1.5" strokeDasharray="4 3" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="start" dominantBaseline="middle" x="592" y="990">Boundary</text>
      <rect x="341.3" y="171" width="356.7" height="22" rx="3" className="fill-panel" />
      <text className="fill-ink font-sans" fontSize="14" textAnchor="start" dominantBaseline="middle" x="345.3" y="182" fontWeight="600">MCP Server</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="start" dominantBaseline="middle" x="432" y="182">[Container: TypeScript, MCP SDK, AJV]</text>
    </>
  )
}

function C4ComponentWeb() {
  return (
    <>
      <defs>
        <marker id="fig-c4-component-web-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" markerUnits="userSpaceOnUse" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" className="fill-muted" />
        </marker>
      </defs>
      <rect x="150" y="46" width="190" height="100" rx="18" className="fill-page stroke-ink" strokeWidth="1.5" />
      <circle cx="245" cy="33" r="17" className="fill-page stroke-ink" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="245" y="78" fontWeight="600">Enterprise Architect</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="245" y="97">[Person]</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="245" y="121">Designs and reviews</text>
      <rect x="356" y="46" width="170" height="100" rx="18" className="fill-page stroke-ink" strokeWidth="1.5" />
      <circle cx="441" cy="33" r="17" className="fill-page stroke-ink" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="441" y="68" fontWeight="600">Technology</text>
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="441" y="88" fontWeight="600">Leader</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="441" y="107">[Person]</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="441" y="131">Reads the scorecard</text>
      <rect x="540" y="30" width="156" height="96" rx="6" className="fill-chip stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="618" y="59" fontWeight="600">Architecture</text>
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="618" y="79" fontWeight="600">Repository</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="618" y="98">[Container]</text>
      <rect x="12" y="196" width="696" height="836" rx="10" className="fill-none stroke-muted" strokeWidth="1.5" strokeDasharray="6 4" />
      <rect x="200" y="244" width="318" height="92" rx="6" className="fill-accent-soft stroke-accent" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="359" y="269.5" fontWeight="600">App Router pages</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="359" y="288.5">[Component: server components]</text>
      <text className="fill-body font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="359" y="312">/, /dashboard, /systems/[id]</text>
      <rect x="32" y="410" width="150" height="128" rx="6" className="fill-accent-soft stroke-accent" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="107" y="426" fontWeight="600">Metrics</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="107" y="445">[Component:</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="107" y="463">lib/metrics]</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="107" y="487">Computes the</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="107" y="505">executive</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="107" y="523">scorecard</text>
      <rect x="200" y="410" width="150" height="128" rx="6" className="fill-accent-soft stroke-accent" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="275" y="435" fontWeight="600">YAML editor</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="275" y="454">[Component:</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="275" y="472">Monaco]</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="275" y="496">Edits the system</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="275" y="514">YAML</text>
      <rect x="368" y="410" width="150" height="128" rx="6" className="fill-accent-soft stroke-accent" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="443" y="425" fontWeight="600">Canvas and</text>
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="443" y="445" fontWeight="600">toolbar</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="443" y="464">[Component:</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="443" y="482">React Flow]</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="443" y="506">6 C4 node types;</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="443" y="524">Draw.io download</text>
      <rect x="536" y="410" width="150" height="128" rx="6" className="fill-accent-soft stroke-accent" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="611" y="427.5" fontWeight="600">Model loaders</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="611" y="446.5">[Component:</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="611" y="464.5">lib/model]</text>
      <text className="fill-body font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="611" y="488">loadSystems,</text>
      <text className="fill-body font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="611" y="505">loadStandards,</text>
      <text className="fill-body font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="611" y="522">loadWaivers</text>
      <rect x="200" y="646" width="150" height="116" rx="6" className="fill-accent-soft stroke-accent" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="275" y="665" fontWeight="600">Graph store</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="275" y="684">[Component:</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="275" y="702">Zustand]</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="275" y="726">Holds YAML,</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="275" y="744">nodes, edges</text>
      <rect x="368" y="646" width="150" height="116" rx="6" className="fill-accent-soft stroke-accent" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="443" y="674.5" fontWeight="600">View filter</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="443" y="693.5">[Component:</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="443" y="711.5">lib/graph]</text>
      <text className="fill-body font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="443" y="735">filterGraphByView</text>
      <rect x="536" y="646" width="150" height="116" rx="6" className="fill-accent-soft stroke-accent" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="611" y="666" fontWeight="600">Export</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="611" y="685">[Component:</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="611" y="703">lib/export]</text>
      <text className="fill-body font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="611" y="726.5">exportToDrawioXml,</text>
      <text className="fill-body font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="611" y="743.5">exportToPlantUml</text>
      <rect x="32" y="862" width="150" height="126" rx="6" className="fill-accent-soft stroke-accent" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="107" y="886" fontWeight="600">Validation</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="107" y="905">[Component:</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="107" y="923">lib/validation, Zod]</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="107" y="947">Schemas and</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="107" y="965">reference checks</text>
      <rect x="200" y="862" width="150" height="126" rx="6" className="fill-accent-soft stroke-accent" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="275" y="878.5" fontWeight="600">Parser</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="275" y="897.5">[Component:</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="275" y="915.5">lib/parser]</text>
      <text className="fill-body font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="275" y="939">yamlToGraph,</text>
      <text className="fill-body font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="275" y="956">graphToYaml,</text>
      <text className="fill-body font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="275" y="973">extractViews</text>
      <rect x="368" y="862" width="150" height="126" rx="6" className="fill-accent-soft stroke-accent" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="443" y="895.5" fontWeight="600">Layout</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="443" y="914.5">[Component:</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="443" y="932.5">lib/layout]</text>
      <text className="fill-body font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="443" y="956">applyDagreLayout</text>
      <rect x="536" y="1076" width="160" height="84" rx="6" className="fill-chip stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="616" y="1099" fontWeight="600">Governance</text>
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="616" y="1119" fontWeight="600">Pipeline</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="616" y="1138">[Container]</text>
      <path d="M262 146 L262 240" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-component-web-arrow)" />
      <rect x="178.6" y="152" width="166.8" height="38" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="262" y="162.5">Designs systems, reviews</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="262" y="179.5">compliance in [HTTPS]</text>
      <path d="M445 146 L445 240" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-component-web-arrow)" />
      <rect x="377.7" y="152" width="134.7" height="38" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="445" y="162.5">Reads the scorecard</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="445" y="179.5">in [HTTPS]</text>
      <path d="M218 336 L120 406" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-component-web-arrow)" />
      <rect x="100.4" y="351" width="99.2" height="38" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="150" y="361.5">Computes the</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="150" y="378.5">scorecard with</text>
      <path d="M275 336 L275 406" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-component-web-arrow)" />
      <rect x="245.6" y="361.5" width="58.7" height="21" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="275" y="372">Renders</text>
      <path d="M443 336 L443 406" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-component-web-arrow)" />
      <rect x="413.6" y="361.5" width="58.7" height="21" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="443" y="372">Renders</text>
      <path d="M500 336 L572 406" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-component-web-arrow)" />
      <rect x="476.4" y="361.5" width="123.2" height="21" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="538" y="372">Loads models with</text>
      <path d="M650 406 L650 130" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-component-web-arrow)" />
      <rect x="552.4" y="268.5" width="139.3" height="55" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="622" y="279">Reads YAML at</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="622" y="296">build time from</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="622" y="313">[File system, js-yaml]</text>
      <path d="M275 538 L275 642" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-component-web-arrow)" />
      <rect x="215" y="553" width="120" height="38" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="275" y="563.5">updateFromYaml()</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="275" y="580.5">[debounced]</text>
      <path d="M392 538 L334 642" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-component-web-arrow)" />
      <rect x="281.5" y="591" width="136.9" height="38" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="350" y="601.5">updateFromCanvas()</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="350" y="618.5">on drag, connect</text>
      <path d="M443 538 L443 642" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-component-web-arrow)" />
      <rect x="404.4" y="553" width="87.2" height="38" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="448" y="563.5">Filters nodes</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="448" y="580.5">with</text>
      <path d="M500 538 L572 642" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-component-web-arrow)" />
      <rect x="503" y="591" width="126.1" height="38" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="566" y="601.5">Downloads Draw.io</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="566" y="618.5">XML with</text>
      <path d="M220 762 L120 858" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-component-web-arrow)" />
      <rect x="83.6" y="773.5" width="132.7" height="21" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="150" y="784">Validates YAML with</text>
      <path d="M275 762 L275 858" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-component-web-arrow)" />
      <rect x="223.5" y="803" width="103.1" height="38" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="275" y="813.5">Converts YAML</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="275" y="830.5">and graph with</text>
      <path d="M330 762 L430 858" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-component-web-arrow)" />
      <rect x="316.5" y="773.5" width="130.9" height="21" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="382" y="784">Lays out nodes with</text>
      <path d="M611 1076 L611 766" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-component-web-arrow)" />
      <rect x="547.6" y="844" width="126.8" height="72" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="611" y="854.5">Renders diagrams</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="611" y="871.5">with export, parser,</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="611" y="888.5">layout, view filter</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="611" y="905.5">[build-diagrams.ts]</text>
      <text className="fill-ink font-sans" fontSize="13" textAnchor="start" dominantBaseline="middle" x="160" y="1190" fontWeight="600">Key</text>
      <circle cx="207" cy="1186" r="4" className="fill-page stroke-ink" strokeWidth="1.5" />
      <rect x="198" y="1191" width="18" height="8" rx="4" className="fill-page stroke-ink" strokeWidth="1.5" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="start" dominantBaseline="middle" x="224" y="1190">Person</text>
      <rect x="285" y="1183" width="22" height="14" rx="3" className="fill-accent-soft stroke-accent" strokeWidth="1.5" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="start" dominantBaseline="middle" x="313" y="1190">Component</text>
      <rect x="402.7" y="1183" width="22" height="14" rx="3" className="fill-chip stroke-strong" strokeWidth="1.5" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="start" dominantBaseline="middle" x="430.7" y="1190">Outside this container</text>
      <rect x="583.1" y="1183" width="22" height="14" rx="3" className="fill-none stroke-muted" strokeWidth="1.5" strokeDasharray="4 3" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="start" dominantBaseline="middle" x="611.1" y="1190">Boundary</text>
      <rect x="22" y="1001" width="464.4" height="22" rx="3" className="fill-panel" />
      <text className="fill-ink font-sans" fontSize="14" textAnchor="start" dominantBaseline="middle" x="26" y="1012" fontWeight="600">Web Dashboard and Diagram Editor</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="start" dominantBaseline="middle" x="272.3" y="1012">[Container: Next.js 16, React 19]</text>
    </>
  )
}

function C4CodeSync() {
  return (
    <>
      <defs>
        <marker id="fig-c4-code-sync-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" markerUnits="userSpaceOnUse" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" className="fill-muted" />
        </marker>
      </defs>
      <rect x="16" y="20" width="236" height="76" rx="6" className="fill-accent-soft stroke-accent" strokeWidth="1.5" />
      <text className="fill-ink font-mono" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="134" y="49" fontWeight="600">EditorPane</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="134" y="68">[Component: Monaco YAML editor]</text>
      <rect x="468" y="20" width="236" height="76" rx="6" className="fill-accent-soft stroke-accent" strokeWidth="1.5" />
      <text className="fill-ink font-mono" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="586" y="49" fontWeight="600">CanvasPane</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="586" y="68">[Component: React Flow canvas]</text>
      <rect x="16" y="150" width="236" height="112" rx="6" className="fill-page stroke-accent" strokeWidth="1.5" />
      <text className="fill-ink font-mono" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="134" y="168" fontWeight="600">updateFromYaml(text)</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="134" y="187">[store action]</text>
      <text className="fill-accent font-mono" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="134" y="209" fontWeight="600">if syncSource === &apos;canvas&apos;</text>
      <text className="fill-accent font-mono" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="134" y="227" fontWeight="600">return</text>
      <text className="fill-body font-mono" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="134" y="245">syncSource = &apos;yaml&apos;</text>
      <rect x="468" y="150" width="236" height="112" rx="6" className="fill-page stroke-accent" strokeWidth="1.5" />
      <text className="fill-ink font-mono" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="586" y="168" fontWeight="600">updateFromCanvas()</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="586" y="187">[store action]</text>
      <text className="fill-accent font-mono" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="586" y="209" fontWeight="600">if syncSource === &apos;yaml&apos;</text>
      <text className="fill-accent font-mono" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="586" y="227" fontWeight="600">return</text>
      <text className="fill-body font-mono" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="586" y="245">syncSource = &apos;canvas&apos;</text>
      <rect x="28" y="306" width="212" height="90" rx="6" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-mono" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="134" y="322" fontWeight="600">validateYamlContent</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="134" y="341">[lib/validation, Zod]</text>
      <text className="fill-body font-mono" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="134" y="363">invalid: set parseError,</text>
      <text className="fill-body font-mono" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="134" y="381">keep the last graph</text>
      <rect x="38" y="420" width="192" height="52" rx="6" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-mono" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="134" y="437" fontWeight="600">yamlToGraph</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="134" y="456">[lib/parser]</text>
      <rect x="38" y="502" width="192" height="52" rx="6" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-mono" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="134" y="519" fontWeight="600">applyDagreLayout</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="134" y="538">[lib/layout]</text>
      <rect x="490" y="306" width="192" height="52" rx="6" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-mono" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="586" y="323" fontWeight="600">graphToYaml</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="586" y="342">[lib/parser]</text>
      <rect x="282" y="330" width="176" height="52" rx="6" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-mono" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="370" y="347" fontWeight="600">filterGraphByView</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="370" y="366">[lib/graph]</text>
      <rect x="16" y="640" width="688" height="116" rx="6" className="fill-accent-soft stroke-accent" strokeWidth="2" />
      <text className="fill-ink font-mono" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="360" y="662" fontWeight="600">useGraphStore</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="360" y="684">[Zustand store: src/store/use-graph-store.ts]</text>
      <rect x="30" y="704" width="74.6" height="30" rx="4" className="fill-page stroke-line" strokeWidth="1.5" />
      <text className="fill-body font-mono" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="67.3" y="719">yamlText</text>
      <rect x="110.6" y="704" width="66.8" height="30" rx="4" className="fill-page stroke-line" strokeWidth="1.5" />
      <text className="fill-body font-mono" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="144" y="719">nodes[]</text>
      <rect x="183.4" y="704" width="66.8" height="30" rx="4" className="fill-page stroke-line" strokeWidth="1.5" />
      <text className="fill-body font-mono" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="216.8" y="719">edges[]</text>
      <rect x="256.2" y="704" width="90.3" height="30" rx="4" className="fill-page stroke-accent" strokeWidth="2" />
      <text className="fill-accent font-mono" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="301.3" y="719" fontWeight="600">syncSource</text>
      <rect x="352.4" y="704" width="90.3" height="30" rx="4" className="fill-page stroke-line" strokeWidth="1.5" />
      <text className="fill-body font-mono" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="397.6" y="719">parseError</text>
      <rect x="448.7" y="704" width="113.7" height="30" rx="4" className="fill-page stroke-line" strokeWidth="1.5" />
      <text className="fill-body font-mono" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="505.6" y="719">activeViewKey</text>
      <rect x="568.4" y="704" width="121.6" height="30" rx="4" className="fill-page stroke-line" strokeWidth="1.5" />
      <text className="fill-body font-mono" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="629.2" y="719">availableViews</text>
      <path d="M134 96 L134 146" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-code-sync-arrow)" />
      <rect x="138" y="102" width="77.6" height="38" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="176.8" y="112.5">onChange,</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="176.8" y="129.5">debounced</text>
      <path d="M134 262 L134 302" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-code-sync-arrow)" />
      <path d="M134 396 L134 416" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-code-sync-arrow)" />
      <path d="M134 472 L134 498" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-code-sync-arrow)" />
      <path d="M134 554 L134 636" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-code-sync-arrow)" />
      <rect x="74.8" y="577" width="118.4" height="38" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="134" y="587.5">set nodes, edges;</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="134" y="604.5">syncSource = null</text>
      <path d="M586 96 L586 146" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-code-sync-arrow)" />
      <rect x="392.8" y="110.5" width="189.2" height="21" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="487.4" y="121">onNodeDragStop, onConnect</text>
      <path d="M586 262 L586 302" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-code-sync-arrow)" />
      <path d="M586 358 L586 636" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-code-sync-arrow)" />
      <rect x="526.8" y="481" width="118.4" height="38" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="586" y="491.5">set yamlText;</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="586" y="508.5">syncSource = null</text>
      <path d="M266 640 L266 58 L256 58" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-code-sync-arrow)" />
      <rect x="234.3" y="265" width="63.3" height="38" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="266" y="275.5">value =</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="266" y="292.5">yamlText</text>
      <path d="M370 640 L370 386" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-code-sync-arrow)" />
      <rect x="326.1" y="493" width="87.8" height="38" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="370" y="503.5">reads nodes,</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="370" y="520.5">edges</text>
      <path d="M370 330 L370 70 L464 70" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-code-sync-arrow)" />
      <rect x="331.6" y="181" width="76.9" height="38" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="370" y="191.5">filtered by</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="370" y="208.5">active view</text>
      <text className="fill-ink font-sans" fontSize="13" textAnchor="start" dominantBaseline="middle" x="150" y="784" fontWeight="600">Key</text>
      <rect x="186" y="777" width="22" height="14" rx="3" className="fill-accent-soft stroke-accent" strokeWidth="1.5" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="start" dominantBaseline="middle" x="214" y="784">Component</text>
      <rect x="303.6" y="777" width="22" height="14" rx="3" className="fill-page stroke-accent" strokeWidth="1.5" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="start" dominantBaseline="middle" x="331.6" y="784">Store action</text>
      <rect x="423.4" y="777" width="22" height="14" rx="3" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="start" dominantBaseline="middle" x="451.4" y="784">Function or module</text>
    </>
  )
}

function C4Deployment() {
  return (
    <>
      <defs>
        <marker id="fig-c4-deployment-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" markerUnits="userSpaceOnUse" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" className="fill-muted" />
        </marker>
      </defs>
      <rect x="12" y="16" width="696" height="584" rx="10" className="fill-none stroke-muted" strokeWidth="1.5" strokeDasharray="6 4" />
      <rect x="340" y="52" width="352" height="128" rx="10" className="fill-none stroke-muted" strokeWidth="1.5" strokeDasharray="6 4" />
      <rect x="400" y="94" width="276" height="70" rx="6" className="fill-accent-soft stroke-accent" strokeWidth="2" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="538" y="120" fontWeight="600">Documentation Microsite</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="538" y="139">[Container: Static HTML]</text>
      <rect x="28" y="236" width="664" height="164" rx="10" className="fill-none stroke-muted" strokeWidth="1.5" strokeDasharray="6 4" />
      <rect x="60" y="252" width="200" height="100" rx="6" className="fill-accent-soft stroke-accent" strokeWidth="2" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="160" y="293" fontWeight="600">Policy Engine</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="160" y="312">[Container: OPA, Rego]</text>
      <rect x="420" y="252" width="256" height="100" rx="6" className="fill-accent-soft stroke-accent" strokeWidth="2" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="548" y="293" fontWeight="600">Governance Pipeline</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="548" y="312">[Container: GitHub Actions, 9 jobs]</text>
      <rect x="28" y="436" width="664" height="148" rx="10" className="fill-none stroke-muted" strokeWidth="1.5" strokeDasharray="6 4" />
      <rect x="120" y="476" width="540" height="76" rx="6" className="fill-accent-soft stroke-accent" strokeWidth="2" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="390" y="505" fontWeight="600">Architecture Repository</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="390" y="524">[Container: Git monorepo, YAML, JSON Schema 2020-12]</text>
      <rect x="12" y="680" width="300" height="220" rx="10" className="fill-none stroke-muted" strokeWidth="1.5" strokeDasharray="6 4" />
      <rect x="28" y="696" width="268" height="144" rx="10" className="fill-none stroke-muted" strokeWidth="1.5" strokeDasharray="6 4" />
      <rect x="44" y="712" width="236" height="74" rx="6" className="fill-accent-soft stroke-accent" strokeWidth="2" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="162" y="730" fontWeight="600">Web Dashboard and</text>
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="162" y="750" fontWeight="600">Diagram Editor</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="162" y="769">[Container: Next.js 16]</text>
      <rect x="332" y="680" width="376" height="220" rx="10" className="fill-none stroke-muted" strokeWidth="1.5" strokeDasharray="6 4" />
      <rect x="348" y="696" width="344" height="144" rx="10" className="fill-none stroke-muted" strokeWidth="1.5" strokeDasharray="6 4" />
      <rect x="364" y="712" width="150" height="74" rx="6" className="fill-accent-soft stroke-accent" strokeWidth="2" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="439" y="740" fontWeight="600">aac CLI</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="439" y="759">[Container]</text>
      <rect x="530" y="712" width="146" height="74" rx="6" className="fill-accent-soft stroke-accent" strokeWidth="2" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="603" y="740" fontWeight="600">MCP Server</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="603" y="759">[Container: stdio]</text>
      <path d="M420 330 L264 330" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-deployment-arrow)" />
      <rect x="281" y="256.5" width="122" height="55" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="342" y="267">Formats, compiles</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="342" y="284">and unit-tests with</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="342" y="301">[OPA CLI]</text>
      <path d="M560 252 L560 168" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-deployment-arrow)" />
      <rect x="476.6" y="189" width="166.8" height="38" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="560" y="199.5">Generates and publishes</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="560" y="216.5">[Asciidoctor.js, gh-pages]</text>
      <path d="M620 476 L620 356" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-deployment-arrow)" />
      <rect x="441.3" y="407.5" width="174.7" height="21" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="528.6" y="418">Triggers [GitHub webhook]</text>
      <path d="M156 712 L156 556" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-deployment-arrow)" />
      <rect x="81.4" y="621" width="149.2" height="38" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="156" y="631.5">Loads models at build</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="156" y="648.5">time from [File system]</text>
      <path d="M440 712 L440 556" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-deployment-arrow)" />
      <rect x="361.4" y="621" width="157.3" height="38" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="440" y="631.5">Fetches published</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="440" y="648.5">schemas [HTTPS, ETag]</text>
      <path d="M604 712 L604 556" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-deployment-arrow)" />
      <rect x="540.6" y="621" width="126.9" height="38" rx="3" className="fill-panel" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="604" y="631.5">Reads a local clone</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="604" y="648.5">of [File system]</text>
      <text className="fill-ink font-sans" fontSize="13" textAnchor="start" dominantBaseline="middle" x="200" y="944" fontWeight="600">Key</text>
      <rect x="236" y="937" width="22" height="14" rx="3" className="fill-accent-soft stroke-accent" strokeWidth="1.5" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="start" dominantBaseline="middle" x="264" y="944">Container</text>
      <rect x="341.9" y="937" width="22" height="14" rx="3" className="fill-none stroke-muted" strokeWidth="1.5" strokeDasharray="4 3" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="start" dominantBaseline="middle" x="369.9" y="944">Deployment node</text>
      <rect x="22" y="25" width="149.4" height="22" rx="3" className="fill-panel" />
      <text className="fill-ink font-sans" fontSize="14" textAnchor="start" dominantBaseline="middle" x="26" y="36" fontWeight="600">GitHub</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="start" dominantBaseline="middle" x="78.9" y="36">[GitHub.com]</text>
      <rect x="350" y="61" width="327.1" height="22" rx="3" className="fill-panel" />
      <text className="fill-ink font-sans" fontSize="14" textAnchor="start" dominantBaseline="middle" x="354" y="72" fontWeight="600">GitHub Pages</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="start" dominantBaseline="middle" x="452.1" y="72">[static hosting, gh-pages branch]</text>
      <rect x="38" y="369" width="378" height="22" rx="3" className="fill-panel" />
      <text className="fill-ink font-sans" fontSize="14" textAnchor="start" dominantBaseline="middle" x="42" y="380" fontWeight="600">GitHub Actions Runners</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="start" dominantBaseline="middle" x="209.8" y="380">[ubuntu-latest hosted runners]</text>
      <rect x="38" y="445" width="213.5" height="22" rx="3" className="fill-panel" />
      <text className="fill-ink font-sans" fontSize="14" textAnchor="start" dominantBaseline="middle" x="42" y="456" fontWeight="600">muthub-ai/aac</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="start" dominantBaseline="middle" x="147.8" y="456">[Git repository]</text>
      <rect x="22" y="851" width="144.7" height="40" rx="3" className="fill-panel" />
      <text className="fill-ink font-sans" fontSize="14" textAnchor="start" dominantBaseline="middle" x="26" y="862" fontWeight="600">Vercel</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="start" dominantBaseline="middle" x="26" y="880">[Vercel edge network]</text>
      <rect x="38" y="791" width="234.1" height="40" rx="3" className="fill-panel" />
      <text className="fill-ink font-sans" fontSize="14" textAnchor="start" dominantBaseline="middle" x="42" y="802" fontWeight="600">Vercel Project (aac.muthub.org)</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="start" dominantBaseline="middle" x="42" y="820">[Next.js serverless and static output]</text>
      <rect x="342" y="851" width="178.9" height="40" rx="3" className="fill-panel" />
      <text className="fill-ink font-sans" fontSize="14" textAnchor="start" dominantBaseline="middle" x="346" y="862" fontWeight="600">Engineer Workstation</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="start" dominantBaseline="middle" x="346" y="880">[macOS, Linux or Windows]</text>
      <rect x="358" y="791" width="140.3" height="40" rx="3" className="fill-panel" />
      <text className="fill-ink font-sans" fontSize="14" textAnchor="start" dominantBaseline="middle" x="362" y="802" fontWeight="600">Node.js 22 Runtime</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="start" dominantBaseline="middle" x="362" y="820">[Node.js]</text>
    </>
  )
}

function C4DynamicChange() {
  return (
    <>
      <defs>
        <marker id="fig-c4-dynamic-change-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" markerUnits="userSpaceOnUse" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" className="fill-muted" />
        </marker>
      </defs>
      <rect x="16" y="48" width="180" height="84" rx="18" className="fill-page stroke-ink" strokeWidth="1.5" />
      <circle cx="106" cy="35" r="17" className="fill-page stroke-ink" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="106" y="74" fontWeight="600">Application</text>
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="106" y="94" fontWeight="600">Engineer</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="106" y="113">[Person]</text>
      <rect x="268" y="34" width="184" height="98" rx="6" className="fill-chip stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="360" y="62" fontWeight="600">AI Coding Assistant</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="360" y="81">[Software System]</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="360" y="105">Agent in the IDE</text>
      <rect x="524" y="48" width="180" height="84" rx="18" className="fill-page stroke-ink" strokeWidth="1.5" />
      <circle cx="614" cy="35" r="17" className="fill-page stroke-ink" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="614" y="84" fontWeight="600">Enterprise Architect</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="614" y="103">[Person]</text>
      <rect x="16" y="214" width="160" height="76" rx="6" className="fill-accent-soft stroke-accent" strokeWidth="2" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="96" y="243" fontWeight="600">aac CLI</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="96" y="262">[Container]</text>
      <rect x="268" y="214" width="184" height="76" rx="6" className="fill-accent-soft stroke-accent" strokeWidth="2" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="360" y="243" fontWeight="600">MCP Server</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="360" y="262">[Container]</text>
      <rect x="186" y="370" width="290" height="80" rx="6" className="fill-accent-soft stroke-accent" strokeWidth="2" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="331" y="401" fontWeight="600">Architecture Repository</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="331" y="420">[Container: Git monorepo]</text>
      <rect x="576" y="370" width="128" height="80" rx="6" className="fill-accent-soft stroke-accent" strokeWidth="2" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="640" y="391" fontWeight="600">Web</text>
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="640" y="411" fontWeight="600">Dashboard</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="640" y="430">[Container]</text>
      <rect x="16" y="524" width="688" height="240" rx="10" className="fill-none stroke-muted" strokeWidth="1.5" strokeDasharray="6 4" />
      <rect x="34" y="598" width="150" height="92" rx="6" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="109" y="614" fontWeight="600">Lint &amp; Test</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="109" y="633">[Job]</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="109" y="657">ESLint, 436 Vitest</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="109" y="675">tests</text>
      <rect x="244" y="566" width="236" height="176" rx="6" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="362" y="591" fontWeight="600">Five parallel stages</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="362" y="610">[Jobs]</text>
      <text className="fill-body font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="362" y="633.5">App Architecture: schema</text>
      <text className="fill-body font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="362" y="650.5">validation, 5 compliance rules,</text>
      <text className="fill-body font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="362" y="667.5">diagrams, docs</text>
      <text className="fill-body font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="362" y="684.5">Patterns, Standards, Waivers:</text>
      <text className="fill-body font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="362" y="701.5">validation and catalog pages</text>
      <text className="fill-body font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="362" y="718.5">Policies: opa fmt, check, test</text>
      <rect x="540" y="598" width="148" height="92" rx="6" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="614" y="625" fontWeight="600">Assemble</text>
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="614" y="645" fontWeight="600">microsite</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="614" y="664">[Job]</text>
      <rect x="36" y="870" width="200" height="76" rx="6" className="fill-accent-soft stroke-accent" strokeWidth="2" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="136" y="899" fontWeight="600">Policy Engine</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="136" y="918">[Container: OPA, Rego]</text>
      <rect x="276" y="870" width="190" height="76" rx="6" className="fill-chip stroke-strong" strokeWidth="1.5" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="371" y="887" fontWeight="600">GitHub</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="371" y="906">[Software System]</text>
      <text className="fill-body font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="371" y="930">Pull request</text>
      <rect x="506" y="870" width="198" height="76" rx="6" className="fill-accent-soft stroke-accent" strokeWidth="2" />
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="605" y="889" fontWeight="600">Documentation</text>
      <text className="fill-ink font-sans" fontSize="16" textAnchor="middle" dominantBaseline="middle" x="605" y="909" fontWeight="600">Microsite</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="middle" dominantBaseline="middle" x="605" y="928">[Container: GitHub Pages]</text>
      <path d="M96 132 L96 210" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-dynamic-change-arrow)" />
      <rect x="42.3" y="160.5" width="107.5" height="21" rx="3" className="fill-panel" />
      <circle cx="56.3" cy="171" r="10" className="fill-accent stroke-accent" strokeWidth="1" />
      <text className="fill-page font-sans" fontSize="13" fontWeight="600" textAnchor="middle" dominantBaseline="central" x="56.3" y="171.5">1</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="109" y="171">aac validate</text>
      <path d="M360 132 L360 210" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-dynamic-change-arrow)" />
      <rect x="282" y="152" width="156" height="38" rx="3" className="fill-panel" />
      <circle cx="296" cy="162.5" r="10" className="fill-accent stroke-accent" strokeWidth="1" />
      <text className="fill-page font-sans" fontSize="13" fontWeight="600" textAnchor="middle" dominantBaseline="central" x="296" y="163">1</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="373" y="162.5">design, validate, lint</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="373" y="179.5">through MCP tools</text>
      <path d="M176 132 L236 366" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-dynamic-change-arrow)" />
      <rect x="164.7" y="311" width="110.6" height="38" rx="3" className="fill-panel" />
      <circle cx="178.7" cy="321.5" r="10" className="fill-accent stroke-accent" strokeWidth="1" />
      <text className="fill-page font-sans" fontSize="13" fontWeight="600" textAnchor="middle" dominantBaseline="central" x="178.7" y="322">2</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="233" y="321.5">Opens a pull</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="233" y="338.5">request</text>
      <path d="M560 132 L440 366" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-dynamic-change-arrow)" />
      <rect x="419.9" y="311" width="160.1" height="38" rx="3" className="fill-panel" />
      <circle cx="433.9" cy="321.5" r="10" className="fill-accent stroke-accent" strokeWidth="1" />
      <text className="fill-page font-sans" fontSize="13" fontWeight="600" textAnchor="middle" dominantBaseline="central" x="433.9" y="322">6</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="513" y="321.5">Reviews, or a waiver</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="513" y="338.5">is scaffolded</text>
      <path d="M214 450 L110 594" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-dynamic-change-arrow)" />
      <rect x="104.2" y="468" width="143.5" height="38" rx="3" className="fill-panel" />
      <circle cx="118.2" cy="478.5" r="10" className="fill-accent stroke-accent" strokeWidth="1" />
      <text className="fill-page font-sans" fontSize="13" fontWeight="600" textAnchor="middle" dominantBaseline="central" x="118.2" y="479">3</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="189" y="478.5">Webhook triggers</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="189" y="495.5">the gate</text>
      <path d="M184 644 L240 644" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-dynamic-change-arrow)" />
      <circle cx="212" cy="630" r="10" className="fill-accent stroke-accent" strokeWidth="1" />
      <text className="fill-page font-sans" fontSize="13" fontWeight="600" textAnchor="middle" dominantBaseline="central" x="212" y="630.5">4</text>
      <path d="M480 644 L536 644" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-dynamic-change-arrow)" />
      <path d="M300 742 L150 866" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-dynamic-change-arrow)" />
      <rect x="183.2" y="794.5" width="83.7" height="21" rx="3" className="fill-panel" />
      <circle cx="197.2" cy="805" r="10" className="fill-accent stroke-accent" strokeWidth="1" />
      <text className="fill-page font-sans" fontSize="13" fontWeight="600" textAnchor="middle" dominantBaseline="central" x="197.2" y="805.5">4</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="238" y="805">opa test</text>
      <path d="M580 690 L420 866" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-dynamic-change-arrow)" />
      <rect x="389" y="771" width="153.9" height="38" rx="3" className="fill-panel" />
      <circle cx="403" cy="781.5" r="10" className="fill-accent stroke-accent" strokeWidth="1" />
      <text className="fill-page font-sans" fontSize="13" fontWeight="600" textAnchor="middle" dominantBaseline="central" x="403" y="782">5</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="479" y="781.5">Comments diagram</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="479" y="798.5">previews on the PR</text>
      <path d="M640 690 L640 866" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-dynamic-change-arrow)" />
      <rect x="579" y="801" width="121.9" height="38" rx="3" className="fill-panel" />
      <circle cx="593" cy="811.5" r="10" className="fill-accent stroke-accent" strokeWidth="1" />
      <text className="fill-page font-sans" fontSize="13" fontWeight="600" textAnchor="middle" dominantBaseline="central" x="593" y="812">7</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="653" y="811.5">Publishes on</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="653" y="828.5">merge to main</text>
      <path d="M576 430 L480 430" className="fill-none stroke-muted" strokeWidth="1.5" markerEnd="url(#fig-c4-dynamic-change-arrow)" />
      <circle cx="528" cy="412" r="10" className="fill-accent stroke-accent" strokeWidth="1" />
      <text className="fill-page font-sans" fontSize="13" fontWeight="600" textAnchor="middle" dominantBaseline="central" x="528" y="412.5">7</text>
      <text className="fill-muted font-sans" fontSize="13" textAnchor="middle" dominantBaseline="middle" x="528" y="456">Vercel rebuilds</text>
      <circle cx="30" cy="980" r="10" className="fill-accent stroke-accent" strokeWidth="1" />
      <text className="fill-page font-sans" fontSize="13" fontWeight="600" textAnchor="middle" dominantBaseline="central" x="30" y="980.5">1</text>
      <text className="fill-body font-sans" fontSize="13" textAnchor="start" dominantBaseline="middle" x="48" y="980">Engineer, or an agent through MCP, edits YAML; aac validate checks it against the published schemas.</text>
      <circle cx="30" cy="1003" r="10" className="fill-accent stroke-accent" strokeWidth="1" />
      <text className="fill-page font-sans" fontSize="13" fontWeight="600" textAnchor="middle" dominantBaseline="central" x="30" y="1003.5">2</text>
      <text className="fill-body font-sans" fontSize="13" textAnchor="start" dominantBaseline="middle" x="48" y="1003">Opens a pull request on GitHub, which triggers the pipeline.</text>
      <circle cx="30" cy="1026" r="10" className="fill-accent stroke-accent" strokeWidth="1" />
      <text className="fill-page font-sans" fontSize="13" fontWeight="600" textAnchor="middle" dominantBaseline="central" x="30" y="1026.5">3</text>
      <text className="fill-body font-sans" fontSize="13" textAnchor="start" dominantBaseline="middle" x="48" y="1026">Lint and test gate.</text>
      <circle cx="30" cy="1049" r="10" className="fill-accent stroke-accent" strokeWidth="1" />
      <text className="fill-page font-sans" fontSize="13" fontWeight="600" textAnchor="middle" dominantBaseline="central" x="30" y="1049.5">4</text>
      <text className="fill-body font-sans" fontSize="13" textAnchor="start" dominantBaseline="middle" x="48" y="1049">In parallel: schema validation (JSON Schema and Zod), 5 compliance rules, OPA policy tests, catalog</text>
      <text className="fill-body font-sans" fontSize="13" textAnchor="start" dominantBaseline="middle" x="48" y="1066">pages, diagrams.</text>
      <circle cx="30" cy="1089" r="10" className="fill-accent stroke-accent" strokeWidth="1" />
      <text className="fill-page font-sans" fontSize="13" fontWeight="600" textAnchor="middle" dominantBaseline="central" x="30" y="1089.5">5</text>
      <text className="fill-body font-sans" fontSize="13" textAnchor="start" dominantBaseline="middle" x="48" y="1089">The pipeline comments diagram previews on the pull request.</text>
      <circle cx="30" cy="1112" r="10" className="fill-accent stroke-accent" strokeWidth="1" />
      <text className="fill-page font-sans" fontSize="13" fontWeight="600" textAnchor="middle" dominantBaseline="central" x="30" y="1112.5">6</text>
      <text className="fill-body font-sans" fontSize="13" textAnchor="start" dominantBaseline="middle" x="48" y="1112">An architect reviews, or a waiver is scaffolded with scaffold_waiver (risk, expiry, compensating</text>
      <text className="fill-body font-sans" fontSize="13" textAnchor="start" dominantBaseline="middle" x="48" y="1129">controls).</text>
      <circle cx="30" cy="1152" r="10" className="fill-accent stroke-accent" strokeWidth="1" />
      <text className="fill-page font-sans" fontSize="13" fontWeight="600" textAnchor="middle" dominantBaseline="central" x="30" y="1152.5">7</text>
      <text className="fill-body font-sans" fontSize="13" textAnchor="start" dominantBaseline="middle" x="48" y="1152">Merge to main: the microsite is published to GitHub Pages, and Vercel rebuilds the dashboard.</text>
      <text className="fill-ink font-sans" fontSize="13" textAnchor="start" dominantBaseline="middle" x="130" y="1204" fontWeight="600">Key</text>
      <circle cx="177" cy="1200" r="4" className="fill-page stroke-ink" strokeWidth="1.5" />
      <rect x="168" y="1205" width="18" height="8" rx="4" className="fill-page stroke-ink" strokeWidth="1.5" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="start" dominantBaseline="middle" x="194" y="1204">Person</text>
      <rect x="255" y="1197" width="22" height="14" rx="3" className="fill-accent-soft stroke-accent" strokeWidth="1.5" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="start" dominantBaseline="middle" x="283" y="1204">Container</text>
      <rect x="360.9" y="1197" width="22" height="14" rx="3" className="fill-page stroke-strong" strokeWidth="1.5" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="start" dominantBaseline="middle" x="388.9" y="1204">Pipeline job</text>
      <rect x="478" y="1197" width="22" height="14" rx="3" className="fill-chip stroke-strong" strokeWidth="1.5" />
      <text className="fill-muted font-sans" fontSize="13" textAnchor="start" dominantBaseline="middle" x="506" y="1204">External system</text>
      <rect x="310" y="533" width="384" height="22" rx="3" className="fill-panel" />
      <text className="fill-ink font-sans" fontSize="14" textAnchor="start" dominantBaseline="middle" x="314" y="544" fontWeight="600">Governance Pipeline</text>
      <text className="fill-muted font-sans" fontSize="14" textAnchor="start" dominantBaseline="middle" x="459.7" y="544">[Container: GitHub Actions, 9 jobs]</text>
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
  "c4-context": { height: 836, Body: C4Context },
  "c4-container": { height: 1250, Body: C4Container },
  "c4-component-mcp": { height: 1010, Body: C4ComponentMcp },
  "c4-component-web": { height: 1206, Body: C4ComponentWeb },
  "c4-code-sync": { height: 800, Body: C4CodeSync },
  "c4-deployment": { height: 966, Body: C4Deployment },
  "c4-dynamic-change": { height: 1222, Body: C4DynamicChange },
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
