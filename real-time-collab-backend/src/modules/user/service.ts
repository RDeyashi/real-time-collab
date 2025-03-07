import { iUserRepo } from './iUserRepo';
import { iUserService } from './iUserService';
import * as types from "./types";
import { setResponse } from "../../handler/responsehandler"
import { eStatusCode } from '../../enum/status-code.enum';
import { eErrorMessage } from '../../enum/error-message.enum';
import { serviceResponse } from '../../types/response.types';
import { Messages } from './messages'

export class UserService implements iUserService {
    private readonly userRepo: iUserRepo;
    constructor(userRepo: iUserRepo) {
        this.userRepo = userRepo;
    }
    async addUser(payload: types.addUser): Promise<serviceResponse> {
        let response: serviceResponse = {
            statusCode: eStatusCode.OK,
            isError: false,
            message: Messages.MemberAdded,
        };
        try {
            const isExistingUser = await this.userRepo.checkUserExists(payload.email);
            console.log('addUserService', isExistingUser)
            if (!isExistingUser) {
                response = setResponse(response, eStatusCode.BAD_REQUEST, true, Messages.AlreadyExistUser)
            }
            //const dbResult = await this.userRepo.addUser(payload);

            //console.log('Add user service working', isExistingUser, dbResult)
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            return response;
        }
    }
}