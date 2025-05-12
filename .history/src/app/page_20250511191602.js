									value={answer2} 
									onChange={(e) => setAnswer2(e.target.value)}
									style={{width: '100%', padding: '5px', marginBottom: '10px'}}
								/>
								<button onClick={() => {
									console.log("Moving to stage 3");
									setStage(3);
								}}>Next</button>
							</div>
						)}
					</div>
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
			<div
				style={{
					position: 'fixed',
					bottom: '20px',
					right: '20px',
					background: 'rgba(0,0,0,0.7)',
					color: 'white',
					padding: '10px',
					borderRadius: '5px',
					fontFamily: 'monospace',
					zIndex: 1500,
				}}
			>
				Stage: {stage} | ShowQuestions: {showQuestions.toString()} |
				Questions&gt;=1: {(stage >= 1).toString()}
			</div>
			{stageDisplay()}
		</div>
	)
}
