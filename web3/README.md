# StakeDAO - web3

StakeDAO is a Smart-Contract project where users can stake their STD20 tokens and collect rewards on a daily basis. Users also have the option to restake (compounding) their rewards to earn more rewards.

## Setup

1. Navigate to the `web3` directory.

```bash
cd web3
```

2. Run `npm install`.

```bash
npm install
```

3. Copy-paste `.env.example` and configure the following environment variables:
   - `SEPOLIA_HTTP_RPC`
   - `PRIVATE_KEY`
   - `ETHERSCAN_API_KEY`
   ```bash
   cp .env.example .env
   ```
4. Deploy and verify the STD20 token smart contract:

```bash
npm run deploy:std20:sepolia
npm run verify:std20:sepolia
```

5. Deploy and verify the StakeDao smart contract:

```bash
npm run deploy:stakedao:sepolia
npm run verify:stakedao:sepolia
```

6. Copy `typechain-types` into `frontend`, and remember to update `frontend/.env` if there are any address changes.

```bash
rm -rf frontend/typechain-types
cp -r typechain-types frontend/
```

## Contributing

Contributions are welcome! To contribute to StakeDAO, follow these steps:

1. Clone the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and test them.
4. Create a pull request describing your changes.

## Contact

For any questions or inquiries, please contact the project maintainer at [winnerpranata@gmail.com](mailto:winnerpranata@gmail.com).
