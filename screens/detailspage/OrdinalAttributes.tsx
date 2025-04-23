import Copy from "@/components/icons/copy";
import Link from "next/link";

import { Inscription } from "@/modules/ordinals.api";

export function OrdinalMetadata({ inscriptionId, userAddress }: { inscriptionId: string; userAddress: string }) {
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
export function OrdinalAttributes({ inscription }: { inscription: Inscription }) {
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
