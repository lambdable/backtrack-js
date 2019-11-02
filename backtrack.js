/**
* Backtrack 2.0.1
* Copyright © Zaim Ramlan
*/

class Backtrack {
    /**
     * Initializes an instance of Backtrack.
     *
     * @constructor
     * @author: Zaim Ramlan
     * @param {string} backButtonId The `id` property of the back button.
     */
    constructor(backButtonId) {
        this._storageKey = 'backtracks';
        this._backButtonId = backButtonId;
    }

    /**
     * Configures the back button to execute `popPage()` on keyUp and
     * sets its href property.
     *
     * assumptions:
     * 1) Back link is a `<a href=""></a>`
     * 2) Back link has the id stored in `_backButtonId`
     *
     * i.e.
     * <a id="back_button" href="">Back</a>
     */
    configureBackButton() {
        var backButton = document.getElementById(this._backButtonId);
        var url = this._getBackButtonURL();
        var _this = this;

        if (backButton !== null) {
            if (url !== '') backButton.href = url;
            backButton.onmouseup = function() { _this.popPage(); };
        }
    }

    /**
     * Pushes the current page into the history stack if it's not already in.
     */
    pushPage() {
        var currentPage = location.href;

        var pages = this._getStoredPages();
        var previousPageIndex = pages.length - 1;
        var previousPage = pages[previousPageIndex];

        if (currentPage !== previousPage) {
            pages.push(currentPage);
            this._setToStore(pages);
        }
    }

    /**
     * Removes the last page in the history stack.
     */
    popPage() {
        var pages = this._getStoredPages();
        pages.pop();
        this._setToStore(pages);
    }

    /**
     * Removes all stored pages.
     */
    removeAllPages() {
        sessionStorage.removeItem(this._storageKey);
    }

    /**
     * Returns the page, before the current page, as the link to go back.
     *
     * @return {string} The previous page URL visited by the user, or
     *                  an empty string if there was no (or only one) stored page(s).
     */
    _getBackButtonURL() {
        var pages = this._getStoredPages();
        if (pages.length <= 1) return '';

        var secondLastIndex = pages.length - 2;
        var secondLastPage = pages[secondLastIndex];

        var lastIndex = pages.length - 1;
        var lastPage = pages[lastIndex];

        var currentPage = location.href;
        var previousPage = currentPage === lastPage ? secondLastPage : lastPage;
        return previousPage;
    }

    /**
     * Get the stored pages.
     *
     * @return {array} An array of stored pages, or an empty array it's not present.
     */
    _getStoredPages() {
        var pages = sessionStorage.getItem(this._storageKey);
        if (pages !== null && pages !== '') {
            return pages.split(',');
        }
        return [];
    }

    /**
     * Store the given pages array.
     *
     * param {array} pages The array of pages to be stored.
     */
    _setToStore(pages) {
        sessionStorage.setItem(this._storageKey, pages.toString());
    }
}

module.exports = Backtrack;
