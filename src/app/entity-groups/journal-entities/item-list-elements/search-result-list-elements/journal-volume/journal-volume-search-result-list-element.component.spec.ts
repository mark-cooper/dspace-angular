import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of as observableOf } from 'rxjs';
import { ItemSearchResult } from '../../../../../shared/object-collection/shared/item-search-result.model';
import { Item } from '../../../../../core/shared/item.model';
import { JournalVolumeSearchResultListElementComponent } from './journal-volume-search-result-list-element.component';
import { TruncatePipe } from '../../../../../shared/utils/truncate.pipe';
import { TruncatableService } from '../../../../../shared/truncatable/truncatable.service';
import { DSONameService } from '../../../../../core/breadcrumbs/dso-name.service';
import { DSONameServiceMock } from '../../../../../shared/mocks/dso-name.service.mock';
import { APP_CONFIG } from '../../../../../../config/app-config.interface';
import { ThemeService } from '../../../../../shared/theme-support/theme.service';
import { getMockThemeService } from '../../../../../shared/mocks/theme-service.mock';
import { mockTruncatableService } from '../../../../../shared/mocks/mock-trucatable.service';
import { ThumbnailComponent } from '../../../../../thumbnail/thumbnail.component';
import { ThemedBadgesComponent } from '../../../../../shared/object-collection/shared/badges/themed-badges.component';
import { TruncatableComponent } from '../../../../../shared/truncatable/truncatable.component';
import {
  TruncatablePartComponent
} from '../../../../../shared/truncatable/truncatable-part/truncatable-part.component';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from '../../../../../shared/testing/active-router.stub';

let journalVolumeListElementComponent: JournalVolumeSearchResultListElementComponent;
let fixture: ComponentFixture<JournalVolumeSearchResultListElementComponent>;

const mockItemWithMetadata: ItemSearchResult = Object.assign(
  new ItemSearchResult(),
  {
    indexableObject: Object.assign(new Item(), {
      bundles: observableOf({}),
      metadata: {
        'dc.title': [
          {
            language: 'en_US',
            value: 'This is just another title'
          }
        ],
        'journal.title': [
          {
            language: 'en_US',
            value: 'This is just another journal title'
          }
        ],
        'publicationvolume.volumeNumber': [
          {
            language: 'en_US',
            value: '1234'
          }
        ]
      }
    })
  });
const mockItemWithoutMetadata: ItemSearchResult = Object.assign(
  new ItemSearchResult(),
  {
    indexableObject: Object.assign(new Item(), {
      bundles: observableOf({}),
      metadata: {
        'dc.title': [
          {
            language: 'en_US',
            value: 'This is just another title'
          }
        ]
      }
    })
  });

const environmentUseThumbs = {
  browseBy: {
    showThumbnails: true
  }
};

const enviromentNoThumbs = {
  browseBy: {
    showThumbnails: false
  }
};

describe('JournalVolumeSearchResultListElementComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [JournalVolumeSearchResultListElementComponent, TruncatePipe],
    providers: [
        { provide: TruncatableService, useValue: mockTruncatableService },
        { provide: DSONameService, useClass: DSONameServiceMock },
        { provide: APP_CONFIG, useValue: environmentUseThumbs },
        { provide: ThemeService, useValue: getMockThemeService() },
        { provide: ActivatedRoute, useValue: new ActivatedRouteStub() }
    ],
    schemas: [NO_ERRORS_SCHEMA]
}).overrideComponent(JournalVolumeSearchResultListElementComponent, {
      add: { changeDetection: ChangeDetectionStrategy.Default },
      remove: { imports: [
          ThumbnailComponent,
          ThemedBadgesComponent,
          TruncatableComponent,
          TruncatablePartComponent,
        ]}
    }).compileComponents();
  }));

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(JournalVolumeSearchResultListElementComponent);
    journalVolumeListElementComponent = fixture.componentInstance;

  }));

  describe('with environment.browseBy.showThumbnails set to true', () => {
    beforeEach(() => {
      journalVolumeListElementComponent.object = mockItemWithMetadata;
      fixture.detectChanges();
    });
    it('should set showThumbnails to true', () => {
      expect(journalVolumeListElementComponent.showThumbnails).toBeTrue();
    });

    it('should add thumbnail element', () => {
      const thumbnailElement = fixture.debugElement.query(By.css('ds-thumbnail'));
      expect(thumbnailElement).toBeTruthy();
    });
  });

  describe('When the item has a journal title', () => {
    beforeEach(() => {
      journalVolumeListElementComponent.object = mockItemWithMetadata;
      fixture.detectChanges();
    });

    it('should show the journal title span', () => {
      const journalTitleField = fixture.debugElement.query(By.css('span.item-list-journal-volumes'));
      expect(journalTitleField).not.toBeNull();
    });
  });

  describe('When the item has no journal title', () => {
    beforeEach(() => {
      journalVolumeListElementComponent.object = mockItemWithoutMetadata;
      fixture.detectChanges();
    });

    it('should not show the journal title span', () => {
      const journalTitleField = fixture.debugElement.query(By.css('span.item-list-journal-volumes'));
      expect(journalTitleField).toBeNull();
    });
  });

  describe('When the item has a journal identifier', () => {
    beforeEach(() => {
      journalVolumeListElementComponent.object = mockItemWithMetadata;
      fixture.detectChanges();
    });

    it('should show the journal identifiers span', () => {
      const journalIdentifierField = fixture.debugElement.query(By.css('span.item-list-journal-volume-identifiers'));
      expect(journalIdentifierField).not.toBeNull();
    });
  });

  describe('When the item has no journal identifier', () => {
    beforeEach(() => {
      journalVolumeListElementComponent.object = mockItemWithoutMetadata;
      fixture.detectChanges();
    });

    it('should not show the journal identifiers span', () => {
      const journalIdentifierField = fixture.debugElement.query(By.css('span.item-list-journal-volume-identifiers'));
      expect(journalIdentifierField).toBeNull();
    });
  });
});

describe('JournalVolumeSearchResultListElementComponent', () => {

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [JournalVolumeSearchResultListElementComponent, TruncatePipe],
    providers: [
        { provide: TruncatableService, useValue: mockTruncatableService },
        { provide: DSONameService, useClass: DSONameServiceMock },
        { provide: APP_CONFIG, useValue: enviromentNoThumbs },
        { provide: ThemeService, useValue: getMockThemeService() }
    ],
    schemas: [NO_ERRORS_SCHEMA]
}).overrideComponent(JournalVolumeSearchResultListElementComponent, {
      set: {changeDetection: ChangeDetectionStrategy.Default}
    }).compileComponents();
  }));

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(JournalVolumeSearchResultListElementComponent);
    journalVolumeListElementComponent = fixture.componentInstance;
  }));

  describe('with environment.browseBy.showThumbnails set to false', () => {
    beforeEach(() => {
      journalVolumeListElementComponent.object = mockItemWithMetadata;
      fixture.detectChanges();
    });

    it('should not add thumbnail element', () => {
      const thumbnailElement = fixture.debugElement.query(By.css('ds-thumbnail'));
      expect(thumbnailElement).toBeFalsy();
    });
  });
});
