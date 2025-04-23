"use client";
import Button from "@/components/button";
import Arrow from "@/components/icons/arrow";
import { MimeTypeIcon } from "@/components/icons/mimetype";
import Input from "@/components/input";
import InscriptionIcon from "@/components/InscriptionIcon";
import { sliceAddress } from "@/helpers";
import { getAdressUtxos, Utxo } from "@/modules/ordinals.api";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import AddressValidator from "multicoin-address-validator";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";

export default function OrdinalsLookup() {
  const [userAddress, setUserAddress] = useState("bc1pe6y27ey6gzh6p0j250kz23zra7xn89703pvmtzx239zzstg47j3s3vdvvs");

  const { data, isFetching, ...utxoQuery } = useQuery({
    queryKey: [`utxo-${userAddress}`],
    queryFn: () => getAdressUtxos(userAddress),
    enabled: false,
  });

  const handleAddressInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUserAddress(e.target.value);
  }, []);
  const handleFetchUtxos = async () => {
    if (!userAddress) {
      toast(`User address required`);
      return;
    }
    const isValid = AddressValidator.validate(userAddress);
    if (!isValid) {
      toast(`Invalid Bitcoin address`);
      return;
    }
    utxoQuery.refetch();
  };
  return (
    <div className="">
      <div className="flex flex-col gap-2">
        <Input label="User Address" value={userAddress} onChange={handleAddressInput} />
        <Button title="Look up" disabled={isFetching} onClick={handleFetchUtxos} />
      </div>

      <div className="mt-5">
        <p>Results {isFetching ? "Please wait" : ""}</p>
        <div className=" grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-3">
          {data?.errorMessage ? <pre>{`Failed to load utxos:\n${data.errorMessage}`}</pre> : null}
          {data?.data?.results.map((utxo, index) => {
            return (
              <div key={`${utxo.txid}-${index}`}>
                {utxo.inscriptions.map((inscription) => {
                  return (
                    <div key={inscription.id} className="bg-white/10 rounded-md p-1">
                      <Link href={`detail/?userAddress=${userAddress}&id=${inscription.id}`}>
                        <OrdinalUtxo id={inscription.id} type={inscription.content_type} />
                      </Link>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function OrdinalUtxo({ id, type, content }: { id: string }) {
  return (
    <div className="flex justify-between items-center">
      <div className="w-20 h-20  ">
        {type?.startsWith("image/") ? (
          <img src={`https://ord.xverse.app/content/${id}`} className="w-full h-full object-fill" />
        ) : (
          <InscriptionIcon type={type} content={content} />
        )}
      </div>
      <div className="flex flex-col">
        <p>Inscription</p>
        <p>{sliceAddress(id)}</p>
      </div>
      <Arrow.Right />
    </div>
  );
}
