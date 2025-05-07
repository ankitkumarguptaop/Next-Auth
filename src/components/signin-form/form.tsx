'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button } from '@mui/material';
import { loginSchema, LoginSchema } from '@/libs/login-validation-schema';
import './form.module.css';
import { signInUser } from '@/features/auth/auth.action';
import { useAppDispatch } from '@/hooks/usedispatch';
import { signIn } from 'next-auth/react';
import { redirect } from 'next/navigation';



export default function LoginForm() {

    const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    console.log('Form Data:', data);
    const res = await signIn('credentials', {
      email:data.email,
      password :data.password,
      redirect: false,
    });

    if (res?.error) {
      // setError(res.error);
      console.log("Error:", res.error); 
    } else {
      redirect('/'); // Redirect after successful login
    }
  //  dispatch(signInUser(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="login-container">
      <div className="login-title">Login to Your Account</div>

      <TextField
        label="Email"
        fullWidth
        margin="normal"
        {...register('email')}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        {...register('password')}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        className="login-btn"
        disabled={isSubmitting}
      >
        Sign In
      </Button>
    </form>
  );
}
