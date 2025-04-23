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
import { useSearchParams, useRouter } from "next/navigation";

const PAGE_SIZE = 30;
export default function OrdinalsLookup() {
  const [userAddress, setUserAddress] = useState("bc1pe6y27ey6gzh6p0j250kz23zra7xn89703pvmtzx239zzstg47j3s3vdvvs");

  const router = useRouter();
  const searchParams = useSearchParams();
  const offset = +(searchParams.get("offset") || 0);

  const currentPage = Math.floor(offset / PAGE_SIZE) + 1;

  const { data, isFetching, ...utxoQuery } = useQuery({
    queryKey: [`utxo-${userAddress}-${currentPage}`],
    queryFn: () => getAdressUtxos(userAddress, offset),
    enabled: AddressValidator.validate(userAddress),
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
          {!data?.data?.results?.length ? (
            <p>{`No inscriptions`}</p>
          ) : (
            data?.data?.results.map((utxo, index) => {
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
            })
          )}
        </div>
        {data?.data?.total && data?.data?.total > 30 ? (
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              onClick={(page) => {
                const offset = Math.floor((page - 1) * PAGE_SIZE);
                router.push(`?offset=${offset}`);
              }}
              noOfPages={Math.floor(data?.data?.total / PAGE_SIZE)}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Pagination({
  currentPage,
  onClick,
  noOfPages,
}: {
  currentPage: number;
  onClick: (page: number) => void;
  noOfPages: number;
}) {
  const pages = Array.from({ length: noOfPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center ">
      {pages.map((page) => {
        const activePage = page === currentPage;
        return (
          <button
            key={page}
            onClick={() => onClick(page)}
            className={`${
              activePage ? "font-bold text-blue-500 rounded-full  " : ""
            } mx-1 px-3 py-1 border border-gray-800 rounded-md hover:bg-gray-200 `}
          >
            {page}
          </button>
        );
      })}
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
