import { v4 as uuidv4 } from 'uuid';

export default function uuid(prefix: string = ''): string {
  return prefix + uuidv4();
}
