'use client';
import { registerUser } from '@/lib/api';
import { RegisterFormData, registerSchema } from '@/lib/validators';
import { zodResolver } from '@hookform/resolvers/zod';
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Name</label>
                <input {...register('name')} />
                {errors.name && <p>{errors.name.message}</p>}
            </div>
            <div>
                <label>Email</label>
                <input {...register('email')} />
                {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div>
                <label>Password</label>
                <input {...register('password')} type='password' />
                {errors.password && <p>{errors.password.message}</p>}
            </div>
            <button>Submit</button>
        </form>
    );
}
