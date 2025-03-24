
import { useWallet } from '@solana/wallet-adapter-react';
import React from 'react';
import '@solana/wallet-adapter-react-ui/styles.css';
import styled from 'styled-components';
import cryptoLogo from '../../../assets/conf-app-logo-1.jpg';
import { ConnectHeader } from './connect-header';
import { Disconnected } from './disconnected';
import { Connected } from './connected';

export const HomePage: React.FC = () => {
  const { connected } = useWallet();

  return (
    <Container connected={connected}>
      <ConnectHeader />
      <Content>
        <ContentInner>
          {connected ? (
            <Connected/>
          ) : (
            <Disconnected />
          )}

        </ContentInner>
      </Content>
    </Container>
  );
};

const Container = styled.div<{ connected: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 20px;
  max-width: 460px;
  width: 100%;
  height: 500px;
  border-radius: 20px;
  box-shadow: 0 0 20px 10px rgba(153, 69, 255, 0.5);
  animation: ${({ connected }) => (connected ? 'shadowPulse 5s infinite linear' : 'none')};
      position: relative;

  @keyframes shadowPulse {
    0% {
      box-shadow: 0 0 20px 10px rgba(153, 69, 255, 0.5); 
    }
    50% {
      box-shadow: 0 0 50px 20px rgba(153, 69, 255, 1); 
    }
    100% {
      box-shadow: 0 0 20px 10px rgba(153, 69, 255, 0.5); 
    }
  }
`;


const Content = styled.div`
  height: 100%;
  position: relative;

  &::before {
    content: ' ';
    background-image: url(${cryptoLogo}); 
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.1;
    
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
`;

const ContentInner = styled.div`
    position: relative;
    z-index: 100;
  }
`;




