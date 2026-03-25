import { useQuery } from '@tanstack/react-query';
import { getArticleQuery } from './makalabox.api';

const keys = {
  root: () => ['makalabox'],
};

export function useGetArticles() {
  return useQuery({
    queryKey: keys.root(),
    queryFn: getArticleQuery,
  });
}
