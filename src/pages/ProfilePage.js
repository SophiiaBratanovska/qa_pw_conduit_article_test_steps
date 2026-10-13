import { expect, test } from '@playwright/test';

export class ProfilePage {
  constructor(page) {
    this.page = page;
  }

  profileLink(username) {
    return this.page.getByRole('link', {
      name: `your profile image ${username}`,
    });
  }

  article(articleTitle) {
    return this.page.getByRole('link', {
      name: `Article title: ${articleTitle} Article`,
    });
  }

  async clickProfileLink(username) {
    await test.step(`Click the 'Profile' link`, async () => {
      await this.profileLink(username).click();
    });
  }

  async assertArticleMyPostsIsVisible(articleTitle) {
    await test.step(
      `Assert the article is visible on the My posts tab`, async () => {
      await expect(this.article(articleTitle)).toBeVisible();
    });
  }
}
