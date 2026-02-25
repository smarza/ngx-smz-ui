import { nameof, SmzTimelineBuilder, SmzTimelineState } from '@ngx-smz/core';
import { of } from 'rxjs';

export interface TimelineUseCase {
  id: string;
  title: string;
  getConfig: () => SmzTimelineState<any>;
  snippet: string;
}

interface TimelineEvent {
  id: string;
  title: string;
  category: string;
  description: string;
  date: Date;
  imagePath: string;
}

const SAMPLE_EVENTS: TimelineEvent[] = [
  { id: '1', title: 'Project Kickoff', category: 'Milestone', description: 'Initial planning meeting and scope definition.', date: new Date(2024, 0, 10), imagePath: 'https://picsum.photos/seed/kickoff/300/200' },
  { id: '2', title: 'Design Phase', category: 'Development', description: 'UI/UX wireframes and prototype creation.', date: new Date(2024, 1, 15), imagePath: 'https://picsum.photos/seed/design/300/200' },
  { id: '3', title: 'Sprint 1 Complete', category: 'Milestone', description: 'Core features implemented and tested.', date: new Date(2024, 2, 20), imagePath: 'https://picsum.photos/seed/sprint/300/200' },
  { id: '4', title: 'Beta Release', category: 'Release', description: 'First public beta with limited users.', date: new Date(2024, 3, 25), imagePath: 'https://picsum.photos/seed/beta/300/200' },
  { id: '5', title: 'Performance Tuning', category: 'Development', description: 'Optimization of critical rendering paths.', date: new Date(2024, 4, 30), imagePath: 'https://picsum.photos/seed/perf/300/200' },
  { id: '6', title: 'GA Release', category: 'Release', description: 'General availability with full feature set.', date: new Date(2024, 5, 15), imagePath: 'https://picsum.photos/seed/release/300/200' },
];

function buildImageTimeline(): SmzTimelineState<TimelineEvent> {
  return new SmzTimelineBuilder<TimelineEvent>()
    .setTitle('Image Timeline')
    .setSource(of(SAMPLE_EVENTS))
    .template()
      .imageWithDetails()
        .setCardStyles('bg-surface-card rounded-lg shadow-md')
        .setContentStyles('px-3 py-2')
        .image(nameof<TimelineEvent>('imagePath'))
          .setStyles('rounded-b-none')
          .template
        .title(nameof<TimelineEvent>('title'))
          .template
        .subTitle(nameof<TimelineEvent>('category'))
          .template
        .addTag(nameof<TimelineEvent>('category'))
          .setStyles('px-2 py-1 text-xs bg-green-200 text-surface-600 rounded')
          .template
        .addText(nameof<TimelineEvent>('description'))
          .shorten(80)
          .template
        .template
      .cards
    .view()
      .setAlign('alternate')
      .setLayout('vertical')
      .styleEvent('')
      .styleTimeline('')
      .addGap()
      .timeline
    .marker()
      .style('')
      .setIcon('fa-solid fa-circle')
      .timeline
    .buttons()
      .item('Details')
        .setCallback((event: any) => console.log('Details:', event))
        .menu
      .timeline
    .menu()
      .item('Edit')
        .setCallback((event: any) => console.log('Edit:', event))
        .menu
      .separator()
      .item('Delete', 'fa-solid fa-trash')
        .setCallback((event: any) => console.log('Delete:', event))
        .menu
      .timeline
    .build();
}

function buildInfoTimeline(): SmzTimelineState<TimelineEvent> {
  return new SmzTimelineBuilder<TimelineEvent>()
    .setTitle('Info Timeline')
    .setSource(of(SAMPLE_EVENTS))
    .template()
      .infoA()
        .setBulletsStyles('bg-indigo-500')
        .setVerticalBarStyles('border-indigo-500')
        .setCardStyles('bg-surface-50')
        .title(nameof<TimelineEvent>('title'), 'Event')
          .template
        .subTitle(nameof<TimelineEvent>('category'))
          .template
        .addTag(nameof<TimelineEvent>('category'))
          .setStyles('bg-indigo-200 text-surface-50')
          .template
        .addInfo(nameof<TimelineEvent>('description'), 'Notes', 'bg-indigo-500')
          .transform((description: string) => description?.substring(0, 40) + '...')
          .template
        .template
      .cards
    .view()
      .setAlign('alternate')
      .setLayout('vertical')
      .styleEvent('')
      .styleTimeline('')
      .addGap()
      .timeline
    .marker()
      .style('')
      .setIcon('fa-solid fa-flag')
      .timeline
    .buttons()
      .item('View')
        .setCallback((event: any) => console.log('View:', event))
        .menu
      .timeline
    .build();
}

