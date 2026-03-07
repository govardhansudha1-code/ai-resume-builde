'use server';

import { generateSummary as aiGenerateSummary, optimizeBulletPoint as aiOptimizeBulletPoint } from '@/lib/ai/openrouter';
import { createClient } from '@/lib/supabase/server';

export async function getAISummary(jobTitle: string, highlights: string[]) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error('Not authenticated');

    return await aiGenerateSummary(jobTitle, highlights);
}

export async function getOptimizedBullet(bullet: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error('Not authenticated');

    return await aiOptimizeBulletPoint(bullet);
}
