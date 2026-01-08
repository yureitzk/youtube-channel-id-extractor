'use client';

import { Button } from '@nextui-org/button';
import { useTranslations } from 'next-intl';

export default function RefreshButton() {
	const t = useTranslations('RefreshButton');

	return <Button onPress={() => location.reload()}>{t('text')}</Button>;
}
