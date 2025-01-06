import { useState, useEffect } from 'react'
import { config } from './config'
import { QuizItemList } from './components/QuizItemList'
import { Button } from './components/Button'
import { Blob } from './components/Blob'
import { Spinner } from './components/Spinner'
import { decode } from 'html-entities'
import { nanoid } from 'nanoid'
import Select from 'react-select'
import confetti from 'canvas-confetti'

const App = () => {
  const [currentGameState, setCurrentGameState] = useState(config.gameStates.NOT_STARTED)
  const [quizItems, setQuizItems] = useState([])
  const [category, setCategory] = useState(config.categories[0])
  const [difficulty, setDifficulty] = useState(config.difficulties[0])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    const fetchQuizItems = async () => {
      setIsLoading(true)
      try {
        const categoryParameter = category.value.length > 0 ? `&category=${category.value}` : ''
        const difficultyParameter = difficulty.value.length > 0 ? `&difficulty=${difficulty.value}` : ''
        const url = `https://opentdb.com/api.php?amount=5&type=multiple${categoryParameter}${difficultyParameter}`
        const response = await fetch(url, { signal: controller.signal })
        if (!response.ok) {
          console.log(`Response status: ${response.status}`)
        } else {
          const data = await response.json()
          const quizItems = data.results.map(r => {
            const allAnswersShuffled = shuffleArray([r.correct_answer, ...r.incorrect_answers])
            const allAnswersShuffledAndDecoded = allAnswersShuffled.map(a => decode(a))
            const isCorrectAnswer = (element) => element === r.correct_answer
            const correctAnswerIndex = allAnswersShuffled.findIndex(isCorrectAnswer)
            return {
              id: nanoid(),
              question: decode(r.question),
              answers: allAnswersShuffledAndDecoded,
              correctAnswerIndex: correctAnswerIndex,
              selectedAnswerIndex: -1,
            }
          })
          setQuizItems(quizItems)
          setIsLoading(false)
        }
      } catch (error) {
        if (error.name === 'AbortError') {
          return
        }
        console.error(error)
      }
    }

    if (currentGameState === config.gameStates.IN_PROGRESS) {
      fetchQuizItems()
    }

    return () => {
      controller.abort()
    }
  }, [currentGameState])

  const handleOnSelectAnswer = (quizItemId, selectedAnswerIndex) => {
    if (currentGameState !== config.gameStates.COMPLETED) {
      setQuizItems(quizItems.map((q) => {
        if (q.id !== quizItemId) {
          return q
        } else {
          return {
            ...q,
            selectedAnswerIndex: selectedAnswerIndex
          }
        }
      }))
    }
  }

  const correctAnswers = quizItems.reduce((accumulator, currentValue) => currentValue.selectedAnswerIndex === currentValue.correctAnswerIndex ? accumulator + 1 : accumulator,0)

  const feedbackMessages = {
    0: "Try again!",
    1: "Nice try!",
    2: "Getting there!",
    3: "Well done!",
    4: "Impressive!",
    5: "Perfect!",
  }

  const playerHasNotSelectedAnyAnswer = quizItems.every(q => q.selectedAnswerIndex === -1)

  if (currentGameState === config.gameStates.COMPLETED && correctAnswers > quizItems.length / 2) {
    confetti({
      particleCount: 150,
      spread: 400
    });
  }

  return (
    <main className='min-h-[100svh] font-inter place-content-center place-items-center flex'>
      <div className='flex flex-col gap-6 p-4 font-semibold place-items-center'>
        {
          currentGameState === config.gameStates.NOT_STARTED ? (
            <>
              <h1 className='mb-3 text-2xl font-medium md:text-5xl lg:text-7xl'>Quizzical</h1>
              <p className='mb-6 text-xl text-center text-slate-500'>Prove your trivia prowess with <span className='font-bold text-blue-500'>5</span> tricky questions!</p>
              <Select className="w-64 mb-4 text-lg" options={config.categories} value={category ?? { value: '', label: 'Any Category' }} onChange={(selectedOption) => {
                  setCategory(selectedOption)
                }
              }/>
              <Select className="w-64 mb-4 text-lg" options={config.difficulties} value={difficulty ?? { value: '', label: 'Any Difficulty' }} onChange={(selectedOption) => {
                  setDifficulty(selectedOption)
                }
              }/>
              <Button label='Start Quiz' handleClick={() => setCurrentGameState(config.gameStates.IN_PROGRESS)} />
            </>
          ) : currentGameState === config.gameStates.IN_PROGRESS ? (
            <>
            {
              isLoading ?
              <Spinner /> :
              <QuizItemList quizItems={quizItems} handleOnSelectAnswer={handleOnSelectAnswer} currentGameState={currentGameState} />
            }
            <div className="mt-5">
              {
                playerHasNotSelectedAnyAnswer ?
                <Button label='Check Answers' size='medium' disabled='true' /> :
                <Button label='Check Answers' size='medium' handleClick={() => setCurrentGameState(config.gameStates.COMPLETED)} />
              }
            </div>
            </>
          ) : currentGameState === config.gameStates.COMPLETED ? (
            <>
              <QuizItemList quizItems={quizItems} handleOnSelectAnswer={handleOnSelectAnswer} currentGameState={currentGameState} />
              <div className="flex flex-wrap gap-6 mt-5 text-lg md:text-xl place-items-center">
                <p>{feedbackMessages[correctAnswers]} <span className="font-normal text-slate-500">You scored {correctAnswers}/{quizItems.length} correct answers</span></p>
                <Button label='Play Again' size="medium" handleClick={() => setCurrentGameState(config.gameStates.NOT_STARTED)} />
              </div>
            </>
          ) : null
        }
      </div>
      <Blob color='blue' bottom='0' left='0' size='large' />
      <Blob color='0' top='0' right='0' />
    </main>
  )
}

// Fisher-Yates shuffle algorithm
const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]] // Swap elements using array destructuring
  }
  return array
}

export default App