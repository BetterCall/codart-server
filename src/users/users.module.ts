import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entitites/user.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([User,])],
    providers: [UsersService, UsersResolver],
    exports: [UsersService]

})
export class UsersModule { }
