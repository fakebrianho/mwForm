'use client'
import '98.css'
import React from 'react'
import styles from './Enter.module.css'

function Enter(props) {
	return (
		<div
			style={{
				width: '20vw',
				paddingBottom: 10,
				position: 'absolute',
				// left: `${position.x}px`,
				// top: `${position.y}px`,
				left: '50%',
				top: '50%',
				transform: 'translate(-50%, -50%)',
				// cursor: isDragging ? 'grabbing' : 'grab',
				zIndex: 1000,
			}}
			className='window'
		>
			<div className='title-bar'>
				<div className='title-bar-controls'>
					<button aria-label='Minimize' disabled />
					<button aria-label='Maximize' disabled />
					<button aria-label='Close' disabled />
				</div>
			</div>

			<div className='window-body'>
				<div className='field-row' style={{ justifyContent: 'center' }}>
					<button>ENTER</button>
				</div>
				<div
					className='field-row'
					style={{ justifyContent: 'center' }}
				></div>
			</div>
		</div>
	)
}

export default Enter
