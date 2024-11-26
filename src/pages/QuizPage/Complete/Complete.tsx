import {useAppSelector} from "@/hooks/useStore";
import {useActions} from "@/hooks/useActions";
import completedIcon from './images/completed.svg'


export const Complete = () => {
  // const { id } = useParams();
  const { setQuizRestart } = useActions();


  const [correctCount, questionsCount] = useAppSelector((state) => [
    state.quiz.correctCount,
    state.quiz.questions.length,
  ]);

  const setText = () => {
    const correctPercent = Math.round((correctCount / questionsCount) * 100);
    if (correctPercent === questionsCount) {
      return 'Вы великолепны!';
    } else {
      return `Правильных ответов: ${correctCount} из ${questionsCount}`;
    }
  };

  return (
    <div className='flex justify-between'>
      <div>
        <img src={completedIcon} alt="icon"/>
      </div>
      <div>
        {/*<span className='text-right block pb-[4px] font-open-sans text-[16px] font-normal text-black'>Ваш результат</span>*/}
        {correctCount !== questionsCount && <span className='text-right block pb-[4px] font-open-sans text-[16px] font-normal text-black'>Ваш результат</span>}
        <span className='block pb-[16px] font-open-sans text-[16px] font-bold text-black'>{setText()}</span>

        <div className='flex justify-end'>
          <button
            onClick={() => {
              setQuizRestart();
            }}
            className='w-[152px] h-[40px] font-open-sans text-[15px] font-bold text-white bg-indigo rounded-[10px]'
          >
            Пройти заново
          </button>
        </div>
      </div>
    </div>
  );
};
