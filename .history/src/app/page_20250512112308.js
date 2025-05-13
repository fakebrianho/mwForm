'use client'
import styles from './page.module.css'
import '98.css'
import Question1 from '@/components/Question1/Question1'
import Question from '@/components/Question/Question'
import { useEffect, useState, useRef } from 'react'
import { useSaveData } from '@/app/hooks/useData'
import { Canvas } from '@react-three/fiber'
import {
	Bloom,
	Pixelation,
	EffectComposer,
	Noise,
	Vignette,
} from '@react-three/postprocessing'

import { Suspense } from 'react'
import {
	Environment,
	OrbitControls,
	useGLTF,
	useAnimations,
} from '@react-three/drei'
import { useWindowWidth } from '@/app/hooks/useWindowWidth'
import { Howl, Howler } from 'howler'
import { Vector2 } from 'three'
import TexturedPlane from '@/components/TexturedPlane'
import { Instances } from '@/components/Test/Test'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import Model from '@/components/Model/Model'
import Loading from '@/components/Loading/Loading'
import gsap from 'gsap'

// This component will track mouse position inside the Canvas

// Simple component to handle model loading
// function ModelLoader({ url, ...props }) {
// 	// Create a reference for the model
// 	const modelRef = useRef()

// 	// Use the useGLTF hook to load the model
// 	const { scene, animations } = useGLTF(url)

// 	// Use useAnimations for any animations with the ref
// 	const { actions } = useAnimations(animations, modelRef)

// 	// If the scene is available, render a primitive with it
// 	if (!scene) return null

// 	return (
// 		<primitive
// 			ref={modelRef}
// 			object={scene}
// 			scale={props.scale || 1}
// 			position={props.position || [0, 0, 0]}
// 			rotation={props.rotation || [0, 0, 0]}
// 		/>
// 	)
// }

// useGLTF.preload('/decimated.glb')
// useGLTF.preload('/backrooms_long_hall.glb')

function TexturedPlaneWithClick({ position, width, height, onClick }) {
	return (
		<TexturedPlane
			position={position}
			width={width}
			height={height}
			onClick={onClick}
		/>
	)
}

// Simplified camera animation with a smaller distance
function CameraAnimation() {
	const { camera } = useThree()
	const initialized = useRef(false)

	useEffect(() => {
		if (!initialized.current) {
			// Store the target position
			const targetPosition = { x: 0, y: 0.5, z: 5 }

			// Set initial position just a bit further back
			camera.position.set(targetPosition.x, targetPosition.y, 8) // Start from z=8 instead of z=20

			// Create the animation with GSAP
			gsap.to(camera.position, {
				z: targetPosition.z,
				duration: 2, // Shorter duration for subtler movement
				ease: 'power2.out',
				delay: 0.2, // Start almost immediately after fade begins
			})

			initialized.current = true
		}
	}, [camera])

	return null
}

function DebugStatsCollector({ setStats }) {
	useFrame(({ gl, clock }) => {
		// Update once per second to avoid performance impact
		if (Math.floor(clock.getElapsedTime()) % 2 === 0) {
			setStats({
				fps: Math.round(1 / clock.getDelta()),
				memory:
					Math.round(performance.memory?.usedJSHeapSize / 1048576) ||
					0,
				drawCalls: gl.info.render.calls || 0,
				triangles: gl.info.render.triangles || 0,
			})
		}
	})

	return null
}

function DebugOverlayDisplay({ stats }) {
	return (
		<div
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				background: 'rgba(0,0,0,0.7)',
				color: 'white',
				padding: '10px',
				fontFamily: 'monospace',
				fontSize: '12px',
				zIndex: 9999,
			}}
		>
			<div>FPS: {stats.fps}</div>
			<div>Memory: {stats.memory}MB</div>
			<div>Draw Calls: {stats.drawCalls}</div>
			<div>Triangles: {stats.triangles}</div>
		</div>
	)
}

