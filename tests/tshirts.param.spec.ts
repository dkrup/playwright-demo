import { test, expect } from '@playwright/test';

test.describe('T-shirts category - parameterized sidebar filters', () => {
  const categoryUrl = 'http://www.automationpractice.pl/index.php?id_category=5&controller=category';

  const filterScenarios: Array<{
    name: string;
    checkboxLabel: string | RegExp;
    type?: 'checkbox' | 'color';
  }> = [
    { name: 'Size S filter works', checkboxLabel: /S \(1\)/, type: 'checkbox' },
    { name: 'Color Orange filter works', checkboxLabel: /Orange \(1\)/, type: 'color' },
    { name: 'Compositions Cotton filter works', checkboxLabel: /Cotton \(1\)/, type: 'checkbox' },
    { name: 'Styles Casual filter works', checkboxLabel: /Casual \(1\)/, type: 'checkbox' },
    { name: 'Availability Not available filter works', checkboxLabel: /Not available \(1\)/, type: 'checkbox' },
  ];

  for (const scenario of filterScenarios) {
    test(scenario.name, async ({ page }) => {
      await page.goto(categoryUrl);

      // Sanity: category header
      await expect(page.locator('.cat-name')).toHaveText(/T-shirts/i);

      // Apply filter
      if (scenario.type === 'color') {
        // Click the color filter label (more robust than swatch link)
        const orangeLabel = page.locator('label', { hasText: 'Orange' }).first();
        await orangeLabel.scrollIntoViewIfNeeded();
        await orangeLabel.click();
      } else {
        await page.getByRole('checkbox', { name: scenario.checkboxLabel }).check();
      }

      // Product list remains visible and shows a single product
      const productList = page.locator('.product_list');
      await expect(productList).toBeVisible();
      await expect(productList.locator('.product-container')).toHaveCount(1);
      await expect(productList.getByRole('link', { name: 'Faded Short Sleeve T-shirts' }).first()).toBeVisible();
    });
  }
});


