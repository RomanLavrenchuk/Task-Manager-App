'use client';
import Link from 'next/link';
import { useContextHook } from '@/context/auth-context';

export default function Navbar() {
    const { user } = useContextHook();

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
            <div className='h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-medium text-indigo-700'>
                {user?.name?.charAt(0).toUpperCase() ?? 'U'}
            </div>
        </nav>
    );
}
