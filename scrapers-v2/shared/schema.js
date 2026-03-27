/**
 * Unified product schema validation.
 *
 * Every scraper outputs an array of objects matching this shape:
 *
 *   {
 *     brand:        string   (required)
 *     name:         string   (required)
 *     model:        string
 *     sku:          string
 *     category:     string
 *     subcategory:  string
 *     description:  string
 *     url:          string   (full product page URL)
 *     images:       string[] (remote image URLs – never local paths)
 *     specs:        { label: string, value: string }[]
 *     features:     string[]
 *     documents:    { name: string, url: string, type: string }[]
 *     scrapedAt:    string   (ISO-8601 timestamp)
 *   }
 */

const REQUIRED_STRINGS = ['brand', 'name'];

export function validateProduct(product) {
  const issues = [];

  for (const field of REQUIRED_STRINGS) {
    if (!product[field] || typeof product[field] !== 'string' || !product[field].trim()) {
      issues.push(`Missing or empty required field: ${field}`);
    }
  }

  if (product.images && !Array.isArray(product.images)) {
    issues.push('images must be an array');
  }

  if (product.specs && !Array.isArray(product.specs)) {
    issues.push('specs must be an array');
  }

  if (product.specs) {
    for (const spec of product.specs) {
      if (!spec.label || !spec.value) {
        issues.push(`spec entry missing label or value: ${JSON.stringify(spec)}`);
      }
    }
  }

  return { valid: issues.length === 0, issues };
}

export function validateBatch(products) {
  let valid = 0;
  let invalid = 0;
  const allIssues = [];

  for (let i = 0; i < products.length; i++) {
    const result = validateProduct(products[i]);
    if (result.valid) {
      valid++;
    } else {
      invalid++;
      allIssues.push({ index: i, name: products[i].name, issues: result.issues });
    }
  }

  return { total: products.length, valid, invalid, issues: allIssues };
}

export function printValidationReport(products, brandName) {
  const report = validateBatch(products);
  console.log(`\n=== ${brandName} Validation ===`);
  console.log(`  Total:   ${report.total}`);
  console.log(`  Valid:   ${report.valid}`);
  console.log(`  Invalid: ${report.invalid}`);

  if (report.issues.length > 0) {
    console.log('  Issues:');
    for (const item of report.issues.slice(0, 10)) {
      console.log(`    [${item.index}] ${item.name}: ${item.issues.join(', ')}`);
    }
    if (report.issues.length > 10) {
      console.log(`    ... and ${report.issues.length - 10} more`);
    }
  }
}
