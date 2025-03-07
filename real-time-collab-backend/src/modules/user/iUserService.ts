import * as types from './types';

export interface iUserService {
    addUser: (payload: types.addUser) => Promise<void>
}