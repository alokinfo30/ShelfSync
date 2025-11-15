// In Inventory Service (NestJS/Express setup as Microservice)
import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Ctx, KafkaContext, Payload } from '@nestjs/microservices';

@Controller()
export class InventoryController {
    private readonly logger = new Logger(InventoryController.name);

    // Listen to the Kafka topic
    @EventPattern('asset.checked_out')
    async handleCheckoutEvent(@Payload() data: any, @Ctx() context: KafkaContext) {
        this.logger.log(`Received checkout event for Asset: ${data.assetId}`);

        // Solves: Inventory Efficiency (decoupled status update)
        // 1. Find asset in local PostgreSQL DB by data.assetId
        // 2. Update status field to 'ON_LOAN'
        // 3. Mark the current location as 'With User: data.userId'
        
        // Return a response (optional for event patterns)
        return {};
    }
}