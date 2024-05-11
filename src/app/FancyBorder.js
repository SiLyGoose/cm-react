import styles from './page.module.css';

export default function FancyBorder(props) {
	return (
		<div className='fancyBorder' style={{borderColor: props.color}}>
			{props.children}
		</div>
	);
}
