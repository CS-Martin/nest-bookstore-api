import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ValidationPipe,
    ParseIntPipe,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Controller('author')
export class AuthorController {
    constructor(private readonly authorService: AuthorService) {}

    @Post()
    create(@Body(new ValidationPipe()) createAuthorDto: CreateAuthorDto) {
        return this.authorService.create(createAuthorDto);
    }

    @Get()
    findAll() {
        return this.authorService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.authorService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body(new ValidationPipe()) updateAuthorDto: UpdateAuthorDto,
    ) {
        return this.authorService.update(+id, updateAuthorDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.authorService.remove(+id);
    }
}
