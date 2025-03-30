import { Button } from "@components/button/button.component";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, LAMPORTS_PER_SOL, PublicKey, Transaction } from "@solana/web3.js";
import { enqueueSnackbar } from "notistack";
import { createTransaction } from "./verified.utils";

const { VITE_RPC_URL, VITE_WALLET_RECIPIENT } = import.meta.env;

interface VerifiedProps {
  isVerified: boolean;
}

export const Verified: React.FC<VerifiedProps> = ({isVerified}) => {
  const { publicKey, signTransaction } = useWallet();

  const fromPubkey: PublicKey = publicKey as PublicKey;
  const toPubkey: PublicKey = new PublicKey(VITE_WALLET_RECIPIENT);
  const lamports = 0.00001 * LAMPORTS_PER_SOL;

  const makePayment = async () => {
    if(!publicKey || !signTransaction) return null;
    try {
      const connection = new Connection(VITE_RPC_URL);

      const transaction: Transaction = createTransaction({fromPubkey, toPubkey, lamports});

      const blockHash = await connection.getLatestBlockhash();
      transaction.feePayer = fromPubkey;
      transaction.recentBlockhash = blockHash.blockhash;
      
      const signed = await signTransaction(transaction);

      const signature = await connection.sendRawTransaction(signed.serialize());

      enqueueSnackbar('Transaction has been sent, waiting for confirmation.', { variant: 'info', });

      await connection.confirmTransaction({
        blockhash: blockHash.blockhash,
        lastValidBlockHeight: blockHash.lastValidBlockHeight,
        signature
      });

      enqueueSnackbar('Transaction has been confirmed.', { variant: 'success' })

    } catch (error) {
      let errorMessage = 'Transaction failed: ';
      
      if (error instanceof Error) {
        errorMessage += error.message;
      } else if (typeof error === 'string') {
        errorMessage += error;
      }
    
      console.error('Transaction error:', error);
      enqueueSnackbar(errorMessage, { variant: 'error' });
    }
  }

  return (
    <div >
      {isVerified ? (<div>
        <Button onClick={() => makePayment()}>
        Демо-оплата на 0.00001 SOL
        </Button>
      </div>) : (<div>No</div>)}
    </div>
  );
};
