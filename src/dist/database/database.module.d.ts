import { OnModuleInit } from "@nestjs/common";
import { Connection } from "mongoose";
export declare class DatabaseModule implements OnModuleInit {
    private readonly connection;
    constructor(connection: Connection);
    onModuleInit(): Promise<void>;
}
