import { Box } from '@mui/material'
import Marquee from 'react-fast-marquee'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { EventCard, eventQueries, eventTypes } from '~entities/events'
import { Loader } from '~shared/ui/loader'

export const EventList = () => {
  const { t } = useTranslation()

  const {
    data: eventsData,
    isLoading,
    isSuccess,
    isError,
  } = eventQueries.useGetEvents()

  if (isLoading) {
    return <Loader />
  }
  if (isError) {
    return <div>{t('homepage.loading.error')}</div>
  }
  if (isSuccess) {
    return (
      <>
        <div
          dangerouslySetInnerHTML={{
            __html: eventsData.data[0].title,
          }}
          className="text-center text-2xl font-bold text-[#333] "
        ></div>
        <section
          className="w-full h-[600px] rounded-md bg-cover bg-center bg-no-repeat mt-5 flex justify-end items-end p-10"
          style={{ backgroundImage: `url(${eventsData.data[0].banner})` }}
        >
          {eventsData.data[0].link ? (
            <Link
              className="rounded text-white inline-block bg-green p-2 hover:bg-green-600 transition"
              to={`${eventsData.data[0].link}`}
            >
              Узнать больше
            </Link>
          ) : (
            <Link
              className="rounded text-white inline-block bg-green p-2 hover:bg-green-600 transition"
              to={`/news/event/${eventsData.data[0].slug}`}
            >
              Узнать больше
            </Link>
          )}
        </section>
        <div className="uppercase text-2xl font-bold text-[#333] mt-10">
          Другие Мероприятия
        </div>
        <Box className="w-full overflow-hidden my-10">
          <Marquee
            direction="right"
            speed={100}
            pauseOnHover={true}
            className="mb-3 "
          >
            {eventsData &&
              eventsData.data.map((event: eventTypes.Event) => (
                <EventCard key={event.slug} {...event}></EventCard>
              ))}
          </Marquee>
        </Box>
      </>
    )
  }
}
