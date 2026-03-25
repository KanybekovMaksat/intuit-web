import { Box, Button, Card, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import {  ChevronRight } from 'lucide-react';

const capitalizeFirstLetter = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const ProfessionCard = ({ degree, faculties, title, url, icon }) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/specialization/${url}`)} className="w-full">
      <Card
        variant="outlined"
        className="relative md:w-full w-[350px] max-h-[250px] min-h-[250px] flex flex-col justify-between p-5 bg-green transition-all prof-card border-green rounded-xs cursor-pointer 
   md:h-[300px] md:min-w-full  bg-cover bg-bottom text-white/90 hover:shadow-lg hover:shadow-green/50"
      >
        <Box className="relative z-10 flex justify-between items-start gap-2">
          <div>
            <Typography variant="subtitle2" className="text-xs  transition-all">
              {degree} / {capitalizeFirstLetter(faculties)}
            </Typography>
            <Typography
              variant="h6"
              className="text-lg mt-2 font-bold  transition-all"
            >
              {title}
            </Typography>
          </div>
          <div className="bg-blue/80 p-2 rounded-full ">
            <img
              src={icon}
              alt=""
              className="h-[20px] w-[20px] filter invert"
            />
          </div>
        </Box>
        <Box className="relative z-10 flex gap-5 mt-auto">
          <Link to={`/specialization/${url}`} className="w-full">
            <Button
              variant="outlined"
              className="bg-white w-full border-none text-green border-blue  transition-all text-sm"
            >
              Поступить <ChevronRight className="text-green" />
            </Button>
          </Link>
        </Box>
      </Card>
    </div>
  );
};
