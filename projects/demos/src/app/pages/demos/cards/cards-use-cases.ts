import { nameof, SmzCardsBuilder, SmzCardsState, SimpleEntity } from '@ngx-smz/core';
import { of } from 'rxjs';

export interface CardsUseCase {
  id: string;
  title: string;
  getConfig: () => SmzCardsState<any>;
  snippet: string;
}

interface CardItem {
  id: string;
  title: string;
  category: string;
  description: string;
  date: Date;
  imagePath: string;
  isActive: boolean;
}

const SAMPLE_CARDS: CardItem[] = [
  { id: '1', title: 'Sunset Beach', category: 'Nature', description: 'Golden hour at the coastline with waves crashing against the rocks.', date: new Date(2024, 0, 15), imagePath: 'https://picsum.photos/seed/sunset/300/200', isActive: true },
  { id: '2', title: 'Mountain Trail', category: 'Adventure', description: 'A winding path through alpine meadows with snow-capped peaks.', date: new Date(2024, 1, 20), imagePath: 'https://picsum.photos/seed/mountain/300/200', isActive: true },
  { id: '3', title: 'City Lights', category: 'Urban', description: 'Neon reflections on rain-soaked streets of downtown.', date: new Date(2024, 2, 10), imagePath: 'https://picsum.photos/seed/city/300/200', isActive: false },
  { id: '4', title: 'Forest Canopy', category: 'Nature', description: 'Sunbeams filtering through dense emerald foliage.', date: new Date(2024, 3, 5), imagePath: 'https://picsum.photos/seed/forest/300/200', isActive: true },
  { id: '5', title: 'Ocean Dive', category: 'Adventure', description: 'Exploring vibrant coral reefs beneath crystal-clear waters.', date: new Date(2024, 4, 12), imagePath: 'https://picsum.photos/seed/ocean/300/200', isActive: true },
  { id: '6', title: 'Vintage Café', category: 'Urban', description: 'Cozy corner with exposed brick and warm espresso aroma.', date: new Date(2024, 5, 8), imagePath: 'https://picsum.photos/seed/cafe/300/200', isActive: false },
];

function buildImageWithDetails(): SmzCardsState<CardItem> {
  return new SmzCardsBuilder<CardItem>()
    .setTitle('Image with Details')
    .setSource(of(SAMPLE_CARDS))
    .template()
      .imageWithDetails()
        .setCardStyles('bg-surface-card rounded-lg shadow-md')
        .setContentStyles('px-3 py-2')
        .image(nameof<CardItem>('imagePath'))
          .setStyles('rounded-b-none')
          .template
        .title(nameof<CardItem>('title'))
          .template
        .subTitle(nameof<CardItem>('category'))
          .template
        .addTag(nameof<CardItem>('category'))
          .setStyles('px-2 py-1 text-xs bg-green-200 text-surface-600 rounded')
          .enableGlobalFilter()
          .template
        .addText(nameof<CardItem>('description'))
          .shorten(60)
          .template
        .template
      .cards
    .grid()
      .setLayout('col-12 lg:col-6 xl:col-3')
      .setPadding('p-2')
      .cards
    .list()
      .setLayout('col-12')
      .setPadding('px-0 pt-4')
      .cards
    .buttons()
      .item('View')
        .setCallback((event: any) => console.log('View:', event))
        .menu
      .cards
    .menu()
      .item('Edit')
        .setCallback((event: any) => console.log('Edit:', event))
        .menu
      .separator()
      .item('Delete', 'fa-solid fa-trash')
        .setCallback((event: any) => console.log('Delete:', event))
        .menu
      .cards
    .build();
}

function buildInfoA(): SmzCardsState<CardItem> {
  return new SmzCardsBuilder<CardItem>()
    .setTitle('Info A')
    .setSource(of(SAMPLE_CARDS))
    .template()
      .infoA()
        .setBulletsStyles('bg-blue-500')
        .setVerticalBarStyles('border-blue-500')
        .setCardStyles('bg-surface-50')
        .title(nameof<CardItem>('title'), 'Item')
          .template
        .subTitle(nameof<CardItem>('category'))
          .template
        .addTag(nameof<CardItem>('category'))
          .setStyles('bg-green-200 text-surface-50')
          .template
        .addInfo(nameof<CardItem>('description'), 'Notes', 'bg-blue-500')
          .transform((description: string) => description?.substring(0, 30) + '...')
          .template
        .template
      .cards
    .grid()
      .setLayout('col-12 lg:col-6 xl:col-4')
      .setPadding('p-2')
      .cards
    .list()
      .setLayout('col-12')
      .setPadding('px-0 pt-4')
      .cards
    .buttons()
      .item('View')
        .setCallback((event: any) => console.log('View:', event))
        .menu
      .cards
    .menu()
      .item('Edit')
        .setCallback((event: any) => console.log('Edit:', event))
        .menu
      .cards
    .build();
}

