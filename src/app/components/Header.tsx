'use client';

import { History, BookText } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {useTranslations} from 'next-intl';
import { usePathname } from 'next/navigation';
import youtubeIcon from '../../../public/youtube.svg';
import ThemeSwitch from './ThemeSwitch';
import { cn } from '../lib/utils';

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
						src={youtubeIcon}
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
								'flex items-center space-x-1 hover:text-primary transition-colors',
								pathname === '/history' && 'text-primary font-semibold',
							)}
						>
							<History className='w-5 h-5' />
							<span className='hidden sm:inline'>{t('history')}</span>
						</Link>
					</li>
					<li>
						<Link
							href='/faq'
							title={t('faq')}
							className={cn(
								'flex items-center space-x-1 hover:text-primary transition-colors',
								pathname === '/faq' && 'text-primary font-semibold',
							)}
						>
							<BookText className='w-5 h-5' />
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
