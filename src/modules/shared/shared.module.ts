import { Global, Module } from "@nestjs/common";
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { config } from 'dotenv';
import { JwtStrategy } from "./config/jwt.strategy";
import { AuthRepository } from "./repositories/prisma/auth.repository";
import { CodeRepository } from "./repositories/prisma/code.repository";
import { RoleRepository } from "./repositories/prisma/role.repository";
config()

@Global()
@Module({
    imports: [
        PassportModule,
        JwtModule.register({
          secret: `${process.env.JWT_SECRET_KEY}`,
          signOptions: { expiresIn: '30mn' },
        }),
    ],
    providers: [
        JwtService,
        JwtStrategy,
        {
            provide: 'Auth',
            useClass: AuthRepository
        }, {
            provide: 'Code',
            useClass: CodeRepository
        }, {
            provide: 'Role',
            useClass: RoleRepository           
        }
    ],
    exports: [
        JwtService,
        JwtStrategy,
        {
            provide: 'Auth',
            useClass: AuthRepository
        }, {
            provide: 'Code',
            useClass: CodeRepository
        }, {
            provide: 'Role',
            useClass: RoleRepository           
        }
    ]
})
export class SharedModule {}