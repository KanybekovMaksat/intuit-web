import { Check } from 'lucide-react'

const licenses = [
  'Лицензия № LD160000749 выдана 04.11.2016 г., срок действия бессрочная',
  'Лицензия № LD160000382 выдана 10.05.2016 г., срок действия бессрочная',
  'Лицензия № LD150001054 выдана 04.12.2015 г., срок действия бессрочная',
]

const directions = [
  '710200 «Информационные системы и технологии»',
  '750500 «Строительство»',
  '640200 «Электроэнергетика и электротехника»',
  '580100 «Экономика»',
  '580200 «Менеджмент»',
]

const advantages = [
  'Высококвалифицированный профессорско-преподавательский состав',
  'Диплом магистра, признаваемый в зарубежных странах',
  'Возможность продолжить обучение в аспирантуре и докторантуре PhD',
  'Перспектива заниматься научной и преподавательской деятельностью',
  'Индивидуальный подход к каждому магистранту',
  'Широкие возможности для карьерного роста',
]

const documents = [
  'Личное заявление с документом, удостоверяющим личность и гражданство',
  'Копия диплома государственного образца (бакалавра или специалиста) о высшем образовании, заверенная нотариально',
  '4 фотографии размером 3х4',
  'Копия паспорта',
]

const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="rounded-3xl border border-line bg-white p-7 sm:p-5">
    <h3 className="text-xl font-semibold tracking-tight text-ink">{title}</h3>
    <div className="mt-4">{children}</div>
  </section>
)

const CheckList = ({ items }: { items: string[] }) => (
  <ul className="grid gap-3">
    {items.map((item) => (
      <li key={item} className="flex items-start gap-3">
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-dark text-white">
          <Check size={14} aria-hidden strokeWidth={3} />
        </span>
        <span className="text-[15px] leading-relaxed text-ink-soft">{item}</span>
      </li>
    ))}
  </ul>
)

/** Magistracy handbook: one set of facts, shown as scannable cards instead of two copies in accordions. */
export const MagistracyGuide = () => (
  <section className="mt-14">
    <h2 className="text-[2.5rem] font-semibold leading-[1.1] tracking-tight text-ink lg:text-4xl md:!text-[28px]">
      Памятка магистранта
    </h2>
    <p className="mt-4 max-w-[70ch] text-[1.0625rem] leading-relaxed text-ink-soft">
      В магистратуру принимаются лица, имеющие законченное высшее образование (диплом бакалавра
      или специалиста). Зачисление проводится на основании результатов собеседования.
    </p>

    <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-1">
      <Card title="Направления в магистратуре МУИТ">
        <CheckList items={directions} />
      </Card>
      <Card title="Преимущества обучения">
        <CheckList items={advantages} />
      </Card>
      <Card title="Документы для поступления">
        <CheckList items={documents} />
      </Card>
      <div className="grid gap-5">
        <Card title="Кто может поступить">
          <p className="text-[15px] leading-relaxed text-ink-soft">
            Право поступления на магистерскую программу имеют лица, имеющие государственный
            документ о высшем профессиональном образовании со степенью «бакалавр» по
            соответствующему направлению либо с квалификацией «специалист».
          </p>
        </Card>
        <Card title="Лицензии">
          <ul className="grid gap-2">
            {licenses.map((license) => (
              <li key={license} className="text-[15px] leading-relaxed text-ink-soft">
                {license}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  </section>
)
