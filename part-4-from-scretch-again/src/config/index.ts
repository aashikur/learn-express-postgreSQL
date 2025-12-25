import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), ".env") })

export const PORT = process.env.PORT;
console.log(`Configured PORT: ${PORT}`);

const config : any = {
    port : process.env.PORT,
    connection_string : process.env.CONNECTION_STRING
}

export default config;