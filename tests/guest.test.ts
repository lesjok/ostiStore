import { test, expect } from '@playwright/test'

test('guest test', async ({ page }) => {
  await page.goto(process.env.REACT_APP_CORS_URL || '')
  await page.getByTitle('Search').click()
  await page.getByTitle('Search').fill('mens')
  await page.getByTitle('Search').press('Enter')
  await page
    .getByRole('link', { name: 'Mens Casual Premium Slim Fit T-Shirts' })
    .click()
  await expect(
    page.getByText('Mens Casual Premium Slim Fit T-Shirts'),
  ).toBeVisible()
  await expect(
    page.getByText('Slim-fitting style, contrast raglan long sleeve'),
  ).toBeVisible()
})
