import React, { useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { t } from 'i18next';

import { Building2, Calendar, GraduationCap, Users } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  year: <Calendar />,
  institutes: <Building2 />,
  faculty: <Users />,
  graduates: <GraduationCap />,
};

interface StatsCardProps {
  count: number;
  label: string;
  color: string;
  iconKey: string;
  showPlusOnly?: boolean;
}
const StatsCard: React.FC<StatsCardProps> = ({
  count,
  label,
  color,
  iconKey,
  showPlusOnly,
}) => {
  const [isCounting, setIsCounting] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.3 });

  React.useEffect(() => {
    if (inView) setIsCounting(true);
    else setIsCounting(false);
  }, [inView]);

  return (
    <Card
      ref={ref}
      className="w-full  rounded-lg shadow-none bg-green border-green transition-transform text-white "
    >
      <CardContent className="flex  justify-between items-start gap-3 p-3">
        <div>
          <Typography variant="h5" className={` font-[900] md:font-semibold`}>
            {showPlusOnly ? (
              `+${count}`
            ) : isCounting ? (
              <CountUp start={0} end={count} duration={2} separator="" />
            ) : (
              '0'
            )}
          </Typography>
          <Typography
            variant="subtitle1"
            className="md:w-[90px] md:text-xs text-sm"
          >
            {label}
          </Typography>
        </div>
        <div className="bg-blue p-2 rounded-full">{iconMap[iconKey]}</div>
      </CardContent>
    </Card>
  );
};

export const Stats = () => {
  return (
    <div className="flex justify-between md:grid md:grid-cols-2 gap-5 mt-4 ">
      <StatsCard
        count={2006}
        label={t('homepage.Stats.yearOfEstablishment')}
        color="blue"
        iconKey="year"
      />
      <StatsCard
        count={8}
        label={t('homepage.Stats.institutes')}
        color="green"
        iconKey="institutes"
      />
      <StatsCard
        count={155}
        label={t('homepage.Stats.facultyMembers')}
        color="purple"
        iconKey="faculty"
        showPlusOnly
      />
      <StatsCard
        count={5000}
        label={t('homepage.Stats.graduates')}
        color="red"
        iconKey="graduates"
        showPlusOnly
      />
    </div>
  );
};
