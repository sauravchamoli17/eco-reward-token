# [Eco Reward Token](https://eco-reward-token.vercel.app/)

## Description

Eco Reward Token is an ERC-20 token deployed on the Polygon Mumbai Testnet. It aims to incentivize and reward environmentally friendly activities. Each Eco token costs 0.001 MATIC, and there are a total of 1000 tokens available.

### Token Details

- Token Name: Eco Reward Token (ECO)
- Network: Polygon Mumbai Testnet
- Token Price: 0.001 MATIC
- Total Supply: 1000 tokens

### Use Cases

- Eco Incentives: Holders of Eco tokens can participate in eco-friendly activities and earn rewards based on their contributions to the environment.
- Environmental Projects: The Eco Reward Token can be utilized within platforms or applications that support environmental initiatives, enabling users to contribute and receive rewards in Eco tokens.

### Development

- Technology Stack: Next.js, Hardhat, OpenZeppelin
- Frontend: Next.js framework for building the user interface
- Smart Contract Development: Hardhat development framework for Ethereum smart contracts
- ERC-20 Implementation: OpenZeppelin library for implementing the ERC-20 token standard

### Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/sauravchamoli17/eco-reward-token.git

2. Install dependencies:

   cd eco-reward-token
   npm install

3. Start the development server:
   
   npm run dev

4. Access the application in your browser at http://localhost:3000.

## Deploying Your Own Contract

1. Configure your environment:

-  Create a .env file in the project root directory.
-  Add the following environment variables to the .env file:
-  ALCHEMY_RPC_URL=<Alchemy_RPC_URL>
-  PRIVATE_KEY=<Your-Private_Key>
-  ETHERSCAN_API_KEY=<Etherscan_API_Key>
-  MONGO_URI=<MongoDB_Connection_URI>
-  NEXT_PUBLIC_HOST=<Deployed-Public-Url>

- ALCHEMY_RPC_URL should be the RPC URL provided by Alchemy for your Ethereum network.

- PRIVATE_KEY should be your private key for the Ethereum account you want to use for deployment.

- ETHERSCAN_API_KEY should be your API key from Etherscan, which is required for verifying and interacting with the deployed contract on the Etherscan platform.

- MONGO_URI should be the connection URI for your MongoDB database.

- NEXT_PUBLIC_HOST should be the public host URL for your Next.js application.

2. Write your contract:

-  Navigate to the contracts directory.

-  Update the Token.sol file or create a new contract file to customize your token implementation.

3. Deploy Your Own Contract:

-  Run the following command to deploy your contract to the Polygon Mumbai Testnet:

   ```bash
      npx hardhat run scripts/deploy.js --network mumbai

4. Update the frontend:

-  In the helpers/constants.js file, modify the contract address and in the helpers/abi.json update the deployed contract's abi.

## Resources

- [Polygon Mumbai Testnet](https://mumbai.polygonscan.com/)
- [Next.js Documentation](https://nextjs.org/)
- [Hardhat Documentation](https://hardhat.org/docs)
- [OpenZeppelin Documentation](https://docs.openzeppelin.com/)

## License

This project is licensed under the MIT License.
