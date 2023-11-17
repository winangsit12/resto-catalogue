import CONFIG from '../../globals/config';

const createRestoDetailTemplate = (resto) => `
  <h2 class="resto__title">${resto.name}</h2>
  <img class="lazyload resto__poster" data-src="${CONFIG.BASE_IMAGE_URL + resto.pictureId}" alt="${resto.name}" />
  <div class="resto__info">
    <h3>Information</h3>
    <h4>Rating</h4>
    <p>⭐️${resto.rating}/5.0</p>
    <h4>Category</h4>
    <p>${resto.categories.map((category) => category.name).join(', ')}</p>
    <h4>Address</h4>
    <p>${resto.address}</p>
    <h4>City</h4>
    <p>${resto.city}</p>
    <h4>Description</h4>
    <p>${resto.description}</p>
    <h4>Foods</h4>
    <p>${resto.menus.foods.map((food) => food.name).join(', ')}</p>
    <h4>Drinks</h4>
    <p>${resto.menus.drinks.map((drink) => drink.name).join(', ')}</p>
    <h4>Customer Reviews</h4>
    <ul>
      ${resto.customerReviews.map((customer) => `<li><p>${customer.name}, ${customer.date}</p>${customer.review}</li>`).join('')}
    </ul>
  </div>
`;

const createRestoItemTemplate = (resto) => `
  <div class="resto-item">
    <div class="resto-item__header">
      <img class="lazyload resto-item__header__poster" alt="${resto.name || '-'}"
           data-src="${resto.pictureId ? CONFIG.BASE_IMAGE_URL + resto.pictureId : 'https://picsum.photos/id/666/800/450?grayscale'}">
      <div class="resto-item__header__rating">
        <p>⭐️<span class="resto-item__header__rating__score">${resto.rating || '-'}</span></p>
      </div>
    </div>
    <div class="resto-item__content">
      <h3 class="resto__title"><a href="/#/detail/${resto.id}">${resto.name || '-'}</a></h3>
      <p>${resto.description || '-'}</p>
    </div>
  </div>
`;

const createLikeRestoButtonTemplate = () => `
  <button aria-label="like this resto" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnlikeRestoButtonTemplate = () => `
  <button aria-label="unlike this resto" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestoItemTemplate,
  createRestoDetailTemplate,
  createLikeRestoButtonTemplate,
  createUnlikeRestoButtonTemplate,
};
