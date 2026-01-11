'use client';

import { History, BookText } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import ThemeSwitch from '@ui/ThemeSwitch';
import { cn } from '@lib/utils';

export default function Header() {
	const t = useTranslations('Header');
	const pathname = usePathname();

	return (
		<header className='mb-4'>
			<nav className='flex items-center justify-between py-4'>
				<Link href='/' className='flex items-center space-x-2'>
					<Image
						className='dark:invert'
						priority
						src='/youtube.svg'
						alt={t('logoImgAlt')}
						width={34}
						height={34}
					/>
					<span className='title'>{t('title')}</span>
				</Link>
				<ul className='flex items-center space-x-5'>
					<li>
						<Link
							href='/history'
							title={t('history')}
							className={cn(
								'flex items-center space-x-1 transition-colors hover:text-primary',
								pathname === '/history' && 'font-semibold text-primary',
							)}
						>
							<History className='h-5 w-5' />
							<span className='hidden sm:inline'>{t('history')}</span>
						</Link>
					</li>
					<li>
						<Link
							href='/faq'
							title={t('faq')}
							className={cn(
								'flex items-center space-x-1 transition-colors hover:text-primary',
								pathname === '/faq' && 'font-semibold text-primary',
							)}
						>
							<BookText className='h-5 w-5' />
							<span className='hidden sm:inline'>{t('faq')}</span>
						</Link>
					</li>
					<li className='flex items-center'>
						<ThemeSwitch />
					</li>
				</ul>
			</nav>
		</header>
	);
}
