import React from 'react'
import {
  Typography,
  Container,
  Box,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import { t } from 'i18next'

export const VisionPage = () => {
  return (
    <Container maxWidth="lg" className="py-10 px-4">
      <Typography
        variant="h4"
        className="font-bold text-center mb-8 text-gray-800"
        style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)' }}
      >
        {t("vision.title")}
      </Typography>

      {/* Видение */}
      <Box mb={6}>
        <Typography variant="h5" className="font-semibold mb-4 text-gray-700">
          {t("vision.item")}
        </Typography>
        <Typography variant="body1" className="text-gray-600 text-justify">
          {t("vision.text")}
        </Typography>
      </Box>

      {/* Миссия */}
      <Box mb={6}>
        <Typography variant="h5" className="font-semibold mb-4 text-gray-700">
          {t("vision.text2")}
        </Typography>
        <Typography variant="body1" className="text-gray-600 text-justify">
         {t("vision.text3")}
        </Typography>
      </Box>

      {/* Стратегическая цель */}
      <Box mb={6}>
        <Typography variant="h5" className="font-semibold mb-4 text-gray-700">
          {t("vision.goal")}
        </Typography>
        <Typography variant="body1" className="text-gray-600 text-justify">
         {t("vision.description")}
        </Typography>
      </Box>

      {/* Задачи */}
      <Box>
        <Typography variant="h5" className="font-semibold mb-4 text-gray-700">
          {t("vision.heading")}
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              className="text-justify"
              primary={t("vision.primary")}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              className="text-justify"
              primary={t("vision.primary2")}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              className="text-justify"
              primary={t("vision.primary3")}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              className="text-justify"
              primary={t("vision.primary4")}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              className="text-justify"
              primary={t("vision.primary5")}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              className="text-justify"
              primary={t("vision.primary6")}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              className="text-justify"
              primary={t("vision.primary7")}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              className="text-justify"
              primary={t("vision.primary8")}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              className="text-justify"
              primary={t("vision.primary9")}
            />
          </ListItem>
        </List>
      </Box>
    </Container>
  )
}
