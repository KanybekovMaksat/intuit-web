import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { EventCard, eventQueries, eventTypes } from '~entities/events'
import { getApiList } from '~shared/lib/api/getApiList'
import { Loader } from '~shared/ui/loader'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

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
      <section className="py-20 bg-gray-light">
        <div className="container mx-auto">
          <div className="mb-10 flex items-end justify-between gap-6 border-b border-primary/10 pb-6 md:flex-col md:items-start">
            <div>
              <div className="mb-3 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-green">
                <span className="h-px w-8 bg-green" />
                {t('homepage.events.upcomingLabel')}
              </div>
              <h2 className="text-4xl font-semibold leading-tight text-primary md:text-3xl">
                {t('homepage.events.otherEvents')}
              </h2>
            </div>

            <Link 
              to="/news" 
              className="group inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-primary/15 bg-white px-5 text-sm font-semibold text-primary transition-all hover:border-green hover:text-green hover:shadow-md"
            >
              {t('homepage.buttons.viewButton')}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-4 gap-6 xll:grid-cols-3 lg:grid-cols-2 md:grid-cols-1">
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