function VisibleConsole() {
	const [logs, setLogs] = useState([])
	const logContainerRef = useRef(null)

	useEffect(() => {
		// Capture console methods
		const originalConsole = {
			log: console.log,
			error: console.error,
			warn: console.warn,
		}

		// Override console methods
		console.log = (...args) => {
			originalConsole.log(...args)
			setLogs((prev) =>
				[...prev, { type: 'log', message: args.join(' ') }].slice(-20)
			)
		}

		console.error = (...args) => {
			originalConsole.error(...args)
			setLogs((prev) =>
				[...prev, { type: 'error', message: args.join(' ') }].slice(-20)
			)
		}

		console.warn = (...args) => {
			originalConsole.warn(...args)
			setLogs((prev) =>
				[...prev, { type: 'warn', message: args.join(' ') }].slice(-20)
			)
		}

		// Restore original on cleanup
		return () => {
			console.log = originalConsole.log
			console.error = originalConsole.error
			console.warn = originalConsole.warn
		}
	}, [])

	useEffect(() => {
		if (logContainerRef.current) {
			logContainerRef.current.scrollTop =
				logContainerRef.current.scrollHeight
		}
	}, [logs])

	return (
		<div
			ref={logContainerRef}
			style={{
				position: 'absolute',
				bottom: 0,
				left: 0,
				right: 0,
				maxHeight: '30vh',
				overflowY: 'auto',
				background: 'rgba(0,0,0,0.8)',
				color: 'white',
				fontFamily: 'monospace',
				fontSize: '10px',
				padding: '5px',
				zIndex: 10000,
			}}
		>
			{logs.map((log, index) => (
				<div
					key={index}
					style={{
						color:
							log.type === 'error'
								? 'red'
								: log.type === 'warn'
								? 'yellow'
								: 'white',
						marginBottom: '2px',
					}}
				>
					{log.message}
				</div>
			))}
		</div>
	)
}

