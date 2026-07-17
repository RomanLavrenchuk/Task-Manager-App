'use client';
import Link from 'next/link';
import { useContextHook } from '@/context/auth-context';
import { Button } from '../ui/button';
import { logoutUser } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const { user, logOut } = useContextHook();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await logoutUser();
            logOut(); // Call the logout function from the context to clear the user state
            router.push('/login'); // Redirect to the login page after logout
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <nav className='flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3'>
            <Link href='/' className='text-base font-semibold text-indigo-600'>
                TaskFlow
            </Link>
            <div className='flex gap-6'>
                <Link
                    href='/dashboard'
                    className='text-sm text-gray-600 hover:text-gray-900'
                >
                    Dashboard
                </Link>
                <Link
                    href='/tasks'
                    className='text-sm text-gray-600 hover:text-gray-900'
                >
                    Tasks
                </Link>
            </div>
            <div className='flex items-center gap-3'>
                <div className='h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-medium text-indigo-700'>
                    {user?.name?.charAt(0).toUpperCase() ?? 'U'}
                </div>
                <Button
                    onClick={() => handleLogout()}
                    className='text-sm text-gray-500 hover:text-red-500 border border-gray-200 px-3 py-1 rounded-lg hover:border-red-200 transition-colors'
                >
                    Log out
                </Button>
            </div>
        </nav>
    );
}
