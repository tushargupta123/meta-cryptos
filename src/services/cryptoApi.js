import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://api.nomics.com/v1/currencies/ticker?key=fd35ebf5aeb90bde571a94a831fa46218b794bad&per-page=100&page=2';
const createRequest = (url) => ({ url})

export const cryptoApi = createApi ({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`),
        }),
        getCryptoHistory: builder.query({
            query: ({coinId, timePeriod }) => createRequest(`/coin/${coinId}/history/${timePeriod}`),
        })
    })
});

export const {useGetCryptosQuery, useGetCryptoDetailsQuery,useGetCryptoHistoryQuery} = cryptoApi;