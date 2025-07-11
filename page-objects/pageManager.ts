import { Page } from "@playwright/test";
import { HeaderPage } from "./headerPage";

export class PageManager {
  readonly headerPage: HeaderPage;

  constructor(private page: Page) {
    this.headerPage = new HeaderPage(this.page);
  }

  get header() {
    return this.headerPage;
  }
}
