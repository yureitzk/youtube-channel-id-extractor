import { generateChannelUrl, generateRsslUrl } from '@lib/utils';
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
import ChannelDeleteButton from '@/app/components/features/channel/ChannelDeleteButton';
import HighlightText from '@/app/components/features/channel/HighlightText';

interface ChannelInfoProps extends ChannelDataType {
	id?: number;
	searchQuery?: string;
}

interface UrlDisplayProps {
	label: string;
	value: string;
	isCopied: boolean;
	onCopy: () => void;
	isLink?: boolean;
	IconComponent?: React.ReactNode;
	searchQuery?: string;
}

function UrlDisplay({
	label,
	value,
	isCopied,
	onCopy,
	isLink = false,
	IconComponent,
	searchQuery = '',
}: UrlDisplayProps) {
	const t = useTranslations('ChannelInfo');
	const { pending } = useFormStatus();

	return (
		<div className='mb-3 rounded-lg border-2 border-neutral-300/90 px-3 py-3 dark:border-slate-200/60'>
			<div className='mb-1 flex items-center gap-x-2'>
				{IconComponent && IconComponent}
				<p className='text-muted-foreground text-sm'>{label}</p>
			</div>
			<Skeleton isLoaded={!pending}>
				<div className='flex max-w-full flex-1 items-center space-x-2'>
					<div className='w-full max-w-full overflow-hidden rounded-lg border-2 border-neutral-300/90 px-3 py-2 dark:border-slate-200/60'>
						{isLink ? (
							<Link
								href={value}
								rel='noopener noreferrer'
								className='block overflow-hidden text-ellipsis whitespace-nowrap text-sm'
							>
								<HighlightText text={value} query={searchQuery} />
							</Link>
						) : (
							<p className='overflow-hidden whitespace-nowrap text-sm'>
								<HighlightText text={value} query={searchQuery} />
							</p>
						)}
					</div>
					<Button
						size='sm'
						isIconOnly
						onPress={onCopy}
						aria-label={t('copyToClipboard')}
						title={t('copyToClipboard')}
						className='h-[24px] w-[24px] min-w-[24px] p-0'
					>
						{isCopied ? <Check className='h-3 w-3' /> : <Copy className='h-3 w-3' />}
					</Button>
				</div>
			</Skeleton>
		</div>
	);
}

export default function ChannelInfo({
	id,
	channelId,
	name,
	searchQuery = '',
}: ChannelInfoProps) {
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
				searchQuery={searchQuery}
			/>
			<UrlDisplay
				label={t('channelUrl')}
				value={channelUrl}
				isCopied={isChannelUrlCopied}
				onCopy={() => copyToClipboard(channelUrl, setIsChannelUrlCopied)}
				isLink
				IconComponent={<Globe className='h-4 w-4' />}
				searchQuery={searchQuery}
			/>
			<UrlDisplay
				label={t('rssUrl')}
				value={rssUrl}
				isCopied={isRssUrlCopied}
				onCopy={() => copyToClipboard(rssUrl, setIsRssUrlCopied)}
				isLink
				IconComponent={<Rss className='h-4 w-4' />}
				searchQuery={searchQuery}
			/>
		</>
	);

	return (
		<Card>
			<CardBody className='overflow-y-hidden p-4'>
				<div className='mb-2'>
					{!id && (
						<>
							<Skeleton isLoaded={!pending}>
								<div className='mb-2 flex items-center gap-x-2'>
									<p className='font-bold'>
										<HighlightText text={name} query={searchQuery} />
									</p>
								</div>
							</Skeleton>
							{renderChannelDetails()}
						</>
					)}
					{id && (
						<>
							<Accordion variant='light' isCompact={true}>
								<AccordionItem
									key='1'
									title={
										<p className='font-bold'>
											<HighlightText text={name} query={searchQuery} />
										</p>
									}
								>
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
