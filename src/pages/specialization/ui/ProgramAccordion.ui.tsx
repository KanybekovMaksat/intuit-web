import React, { useState } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material'
import ExpandCircleDownRoundedIcon from '@mui/icons-material/ExpandCircleDownRounded'
import { specializationTypes } from '~entities/specialization'
import { t } from 'i18next'

export const ProgramAccordion = ({
  trainingPrograms,
}: specializationTypes.Specialization) => {
  const [expanded, setExpanded] = useState<string | false>(false)

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }

  console.log(trainingPrograms)

  return (
    <div className="my-10 flex flex-col rounded-2xl bg-[#ededed] p-10">
      <Typography variant="h3" className="font-semibold mb-4">
       {t("specialization.trainingProgram")}
      </Typography>
      {trainingPrograms.map((course, index) => (
        <Accordion
          key={index}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
          className={`shadow-none p-5 m-0 ${
            index === 0
              ? 'rounded-t-lg'
              : index === trainingPrograms.length - 1
              ? 'rounded-b-lg'
              : ''
          }`}
        >
          <AccordionSummary
            expandIcon={<ExpandCircleDownRoundedIcon className="text-[30px]" />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
            className="text-xl font-semibold p-0"
          >
            {course.number} {t("specialization.courseTitle")}
          </AccordionSummary>
          <AccordionDetails>
            <ul className="list-disc pl-7 font-medium text-lg">
              {course.items.map((detail, detailIndex) => (
                <li key={detailIndex}>{detail.name}</li>
              ))}
            </ul>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}
