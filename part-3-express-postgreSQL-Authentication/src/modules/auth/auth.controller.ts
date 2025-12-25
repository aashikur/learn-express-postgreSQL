import { Request, Response } from "express";
import { authService } from "./auth.service";



const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
            const result = await authService.loginUser(email, password);
            console.log(result);
            if (!result) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid email or password',
                });
            }
            res.status(200).json({
                success: true,
                message: 'User logged in successfully',
                data: {
                    user: result.user,
                    token: result.token,
                },
            });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Invalid email or password/something went wrong',
        })
    }
}


export const authController = {
    loginUser,
}