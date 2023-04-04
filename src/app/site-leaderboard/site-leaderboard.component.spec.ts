import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteLeaderboardComponent } from './site-leaderboard.component';

describe('SiteLeaderboardComponent', () => {
  let component: SiteLeaderboardComponent;
  let fixture: ComponentFixture<SiteLeaderboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteLeaderboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteLeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
