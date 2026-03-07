import { createClient } from '@/lib/supabase/server';
import { notFound, redirect } from 'next/navigation';
import ResumeBuilderClient from '@/components/resume/ResumeBuilderClient';

export default async function EditorPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const { data: resume, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !resume || resume.user_id !== user.id) {
        notFound();
    }

    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <ResumeBuilderClient initialData={resume} />
        </div>
    );
}
