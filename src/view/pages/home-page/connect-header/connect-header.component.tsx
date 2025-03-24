import { styled } from "styled-components";
import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from "@solana/wallet-adapter-react";

export const ConnectHeader: React.FC = () => {
  const { connected } = useWallet();

  return (
    <Header >
      <ConnectedTitle connected={connected}>Wallet {connected ? 'connected' : 'disconnected'}</ConnectedTitle>
      {connected ? (<WalletDisconnectButton />) : (<WalletMultiButton />)}
    </Header>
  );
};

const Header = styled.div`
  align-items: center;  
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 20px;
  border: 1px solid #512da8;
  overflow: hidden;
  position: relative;
  padding-left: 15px;
  display:flex;
  justify-content: space-between;
  width: 100%;
  z-index: 100;
`

const ConnectedTitle = styled.div<{ connected: boolean }>`
color: ${({ connected, theme }) =>
    connected ? theme.colors.primary : '#fff'};
`



