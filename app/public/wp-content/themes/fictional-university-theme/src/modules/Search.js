import $ from 'jquery';

class Search {
  // 1. describe and create/init an object
    constructor() {
    this.addSearchHTML();
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
                // allows display results after some time(0.75s)
                this.typingTimer = setTimeout(this.getResults.bind(this), 750);
            } else {
                this.resultsDiv.html('');
                this.isSpinnerVisible = false;
            }
        }
        this.prevValue = this.searchField.val();
    }

    // displays results
    getResults() {
        $.getJSON(universityData.root_url + '/wp-json/university/v1/search?term=' + this.searchField.val(), (results) => {
            this.resultsDiv.html(`
                <div class="row">
                <div class="one-third">
                    <h2 class="search-overlay__section-title">General Info</h2>
                        ${results.generalInfo.length ? '<ul class="link=list min-list">' : '<p>No generalinfo matches that search.</p>' }
                            ${results.generalInfo.map(item => `<li><a href="${item.permalink}">${item.title}</a> ${item.postType == 'post' ? `by ${item.authorName}` : ''}</li>`).join('')}
                        ${results.generalInfo.length ? '</ul>' : ''}
                    </div>
                    <div class="one-third">

                        <h2 class="search-overlay__section-title">Programs</h2>
                            ${results.programs.length ? '<ul class="link-list min-list">' : `<p>No programs match that search. <a href="${universityData.root_url}/programs">View all programs</a></p>`}
                                ${results.programs.map(item => `<li><a href="${item.permalink}">${item.title}</a></li>`).join("")}
                            ${results.programs.length ? "</ul>" : ""}

                        <h2 class="search-overlay__section-title">Professors</h2>
                        ${results.professors.length ? '<ul class="professor-cards">' : `<p>No professors match that search.</p>`}
                            ${results.professors.map(item => `
                                <li class="professor-card__list-item">
                                    <a class="professor-card" href="${item.permalink}">
                                        <img class="professor-card__image" src="${item.image}" alt="">
                                        <span class="professor-card__name">${item.title}</span>
                                    </a>
                                </li>
                            `).join("")}
                        ${results.professors.length ? "</ul>" : ""}
                    </div>

                    <div class="one-third">
                        <h2 class="search-overlay__section-title">Events</h2>
                        ${results.events.length ? '<ul class="professor-cards">' : `<p>No events match that search.  <a href="${universityData.root_url}/events">View all events</a></p>`}
                            ${results.events.map(item => `
                            <div class="event-summary">
                                <a class="event-summary__date t-center" href="${item.permalink}">
                                    <span class="event-summary__month">${item.month}</span>
                                    <span class="event-summary__day">${item.day}</span>
                                </a>
                                <div class="event-summary__content">
                                    <h5 class="event-summary__title headline headline--tiny"><a href="${item.permalink}">${item.title}</a></h5>
                                    <p>${item.description}<a href="${item.permalink}" class="nu gray">Learn more</a></p>
                                </div>
                            </div>
                            `).join("")}
                    </div>
                </div>
            `);
            this.isSpinnerVisible = false;
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
        this.searchField.val('');
        setTimeout(() => this.searchField.focus(), 301);
        this.isOverlayOpen = true;
    }

    // close search
    closeOverlay() {
        this.searchOverlay.removeClass("search-overlay--active");
        $("body").removeClass("body-no-scroll");
        this.isOverlayOpen = false;
    }

    // SEARCH LAYOUT
    addSearchHTML() {
        $("body").append(`
            <div class="search-overlay">
                <div class="search-overlay__top">
                    <div class="container">
                        <i class="fa fa-search search-overlay__icon" aria-hidden=""true></i>
                        <input type="text" class="search-term" placeholder="What are you looking for" id="search-term">
                        <i class="fa fa-window-close search-overlay__close" aria-hidden=""true></i>
                    </div>
                </div>
                <div class="container">
                    <div id="search-overlay__results"></div>
                </div>
            </div>
        `);
    }
}

export default Search
