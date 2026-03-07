'use client';

import { useState } from 'react';
import { X, Plus, Terminal, Code2, Briefcase } from 'lucide-react';

interface SkillsData {
    technical: string[];
    soft: string[];
}

interface SkillsFormProps {
    data: SkillsData;
    onChange: (data: SkillsData) => void;
}

export default function SkillsForm({ data = { technical: [], soft: [] }, onChange }: SkillsFormProps) {
    const [techInput, setTechInput] = useState('');
    const [softInput, setSoftInput] = useState('');

    const addSkill = (type: 'technical' | 'soft', value: string) => {
        if (!value.trim()) return;
        const skills = [...(data[type] || [])];
        if (!skills.includes(value.trim())) {
            onChange({ ...data, [type]: [...skills, value.trim()] });
        }
        if (type === 'technical') setTechInput('');
        else setSoftInput('');
    };

    const removeSkill = (type: 'technical' | 'soft', value: string) => {
        const skills = (data[type] || []).filter((s) => s !== value);
        onChange({ ...data, [type]: skills });
    };

    const handleKeyDown = (e: React.KeyboardEvent, type: 'technical' | 'soft') => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addSkill(type, type === 'technical' ? techInput : softInput);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Technical Skills */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-slate-900 mb-2">
                    <Code2 className="w-5 h-5 text-blue-600" />
                    <h3 className="font-bold">Technical Skills</h3>
                </div>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={techInput}
                        onChange={(e) => setTechInput(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, 'technical')}
                        placeholder="Add a technical skill (e.g. React, Python, AWS)"
                        className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                    />
                    <button
                        onClick={() => addSkill('technical', techInput)}
                        className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-500/20"
                    >
                        <Plus className="w-6 h-6" />
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {(data.technical || []).map((skill) => (
                        <span
                            key={skill}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-bold border border-blue-100 group animate-in zoom-in-50 duration-200"
                        >
                            {skill}
                            <button
                                onClick={() => removeSkill('technical', skill)}
                                className="hover:text-red-500 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </span>
                    ))}
                </div>
            </div>

            {/* Soft Skills */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-slate-900 mb-2">
                    <Briefcase className="w-5 h-5 text-indigo-600" />
                    <h3 className="font-bold">Soft Skills</h3>
                </div>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={softInput}
                        onChange={(e) => setSoftInput(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, 'soft')}
                        placeholder="Add a soft skill (e.g. Leadership, Communication)"
                        className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium"
                    />
                    <button
                        onClick={() => addSkill('soft', softInput)}
                        className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-500/20"
                    >
                        <Plus className="w-6 h-6" />
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {(data.soft || []).map((skill) => (
                        <span
                            key={skill}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-bold border border-indigo-100 group animate-in zoom-in-50 duration-200"
                        >
                            {skill}
                            <button
                                onClick={() => removeSkill('soft', skill)}
                                className="hover:text-red-500 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
