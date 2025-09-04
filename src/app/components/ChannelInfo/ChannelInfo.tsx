import { generateChannelUrl, generateRsslUrl } from '@/app/lib/utils';
import { ChannelDataType } from '@/app/types/channelType';
import { Button } from '@nextui-org/button';
import { Card, CardBody } from '@nextui-org/card';
import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { Link } from '@nextui-org/link';
import { Skeleton } from '@nextui-org/skeleton';
import { Check, Copy, Globe, Code, Rss } from 'lucide-react';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { useTranslations } from 'next-intl';
import ChannelDeleteButton from './ChannelDeleteButton';

interface ChannelInfoProps extends ChannelDataType {
	id?: number;
}

interface UrlDisplayProps {
	label: string;
	value: string;
	isCopied: boolean;
	onCopy: () => void;
	isLink?: boolean;
	IconComponent?: React.ReactNode;
}

function UrlDisplay({
	label,
	value,
	isCopied,
	onCopy,
	isLink = false,
	IconComponent,
}: UrlDisplayProps) {
	const t = useTranslations('ChannelInfo');
	const { pending } = useFormStatus();

	return (
		<div className='mb-3 border-2 border-slate-200/60 px-3 py-3 rounded-lg'>
			<div className='flex items-center mb-1 gap-x-2'>
				{IconComponent && IconComponent}
				<p className='text-sm text-muted-foreground'>{label}</p>
			</div>
			<Skeleton isLoaded={!pending}>
				<div className='flex items-center space-x-2 flex-1 max-w-full'>
					<div className='max-w-full w-full overflow-hidden px-3 py-2 rounded-lg border-2 border-slate-200/60'>
						{isLink ? (
							<Link
								href={value}
								className='text-sm whitespace-nowrap overflow-hidden block'
							>
								{value}
							</Link>
						) : (
							<p className='text-sm whitespace-nowrap overflow-hidden'>{value}</p>
						)}
					</div>
					<Button
						size='sm'
						isIconOnly
						onPress={onCopy}
						aria-label={t('copyToClipboard')}
						title={t('copyToClipboard')}
						className='min-w-[24px] w-[24px] h-[24px] p-0'
					>
						{isCopied ? <Check className='h-3 w-3' /> : <Copy className='h-3 w-3' />}
					</Button>
				</div>
			</Skeleton>
		</div>
	);
}

export default function ChannelInfo({ id, channelId, name }: ChannelInfoProps) {
	const t = useTranslations('ChannelInfo');
	const { pending } = useFormStatus();
	const [isChannelIdCopied, setIsChannelIdCopied] = useState(false);
	const [isChannelUrlCopied, setIsChannelUrlCopied] = useState(false);
	const [isRssUrlCopied, setIsRssUrlCopied] = useState(false);

	const copyToClipboard = async (
		text: string,
		setCopiedState: React.Dispatch<React.SetStateAction<boolean>>,
	) => {
		try {
			await navigator.clipboard.writeText(text);
			setCopiedState(true);
			setTimeout(() => setCopiedState(false), 1000);
		} catch (err) {
			console.error('Failed to copy text: ', err);
		}
	};

	const rssUrl = generateRsslUrl(channelId);
	const channelUrl = generateChannelUrl(channelId);

	const renderChannelDetails = () => (
		<>
			<UrlDisplay
				label={t('channelId')}
				value={channelId}
				isCopied={isChannelIdCopied}
				onCopy={() => copyToClipboard(channelId, setIsChannelIdCopied)}
				IconComponent={<Code className='h-4 w-4' />}
			/>
			<UrlDisplay
				label={t('channelUrl')}
				value={channelUrl}
				isCopied={isChannelUrlCopied}
				onCopy={() => copyToClipboard(channelUrl, setIsChannelUrlCopied)}
				isLink
				IconComponent={<Globe className='h-4 w-4' />}
			/>
			<UrlDisplay
				label={t('rssUrl')}
				value={rssUrl}
				isCopied={isRssUrlCopied}
				onCopy={() => copyToClipboard(rssUrl, setIsRssUrlCopied)}
				isLink
				IconComponent={<Rss className='h-4 w-4' />}
			/>
		</>
	);

	return (
		<Card>
			<CardBody className='p-4 overflow-y-hidden'>
				<div className='mb-2'>
					{!id && (
						<>
							<Skeleton isLoaded={!pending}>
								<div className='flex gap-x-2 items-centeri mb-2'>
									<p className='font-bold'>{name}</p>
								</div>
							</Skeleton>
							{renderChannelDetails()}
						</>
					)}
					{id && (
						<>
							<Accordion variant='light' isCompact={false}>
								<AccordionItem key='1' title={<p className='font-bold'>{name}</p>}>
									{renderChannelDetails()}
								</AccordionItem>
							</Accordion>
							<ChannelDeleteButton id={id} />
						</>
					)}
				</div>
			</CardBody>
		</Card>
	);
}
