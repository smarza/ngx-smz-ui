import {
  Component,
  DestroyRef,
  inject,
  NgZone,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Location } from '@angular/common';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { filter } from 'rxjs/operators';
import { DEMO_NAV_SECTIONS } from './demo-nav.config';
import { DemosTocService } from './demos-toc.service';

/** Offset em px para o rootMargin do observer (altura do header). */
const HEADER_OFFSET_PX = 64;

const SETUP_RETRY_DELAYS_MS = [100, 250, 500, 800];

/** Período em ms após clique no TOC em que o observer não sobrescreve a rota (scroll suave). */
const TOC_NAVIGATION_GRACE_MS = 900;

@Component({
  selector: 'app-demos-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './demos-layout.component.html',
  styleUrl: './demos-layout.component.scss',
})
export class DemosLayoutComponent implements OnInit {
  readonly navSections = DEMO_NAV_SECTIONS;
  protected readonly toc = inject(DemosTocService);
  protected readonly router = inject(Router);
  private readonly location = inject(Location);
  private readonly destroyRef = inject(DestroyRef);
  private readonly ngZone = inject(NgZone);

  private scrollObserver: IntersectionObserver | null = null;
  private setupRetryIndex = 0;
  private lastFragmentNavigationAt = 0;

  /** Caminho atual sem query/fragment, para os links do TOC manterem a rota (ex.: /chart). */
  protected get currentPath(): string {
    return this.router.url.split('#')[0].split('?')[0];
  }

  ngOnInit(): void {
    this.syncActiveFromFragment();
    this.scrollToFragment();
    this.scheduleSetupTocScrollSync(0);

    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.scrollToFragment();
        this.syncActiveFromFragment();
        this.setupRetryIndex = 0;
        this.scheduleSetupTocScrollSync(0);
      });

    this.destroyRef.onDestroy(() => this.disconnectScrollObserver());
  }

  private scheduleSetupTocScrollSync(delayIndex: number): void {
    const delay = SETUP_RETRY_DELAYS_MS[delayIndex] ?? 100;

    setTimeout(() => {
      const observedCount = this.setupTocScrollSync();
      const hasItems = this.toc.items().length > 0;
      const hasMoreRetries = delayIndex + 1 < SETUP_RETRY_DELAYS_MS.length;
      const shouldRetry =
        hasItems && observedCount === 0 && hasMoreRetries;

      if (shouldRetry) {
        this.scheduleSetupTocScrollSync(delayIndex + 1);
      }
    }, delay);
  }

  private syncActiveFromFragment(): void {
    const fragment = this.router.routerState.snapshot.root.fragment;
    this.toc.setActiveId(fragment ?? null);
  }

  /**
   * Retorna o id da seção que contém a linha do topo do viewport (logo abaixo do header).
   * Se o topo estiver em um vão entre seções, retorna a primeira seção logo abaixo.
   */
  private computeTopmostVisibleId(
    items: { id: string }[],
    headerHeightPx: number,
  ): string | null {
    const viewportTop = headerHeightPx;

    let fallbackId: string | null = null;
    let fallbackTop = Number.POSITIVE_INFINITY;

    for (const item of items) {
      const el = document.getElementById(item.id);

      if (!el) {
        continue;
      }

      const rect = el.getBoundingClientRect();
      const containsViewportTop =
        rect.top <= viewportTop && rect.bottom > viewportTop;

      if (containsViewportTop) {
        return item.id;
      }

      const isBelowViewportTop = rect.top >= viewportTop;
      const isCloserThanFallback = rect.top < fallbackTop;

      if (isBelowViewportTop && isCloserThanFallback) {
        fallbackTop = rect.top;
        fallbackId = item.id;
      }
    }

    return fallbackId;
  }

  /** Retorna quantos elementos passaram a ser observados. */
  private setupTocScrollSync(): number {
    this.disconnectScrollObserver();

    const items = this.toc.items();

    if (items.length === 0) {
      return 0;
    }

    const main = document.querySelector<HTMLElement>('.demos-main');

    if (!main) {
      return 0;
    }

    const header = document.querySelector<HTMLElement>('.demos-header');
    const headerHeightPx =
      header?.getBoundingClientRect().height ?? HEADER_OFFSET_PX;
    const rootMarginTop = -headerHeightPx;

    const observedIds = new Set<string>();

    this.scrollObserver = new IntersectionObserver(
      () => {
        this.ngZone.run(() => {
          const now = Date.now();
          const isWithinGracePeriod =
            now - this.lastFragmentNavigationAt < TOC_NAVIGATION_GRACE_MS;

          if (isWithinGracePeriod) {
            return;
          }

          const id = this.computeTopmostVisibleId(items, headerHeightPx);
          const hasValidId = id != null && observedIds.has(id);

          if (!hasValidId) {
            return;
          }

          if (this.toc.activeId() === id) {
            return;
          }

          this.toc.setActiveId(id);
          this.location.replaceState(this.currentPath + '#' + id);
        });
      },
      {
        root: null,
        rootMargin: `${rootMarginTop}px 0px 0px 0px`,
        threshold: [0, 0.1, 0.5, 1],
      },
    );

    items.forEach((item) => observedIds.add(item.id));

    let observedCount = 0;

    items.forEach((item) => {
      const el = document.getElementById(item.id);

      if (el) {
        this.scrollObserver?.observe(el);
        observedCount++;
      }
    });

    return observedCount;
  }

  private disconnectScrollObserver(): void {
    this.scrollObserver?.disconnect();
    this.scrollObserver = null;
  }

  private scrollToFragment(): void {
    const fragment = this.router.routerState.snapshot.root.fragment;

    if (!fragment) {
      return;
    }

    this.lastFragmentNavigationAt = Date.now();
    this.toc.setActiveId(fragment);

    const tryScroll = (): boolean => {
      const element = document.getElementById(fragment);

      if (!element) {
        return false;
      }

      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      return true;
    };

    setTimeout(() => {
      const scrolled = tryScroll();

      if (!scrolled) {
        setTimeout(tryScroll, 150);
      }
    }, 0);
  }
}
