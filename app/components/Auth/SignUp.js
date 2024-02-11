'use client'

import { useState } from 'react';
import { createClientComponentClient} from '@supabase/auth-helpers-nextjs';
import { useForm } from 'react-hook-form';
import styles from '../../styles.module.css';
import Link from 'next/link';

const SignUp = () => {
    const { register, handleSubmit, formState: {errors}} = useForm();
    const supabase = createClientComponentClient();
    const [errorMsg,setErrorMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    async function signup(formData) {
        console.log(formData);
        const { error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
                emailRedirectTo: `${window.location.origin}/auth/callback`
            }
        })
        if (error) {
            setErrorMsg(error.message);
        } else {
            setSuccessMsg('Success, Please check your email for further instructions');
        }
    }
    
    return (
        <div className="card">
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit(signup)}>
                <label htmlFor='email'>Email</label>
                <input 
                {...register('email',{required: 'Email is required'})}
                id="email"
                name="email"
                placeholder="jane@acme.com"
                type="email"
                />
            {errors.company && <div><span className={styles.error}>{errors.company.message}</span></div>}
            <label htmlFor="password">Password</label>
            <input
                {...register('password',{required: 'Password is required'})}
                id="password"
                name="password"
                placeholder="xxx"
                type="password"
            />
            {errors.password && <div><span className={styles.error}>{errors.password.name}</span></div>}
            <button type="submit">
                Submit
            </button>
            </form>
            <Link href='/sign-in'>Already have an account? Sign In</Link>
            {errorMsg && <div>{errorMsg}</div>}
            {successMsg && <div>{successMsg}</div>}
            
        </div>
    )
}

export default SignUp; 