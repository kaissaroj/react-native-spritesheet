import Sprite from './components/Sprite';

export function multiply(a: number, b: number): Promise<number> {
  return Promise.resolve(a * b);
}

export { Sprite };
