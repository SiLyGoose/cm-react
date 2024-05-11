import {useEffect, useRef, useState} from 'react';
import FancyBorder from './FancyBorder';

function isEmpty(object) {
	if (object && typeof object === 'object') {
		return Object.keys(object).length === 0;
	}
	return false;
}

export default function LoopbackTest() {
	const [activeModel, setActiveModel] = useState(null);
	const [activeEndpoint, setActiveEndpoint] = useState(null);
	const [inputDisabled, setInputDisabled] = useState(true);
	const inputRef = useRef(null);

	const [responseData, setResponseData] = useState(null);
	const [modelData, setModelData] = useState({});

	const endpointMap = {
		getClassroomWithEmptyCourses: {model: 'Classrooms', accepts: null},
		getActiveCoursesByOrganization: {model: 'Courses', accepts: 'organizationId'},
	};

	async function fetchQuery(endpoint, model, query = '') {
		if (query) query = '?' + endpointMap[endpoint].accepts + '=' + query;

		endpoint = [model, endpoint].join('/');

		const loopbackUrl = 'https://cm-test-3306c503b134.herokuapp.com/api/' + endpoint + query;

		try {
			const response = await fetch(loopbackUrl);
			if (!response.ok) {
				throw new Error('HTTP Error! Status: ' + response.status);
			}

			return await response.json();
		} catch (err) {
			console.error(err);
		}
	}

	async function handleEndpointClick(endpoint) {
		setActiveEndpoint(endpoint);
		setInputDisabled(endpoint === 'getClassroomWithEmptyCourses');

		const endpointModel = endpointMap[endpoint].model;
		setActiveModel(endpointModel);
		if (!modelData[endpointModel]) {
			const response = await fetchQuery('', endpointModel);
			setModelData((prevModelData) => ({
				...prevModelData,
				[endpointModel]: response,
			}));
		}
	}

	async function handleEndpointExecute() {
		const response = await fetchQuery(activeEndpoint, activeModel, inputRef.current.value);

		setResponseData(response);
	}

	function getPlaceholderText() {
		var endpoint = endpointMap[activeEndpoint];

		return endpoint.accepts || 'Select an endpoint to get started';
	}

	return (
		<>
			<div className='loopbackContainer'>
				<div className='buttonContainer'>
					<FancyBorder color='var(--alto-50)' active={activeEndpoint === 'getClassroomWithEmptyCourses'}>
						<div className='button' onClick={() => handleEndpointClick('getClassroomWithEmptyCourses')}>
							<div className='routeText'>
								<b>GET</b>Classroom with 0 courses
							</div>
						</div>
					</FancyBorder>
					<FancyBorder color='var(--alto-50)' active={activeEndpoint === 'getActiveCoursesByOrganization'}>
						<div className='button' onClick={() => handleEndpointClick('getActiveCoursesByOrganization')}>
							<div className='routeText'>
								<b>GET</b> All active courses from organization
							</div>
						</div>
					</FancyBorder>
				</div>
				{activeEndpoint && (
					<div className={`buttonContainer queryButton ${inputDisabled ? 'disabled' : ''}`}>
						<div className='inputContainer'>
							<input ref={inputRef} placeholder={getPlaceholderText()} type='text' autoComplete='off' autoCorrect='off' disabled={inputDisabled} />
						</div>
						<div className='executeButton'>
							<FancyBorder color='var(--alto-50)'>
								<div className='button' onClick={() => handleEndpointExecute()}>
									Execute
								</div>
							</FancyBorder>
						</div>
					</div>
				)}
				<div className='responseContainer'>
					<div className='responseWrapper'>{responseData && <pre>{JSON.stringify(responseData, null, 2)}</pre>}</div>
				</div>
			</div>
			<div className='legendContainer'>
				<div className='legendTitle'>
					{activeModel && (
						<div className='routeText'>
							<b>GET</b> /{activeModel}
						</div>
					)}
				</div>
				<div className='responseContainer'>
					<div className='responseWrapper'>{!isEmpty(modelData) && <pre>{JSON.stringify(modelData[activeModel], null, 2)}</pre>}</div>
				</div>
			</div>
		</>
	);
}
