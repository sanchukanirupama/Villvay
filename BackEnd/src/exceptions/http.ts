export class HttpException extends Error {
    public status: number;
    public message: string;
    public userMessage: string | undefined;
  
    constructor(status: number, message: string, userMessage?: string) {
      super(message);
      this.status = status;
      this.message = message;
      this.userMessage = userMessage;
    }
  }
  