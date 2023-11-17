/* eslint-disable no-undef */

Feature('Liking Restos');

Before(({ I }) => {
  I.amOnPage('/#/like');
});

Scenario('liking one resto', async ({ I }) => {
  I.see('Tidak ada menu untuk ditampilkan', '.resto-item__not__found');

  I.amOnPage('/');
  I.seeElement('.resto__title a');

  I.click(locate('.resto__title a').first());

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/');

  I.amOnPage('/#/like');
  I.seeElement('.resto__title a');

  I.click(locate('.resto__title a').first());

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/like');
});
