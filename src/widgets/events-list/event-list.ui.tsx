import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { EventCard, eventQueries, eventTypes } from '~entities/events'
import { getApiList } from '~shared/lib/api/getApiList'
import { Loader } from '~shared/ui/loader'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { SectionHeader } from '~shared/ui/title'

export const EventList = () => {
  const { t } = useTranslation()

  const {
    data: eventsData,
    isLoading,
    isSuccess,
    isError,
  } = eventQueries.useGetEvents()

  if (isLoading) return <Loader />
  if (isError) return (
    <div className="py-20 text-center bg-gray-light">
      <Typography variant="h6" className="text-primary">{t('homepage.loading.error')}</Typography>
    </div>
  )

  const events = getApiList<eventTypes.Event>(eventsData?.data)

  if (isSuccess && events.length > 0) {

    return (
      <section className="my-12 rounded-3xl bg-gray-light px-10 py-12 xll:px-8 sm:my-8 sm:rounded-2xl sm:px-4 sm:py-8">
        <div className="w-full">
          <SectionHeader
            title={t('homepage.events.otherEvents')}
            action={
              <Link
                to="/events"
                className="group inline-flex h-11 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-line bg-white px-5 text-sm font-semibold text-primary transition-colors hover:border-primary hover:bg-primary hover:text-white"
              >
                {t('homepage.buttons.viewButton')}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            }
          />

          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6">
            {events.slice(0, 4).map((event: eventTypes.Event, idx: number) => (
              <motion.div 
                key={event.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="h-full"
              >
                <EventCard {...event} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  return null
}
