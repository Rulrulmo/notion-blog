'use server';

import { createPost } from '@/lib/notion';
import { z } from 'zod';

const blogSchema = z.object({
  title: z.string().min(1, { message: '제목을 입력해주세요' }),
  tag: z.string().min(1, { message: '태그를 입력해주세요' }),
  content: z.string().min(10, { message: '내용을 최소 10자 이상 입력해주세요' }),
});

export interface PostFormState {
  message: string;
  errors?: {
    title?: string[];
    tag?: string[];
    content?: string[];
  };
  formData?: PostFromData;
  success?: boolean;
}

interface PostFromData {
  title: string;
  tag: string;
  content: string;
}

export async function createPostAction(prevState: PostFormState, formData: FormData) {
  const rawFormData = {
    title: formData.get('title') as string,
    tag: formData.get('tag') as string,
    content: formData.get('content') as string,
  };

  const validatedFields = blogSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: '유효하지 않은 입력입니다',
      formData: rawFormData,
    };
  }

  try {
    const { title, tag, content } = validatedFields.data;
    await createPost({ title, tag, content });
    return {
      message: '포스트 생성에 성공했습니다',
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      message: '포스트 생성에 실패했습니다',
      formData: rawFormData,
    };
  }
}
