'use client';

import { useState } from 'react';
import { Sparkles, Loader2, Wand2, History } from 'lucide-react';
import { getAISummary } from '@/lib/actions/ai';

interface ProfessionalSummaryFormProps {
    summary: string;
    onChange: (summary: string) => void;
    jobTitle?: string;
}

export default function ProfessionalSummaryForm({ summary, onChange, jobTitle }: ProfessionalSummaryFormProps) {
    const [isGenerating, setIsGenerating] = useState(false);
    const [highlights, setHighlights] = useState('');

    const handleGenerate = async () => {
        if (!jobTitle) {
            alert('Please enter your full name (for job title context) in the Personal section first.');
            return;
        }

        setIsGenerating(true);
        try {
            const generatedSummary = await getAISummary(jobTitle, highlights ? [highlights] : []);
            onChange(generatedSummary);
        } catch (error) {
            console.error('Failed to generate summary:', error);
            alert('AI generation failed. Please check your API key.');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-xl shadow-blue-500/20">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16" />
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <Sparkles className="w-8 h-8 text-blue-200" />
                        <h3 className="text-xl font-bold">Smart AI Summary</h3>
                    </div>
                    <p className="text-blue-100 mb-6 leading-relaxed max-w-md">
                        Let our AI craft a powerful professional summary that catches recruiters' attention and highlights your key achievements.
                    </p>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-blue-100 mb-2">Key Highlights (Optional)</label>
                            <input
                                type="text"
                                value={highlights}
                                onChange={(e) => setHighlights(e.target.value)}
                                placeholder="e.g. 5+ years experience, cloud architecture, team management"
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-blue-200/50 outline-none focus:ring-2 focus:ring-white/30 transition-all font-medium"
                            />
                        </div>
                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            className="w-full bg-white hover:bg-white/90 text-blue-700 py-4 rounded-xl font-bold transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2"
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Wand2 className="w-5 h-5" />
                                    Generate with AI
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-slate-700">Your Professional Summary</label>
                    <span className="text-xs text-slate-400 font-medium">{summary.length} characters</span>
                </div>
                <textarea
                    value={summary || ''}
                    onChange={(e) => onChange(e.target.value)}
                    rows={8}
                    placeholder="I am a highly motivated..."
                    className="w-full p-6 bg-white border border-slate-200 rounded-3xl focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm leading-relaxed text-slate-700 resize-none font-medium"
                />
                <p className="text-xs text-slate-400">
                    Tip: A good summary is 3-4 sentences long and focuses on your most impressive relevant accomplishment.
                </p>
            </div>
        </div>
    );
}
