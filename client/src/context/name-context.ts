import React from 'react';

type name = { value: string; setValue: React.Dispatch<React.SetStateAction<string>> };
export const NameContext = React.createContext<name>({ value: '', setValue: (): string => '' });
