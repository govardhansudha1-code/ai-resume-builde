'use client';

import { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp, GripVertical } from 'lucide-react';

interface Education {
    id: string;
    school: string;
    degree: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    gpa: string;
}

interface EducationFormProps {
    data: Education[];
    onChange: (data: Education[]) => void;
}

export default function EducationForm({ data, onChange }: EducationFormProps) {
    const [expandedId, setExpandedId] = useState<string | null>(data[0]?.id || null);

    const addEducation = () => {
        const newEdu: Education = {
            id: crypto.randomUUID(),
            school: '',
            degree: '',
            location: '',
            startDate: '',
            endDate: '',
            current: false,
            gpa: '',
        };
        onChange([...data, newEdu]);
        setExpandedId(newEdu.id);
    };

    const removeEducation = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        onChange(data.filter((item) => item.id !== id));
    };

    const updateEducation = (id: string, updates: Partial<Education>) => {
        onChange(data.map((item) => (item.id === id ? { ...item, ...updates } : item)));
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-900">Education</h3>
                <button
                    onClick={addEducation}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold bg-blue-50 px-4 py-2 rounded-xl transition-all active:scale-95"
                >
                    <Plus className="w-5 h-5" />
                    Add Education
                </button>
            </div>

            <div className="space-y-4">
                {data.map((edu) => (
                    <div
                        key={edu.id}
                        className={`bg-white border transition-all rounded-[2rem] overflow-hidden ${expandedId === edu.id ? 'border-blue-500 shadow-xl shadow-blue-500/5 ring-1 ring-blue-500/20' : 'border-slate-200 hover:border-slate-300'
                            }`}
                    >
                        {/* Header */}
                        <div
                            onClick={() => setExpandedId(expandedId === edu.id ? null : edu.id)}
                            className="p-6 cursor-pointer flex items-center justify-between group"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-2xl transition-colors ${expandedId === edu.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'}`}>
                                    <GripVertical className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">{edu.degree || 'New Degree'}</h4>
                                    <p className="text-sm text-slate-500 font-medium">{edu.school || 'School Name'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={(e) => removeEducation(edu.id, e)}
                                    className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                                {expandedId === edu.id ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                            </div>
                        </div>

                        {/* Content */}
                        {expandedId === edu.id && (
                            <div className="p-8 pt-0 border-t border-slate-100 space-y-6 animate-in slide-in-from-top-2 duration-300">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">School / University</label>
                                        <input
                                            type="text"
                                            value={edu.school}
                                            onChange={(e) => updateEducation(edu.id, { school: e.target.value })}
                                            placeholder="e.g. Stanford University"
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Degree</label>
                                        <input
                                            type="text"
                                            value={edu.degree}
                                            onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                                            placeholder="e.g. B.S. in Computer Science"
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Location</label>
                                        <input
                                            type="text"
                                            value={edu.location}
                                            onChange={(e) => updateEducation(edu.id, { location: e.target.value })}
                                            placeholder="e.g. Stanford, CA"
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">GPA (Optional)</label>
                                        <input
                                            type="text"
                                            value={edu.gpa}
                                            onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })}
                                            placeholder="e.g. 3.9/4.0"
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Start Date</label>
                                        <input
                                            type="text"
                                            value={edu.startDate}
                                            onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                                            placeholder="e.g. Sept 2018"
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">End Date</label>
                                        <input
                                            type="text"
                                            value={edu.endDate}
                                            onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                                            disabled={edu.current}
                                            placeholder={edu.current ? 'Present' : 'e.g. May 2022'}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium disabled:opacity-50"
                                        />
                                        <label className="flex items-center mt-2 gap-2 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={edu.current}
                                                onChange={(e) => updateEducation(edu.id, { current: e.target.checked, endDate: e.target.checked ? 'Present' : '' })}
                                                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                                            />
                                            <span className="text-xs font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">I am currently studying here</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {data.length === 0 && (
                    <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] p-12 text-center">
                        <p className="text-slate-500 font-medium mb-4">No education history added.</p>
                        <button
                            onClick={addEducation}
                            className="bg-white border border-slate-200 px-6 py-3 rounded-xl font-bold text-blue-600 hover:bg-white shadow-sm hover:shadow-md transition-all active:scale-95"
                        >
                            Add Education
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
