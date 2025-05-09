export type UserStatus = 'active' | 'inactive';

export interface UserData {
    id: string;
    name: string;
    email: string;
    picture: string;
    roles: string[];
    plans: string[];
    status: UserStatus;
}
