import $ from 'jquery';

class Search {
  // 1. describe and create/init an object
    constructor() {
    this.resultsDiv = $("#search-overlay__results")
    this.openBtn = $(".js-search-trigger");
    this.closeBtn = $(".search-overlay__close");
    this.searchOverlay = $(".search-overlay");
    this.searchField = $("#search-term");
    this.events();
    this.isOverlayOpen = false;
    this.isSpinnerVisible = false;
    this.prevValue;
    this.typingTimer;
    }

  // 2. events
    events() {
        this.openBtn.on("click", this.openOverlay.bind(this));
        this.closeBtn.on("click", this.closeOverlay.bind(this));
        $(document).on("keydown", this.keyPressDispatcher.bind(this));
        this.searchField.on("keyup", this.typingLogic.bind(this));
    }

  // 3. methods
    // allows display results after some time(2s)
    typingLogic() {
        if(this.searchField.val() != this.prevValue) {
            clearTimeout(this.typingTimer);

            if(this.searchField.val()) {
                // displays spinner before results
                if(!this.isSpinnerVisible) {
                    this.resultsDiv.html('<div class="spinner-loader"</div>');
                    this.isSpinnerVisible = true;
                }
                this.typingTimer = setTimeout(this.getResults.bind(this), 2000);
            } else {
                this.resultsDiv.html('');
                this.isSpinnerVisible = false;
            }
        }
        this.prevValue = this.searchField.val();
    }

    // displays results
    getResults() {
        this.resultsDiv.html("Imagine");
        this.isSpinnerVisible = false;
    }

    // check which key was pressed
    keyPressDispatcher(e) {
        if(e.keyCode == 83 && !this.isOverlayOpen) {
            this.openOverlay();
        }
        if(e.keyCode == 27 && this.isOverlayOpen) {
            this.closeOverlay();
        }
    }

    // opens search
    openOverlay() {
        this.searchOverlay.addClass("search-overlay--active");
        $("body").addClass("body-no-scroll");
        this.isOverlayOpen = true;
    }

    // close search
    closeOverlay() {
        this.searchOverlay.removeClass("search-overlay--active");
        $("body").removeClass("body-no-scroll");
        this.isOverlayOpen = false;
    }
}

export default Search
