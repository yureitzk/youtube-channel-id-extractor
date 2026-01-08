import { CircleX } from 'lucide-react';

interface ErrorMessageProps {
	text: string;
}

export default function ErrorMessage({ text }: ErrorMessageProps) {
	return (
		<h2 className='bg-red-100 text-red-800 border-l-4 border-red-500 p-3 rounded-md flex items-center'>
			<CircleX className='mr-2' />
			{text}
		</h2>
	);
}
