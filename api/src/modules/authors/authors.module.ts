import { forwardRef, Module } from '@nestjs/common';
import { AuthorsController } from './authors.controller';
import { SharedModule } from '../shared-module.module';
import { AuthorsService } from './authors.service';

@Module({
    imports: [forwardRef(() => SharedModule)],
    controllers: [AuthorsController],
    providers: [AuthorsService],
    exports: [AuthorsService],
})
export class AuthorsModule {}
