# Token Swap Feature — Next.js

A lightweight token swap explorer built with Next.js, Tailwind CSS, and ShadCN components. Users can select two tokens, enter a USD amount, and see the approximate token amounts. Includes live price fetching, light/dark mode, and timestamp of last calculation.

## Features

- Swap price exploration for USDC, USDT, ETH, and WBTC.
- Real-time USD to token conversion.
- Light and dark mode toggle.
- Last calculation timestamp display.
- Modular component design for maintainability.

## Demo

[Deployed App Placeholder](https://token-swap-jel.vercel.app/)

## Installation & Setup

1. Clone the repository:
```bash
git clone https://github.com/Clouddoggo/crypto-exchange.git
cd crypto-exchange
```

2. Install dependencies:
```bash
npm install
```

3. Add your Funkit API key to a `.env.local` file:
```env
FUNKIT_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) to view the app.

## Design Choices & Assumptions

- Used `@funkit/api-base` to fetch ERC20 token info and price.
- Only included a subset of notable tokens, easily extendable.
- USD input is the source for calculating both token amounts.
- Light/dark mode is implemented using a state toggle and Tailwind CSS classes.
- Timestamp uses local browser time to indicate last price fetch.

## Libraries Used

- **Next.js** — React framework for server-side rendering and routing.
- **Tailwind CSS** — Utility-first CSS framework for rapid UI styling.
- **ShadCN/UI** — Component library for cards, buttons, inputs, selects.
- **Lucide React** — Icons for theme toggle and swap button.

## Notes

- Components are modular (`TokenSelect`, `UsdInput`, `Results`) for maintainability.
- API fetching is centralized in `fetchTokenBatch` to handle batch requests.
- Designed for easy extension to additional tokens and chains.
