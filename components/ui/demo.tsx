'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState, type MouseEvent } from 'react';

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

const THEME_TRANSITION_MS = 420;
const THEME_SWAP_DELAY_MS = 30;
const THEME_BUBBLE_COLORS = {
  light: {
    core: 'rgba(255, 255, 255, 0.5)',
    fill: 'rgba(255, 255, 255, 0.16)',
  },
  dark: {
    core: 'rgba(15, 23, 42, 0.4)',
    fill: 'rgba(15, 23, 42, 0.14)',
  },
} as const;

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
    href: 'https://github.com/addyvantage',
  },
  {
    title: 'LinkedIn',
    icon: (
      <LinkedinIcon className='text-neutral-600 dark:text-neutral-300' size={22} />
    ),
    href: 'https://www.linkedin.com/in/addyvantage/',
  },
  {
    title: 'X',
    icon: (
      <TwitterXIcon className='text-neutral-600 dark:text-neutral-300' size={22} />
    ),
    href: 'https://x.com/addyvantage',
  },
  {
    title: 'Resume',
    icon: (
      <ResumeIcon className='text-neutral-600 dark:text-neutral-300' size={22} />
    ),
    href: 'https://drive.google.com/file/d/1gntt-i9O9XRa7keBki_H8-t2xWSnF1Hh/view?usp=drive_link',
  },
  {
    title: 'Email',
    icon: (
      <EmailIcon className='text-neutral-600 dark:text-neutral-300' size={22} />
    ),
    href: 'mailto:adityasingh0929@gmail.com',
  },
];

