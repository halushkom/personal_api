import * as mongoose from "mongoose";

export const mongo = mongoose.createConnection(process.env.DB_LINK)