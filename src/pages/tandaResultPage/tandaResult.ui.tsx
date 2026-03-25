import React, { useState, useEffect } from "react";
import { ResultChart } from "~features/tandaResults";
import { StrongSection } from "~widgets/tandaStrongSection";

export const TandaResult: React.FC = () => {
  const [isTestCompleted, setIsTestCompleted] = useState(false);

  const [results, setResults] = useState({
    Frontend: 0,
    Backend: 0,
    "UX/UI дизайнер": 0,
    "Проектный менеджер": 0,
    "Продуктовый менеджер": 0,
    "Базы данных": 0,
  });

  useEffect(() => {
    const savedResults = JSON.parse(localStorage.getItem("quizResults"));
    if (savedResults) {
      setResults(savedResults);
      setIsTestCompleted(true);
    }
  }, []);
  return (
    <div>
      <ResultChart results={results} />
      <StrongSection results={results} />
    </div>
  );
};
