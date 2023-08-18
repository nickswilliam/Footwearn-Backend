import { Model, Schema, model } from "mongoose";
import { ROLES } from "../helpers/constants";

export interface IUser {
    name: string,
    lastname: string,
    email: string,
    password: string,
    rol?: string,
    code?: string,
    verified: boolean
}

const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    lastname: {
        type: String,
        required: [true, "El apellido es obligatorio"]
    },
    email: {
        type: String,
        required: [true, "El email es obligatorio"]
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"]
    },
    rol: {
        type: String,
        default: ROLES.user
    },
    code: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    }
});


//Function that only returns the USER
UserSchema.methods.toJSON = function(){
    const {__v, password, _id, code, ...user} = this.toObject();
    return user;
} 

const User: Model<IUser> = model<IUser>("User", UserSchema)
export default User;



