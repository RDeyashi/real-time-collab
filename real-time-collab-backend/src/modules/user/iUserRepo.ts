import * as types from './types'

export interface iUserRepo{
    addUser: (payload: types.addUser) => Promise<any>
}