import { useEffect, useState } from "react";
import { QuestionCard } from "~entities/tandaQuestion";
import { useQuizLogic } from "~features/tandaQuiz";
import { questionsData } from "~entities/tandaQuestion";

export const Quiz = () => {
  const {
    currentQuestionIndex,
    selectedOption,
    handleOptionChange,
    handleNextQuestion,
    results,
    isTestFinished,
    handlePreviousQuestion,
  } = useQuizLogic();
  const [loading, setLoading] = useState(true);
  const [quizQuestions, setQuizQuestions] = useState(
    questionsData[0].questions
  );

  useEffect(() => setLoading(false), []);

  if (loading) return <div>Загрузка вопросов...</div>;
  if (!quizQuestions.length) return <div>Нет доступных вопросов.</div>;

  return (
    <div className="quiz-container">
      {isTestFinished ? (
        <ResultChart results={results} />
      ) : (
        <QuestionCard
          question={quizQuestions[currentQuestionIndex]}
          selectedOption={selectedOption}
          onOptionChange={handleOptionChange}
          onNextQuestion={handleNextQuestion}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestion={quizQuestions.length}
          onPreviousQuestion={handlePreviousQuestion}
        />
      )}
    </div>
  );
};

