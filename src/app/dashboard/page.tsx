import { getResumes } from '@/lib/actions/resumes';
import Link from 'next/link';
import { Plus, FileText, Clock, ChevronRight, Sparkles } from 'lucide-react';

export default async function DashboardPage() {
    const resumes = await getResumes();

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">My Resumes</h1>
                    <p className="text-slate-500">Manage and create your AI-powered resumes</p>
                </div>
                <Link
                    href="/editor/new"
                    className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02]"
                >
                    <Plus className="w-5 h-5" />
                    Create New Resume
                </Link>
            </div>

            {resumes.length === 0 ? (
                <div className="bg-white rounded-[2rem] border-2 border-dashed border-slate-200 p-16 text-center">
                    <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <FileText className="w-10 h-10" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-3">No resumes yet</h2>
                    <p className="text-slate-500 mb-8 max-w-sm mx-auto">
                        Create your first professional resume with the help of AI in just a few minutes.
                    </p>
                    <Link
                        href="/editor/new"
                        className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-semibold transition-all hover:scale-[1.02]"
                    >
                        Get Started
                        <ChevronRight className="w-5 h-5" />
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resumes.map((resume) => (
                        <Link
                            key={resume.id}
                            href={`/editor/${resume.id}`}
                            className="group bg-white p-6 rounded-3xl border border-slate-200 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5 transition-all"
                        >
                            <div className="w-12 h-12 bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 rounded-2xl flex items-center justify-center mb-6 transition-colors">
                                <FileText className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2 truncate group-hover:text-blue-600 transition-colors">
                                {resume.title}
                            </h3>
                            <div className="flex items-center gap-2 text-slate-400 text-sm">
                                <Clock className="w-4 h-4" />
                                <span>
                                    Updated {new Date(resume.updated_at).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                                <span>Edit Resume</span>
                                <ChevronRight className="w-5 h-5" />
                            </div>
                        </Link>
                    ))}

                    {/* New Resume Card Placeholder */}
                    <Link
                        href="/editor/new"
                        className="flex flex-col items-center justify-center p-6 rounded-3xl border-2 border-dashed border-slate-200 hover:border-blue-500 hover:bg-blue-50/30 transition-all text-slate-400 hover:text-blue-600 group"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-slate-50 group-hover:bg-blue-100 flex items-center justify-center mb-4 transition-colors">
                            <Plus className="w-6 h-6" />
                        </div>
                        <span className="font-semibold">Create New</span>
                    </Link>
                </div>
            )}

            {/* Quick AI Tip Section */}
            <div className="mt-16 p-8 rounded-[2rem] bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20" />
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2">Want a faster way to finish?</h3>
                        <p className="text-slate-400 max-w-2xl leading-relaxed">
                            Our AI can analyze your existing experience and suggest professional summaries that get you past ATS filters. Just look for the <span className="text-blue-400 font-semibold">"Generate with AI"</span> button in the editor.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
