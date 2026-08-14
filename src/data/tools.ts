export type ToolCategory = 'Documents' | 'Media' | 'Money' | 'Health' | 'Focus';

export interface Tool {
  slug: string;
  name: string;
  domain: string | null;
  url: string | null;
  category: ToolCategory;
  tagline: string;
  description: string;
  features: [string, string, string];
  launched: string;
  favicon: string | null;
}

export const categories: ToolCategory[] = ['Documents', 'Media', 'Money', 'Health', 'Focus'];

export const tools: Tool[] = [
  {
    slug: 'pdfkit',
    name: 'PdfKit',
    domain: 'pdfkit.work',
    url: 'https://pdfkit.work/',
    category: 'Documents',
    tagline: 'Merge, split and compress PDFs in your browser',
    description:
      'Combine several PDFs into one, pull single pages out, or bring a file under an email size limit. The whole thing runs in the tab, so a confidential document never leaves your computer.',
    features: ['Merge and split', 'Compress without blurring text', 'Convert to and from images'],
    launched: '2026-07-25',
    favicon: '/favicons/pdfkit.png',
  },
  {
    slug: 'statementkit',
    name: 'StatementKit',
    domain: 'statementkit.work',
    url: 'https://statementkit.work/',
    category: 'Documents',
    tagline: 'Turn a bank statement PDF into an Excel file',
    description:
      'Upload a bank statement PDF and get back a spreadsheet with proper date, description, debit, credit and balance columns. It is built for the moment you need to sort or total transactions and the bank only gave you a PDF.',
    features: ['Reads most bank formats', 'Clean editable columns', 'Nothing leaves your device'],
    launched: '2026-08-01',
    favicon: '/favicons/statementkit.png',
  },
  {
    slug: 'shrinkvid',
    name: 'Shrinkvid',
    domain: 'shrinkvid.dev',
    url: 'https://shrinkvid.dev/',
    category: 'Media',
    tagline: 'Shrink large video files without uploading them',
    description:
      'Compress a video that is too large to send, without installing anything or waiting on an upload. You choose the target size and the quality is adjusted to hit it.',
    features: ['Runs fully in the browser', 'Pick your target size', 'Keeps the original untouched'],
    launched: '2026-08-09',
    favicon: '/favicons/shrinkvid.png',
  },
  {
    slug: 'squeeze',
    name: 'Squeeze',
    domain: 'squeeze.services',
    url: 'https://squeeze.services/',
    category: 'Media',
    tagline: 'Compress images without visible quality loss',
    description:
      'Reduce the file size of JPG, PNG and WebP images while keeping them looking the same. Drop in a whole folder at once and compare the result side by side before you download.',
    features: ['JPG, PNG and WebP', 'Batch compression', 'Side by side preview'],
    launched: '2026-07-26',
    favicon: '/favicons/squeeze.png',
  },
  {
    slug: 'tenor',
    name: 'Tenor',
    domain: 'emiloancalculator.club',
    url: 'https://emiloancalculator.club/',
    category: 'Money',
    tagline: 'Work out the EMI and full schedule for any loan',
    description:
      'Enter the amount, rate and term to see the monthly payment along with the full repayment schedule. You can put two loans next to each other to see what the difference actually costs over the full term.',
    features: ['Monthly EMI in one tap', 'Full amortisation table', 'Compare two loans'],
    launched: '2026-07-18',
    favicon: '/favicons/tenor.png',
  },
  {
    slug: 'invoice-generator',
    name: 'Invoice Generator',
    domain: 'invoicegeneratorr.tech',
    url: 'https://invoicegeneratorr.tech/',
    category: 'Money',
    tagline: 'Create and download professional invoices free',
    description:
      'Fill in your details, add line items, and download a clean invoice as a PDF. It handles tax and discount lines, and nothing you type is saved anywhere.',
    features: ['Clean printable layout', 'Tax and discount lines', 'Download as PDF'],
    launched: '2026-08-11',
    favicon: '/favicons/invoice-generator.png',
  },
  {
    slug: 'sprout',
    name: 'Sprout',
    domain: 'fatfit.club',
    url: 'https://fatfit.club/',
    category: 'Health',
    tagline: 'BMI plus AI photo analysis of your meals',
    description:
      'Track BMI and related body measurements, and take a photo of a meal to get a calorie estimate for it. Useful for a rough daily picture rather than exact numbers.',
    features: ['BMI and body metrics', 'Estimate calories from a photo', 'No account needed'],
    launched: '2026-07-22',
    favicon: '/favicons/sprout.png',
  },
  {
    slug: 'freelance-rate-calculator',
    name: 'Freelance Rate Calculator',
    domain: null,
    url: null,
    category: 'Money',
    tagline: 'Find your true hourly rate after tax and expenses',
    description:
      'Work backwards from the income you want to the hourly rate you need to charge. It accounts for tax, expenses, holidays, and the unpaid hours that go into running the business.',
    features: ['Tax aware', 'Counts unpaid hours', 'Yearly target to hourly rate'],
    launched: '2026-08-12',
    favicon: null,
  },
  {
    slug: 'calmnoise',
    name: 'CalmNoise',
    domain: null,
    url: null,
    category: 'Focus',
    tagline: 'Nature soundscapes that help you concentrate',
    description:
      'Play rain, wind, waves and other steady sounds, mixed to whatever balance you find least distracting. There is a sleep timer and it keeps playing with the screen off.',
    features: ['Mix your own blend', 'Sleep timer', 'Works with the screen off'],
    launched: '2026-08-13',
    favicon: null,
  },
  {
    slug: 'keyboard-test',
    name: 'Keyboard Test',
    domain: null,
    url: null,
    category: 'Focus',
    tagline: 'Check your typing speed and test every key',
    description:
      'Measure your typing speed and accuracy, and watch a live map of the keys as you press them. It is the quickest way to confirm whether a key is sticking or not registering at all.',
    features: ['Words per minute and accuracy', 'Live key press map', 'Detects stuck keys'],
    launched: '2026-08-14',
    favicon: null,
  },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(category: ToolCategory): Tool[] {
  return tools.filter((tool) => tool.category === category);
}
