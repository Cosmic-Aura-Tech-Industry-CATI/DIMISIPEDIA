import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Filter, Layers } from "lucide-react";
import { entities, relationsFor, type Entity } from "@/data/knowledge";

interface GraphNode {
  id: string;
  name: string;
  type: "organization" | "person" | "project" | "technology";
  subtitle: string;
  path: string;
  x: number;
  y: number;
  r: number;
  color: string;
  image?: string;
}

interface GraphLink {
  source: string;
  target: string;
  label: string;
}

export function KnowledgeGraphVisualizer() {
  const [selectedId, setSelectedId] = useState<string>("shikhar-dixit");
  const [activeFilter, setActiveFilter] = useState<"all" | "person" | "project" | "technology">("all");

  const nodes: GraphNode[] = useMemo(() => [
    // Organization (Center Hub)
    {
      id: "dimisi-technologies",
      name: "DIMISI Technologies",
      type: "organization",
      subtitle: "Enterprise IT & Software Co.",
      path: "/dimisi-technologies",
      x: 400,
      y: 250,
      r: 42,
      color: "hsl(var(--primary))",
      image: "/images/dimisi-logo.png",
    },
    // Founders & Leadership (Top Arc)
    {
      id: "shikhar-dixit",
      name: "Shikhar Dixit",
      type: "person",
      subtitle: "Founder & CEO",
      path: "/people/shikhar-dixit",
      x: 230,
      y: 110,
      r: 34,
      color: "#3b82f6",
      image: "/images/shikhar-dixit.png",
    },
    {
      id: "swatantra-singh",
      name: "Swatantra Singh",
      type: "person",
      subtitle: "Co-Founder & CTO",
      path: "/people/swatantra-singh",
      x: 400,
      y: 80,
      r: 32,
      color: "#3b82f6",
      image: "/images/swatantra-singh.png",
    },
    {
      id: "nishkarsh-mishra",
      name: "Nishkarsh Mishra",
      type: "person",
      subtitle: "Co-Founder, COO/CMO",
      path: "/people/nishkarsh-mishra",
      x: 570,
      y: 110,
      r: 32,
      color: "#3b82f6",
      image: "/images/nishkarsh-mishra.png",
    },
    // Core Engineers
    {
      id: "sheelu-singh",
      name: "Sheelu Singh",
      type: "person",
      subtitle: "Android / Flutter Lead",
      path: "/people/sheelu-singh",
      x: 140,
      y: 220,
      r: 28,
      color: "#0284c7",
      image: "/images/sheelu-singh.png",
    },
    {
      id: "mridul-mishra",
      name: "Mridul Mishra",
      type: "person",
      subtitle: "Backend / Linux Lead",
      path: "/people/mridul-mishra",
      x: 660,
      y: 220,
      r: 28,
      color: "#0284c7",
      image: "/images/mridul-mishra.png",
    },
    // Projects (Bottom Arc)
    {
      id: "kalesh",
      name: "Kalesh",
      type: "project",
      subtitle: "Anonymous Polling App",
      path: "/projects/kalesh",
      x: 270,
      y: 390,
      r: 36,
      color: "#f59e0b",
      image: "/images/kalesh-icon.png",
    },
    {
      id: "dimisipedia",
      name: "DIMISIPEDIA",
      type: "project",
      subtitle: "Knowledge Platform",
      path: "/projects/dimisipedia",
      x: 530,
      y: 390,
      r: 34,
      color: "#f59e0b",
      image: "/images/dimisi-mark.webp",
    },
    // Core Technologies (Outer Orbit)
    {
      id: "flutter",
      name: "Flutter",
      type: "technology",
      subtitle: "Cross-Platform Framework",
      path: "/technology/flutter",
      x: 130,
      y: 360,
      r: 24,
      color: "#10b981",
    },
    {
      id: "node-js",
      name: "Node.js",
      type: "technology",
      subtitle: "Backend Runtime",
      path: "/technology/node-js",
      x: 240,
      y: 490,
      r: 24,
      color: "#10b981",
    },
    {
      id: "mongodb",
      name: "MongoDB",
      type: "technology",
      subtitle: "Document Database",
      path: "/technology/mongodb",
      x: 400,
      y: 470,
      r: 24,
      color: "#10b981",
    },
    {
      id: "react",
      name: "React",
      type: "technology",
      subtitle: "Web UI Framework",
      path: "/technology/react",
      x: 560,
      y: 490,
      r: 24,
      color: "#10b981",
    },
    {
      id: "typescript",
      name: "TypeScript",
      type: "technology",
      subtitle: "Typed JavaScript",
      path: "/technology/typescript",
      x: 670,
      y: 360,
      r: 24,
      color: "#10b981",
    },
  ], []);

  const links: GraphLink[] = useMemo(() => [
    // Organization Connections
    { source: "shikhar-dixit", target: "dimisi-technologies", label: "Founder & CEO" },
    { source: "swatantra-singh", target: "dimisi-technologies", label: "Co-Founder & CTO" },
    { source: "nishkarsh-mishra", target: "dimisi-technologies", label: "Co-Founder & Director" },
    { source: "sheelu-singh", target: "dimisi-technologies", label: "Core Engineer" },
    { source: "mridul-mishra", target: "dimisi-technologies", label: "Core Engineer" },
    { source: "dimisi-technologies", target: "kalesh", label: "Product Owner" },
    { source: "dimisi-technologies", target: "dimisipedia", label: "Knowledge Base" },
    // Product Architecture Connections
    { source: "shikhar-dixit", target: "kalesh", label: "Product Architect" },
    { source: "swatantra-singh", target: "kalesh", label: "Backend Lead" },
    { source: "sheelu-singh", target: "kalesh", label: "Mobile Dev" },
    { source: "mridul-mishra", target: "kalesh", label: "Linux Infrastructure" },
    // Technology Links
    { source: "kalesh", target: "flutter", label: "Built With" },
    { source: "kalesh", target: "node-js", label: "API Stack" },
    { source: "kalesh", target: "mongodb", label: "Database" },
    { source: "dimisipedia", target: "react", label: "Frontend" },
    { source: "dimisipedia", target: "typescript", label: "Language" },
  ], []);

  const selectedNode = useMemo(() => nodes.find((n) => n.id === selectedId) || nodes[0]!, [nodes, selectedId]);
  const connectedLinks = useMemo(() => links.filter((l) => l.source === selectedId || l.target === selectedId), [links, selectedId]);
  const connectedNodeIds = useMemo(() => {
    const set = new Set<string>([selectedId]);
    connectedLinks.forEach((l) => {
      set.add(l.source);
      set.add(l.target);
    });
    return set;
  }, [connectedLinks, selectedId]);

  const selectedEntity = useMemo(() => entities.find((e) => e.id === selectedId), [selectedId]);

  return (
    <div className="mt-8 border border-border bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule px-5 py-4 bg-background">
        <div className="flex items-center gap-2">
          <Layers className="size-4 text-primary" />
          <span className="font-serif text-lg font-medium">Interactive Entity Knowledge Graph</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
          <span className="text-muted-foreground mr-1 flex items-center gap-1">
            <Filter className="size-3" /> Filter:
          </span>
          {(["all", "person", "project", "technology"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-2.5 py-1 transition-colors cursor-pointer capitalize ${
                activeFilter === filter
                  ? "bg-primary text-primary-foreground font-medium"
                  : "border border-border bg-surface text-muted-foreground hover:text-foreground"
              }`}
            >
              {filter === "all" ? "All Nodes" : filter + "s"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_20rem]">
        {/* SVG Interactive Canvas */}
        <div className="relative overflow-hidden bg-background/50 p-4 flex items-center justify-center min-h-[460px]">
          <svg viewBox="0 0 800 540" className="w-full h-auto select-none max-w-2xl">
            <defs>
              <linearGradient id="grad-active" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Links / Edges */}
            <g className="links">
              {links.map((link, idx) => {
                const sourceNode = nodes.find((n) => n.id === link.source);
                const targetNode = nodes.find((n) => n.id === link.target);
                if (!sourceNode || !targetNode) return null;

                const isConnected = link.source === selectedId || link.target === selectedId;
                const isFilteredOut = activeFilter !== "all" && sourceNode.type !== activeFilter && targetNode.type !== activeFilter;

                return (
                  <g key={`${link.source}-${link.target}-${idx}`}>
                    <line
                      x1={sourceNode.x}
                      y1={sourceNode.y}
                      x2={targetNode.x}
                      y2={targetNode.y}
                      stroke={isConnected ? "hsl(var(--primary))" : "currentColor"}
                      strokeWidth={isConnected ? 2.5 : 1}
                      strokeDasharray={isConnected ? undefined : "3,3"}
                      className={`transition-all duration-300 ${
                        isFilteredOut
                          ? "opacity-10 text-muted-foreground/30"
                          : isConnected
                          ? "opacity-100"
                          : "opacity-25 text-muted-foreground"
                      }`}
                    />
                  </g>
                );
              })}
            </g>

            {/* Nodes */}
            <g className="nodes">
              {nodes.map((node) => {
                const isSelected = node.id === selectedId;
                const isConnected = connectedNodeIds.has(node.id);
                const isFiltered = activeFilter === "all" || node.type === activeFilter;

                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x}, ${node.y})`}
                    onClick={() => setSelectedId(node.id)}
                    className="cursor-pointer group"
                    opacity={!isFiltered ? 0.2 : isSelected || isConnected ? 1 : 0.6}
                  >
                    {/* Pulsing ring on selected node */}
                    {isSelected ? (
                      <circle
                        r={node.r + 7}
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="2"
                        className="animate-pulse"
                      />
                    ) : null}

                    {/* Node Body */}
                    <circle
                      r={node.r}
                      fill={isSelected ? "hsl(var(--primary))" : "#111827"}
                      stroke={isSelected ? "hsl(var(--primary))" : isConnected ? "#4b5563" : "#1f2937"}
                      strokeWidth={isSelected ? 3 : 1.5}
                      className="transition-all duration-200 group-hover:scale-105"
                    />

                    {/* Node Label Text */}
                    <text
                      y={node.r + 14}
                      textAnchor="middle"
                      className={`text-[11px] font-sans font-medium transition-colors ${
                        isSelected ? "fill-primary font-bold text-[12px]" : "fill-foreground"
                      }`}
                    >
                      {node.name}
                    </text>

                    {/* Subtitle / Role */}
                    <text
                      y={node.r + 26}
                      textAnchor="middle"
                      className="text-[9px] font-mono fill-muted-foreground"
                    >
                      {node.subtitle}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        {/* Selected Entity Card Preview */}
        <div className="border-t lg:border-t-0 lg:border-l border-rule bg-surface p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="label-mono uppercase text-primary text-[10px] border border-primary/40 px-2 py-0.5">
                {selectedNode.type}
              </span>
              <span className="label-mono text-[11px]">
                {connectedLinks.length} Connections
              </span>
            </div>

            <h3 className="mt-3 font-serif text-2xl font-medium">{selectedNode.name}</h3>
            <p className="text-xs text-muted-foreground font-mono mt-0.5">{selectedNode.subtitle}</p>

            {selectedEntity ? (
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground line-clamp-4">
                {selectedEntity.shortDescription}
              </p>
            ) : null}

            <div className="mt-5 border-t border-rule pt-4">
              <p className="label-mono text-[11px] text-muted-foreground">Connected Entities:</p>
              <ul className="mt-2 space-y-1.5">
                {connectedLinks.slice(0, 4).map((l, i) => {
                  const otherId = l.source === selectedId ? l.target : l.source;
                  const otherNode = nodes.find((n) => n.id === otherId);
                  if (!otherNode) return null;
                  return (
                    <li key={i}>
                      <button
                        onClick={() => setSelectedId(otherNode.id)}
                        className="w-full text-left text-xs flex items-center justify-between p-1.5 hover:bg-muted transition-colors cursor-pointer"
                      >
                        <span className="font-serif">{otherNode.name}</span>
                        <span className="font-mono text-[10px] text-muted-foreground">{l.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-rule">
            <Link
              to={selectedNode.path as unknown as "/"}
              className="inline-flex w-full items-center justify-center gap-2 border border-primary bg-primary px-4 py-2.5 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              <span>Explore Complete Profile</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
