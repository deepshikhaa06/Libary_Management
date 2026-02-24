import dotenv from "dotenv";

dotenv.config();

const MONGO_URL: string = "mongodb://localhost:27017/library_management";

const PORT: number = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 8080;
const ROUNDS : number = process.env.SERVER_ROUNDS ? Number(process.env.SERVER_ROUNDS) : 10;
export const config = {
    mongo: {
        url: MONGO_URL,
    },
    server: {
        port: PORT,
        rounds : ROUNDS
    },
};