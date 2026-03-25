import { PaidRounded, SchoolRounded } from '@mui/icons-material';
import { Box, Card, Typography } from '@mui/material';

interface InfoBlockProps {
  title: string;
  description: string;
  tags: string[];
  stats: { value: string; label: string }[];
}

export const InfoBlock: React.FC<InfoBlockProps> = ({
  title,
  description,
  tags,
  stats,
}) => {
  const staticBackgrounds = [
    'https://synergy.ru/assets/template/v5/new3/images/s_about/1.svg',
    'https://synergy.ru/assets/template/v5/new3/images/s_about/1.svg',
    'https://synergy.ru/assets/template/v5/new3/images/s_about/1.svg',
    'https://i.pinimg.com/736x/27/ab/89/27ab89c2730038168938dc8af4cdb8f7.jpg',
  ];

  return (
    <Box className="grid grid-cols-2 gap-5 my-7 lg:grid-cols-1">
      <Card className="bg-[#e0e1e5] p-4 shadow-none flex flex-col justify-between gap-12 rounded-xl">
        <Box className="flex flex-col gap-2">
          <Typography variant="h5" className="font-semibold lg:text-[20px]">
            {title}
          </Typography>
          <Typography variant="body2" className="text-sm">
            {description}
          </Typography>
        </Box>
        <Box className="flex justify-between lg:flex-col lg:items-center lg:gap-8">
          <Box className="flex gap-2">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="border-[1px] px-4 py-2 rounded-3xl border-black text-xs"
              >
                {tag}
              </div>
            ))}
          </Box>
        </Box>
      </Card>
      <Box className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="bg-[#e0e1e5] shadow-none flex flex-col justify-between p-4 rounded-xl"
            style={{
              backgroundImage: `url(${staticBackgrounds[index]})`,
              backgroundSize:
                staticBackgrounds[index] ===
                'https://i.pinimg.com/736x/27/ab/89/27ab89c2730038168938dc8af4cdb8f7.jpg'
                  ? 'cover'
                  : 'auto',
              backgroundPosition: 'right bottom',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <Typography
              variant="h2"
              className={`text-[1.7rem] font-bold ${
                staticBackgrounds[index] ===
                'https://i.pinimg.com/736x/27/ab/89/27ab89c2730038168938dc8af4cdb8f7.jpg'
                  ? 'text-white '
                  : ''
              } `}
            >
              {stat.value}
            </Typography>
            <Typography
              variant="body2"
              className={`text-lg font-bold ${
                staticBackgrounds[index] ===
                'https://i.pinimg.com/736x/27/ab/89/27ab89c2730038168938dc8af4cdb8f7.jpg'
                  ? 'text-white'
                  : ''
              }`}
            >
              {stat.label}
            </Typography>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default InfoBlock;
