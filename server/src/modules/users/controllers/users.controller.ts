import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}
    @Get('')
    async getProducts(
        @Query('pageSize') pageSize: number,
        @Query('page') page: number,
        @Query('search') search: string,
    ) {
        const [users, totalUsers] = await this.userService.getUsers(
            pageSize,
            page,
            search,
        );
        return {
            data: users,
            metadata: {
                current_page: +page,
                total_records: totalUsers,
                max_pages: Math.ceil(totalUsers / pageSize) || 1,
            },
        };
    }
}
