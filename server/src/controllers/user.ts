import {Request, Response} from 'express';

// import bcrypt from 'bcrypt';

import { USER } from '../model/user';
import { generateJWT, decodeJWT } from '../utils/jwt';
import { JwtPayload } from 'jsonwebtoken';
import { userRole } from '../enums/userRole';


interface IUser{
  name: string;
  mobileNumber:number;
  password:string;
}

//controller to handle rigister of the user
export const register = (req: Request, res: Response) => {
  const requestBody:IUser=req.body as IUser;
  const { name, mobileNumber, password } = requestBody;

   USER.findOne({mobileNumber}).then(async (user)=>{
    if(user){
      res.status(400).send({ message: "User already exist" });
    }
    const role=userRole.uSER;
    user=await USER.create({name,mobileNumber,password,role});
    res.status(200).send({message:"User registered successfully"});

  }).catch((err)=>{
    res.status(400).send({ message: "bad request" });
  })
};


//controller to handle Login of the user and it gives jwt token as output
export const login = (req:Request, res: Response) => {
  const requestBody:IUser=req.body as IUser;
  const { mobileNumber,password } = requestBody;
  USER.findOne({
    mobileNumber: mobileNumber,
    password:password,
    isDeleted:false,
  }).then(async (user) => {
    if ((user)) {
      const id = user.id as string;

      console.log(id);
      const TOKEN = generateJWT(id);
      await user.save();
      res.status(200).send({ token: TOKEN });
    } else {
      res.status(400).send({ message: "bad request" });
    }
  }).catch((err) => {
    console.log(err);
    res.status(400).send({ message: "bad request" });
  });
};


//controller to get all risitered users
export const getUsers =async (req: Request, res: Response) => {
  const users = await USER.find({});
  if (!users) {
    res.status(400).send({ message: "users not found" });
  }
  res.status(200).send({ message: "Success", data: users });
};