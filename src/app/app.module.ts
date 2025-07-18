import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { WhyChooseUsComponent } from './components/why-choose-us/why-choose-us.component';
import { ForFindersComponent } from './components/for-finders/for-finders.component';
import { ForEmployersComponent } from './components/for-employers/for-employers.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroSectionComponent,
    WhyChooseUsComponent,
    ForFindersComponent,
    ForEmployersComponent,
    ReviewsComponent,
    ContactsComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HeaderComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
