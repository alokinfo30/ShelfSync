// Loan Service Logic
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CheckoutRequest, InventoryAssetType } from 'types-shared-lms';

@Injectable()
export class LoanService {
    // Inject Kafka Client configured in AppModule
    constructor(@Inject('KAFKA_CLIENT') private readonly kafkaClient: ClientKafka) {}

    async processCheckout(data: CheckoutRequest, inventoryStatus: InventoryAssetType) {
        // 1. Perform database transaction for the loan record (SQL)
        // ... save loan to PostgreSQL ...

        // 2. Emit an event to update other services
        this.kafkaClient.emit('asset.checked_out', {
            assetId: data.assetId,
            userId: data.userId,
            status: 'ON_LOAN',
            timestamp: new Date().toISOString(),
        }); // Solves: Inventory Efficiency (async update)

        return { loanId: 'L-12345', status: 'issued' };
    }
}