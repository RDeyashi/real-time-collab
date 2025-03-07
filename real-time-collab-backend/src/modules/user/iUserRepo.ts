import * as types from './types'

export interface iUserRepo{
    checkUserExists: (email:string, userName:string) => Promise<any>
    addUser: (payload: types.addUser) => Promise<any>
    getUsers: () => Promise<any>
}