'use client';

import Image from 'next/image';
import styles from './page.module.css';
import {useEffect, useState} from 'react';

import FancyBorder from './FancyBorder';

export default function Home() {
	const [seconds, setSeconds] = useState(60);
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		let interval;

		if (isActive && seconds > 0) {
			interval = setInterval(() => {
				setSeconds((prevSeconds) => prevSeconds - 1);
			}, 1000);
		} else if (isActive && seconds === 0) {
			setSeconds(60);
			setIsActive(false);
		}

		return () => clearInterval(interval);
	}, [seconds, isActive]);

	const handleButtonClick = () => {
		setIsActive(true);
	};

	return (
		<div className='pageContainer'>
			<FancyBorder color='#3ea6ff'>
				<div className='button' onClick={handleButtonClick}>
					{isActive ? `Resend in ${seconds} seconds` : 'Request Verification Code'}
				</div>
			</FancyBorder>
		</div>
	);
}
