import { Input, InputProps } from '@nextui-org/input';
import { cn } from '@lib/utils';

interface GenericInputProps extends Omit<InputProps, 'classNames'> {
	className?: string;
	inputWrapperClassName?: string;
}

export default function GenericInput({
	className = '',
	inputWrapperClassName = '',
	size = 'lg',
	...props
}: GenericInputProps) {
	return (
		<Input
			size={size}
			classNames={{
				inputWrapper: cn(
					'pr-0 ring-1 ring-neutral-300 dark:ring-0',
					inputWrapperClassName,
				),
				base: className,
			}}
			{...props}
		/>
	);
}
