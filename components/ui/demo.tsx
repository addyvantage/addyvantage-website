'use client';

import Link from 'next/link';
import {
  Sun,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { BookTextIcon } from '@/components/icons/book-text-icon';
import { EmailIcon } from '@/components/icons/email-icon';
import { GithubIcon } from '@/components/icons/github-icon';
import { HomeIcon } from '@/components/icons/home-icon';
import { LinkedinIcon } from '@/components/icons/linkedin-icon';
import { MoonIcon } from '@/components/icons/moon-icon';
import { ResumeIcon } from '@/components/icons/resume-icon';
import { SunIcon } from '@/components/icons/sun-icon';
import TwitterXIcon from '@/components/icons/twitter-x-icon';
import { WorkIcon } from '@/components/icons/work-icon';
import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';

const data = [
  {
    title: 'Home',
    icon: (
      <HomeIcon className='text-neutral-600 dark:text-neutral-300' size={22} />
    ),
    href: '#',
  },
  {
    title: 'GitHub',
    icon: (
      <GithubIcon className='text-neutral-600 dark:text-neutral-300' size={22} />
    ),
    href: '#',
  },
  {
    title: 'LinkedIn',
    icon: (
      <LinkedinIcon className='text-neutral-600 dark:text-neutral-300' size={22} />
    ),
    href: '#',
  },
  {
    title: 'X',
    icon: (
      <TwitterXIcon className='text-neutral-600 dark:text-neutral-300' size={22} />
    ),
    href: '#',
  },
  {
    title: 'Resume',
    icon: (
      <ResumeIcon className='text-neutral-600 dark:text-neutral-300' size={22} />
    ),
    href: '#',
  },
  {
    title: 'Email',
    icon: (
      <EmailIcon className='text-neutral-600 dark:text-neutral-300' size={22} />
    ),
    href: '#',
  },
];

export function AppleStyleDock() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <div className='fixed bottom-8 left-1/2 z-50 max-w-full -translate-x-1/2'>
      <Dock magnification={55} distance={120}>
        <Link href='/home'>
          <DockItem className='aspect-square rounded-full bg-gray-200 dark:bg-neutral-800'>
            <DockLabel>{data[0].title}</DockLabel>
            <DockIcon>{data[0].icon}</DockIcon>
          </DockItem>
        </Link>
        <Link href='/work'>
          <DockItem className='aspect-square rounded-full bg-gray-200 dark:bg-neutral-800'>
            <DockLabel>Work</DockLabel>
            <DockIcon>
              <WorkIcon className='text-neutral-600 dark:text-neutral-300' size={22} />
            </DockIcon>
          </DockItem>
        </Link>
        <a href='#blog'>
          <DockItem className='aspect-square rounded-full bg-gray-200 dark:bg-neutral-800'>
            <DockLabel>Blog</DockLabel>
            <DockIcon>
              <BookTextIcon className='text-neutral-600 dark:text-neutral-300' size={22} />
            </DockIcon>
          </DockItem>
        </a>
        <DockItem className='aspect-square rounded-full bg-gray-200 dark:bg-neutral-800'>
          <DockLabel>{data[4].title}</DockLabel>
          <DockIcon>{data[4].icon}</DockIcon>
        </DockItem>
        <div className='mx-1 h-8 w-px self-center bg-neutral-300/40 dark:bg-neutral-700/50' />
        {[data[1], data[2], data[3], data[5]].map((item, idx) => (
          <DockItem
            key={`${item.title}-${idx}`}
            className='aspect-square rounded-full bg-gray-200 dark:bg-neutral-800'
          >
            <DockLabel>{item.title}</DockLabel>
            <DockIcon>{item.icon}</DockIcon>
          </DockItem>
        ))}
        <div className='mx-1 h-8 w-px self-center bg-neutral-300/40 dark:bg-neutral-700/50' />
        <DockItem className='aspect-square rounded-full bg-gray-200 dark:bg-neutral-800'>
          <DockLabel>Theme</DockLabel>
          <DockIcon>
            <button
              type='button'
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-pressed={isDark}
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className='flex h-full w-full cursor-pointer items-center justify-center text-neutral-600 dark:text-neutral-300'
            >
              {isDark ? (
                <SunIcon className='text-neutral-600 dark:text-neutral-300' size={22} />
              ) : (
                <MoonIcon className='text-neutral-600 dark:text-neutral-300' size={22} />
              )}
            </button>
          </DockIcon>
        </DockItem>
      </Dock>
    </div>
  );
}
