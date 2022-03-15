import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import data from './data';

function App() {
	const [people, setPeople] = useState(data);
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		const lastIndex = people.length - 1;
		if (current < 0) {
			setCurrent(lastIndex);
		}

		if (current > lastIndex) {
			setCurrent(0);
		}
	}, [current, people]);

	useEffect(() => {
		const sliderInterval = setInterval(() => {
			setCurrent(current + 1);
		}, 3000);

		return () => {
			clearInterval(sliderInterval);
		};
	}, [current]);

	return (
		<section className='section'>
			<div className='title'>
				<h2>
					<span>/</span>Reviews
				</h2>
			</div>
			<div className='section-center'>
				{people.map((person, index) => {
					let position = 'nextSlide';

					if (index === current) {
						position = 'activeSlide';
					}

					if (
						index === current - 1 ||
						(current === 0 && index === people.length - 1)
					) {
						position = 'prevSlide';
					}

					const { id, image, name, title, quote } = person;
					return (
						<article key={id} className={position}>
							<img src={image} alt={name} className='person-img' />
							<h4>{name}</h4>
							<p className='title'>{title}</p>
							<p className='text'>{quote}</p>
							<FaQuoteRight className='icon' />
						</article>
					);
				})}
				<button className='prev' onClick={() => setCurrent(current - 1)}>
					<FiChevronLeft />
				</button>
				<button className='next' onClick={() => setCurrent(current + 1)}>
					<FiChevronRight />
				</button>
			</div>
		</section>
	);
}

export default App;
