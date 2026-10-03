import {
  Typography,
  Container,
} from '@mui/material';


export const AdmissionsPage = () => {
  return (
    <div className="w-full py-10">
      <Typography
        variant="h4"
        className="font-bold text-center mb-8 text-gray-800"
        style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)' }}
      >
        Приемная коммиссия 2025
      </Typography>
    </div>
  );
};
