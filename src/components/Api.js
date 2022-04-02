class Api {
  constructor(options) {
    this._options = options;
  }

  /*Пользователь*/

  _validateAnswer = (res) => {
    return res.ok ? res.json() : Promise.reject(res.status);
  };

  getUserInfo() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: this._options.headers,
    }).then((res) => this._validateAnswer(res));
  }

  editUserInfo(userData) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._options.headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about,
      }),
    }).then((res) => this._validateAnswer(res));
  }

  updateUserAvatar({ link }) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._options.headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => this._validateAnswer(res));
  }

  /*Карточки*/

  getCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: this._options.headers,
    }).then((res) => this._validateAnswer(res));
  }

  insertCard({ name, link }) {
    {
      return fetch(`${this._options.baseUrl}/cards `, {
        method: "POST",
        headers: this._options.headers,
        body: JSON.stringify({
          name: name,
          link: link,
        }),
      }).then((res) => this._validateAnswer(res));
    }
  }

  deleteCard(id) {
    {
      return fetch(`${this._options.baseUrl}/cards/${id}`, {
        method: "DELETE",
        headers: this._options.headers,
      }).then((res) => this._validateAnswer(res));
    }
  }

  likeCard(id) {
    return fetch(`${this._options.baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._options.headers,
    }).then((res) => this._validateAnswer(res));
  }

  deleteCardLike(id) {
    return fetch(`${this._options.baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._options.headers,
    }).then((res) => this._validateAnswer(res));
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-39",
  headers: {
    authorization: "f2d6b62d-2495-4ad3-a1f3-728379d47465",
    "Content-Type": "application/json",
  },
});

export { api };
