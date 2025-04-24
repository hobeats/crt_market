import { InputHTMLAttributes } from "react";

interface InputProps {
    errors?: string[];
    name: string;
}

export default function Input({
    errors = [],
    name,
    ...rest
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
    return (
        <div className="flex flex-col gap-2">
            <input
                name={name}
                className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-2 focus:ring-4 transition border-none placeholder:text-neutral-100 ring-neutral-200 focus:ring-orange-500"
                {...rest}
            />
            {errors.map((error, index) => (
                <span key={index} className="text-red-400 font-medium">
                    {error}
                </span>
            ))}
        </div>
    );
}
