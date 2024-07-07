import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Controller('authors')
export class AuthorsController {
    constructor(private readonly authorsService: AuthorsService) {}

    @Post()
    create(@Body() createAuthorDto: CreateAuthorDto) {
        return this.authorsService.create(createAuthorDto);
    }

    @Get()
    findAll() {
        return this.authorsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.authorsService.findOneWithBooksName(id);
    }

    @Get('name/:name')
    findByName(@Param('name') name: string) {
        return this.authorsService.findByName(name);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateAuthorDto: UpdateAuthorDto,
    ) {
        return this.authorsService.update(id, updateAuthorDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.authorsService.remove(id);
    }
}
