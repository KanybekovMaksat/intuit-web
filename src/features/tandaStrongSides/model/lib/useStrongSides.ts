import { SkillScore, ProfessionData } from "../types/strongSidesTypes";
import { skillToProfessions } from "../StrongSideData";

export const useStrongSides = (results: Record<string, number>) => {
  if (!results || Object.keys(results).length === 0) {
    return { topSkills: [], recommendedProfessions: [] };
  }

  const totalScore = Object.values(results).reduce(
    (acc, score) => acc + score,
    0
  );

  if (totalScore === 0) {
    return { topSkills: [], recommendedProfessions: [] };
  }

  const sortedSkills: SkillScore[] = Object.entries(results)
    .map(([skill, score]) => ({
      skill,
      score: Math.round((score / totalScore) * 100), // Процентное соотношение
    }))
    .filter(({ score }) => score > 0) // Убираем навыки с 0% совпадением
    .sort((a, b) => b.score - a.score) // Сортировка по убыванию
    .slice(0, 3); // Берем топ-3 навыка

  const recommendedProfessions: string[] = [];
  sortedSkills.forEach(({ skill }) => {
    const professions = skillToProfessions[skill]?.professions || [];
    professions.forEach((profession) => {
      if (!recommendedProfessions.includes(profession)) {
        recommendedProfessions.push(profession);
      }
    });
  });

  return { topSkills: sortedSkills, recommendedProfessions };
};
