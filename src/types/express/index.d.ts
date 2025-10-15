

declare namespace Express {
  export interface Request {
    user?: {
      // userId: string;
      name: string;
      email: string;
      role: string;
      _id: string;
    };
  }
}
