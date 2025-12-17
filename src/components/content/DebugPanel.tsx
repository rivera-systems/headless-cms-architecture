"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";

export const DebugPanel: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="p-4 bg-yellow-100 border border-yellow-500 rounded-lg">
      <h3 className="text-lg font-semibold text-yellow-800">
        Debug Client Component
      </h3>
      <p className="text-gray-700 mb-2">Current Count: {count}</p>
      <Button variant="primary" onClick={() => setCount((c) => c + 1)}>
        Increment Client State
      </Button>
    </div>
  );
};
