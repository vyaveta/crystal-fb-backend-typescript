import { Request } from "express";

export interface UserDetails {
    first_name: string; 
    last_name: string;
    email: string;
    username: string;
    bYear: number;
    bMonth: number;
    bDay: number;
    gender: string;
    password: string;
  }

  export interface injectedRequest extends Request {
    user: {
      id: string
    }
  }