import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { cn } from '@lib/utils';

export default function Footer({ className }: { className?: string }) {
	const t = useTranslations('Footer');

	return (
		<footer className={cn(className)}>
			<div className='container mx-auto flex items-center justify-center px-4 py-3'>
				<a
					href='https://github.com/yureitzk/youtube-channel-id-extractor'
					target='_blank'
					rel='noopener noreferrer'
					className='flex items-center space-x-1 hover:text-blue-500 dark:hover:text-blue-400'
				>
					<Image
						className='mr-2 h-5 w-5 dark:invert'
						priority
						src='/github.svg'
						alt={t('githubImgAlt')}
						width={35}
						height={35}
					/>
					<span>{t('githubLink')}</span>
				</a>
			</div>
		</footer>
	);
}
