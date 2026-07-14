'use client';
import { registerUser } from '@/lib/api';
import { RegisterFormData, registerSchema } from '@/lib/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function RegisterForm() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const registerNewUser = async (
        email: string,
        password: string,
        name?: string,
    ) => {
        try {
            const newUser = await registerUser(email, password, name);
            if (newUser) {
                console.log('Success new user successfully created');
            }
            router.push('/login');
        } catch (e) {
            console.log(e);
            throw new Error('User was not created');
        }
    };

    const onSubmit = async (data: RegisterFormData) => {
        await registerNewUser(data.email, data.password, data.name);
    };

    return (
        <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-8 w-full max-w-md'>
                <div className='mb-6 text-center'>
                    <h1 className='text-2xl font-semibold text-indigo-600 mb-1'>
                        TaskFlow
                    </h1>
                    <p className='text-sm text-gray-500'>Create your account</p>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='flex flex-col gap-4'
                >
                    <div className='flex flex-col gap-1'>
                        <label className='text-sm font-medium text-gray-700'>
                            Name
                        </label>
                        <input
                            {...register('name')}
                            type='text'
                            placeholder='John Doe'
                            className='border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
                        />
                        {errors.name && (
                            <p className='text-xs text-red-500'>
                                {errors.name.message}
                            </p>
                        )}
                    </div>

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
                        Create account
                    </button>
                </form>

                <p className='text-center text-sm text-gray-500 mt-4'>
                    Already have an account?{' '}
                    <Link
                        href='/login'
                        className='text-indigo-600 hover:underline'
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
