'use client';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

const SignIn = () => {
    const supabase = createClientComponentClient()
    const [errorMsg, seterrorMsg] = useState();
    const { register, handleSubmit, formState: {errors}} = useForm();

    async function signIn(formData) {
        const { error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
            
        })

        if (error) {
            seterrorMsg(error.message);
        }
    }
    return (
        <div>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit(signIn)}>
                <label htmlFor="email" />
                <input
                    {...register('email',{required: 'email is required'})}
                    id="email"
                    name="email"
                    placeholder="jane@acme.com"
                    type='email'
                />
                {errors.email && <div>{errors.email.message}</div>}
                <label htmlFor="password"/>
                <input 
                    {...register('password',{required: 'password is required'})}
                    id="password"
                    name="password"
                    placeholder="password"
                    type="password"
                />
                <Link href='/reset-password'>Forgot your password ?</Link>
                <button type="submit">
                    Sign In
                </button>
            </form>
            <Link href='/sign-up'>Don't have an account? Sign Up</Link>
            {errorMsg && <div>{errorMsg}</div>}
        </div>
    )
}

export default SignIn;