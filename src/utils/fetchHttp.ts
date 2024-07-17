import { Dispatcher, ProxyAgent, RequestInfo, RequestInit, fetch } from 'undici';

export type FetchHttpInput = RequestInfo;
export type FetchHttpInit = RequestInit & {
  proxy?: ProxyAgent.Options | string;
  // dispatcher?: DispatcherConfig | string;
};

export type DispatcherConfig = { type: string };

export default function fetchHttp(input: FetchHttpInput, init: FetchHttpInit = {}) {
  const {
    proxy,
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
    dispatcher = proxy ? new ProxyAgent(proxy) : null,
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
