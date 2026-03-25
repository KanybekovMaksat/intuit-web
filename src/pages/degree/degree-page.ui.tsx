import InfoBlock from './ui/info-block.ui'
import {
  Breadcrumbs,
  Button,
  CardContent,
  Link,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'
import { useParams } from 'react-router-dom'
import { degreeQueries } from '~entities/degree'
import { Loader } from '~shared/ui/loader'
import { EnrollForm } from '~widgets/enroll-form'
import { OpportunitiesList } from '~widgets/opportunities-list'
import { ProgramCategory } from '~widgets/programm-category'
import { SpeakerVideoList } from '~widgets/speaker-list'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export const DegreePage = () => {
  const slug = useParams()
  const {
    data: degreeData,
    isLoading,
    isError,
  } = degreeQueries.useGetDegree(String(slug.slug))

  console.log(degreeData)

  if (isError) {
    return <div>Произошла Ошибка</div>
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      {!isLoading && (
        <div className="my-10">
          <div
            className="bg-cover bg-center min-h-[300px] rounded-2xl p-5 flex flex-col justify-between"
            style={{
              background:
                'linear-gradient(200deg, rgba(42,33,115,1) 0%, rgba(0,149,111,1) 100%)',
            }}
          >
            <div>
              <Breadcrumbs aria-label="breadcrumb" className="text-[white]">
                <Link underline="hover" color="white" href="/">
                  Главная
                </Link>
                <Typography color="text.primary" className="text-[white]">
                  {degreeData?.data.title}
                </Typography>
              </Breadcrumbs>
              <Typography
                variant="h2"
                className="text-[white] font-semibold md:text-[40px]"
              >
                {degreeData?.data.title}
              </Typography>
            </div>
            <div>
              <Typography
                variant="body1"
                className="text-lg font-bold max-w-[320px] my-2 text-[white] "
              >
                Пройдите тест и узнайте, на кого вам лучше учиться
              </Typography>
              <Button
                variant="contained"
                size="large"
                className="bg-blue shadow-none px-[45px]"
              >
                Подобрать программу
              </Button>
            </div>
          </div>

          <InfoBlock
            title={degreeData?.data.text}
            description={degreeData?.data.subtext}
            tags={['Выпускники', 'Бакалавриат']}
            diplomaPhoto={degreeData?.data.diplomaPhoto}
            stats={[
              {
                value: `${degreeData?.data.programCount}`,
                label: 'программ',
              },
              {
                value: `${degreeData?.data.studyPeriod}`,
                label: 'срок обучения',
              },
              {
                value: `${degreeData?.data.employment}`,
                label: 'Трудоустройство',
              },
              {
                value: 'Документ',
                label: `${degreeData?.data.diploma}`,
              },
            ]}
          />

          {slug.slug === 'magistratura' && (
            <>
              {/* Первый аккордеон - Памятка магистранта */}
              <Accordion className="my-6 shadow-md rounded-2xl border border-gray-200 bg-white">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="magistr-summary"
                  id="magistr-header"
                >
                  <Typography className="text-xl font-semibold">
                    Памятка магистранта
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <CardContent className="space-y-6 text-gray-700 leading-relaxed p-0">
                    {/* Кто такой магистр */}
                    <div>
                      <p>
                        В магистратуру принимаются лица, имеющие законченное высшее образование
                        (диплом бакалавра или специалиста).
                      </p>
                    </div>
                    {/* Где может работать магистр */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Лицензии:{' '}
                      </h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>
                          Лицензия № LD160000749 выдана 04.11.2016 г., срок
                          действия бессрочная;
                        </li>
                        <li>
                          Лицензия № LD160000382 выдана 10.05.2016 г., срок
                          действия бессрочная;
                        </li>
                        <li>Средние специальные и высшие учебные заведения;</li>
                        <li>
                          Лицензия № LD150001054 выдана 04.12.2015 г., срок
                          действия бессрочная.{' '}
                        </li>
                      </ul>
                    </div>
                    {/* Срок обучения */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Направления в Магистратуре МУИТ:{' '}
                      </h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>710200 «Информационные системы и технологии»;</li>
                        <li>750500 «Строительство»;</li>
                        <li>640200 «Электроэнергетика и электротехника»;</li>
                        <li>580100 «Экономика»;</li>
                        <li>580200 «Менеджмент».</li>
                      </ul>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Преимущества обучения в магистратуре МУИТ:{' '}
                      </h3>
                      <ol>
                        <li>
                          1. Высококвалифицированный
                          профессорско-преподавательский состав;
                        </li>
                        <li>
                          2. Диплом магистра, признаваемый в зарубежных
                          странах;
                        </li>
                        <li>
                          3. Возможность продолжить обучение в аспирантуре и
                          докторантуре PhD;
                        </li>
                        <li>
                          4. Перспектива заниматься научной и преподавательской
                          деятельностью;
                        </li>
                        <li>5. Индивидуальный подход к каждому магистранту;</li>
                        <li>6. Широкие возможности для карьерного роста.</li>
                      </ol>
                      <div>
                        <strong>
                          Право поступления на магистерскую программу
                        </strong>
                        <p>
                          имеют лица, имеющие государственный документ о высшем
                          профессиональном образовании с присвоением степени
                          «бакалавр» по соответствующему направлению либо о
                          высшем профессиональном образовании с квалификацией
                          «специалист».
                        </p>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Документы необходимые для поступления:{' '}
                      </h3>
                      <div>
                        — Личное заявление, с предоставлением документа,
                        удостоверяющего его личность и гражданство; <br />
                        — Копия диплома государственного образца (бакалавра или
                        специалиста) о высшем образовании, заверенная
                        нотариально; <br />— 4 фотографий размером 3х4; <br />—
                        Копия паспорта.{' '}
                      </div>
                      <div>
                        <strong>Зачисление в магистратуру </strong>
                        <span>
                          {' '}
                          проводится на основании результатов собеседования.{' '}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </AccordionDetails>
              </Accordion>

              {/* Второй аккордеон - О Магистерских программах */}
              <Accordion className="my-6 shadow-md rounded-2xl border border-gray-200 bg-white">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="magistr-programs-summary"
                  id="magistr-programs-header"
                >
                  <Typography className="text-xl font-semibold">
                    О Магистерских программах
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <CardContent className="space-y-6 text-gray-700 leading-relaxed p-0">
                    <div>
                      <p>
                        В магистратуру принимаются лица, имеющие законченное
                        высшее образование (диплом бакалавра или специалиста).
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Лицензии:
                      </h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>
                          Лицензия № LD160000749 выдана 04.11.2016 г., срок
                          действия бессрочная;
                        </li>
                        <li>
                          Лицензия № LD160000382 выдана 10.05.2016 г., срок
                          действия бессрочная;
                        </li>
                        <li>
                          Лицензия № LD150001054 выдана 04.12.2015 г., срок
                          действия бессрочная.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Направления в Магистратуре МУИТ:
                      </h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>710200 «Информационные системы и технологии»;</li>
                        <li>750500 «Строительство»;</li>
                        <li>640200 «Электроэнергетика и электротехника»;</li>
                        <li>580100 «Экономика»;</li>
                        <li>580200 «Менеджмент».</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Преимущества обучения в магистратуре МУИТ:
                      </h3>
                      <ol className="list-decimal pl-5 space-y-2">
                        <li>
                          Высококвалифицированный
                          профессорско-преподавательский состав;
                        </li>
                        <li>
                          Диплом магистра, признаваемый в зарубежных странах;
                        </li>
                        <li>
                          Возможность продолжить обучение в аспирантуре и
                          докторантуре PhD;
                        </li>
                        <li>
                          Перспектива заниматься научной и преподавательской
                          деятельностью;
                        </li>
                        <li>Индивидуальный подход к каждому магистранту;</li>
                        <li>Широкие возможности для карьерного роста.</li>
                      </ol>
                    </div>

                    <div>
                      <p>
                        <strong>Право поступления на магистерскую программу</strong>{' '}
                        имеют лица, имеющие государственный документ о высшем
                        профессиональном образовании с присвоением степени
                        «бакалавр» по соответствующему направлению либо о высшем
                        профессиональном образовании с квалификацией
                        «специалист».
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Документы необходимые для поступления:
                      </h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>
                          Личное заявление, с предоставлением документа,
                          удостоверяющего его личность и гражданство;
                        </li>
                        <li>
                          Копия диплома государственного образца (бакалавра или
                          специалиста) о высшем образовании, заверенная
                          нотариально;
                        </li>
                        <li>4 фотографий размером 3х4;</li>
                        <li>Копия паспорта.</li>
                      </ul>
                    </div>

                    <div>
                      <p>
                        <strong>Зачисление в магистратуру</strong> проводится
                        на основании результатов собеседования.
                      </p>
                    </div>
                  </CardContent>
                </AccordionDetails>
              </Accordion>
            </>
          )}

          <ProgramCategory degreeId={degreeData?.data.id} />
          <OpportunitiesList />
          <EnrollForm />
          <SpeakerVideoList />
          {/* <FeedbackList /> */}
        </div>
      )}
    </>
  )
}
