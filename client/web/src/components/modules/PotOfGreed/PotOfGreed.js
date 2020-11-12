import React, { useEffect, useState } from 'react'
import potOfGreedGif from '../../../../public/assets/gifs/pot-of-greed-01.gif'
import PoGInput from './PoGInput'

export default function PotOfGreed ({
	drizzle,
	drizzleState
}) {
	const [dataKeys, setDataKeys] = useState({})

	useEffect(() => {
		const pogContract = drizzle?.contracts?.PotOfGreed
		const potDataKey = pogContract.methods['pot'].cacheCall()
		const lastGreedDataKey = pogContract.methods['lastGreed'].cacheCall()

		setDataKeys({
			pot: potDataKey,
			lastGreed: lastGreedDataKey
		})
	}, [])

 	
    // using the saved `dataKey`, get the variable we're interested in
    const PoG = drizzleState.contracts.PotOfGreed
    const pot = PoG.pot[dataKeys['pot']]
    const lastGreed = PoG.lastGreed[dataKeys['lastGreed']]

	return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
		<img src={potOfGreedGif} />
		<h1 style={{ color: 'green'}}> I am the Pot of Greed </h1>
		<h1 style={{ color: 'red' }}> Current Pot: {pot !== undefined && pot.value}</h1>
		<h4 style={{ color: 'blue' }}> Last Greed: {lastGreed && lastGreed.value}</h4>

		<PoGInput drizzleState={drizzleState} drizzle={drizzle} />
	</div>
}