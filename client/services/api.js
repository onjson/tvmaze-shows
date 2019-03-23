import fetch from 'isomorphic-fetch';
import { defaultManager } from '../constants';

export const getShowsApi = (query, manager = defaultManager) =>
  fetch(`${manager}/search/shows?q=${query}`);
export const getShowApi = (id, manager = defaultManager) =>
  fetch(`${manager}/shows/${id}`);
