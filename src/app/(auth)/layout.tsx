import { ReactNode } from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
            {/* Left side - Branding/Hero */}
            <div className="hidden md:flex flex-col justify-between p-10 bg-slate-900 text-white relative overflow-hidden">
                {/* Abstract Background Decoration */}
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none" />

                <div className="relative z-10">
                    <Link href="/" className="flex items-center gap-2 group w-fit">
                        <div className="w-8 h-8 rounded-lg bg-blue-500 grid place-items-center group-hover:bg-blue-400 transition-colors">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-xl tracking-tight">AI Resume Builder</span>
                    </Link>
                </div>

                <div className="relative z-10">
                    <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-4">
                        Build your professional resume in minutes.
                    </h1>
                    <p className="text-slate-400 text-lg max-w-md">
                        Use the power of AI to craft the perfect story of your career and land your dream job.
                    </p>
                </div>

                <div className="text-sm text-slate-500 relative z-10">
                    &copy; {new Date().getFullYear()} AI Resume Builder. All rights reserved.
                </div>
            </div>

            {/* Right side - Form container */}
            <div className="flex items-center justify-center p-6 bg-slate-50/50">
                <div className="w-full max-w-md">
                    {children}
                </div>
            </div>
        </div>
    );
}
