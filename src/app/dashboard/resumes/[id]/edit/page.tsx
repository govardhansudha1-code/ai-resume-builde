import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import ResumeBuilderClient from '@/components/resume/ResumeBuilderClient';

export default async function EditResumePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // If this is 'new', we'd typically create a new db record first, or handle it in client
    // For simplicity, let's assume 'new' redirects to an create endpoint, but if the ID is actual UUID:
    let resume = null;

    if (id !== 'new') {
        const { data } = await supabase
            .from('resumes')
            .select('*')
            .eq('id', id)
            .single();

        if (!data) {
            redirect('/dashboard');
        }
        resume = data;
    }

    return (
        <div className="h-[calc(100vh-8rem)] -mt-6 md:-m-10">
            <ResumeBuilderClient initialData={resume} />
        </div>
    );
}
