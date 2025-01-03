import React from "react";

export const DottedBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <div
        className="absolute inset-0 opacity-20 animate-drift"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(160, 140, 120) 2px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      />
    </div>
  );
};
