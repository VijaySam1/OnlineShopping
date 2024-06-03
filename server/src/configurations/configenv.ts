import path from 'path';

import * as dotenv from 'dotenv';
dotenv.config(
  {
    path: path.join(__dirname, "../.env"),
  },
);

export const ENV_VARS={
  db:{
    url:process.env.MONGO_URL ??'',
  },
  jwt:{
    authKey:process.env.JWT_KEY ??'',
  },
};