function buildEmptyTimeline(): SmzTimelineState<TimelineEvent> {
  return new SmzTimelineBuilder<TimelineEvent>()
    .setTitle('Empty Timeline')
    .setSource(of([]))
    .setEmptyMessage('No events recorded yet.')
    .template()
      .infoA()
        .title(nameof<TimelineEvent>('title'))
          .template
        .template
      .cards
    .view()
      .setAlign('alternate')
      .setLayout('vertical')
      .timeline
    .build();
}

// ────────────────────────────────────────────────────────
// Snippets
// ────────────────────────────────────────────────────────

const SNIPPET_IMAGE = `new SmzTimelineBuilder<TimelineEvent>()
  .setTitle('Image Timeline')
  .setSource(of(events))
  .template()
    .imageWithDetails()
      .setCardStyles('bg-surface-card rounded-lg shadow-md')
      .setContentStyles('px-3 py-2')
      .image(nameof<TimelineEvent>('imagePath'))
        .setStyles('rounded-b-none').template
      .title(nameof<TimelineEvent>('title')).template
      .subTitle(nameof<TimelineEvent>('category')).template
      .addTag(nameof<TimelineEvent>('category'))
        .setStyles('px-2 py-1 text-xs bg-green-200 ...').template
      .addText(nameof<TimelineEvent>('description'))
        .shorten(80).template
      .template
    .cards
  .view()
    .setAlign('alternate')
    .setLayout('vertical')
    .addGap()
    .timeline
  .marker()
    .setIcon('fa-solid fa-circle')
    .timeline
  .buttons()
    .item('Details').setCallback((e) => console.log(e)).menu
    .timeline
  .build();`;

const SNIPPET_INFO = `new SmzTimelineBuilder<TimelineEvent>()
  .setTitle('Info Timeline')
  .setSource(of(events))
  .template()
    .infoA()
      .setBulletsStyles('bg-indigo-500')
      .setVerticalBarStyles('border-indigo-500')
      .setCardStyles('bg-surface-50')
      .title(nameof<TimelineEvent>('title'), 'Event').template
      .subTitle(nameof<TimelineEvent>('category')).template
      .addTag(nameof<TimelineEvent>('category'))
        .setStyles('bg-indigo-200 text-surface-50').template
      .addInfo(nameof<TimelineEvent>('description'), 'Notes', 'bg-indigo-500')
        .transform((desc) => desc?.substring(0, 40) + '...').template
      .template
    .cards
  .view()
    .setAlign('alternate').setLayout('vertical').addGap()
    .timeline
  .marker()
    .setIcon('fa-solid fa-flag')
    .timeline
  .build();`;

const SNIPPET_EMPTY = `new SmzTimelineBuilder<TimelineEvent>()
  .setTitle('Empty Timeline')
  .setSource(of([]))
  .setEmptyMessage('No events recorded yet.')
  .template()
    .infoA()
      .title(nameof<TimelineEvent>('title')).template
      .template
    .cards
  .view()
    .setAlign('alternate').setLayout('vertical')
    .timeline
  .build();`;

export const TIMELINE_USE_CASES: TimelineUseCase[] = [
  { id: 'image-timeline', title: 'Image timeline', getConfig: buildImageTimeline, snippet: SNIPPET_IMAGE },
  { id: 'info-timeline', title: 'Info timeline', getConfig: buildInfoTimeline, snippet: SNIPPET_INFO },
  { id: 'empty-timeline', title: 'Empty timeline', getConfig: buildEmptyTimeline, snippet: SNIPPET_EMPTY },
];
