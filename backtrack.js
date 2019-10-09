/**
* Backtrack 2.0.0
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
        this._backButtonId = backButtonId;
        this._storageKey = 'backtracks';
    }

    /**
     * Sets the back_link href.
     *
     * assumptions:
     * 1) Back link is a `<a href=""></a>`
     * 2) Back link has an id of `back_link_id`
     *
     * i.e.
     * <a id="back_button" href="">Back</a>
     */
    setBackLink() {
        var backButton = document.getElementById(this._backButtonId);
        if (backButton != null) backButton.href = this._getBackButtonURL();
    }

    /**
     * Pushes the current page into the history stack if it's not already in.
     */
    pushPage() {
        var storedPages = this._getStoredPages();
        var isStoredPagesExist = storedPages != null;
        var pages = isStoredPagesExist ? storedPages.split(',') : new Array();

        var lastStoredIndex = pages.length - 1;
        var lastStoredPage = pages[lastStoredIndex];
        var currentPage = location.href;

        if (lastStoredPage != currentPage) {
            pages.push(currentPage);
            this._setToStore(pages);
        }
    }

    /**
     * Removes the last page in the history stack.
     */
    popPage() {
        var storedPages = this._getStoredPages();
        var pages = storedPages.split(',');
        pages.pop();
        this._setToStore(pages)
    }

    /**
     * Removes all stored pages.
     */
    clearPages() {
        sessionStorage.removeItem(this._storageKey);
    }

    /**
     * Returns the page, before the current page, as the link to go back.
     *
     * @return {string} The second last stored page's URL for the back button to link to.
     */
    _getBackButtonURL() {
        var storedPages = this._getStoredPages();
        var pages = storedPages.split(',');

        var secondLastIndex = pages.length - 2
        var secondLastPage = pages[secondLastIndex];
        return secondLastPage;
    }

    /**
     * Get the stored pages.
     *
     * @return {array} An array of stored pages.
     */
    _getStoredPages() {
        return sessionStorage.getItem(this._storageKey);
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
