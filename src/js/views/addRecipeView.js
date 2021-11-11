import View from "./view.js";

class AddRecipeView extends View {
  _successMessage = "Recipe Uploaded Sucessfully";
  _parentElement = document.querySelector(".upload");
  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnCLose = document.querySelector(".btn--close-modal");
  //   _btnUpload = document.querySelector(".upload__btn");

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle("hidden");
    this._window.classList.toggle("hidden");
  }
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));
  }
  _addHandlerHideWindow() {
    this._btnCLose.addEventListener("click", this.toggleWindow.bind(this));
    this._overlay.addEventListener("click", this.toggleWindow.bind(this));
  }
  addHandlerUpload(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      //   const dataArr = [...new FormData(this)];
      //   const data = Object.fromEntries(dataArr);
      const data = Object.fromEntries([...new FormData(this)]);

      handler(data);
    });
  }
  _generateMarkup() {}
}

export default new AddRecipeView();
