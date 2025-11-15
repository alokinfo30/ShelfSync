import { NextResponse } from 'next/server';

const CATALOGING_SERVICE_URL = 'http://localhost:3004/api/books/search'; 
const INVENTORY_SERVICE_URL = 'http://localhost:3001/api/inventory/availability'; // Assume this new Inventory endpoint gives counts

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    
    // 1. Get the list of matching catalog IDs from the Cataloging Service (Elasticsearch)
    const catalogRes = await fetch(`${CATALOGING_SERVICE_URL}?q=${query}`);
    if (!catalogRes.ok) return NextResponse.json({ message: 'Catalog search failed' }, { status: 503 });
    const catalogData = await catalogRes.json();
    
    const catalogIds = catalogData.map((item: any) => item.catalogId);

    // 2. Aggregate: Fetch real-time availability counts for these IDs
    // This is the key BFF step for Member Discovery accuracy.
    const availabilityRes = await fetch(INVENTORY_SERVICE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ catalogIds }), // Bulk request to Inventory Service
    });
    
    const availabilityData = await availabilityRes.json(); // { 'C-001': 5, 'C-002': 1, ... }

    // 3. Transform: Merge data for the frontend
    const mergedResults = catalogData.map((book: any) => ({
        ...book,
        availableCount: availabilityData[book.catalogId] || 0,
    }));
    
    return NextResponse.json(mergedResults, { status: 200 });
}


