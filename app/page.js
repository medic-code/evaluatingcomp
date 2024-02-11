import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import HomePage from './components/HomePage';
import SignOut from './components/SignOut';

export default async function Home() {
    const supabase = createServerComponentClient({cookies})

    const { data: {user}} = await supabase.auth.getUser();
   
    if (!user) {
        redirect('/sign-in');
    }

    return (
        <div>
            <HomePage/>
            <SignOut/>
        </div>
    )
}