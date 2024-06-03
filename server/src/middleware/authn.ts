import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { USER } from '../model/user';
import { ENV_VARS } from '../configurations/configenv';

// this middleware handles authentication using JWT token
export const authentication = (req: Request, res: Response, next: NextFunction) => {

  const authHeader = req.headers['authorization'];
  if (authHeader) {
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, ENV_VARS.jwt.authKey, async (err) => {
      if (err) return res.status(400).send({ message: "bad request" });
      
      const decode= jwt.decode(token) as JwtPayload;
      const id= decode._id as string;
            
      const user = await USER.findById(id);
      if (!user) return res.status(401).send({ message: 'unauthorized user' });
    });
    next();
  } else {
    res.status(401).send({ message: "unauthorized user" });
  }

};
