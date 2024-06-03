import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';


// this middleware handles the input validation errors
export const valError=(req:Request, res:Response,next:NextFunction) => {
    
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    for (const err of errors.array() ){
      const message:string=err.msg as string;
      return res.status(400).json({ message });
    }
    
  }
  next();
};