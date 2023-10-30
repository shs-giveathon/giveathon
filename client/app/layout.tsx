import { cn } from '@/lib/utils';
import './globals.scss';
import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';

const font = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GiveAThon 2023 🕷️',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎁</text></svg>"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body dir='ltr' className={cn(font.className, 'bg-black')}>
        <div className='flex bg-hero bg-cover w-full text-white'>{children}</div>
      </body>
    </html>
  );
}
