export interface IUser {
  password: string;
  user: {
    fullName: string;
    email: string;
    contactNumber?: string;
    address?: string;
    profilePhoto?: string;
  };
}
