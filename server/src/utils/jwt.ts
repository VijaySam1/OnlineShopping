import EnvVars from "../configurations/configEnv";
import jwt,{JwtPayload} from 'jsonwebtoken';

export const generateJWT = (id:string) => {
  const token = jwt.sign({
    _id: id,
  }, EnvVars.jwt.authKey, { expiresIn: '7d' });
  return token;
};

export const decodeJWT =(headerToken:string)=>{
  const authHeader = headerToken;
  const token:string = authHeader && authHeader.split(' ')[1];
  const decode=jwt.decode(token)as JwtPayload;
  return decode;
};
