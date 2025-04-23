import { getAxiosErrorMessage } from "@/helpers";
import axios from "axios";

export type Utxo = {
  txid: string;
  vout: number;
  block_height: number;
  value: number;
  sats: {
    number: string;
    rarity_ranking: string;
    offset: number;
  }[];
  inscriptions: {
    id: string;
    offset: number;
    content_type: string;
  }[];
};

type OrdinalsResponse = {
  limit: number;
  offset: number;
  total: number;
  results: Utxo[];
};
export const getAdressUtxos = async (
  userAddress: string,
  offset?: number
): Promise<{ data?: OrdinalsResponse; errorMessage?: string }> => {
  try {
    if (!offset) offset = 0;
    const url = `${process.env.NEXT_PUBLIC_API_BASE}address/${userAddress}/ordinal-utxo?offset=${offset}`;

    const response = await axios.get(url);
    return { data: response.data };
  } catch (error) {
    const errorMessage = getAxiosErrorMessage(error);

    return { data: undefined, errorMessage };
  }
};
export type MimeType = "text/plain" | "text/html" | `image/png`;

export type Inscription = {
  id: string;
  number: number;
  address: string;
  genesis_address: string;
  genesis_block_height: number;
  genesis_block_hash: string;
  genesis_tx_id: string;
  genesis_fee: number;
  genesis_timestamp: number;
  location: string;
  output: string;
  offset: number;
  sat_ordinal: number;
  sat_rarity: string;
  sat_coinbase_height: number;
  mime_type: MimeType;
  content_type: string;
  content_length: number;
  tx_id: string;
  timestamp: number;
  value: number;
  category: null;
  collection_id: string;
  collection_name: string;
  inscription_floor_price: number;
};
export const getInscriptionDetails = async (
  userAddress: string,
  inscriptionId: string
): Promise<{ data?: Inscription; errorMessage?: string }> => {
  try {
    if (!userAddress || !inscriptionId) throw new Error(`Insufficient params provided`);
    // https://api-3.xverse.app/v1/address/:address/ordinals/inscriptions/:inscriptionId

    const url = `${process.env.NEXT_PUBLIC_API_BASE}address/${userAddress}/ordinals/inscriptions/${inscriptionId}`;

    const response = await axios.get(url);
    return { data: response.data };
  } catch (error) {
    const errorMessage = getAxiosErrorMessage(error);

    return { data: undefined, errorMessage };
  }
};

export const getInscriptionContents = async (inscriptionId: string): Promise<{ data?: any; errorMessage?: string }> => {
  try {
    if (!inscriptionId) throw new Error(`Insufficient params provided`);

    const url = `https://ord.xverse.app/content/${inscriptionId}`;

    const response = await axios.get(url);
    return { data: response.data };
  } catch (error) {
    const errorMessage = getAxiosErrorMessage(error);

    return { data: undefined, errorMessage };
  }
};
