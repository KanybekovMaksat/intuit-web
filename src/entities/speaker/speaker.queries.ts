import { useQuery } from '@tanstack/react-query';
import { getSpeakerQuery } from './speaker.api';

const keys = {
  root: () => ['speaker'],
  list: (facultyId?: number) => ['speaker', facultyId], 
};

export const useGetSpeakers = (facultyId?: number) => {
  return useQuery({
    queryKey: keys.list(facultyId),
    queryFn: () => getSpeakerQuery(facultyId), 
  });
};
