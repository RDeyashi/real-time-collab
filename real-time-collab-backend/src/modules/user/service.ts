import { iUserRepo } from './iUserRepo';
import { iUserService } from './iUserService';
import * as types from "./types";

export class UserService implements iUserService {
    private readonly userRepo: iUserRepo;
    constructor(userRepo: iUserRepo){
        this.userRepo = userRepo;
    }
    async addUser(payload: types.addUser): Promise<void> {
        try {
            console.log('Add user service working')
            const dbResult = this.userRepo.addUser(payload);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}