"use client";
import { MimeType } from "@/modules/ordinals.api";
import React from "react";

export function OrdinalContent({
  category,
  content,
  type,
  id,
}: {
  category?: string;
  content: any;
  type: MimeType;
  id: string;
}) {
  // if (type == "text/plain" && category === "sns") return <p>{content?.name}</p>;
  if (typeof content !== "string") return <pre>{JSON.stringify(content, null, 2)}</pre>;

  if (type == "text/plain") return <p>{JSON.stringify(content, null, 2)}</p>;
  if (type === "text/html" || content?.startsWith(`<!`)) {
    return (
      <div className="p-4 rounded-md w-full h-auto border border-white/60 overflow-hidden">
        <iframe sandbox="" src={`data:text/html;charset=utf-8,${encodeURIComponent(content)}`} />
        <p>{content}</p>
      </div>
    );
  }

  if (type?.startsWith("image/")) {
    return <img src={`https://ord.xverse.app/content/${id}`} className="w-full h-auto" alt="Ordinal Content" />;
  }

  return (
    <div>
      <p className="py-5">Unknown type or not implemented</p>
      <p>Raw:</p>
      <pre>{content}</pre>
    </div>
  );
}
