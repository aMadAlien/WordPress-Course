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
    typingLogic() {
        if(this.searchField.val() != this.prevValue) {
            clearTimeout(this.typingTimer);
            
            if(this.searchField.val()) {
                // displays spinner before results
                if(!this.isSpinnerVisible) {
                    this.resultsDiv.html('<div class="spinner-loader"</div>');
                    this.isSpinnerVisible = true;
                }
                // allows display results after some time(1.5s)
                this.typingTimer = setTimeout(this.getResults.bind(this), 1500);
            } else {
                this.resultsDiv.html('');
                this.isSpinnerVisible = false;
            }
        }
        this.prevValue = this.searchField.val();
    }

    // displays results
    getResults() {
        $.getJSON('http://fictional-university.local/wp-json/wp/v2/posts?search=' + this.searchField.val(), posts => {
            this.resultsDiv.html(`
            <h2 class="search-overlay__section-title">General Info</h2>
            <ul class="link=list min-list">
            ${posts.map(item => `<li><a href="${item.link}">${item.title.rendered}</a></li>`).join('')}
            </ul>`);
        });
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
