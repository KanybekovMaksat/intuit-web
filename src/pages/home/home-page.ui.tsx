import StaffList from '~widgets/staff-list/staff-list.ui'
import { EnrollForm } from '~widgets/enroll-form'
import { DiplomList } from '~widgets/diplom-list'
import { SpeakerVideoList } from '~widgets/speaker-list'
import { PartnersList } from '~widgets/partners-list'
import { OpportunitiesList } from '~widgets/opportunities-list'
import { DegreeCategory } from './ui/DegreeCategory.ui'
import { ProgramCategory } from '~widgets/programm-category'
import { AboutBlock } from './ui/AboutBlock.ui'
import { ArticleList } from '~widgets/article-list/article-list.ui'
import { License } from './ui/License.ui'
import { NewsList } from '~widgets/news-list'

import { HomeHero } from './ui/Hero.ui'
import { useTranslation } from 'react-i18next'
import { Title } from '~shared/ui/title'
import { EventList } from '~widgets/events-list'

export function HomePage() {
  const { t } = useTranslation()
  return (
    <div>
      <HomeHero />
      <EventList />
      <DegreeCategory />
      <ProgramCategory />
      <OpportunitiesList />
      <DiplomList />
      <AboutBlock />
      <PartnersList />
      <div>
        <Title>{t('homepage.TeachingStaff')}</Title>
        <StaffList />
      </div>
      <EnrollForm />
      <ArticleList />
      <SpeakerVideoList />
      <License />
      <NewsList />
    </div>
  )
}
