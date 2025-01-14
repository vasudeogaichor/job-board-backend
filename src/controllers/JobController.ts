import { Request, Response as ExpressResponse } from "express";
// import User from "../models/User";
import { AppError, Response } from "../core";
// import { generateAuthToken, toUserDTO } from "../utils";
// import { OAuth2Client } from "google-auth-library";

// const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// interface LoginRequest extends Request {
//   body: {
//     email: string;
//     password: string;
//   };
// }

// interface SignupRequest extends Request {
//   body: {
//     email: string;
//     password: string;
//     fullName: string;
//     grade: number;
//   };
// }

// interface GoogleAuthRequest extends Request {
//   body: {
//     credential: string;
//   };
// }

export default class AuthController {
  static async createJob(
    req: Request,
    res: ExpressResponse
  ): Promise<ExpressResponse> {
    return res.json(Response.success({ success: true }));
  }
}
//   static async signup(
//     req: SignupRequest,
//     res: ExpressResponse
//   ): Promise<ExpressResponse> {
//     const { email, password, fullName, grade } = req.body;

//     if (await User.findOne({ email })) {
//       throw AppError.badRequest("Email already exists");
//     }

//     const user = await User.create({ email, password, fullName, grade });
//     const token = generateAuthToken(user);

//     return res.json(
//       Response.success({ token, user: toUserDTO(user.toObject()) })
//     );
//   }

//   static async googleAuth(
//     req: GoogleAuthRequest,
//     res: ExpressResponse
//   ): Promise<ExpressResponse> {
//     const { credential } = req.body;
//     const ticket = await googleClient.verifyIdToken({
//       idToken: credential,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });

//     const payload = ticket.getPayload();
//     if (!payload) {
//       throw AppError.badRequest("Failed to sign in with google!");
//     }

//     const { email, name: fullName, sub: googleId } = payload;

//     let user = await User.findOne({ googleId });
//     if (!user) {
//       user = await User.create({
//         email,
//         fullName,
//         googleId,
//       });
//     }
//     const token = generateAuthToken(user);

//     return res.json(
//       Response.success({ token, user: toUserDTO(user.toObject()) })
//     );
//   }
// }
