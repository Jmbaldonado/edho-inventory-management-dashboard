import { Controller, Get } from '@nestjs/common';
import { MetricsService } from '../services/metrics.service';

@Controller('metrics')
export class MetricsController {
    constructor(private readonly metricsService: MetricsService) {}

    @Get('/dashboard')
    async getDashboardMetrics() {
        return await this.metricsService.getEDashboardMetrics();
    }
}
