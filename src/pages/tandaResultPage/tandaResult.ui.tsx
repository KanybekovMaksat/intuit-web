import React, { useState, useEffect } from "react";
import { ResultChart } from "~features/tandaResults";
import { StrongSection } from "~widgets/tandaStrongSection";

export const TandaResult: React.FC = () => {
  const [results, setResults] = useState({
    Frontend: 0,
    Backend: 0,
    "UX/UI дизайнер": 0,
    "Проектный менеджер": 0,
    "Продуктовый менеджер": 0,
    "Базы данных": 0,
  });

  useEffect(() => {
    try {
      const raw = localStorage.getItem("quizResults");
      if (raw) {
        const savedResults = JSON.parse(raw);
        if (savedResults && typeof savedResults === 'object') {
          setResults((prev) => ({ ...prev, ...savedResults }));
        }
      }
    } catch (err) {
      console.warn("Could not read quizResults from localStorage", err);
    }
  }, []);
  return (
    <div>
      <ResultChart results={results} />
      <StrongSection results={results} />
    </div>
  );
};
