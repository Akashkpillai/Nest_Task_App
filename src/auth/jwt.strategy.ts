import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/users/users.service";
import { JwtPayload } from "./authDto/jwt.interface";
import { User } from "src/users/user.schema";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private userService:UsersService){
        super({
            secretOrKey:process.env.JWT_SECRET,
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    })
    }

    async validate(payload:JwtPayload):Promise<User>{
        let { _id } = payload
        let user = await this.userService.findOneById(_id)

        if(!user){
            throw new UnauthorizedException();
        }
        else {
            return user
        }
    }
}