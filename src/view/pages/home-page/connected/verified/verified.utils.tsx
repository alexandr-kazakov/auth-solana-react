import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

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
