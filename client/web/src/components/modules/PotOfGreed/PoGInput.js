import React, { useState } from 'react'

export default function PoGInput ({ drizzle, drizzleState }) {
	const [currentStackId, setCurrentStackId] = useState()
	const [activeAccount, setActiveAccount] = useState(0)
	const [greedAmount, setGreedAmount] = useState(1000)

	const pogContract = drizzle.contracts.PotOfGreed
	const updatePot = val => pogContract.methods['greed'].cacheSend({
		from: drizzleState.accounts[activeAccount],
		value: greedAmount
	})

	function handleSubmit() {
		const stackId = updatePot()
		setCurrentStackId(stackId)
	}

	function getTxStatus() {
		const { transactions, transactionStack } = drizzleState
		const txHash = transactionStack[currentStackId]

		if (!txHash) return null
		return `Transaction status: ${transactions[txHash]?.status}`
	}

	function changeAddress(e) {
		setActiveAccount(e.target.value)
	}

	function handleGreedAmount (e) {
		setGreedAmount(e.target.value)
	}

	return <>
		<span> Greed Amount:  </span>
		<input style={{ margin: '10px 0', textAlign: 'center' }} type='number' onChange={handleGreedAmount} value={greedAmount} />
		<button 
			style={{ color: 'white', backgroundColor: 'green', height: 64, width: 128, fontSize: 24, cursor: 'pointer' }} 
			onClick={handleSubmit}
		>
			GREED
		</button>
		<div style={{ margin: '10px 0'}}>
			{getTxStatus()}
		</div>
		<select value={activeAccount} onChange={changeAddress}>
			{Object.keys(drizzleState.accounts).map((accountIndex) => {
				return <option value={accountIndex} key={accountIndex}>
					{drizzleState.accounts[accountIndex]}
				</option>
			})}
		</select>
	</>
}