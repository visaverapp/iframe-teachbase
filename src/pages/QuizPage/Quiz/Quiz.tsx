import {Complete} from '../Complete';
import {Question} from '../Question/Question';
import {useAppSelector} from "@/hooks/useStore";
import {useGetVideoAllQuizzesQuery} from "@/api";
import FullScreenLoader from "@/components/FullScreenLoader/FullScreenLoader";

interface QuizProps {
  videoPublicId: string;
  goToTime: (time: number) => void;
}

export const Quiz = ({ videoPublicId, goToTime}: QuizProps) => {

  const { data, isLoading } = useGetVideoAllQuizzesQuery(
    { videoPublicId },
    { skip: !videoPublicId },
  );

  const [activeQuestionIndex, questions, done] = useAppSelector((state) => [
    state.quiz.activeQuestionIndex,
    state.quiz.questions,
    state.quiz.done,
  ]);

  // const {catchError} = useHandlingError();

  // useEffect(() => {
  //   catchError(error);
  // }, [error]);
  //
  // if (error) return null;

  return (
      <div className='w-[709px] p-[20px] border-white-active border-[1px] rounded-[12px] bg-white'>
        {isLoading && <div className='mx-auto'><FullScreenLoader/></div>}

        {data && !done && (
          <Question
                question={questions[activeQuestionIndex].question}
                answers={questions[activeQuestionIndex].answers}
                correctAnswer={questions[activeQuestionIndex].correctAnswer}
                currentAnswer={questions[activeQuestionIndex].answer}
                start={questions[activeQuestionIndex].start}
                goToTime={goToTime}
            />
        )}
        {done && <Complete/>}
      </div>
  );
};
