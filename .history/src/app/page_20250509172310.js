'use client'
import styles from './page.module.css'
import '98.css'
import Question1 from '@/components/Question1/Question1'
import Question from '@/components/Question/Question'
import { useEffect, useState, useRef } from 'react'
import { useSaveData } from '@/app/hooks/useData'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Model from '@/components/Model/Model'
import { Environment, OrbitControls } from '@react-three/drei'
import { useWindowWidth } from '@/app/hooks/useWindowWidth'
import { Howl, Howler } from 'howler'
import { Vector2 } from 'three'
import { Instances } from '@/components/Test/Test'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// This component will track mouse position inside the Canvas
function MouseTracker({ setMousePosition }) {
	const { camera, viewport } = useThree()
	const halfX = viewport.width / 2
	const halfY = viewport.height / 2

	useFrame(({ mouse }) => {
		// mouse is already normalized between -1 and 1
		console.log('Mouse position (normalized):', mouse.x, mouse.y)
		const mouseX = (mouse.x - halfX) / 10
		const mouseY = (mouse.y - halfY) / 10
		camera.position.x += mouseX - camera.position.x
		camera.position.y += -mouseY - camera.position.y
		// Just pass these normalized coordinates directly
		setMousePosition(new THREE.Vector2(mouse.x, mouse.y))
	})

	return null
}

export default function Home() {
	const [stage, setStage] = useState(0)
	const saveData = useSaveData()
	const [answer1, setAnswer1] = useState('')
	const [answer2, setAnswer2] = useState('')
	const [answer3, setAnswer3] = useState('')
	const [answer4, setAnswer4] = useState('')
	const [answer5, setAnswer5] = useState('')
	const [answer6, setAnswer6] = useState('')
	const [answer7, setAnswer7] = useState('')
	const windowWidth = useWindowWidth()
	const [mousePosition, setMousePosition] = useState(new THREE.Vector2())

	useEffect(() => {
		if (stage === 8) {
			const payload = {
				shop_name: answer1,
				instagram: answer2,
				city: answer3,
				address: answer4,
				fee: answer5,
				contact: answer6,
				email: answer7,
			}
			saveData.mutate(payload)
		}
	}, [stage])

	return (
		<div className={styles.page}>
			<div id='canvas-container'>
				<Canvas camera={{ position: [0, 0.5, 5] }}>
					<Suspense fallback={null}>
						{/* <MouseTracker setMousePosition={setMousePosition} /> */}
						<mesh>
							<OrbitControls
								enableZoom={false}
								minPolarAngle={Math.PI / 2.35} // 30 degrees from top (prevents zooming too high)
								maxPolarAngle={Math.PI / 2} // 90 degrees from top (prevents going below horizon)
								rotateSpeed={0.35} // Lower = slower rotation (default is 1)
							/>
							<Model
								size={windowWidth}
								scale={0.4}
								position={[0, 0.49, 3.3]}
								rotation={[0, 0, 0]}
								url={'/comp.glb'}
							/>

							<Model
								position={[0, 0, 0]}
								size={windowWidth}
								rotation={[0, -Math.PI / 2, 0]}
								url={'/backrooms_long_hall.glb'}
							/>
							<Environment
								preset='warehouse'
								// environmentIntensity={0.3}
							/>
						</mesh>
					</Suspense>
				</Canvas>
			</div>
			<main className={styles.main}>
				{stage === 0 && <Question1 setStage={setStage} />}
				{stage === 1 && (
					<Question
						setStage={setStage}
						stage={stage}
						question={'Shop Name: '}
						answerQuestion={setAnswer1}
					/>
				)}
				{stage === 2 && (
					<Question
						setStage={setStage}
						stage={stage}
						question={'Instagram Handle: '}
						answerQuestion={setAnswer2}
					/>
				)}
				{stage === 3 && (
					<Question
						setStage={setStage}
						stage={stage}
						question={'City: '}
						answerQuestion={setAnswer3}
					/>
				)}
				{stage === 4 && (
					<Question
						setStage={setStage}
						stage={stage}
						question={
							'If you know the full address: (This will not be public) '
						}
						answerQuestion={setAnswer4}
					/>
				)}
				{stage === 5 && (
					<Question
						setStage={setStage}
						stage={stage}
						question={'Shop Cut / Fee'}
						answerQuestion={setAnswer5}
					/>
				)}
				{stage === 6 && (
					<Question
						setStage={setStage}
						stage={stage}
						question={'Shop Email or Contact Info'}
						answerQuestion={setAnswer6}
					/>
				)}
				{stage === 7 && (
					<Question
						setStage={setStage}
						stage={stage}
						question={
							'Your email, if you want us to send you access to the database when its public.'
						}
						answerQuestion={setAnswer7}
					/>
				)}
				<div
					style={{
						width: '100%',
						marginTop: '50px',
						textAlign: 'center',
						position: 'fixed',
						bottom: '100px',
						left: 0,
					}}
				>
					{/* Windows 98 style segmented progress bar */}
					<div
						style={{
							width: '300px',
							height: '16px',
							border: 'inset 2px #c0c0c0',
							margin: '0 auto',
							position: 'relative',
							background: '#fff',
							overflow: 'hidden',
						}}
					>
						<div
							style={{
								width: `${(stage / 8) * 100}%`,
								height: '100%',
								background: 'navy',
								position: 'absolute',
								top: 0,
								left: 0,
								backgroundImage:
									'linear-gradient(to right, navy, navy 5px, #0000cd 5px, #0000cd 10px)',
								backgroundSize: '10px 100%',
								backgroundRepeat: 'repeat-x',
							}}
						></div>
					</div>
				</div>
			</main>
		</div>
	)
}
