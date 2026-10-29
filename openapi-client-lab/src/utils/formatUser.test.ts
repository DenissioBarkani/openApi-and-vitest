import { describe, it, expect } from 'vitest';
import { formatUser } from './formatUser';

describe('formatUser', () => {
  it('удаляет пробелы и приводит email к нижнему регистру', () => {
    const result = formatUser({
      name: '  Anna  ',
      email: ' ANNA@EXAMPLE.COM ',
    });

    expect(result).toBe('Anna — anna@example.com');
  });

  it('сохраняет корректные данные', () => {
    const result = formatUser({
      name: 'Ivan',
      email: 'ivan@gmail.com',
    });

    expect(result).toBe('Ivan — ivan@gmail.com');
  });
});
