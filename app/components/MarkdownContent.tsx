import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MermaidDiagram } from "./MermaidDiagram";

interface MarkdownContentProps {
  content: string;
}

function CodeBlock({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className="my-4">
      <pre className="bg-black/30 rounded-lg p-3 overflow-x-auto">
        <code className={className}>{children}</code>
      </pre>
    </div>
  );
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => (
          <p className="mb-4 last:mb-0 leading-relaxed">{children}</p>
        ),
        code: ({ node, inline, className, children, ...props }) => {
          console.log(node)
          const code = String(children).trim();
          if (inline) {
            return (
              <code
                className="bg-black/30 rounded px-1.5 py-0.5 font-mono text-sm"
                {...props}
              >
                {children}
              </code>
            );
          }
          if (className === "language-mermaid") {
            const diagramKey = `mermaid-${Buffer.from(code).toString(
              "base64"
            )}`;
            return <MermaidDiagram key={diagramKey} code={code} />;
          }
          return (
            <CodeBlock className={className}>
              {children}
            </CodeBlock>
          );
        },
        pre: ({ children }) => children,
        ul: ({ children }) => (
          <ul className="mb-4 pl-4 space-y-2">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="mb-4 pl-4 space-y-2">{children}</ol>
        ),
        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
        table: ({ children }) => (
          <div className="my-4 overflow-x-auto">
            <table className="min-w-full border border-zinc-800 bg-black/20 rounded-lg overflow-hidden">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-zinc-800/50">{children}</thead>
        ),
        tbody: ({ children }) => (
          <tbody className="divide-y divide-zinc-800/50">{children}</tbody>
        ),
        tr: ({ children }) => (
          <tr className="transition-colors hover:bg-zinc-800/30">{children}</tr>
        ),
        th: ({ children }) => (
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-4 py-3 whitespace-nowrap text-sm">{children}</td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
