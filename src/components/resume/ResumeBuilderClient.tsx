'use client';

import { useState, useEffect } from 'react';
import { Save, Sparkles, Download, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { updateResume } from '@/lib/actions/resumes';
import PersonalInfoForm from './PersonalInfoForm';
import ProfessionalSummaryForm from './ProfessionalSummaryForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import SkillsForm from './SkillsForm';

export default function ResumeBuilderClient({ initialData }: { initialData: any }) {
    const [resumeData, setResumeData] = useState(initialData);
    const [activeTab, setActiveTab] = useState('personal');
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await updateResume(resumeData.id, {
                title: resumeData.title,
                personal_info: resumeData.personal_info,
                professional_summary: resumeData.professional_summary,
                experience: resumeData.experience,
                education: resumeData.education,
                skills: resumeData.skills,
            });
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch (error) {
            console.error('Failed to save resume:', error);
            alert('Failed to save resume. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const updatePersonalInfo = (info: any) => {
        setResumeData({ ...resumeData, personal_info: info });
    };

    const updateSummary = (summary: string) => {
        setResumeData({ ...resumeData, professional_summary: summary });
    };

    const updateExperience = (experience: any[]) => {
        setResumeData({ ...resumeData, experience });
    };

    const updateEducation = (education: any[]) => {
        setResumeData({ ...resumeData, education });
    };

    const updateSkills = (skills: any) => {
        setResumeData({ ...resumeData, skills });
    };

    const { personal_info: pi } = resumeData;

    return (
        <div className="flex h-full flex-col md:flex-row bg-slate-100 overflow-hidden">
            {/* Left Pane - Form Editor */}
            <div className="w-full md:w-1/2 flex flex-col bg-white border-r border-slate-200 h-full overflow-hidden shadow-xl z-10 transition-all">

                {/* Editor Header */}
                <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard" className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <input
                            type="text"
                            value={resumeData.title}
                            onChange={(e) => setResumeData({ ...resumeData, title: e.target.value })}
                            className="font-semibold text-slate-900 bg-transparent border-none focus:ring-0 p-0 w-48 focus:bg-slate-50 rounded px-2"
                        />
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all text-sm shadow-sm ${saveSuccess
                            ? 'bg-green-500 text-white'
                            : 'bg-slate-900 hover:bg-slate-800 text-white hover:shadow-md active:scale-95 disabled:opacity-50'
                            }`}
                    >
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : (saveSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />)}
                        {saveSuccess ? 'Saved!' : (isSaving ? 'Saving...' : 'Save')}
                    </button>
                </div>

                {/* Editor Tabs */}
                <div className="flex overflow-x-auto border-b border-slate-200 bg-slate-50/50 p-2 gap-1 px-4 hide-scrollbar">
                    {['personal', 'summary', 'experience', 'education', 'skills'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium capitalize whitespace-nowrap transition-all duration-200 ${activeTab === tab
                                ? 'bg-white text-blue-600 shadow-sm border border-slate-200/60'
                                : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Editor Content Area */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-50/30">
                    <div className="max-w-xl mx-auto">
                        {activeTab === 'personal' && (
                            <PersonalInfoForm
                                data={resumeData.personal_info || {}}
                                onChange={updatePersonalInfo}
                            />
                        )}

                        {activeTab === 'summary' && (
                            <ProfessionalSummaryForm
                                summary={resumeData.professional_summary || ''}
                                onChange={updateSummary}
                                jobTitle={resumeData.personal_info?.fullName}
                            />
                        )}

                        {activeTab === 'experience' && (
                            <ExperienceForm
                                data={resumeData.experience || []}
                                onChange={updateExperience}
                            />
                        )}

                        {activeTab === 'education' && (
                            <EducationForm
                                data={resumeData.education || []}
                                onChange={updateEducation}
                            />
                        )}

                        {activeTab === 'skills' && (
                            <SkillsForm
                                data={resumeData.skills || { technical: [], soft: [] }}
                                onChange={updateSkills}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Right Pane - Live Preview */}
            <div className="w-full md:w-1/2 bg-slate-100 h-full flex flex-col relative">
                {/* Preview Toolbar */}
                <div className="p-4 border-b border-slate-200 flex items-center justify-end bg-white/50 backdrop-blur-md sticky top-0 z-20">
                    <button className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-4 py-2 rounded-xl font-medium transition-all shadow-sm text-sm active:scale-95">
                        <Download className="w-4 h-4" />
                        Export PDF
                    </button>
                </div>

                {/* Preview Document Area */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-12 flex items-start justify-center bg-slate-200/50">
                    {/* A4 Size Paper Representation */}
                    <div className="w-full max-w-[210mm] min-h-[297mm] bg-white shadow-2xl rounded-sm p-16 shrink-0 transition-transform origin-top">
                        {/* Header Section */}
                        <div className="text-center border-b-2 border-slate-800 pb-8 mb-8">
                            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight uppercase mb-4 min-h-[1em]">
                                {pi?.fullName || 'Your Name'}
                            </h1>
                            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11pt] text-slate-600 font-medium">
                                {pi?.email && <span>{pi.email}</span>}
                                {pi?.phone && (
                                    <>
                                        <span className="text-slate-300">•</span>
                                        <span>{pi.phone}</span>
                                    </>
                                )}
                                {pi?.location && (
                                    <>
                                        <span className="text-slate-300">•</span>
                                        <span>{pi.location}</span>
                                    </>
                                )}
                            </div>
                            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[10pt] text-blue-600 mt-2">
                                {pi?.website && <span className="hover:underline cursor-default">{pi.website}</span>}
                                {pi?.linkedin && (
                                    <>
                                        {pi.website && <span className="text-slate-300">•</span>}
                                        <span className="hover:underline cursor-default">{pi.linkedin}</span>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Document Content */}
                        <div className="space-y-10">
                            {/* Summary */}
                            <section>
                                <h2 className="text-[13pt] font-bold text-slate-900 uppercase tracking-[0.1em] border-b border-slate-200 pb-1 mb-4">
                                    Professional Summary
                                </h2>
                                <p className="text-[11pt] text-slate-700 leading-relaxed min-h-[4rem]">
                                    {resumeData.professional_summary || 'Your professional summary will appear here once you add it in the editor.'}
                                </p>
                            </section>

                            {/* Experience Placeholder */}
                            <section>
                                <h2 className="text-[13pt] font-bold text-slate-900 uppercase tracking-[0.1em] border-b border-slate-200 pb-1 mb-4">
                                    Professional Experience
                                </h2>
                                <div className="space-y-8">
                                    {resumeData.experience && resumeData.experience.length > 0 ? (
                                        resumeData.experience.map((exp: any) => (
                                            <div key={exp.id}>
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <h3 className="text-[12pt] font-extrabold text-slate-900">{exp.position}</h3>
                                                        <p className="text-[11pt] font-bold text-slate-700">{exp.company}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-[10pt] font-bold text-slate-700 italic">
                                                            {exp.startDate} – {exp.endDate || (exp.current ? 'Present' : '')}
                                                        </p>
                                                        <p className="text-[10pt] text-slate-500 font-medium">{exp.location}</p>
                                                    </div>
                                                </div>
                                                <ul className="list-disc ml-5 space-y-1.5">
                                                    {exp.description.map((bullet: string, idx: number) => (
                                                        <li key={idx} className="text-[10.5pt] text-slate-700 leading-relaxed pl-1">
                                                            {bullet}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="bg-slate-50/50 rounded-lg p-6 border border-dashed border-slate-200 text-center text-slate-400 italic">
                                            Add your work experience to see it perfectly formatted here.
                                        </div>
                                    )}
                                </div>
                            </section>

                            {/* Education Placeholder */}
                            <section>
                                <h2 className="text-[13pt] font-bold text-slate-900 uppercase tracking-[0.1em] border-b border-slate-200 pb-1 mb-4">
                                    Education
                                </h2>
                                <div className="space-y-6">
                                    {resumeData.education && resumeData.education.length > 0 ? (
                                        resumeData.education.map((edu: any) => (
                                            <div key={edu.id} className="flex flex-col sm:flex-row sm:items-start justify-between">
                                                <div className="space-y-1">
                                                    <h3 className="text-[12pt] font-extrabold text-slate-900">{edu.school}</h3>
                                                    <p className="text-[11pt] font-bold text-slate-700 italic">{edu.degree}</p>
                                                    {edu.gpa && <p className="text-[10pt] text-slate-600 font-medium tracking-tight">GPA: {edu.gpa}</p>}
                                                </div>
                                                <div className="text-right mt-1 sm:mt-0">
                                                    <p className="text-[10pt] font-bold text-slate-700 italic">
                                                        {edu.startDate} – {edu.endDate || (edu.current ? 'Present' : '')}
                                                    </p>
                                                    <p className="text-[10pt] text-slate-500 font-medium">{edu.location}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="bg-slate-50/50 rounded-lg p-4 border border-dashed border-slate-200 text-center text-slate-400 italic">
                                            Add your educational background.
                                        </div>
                                    )}
                                </div>
                            </section>

                            {/* Skills Section */}
                            <section>
                                <h2 className="text-[13pt] font-bold text-slate-900 uppercase tracking-[0.1em] border-b border-slate-200 pb-1 mb-4">
                                    Skills
                                </h2>
                                <div className="space-y-4">
                                    {resumeData.skills && (resumeData.skills.technical?.length > 0 || resumeData.skills.soft?.length > 0) ? (
                                        <>
                                            {resumeData.skills.technical?.length > 0 && (
                                                <div className="flex gap-x-2 flex-wrap">
                                                    <span className="text-[10pt] font-extrabold text-slate-900 min-w-[120px]">Technical Skills:</span>
                                                    <p className="text-[10.5pt] text-slate-700 flex-1 leading-relaxed">
                                                        {resumeData.skills.technical.join(', ')}
                                                    </p>
                                                </div>
                                            )}
                                            {resumeData.skills.soft?.length > 0 && (
                                                <div className="flex gap-x-2 flex-wrap mt-2">
                                                    <span className="text-[10pt] font-extrabold text-slate-900 min-w-[120px]">Soft Skills:</span>
                                                    <p className="text-[10.5pt] text-slate-700 flex-1 leading-relaxed">
                                                        {resumeData.skills.soft.join(', ')}
                                                    </p>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="bg-slate-50/50 rounded-lg px-4 py-2 border border-dashed border-slate-200 text-slate-400 italic w-full text-center">
                                            List your technical and soft skills.
                                        </div>
                                    )}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

