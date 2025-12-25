import { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
            // what we did here, req.body req.params as we got those we will get req.user also;
        }
    }
}