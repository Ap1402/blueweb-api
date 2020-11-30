import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role } from './roles.model';
import  {rolesProviders}  from './roles.providers';

@Module({
  providers: [RolesService, ...rolesProviders],
  controllers: [RolesController],
  exports:[...rolesProviders]
})
export class RolesModule {}
