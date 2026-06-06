'use client';

import { User } from '@/types';
import { createContext, useContext, useState } from 'react';

type contextDependencies = {
    token: string | null;
    user: User | null;
    login: (token: string, user: User) => void;
    logOut: () => void;
};

const context = createContext<contextDependencies | null>(null);

export default function AuthContext({
    children,
}: {
    children: React.ReactNode;
}) {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    const login = (token: string, user: User) => {
        setToken(token);
        setUser(user);
    };

    const logOut = () => {
        setToken(null);
        setUser(null);
    };

    return (
        <context.Provider value={{ token, user, login, logOut }}>
            {children}
        </context.Provider>
    );
}

export const useContextHook = () => {
    const contextHook = useContext(context);
    if (!contextHook) {
        throw new Error('Needs to be used ContextProvider');
    }
    return contextHook;
};
