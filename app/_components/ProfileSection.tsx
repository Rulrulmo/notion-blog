import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Github, Mail } from 'lucide-react';
const socialLinks = [
  {
    icon: Github,
    href: 'https://github.com/rulrulmo',
  },
  {
    icon: Mail,
    href: 'mailto:hwan901014@gmail.com',
  },
];

export default function ProfileSection() {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-2">
          <div className="flex justify-center">
            <div className="bg-muted rounded-full p-1">
              <div className="h-36 w-36 overflow-hidden rounded-full">
                <Image
                  src="/images/moka.jpeg"
                  alt="모카"
                  width={144}
                  height={144}
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-lg font-bold">룰모</h3>
            <p className="text-primary text-sm">고양이 키우는 개발자</p>
          </div>
          <div className="flex flex-row justify-center gap-2">
            {socialLinks.map((item, index) => (
              <Button key={index} variant="ghost" className="bg-primary/10" size="icon" asChild>
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  <item.icon className="h-4 w-4" />
                </a>
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