export function AppleStyleDock() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isThemeAnimating, setIsThemeAnimating] = useState(false);
  const transitionTimeoutRef = useRef<number | null>(null);
  const themeSwapTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);

    const mediaQuery = window.matchMedia('(max-width: 640px)');
    const updateDockMode = () => setIsMobile(mediaQuery.matches);

    updateDockMode();
    mediaQuery.addEventListener('change', updateDockMode);

    return () => {
      mediaQuery.removeEventListener('change', updateDockMode);
      if (transitionTimeoutRef.current !== null) {
        window.clearTimeout(transitionTimeoutRef.current);
      }
      if (themeSwapTimeoutRef.current !== null) {
        window.clearTimeout(themeSwapTimeoutRef.current);
      }
      document.querySelectorAll('.theme-bubble-transition').forEach((bubble) => bubble.remove());
    };
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';
  const iconSize = isMobile ? 16 : 22;
  const dockMagnification = isMobile ? 38 : 55;
  const dockDistance = isMobile ? 72 : 120;
  const dockPanelHeight = isMobile ? 40 : 56;
  const dockBaseItemSize = isMobile ? 26 : 36;
  const nextTheme = isDark ? 'light' : 'dark';

  function applyTheme(theme: 'light' | 'dark') {
    const root = document.documentElement;
    const body = document.body;
    const isNextLight = theme === 'light';

    root.classList.remove('dark', 'light');
    root.classList.add(theme);
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    root.style.backgroundColor = isNextLight ? '#ffffff' : '#000000';
    body.style.backgroundColor = isNextLight ? '#ffffff' : '#000000';
    body.style.color = isNextLight ? '#0f172a' : '#f8fafc';
    localStorage.setItem('theme', theme);

    setTheme(theme);
  }

  function handleThemeToggle(event: MouseEvent<HTMLButtonElement>) {
    if (isThemeAnimating) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rect = event.currentTarget.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;
    const bubbleColor = THEME_BUBBLE_COLORS[nextTheme];

    const bubble = document.createElement('div');
    bubble.className = 'theme-bubble-transition';
    bubble.style.setProperty('--theme-bubble-core', bubbleColor.core);
    bubble.style.setProperty('--theme-bubble-bg', bubbleColor.fill);
    bubble.style.setProperty('--theme-bubble-x', `${originX}px`);
    bubble.style.setProperty('--theme-bubble-y', `${originY}px`);
    document.body.appendChild(bubble);

    setIsThemeAnimating(true);

    window.requestAnimationFrame(() => {
      bubble.classList.add('is-expanding');
    });

    const swapDelay = prefersReducedMotion ? 0 : THEME_SWAP_DELAY_MS;
    const cleanupDelay = prefersReducedMotion ? 0 : THEME_TRANSITION_MS + 80;

    themeSwapTimeoutRef.current = window.setTimeout(() => {
      applyTheme(nextTheme);
    }, swapDelay);

    transitionTimeoutRef.current = window.setTimeout(() => {
      bubble.remove();
      setIsThemeAnimating(false);
    }, cleanupDelay);
  }

  return (
    <div className='fixed bottom-4 left-1/2 z-50 max-w-[calc(100vw-1.5rem)] -translate-x-1/2 sm:bottom-8 sm:max-w-full'>
      <Dock
        baseItemSize={dockBaseItemSize}
        className='gap-1.5 px-2.5 sm:gap-4 sm:px-6'
        distance={dockDistance}
        magnification={dockMagnification}
        panelHeight={dockPanelHeight}
      >
        <Link href='/home'>
          <DockItem className='aspect-square rounded-full bg-gray-200 dark:bg-neutral-800'>
            <DockLabel>{data[0].title}</DockLabel>
            <DockIcon>
              <HomeIcon className='text-neutral-600 dark:text-neutral-300' size={iconSize} />
            </DockIcon>
          </DockItem>
        </Link>
        <Link href='/work'>
          <DockItem className='aspect-square rounded-full bg-gray-200 dark:bg-neutral-800'>
            <DockLabel>Work</DockLabel>
            <DockIcon>
              <WorkIcon className='text-neutral-600 dark:text-neutral-300' size={iconSize} />
            </DockIcon>
          </DockItem>
        </Link>
        <a href='/blog'>
          <DockItem className='aspect-square rounded-full bg-gray-200 dark:bg-neutral-800'>
            <DockLabel>Blog</DockLabel>
            <DockIcon>
              <BookTextIcon className='text-neutral-600 dark:text-neutral-300' size={iconSize} />
            </DockIcon>
          </DockItem>
        </a>
        <a href={data[4].href} rel='noopener noreferrer' target='_blank'>
          <DockItem className='aspect-square rounded-full bg-gray-200 dark:bg-neutral-800'>
            <DockLabel>{data[4].title}</DockLabel>
            <DockIcon>
              <ResumeIcon className='text-neutral-600 dark:text-neutral-300' size={iconSize} />
            </DockIcon>
          </DockItem>
        </a>
        <div className='mx-0.5 h-5 w-px self-center bg-neutral-300/40 dark:bg-neutral-700/50 sm:mx-1 sm:h-8' />
        {[data[1], data[2], data[3], data[5]].map((item, idx) => (
          <a
            key={`${item.title}-${idx}`}
            href={item.href}
            rel='noopener noreferrer'
            target='_blank'
          >
            <DockItem className='aspect-square rounded-full bg-gray-200 dark:bg-neutral-800'>
              <DockLabel>{item.title}</DockLabel>
              <DockIcon>
                {item.title === 'GitHub' ? (
                  <GithubIcon className='text-neutral-600 dark:text-neutral-300' size={iconSize} />
                ) : item.title === 'LinkedIn' ? (
                  <LinkedinIcon className='text-neutral-600 dark:text-neutral-300' size={iconSize} />
                ) : item.title === 'X' ? (
                  <TwitterXIcon className='text-neutral-600 dark:text-neutral-300' size={iconSize} />
                ) : (
                  <EmailIcon className='text-neutral-600 dark:text-neutral-300' size={iconSize} />
                )}
              </DockIcon>
            </DockItem>
          </a>
        ))}
        <div className='mx-0.5 h-5 w-px self-center bg-neutral-300/40 dark:bg-neutral-700/50 sm:mx-1 sm:h-8' />
        <DockItem className='aspect-square rounded-full bg-gray-200 dark:bg-neutral-800'>
          <DockLabel>Theme</DockLabel>
          <DockIcon>
            <button
              type='button'
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-pressed={isDark}
              disabled={isThemeAnimating}
              onClick={handleThemeToggle}
              className='flex h-full w-full cursor-pointer items-center justify-center text-neutral-600 disabled:cursor-default disabled:opacity-80 dark:text-neutral-300'
            >
              {isDark ? (
                <SunIcon className='text-neutral-600 dark:text-neutral-300' size={iconSize} />
              ) : (
                <MoonIcon className='text-neutral-600 dark:text-neutral-300' size={iconSize} />
              )}
            </button>
          </DockIcon>
        </DockItem>
      </Dock>
    </div>
  );
}
