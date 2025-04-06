import { Button } from "@components/button/button.component";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, LAMPORTS_PER_SOL, PublicKey, Transaction } from "@solana/web3.js";
import { enqueueSnackbar } from "notistack";
import { createTransaction, submitGetNft } from "./verified.utils";
import { styled } from "styled-components";

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

      enqueueSnackbar(`Transaction has been confirmed: signature ${signature}`, { variant: 'success',  autoHideDuration: 5000 })

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

  const sendNft = async () => {
    if(!publicKey) {
      enqueueSnackbar('User publicKey is not found!', { variant: 'error' });
      return null;
    }

    try {
      const result = await submitGetNft(publicKey?.toString());
      
      console.log('NFT successfully sent: ', result);
      enqueueSnackbar(`NFT successfully sent: ${result.message}`, { variant: 'success',  autoHideDuration: 5000  });

    } catch (error) {
      let errorMessage = 'NFT send error: ';
      
      if (error instanceof Error) {
        errorMessage += error.message;
      } else if (typeof error === 'string') {
        errorMessage += error;
      }

      console.error('NFT sent error: ', error);
      enqueueSnackbar(errorMessage, { variant: 'error' });
    }
  };

  return (
    <>
      {isVerified && (
        <Wrapper>
          <Button onClick={() => makePayment()}> Демо-оплата на 0.00001 SOL</Button>
          <br />
          <Button onClick={() => sendNft()}>Получить NFT</Button>
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`