export default function Home() {
	const [stage, setStage] = useState(0)
	const [pixelCount, setPixelCount] = useState(0)
	const [showQuestions, setShowQuestions] = useState(false)
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
	// const [modelsLoaded, setModelsLoaded] = useState(false)
	// const [transitionStage, setTransitionStage] = useState('loading') // 'loading', 'overlay', 'complete'
	// const [isMobile, setIsMobile] = useState(false)
	// const [loadingProgress, setLoadingProgress] = useState(0)

	const fadeOverlayRef = useRef(null)
	// const [loadError, setLoadError] = useState(null)
	// const [debugMode, setDebugMode] = useState(false)
	// const [debugStats, setDebugStats] = useState({
	// fps: 0,
	// memory: 0,
	// drawCalls: 0,
	// triangles: 0,
	// })

	// Add this at the beginning of your component
	// useEffect(() => {
	// 	// Global error handler to catch unhandled errors
	// 	const handleError = (event) => {
	// 		console.error('Global error:', event.error || event.message)
	// 		setLoadError(
	// 			event.error?.message ||
	// 				event.message ||
	// 				'Unknown error occurred'
	// 		)
	// 		// Prevent the default error handling
	// 		event.preventDefault()
	// 	}

	// 	window.addEventListener('error', handleError)
	// 	window.addEventListener('unhandledrejection', handleError)

	// 	return () => {
	// 		window.removeEventListener('error', handleError)
	// 		window.removeEventListener('unhandledrejection', handleError)
	// 	}
	// }, [])

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

	// Separate effect for the fade transition
	// useEffect(() => {
	// 	if (transitionStage === 'overlay' && fadeOverlayRef.current) {
	// 		// Fade out the black overlay
	// 		gsap.to(fadeOverlayRef.current, {
	// 			opacity: 0,
	// 			duration: 1,
	// 			ease: 'power2.inOut',
	// 			delay: 0.2, // Short delay before starting fade
	// 			onComplete: () => {
	// 				setTransitionStage('complete')
	// 			},
	// 		})
	// 	}
	// }, [transitionStage])

	// Handle click on the TexturedPlane
	const handlePlaneClick = (event) => {
		event.stopPropagation()
		setShowQuestions(true)
	}

	// Detect mobile devices
	useEffect(() => {
		const checkMobile = () => {
			const mobile =
				/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
					navigator.userAgent
				)
			setIsMobile(mobile)
		}

		checkMobile()
		window.addEventListener('resize', checkMobile)
		return () => window.removeEventListener('resize', checkMobile)
	}, [])

	// Simplified canvas for mobile
	const renderCanvas = () => {
		if (isMobile) {
			return (
				<Canvas camera={{ position: [0, 0.5, 5] }}>
					{/* Simplified scene with minimal elements */}
					<ambientLight intensity={0.5} />
					<directionalLight position={[10, 10, 5]} intensity={1} />
					<mesh position={[0, 0, 0]}>
						<boxGeometry args={[1, 1, 1]} />
						<meshStandardMaterial color='blue' />
					</mesh>
					<OrbitControls enableZoom={false} enablePan={false} />
				</Canvas>
			)
		}

		// Return the full experience for desktop
		return (
			<Canvas camera={{ position: [0, 0.5, 5] }}>
				{/* Your existing complex scene */}
				<OrbitControls
					enableZoom={false}
					enableDamping={true}
					enablePan={false}
					minPolarAngle={Math.PI / 2.35}
					maxPolarAngle={Math.PI / 2}
					minAzimuthAngle={-Math.PI / 15}
					dampingFactor={0.035}
					maxAzimuthAngle={Math.PI / 15}
					rotateSpeed={0.15}
				/>
				<Model
					size={windowWidth}
					scale={0.4}
					position={[0, -0.47, 3.3]}
					rotation={[0, 0, 0]}
					url={'/decimated.glb'}
				/>
				<Model
					position={[0, 0, 0]}
					size={windowWidth}
					rotation={[0, -Math.PI / 2, 0]}
					url={'/backrooms_long_hall.glb'}
				/>
				<Environment preset='warehouse' />
				{/* ... rest of your 3D elements */}
			</Canvas>
		)
	}

	useEffect(() => {
		let isMounted = true

		const loadModels = async () => {
			try {
				// Create a loader with progress tracking
				const dracoLoader = new DRACOLoader()
				dracoLoader.setDecoderPath(
					'https://www.gstatic.com/draco/v1/decoders/'
				)

				const gltfLoader = new GLTFLoader()
				gltfLoader.setDRACOLoader(dracoLoader)

				// Function to load a single model with progress tracking
				const loadModelWithProgress = (url, weight) => {
					return new Promise((resolve, reject) => {
						gltfLoader.load(
							url,
							(gltf) => resolve(gltf),
							(xhr) => {
								if (isMounted && xhr.lengthComputable) {
									// Update progress based on model weight
									const modelProgress =
										(xhr.loaded / xhr.total) * weight
									setLoadingProgress((prev) =>
										Math.min(
											prev + modelProgress * 0.01,
											0.95
										)
									)
								}
							},
							(error) => reject(error)
						)
					})
				}

				// Start with some initial progress
				setLoadingProgress(0.1)

				// Only load heavyweight models if not on mobile
				if (!isMobile) {
					await loadModelWithProgress('/decimated.glb', 40)
					await loadModelWithProgress('/backrooms_long_hall.glb', 50)
				}

				if (isMounted) {
					setLoadingProgress(1)
					setTransitionStage('overlay')
					setModelsLoaded(true)
				}
			} catch (error) {
				console.error('Failed to load models:', error)
				if (isMounted) {
					setLoadError(error.message || 'Failed to load 3D models')
				}
			}
		}

		loadModels()

		return () => {
			isMounted = false
		}
	}, [isMobile])

	// Display error if loading fails
	if (loadError) {
		return (
			<div
				style={{
					padding: '20px',
					color: 'white',
					background: 'rgba(0,0,0,0.8)',
					position: 'fixed',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					zIndex: 9999,
				}}
			>
				<h2>Something went wrong</h2>
				<p>{loadError}</p>
				<button
					className='window-button'
					onClick={() => window.location.reload()}
					style={{ marginTop: '20px', padding: '8px 16px' }}
				>
					Try Again
				</button>
			</div>
		)
	}

	// Show loading indicator if not loaded yet
	if (transitionStage === 'loading' || !modelsLoaded) {
		return <Loading progress={loadingProgress * 100} />
	}

	// Render the full application once models are loaded
	return (
		<div className={styles.page}>
			{/* {transitionStage === 'overlay' && (
				<div
					ref={fadeOverlayRef}
					style={{
						position: 'fixed',
						top: 0,
						left: 0,
						width: '100vw',
						height: '100vh',
						background: 'black',
						opacity: 1,
						zIndex: 1000,
						pointerEvents: 'none',
					}}
				/>
			)} */}
			<div id='canvas-container'>
				<Canvas camera={{ position: [0, 0.5, 5] }}>
					{/* <EffectComposer>
						<Bloom
							luminanceThreshold={0}
							luminanceSmoothing={0.9}
							height={300}
						/>
						<Pixelation
							granularity={pixelCount} // pixel granularity
						/>
						<Noise opacity={0.02} />
						<Vignette eskil={false} offset={0.1} darkness={1.05} />
					</EffectComposer> */}
					{/* <CameraAnimation /> */}
					<mesh>
						<OrbitControls
							enableZoom={false}
							enableDamping={true}
							enablePan={false}
							minPolarAngle={Math.PI / 2.35}
							maxPolarAngle={Math.PI / 2}
							minAzimuthAngle={-Math.PI / 15}
							dampingFactor={0.035}
							maxAzimuthAngle={Math.PI / 15}
							rotateSpeed={0.15}
						/>
						<Model
							size={windowWidth}
							scale={0.4}
							position={[0, -0.47, 3.3]}
							rotation={[0, 0, 0]}
							url={'/decimated.glb'}
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
					<TexturedPlaneWithClick
						position={[0, 0.48, 3.507]}
						width={0.31}
						height={0.3}
						onClick={handlePlaneClick}
					/>
				</Canvas>
			</div>
			<main className={styles.main}>
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
