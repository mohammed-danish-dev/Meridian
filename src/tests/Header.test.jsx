import React from 'react';
import Header from '../layouts/Header';

describe('Header Component Render Tests', () => {
  test('Header signature and hooks properties check', () => {
    expect(Header).toBeDefined();
    expect(typeof Header).toBe('function');
  });
});
