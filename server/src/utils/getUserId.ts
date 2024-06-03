import { JwtPayload } from "jsonwebtoken";
import { decodeJWT } from "./jwt";

export const getUserId=(authHeader:string)=>{
    // const authHeader: string = req.headers.get('authorization') as string;
    const decode: JwtPayload= decodeJWT(authHeader);
    const id = decode._id as string;
    return id;
}
