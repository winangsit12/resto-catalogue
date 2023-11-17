/* eslint-disable class-methods-use-this */
import { createRestoItemTemplate } from '../../templates/template-creator';

class FavoriteRestoView {
  getTemplate() {
    return `
    <div class="content">
      <input id="query" type="text">
      <h2 class="content__heading">Your Liked Resto</h2>
 
      <div id="restos" class="restos">
      </div>
    </div>
  `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  // showRestos(restos) {
  //   this.showFavoriteRestos(restos);
  // }

  showFavoriteRestos(restos) {
    let html;
    if (restos.length) {
      html = restos.reduce(
        (carry, resto) => carry.concat(createRestoItemTemplate(resto)),
        '',
      );
    } else {
      html = this._getEmptyRestoTemplate();
    }

    document.getElementById('restos').innerHTML = html;

    document.getElementById('restos').dispatchEvent(new Event('restos:updated'));
  }

  _getEmptyRestoTemplate() {
    return `
    <div class="resto-item__not__found">
      Tidak ada menu untuk ditampilkan
    </div>
  `;
  }
}

export default FavoriteRestoView;
