
import { AppRoutes } from '@view/routes';
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { SolanaWalletProvider } from '@view/providers';
import { ThemeProvider } from 'styled-components';
import '@solana/wallet-adapter-react-ui/styles.css';
import { GlobalStyles } from './globalStyles';
import { theme } from '@theme';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3} anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}>
        <SolanaWalletProvider>
          <Router>
            <GlobalStyles />
            <AppRoutes />
          </Router>
        </SolanaWalletProvider>
      </SnackbarProvider>
    </ThemeProvider>
  )
}



export default App