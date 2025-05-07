import { SignInPayload } from "@/features/auth/auth.action";
import axios from "axios";

export const signupUserService = async (data: FormData) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/auth/signup`,
    data
  );
};

export const signinUserService = async (data: SignInPayload) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/auth/signin`,
    data
  );
};