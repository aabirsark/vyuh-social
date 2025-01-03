import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

// Initialize mermaid at the module level
mermaid.initialize({
  startOnLoad: true,
  theme: "dark",
  securityLevel: "loose",
  themeVariables: {
    darkMode: true,
    background: "#0a0a0a",
    primaryColor: "#1e40af",
    primaryTextColor: "#fff",
    primaryBorderColor: "#374151",
    lineColor: "#4b5563",
    secondaryColor: "#374151",
    tertiaryColor: "#1f2937",
  },
  flowchart: {
    htmlLabels: true,
    curve: "basis",
  },
  sequence: {
    diagramMarginX: 50,
    diagramMarginY: 10,
    actorMargin: 50,
    width: 150,
    height: 65,
    boxMargin: 10,
    boxTextMargin: 5,
    noteMargin: 10,
    messageMargin: 35,
  },
});

interface MermaidDiagramProps {
  code: string;
}

function MermaidDiagramComponent({ code }: MermaidDiagramProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const diagramId = useRef(
    `mermaid-${Math.random().toString(36).substring(2)}`
  );

  useEffect(() => {
    const currentElement = elementRef.current; // Capture the current ref value

    if (!currentElement) return;

    const renderDiagram = async () => {
      try {
        // Clear any existing content
        currentElement.innerHTML = "";

        // Create a container for the diagram
        const container = document.createElement("div");
        container.id = diagramId.current;
        container.className = "mermaid";
        container.textContent = code;

        // Add container to the captured element
        currentElement.appendChild(container);

        // Render the diagram
        try {
          await mermaid.run({
            querySelector: `#${diagramId.current}`,
          });
        } catch (error) {
          console.warn("Mermaid run failed, trying fallback:", error);
          await mermaid.contentLoaded();
        }
      } catch (error) {
        console.error("Error rendering Mermaid diagram:", error);
        currentElement.innerHTML = `
          <div class="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p class="text-red-400 text-sm">Failed to render diagram</p>
            <pre class="mt-2 text-xs text-gray-400">${code}</pre>
          </div>
        `;
      }
    };

    renderDiagram();

    return () => {
      // Cleanup using the captured reference
      currentElement.innerHTML = "";
    };
  }, [code]);

  return (
    <div
      ref={elementRef}
      className="my-4 bg-black/20 p-4 rounded-lg overflow-x-auto"
    />
  );
}

export const MermaidDiagram = React.memo(MermaidDiagramComponent);