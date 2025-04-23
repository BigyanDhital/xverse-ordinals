"use client";

import Button from "@/components/button";
import Arrow from "@/components/icons/arrow";
import { getInscriptionContents, getInscriptionDetails, MimeType } from "@/modules/ordinals.api";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React from "react";

export function OrdinalDetail() {
  const searchParams = useSearchParams();
  const userAddress = searchParams.get("userAddress") || "";
  const id = searchParams.get("id") || "";

  const { data: inscriptionDetails, ...detailQuery } = useQuery({
    queryKey: [`inscriptionDetails-${id}`],
    queryFn: () => getInscriptionDetails(userAddress, id),
    enabled: Boolean(userAddress && id),
  });

  const { data: inscriptionContents, ...contentQuery } = useQuery({
    queryKey: [`inscriptionContent-${id}`],
    queryFn: () => getInscriptionContents(id),
    enabled: Boolean(id),
  });

  return (
    <div className="grid items-center">
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <div className="md:col-span-1">
          <OrdinalContent
            category={inscriptionDetails?.data?.category}
            content={inscriptionContents?.data}
            type={inscriptionDetails?.data?.mime_type}
            id={id}
          />
        </div>
        <div className="col-span-1 lg:col-span-2 text-wrap">
          {inscriptionDetails?.data?.id ? (
            <div className="grid gap-4">
              <div className="border border-white/60 rounded-md p-4">
                <OrdinalDetailInfo inscriptionId={inscriptionDetails.data.id} userAddress={userAddress} />
              </div>
              <div className="border border-white/60 rounded-md p-4">
                <OrdinalAttributes inscription={inscriptionDetails.data} />
              </div>
            </div>
          ) : inscriptionDetails?.errorMessage ? (
            <div>
              <p>{inscriptionDetails?.errorMessage}</p>
              <Button title="Retry" onClick={detailQuery.refetch} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function OrdinalContent({
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
  if (type == "text/plain" && category === "sns") return <p>{content?.name}</p>;
  if (type == "text/plain") return <p>{JSON.stringify(content, null, 2)}</p>;
  if (type === "text/html")
    return (
      <div
        className=" p-4 rounded-md w-full h-auto border border-white/60
 overflow-hidden"
      >
        <p className="overflow-hidden">{JSON.stringify(content, null, 2)}</p>
        <iframe
          className="w-full h-full"
          style={{ overflow: "hidden" }}
          dangerouslySetInnerHTML={{ __html: content }}
          sandbox="true"
        />
      </div>
    );
  if (type) return <img src={`https://ord.xverse.app/content/${id}`} className="w-full h-auto" alt="Ordinal Content" />;
}

function OrdinalDetailInfo({ inscriptionId, userAddress }: { inscriptionId: string; userAddress: string }) {
  return (
    <div className="grid gap-4 w-full overflow-hidden">
      <div>
        <label className="font-bold text-gray-300">Inscription id</label>
        <p>{inscriptionId}</p>
      </div>
      <div>
        <label className="font-bold text-gray-300">Owner Address</label>
        <p>{userAddress}</p>
      </div>
    </div>
  );
}

function OrdinalAttributes({ inscription }) {
  return (
    <div className="">
      <h3 className="font-bold">Attributes</h3>
      <div className="mt-5 grid gap-3">
        {Object.entries(inscription).map(([key, value]) => {
          if (!key || !value) return;
          return (
            <div className="w-full overflow-hidden" key={`${key}-${value}`}>
              <p className="font-bold">{key}</p>
              <p className="bg-gray-800/50 p-2 rounded-md overflow-hidden">{value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
