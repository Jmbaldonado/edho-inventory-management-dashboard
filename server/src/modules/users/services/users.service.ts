import { User } from '@entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOperator, Like, Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>,
    ) {}

    async getUsers(
        pageSize?: number,
        page?: number,
        search?: string,
    ): Promise<[User[], number]> {
        const queryOptions: {
            where?: { name: FindOperator<string> };
            take?: number;
            skip?: number;
        } = {};

        if (search) {
            queryOptions.where = { name: Like(`%${search}%`) };
        }

        // Apply pagination only if pageSize and page are provided
        if (pageSize && page) {
            queryOptions.take = pageSize;
            queryOptions.skip = (page - 1) * pageSize;
        }

        return this.repository.findAndCount(queryOptions);
    }
}
