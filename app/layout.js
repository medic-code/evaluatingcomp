import './global.css';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import AuthProvider from './components/AuthProvider'

export default async function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
  }) {
    const supabase = createServerComponentClient({cookies});

    const {
        data: { session } 
    } = await supabase.auth.getSession();

    return (
      <html lang="en">
        <body>
            <AuthProvider accessToken={session?.access_token}>
            {children}
            </AuthProvider>
        </body>
      </html>
    )
  }