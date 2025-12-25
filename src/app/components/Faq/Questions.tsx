'use client'; // https://github.com/nextui-org/nextui/issues/1574

import { Accordion, AccordionItem } from '@nextui-org/accordion';
import ListItem from '@/app/components/Faq/ListItem';
import { useTranslations } from 'next-intl';

export default function Questions() {
	const t = useTranslations('Questions');

	return (
		<>
			<Accordion>
				<AccordionItem key='1' aria-label={t('question1')} title={t('question1')}>
					<p>{t('answer1')}</p>
				</AccordionItem>

				<AccordionItem key='2' aria-label={t('question2')} title={t('question2')}>
					<p>{t('answer2')}</p>
				</AccordionItem>

				<AccordionItem key='3' aria-label={t('question3')} title={t('question3')}>
					<div>
						{t.rich('answer3', {
							p: (chunks) => {
								return (
									<>
										<p>{chunks}</p>
										<ul className='list-disc pl-6 mt-2 space-y-1'>
											<ListItem>https://www.youtube.com/channel/channel_id</ListItem>
											<ListItem>https://www.youtube.com/user/username</ListItem>
											<ListItem>https://www.youtube.com/@channel_handle</ListItem>
											<ListItem>https://www.youtube.com/c/custom_url</ListItem>
											<ListItem>https://www.youtube.com/watch?v=video_url</ListItem>
											<ListItem>https://www.youtube.com/shorts/shorts_url</ListItem>
											<ListItem>
												https://www.youtube.com/playlist?list=playlist_url
											</ListItem>
											<ListItem>https://www.youtube.com/post/post_url</ListItem>
										</ul>
									</>
								);
							},
							support: (chunks) => <p>{chunks}</p>,
						})}
						<ul className='list-disc pl-6 mt-2'>
							<ListItem>
								https://web.archive.org/web/20211218220114/https://www.youtube.com/c/custom_url
							</ListItem>
						</ul>
					</div>
				</AccordionItem>
			</Accordion>
		</>
	);
}
