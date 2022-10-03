import { createUser, sigIn as signIn } from '../api/api';
import { SignInUser } from '../interfaces/sign-in-user';
import { User } from '../interfaces/user';
import { Auth } from '../interfaces/auth';
import { setLocalStorage, removeLocalStorage, getLocalStorage } from '../local-storage/local-storage';

import { authPopup } from '../header/header';

class UserAuth {
  userButton;
  constructor() {
    this.userButton = document.querySelector('.header__btn--user') as HTMLElement;

    // click 'logout'
    this.userButton.addEventListener('click', () => {
      if (this.userButton.classList.contains('is-authorized')) {
        this.logOut();
      }
    });

    document.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const { target } = ev;
      if (target instanceof HTMLElement) {
        const formElem = target.closest('form') as HTMLFormElement;
        this.hideError(formElem);

        if (formElem.id === 'auth-form') {
          this.logIn(formElem);
          return;
        }
        if (formElem.id === 'regist-form') {
          this.registration(formElem);
          return;
        }
      }
    });
  }

  getFormData(formElem: HTMLFormElement) {
    const formData = new FormData(formElem);
    const data = Object.fromEntries(formData.entries());
    return data;
  }

  toggleButtonState() {
    if (this.userButton instanceof HTMLElement) {
      this.userButton.classList.toggle('is-authorized');
    }
  }

  isAuthorized() {
    const userAuthData = localStorage.getItem('auth');
    if (userAuthData && JSON.parse(userAuthData)) {
      // userAuthData = JSON.parse(userAuthData) as {};
    }
  }

  logIn(formElem: HTMLFormElement) {
    const data = this.getFormData(formElem);
    signIn((data as unknown) as SignInUser)
      .then((body: Auth) => {
        authPopup.close(); // close popup
        setLocalStorage('auth', body); // write localStorage
        this.toggleButtonState(); // toggle state
      })
      .catch((err) => {
        console.log(err);
        this.showError('Неверно указан email или пароль.', formElem);
      });
  }

  registration(formElem: HTMLFormElement) {
    const data = this.getFormData(formElem);
    createUser((data as unknown) as User)
      .then(() => {
        const userData = { email: data.email as string, password: data.password as string };
        return signIn(userData);
      })
      .then((data: Auth) => {
        authPopup.close(); // close popup
        setLocalStorage('auth', data); // write localStorage
        this.toggleButtonState(); // toggle state
      })
      .catch((err) => {
        console.log(err);
        this.showError('Указанный email занят другим пользователем', formElem);
      });
  }

  logOut() {
    removeLocalStorage('auth');
    this.toggleButtonState();
  }

  showError(message: string, formElem: HTMLFormElement) {
    const errorElem = formElem.querySelector('.auth-form__error') as HTMLElement;
    errorElem.textContent = message;
  }

  hideError(formElem: HTMLFormElement) {
    const errorElem = formElem.querySelector('.auth-form__error') as HTMLElement;
    errorElem.textContent = '';
  }
}

const auth = new UserAuth();
if (getLocalStorage('auth')) {
  auth.toggleButtonState();
}
