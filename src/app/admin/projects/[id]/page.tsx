import { client } from '@/lib/sanity';
import ProjectForm from '@/components/admin/ProjectForm';

interface PageProps {
    params: {
        id: string;
    };
}

// Ensure dynamic rendering to fetch fresh data
export const dynamic = 'force-dynamic';

async function getProject(id: string) {
    return await client.fetch(`*[_type == "project" && _id == $id][0]`, { id });
}

export default async function EditProjectPage({ params }: PageProps) {
    const project = await getProject(params.id);

    if (!project) {
        return <div>المشروع غير موجود</div>;
    }

    return <ProjectForm initialData={project} isEdit={true} />;
}
