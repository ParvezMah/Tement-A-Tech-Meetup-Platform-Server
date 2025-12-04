export interface IUser {
  password: string;
  user: {
    name: string;
    email: string;
    contactNumber?: string;
    address?: string;
    profilePhoto?: string;
  };
}
