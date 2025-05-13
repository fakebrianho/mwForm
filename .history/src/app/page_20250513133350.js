'use client'
import styles from './page.module.css'
import '98.css'
import Question1 from '@/components/Question1/Question1'
import Question from '@/components/Question/Question'
import { useEffect, useState } from 'react'
import { useSaveData } from '@/app/hooks/useData'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Model from '@/components/Model/Model'
import { Environment, OrbitControls } from '@react-three/drei'
import { useWindowWidth } from '@/app/hooks/useWindowWidth'
import Loading from '@/components/Loading/Loading'

import {
	Bloom,
	Pixelation,
	EffectComposer,
	Noise,
	Vignette,
} from '@react-three/postprocessing'
import { Table } from '@/components/Table/Table'

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
	const [pixelCount, setPixelCount] = useState(0)
	const [showQuestions, setShowQuestions] = useState(false)
	const handlePlaneClick = (event) => {
		event.stopPropagation()
		setShowQuestions(true)
	}
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
				<Canvas camera={{ position: [0, 0.1, 5] }}>
					<EffectComposer>
						<Bloom
							intensity={1}
							luminanceThreshold={0}
							luminanceSmoothing={0.9}
							height={300}
						/>
						<Pixelation
							granularity={pixelCount} // pixel granularity
						/>
						<Noise opacity={0.02} />
					</EffectComposer>
					{/* <Suspense fallback={<Loading />}> */}
					{/* <mesh> */}
					<OrbitControls
						enableZoom={false}
						enableDamping={true}
						enablePan={false}
						minPolarAngle={Math.PI / 2.25}
						maxPolarAngle={Math.PI / 2}
						minAzimuthAngle={-Math.PI / 15}
						dampingFactor={0.035}
						maxAzimuthAngle={Math.PI / 15}
						rotateSpeed={0.15}
					/>
					<Table
						scale={0.4}
						position={[0.2, -1, 0.35]}
						rotation={[0, 0, 0]}
					/>
					<Environment background={true} files='sky.hdr' />
					{/* </mesh> */}
					{/* </Suspense> */}
				</Canvas>
			</div>
			<main className={styles.main}>
				{true && (
					<>
						{stage === 0 && (
							<Question1
								setStage={setStage}
								setPixel={setPixelCount}
							/>
						)}
						{stage >= 1 && (
							<Question
								setPixel={setPixelCount}
								setStage={setStage}
								stage={'1'}
								question={'Shop Name: '}
								answerQuestion={setAnswer1}
							/>
						)}
						{stage >= 2 && (
							<Question
								setPixel={setPixelCount}
								setStage={setStage}
								stage={'2'}
								question={'Instagram Handle: '}
								answerQuestion={setAnswer2}
							/>
						)}
						{stage >= 3 && (
							<Question
								setPixel={setPixelCount}
								setStage={setStage}
								stage={'3'}
								question={'City: '}
								answerQuestion={setAnswer3}
							/>
						)}
						{stage >= 4 && (
							<Question
								setPixel={setPixelCount}
								setStage={setStage}
								stage={'4'}
								question={
									'If you know the full address: (This will not be public) '
								}
								answerQuestion={setAnswer4}
							/>
						)}
						{stage >= 5 && (
							<Question
								setPixel={setPixelCount}
								setStage={setStage}
								stage={'5'}
								question={'Shop Cut / Fee'}
								answerQuestion={setAnswer5}
							/>
						)}
						{stage >= 6 && (
							<Question
								setPixel={setPixelCount}
								setStage={setStage}
								stage={'6'}
								question={'Shop Email or Contact Info'}
								answerQuestion={setAnswer6}
							/>
						)}
						{stage >= 7 && (
							<Question
								setPixel={setPixelCount}
								setStage={setStage}
								stage={'7'}
								question={
									'Your email, if you want us to send you access to the database when its public.'
								}
								answerQuestion={setAnswer7}
							/>
						)}
					</>
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
