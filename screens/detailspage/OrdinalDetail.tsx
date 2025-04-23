"use client";

import Button from "@/components/button";
import { getInscriptionContents, getInscriptionDetails, Inscription } from "@/modules/ordinals.api";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { OrdinalContent } from "./OrdinalContent";
import { OrdinalAttributes, OrdinalMetadata } from "./OrdinalAttributes";
// @ts-ignore
import Validator from "multicoin-address-validator";

export function OrdinalDetail() {
  const searchParams = useSearchParams();
  const userAddress = searchParams.get("userAddress") || "";
  const id = searchParams.get("id") || "";
  const router = useRouter();

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
  useEffect(() => {
    if (!Validator.validate(userAddress, "bitcoin") || !id) router.push("/");
  }, []);
  console.log({ inscriptionContents, inscriptionDetails });

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
                <OrdinalMetadata inscriptionId={inscriptionDetails.data.id} userAddress={userAddress} />
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
