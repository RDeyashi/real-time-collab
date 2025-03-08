import { serviceResponse } from '../../types/response.types'
import * as types from './types'
export interface iSigninService{
    signin: (payload: types.signin) => Promise<serviceResponse>
}