'use client'
import styles from './page.module.css'
import '98.css'
import Question1 from '@/components/Question1/Question1'
import Question from '@/components/Question/Question'
import { useEffect, useState } from 'react'
import { useSaveData } from '@/app/hooks/useData'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Environment, OrbitControls } from '@react-three/drei'
import { useWindowWidth } from '@/app/hooks/useWindowWidth'
import Loading from '@/components/Loading/Loading'
import Blockers from '@/components/Blocker/Blockers'
import { isMobile } from 'react-device-detect'
import Enter from '@/components/Enter/Enter'
import { useExitAnimation } from './hooks/useExit'

import {
	Bloom,
	Glitch,
	Pixelation,
	EffectComposer,
	Noise,
} from '@react-three/postprocessing'
import { Table } from '@/components/Table/Table'
import { GlitchMode } from 'postprocessing'
import { Vector2 } from 'three'

export default function Home() {
	const [stage, setStage] = useState(0)
	const saveData = useSaveData()
	const [answerCount, setAnswerCount] = useState(0)
	const [intro, setIntro] = useState(false)
	const [start, setStart] = useState(false)
	const [answer1, setAnswer1] = useState('')
	const [answer2, setAnswer2] = useState('')
	const [answer3, setAnswer3] = useState('')
	const [answer4, setAnswer4] = useState('')
	const [answer5, setAnswer5] = useState('')
	const [answer6, setAnswer6] = useState('')
	const [answer7, setAnswer7] = useState('')
	const [formErrors, setFormErrors] = useState({})
	const windowWidth = useWindowWidth()
	const [pixelCount, setPixelCount] = useState(0)
	const [showQuestions, setShowQuestions] = useState(false)
	const { ExitAnimation, isPlaying, startAnimation } = useExitAnimation()
	const [glitchOut, setGlitchOut] = useState(false)
	const handleAnimationComplete = () => {
		console.log('Animation is complete!')
		setGlitchOut(true)
		// Do whatever you need when animation finishes
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
			startAnimation(handleAnimationComplete)
		}
	}, [stage, answer1, answer2, answer3, answer4, answer5, answer6, answer7])
	return (
		<div className={styles.page}>
			<div id='canvas-container'>
				<Canvas camera={{ position: [0, 0.1, 6] }}>
					<EffectComposer>
						<Pixelation granularity={pixelCount} />
						<Noise opacity={0.02} />
						{glitchOut && (
							<Glitch
								delay={[0.3, 0.5]} // min and max glitch delay
								duration={[0.6, 1.0]} // min and max glitch duration
								strength={[0.8, 1.0]} // min and max glitch strength
								mode={GlitchMode.CONSTANT_WILD} // glitch mode
								chromaticAberrationOffset={new Vector2(0.4, 4)}
								active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
								ratio={0.35} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
							/>
						)}
					</EffectComposer>
					<Suspense fallback={<Loading />}>
						<Blockers
							setShow={setShowQuestions}
							setStart={setStart}
							intro={intro}
							setIntro={setIntro}
						/>
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
							position={[
								!isMobile ? 0.1 : 0.1,
								0.3,
								!isMobile ? 3.35 : 1.5,
							]}
							rotation={[0, 0, 0]}
						/>
						<Environment background={true} files='sky.hdr' />
					</Suspense>
				</Canvas>
			</div>
			<main className={styles.main}>
				{start && !intro && <Enter setIntro={setIntro} />}
				{showQuestions && (
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
								answerCount={answerCount}
								setAC={setAnswerCount}
								currentStage={stage}
								url={'question_1.wav'}
								stage={'1'}
								question={'Shop Name: '}
								answerQuestion={setAnswer1}
								error={formErrors.answer1}
							/>
						)}
						{stage >= 2 && (
							<Question
								setPixel={setPixelCount}
								url={'question_2.wav'}
								setStage={setStage}
								currentStage={stage}
								stage={'2'}
								question={'Instagram Handle: '}
								answerQuestion={setAnswer2}
								error={formErrors.answer2}
							/>
						)}
						{stage >= 3 && (
							<Question
								setPixel={setPixelCount}
								setStage={setStage}
								url={'question_3.wav'}
								currentStage={stage}
								stage={'3'}
								question={'City: '}
								answerQuestion={setAnswer3}
								error={formErrors.answer3}
							/>
						)}
						{stage >= 4 && (
							<Question
								setPixel={setPixelCount}
								setStage={setStage}
								currentStage={stage}
								stage={'4'}
								url={'question_4.wav'}
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
								currentStage={stage}
								url={'question_5.wav'}
								stage={'5'}
								question={'Shop Cut / Fee'}
								answerQuestion={setAnswer5}
								error={formErrors.answer5}
							/>
						)}
						{stage >= 6 && (
							<Question
								setPixel={setPixelCount}
								url={'question_6.wav'}
								setStage={setStage}
								currentStage={stage}
								stage={'6'}
								question={'Shop Email or Contact Info'}
								answerQuestion={setAnswer6}
								error={formErrors.answer6}
							/>
						)}
						{stage >= 7 && (
							<Question
								setPixel={setPixelCount}
								url={'question_7.wav'}
								setStage={setStage}
								currentStage={stage}
								stage={'7'}
								question={
									'Your email, if you want us to send you access to the database when its public.'
								}
								answerQuestion={setAnswer7}
								error={formErrors.answer7}
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
					</>
				)}
				{isPlaying && <ExitAnimation />}
			</main>
		</div>
	)
}
