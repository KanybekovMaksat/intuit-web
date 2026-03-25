import BenefitsSection from './ui/benefit-section.ui'
import ComponentsSection from './ui/component-section.ui'
import { HomeHero } from './ui/Hero.ui'

export const ExpoPage = () => {
  return (
    <section>
      <HomeHero/>
      <ComponentsSection />
      <BenefitsSection />
    </section>
  )
}
