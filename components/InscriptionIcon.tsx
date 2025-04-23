import React from "react";
import { MimeTypeIcon } from "./icons/mimetype";

export default function InscriptionIcon({ type, content }) {
  return (
    <div>
      {type?.startsWith("text/plain") && content === "sns" ? (
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
