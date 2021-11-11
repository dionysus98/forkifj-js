import icons from "url:../../img/icons.svg";
import View from "./view.js";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      console.log(goToPage);
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const totalPage = Math.ceil(this._data.results.length / this._data.resultsPerPage);
    const currentPage = this._data.page;

    //? page 1, and others
    if (currentPage === 1 && totalPage > 1) {
      return `
      <button class="btn--inline pagination__btn--next" data-goto="${currentPage + 1}">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
        `;
    }

    //? last page
    if (currentPage === totalPage && totalPage > 1) {
      return `
        <button class="btn--inline pagination__btn--prev" data-goto="${currentPage - 1}">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
       </button>
        `;
    }

    //? other pages
    if (currentPage < totalPage) {
      return `
          <button class="btn--inline pagination__btn--prev" data-goto="${
            currentPage - 1
          }">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>
          <button class="btn--inline pagination__btn--next" data-goto="${
            currentPage + 1
          }">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
     `;
    }

    //? page 1 and none
    return "";
  }
}
export default new PaginationView();
