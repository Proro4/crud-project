import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Config} from '../../utils/Config';

interface cardAnswer {
  title: string;
  text: string;
  image?: string;
  url?: string;
  id?: number;
}

export const cardSlice = createApi({
  reducerPath: 'card',
  baseQuery: fetchBaseQuery({
    baseUrl: Config.baseApi,
  }),
  tagTypes: ['card'],
  endpoints: builder => ({
    fetchCards: builder.query<cardAnswer[] | [], void>({
      query: () => ({url: 'posts/'}),
      providesTags: ['card'],
    }),
    sendNewCard: builder.mutation<cardAnswer, Partial<cardAnswer>>({
      query: card => ({
        url: 'posts',
        method: 'POST',
        body: card,
      }),
      invalidatesTags: ['card'],
    }),
    sendChangedCard: builder.mutation<cardAnswer, Partial<cardAnswer>>({
      query: card => ({
        url: `posts/${card.id}`,
        method: 'PUT',
        body: card,
      }),
      invalidatesTags: ['card'],
    }),
    removeCard: builder.mutation<number, Partial<number>>({
      query: id => ({
        url: `posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['card'],
    }),
  }),
});

export const {
  useFetchCardsQuery,
  useSendNewCardMutation,
  useSendChangedCardMutation,
  useRemoveCardMutation,
} = cardSlice;
