import { Box, Typography } from '@mui/material';
import { FeedbackVideo } from '~entities/feedback';

const modalData = [
  {
    name: 'Арина Полищук',
    description: 'Факультет гостиничного и ресторанного бизнеса',
    img: 'https://sys3.ru/synergy-ru/content/otzivi/vertikal/arina_polishhuk.webp',
    url: 'https://www.youtube.com/watch?v=XZzI4N61r80&list=RDYAuhPU29PuM&index=15',
  },
  {
    name: 'Арина Полищук',
    description: 'Факультет гостиничного и ресторанного бизнеса',
    img: 'https://sys3.ru/synergy-ru/content/otzivi/vertikal/arina_polishhuk.webp',
    url: 'https://www.youtube.com/watch?v=XZzI4N61r80&list=RDYAuhPU29PuM&index=15',
  },
  {
    name: 'Арина Полищук',
    description: 'Факультет гостиничного и ресторанного бизнеса',
    img: 'https://sys3.ru/synergy-ru/content/otzivi/vertikal/arina_polishhuk.webp',
    url: 'https://www.youtube.com/watch?v=XZzI4N61r80&list=RDYAuhPU29PuM&index=15',
  },
  {
    name: 'Арина Полищук',
    description: 'Факультет гостиничного и ресторанного бизнеса',
    img: 'https://sys3.ru/synergy-ru/content/otzivi/vertikal/arina_polishhuk.webp',
    url: 'https://www.youtube.com/watch?v=XZzI4N61r80&list=RDYAuhPU29PuM&index=15',
  },
  {
    name: 'Арина Полищук',
    description: 'Факультет гостиничного и ресторанного бизнеса',
    img: 'https://sys3.ru/synergy-ru/content/otzivi/vertikal/arina_polishhuk.webp',
    url: 'https://www.youtube.com/watch?v=XZzI4N61r80&list=RDYAuhPU29PuM&index=15',
  },
  {
    name: 'Арина Полищук',
    description: 'Факультет гостиничного и ресторанного бизнеса',
    img: 'https://sys3.ru/synergy-ru/content/otzivi/vertikal/arina_polishhuk.webp',
    url: 'https://www.youtube.com/watch?v=XZzI4N61r80&list=RDYAuhPU29PuM&index=15',
  },
  {
    name: 'Арина Полищук',
    description: 'Факультет гостиничного и ресторанного бизнеса',
    img: 'https://sys3.ru/synergy-ru/content/otzivi/vertikal/arina_polishhuk.webp',
    url: 'https://www.youtube.com/watch?v=XZzI4N61r80&list=RDYAuhPU29PuM&index=15',
  },
];
export const FeedbackVideoList = () => {
  return (
    <>
      <Typography variant="h3" className="font-semibold my-5">
        Отзывы
      </Typography>
      <Box className="py-5 cursor-pointer grid grid-cols-5 gap-5 md:grid-cols-subgrid">
        {modalData &&
          modalData.map((item, i) => {
            if (i <= 4) {
              return (
                <div className="flex justify-center ">
                  <FeedbackVideo key={i} {...item}></FeedbackVideo>
                </div>
              );
            }
          })}
      </Box>
    </>
  );
};
