import icons from "url:../../img/icons.svg";

export default class View {
  _data;

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }

    this._data = data;
    const markUp = this._generateMarkup();
    if (!render) return markUp;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markUp);
  }

  update(data) {
    this._data = data;
    const newMarkUp = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkUp);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const currentElements = Array.from(this._parentElement.querySelectorAll("*"));

    newElements.forEach((newEl, i) => {
      const curEl = currentElements[i];

      if (!curEl.isEqualNode(newEl) && newEl.firstChild?.nodeValue.trim() !== "") {
        curEl.textContent = newEl.textContent;
      }

      if (!curEl.isEqualNode(newEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner() {
    const markUp = `<div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
            </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markUp);
  }

  renderError(message = this._errorMessage) {
    const markUp = `<div class="error">
                <div>
                    <svg>
                        <use href="${icons}#icon-alert-triangle"></use>
                    </svg>
                </div>
                <p>${message}</p>
             </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markUp);
  }
  renderMessage(message = this._successMessage) {
    const markUp = `<div class="error">
                <div>
                    <svg>
                        <use href="${icons}#icon-alert-triangle"></use>
                    </svg>
                </div>
                <p>${message}</p>
             </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markUp);
  }
}
