import { Page } from "@playwright/test";
import { HeaderPage } from "./headerPage";
import { SchoolPage } from "./schoolPage";
import { AwardsPage } from "./awardsPage";

export class PageManager {
  readonly headerPage: HeaderPage;
  readonly schoolPage: SchoolPage;
  readonly awardsPage: AwardsPage;

  constructor(private page: Page) {
    this.headerPage = new HeaderPage(this.page);
    this.schoolPage = new SchoolPage(this.page);
    this.awardsPage = new AwardsPage(this.page);
  }

  get header() {
    return this.headerPage;
  }

  get school() {
    return this.schoolPage;
  }

  get awards() {
    return this.awardsPage;
  }
}
