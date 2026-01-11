interface HighlightTextProps {
	text: string;
	query: string;
	className?: string;
	highlightClassName?: string;
}

export default function HighlightText({
	text,
	query,
	className = '',
	highlightClassName = 'bg-yellow-200 dark:bg-yellow-600 font-semibold',
}: HighlightTextProps) {
	if (!query.trim()) {
		return <span className={className}>{text}</span>;
	}

	const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

	const regex = new RegExp(`(${escapedQuery})`, 'gi');

	const parts = text.split(regex);

	return (
		<span className={className}>
			{parts.map((part, index) => {
				const isMatch = regex.test(part);
				regex.lastIndex = 0;

				return isMatch ? (
					<mark key={index} className={highlightClassName}>
						{part}
					</mark>
				) : (
					<span key={index}>{part}</span>
				);
			})}
		</span>
	);
}
