import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
    //article fields 
    this.articleTitleField = page.getByPlaceholder('Article Title');
    this.aboutArticleField = page
    .getByPlaceholder('What\'s this article about?');
    this.articleBodyField = page.getByPlaceholder('Write your article (in');
    this.tagsField = page.getByPlaceholder('Enter tags');
  }

  async clickPublishArticleButton() {
    await test.step(`Click the 'Publish Article' button`, async () => {
      await this.publishArticleButton.click();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }

  async assertArticleIsPublished(title) {
    await test.step(`Assert the '${title}' article is published`, async () => {
      await expect(this.page).toHaveURL(/\/article\//);
      await expect(
        this.page.getByRole('heading', { name: title, level: 1 }),
      ).toBeVisible();
    });
  }

  async fillArticleTitleField(title) {
    await test.step(
      `Fill the 'Article Title' field with '${title}'`, async () => {
      await this.articleTitleField.fill(title);
    });
  }

  async fillAboutArticleField(about) {
    await test.step(
      `Fill the 'About Article' field with '${about}'`, async () => {
      await this.aboutArticleField.fill(about);
    });
  }

  async fillArticleBodyField(body) {
    await test.step(`
      Fill the 'Article Body' field with '${body}'`, async () => {
      await this.articleBodyField.fill(body);
    });
  }

  async fillTagsField(tags) {
    await test.step(`Fill the 'Tags' field with '${tags}'`, async () => {
      await this.tagsField.fill(tags);
      await this.tagsField.press('Enter');
    });
  }

  
}
