import Link from 'next/link';

export default function Home() {
    return (
        <div className='min-h-screen bg-gray-100'>
            {/* Navbar */}
            <nav className='bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between'>
                <span className='text-base font-semibold text-indigo-600'>
                    TaskFlow
                </span>
                <div className='flex gap-3'>
                    <Link
                        href='/login'
                        className='text-sm text-gray-600 hover:text-gray-900 px-4 py-2'
                    >
                        Sign in
                    </Link>
                    <Link
                        href='/register'
                        className='text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700'
                    >
                        Get started
                    </Link>
                </div>
            </nav>

            {/* Hero */}
            <div className='flex flex-col items-center justify-center text-center px-6 py-24'>
                <h1 className='text-4xl font-semibold text-gray-900 mb-4'>
                    Manage your tasks{' '}
                    <span className='text-indigo-600'>simply</span>
                </h1>
                <p className='text-gray-500 text-lg max-w-md mb-8'>
                    A clean kanban board to organize your work. Drag, drop, and
                    get things done.
                </p>
                <div className='flex gap-3'>
                    <Link
                        href='/register'
                        className='bg-indigo-600 text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-indigo-700'
                    >
                        Get started free
                    </Link>
                    <Link
                        href='/login'
                        className='bg-white text-gray-700 text-sm font-medium px-6 py-3 rounded-lg border border-gray-200 hover:bg-gray-50'
                    >
                        Sign in
                    </Link>
                </div>
            </div>

            {/* Features */}
            <div className='max-w-4xl mx-auto px-6 pb-24 grid grid-cols-3 gap-6'>
                <div className='bg-white rounded-xl border border-gray-200 p-6'>
                    <div className='w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-4'>
                        <span className='text-indigo-600 text-lg'>📋</span>
                    </div>
                    <h3 className='text-sm font-medium text-gray-900 mb-2'>
                        Kanban board
                    </h3>
                    <p className='text-sm text-gray-500'>
                        Visualize your work across Todo, In Progress, and Done
                        columns.
                    </p>
                </div>
                <div className='bg-white rounded-xl border border-gray-200 p-6'>
                    <div className='w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-4'>
                        <span className='text-indigo-600 text-lg'>🖱️</span>
                    </div>
                    <h3 className='text-sm font-medium text-gray-900 mb-2'>
                        Drag and drop
                    </h3>
                    <p className='text-sm text-gray-500'>
                        Move tasks between columns with smooth drag and drop.
                    </p>
                </div>
                <div className='bg-white rounded-xl border border-gray-200 p-6'>
                    <div className='w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-4'>
                        <span className='text-indigo-600 text-lg'>🔒</span>
                    </div>
                    <h3 className='text-sm font-medium text-gray-900 mb-2'>
                        Secure auth
                    </h3>
                    <p className='text-sm text-gray-500'>
                        Your data is protected with JWT and httpOnly cookies.
                    </p>
                </div>
            </div>
        </div>
    );
}