function buildFlipCardHtml(): SmzCardsState<CardItem> {
  return new SmzCardsBuilder<CardItem>()
    .setTitle('Flip Card (HTML)')
    .setSource(of(SAMPLE_CARDS))
    .template()
      .flipCard()
        .setCardSize('160px', '240px')
        .setCardStyles('')
        .setContentStyles('')
        .front()
          .html('<div class="w-full h-full bg-teal-600 rounded-lg shadow-lg flex items-center justify-center text-white font-bold">FRONT</div>')
          .front
        .back()
          .html('<div class="w-full h-full bg-purple-600 rounded-lg shadow-lg flex items-center justify-center text-white font-bold">BACK</div>')
          .back
        .template
      .cards
    .grid()
      .setLayout('')
      .setPadding('p-2')
      .cards
    .build();
}

function buildEmptyMessage(): SmzCardsState<CardItem> {
  return new SmzCardsBuilder<CardItem>()
    .setTitle('Empty Message')
    .setSource(of([]))
    .setEmptyMessage('<div class="text-bold">No items found.</div><div class="text-sm mt-2">Try adjusting your filters or add new entries.</div>')
    .template()
      .imageWithDetails()
        .setCardStyles('bg-surface-card rounded-lg shadow-md')
        .setContentStyles('px-3 py-2')
        .image(nameof<CardItem>('imagePath'))
          .template
        .title(nameof<CardItem>('title'))
          .template
        .template
      .cards
    .grid()
      .setLayout('col-12 lg:col-6 xl:col-3')
      .setPadding('p-2')
      .cards
    .build();
}

// ────────────────────────────────────────────────────────
// Snippets
// ────────────────────────────────────────────────────────

const SNIPPET_IMAGE_DETAILS = `new SmzCardsBuilder<CardItem>()
  .setTitle('Image with Details')
  .setSource(of(data))
  .template()
    .imageWithDetails()
      .setCardStyles('bg-surface-card rounded-lg shadow-md')
      .setContentStyles('px-3 py-2')
      .image(nameof<CardItem>('imagePath'))
        .setStyles('rounded-b-none')
        .template
      .title(nameof<CardItem>('title')).template
      .subTitle(nameof<CardItem>('category')).template
      .addTag(nameof<CardItem>('category'))
        .setStyles('px-2 py-1 text-xs bg-green-200 text-surface-600 rounded')
        .enableGlobalFilter()
        .template
      .addText(nameof<CardItem>('description'))
        .shorten(60)
        .template
      .template
    .cards
  .grid()
    .setLayout('col-12 lg:col-6 xl:col-3')
    .setPadding('p-2')
    .cards
  .buttons()
    .item('View').setCallback((event) => console.log(event)).menu
    .cards
  .build();`;

const SNIPPET_INFO_A = `new SmzCardsBuilder<CardItem>()
  .setTitle('Info A')
  .setSource(of(data))
  .template()
    .infoA()
      .setBulletsStyles('bg-blue-500')
      .setVerticalBarStyles('border-blue-500')
      .setCardStyles('bg-surface-50')
      .title(nameof<CardItem>('title'), 'Item').template
      .subTitle(nameof<CardItem>('category')).template
      .addTag(nameof<CardItem>('category'))
        .setStyles('bg-green-200 text-surface-50').template
      .addInfo(nameof<CardItem>('description'), 'Notes', 'bg-blue-500')
        .transform((desc) => desc?.substring(0, 30) + '...').template
      .template
    .cards
  .grid()
    .setLayout('col-12 lg:col-6 xl:col-4')
    .setPadding('p-2')
    .cards
  .build();`;

const SNIPPET_FLIP_HTML = `new SmzCardsBuilder<CardItem>()
  .setTitle('Flip Card (HTML)')
  .setSource(of(data))
  .template()
    .flipCard()
      .setCardSize('160px', '240px')
      .front()
        .html('<div class="...">FRONT</div>')
        .front
      .back()
        .html('<div class="...">BACK</div>')
        .back
      .template
    .cards
  .grid()
    .setLayout('')
    .setPadding('p-2')
    .cards
  .build();`;

const SNIPPET_EMPTY = `new SmzCardsBuilder<CardItem>()
  .setTitle('Empty Message')
  .setSource(of([]))
  .setEmptyMessage('<div>No items found.</div>')
  .template()
    .imageWithDetails()
      .image(nameof<CardItem>('imagePath')).template
      .title(nameof<CardItem>('title')).template
      .template
    .cards
  .grid()
    .setLayout('col-12 lg:col-6 xl:col-3')
    .setPadding('p-2')
    .cards
  .build();`;

export const CARDS_USE_CASES: CardsUseCase[] = [
  { id: 'image-details', title: 'Image with details', getConfig: buildImageWithDetails, snippet: SNIPPET_IMAGE_DETAILS },
  { id: 'info-a', title: 'Info A', getConfig: buildInfoA, snippet: SNIPPET_INFO_A },
  { id: 'flip-html', title: 'Flip card (HTML)', getConfig: buildFlipCardHtml, snippet: SNIPPET_FLIP_HTML },
  { id: 'empty-message', title: 'Empty message', getConfig: buildEmptyMessage, snippet: SNIPPET_EMPTY },
];
