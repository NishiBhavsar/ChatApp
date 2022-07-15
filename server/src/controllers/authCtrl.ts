import { Request, Response } from 'express'
import Users from '../models/userModel'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const authCtrl = {
    register: async (req: Request, res: Response) => {
        try {
            const { name, number, email, password, avatar }= req.body
        
            const user = await Users.findOne({ email })
            if (!user) {
                return res.status(400).json({ msg: 'Email already exist' });
            }

            const passwordHash = await bcrypt.hash(password, 12)
            
            const newUser = new Users({
                name, number, email, password: passwordHash, avatar
            })

            res.json({ msg: "Register successfully", data: newUser });
        }
        
        catch (error) {
            let errorMessage = "Failed to do something exceptional";
            if (error instanceof Error) {
              errorMessage = error.message;
            }
            // console.log(errorMessage);
            return res.status(500).json({msg:errorMessage})
            
        }
    }
}

export default authCtrl;