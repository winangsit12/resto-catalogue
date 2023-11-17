/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import FavoriteRestoView from '../src/scripts/views/pages/liked-restos/favorite-resto-view';
import FavoriteRestoShowPresenter from '../src/scripts/views/pages/liked-restos/favorite-resto-show-presenter';

describe('Showing all favorite restos', () => {
  let view;

  const renderTemplate = () => {
    view = new FavoriteRestoView();
    document.body.innerHTML = view.getTemplate();
  };

  beforeEach(() => {
    renderTemplate();
  });

  describe('When no restos have been liked', () => {
    it('should ask for the favorite restos', () => {
      const favoriteRestos = {
        getAllRestos: jest.fn().mockImplementation(() => []),
      };
    });

    it('should show the information that no restos have been liked', (done) => {
      document.getElementById('restos').addEventListener('restos:updated', () => {
        expect(document.querySelectorAll('.resto-item__not__found').length).toEqual(1);

        done();
      });

      const favoriteRestos = {
        getAllRestos: jest.fn().mockImplementation(() => []),
      };

      new FavoriteRestoShowPresenter({
        view,
        favoriteRestos,
      });
    });
  });

  describe('When favorite restos exist', () => {
    it('should show the restos', (done) => {
      document.getElementById('restos').addEventListener('restos:updated', () => {
        expect(document.querySelectorAll('.resto-item').length).toEqual(2);
        done();
      });
      const favoriteRestos = {
        getAllRestos: jest.fn().mockImplementation(() => [
          {
            id: 11,
            name: 'A',
            rating: 3,
            description: 'Sebuah menu A',
          },
          {
            id: 22,
            name: 'B',
            rating: 4,
            description: 'Sebuah menu B',
          },
        ]),
      };
      new FavoriteRestoShowPresenter({
        view,
        favoriteRestos,
      });
    });
  });
});
