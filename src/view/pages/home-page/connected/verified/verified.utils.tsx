import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

const { VITE_BACKEND_URL } = import.meta.env;

interface ICreateTransaction {
  fromPubkey: PublicKey;
  toPubkey: PublicKey;
  lamports: number | bigint;
}

export const createTransaction = ({fromPubkey, toPubkey, lamports}: ICreateTransaction): Transaction  => {
  if(!fromPubkey || !toPubkey || !lamports) throw new Error('createTransaction error')

  const transaction = new Transaction();
  transaction.add(
    SystemProgram.transfer({
      fromPubkey,
      toPubkey,
      lamports,
    })
  );

  return transaction;
}

export const submitGetNft = async (inputValue: string) => {
  const response = await fetch(`${VITE_BACKEND_URL}/api/get-nft`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ wallet: inputValue }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error);
  }

  const result = await response.json();
  return result;
};


