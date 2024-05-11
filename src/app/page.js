'use client';

import Image from 'next/image';
import {useState} from 'react';

import VerificationButton from '../../components/VerificationButton';
import PageNavigatorArrow from '../../components/PageNavigatorArrow';
import LoopbackTest from '../../components/LoopbackTest';

export default function Home() {
	const [currentPage, setCurrentPage] = useState(0);

	const handlePreviousPage = () => {
		setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
	};

	const handleNextPage = () => {
		setCurrentPage((prevPage) => Math.min(prevPage + 1, pages.length - 1));
	};

	const pages = [<VerificationButton key={0} />, <LoopbackTest key={1} />];

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
