'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getResumes() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return [];

    const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('user_id', user.id)

    if (error) {
        console.error('Error fetching resumes:', error);
        return [];
    }

    return data;
}

export async function createResume(title: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
        .from('resumes')
        .insert([
            {
                user_id: user.id,
                title: title || 'Untitled Resume',
            },
        ])
        .select()
        .single();

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/dashboard');
    return data;
}

export async function deleteResume(id: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error('Not authenticated');

    const { error } = await supabase
        .from('resumes')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/dashboard');
}

export async function updateResume(id: string, updates: any) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
        .from('resumes')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath(`/editor/${id}`);
    return data;
}
