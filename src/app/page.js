'use client';

import Image from 'next/image';
import {useState} from 'react';

import styles from './page.module.css';

import VerificationButton from './VerificationButton';
import PageNavigatorArrow from './PageNavigatorArrow';
import LoopbackTest from './LoopbackTest';

export default function Home() {
	const [currentPage, setCurrentPage] = useState(1);

	const handlePreviousPage = () => {
		setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
	};

	const handleNextPage = () => {
		setCurrentPage((prevPage) => Math.min(prevPage + 1, pages.length - 1));
	};

	const pages = [<VerificationButton />, <LoopbackTest />];

	return (
		<div className='fullPageContainer'>
			<div className='arrowContainer previousPage' onClick={handlePreviousPage}>
				<div className='arrowWrapper'>
					<PageNavigatorArrow transform='rotate(180)' />
				</div>
			</div>
			<div className='pageContainer'>{pages[currentPage]}</div>
			<div className='arrowContainer nextPage' onClick={handleNextPage}>
				<div className='arrowWrapper'>
					<PageNavigatorArrow />
				</div>
			</div>
		</div>
	);
}
