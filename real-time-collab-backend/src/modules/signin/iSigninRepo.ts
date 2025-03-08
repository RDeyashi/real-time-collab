import * as types from './types'

export interface iSigninRepo {
    signin: (payload: types.signin) => Promise<any>
}