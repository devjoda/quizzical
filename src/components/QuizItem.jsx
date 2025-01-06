import { Button } from './Button'
import { config } from '../config'

const QuizItem = ({ id, question, correctAnswerIndex, selectedAnswerIndex, answers, handleOnSelectAnswer, currentGameState}) => {
  return (
    <div className='w-full'>
      <h2 className='mb-4 text-xl lg:text-2x'>{question}</h2>
      <div className='flex flex-wrap gap-4'>
        {answers.map((a, i) => <Button key={id + '-' + i} type='radio' selected={selectedAnswerIndex === i} correct={correctAnswerIndex === i} disabled={currentGameState === config.gameStates.COMPLETED} size='small' label={a} handleClick={() => handleOnSelectAnswer(id, i)}></Button>)}
      </div>
      <hr className='mt-6 border border-slate-200'/>
    </div>
  )
}

export { QuizItem }