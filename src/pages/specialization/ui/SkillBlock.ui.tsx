import { Check } from 'lucide-react'
import { specializationTypes } from '~entities/specialization'
import { t } from 'i18next'
import { getProgramKind } from '../lib/kind'

export const SkillsBlock = ({
  skills,
  tools,
  educationLevel,
}: specializationTypes.Specialization) => {
  const { isCourse } = getProgramKind(educationLevel)

  // CMS data sometimes repeats the same skill twice
  const uniqueSkills = (skills || []).filter(
    (skill, index, list) =>
      skill.name && list.findIndex((other) => other.name === skill.name) === index
  )
  const toolList = tools || []

  if (!uniqueSkills.length && !toolList.length) return null

  const both = uniqueSkills.length > 0 && toolList.length > 0

  return (
    <section className="mt-16 lg:mt-12">
      <h2 className="text-[2rem] font-semibold leading-tight tracking-tight text-ink md:text-[1.5rem]">
        {t('specialization.skillsTitle', 'Навыки и инструменты')}
      </h2>

      <div className={`mt-8 grid items-start gap-5 ${both ? 'grid-cols-2 md:grid-cols-1' : 'grid-cols-1'}`}>
        {uniqueSkills.length > 0 && (
          <div className="rounded-3xl bg-gray-light p-8 sm:p-5">
            <h3 className="text-lg font-semibold text-ink">
              {isCourse
                ? t('specialization.skillsLearn', 'Чему вы научитесь')
                : t('specialization.skillsMaster', 'Что вы освоите')}
            </h3>
            <ul
              className={`mt-5 grid gap-x-10 gap-y-4 ${
                both ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-1'
              }`}
            >
              {uniqueSkills.map((skill) => (
                <li key={skill.name} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-dark text-white">
                    <Check size={14} aria-hidden strokeWidth={3} />
                  </span>
                  <span className="text-[15px] leading-relaxed text-ink">{skill.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {toolList.length > 0 && (
          <div className="rounded-3xl border border-line bg-white p-8 sm:p-5">
            <h3 className="text-lg font-semibold text-ink">
              {t('specialization.tools', 'Программы и инструменты')}
            </h3>
            <ul
              className={`mt-5 grid gap-5 ${
                both ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-1'
              }`}
            >
              {toolList.map((tool) => (
                <li key={tool.name} className="flex items-start gap-4">
                  {tool.logo && (
                    <img
                      className="h-14 w-14 shrink-0 rounded-2xl bg-gray-light object-contain"
                      src={tool.logo}
                      alt=""
                      loading="lazy"
                    />
                  )}
                  <div className="min-w-0">
                    <p className="text-[15px] font-semibold text-ink">{tool.name}</p>
                    {tool.description && (
                      <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                        {tool.description}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
