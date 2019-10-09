/**
* Backtrack 2.0.0
* Copyright © Zaim Ramlan
*/

class Backtrack {
    /**
     * Initializes an instance of Backtrack.
     */
    constructor() {}

    /**
     * Pushes the current page into the history stack.
     */
    pushPage() {
        pages_from_storage = sessionStorage.getItem('backtracks');
        if(pages_from_storage == null) {
            pages = new Array();
        } else {
            pages = pages_from_storage.split(',');
        }
        /*
        * if the last page in the history stack is not the same as the current page,
        * only then we push it into the history stack.
        *
        * this condition can happen upon page reload/refresh:
        * 0. Load page A the first time and it goes into the history stack
        * 1. Now page A is in history stack
        * 2. Reload/refresh Page A
        * 3. Checks if Page A is in the stack (it is!)
        * 4. Ignores it, otherwise we will have a consequent duplicate entry
        */
        if(pages[pages.length-1] != location.href) pages.push(location.href);
        sessionStorage.setItem('backtracks', pages.toString());
    }

    /**
     * Removes the last page in the history stack.
     */
    popPage() {
        pages_from_storage = sessionStorage.getItem('backtracks');
        /*
        * pages are stored as "domain.com/page_a, domain.com/page_b, ..."
        * split the string and put it as an array into `pages`
        */
        pages = pages_from_storage.split(',');
        // remove the page from the history stack
        pages.pop();
        sessionStorage.setItem('backtracks', pages.toString());
    }

    /**
     * Returns the back link.
     */
    backLink() {
        pages_from_storage = sessionStorage.getItem('backtracks');
        /*
        * pages are stored as "domain.com/page_a, domain.com/page_b, ..."
        * split the string and put it as an array into `pages`
        */
        pages = pages_from_storage.split(',');
        /*
        * the back link will be the page before the current page.
        *
        * actually, it should be `pages.length - 1`, but since
        * JS array starts from [0], we need to to minus an extra 1
        */
        back_link = pages[pages.length - 2];
        return back_link;
    }

    /*
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
        // finds the back button with id `back_link_id`
        back_button = document.getElementById(back_link_id);
        // if there IS a back button of id `back_link_id`, only then set the back link href
        if (back_button != null) back_button.href = this.back_link();
    }

    reset() {
        sessionStorage.removeItem('backtracks');
    }
}
