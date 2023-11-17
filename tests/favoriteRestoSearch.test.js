import {
  beforeEach, describe, expect, it, jest,
} from '@jest/globals';
import FavoriteRestoSearchPresenter from '../src/scripts/views/pages/liked-restos/favorite-resto-search-presenter';
import FavoriteRestoView from '../src/scripts/views/pages/liked-restos/favorite-resto-view';

describe('Searching restos', () => {
  let presenter;
  let favoriteRestos;
  let view;

  const searchRestos = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;

    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestoSearchContainer = () => {
    view = new FavoriteRestoView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    favoriteRestos = {
      getAllRestos: jest.fn(),
      searchRestos: jest.fn(),
    };

    presenter = new FavoriteRestoSearchPresenter({
      favoriteRestos,
      view,
    });
  };

  beforeEach(() => {
    setRestoSearchContainer();
    constructPresenter();
  });

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      favoriteRestos.searchRestos.mockImplementation(() => []);

      searchRestos('menu a');

      expect(presenter.latestQuery).toEqual('menu a');
    });

    it('should ask the model to search for liked restos', () => {
      favoriteRestos.searchRestos.mockImplementation(() => []);

      searchRestos('menu a');

      expect(favoriteRestos.searchRestos).toHaveBeenCalledWith('menu a');
    });

    it('should show the restos found by Favorite Restos', (done) => {
      document
        .getElementById('restos')
        .addEventListener('restos:updated', () => {
          expect(document.querySelectorAll('.resto-item').length).toEqual(3);

          done();
        });

      favoriteRestos.searchRestos.mockImplementation((query) => {
        if (query === 'menu a') {
          return [
            { id: 111, title: 'menu abc' },
            { id: 222, title: 'ada juga menu abcde' },
            { id: 333, title: 'ini juga boleh menu a' },
          ];
        }
        return [];
      });
      searchRestos('menu a');
    });

    it('should show the name of the restos found by Favorite Restos', (done) => {
      document
        .getElementById('restos')
        .addEventListener('restos:updated', () => {
          const restoTitles = document.querySelectorAll('.resto__title');

          expect(restoTitles.item(0).textContent).toEqual('menu abc');
          expect(restoTitles.item(1).textContent).toEqual('ada juga menu abcde');
          expect(restoTitles.item(2).textContent).toEqual('ini juga boleh menu a');

          done();
        });

      favoriteRestos.searchRestos.mockImplementation((query) => {
        if (query === 'menu a') {
          return [
            { id: 111, title: 'menu abc' },
            { id: 222, title: 'ada juga menu abcde' },
            { id: 333, title: 'ini juga boleh menu a' },
          ];
        }

        return [];
      });

      searchRestos('menu a');
    });

    it('should show - when the resto returned does not contain a title', (done) => {
      document.getElementById('restos')
        .addEventListener('restos:updated', () => {
          const restoTitles = document.querySelectorAll('.resto__title');
          expect(restoTitles.item(0).textContent)
            .toEqual('-');

          done();
        });

      favoriteRestos.searchRestos.mockImplementation((query) => {
        if (query === 'menu a') {
          return [{ id: 444 }];
        }

        return [];
      });

      searchRestos('menu a');
    });
  });

  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      favoriteRestos.getAllRestos.mockImplementation(() => []);

      searchRestos(' ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestos('    ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestos('');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestos('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });

    it('should show all favorite restos', () => {
      favoriteRestos.getAllRestos.mockImplementation(() => []);

      searchRestos('    ');

      expect(favoriteRestos.getAllRestos).toHaveBeenCalled();
    });
  });

  describe('When no favorite restos could be found', () => {
    it('should show the empty message', (done) => {
      document
        .getElementById('restos')
        .addEventListener('restos:updated', () => {
          expect(document.querySelectorAll('.resto-item__not__found').length).toEqual(1);

          done();
        });
      favoriteRestos.searchRestos.mockImplementation((query) => []);

      searchRestos('menu a');
    });

    it('should not show any resto', (done) => {
      document.getElementById('restos')
        .addEventListener('restos:updated', () => {
          expect(document.querySelectorAll('.resto-item').length).toEqual(0);
          done();
        });
      favoriteRestos.searchRestos.mockImplementation((query) => []);
      searchRestos('menu a');
    });
  });
});
