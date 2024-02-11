'use client';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useForm } from 'react-hook-form';

const ResetPassword = () => {
    const supabase = createClientComponentClient();
    const [errorMsg, setErrorMsg ] = useState(null);
    const [successMsg,setSuccessMsg] = useState(null);
    const { register, handleSubmit, formState: {errors}} = useForm();

    async function resetPassword(formData) {
        const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
            redirectTo: `${window.location.origin}/auth/update-password`
        })

        if (error) {
            setErrorMsg(error.message);
        } else {
            setSuccessMsg('Password reset instructions sent')
        }
    }  

    return (
        <div>
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit(resetPassword)}>
                <label htmlFor="email">email</label>
                <input 
                    {...register('email',{required: 'Email is required'})}
                    id="email"
                    name="email"
                    type="email"
                />
                {errors.email && <div>{errors.email.message}</div>}
                <button type="submit">Send Instructions</button>
            </form>
            {errorMsg && <div>{errorMsg}</div>}
            {successMsg && <div>{successMsg}</div>}
        </div>
    )
}

export default ResetPassword;