export class AppError extends Error {
    public readonly message: string;

    public readonly name: string;

    public readonly status: number;

    constructor(statusCode: number, statusName: string , message: string) {
        super();
        this.status = statusCode;
        this.name = statusName
        this.message = message;
    }
}