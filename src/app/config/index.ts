import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT,
  db_url: process.env.DB_URL,
  jwt_secret: process.env.JWT_SECRET,
  jwt_access_expires: process.env.JWT_ACCESS_EXPIRES,
};