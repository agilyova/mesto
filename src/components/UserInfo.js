export class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const userData = {};
    userData.name = this._name.textContent;
    userData.about = this._about.textContent;
    userData.avatar = this._avatar.src;

    return userData;
  }

  setUserInfo(userData) {
    this.id = userData._id;
    this._name.textContent = userData.name;
    this._about.textContent = userData.about;
  }

  setUserAvatar(avatar) {
    this._avatar.src = avatar;
  }
}
