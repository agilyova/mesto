export class UserInfo {
  constructor({ nameSelector, descriptionSelector }) {
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    const userData = {};
    userData.name = this._name.textContent;
    userData.info = this._info.textContent;

    return userData;
  }

  setUserInfo(userData) {
    this._name.textContent = userData.name;
    this._info.textContent = userData.info;
  }
}
