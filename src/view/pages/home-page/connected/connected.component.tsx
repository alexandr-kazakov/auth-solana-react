import { Button } from "@components/button/button.component";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { styled } from "styled-components";
import nacl from "tweetnacl";
import { Verified } from "./verified";


export const Connected: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { publicKey, signMessage } = useWallet();
  const [ isVerified, setIsVerified ] = useState<boolean>(false)

  // verifyMessageSign method should work on the server/backend
  const verifyMessageSign = async (
    encodedMessage: Uint8Array,
    signature: Uint8Array,
    publicKey: PublicKey
  ): Promise<boolean> => {
    if (!publicKey || !signMessage) {
      console.error('Wallet not connected or signing not supported');
      return false;
    }

    try {
      const isSignatureValid = nacl.sign.detached.verify(
        encodedMessage,
        signature,
        publicKey.toBytes() 
      );
      console.log('Signature is valid:', isSignatureValid);
      return isSignatureValid;
    } catch (error) {
      console.error('Error verifying signature:', error);
      return false;
    }
  };

  const signMessageMethod = async () => {
    if (!publicKey || !signMessage) {
      console.error('Wallet not connected or signing not supported');
      return;
    }

    try {
      const message = `Подтверждение права владения кошельком: ${publicKey.toString()}`;
      const encodedMessage = new TextEncoder().encode(message);
      const signature = await signMessage(encodedMessage); 

      const isValid = await verifyMessageSign(encodedMessage, signature, publicKey);
      if (isValid) {
        console.log('Message signed and verified successful');
        enqueueSnackbar('Message signed and verified successful', { variant: 'success' });
        setIsVerified(true);
      } else {
        console.error('The signature is invalid');
        enqueueSnackbar('The signature is invalid', { variant: 'error' });
      }
    } catch (error) {
      console.error('Sign message error:', error);
    }
  };


  return (
    <ConnectedSection>
      {isVerified ? (
        <>
          <p>У вас есть полный доступ!</p>
          <br />
          <Verified isVerified={isVerified} />
        </>
      ) : (
        <>
          <p>Ваш адрес кошелька — <br /> <b> {publicKey?.toBase58()}</b>, <br /> однако на этом этапе нет гарантии, что именно вы являетесь его владельцем. Чтобы подтвердить владение, необходимо подписать сообщение с использованием приватного ключа.</p>
          <br />
          <Button onClick={() => signMessageMethod()}> Подписать сообщение по приватному ключу </Button>
        </>
      ) }
    </ConnectedSection>
  );
};

const ConnectedSection = styled.div`
  line-height: 1.8;
  margin-top: 50px;
`
