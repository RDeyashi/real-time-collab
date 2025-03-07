import { serviceResponse } from '../../types/response.types';
import * as types from './types';

export interface iUserService {
    addUser: (payload: types.addUser) => Promise<serviceResponse>
    getUsers: () => Promise<serviceResponse>
}