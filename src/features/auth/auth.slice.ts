
import { createSlice } from "@reduxjs/toolkit";
import { signInUser, signUpUser } from "./auth.action";
import { enqueueSnackbar } from "notistack";
import { redirect } from "next/navigation";

interface User {
  name: string;
  email: string;
  token: string;
  role: string;
  profilePic?: string;
}

interface AuthState {
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const authUserSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    removeError: (state: any) => {
      state.error = null;
    },
    logout: (state: any) => {
      redirect("./");
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(signUpUser.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(signUpUser.fulfilled, (state: any) => {
        state.isLoading = false;
      })
      .addCase(signUpUser.rejected, (state: any, action: any) => {
        enqueueSnackbar(action.payload?.message || "Sign up failed", {
          variant: "error",
          autoHideDuration: 5000,
        });
        state.isLoading = false;
        state.error = action.error?.message || null;
      })
      .addCase(signInUser.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(signInUser.fulfilled, (state: any, action: any) => {
        state.currentUser = action.payload.user;
        // Cookies.set("jwt", action.payload.user.token, {
        //   expires: 7,
        //   secure: true,
        // });
        state.isLoading = false;
      })
      .addCase(signInUser.rejected, (state: any, action: any) => {
        enqueueSnackbar(action.payload?.message || "Sign in failed", {
          variant: "error",
          autoHideDuration: 5000,
        });
        state.isLoading = false;
        state.error = action.error?.message || null;
      });
  },
});

export const { removeError, logout } = authUserSlice.actions;
export default authUserSlice.reducer;