export default function ListItem({ children }: { children: React.ReactNode }) {
	return (
		<>
			<li className='break-words'>{children}</li>
		</>
	);
}
