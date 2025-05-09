import React from "react";
import { MimeTypeIcon } from "./icons/mimetype";
import { MimeType } from "@/modules/ordinals.api";

export default function InscriptionIcon({ type, category = "" }: { type?: MimeType; category?: string }) {
  if (!type) return null;
  return (
    <div>
      {type?.startsWith("text/plain") && category === "sns" ? (
        <div className="flex items-center justify-center">
          <MimeTypeIcon.Link />
        </div>
      ) : type?.startsWith("text/plain") ? (
        <div className="flex items-center justify-center">
          <MimeTypeIcon.Text />
        </div>
      ) : type?.startsWith("text/html") ? (
        <div className="flex items-center justify-center">
          <MimeTypeIcon.Web />
        </div>
      ) : null}
    </div>
  );
}
