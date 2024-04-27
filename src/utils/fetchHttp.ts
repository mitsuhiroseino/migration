import { fetch, RequestInfo, RequestInit } from 'undici';

export type FetchHttpInput = RequestInfo;
export type FetchHttpInit = RequestInit;

export default function fetchHttp(input: FetchHttpInput, init: FetchHttpInit = {}) {
  const {
    method,
    keepalive,
    headers,
    body,
    redirect,
    integrity,
    signal,
    credentials,
    mode,
    referrer,
    referrerPolicy,
    window,
    dispatcher,
    duplex,
  } = init;

  return fetch(input, {
    method,
    keepalive,
    headers,
    body,
    redirect,
    integrity,
    signal,
    credentials,
    mode,
    referrer,
    referrerPolicy,
    window,
    dispatcher,
    duplex,
  });
}
