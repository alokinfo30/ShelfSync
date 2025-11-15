import { NextResponse } from 'next/server';
import { CheckoutRequest } from 'types-shared-lms';

// Define the URL for your core Circulation Service
const CIRCULATION_SERVICE_URL = 'http://localhost:3003/api/circulate';
const INVENTORY_SERVICE_URL = 'http://localhost:3001/api/inventory';

export async function POST(request: Request) {
  const data: CheckoutRequest = await request.json();

  try {
    // 1. Check Inventory Status (Inventory Efficiency pre-check)
    const inventoryRes = await fetch(`${INVENTORY_SERVICE_URL}/${data.assetId}`);
    if (!inventoryRes.ok) {
        return NextResponse.json({ message: 'Asset not found or unavailable' }, { status: 404 });
    }
    const inventoryData = await inventoryRes.json();
    if (inventoryData.status !== 'AVAILABLE') {
        return NextResponse.json({ message: `Asset is ${inventoryData.status}` }, { status: 400 });
    }

    // 2. Call Core Circulation Microservice
    const circulationRes = await fetch(CIRCULATION_SERVICE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!circulationRes.ok) {
      // Proxy the error back to the frontend
      const error = await circulationRes.json();
      return NextResponse.json(error, { status: circulationRes.status });
    }

    // 3. Success response
    return NextResponse.json({ success: true, message: 'Checkout processed' }, { status: 200 });

  } catch (error) {
    console.error('BFF Checkout Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}