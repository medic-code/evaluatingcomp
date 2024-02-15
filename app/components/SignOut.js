'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import styles from '../styles.module.css';

export default function signout() {
    const supabase = createClientComponentClient();

    async function handleSignOut() {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error('ERROR:', error);
        }
    }
    return (
        <a className={styles.signout} type="button" onClick={handleSignOut}>
            Sign Out
        </a>
    )
}