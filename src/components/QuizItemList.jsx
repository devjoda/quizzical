import { QuizItem } from './QuizItem'

const QuizItemList = ({ quizItems, handleOnSelectAnswer, currentGameState }) => {
  return (
    <>
      {quizItems.map((quizItem, i) => (
        <QuizItem key={quizItem.id} {...quizItem} handleOnSelectAnswer={handleOnSelectAnswer} currentGameState={currentGameState} />
      ))}
    </>
  )
}

export { QuizItemList }