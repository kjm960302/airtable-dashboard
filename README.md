# Airtable Dashboard

A modern data dashboard that visualizes Airtable data with beautiful charts and statistics.

## Features

- Real-time data visualization with interactive charts (Bar, Line, Pie)
- Responsive design with Tailwind CSS
- Automatic fallback to sample data if Airtable is not configured
- Easy integration with any Airtable base

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Airtable (Optional)

The app works out of the box with sample data. To connect to your Airtable:

#### Step 1: Get Your Airtable API Key

1. Go to [airtable.com/create/tokens](https://airtable.com/create/tokens)
2. Create a new personal access token with the following scopes:
   - `data.records:read`
   - `schema.bases:read`
3. Copy your API key

Create a `.env.local` file and add your API key:
```
AIRTABLE_API_KEY=your_airtable_api_key_here
```

#### Step 2: Create an Airtable Base

1. Go to [airtable.com](https://airtable.com) and sign in
2. Click "Add a base" and choose "Start from scratch"
3. Name your base (e.g., "Dashboard Data")

#### Step 3: Create a Table

Create a table with the following columns:
- `name` (Single line text)
- `value` (Number)
- `category` (Single line text)
- `date` (Date)

Add some sample data to your table.

#### Step 4: Get Your Base ID and Table Name

1. Open your Airtable base
2. Go to Help > API documentation
3. Find your Base ID (starts with "app...")
4. Note your table name (default is "Table 1")

#### Step 5: Update Environment Variables

Edit `.env.local` and update with your Base ID and Table Name:

```env
AIRTABLE_API_KEY=your_airtable_api_key_here
AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
AIRTABLE_TABLE_NAME=Table 1
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Add environment variables in Vercel:
   - `AIRTABLE_API_KEY`
   - `AIRTABLE_BASE_ID` (optional)
   - `AIRTABLE_TABLE_NAME` (optional)
5. Deploy!

## Built With

- [Next.js 15](https://nextjs.org/) - React Framework
- [TypeScript](https://www.typescriptlang.org/) - Type Safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Recharts](https://recharts.org/) - Charts
- [Airtable](https://airtable.com/) - Database

## License

MIT
