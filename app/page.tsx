import { PostCard } from '@/components/features/blog/PostCard';
import TagSection from './_components/TagSection';
import ProfileSection from './_components/ProfileSection';
import ContactSection from './_components/ContactSection';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
const mockPosts = [
  {
    id: '1',
    title: 'Next.js 13으로 블로그 만들기',
    description: 'Next.js 13과 Notion API를 활용하여 개인 블로그를 만드는 방법을 알아봅니다.',
    coverImage: 'https://picsum.photos/800/400',
    tags: [
      { id: '1', name: 'Next.js' },
      { id: '2', name: 'React' },
    ],
    authors: '짐코딩',
    date: '2024-02-01',
  },
  {
    id: '2',
    title: 'TypeScript 기초 다지기',
    description: 'TypeScript의 기본 문법과 실전에서 자주 사용되는 패턴들을 살펴봅니다.',
    coverImage: 'https://picsum.photos/800/401',
    tags: [
      { id: '3', name: 'TypeScript' },
      { id: '4', name: 'JavaScript' },
    ],
    authors: '짐코딩',
    date: '2024-01-15',
  },
];

export default function Home() {
  return (
    <div className="container py-8">
      <div className="grid grid-cols-[200px_1fr_220px] gap-6">
        <aside>
          <TagSection />
        </aside>

        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">블로그 목록</h2>
            <Select defaultValue="latest">
              <SelectTrigger>
                <SelectValue placeholder="정렬 방식 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">최신순</SelectItem>
                <SelectItem value="oldest">오래된순</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-4">
            {mockPosts.map((post) => (
              <Link href={`/blog/${post.id}`} key={post.id}>
                <PostCard key={post.id} post={post} />
              </Link>
            ))}
          </div>
        </div>

        <aside className="flex flex-col gap-6">
          <ProfileSection />
          <ContactSection />
        </aside>
      </div>
    </div>
  );
}
