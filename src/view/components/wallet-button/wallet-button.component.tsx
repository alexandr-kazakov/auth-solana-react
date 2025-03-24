import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import styled from 'styled-components';

const StyledWalletButton = styled(WalletMultiButton)`
  border-radius: 20px!important;
`;

export const WalletButton: React.FC = () => {
  return <StyledWalletButton />;
};

