declare namespace NodeJS {
    interface ProcessEnv{
        PORT: string;
        DBNAME: string;
        JWT_SECRET: string;
    }
}