import { NextResponse } from 'next/server';
import Airtable from 'airtable';

// Sample data structure for when Airtable is not configured
const sampleData = [
  { id: '1', name: 'Product A', value: 450, category: 'Electronics', date: '2024-01-15' },
  { id: '2', name: 'Product B', value: 320, category: 'Clothing', date: '2024-01-18' },
  { id: '3', name: 'Product C', value: 680, category: 'Electronics', date: '2024-01-22' },
  { id: '4', name: 'Product D', value: 210, category: 'Food', date: '2024-01-25' },
  { id: '5', name: 'Product E', value: 540, category: 'Clothing', date: '2024-02-02' },
  { id: '6', name: 'Product F', value: 390, category: 'Electronics', date: '2024-02-08' },
  { id: '7', name: 'Product G', value: 750, category: 'Food', date: '2024-02-12' },
  { id: '8', name: 'Product H', value: 280, category: 'Clothing', date: '2024-02-18' },
  { id: '9', name: 'Product I', value: 620, category: 'Electronics', date: '2024-02-22' },
  { id: '10', name: 'Product J', value: 410, category: 'Food', date: '2024-03-01' },
];

export async function GET() {
  try {
    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableName = process.env.AIRTABLE_TABLE_NAME;

    // If Airtable is not configured, return sample data
    if (!apiKey || !baseId || !tableName || baseId === 'your_base_id_here') {
      return NextResponse.json({
        data: sampleData,
        source: 'sample',
        message: 'Using sample data. Configure Airtable credentials to use real data.',
      });
    }

    // Configure Airtable
    Airtable.configure({
      apiKey: apiKey,
    });

    const base = Airtable.base(baseId);
    const records: any[] = [];

    // Fetch records from Airtable
    await base(tableName)
      .select({
        maxRecords: 100,
        view: 'Grid view',
      })
      .eachPage((pageRecords, fetchNextPage) => {
        pageRecords.forEach((record) => {
          records.push({
            id: record.id,
            ...record.fields,
          });
        });
        fetchNextPage();
      });

    return NextResponse.json({
      data: records,
      source: 'airtable',
      message: 'Data fetched from Airtable successfully.',
    });
  } catch (error: any) {
    console.error('Error fetching data:', error);

    // If there's an error with Airtable, fall back to sample data
    return NextResponse.json({
      data: sampleData,
      source: 'sample',
      message: `Error connecting to Airtable: ${error.message}. Using sample data.`,
    });
  }
}
