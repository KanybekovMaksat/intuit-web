import axios from 'axios';
import { ArticlesList } from './makalabox.types';

const API_URL = 'https://api.makalabox.com/api/';

export function getArticleQuery() {
  return axios.get<ArticlesList>(`${API_URL}articles/?ordering=-like_count`);
}
