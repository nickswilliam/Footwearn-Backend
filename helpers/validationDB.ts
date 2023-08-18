import User, {IUser} from "../models/user";
import { sendNewEmail } from "../mailer/mailer";

export const existsEmail = async(email: string): Promise<void> => {
    const existEmail: IUser | null = await User.findOne({email});

    if(existEmail && existEmail.verified){
        throw new Error(`El email ${email} corresponde a un usuario registrado`)
    }
    if(existEmail && !existEmail.verified){
        await sendNewEmail(email, existEmail.code as string, existEmail.name)
    }
}