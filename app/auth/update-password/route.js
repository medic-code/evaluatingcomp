import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');
    console.log(requestUrl,'hi')
    console.log(code,'code');

    if (code) {
        console.log('code',code);
        const cookieStore = cookies()
        const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
        await supabase.auth.exchangeCodeForSession(code);

        return redirect(`${requestUrl.origin}/update-password`)
    }

    console.error('ERROR: Invalid auth code or no auth code found');

    return redirect(`${requestUrl.origin}/sign-in`)
}