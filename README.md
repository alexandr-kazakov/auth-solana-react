# Auth Solana React App (TypeScript + Vite)

- Live demo - [auth-solana-react.netlify.app](https://auth-solana-react.netlify.app/)

## Description
Auth Solana React App is a React application that enables wallet-based authentication using Web3 Solana. Users can connect their Solana wallets (e.g., Phantom) to log in and manage their authentication status within the app. There are also demo options: demo payment and receiving NFT.

## Requirements
- Node.js (version 21 or higher)
- npm

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/alexandr-kazakov/auth-solana-react.git
2. Navigate to the project directory:
   ```bash
   cd auth-solana-react
3. Install dependencies:
   ```bash
   npm install

## Running the App
1. Start the application in development mode:
   ```bash
   npm run dev

## Building for Production
1. To create a production build:
   ```bash
   npm run build

## Solana Integration
To interact with Solana:
1. Install a Solana wallet (e.g., Phantom) in your browser.
2. Ensure your wallet is connected to the Solana network (e.g., Devnet or Mainnet).

## Config setup
See .env.example

Create .env file in the project root near the env.example and write the config from .env.example on it.
```
VITE_RPC_URL = Solana RPC URL (e.g. https://mainnet.helius-rpc.com/?api-key=XXX)
VITE_WALLET_RECIPIENT = A wallet recipient address string for demo payment option (e.g. 5G7Hmo99vrSFvvPEFS4iGTyjhTtqUUAqD3HdHFuA3g9V)
VITE_BACKEND_URL = A backend URL for demo NFT option (e.g. http://localhost:3001)
```

## Stay in touch
- Author - [Alexandr Kazakov](mailto:alexandr.kazakov1@gmail.com)
- Website - [https://alexkazakov.info](https://alexkazakov.info)

## Support
Auth Solana React App is an MIT-licensed open source project, you can say thanks here:

[![Support me on Patreon](https://img.shields.io/badge/Patreon%20-be%20a%20Patron-FF424D?style=for-the-badge&logo=patreon)](https://patreon.com/alexkazakov)

## License
Auth Solana React App is [MIT licensed](https://github.com/alexandr-kazakov/auth-solana-react/blob/main/LICENSE).

