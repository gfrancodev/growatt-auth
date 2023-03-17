/* eslint-disable @typescript-eslint/no-unused-vars */
import { ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext){
        return super.canActivate(context)
    }

    handleRequest<TUser = any>(_err: any, user: any, _info: any, _context: ExecutionContext, _status?: any): TUser {
        const { email, password } = user 

        if (email === 'ti@solution4fleet.com.br' && password === 'S4F@b4f5c1473#SFAPI')
            return user
        else 
            throw new ForbiddenException('Usuário não tem autorização para utilizar este serviço.')
    }
}
