import { CircleX } from 'lucide-react';

interface ErrorMessageProps {
	text: string;
}

export default function ErrorMessage({ text }: ErrorMessageProps) {
	return (
		<h2 className='flex items-center rounded-md border-l-4 border-red-500 bg-red-100 p-3 text-red-800'>
			<CircleX className='mr-2' />
			{text}
		</h2>
	);
}
