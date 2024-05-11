import styles from './page.module.css';

export default function FancyBorder(props) {
	return (
		<div className={`fancyBorder ${props.active ? 'active' : ''}`} style={{borderColor: props.color}}>
			{props.children}
		</div>
	);
}
