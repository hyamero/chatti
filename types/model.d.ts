export interface IUser {
    id?: string;
    username?: string;
    photoURL?: string | null;
    email?: string | null;
    dateJoined?: any;
    uid?: string;
    displayName?: string | null;
    email? : string | null;
    displayData: boolean;
  }

  export interface IMessage {
    author?: {
      id: string;
      name: string;
      photoURL: string
    };
    createdAt?: {
      seconds: number,
      nanoseconds: number;
    };
    id?: string;
    messageValue?: string;
  }