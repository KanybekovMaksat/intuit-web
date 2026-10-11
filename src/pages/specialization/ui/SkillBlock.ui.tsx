import { Check } from 'lucide-react'
import { specializationTypes } from '~entities/specialization'
import { t } from 'i18next'
import { Title } from '~shared/ui/title'

export const SkillsBlock = ({ skills, tools }: specializationTypes.Specialization) => {
  if (!skills?.length && !tools?.length) return null

  return (
    <section>
      <Title>{t('specialization.skillsAndTools')}</Title>

      <div className="grid grid-cols-2 items-start gap-5 md:grid-cols-1">
        {skills?.length > 0 && (
          <ul className="grid gap-3 rounded-3xl bg-gray-light p-7 sm:p-5">
            {skills.map((skill, index) => (
              <li key={`${skill.name}-${index}`} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-dark text-white">
                  <Check size={14} aria-hidden strokeWidth={3} />
                </span>
                <span className="text-[15px] leading-relaxed text-ink">{skill.name}</span>
              </li>
            ))}
          </ul>
        )}

        {tools?.length > 0 && (
          <ul className="flex flex-wrap gap-3">
            {tools.map((tool, index) => (
              <li
                key={`${tool.name}-${index}`}
                title={tool.description}
                className="flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3"
              >
                {tool.logo && (
                  <img
                    className="h-9 w-9 shrink-0 rounded-lg object-contain"
                    src={tool.logo}
                    alt=""
                    loading="lazy"
                  />
                )}
                <span className="text-[15px] font-semibold text-ink">{tool.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
