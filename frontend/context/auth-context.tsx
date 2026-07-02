'use client';

import { User } from '@/types';
import { createContext, useContext, useState } from 'react';

type contextDependencies = {
    user: User | null;
    login: (user: User) => void;
    logOut: () => void;
};

const context = createContext<contextDependencies | null>(null);

export default function AuthContext({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<User | null>(null);

    const login = (user: User) => {
        setUser(user);
    };

    const logOut = () => {
        setUser(null);
    };

    return (
        <context.Provider value={{ user, login, logOut }}>
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
