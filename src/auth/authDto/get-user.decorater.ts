import { createParamDecorator,ExecutionContext } from "@nestjs/common";
import { User } from "src/users/user.schema";

export const GetUser = createParamDecorator((data,cxt:ExecutionContext):User => {
    const req = cxt.switchToHttp().getRequest()
    return req.user
})