import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';

@Controller('configuration')
export class ConfigurationController {

    constructor(private configurationService: ConfigurationService,
    ) { }


/*     @Get('/menu/:userId')
    async getMenForUser(@Param() params) {
        const { userId } = params;
        return this.configurationService.getMenuForUser(userId)
    }
 */
}
