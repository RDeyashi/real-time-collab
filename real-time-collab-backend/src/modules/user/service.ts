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
            statusCode: eStatusCode.CREATED,
            isError: false,
            message: Messages.MemberAdded,
        };
        try {
            const isExistingUser = await this.userRepo.checkUserExists(payload.email, payload.username);

            if (!isExistingUser) {
                const dbResult = await this.userRepo.addUser(payload);
            } else {
                response = setResponse(response, eStatusCode.CLIENT_INPUT_ERROR, true, Messages.AlreadyExistUser)
            }

            //console.log('Add user service working', isExistingUser, dbResult)
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            return response;
        }
    }

    async getUsers(): Promise<serviceResponse> {
        let response: serviceResponse = {
            statusCode: eStatusCode.OK,
            isError: false,
            message: Messages.FetchedUser,
        };

        try {
            const usersList = await this.userRepo.getUsers();
            if (!usersList) {
                response = setResponse(response, eStatusCode.BAD_REQUEST, true, eErrorMessage.ServerError)
            }
            response = setResponse(response, eStatusCode.OK, false, Messages.FetchedUser, usersList)
        } catch (error) {
            console.error(error);
            throw error;
        }
        finally {
            return response;
        }
    }
}