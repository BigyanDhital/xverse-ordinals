"use client";

import Button from "@/components/button";
import Copy from "@/components/icons/copy";
import InscriptionIcon from "@/components/InscriptionIcon";
import { getInscriptionContents, getInscriptionDetails, Inscription, MimeType } from "@/modules/ordinals.api";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
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
    <div className="grid ">
      {detailQuery?.isFetching ? <p className="text-4xl text-center">Please wait...</p> : null}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <div className="md:col-span-1">
          <div className="p-2 rounded-md w-full h-auto   overflow-hidden flex gap-2">
            <OrdinalContent
              category={inscriptionDetails?.data?.category}
              content={inscriptionContents?.data}
              type={inscriptionDetails?.data?.mime_type}
              id={id}
            />
          </div>
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
      <div className="p-4 rounded-md w-full h-auto border border-white/60 overflow-hidden">
        <p className="overflow-hidden">{JSON.stringify(content, null, 2)}</p>
        <iframe className="w-100 h-100" dangerouslySetInnerHTML={{ __html: content }} sandbox="true" />
      </div>
    );
  if (type?.startsWith("image/"))
    return <img src={`https://ord.xverse.app/content/${id}`} className="w-full h-auto" alt="Ordinal Content" />;
  return null;
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
        <Link target="_blank" href={`https://ordiscan.com/address/${userAddress}`}>
          <p>{userAddress}</p>
        </Link>
      </div>
    </div>
  );
}

function OrdinalAttributes({ inscription }: { inscription: Inscription }) {
  return (
    <div className="">
      <h3 className="font-bold">Attributes</h3>
      <div className="mt-5 grid gap-3">
        <AttributeDetail label={"ID"} value={inscription?.id} />
        <AttributeDetail label={"Number"} value={inscription?.number} />
        <AttributeDetail label={"Owner Address"} value={inscription?.address} />
        <AttributeDetail label={"Genesis Address"} value={inscription?.genesis_address} />
        <AttributeDetail label={"Location"} value={inscription?.location} />
        <AttributeDetail label={"Genesis Block Height"} value={inscription?.genesis_block_height} />
        <AttributeDetail label={"Genesis Block Height"} value={inscription?.genesis_block_hash} />
        <AttributeDetail label={"Genesis Txn"} value={inscription?.genesis_tx_id} />
        <AttributeDetail label={"genesis_fee"} value={inscription?.genesis_fee} />
        <AttributeDetail label={"Genesis Timestamp"} value={inscription?.genesis_timestamp} />
        <AttributeDetail label={"Timestamp"} value={inscription?.timestamp} />
        <AttributeDetail label={"Output"} value={inscription?.output} />
        <AttributeDetail label={"sat_ordinal"} value={inscription?.sat_ordinal} />
        <AttributeDetail label={"Rarity"} value={inscription?.sat_rarity} />
        <AttributeDetail label={"Coinbase Height"} value={inscription?.sat_coinbase_height} />
        <AttributeDetail label={"MIME type"} value={inscription?.mime_type} />
        <AttributeDetail label={"Content Type"} value={inscription?.content_type} />
        <AttributeDetail label={"Content Length"} value={inscription?.content_length} />
        <AttributeDetail label={"Txn Id"} value={inscription?.tx_id} />
        <AttributeDetail label={"value"} value={inscription?.value} />
        <AttributeDetail label={"Collection ID"} value={inscription?.collection_id} />
        <AttributeDetail label={"Collection Name"} value={inscription?.collection_name} />
        <AttributeDetail label={"Inscription Floor Price"} value={inscription?.inscription_floor_price} />
      </div>
    </div>
  );
}

function AttributeDetail({ label, value }: { label: string; value: number | string }) {
  if (!value) return null;
  return (
    <div className="w-full overflow-hidden ">
      <p className="font-bold">{label}</p>

      <div className="w-full overflow-hidden  bg-gray-800/50 p-2 flex justify-between">
        <p className="flex-1 rounded-md overflow-hidden">{value}</p>
        <Copy value={value} />
      </div>
    </div>
  );
}
