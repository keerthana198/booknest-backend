import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    create(name: string, email: string, password: string): Promise<User>;
    findByEmail(email: string): Promise<UserDocument | null>;
    findById(id: string): Promise<User | null>;
    getTopReviewers(): Promise<User[]>;
}
