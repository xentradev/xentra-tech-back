import { CustomError } from "../errors/custom.error"

export class UserEntity{
    constructor(  public id: number, public email:string, public password:string,){
    }


    static fromObject(object: {[key: string]:any}){
        const {id,email,password} = object

        if(!id) throw CustomError.badRequest('Missing id')

        if(!email) throw CustomError.badRequest('Missing email')

        return new UserEntity(id,email,password)
    }
}