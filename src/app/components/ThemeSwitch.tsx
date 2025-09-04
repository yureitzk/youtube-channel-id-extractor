'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@nextui-org/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ThemeSwitch() {
	const t = useTranslations('ThemeSwitch');
	const [mounted, setMounted] = useState(false);
	const { setTheme, resolvedTheme } = useTheme();

	useEffect(() => setMounted(true), []);

	if (!mounted)
		return (
			<Button
				disableAnimation
				isIconOnly
				aria-label={t('themeToggle')}
				title={t('themeToggle')}
				size='sm'
				variant='light'
			>
				<Image
					src='data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=='
					width={24}
					height={24}
					sizes='24x24'
					alt={t('themeToggleLoading')}
					priority={false}
					title={t('themeToggleLoading')}
				/>
			</Button>
		);

	if (resolvedTheme === 'dark') {
		return (
			<Button
				disableAnimation
				isIconOnly
				aria-label={t('themeToggle')}
				title={t('themeToggle')}
				size='sm'
				variant='light'
				onPress={() => setTheme('light')}
			>
				<Sun />
			</Button>
		);
	}

	if (resolvedTheme === 'light') {
		return (
			<Button
				disableAnimation
				isIconOnly
				aria-label={t('themeToggle')}
				title={t('themeToggle')}
				size='sm'
				variant='light'
				onPress={() => setTheme('dark')}
			>
				<Moon />
			</Button>
		);
	}
}
