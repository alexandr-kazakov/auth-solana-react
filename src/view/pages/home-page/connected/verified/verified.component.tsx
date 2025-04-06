import { Button } from "@components/button/button.component";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, LAMPORTS_PER_SOL, PublicKey, Transaction } from "@solana/web3.js";
import { enqueueSnackbar } from "notistack";
import { createTransaction, submitGetNft } from "./verified.utils";
import { styled } from "styled-components";
import { useState } from "react";

const { VITE_RPC_URL, VITE_WALLET_RECIPIENT } = import.meta.env;
interface VerifiedProps {
  isVerified: boolean;
}

export const Verified: React.FC<VerifiedProps> = ({isVerified}) => {
  const [overlayVisibility, setOverlayVisibility] = useState<boolean>(false);
  const { publicKey, signTransaction } = useWallet();

  const fromPubkey: PublicKey = publicKey as PublicKey;
  const toPubkey: PublicKey = new PublicKey(VITE_WALLET_RECIPIENT);
  const lamports = 0.00001 * LAMPORTS_PER_SOL;

  const makePayment = async () => {
    if(!publicKey || !signTransaction) return null;
    setOverlayVisibility(true);

    try {
      const connection = new Connection(VITE_RPC_URL);

      const transaction: Transaction = createTransaction({fromPubkey, toPubkey, lamports});

      const blockHash = await connection.getLatestBlockhash();
      transaction.feePayer = fromPubkey;
      transaction.recentBlockhash = blockHash.blockhash;

      setOverlayVisibility(false);

      const signed = await signTransaction(transaction);
      let signature;

      if (typeof signed === 'object' && signed.serialize) {
        signature = await connection.sendRawTransaction(signed.serialize());
      } else if (signed instanceof Uint8Array || Buffer.isBuffer(signed)) {
        signature = await connection.sendRawTransaction(signed);
      } else {
        console.error('Unsupported signed transaction format');
        enqueueSnackbar('Unsupported signed transaction format', { variant: 'error' });
        setOverlayVisibility(false);
        return;
      }

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

    setOverlayVisibility(false);
  }

  const sendNft = async () => {
    if(!publicKey) {
      enqueueSnackbar('User publicKey is not found!', { variant: 'error' });
      return null;
    }

    setOverlayVisibility(true);

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

    setOverlayVisibility(false);

  };

  return (
    <>
      {isVerified && (
        <Wrapper>
          <Button disabled={overlayVisibility} onClick={() => makePayment()}> Демо-оплата на 0.00001 SOL</Button>
          <br />
          <Button disabled={overlayVisibility} onClick={() => sendNft()}>Получить NFT</Button>
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`
