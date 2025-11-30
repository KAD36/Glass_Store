'use client';

import { useState, useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Upload, X } from 'lucide-react';
import { urlFor } from '@/lib/sanity';
import styles from '@/app/admin/projects/project-form.module.css';
import { createProject, updateProject } from '@/app/actions/projectActions';

interface ProjectFormProps {
    initialData?: {
        _id?: string;
        title: string;
        description: string;
        images?: any[];
    };
    isEdit?: boolean;
}

export default function ProjectForm({ initialData, isEdit = false }: ProjectFormProps) {
    const [title, setTitle] = useState(initialData?.title || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [newImages, setNewImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    // Keep track of existing images to keep (for edit mode)
    const [existingImages, setExistingImages] = useState<any[]>(initialData?.images || []);
    const [uploading, setUploading] = useState(false);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setDescription(initialData.description);
            setExistingImages(initialData.images || []);
        }
    }, [initialData]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setNewImages((prev) => [...prev, ...newFiles]);

            // Create previews for new files
            const newPreviews = newFiles.map(file => URL.createObjectURL(file));
            setPreviews((prev) => [...prev, ...newPreviews]);
        }
    };

    const removeNewImage = (index: number) => {
        setNewImages((prev) => prev.filter((_, i) => i !== index));
        setPreviews((prev) => prev.filter((_, i) => i !== index));
    };

    const removeExistingImage = (index: number) => {
        setExistingImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);

        try {
            const imageAssetIds: string[] = [];

            // 1. Keep existing images (if any)
            const existingAssetIds = existingImages.map(img => img.asset._ref);
            imageAssetIds.push(...existingAssetIds);

            // 2. Upload new images
            for (const image of newImages) {
                const formData = new FormData();
                formData.append('file', image);

                const uploadRes = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (!uploadRes.ok) throw new Error('Image upload failed');

                const { asset } = await uploadRes.json();
                imageAssetIds.push(asset._id);
            }

            // 3. Create or Update project using Server Actions
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('imageAssetIds', JSON.stringify(imageAssetIds));

            startTransition(async () => {
                try {
                    if (isEdit && initialData?._id) {
                        await updateProject(initialData._id, formData);
                    } else {
                        await createProject(formData);
                    }
                } catch (error) {
                    console.error(error);
                    alert('Failed to save project');
                }
            });

        } catch (error) {
            console.error(error);
            alert('Error uploading images');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className={styles.formContainer}>
            <h1 className="text-2xl font-bold mb-6 text-slate-800">
                {isEdit ? 'تعديل المشروع' : 'إضافة مشروع جديد'}
            </h1>

            <form onSubmit={handleSubmit}>
                <div className={styles.group}>
                    <label className={styles.label}>عنوان المشروع</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className={styles.input}
                        placeholder="مثال: واجهة فيلا مودرن"
                    />
                </div>

                <div className={styles.group}>
                    <label className={styles.label}>وصف المشروع</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        className={styles.textarea}
                        placeholder="اكتب وصفاً تفصيلياً للمشروع..."
                    />
                </div>

                <div className={styles.group}>
                    <label className={styles.label}>صور المشروع</label>
                    <div className={styles.imageUpload} onClick={() => document.getElementById('fileInput')?.click()}>
                        <Upload className="mx-auto mb-2 text-slate-400" />
                        <p className="text-slate-500">اضغط لرفع الصور</p>
                        <input
                            id="fileInput"
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </div>

                    <div className={styles.previewGrid}>
                        {/* Existing Images */}
                        {existingImages.map((img, index) => (
                            <div key={`existing-${index}`} className={styles.previewItem}>
                                <Image
                                    src={urlFor(img).width(200).url()}
                                    alt="Existing"
                                    fill
                                    className="object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeExistingImage(index)}
                                    className={styles.removeBtn}
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ))}

                        {/* New Images Previews */}
                        {previews.map((src, index) => (
                            <div key={`new-${index}`} className={styles.previewItem}>
                                <Image src={src} alt="New Preview" fill className="object-cover" />
                                <button
                                    type="button"
                                    onClick={() => removeNewImage(index)}
                                    className={styles.removeBtn}
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <button type="submit" disabled={uploading || isPending} className={styles.submitBtn}>
                    {uploading ? 'جاري رفع الصور...' : isPending ? 'جاري الحفظ...' : 'حفظ المشروع'}
                </button>
            </form>
        </div>
    );
}
