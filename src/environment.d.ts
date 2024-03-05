declare namespace NodeJS {
    interface ProcessEnv{
        PORT: number;
        DBNAME: string;
        JWT_SECRET: string;
    }
}