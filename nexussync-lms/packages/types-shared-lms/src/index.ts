export interface InventoryAssetType {
    assetId: string; // Unique ID for a physical copy
    catalogId: string; // Foreign key to the Catalog Service
    status: 'AVAILABLE' | 'ON_LOAN' | 'MISSING' | 'RESERVED';
    currentLocation: string; // Shelf, desk, or 'Circulation Desk'
}

export interface CheckoutRequest {
    userId: string;
    assetId: string;
    dueDate: string;
}