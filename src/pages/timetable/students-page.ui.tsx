import { ScheduleKite } from '~widgets/schedule'
import { PageHero } from '~shared/ui/page'
import { t } from 'i18next'

export const timeTablePage = () => {
  return (
    <div className="mb-20">
      <PageHero compact title={t('studentsPage.schedule')} />
      <section className="mt-10">
        <ScheduleKite />
      </section>
    </div>
  )
}
