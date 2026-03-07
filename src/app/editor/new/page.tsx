import { createResume } from '@/lib/actions/resumes';
import { redirect } from 'next/navigation';

export default async function NewResumePage() {
    const resume = await createResume('My Professional Resume');
    redirect(`/editor/${resume.id}`);
}
