import toAsyncGenerator from './toAsyncGenerator';

export default function getEmptyAsyncGenerator<T>() {
  return toAsyncGenerator<T>([]);
}
