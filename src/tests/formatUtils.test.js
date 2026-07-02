import { formatCurrency } from '../services/formatUtils';

describe('formatUtils Helper Functions', () => {
  test('should format numbers into Indian Rupees (₹) correctly', () => {
    const result = formatCurrency(1500000);
    expect(result).toContain('₹');
    expect(result).toContain('15,00,000');
  });

  test('should return ₹ 0 for invalid values or NaNs', () => {
    const result = formatCurrency('invalid_number');
    expect(result).toBe('₹ 0');
  });

  test('should handle string formatted numbers correctly', () => {
    const result = formatCurrency('45000');
    expect(result).toContain('₹');
    expect(result).toContain('45,000');
  });
});
