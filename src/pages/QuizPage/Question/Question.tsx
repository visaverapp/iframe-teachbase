import {useAppSelector} from "@/hooks/useStore";
import {useActions} from "@/hooks/useActions";
import ArrowLeft from "@/components/SVGIcons/Arrows/ArrowLeft";
import ArrowRight from "@/components/SVGIcons/Arrows/ArrowRight";
import {VisibleAnswer} from "@/pages/QuizPage/Question/Question.styled";

interface QuestionProps {
  question: string;
  answers: string[];
  correctAnswer: string;
  currentAnswer: string | null;
  goToTime: (time: number) => void;
  start: number | string;
}
export const Question = ({ answers, correctAnswer, currentAnswer, question, goToTime, start }: QuestionProps) => {
  const { setQuizAnswer, setActiveQuestionIndex, setQuizDone } = useActions();
  const [activeQuestionIndex, questions] = useAppSelector((state) => [
    state.quiz.activeQuestionIndex,
    state.quiz.questions,
  ]);
  const isLastQuestion = activeQuestionIndex === questions.length - 1;

  const handleAnswer = (answer: string) => {
    if (!currentAnswer) {
      setQuizAnswer({ question, answer });
    }
  };

  const onNextButtonHandler = () => {
    if (!questions.filter((q) => q.answer === null).length) {
      if(isLastQuestion){
      setQuizDone();
      }
    }
    questions.length > activeQuestionIndex + 1 && setActiveQuestionIndex(activeQuestionIndex + 1);
  };

  return (
    <div>
        <div className='pb-[16px]'>
          <p className='font-open-sans text-[16px] font-bold text-dark-blue'>{question}</p>
          <span className='font-open-sans text-[14px] font-normal text-dark-blue'>{`Вопрос ${activeQuestionIndex + 1} из ${questions.length}`}</span>
        </div>
      <div>
        <div className='flex flex-col gap-[8px]'>
          {answers.map((answer) => (
              <VisibleAnswer
                  className='rounded-[8px] bg-white-hover text-left px-[18px] py-[10px] font-open-sans text-[14px] font-normal text-dark-blue'
                  key={answer}
                  answerType={currentAnswer === answer ? (answer === correctAnswer ? 'correct' : 'incorrect') : undefined}
                  onClick={() => handleAnswer(answer)}
                  disabled={!!currentAnswer}
              >
                {answer}
              </VisibleAnswer>
          ))}
        </div>
        <div className='flex pt-[16px] justify-between'>
          <div>
          {currentAnswer && correctAnswer !== currentAnswer && (
              <button className='rounded-[10px] px-[18px] py-[6px] font-open-sans text-[14px] font-normal bg-dark-blue text-white-hover' onClick={() => goToTime(start as number)}>
                Смотреть фрагмент с ответом
              </button>
          )}
          </div>
          <div className='flex gap-[12px]'>
          <button className={`${!activeQuestionIndex ? 'bg-milk-white' : 'bg-indigo'} px-[30px] py-[4px] rounded-[8px]`}
                  onClick={() => {
                    setActiveQuestionIndex(activeQuestionIndex - 1);
                  }}
              disabled={!activeQuestionIndex}
          >
            <ArrowLeft stroke={`${activeQuestionIndex ? '#FFFFFF' : '#8492A6'}`}/>
          </button>
          <button className={'bg-indigo px-[30px] py-[4px] rounded-[8px]'}
                  onClick={onNextButtonHandler}
              // disabled={isLastQuestion}
          >
            <ArrowRight stroke={'#FFFFFF'}/>
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};


// className={`${isLastQuestion ? 'bg-milk-white' : 'bg-indigo'} px-[30px] py-[4px] rounded-[8px]`}

// stroke={`${!isLastQuestion ? '#FFFFFF' : '#8492A6'}`}