"use client";

import { useEffect, useState } from "react";

export function CategoriesDebug() {
  const [debugInfo, setDebugInfo] = useState<string>("");

  useEffect(() => {
    const checkStrapi = async () => {
      const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
      const url = `${strapiUrl}/api/categories?populate=*`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setDebugInfo(JSON.stringify({ status: response.status, data }, null, 2));
      } catch (error) {
        setDebugInfo(`Error: ${error}`);
      }
    };

    checkStrapi();
  }, []);

  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg text-xs max-w-md max-h-96 overflow-auto z-50">
      <h3 className="font-bold mb-2">Debug Info:</h3>
      <pre className="whitespace-pre-wrap">{debugInfo || "Loading..."}</pre>
    </div>
  );
}













