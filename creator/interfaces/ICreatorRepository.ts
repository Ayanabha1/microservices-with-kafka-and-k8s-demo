import { ICreator } from '../models/creator-model';

export interface ICreatorRepository {
    findByEmail(email: string): Promise<ICreator | null>;
    addCreator(user: string): Promise<void>;
}
