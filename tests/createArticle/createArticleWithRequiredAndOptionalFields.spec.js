import { test } from '@playwright/test';
import { SignUpPage } from '../../src/pages/SignUpPage';
import { HomePage } from '../../src/pages/HomePage';
import { CreateArticlePage } from '../../src/pages/CreateArticlePage';
import { faker } from '@faker-js/faker';
import { ProfilePage } from '../../src/pages/ProfilePage';

let homePage;
let user;
let createArticlePage;

test.beforeEach(async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  homePage = new HomePage(page);
  createArticlePage = new CreateArticlePage(page);

  user = {
    username: `${faker.person.firstName()}_${faker.person.lastName()}`,
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  await signUpPage.open();
  await signUpPage.fillUsernameField(user.username);
  await signUpPage.fillEmailField(user.email);
  await signUpPage.fillPasswordField(user.password);
  await signUpPage.clickSignUpButton();
  await homePage.assertYourFeedTabIsVisible();
});

test('Create an article with required and optional fields', async () => {
  await homePage.clickNewArticleLink();
  await createArticlePage.fillArticleTitleField('Test Article Title');
  await createArticlePage.fillAboutArticleField('Test About Article');
  await createArticlePage.fillArticleBodyField('Test Article Body');
  await createArticlePage.fillTagsField('Test Tag');  
  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertArticleIsPublished('Test Article Title');

  const profilePage = new ProfilePage(homePage.page);
  await profilePage.clickProfileLink(user.username);
  await profilePage.assertArticleMyPostsIsVisible('Test Article Title');
});
