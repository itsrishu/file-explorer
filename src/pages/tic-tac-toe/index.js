import React, { useState } from 'react'

function TicTacToe() {
	const [boardSize, setBoardSize] = useState(3)
	const [winningCondition, setWinningCondition] = useState(3)
	const [board, setBoard] = useState(generateEmptyBoard(boardSize))
	const [currentPlayer, setCurrentPlayer] = useState('X')
	const [winner, setWinner] = useState(null)

	function generateEmptyBoard(size) {
		const newBoard = []

		for (let i = 0; i < size; i++) {
			newBoard.push(Array(size).fill(null))
		}

		return newBoard
	}

	function handleCellClick(row, col) {
		if (board[row][col] || winner) {
			return
		}

		const updatedBoard = [...board]
		updatedBoard[row][col] = currentPlayer
		setBoard(updatedBoard)

		if (checkWinner(row, col, currentPlayer)) {
			setWinner(currentPlayer)
		} else if (checkTie(updatedBoard)) {
			setWinner('Tie')
		} else {
			setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
		}
	}

	function checkWinner(row, col, player) {
		const size = boardSize
		const condition = winningCondition

		let count = 0
		for (let c = 0; c < size; c++) {
			if (board[row][c] === player) {
				count++
				if (count === condition) {
					return true
				}
			} else {
				count = 0
			}
		}

		count = 0
		for (let r = 0; r < size; r++) {
			if (board[r][col] === player) {
				count++
				if (count === condition) {
					return true
				}
			} else {
				count = 0
			}
		}

		count = 0
		for (let i = 0; i < size; i++) {
			if (
				row - i >= 0 &&
				row - i + condition <= size &&
				col - i >= 0 &&
				col - i + condition <= size
			) {
				let found = true
				for (let j = 0; j < condition; j++) {
					if (board[row - i + j][col - i + j] !== player) {
						found = false
						break
					}
				}
				if (found) {
					return true
				}
			}
		}

		count = 0
		for (let i = 0; i < size; i++) {
			if (
				row - i >= 0 &&
				row - i + condition <= size &&
				col + i >= condition - 1 &&
				col + i < size
			) {
				let found = true
				for (let j = 0; j < condition; j++) {
					if (board[row - i + j][col + i - j] !== player) {
						found = false
						break
					}
				}
				if (found) {
					return true
				}
			}
		}

		return false
	}

	function checkTie(currentBoard) {
		for (let row = 0; row < boardSize; row++) {
			for (let col = 0; col < boardSize; col++) {
				if (!currentBoard[row][col]) {
					return false
				}
			}
		}
		return true
	}

	function handleBoardSizeChange(event) {
		const newSize = parseInt(event.target.value)

		setBoardSize(newSize)
		setWinningCondition(newSize)
		setBoard(generateEmptyBoard(newSize))
		setCurrentPlayer('X')
		setWinner(null)
	}

	function renderBoard() {
		return (
			<div className='flex flex-col mt-[20px]'>
				{board.map((row, rowIndex) => (
					<div key={rowIndex} className='flex'>
						{row.map((cell, colIndex) => (
							<div
								key={colIndex}
								className='border-2 h-[50px] w-[50px] flex items-center justify-center cursor-pointer'
								onClick={() =>
									handleCellClick(rowIndex, colIndex)
								}
							>
								{cell}
							</div>
						))}
					</div>
				))}
			</div>
		)
	}

	return (
		<div className='flex flex-col items-center justify-center h-screen'>
			<h1 className='text-4xl mb-6'>Tic Tac Toe</h1>
			<div className='mb-[20px]'>
				<label>
					Board Size:
					<input
						type='number'
						value={boardSize}
						min='3'
						onChange={handleBoardSizeChange}
						className='ml-[4px] w-[40px]'
					/>
				</label>
			</div>
			{renderBoard()}
			{winner && (
				<h2 className='text-2xl mt-6'>
					{winner === 'Tie' ? "It's a Tie!" : `Winner: ${winner}`}
				</h2>
			)}
		</div>
	)
}

export default TicTacToe
