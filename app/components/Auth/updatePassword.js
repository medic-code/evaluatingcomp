'use client';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const UpdatePassword = () => {
    const supabase = createClientComponentClient();
    const [errorMsg, setErrorMsg] = useState('');
    const { register, handleSubmit, formState: {errors}} = useForm();
    const router = useRouter();
    async function updatePassword(formData) {
        const { error } = await supabase.auth.updateUser({
            password: formData.password
        })

        if (error) {
            setErrorMsg(error.message)
        } else {
            router.replace('/')
        }
    }

    return (
        <div>
            <h2>Update Password</h2>
            <form onSubmit={handleSubmit(updatePassword)}>
                <label htmlFor="password">New Password</label>
                <input 
                    {...register('password',{required: 'password is required'})}
                    id="password"
                    name="password"
                    type="password"
                />
                {errors.password && <div>{errors.password.message}</div>}
                <button type="submit">
                    Update password
                </button>
            </form>
            {errorMsg && <div>{errorMsg}</div>}
        </div>
    )
}

export default UpdatePassword;
