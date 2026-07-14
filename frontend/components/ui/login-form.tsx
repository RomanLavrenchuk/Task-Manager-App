'use client';
import { useContextHook } from '@/context/auth-context';
import { loginUser } from '@/lib/api';
import { LoginFormData, loginSchema } from '@/lib/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/dist/client/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function LoginForm() {
    const router = useRouter();
    const { login } = useContextHook();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            const res = await loginUser(data.email, data.password);
            login(res.user.user);
            router.push('/dashboard');
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-8 w-full max-w-md'>
                <div className='mb-6 text-center'>
                    <h1 className='text-2xl font-semibold text-indigo-600 mb-1'>
                        TaskFlow
                    </h1>
                    <p className='text-sm text-gray-500'>
                        Sign in to your account
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='flex flex-col gap-4'
                >
                    <div className='flex flex-col gap-1'>
                        <label className='text-sm font-medium text-gray-700'>
                            Email
                        </label>
                        <input
                            {...register('email')}
                            type='email'
                            placeholder='you@example.com'
                            className='border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
                        />
                        {errors.email && (
                            <p className='text-xs text-red-500'>
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label className='text-sm font-medium text-gray-700'>
                            Password
                        </label>
                        <input
                            {...register('password')}
                            type='password'
                            placeholder='••••••••'
                            className='border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
                        />
                        {errors.password && (
                            <p className='text-xs text-red-500'>
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <button
                        type='submit'
                        className='bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 mt-2'
                    >
                        Sign in
                    </button>
                </form>

                <p className='text-center text-sm text-gray-500 mt-4'>
                    No account?{' '}
                    <Link
                        href='/register'
                        className='text-indigo-600 hover:underline'
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}
