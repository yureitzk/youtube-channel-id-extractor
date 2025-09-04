import { useStore } from '@/app/hooks/useStore';
import { useActionState, useEffect } from 'react';
import { fetchChannelAction } from '../../server/actions/action';
import ChannelInfo from '../ChannelInfo/ChannelInfo';
import ErrorMessage from '../ErrorMessage';
import ExtractorInput from './ExtractorInput';

const initialState = {
	message: '',
	data: null,
	errors: undefined,
};

export default function Extractor() {
	const [state, formAction, isPending] = useActionState(
		fetchChannelAction,
		initialState,
	);

	const { addUniqueChannel } = useStore();

	useEffect(() => {
		if (state?.data?.channelId && state?.data?.name) {
			addUniqueChannel(state.data.channelId, state.data.name);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state?.data]);

	return (
		<form action={formAction}>
			<ExtractorInput isPending={isPending} />

			{state && (
				<div className='mt-5'>
					{!isPending &&
						((state.errors && state.errors.length > 0) ||
							state.errors === undefined) &&
						state.message && <ErrorMessage text={state.message} />}
					{state.data && state.data.channelId && state.data.name && (
						<ChannelInfo channelId={state.data.channelId} name={state.data.name} />
					)}
				</div>
			)}
		</form>
	);
}
