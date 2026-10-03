import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Typography } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';

export const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="relative mb-6">
        <span className="text-[120px] md:text-[80px] font-black text-[#2A2172]/10 leading-none select-none">
          404
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl md:text-3xl font-extrabold text-[#2A2172]">
            404
          </span>
        </div>
      </div>

      <Typography
        variant="h4"
        component="h1"
        className="font-bold text-[#2A2172] text-2xl md:text-xl mb-3"
      >
        {t('errors.pageNotFound', 'Страница не найдена')}
      </Typography>

      <Typography
        variant="body1"
        className="text-gray-600 max-w-[500px] mb-8 text-sm md:text-base leading-relaxed"
      >
        {t(
          'errors.pageNotFoundDesc',
          'К сожалению, запрашиваемая страница перемещена или не существует. Проверьте правильность адреса или воспользуйтесь разделами ниже.'
        )}
      </Typography>

      <div className="flex flex-wrap gap-3 justify-center mb-10">
        <Link to="/">
          <Button
            variant="contained"
            startIcon={<HomeRoundedIcon />}
            className="!bg-[#00956F] hover:!bg-[#007f5e] !text-white !font-semibold !px-6 !py-2.5 !rounded-lg !capitalize"
          >
            {t('errors.goHome', 'На главную')}
          </Button>
        </Link>
        <Link to="/colleges">
          <Button
            variant="outlined"
            startIcon={<SchoolRoundedIcon />}
            className="!border-[#2A2172] !text-[#2A2172] hover:!bg-[#2A2172]/5 !font-semibold !px-6 !py-2.5 !rounded-lg !capitalize"
          >
            {t('errors.colleges', 'Направления')}
          </Button>
        </Link>
        <Link to="/schedule">
          <Button
            variant="outlined"
            startIcon={<CalendarMonthRoundedIcon />}
            className="!border-[#2A2172] !text-[#2A2172] hover:!bg-[#2A2172]/5 !font-semibold !px-6 !py-2.5 !rounded-lg !capitalize"
          >
            {t('errors.schedule', 'Расписание')}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
