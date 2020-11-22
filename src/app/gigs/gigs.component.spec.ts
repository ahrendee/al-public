import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from '../components/header/header.component';

import { GigsComponent } from './gigs.component';

describe('GigsComponent', () => {
  let component: GigsComponent;
  let fixture: ComponentFixture<GigsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GigsComponent, HeaderComponent ],
      imports: [
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
