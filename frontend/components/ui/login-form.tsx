'use client';
import { useContextHook } from '@/context/auth-context';
import { loginUser } from '@/lib/api';
import { LoginFormData, loginSchema } from '@/lib/validators';
import { zodResolver } from '@hookform/resolvers/zod';
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
            login(res.token, res.user);
            router.push('/dashboard');
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Email</label>
                <input {...register('email')} />
                {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div>
                <label>Password</label>
                <input {...register('password')} />
                {errors.password && <p>{errors.password.message}</p>}
            </div>
            <button>Submit</button>
        </form>
    );
}
