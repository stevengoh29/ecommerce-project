import { Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import paginateUtil from 'src/utils/paginate.util';

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

    async getUsers(query?: any) {
        const filter: FindOptionsWhere<User> = {
            
        }

        const sort: FindOptionsOrder<User> = {
            createdAt: "ASC"
        }

        const take = query ? query?.size : 20
        const page = query ? query?.page : 1
        const skip = (page - 1) * take

        // if (query.name) filter.name = Like(`%${query.name}%`)
        // if (query.includeInactive && query.includeInactive == 'true') filter.isInactive = undefined

        // if (query.mainCategoryQueryType) {
        //     // TODO
        // }

        const result = await this.userRepository.findAndCount({
            where: filter,
            order: sort,
            take,
            skip
        })

        return paginateUtil.paginate(User, result, page, take, skip)
        // return await this.userRepository.find()
    }

    async getUserById(id: number): Promise<User> {
        return await this.userRepository.findOneBy({ id })
    }

    async getUserByUuid(userId: string): Promise<User> {
        return await this.userRepository.findOneBy({ uuid: userId })
    }

    async getUserByEmail(email: string): Promise<User> {
        return await this.userRepository.findOneBy({ email })
    }

    async validateUser(username: string, pass: string): Promise<User> {
        const user = await this.getUserByUsernameAndPassword(username, pass)
        return user
    }

    async addUser(userRegisterDto: CreateUserDto): Promise<User> {
        try {
            const user = this.userRepository.create(userRegisterDto)
            return await this.userRepository.save(user);
        } catch (error) {
            this.logger.error(error)
            throw new InternalServerErrorException(error);
        }
    }

    async getUserByUsernameAndPassword(username: string, password: string) {
        try {
            const user = await this.userRepository.findOneBy({ username })
            if (!user) throw new UnauthorizedException('Incorrect username or password')

            const isMatch = await bcrypt.compareSync(password, user.password)
            if (!isMatch) throw new UnauthorizedException('Incorrect username or password')

            return plainToClass(User, user);
        } catch (error) {
            this.logger.error(error)
            throw new InternalServerErrorException(error)
        }
    }

    async updateUser(user: User) {
        const userDto = this.userRepository.create(user)
        return await this.userRepository.save(userDto)
    }
}