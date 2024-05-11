export default function FancyBorder(props) {
	return (
		<div className={`fancyBorder ${props.active ? 'active' : ''}`} style={{borderColor: props.color}}>
			{props.children}
		</div>
	);
}
