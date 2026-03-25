import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import { specializationTypes } from '~entities/specialization'
import { t } from 'i18next'
import { Title } from '~shared/ui/title'

export const SkillsBlock = ({
  skills,
  tools,
}: specializationTypes.Specialization) => {
  console.log(tools)

  return (
    <div>
      <Title>{t('specialization.skillsAndTools')}</Title>

      <div className="flex gap-20 md:flex-col">
        <div className="p-5  border-t mt-5 border-gray">
          <List>
            {skills.map((chunk, chunkIndex) => (
              <ListItem className="p-0" key={chunkIndex}>
                <ListItemIcon className="min-w-[35px]">
                  <CheckCircleRoundedIcon className="text-green" />
                </ListItemIcon>
                <ListItemText
                  id={`${chunk.name} + ${chunkIndex}`}
                  primary={chunk.name}
                />
              </ListItem>
            ))}
          </List>
        </div>
        <div className="border-t mt-5 border-gray  flex flex-wrap  gap-5 items-start  pt-5">
          {tools.map((tool, i) => (
            <Tooltip
              key={i}
              title={tool.description}
              className="cursor-pointer"
            >
              <div className="flex bg-[#f5f5f5] py-2 px-3 gap-2 rounded-md border border-gray">
                <img
                  className="rounded max-h-[40px] "
                  src={`${tool.logo}`}
                  alt=""
                />
                <p className="font-bold">{tool.name}</p>
              </div>
            </Tooltip>
          ))}
        </div>
      </div>
    </div>
  )
}
