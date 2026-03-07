'use client';

import { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp, Sparkles, Loader2, GripVertical } from 'lucide-react';
import { getOptimizedBullet } from '@/lib/actions/ai';

interface Experience {
    id: string;
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string[];
}

interface ExperienceFormProps {
    data: Experience[];
    onChange: (data: Experience[]) => void;
}

export default function ExperienceForm({ data, onChange }: ExperienceFormProps) {
    const [expandedId, setExpandedId] = useState<string | null>(data[0]?.id || null);
    const [optimizingIndex, setOptimizingIndex] = useState<{ id: string; index: number } | null>(null);

    const addExperience = () => {
        const newExp: Experience = {
            id: crypto.randomUUID(),
            company: '',
            position: '',
            location: '',
            startDate: '',
            endDate: '',
            current: false,
            description: [''],
        };
        onChange([...data, newExp]);
        setExpandedId(newExp.id);
    };

    const removeExperience = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        onChange(data.filter((item) => item.id !== id));
    };

    const updateExperience = (id: string, updates: Partial<Experience>) => {
        onChange(data.map((item) => (item.id === id ? { ...item, ...updates } : item)));
    };

    const addBullet = (id: string) => {
        const item = data.find((i) => i.id === id);
        if (item) {
            updateExperience(id, { description: [...item.description, ''] });
        }
    };

    const updateBullet = (id: string, index: number, value: string) => {
        const item = data.find((i) => i.id === id);
        if (item) {
            const newDesc = [...item.description];
            newDesc[index] = value;
            updateExperience(id, { description: newDesc });
        }
    };

    const removeBullet = (id: string, index: number) => {
        const item = data.find((i) => i.id === id);
        if (item && item.description.length > 1) {
            const newDesc = item.description.filter((_, i) => i !== index);
            updateExperience(id, { description: newDesc });
        }
    };

    const handleOptimizeBullet = async (id: string, index: number, bullet: string) => {
        if (!bullet.trim()) return;
        setOptimizingIndex({ id, index });
        try {
            const optimized = await getOptimizedBullet(bullet);
            updateBullet(id, index, optimized);
        } catch (error) {
            console.error('Optimization failed:', error);
            alert('AI optimization failed. Please try again.');
        } finally {
            setOptimizingIndex(null);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-900">Work Experience</h3>
                <button
                    onClick={addExperience}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold bg-blue-50 px-4 py-2 rounded-xl transition-all active:scale-95"
                >
                    <Plus className="w-5 h-5" />
                    Add Experience
                </button>
            </div>

            <div className="space-y-4">
                {data.map((exp) => (
                    <div
                        key={exp.id}
                        className={`bg-white border transition-all rounded-[2rem] overflow-hidden ${expandedId === exp.id ? 'border-blue-500 shadow-xl shadow-blue-500/5 ring-1 ring-blue-500/20' : 'border-slate-200 hover:border-slate-300'
                            }`}
                    >
                        {/* Header */}
                        <div
                            onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
                            className="p-6 cursor-pointer flex items-center justify-between group"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-2xl transition-colors ${expandedId === exp.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'}`}>
                                    <GripVertical className="w-5 h-5 cursor-grab" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">{exp.position || 'New Position'}</h4>
                                    <p className="text-sm text-slate-500 font-medium">{exp.company || 'Company Name'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={(e) => removeExperience(exp.id, e)}
                                    className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                                {expandedId === exp.id ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                            </div>
                        </div>

                        {/* Content */}
                        {expandedId === exp.id && (
                            <div className="p-8 pt-0 border-t border-slate-100 space-y-6 animate-in slide-in-from-top-2 duration-300">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Company Name</label>
                                        <input
                                            type="text"
                                            value={exp.company}
                                            onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                                            placeholder="e.g. Google"
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Position</label>
                                        <input
                                            type="text"
                                            value={exp.position}
                                            onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                                            placeholder="e.g. Senior Frontend Engineer"
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Location</label>
                                        <input
                                            type="text"
                                            value={exp.location}
                                            onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                                            placeholder="e.g. San Francisco, CA"
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Start Date</label>
                                        <input
                                            type="text"
                                            value={exp.startDate}
                                            onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                                            placeholder="e.g. June 2021"
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">End Date</label>
                                        <input
                                            type="text"
                                            value={exp.endDate}
                                            onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                                            disabled={exp.current}
                                            placeholder={exp.current ? 'Present' : 'e.g. Aug 2023'}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium disabled:opacity-50"
                                        />
                                        <label className="flex items-center mt-2 gap-2 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={exp.current}
                                                onChange={(e) => updateExperience(exp.id, { current: e.target.checked, endDate: e.target.checked ? 'Present' : '' })}
                                                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                                            />
                                            <span className="text-xs font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">I currently work here</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Bullets */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm font-semibold text-slate-700">Key Responsibilities & Achievements</label>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Powered by AI</p>
                                    </div>
                                    {exp.description.map((bullet, idx) => (
                                        <div key={idx} className="flex gap-3 group/bullet items-start">
                                            <div className="flex-1 relative">
                                                <textarea
                                                    value={bullet}
                                                    onChange={(e) => updateBullet(exp.id, idx, e.target.value)}
                                                    placeholder="e.g. Managed a team of 5 developers to deliver a new SaaS product..."
                                                    rows={2}
                                                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium text-slate-700 resize-none pr-12"
                                                />
                                                <button
                                                    onClick={() => handleOptimizeBullet(exp.id, idx, bullet)}
                                                    disabled={optimizingIndex?.id === exp.id && optimizingIndex?.index === idx}
                                                    className="absolute right-3 top-3 p-2 bg-white text-blue-600 rounded-xl shadow-sm border border-slate-100 hover:bg-blue-50 transition-all opacity-0 group-hover/bullet:opacity-100 disabled:opacity-100 disabled:bg-blue-50"
                                                    title="Optimize with AI"
                                                >
                                                    {optimizingIndex?.id === exp.id && optimizingIndex?.index === idx ? (
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                    ) : (
                                                        <Sparkles className="w-4 h-4" />
                                                    )}
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeBullet(exp.id, idx)}
                                                className="p-2 mt-2 text-slate-300 hover:text-red-500 transition-all opacity-0 group-hover/bullet:opacity-100"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => addBullet(exp.id)}
                                        className="w-full py-3 border-2 border-dashed border-slate-100 rounded-2xl text-slate-400 hover:text-blue-500 hover:border-blue-200 hover:bg-blue-50 transition-all font-bold text-sm"
                                    >
                                        + Add Bullet Point
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {data.length === 0 && (
                    <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] p-12 text-center">
                        <p className="text-slate-500 font-medium mb-4">No experience entries yet.</p>
                        <button
                            onClick={addExperience}
                            className="bg-white border border-slate-200 px-6 py-3 rounded-xl font-bold text-blue-600 hover:bg-white shadow-sm hover:shadow-md transition-all active:scale-95"
                        >
                            Add Your First Role
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
