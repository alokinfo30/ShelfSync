// Core Express server setup
import express from 'express';
import { AppDataSource } from './data-source';
import { InventoryAsset } from './entities/InventoryAsset';

AppDataSource.initialize().then(() => {
    const app = express();
    app.use(express.json());

    // API to check the real-time status of a book copy
    app.get('/api/inventory/:assetId', async (req, res) => {
        const asset = await AppDataSource.getRepository(InventoryAsset).findOne({
            where: { assetId: req.params.assetId }
        });

        if (!asset) {
            return res.status(404).json({ message: 'Asset not found' });
        }
        // Solves: Inventory Efficiency (real-time status check)
        return res.json({ 
            assetId: asset.assetId,
            status: asset.status, // e.g., 'AVAILABLE', 'ON_LOAN', 'MISSING'
            location: asset.currentLocation 
        });
    });

    // ... Event Listener setup for Kafka (Future Step) ...

    app.listen(3001, () => console.log('Inventory Service running on port 3001'));
}).catch(error => console.log(error));