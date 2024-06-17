document.addEventListener("DOMContentLoaded", function () {
    // back top
    var backTop = document.querySelector("#back-top");

    // show sub menu
    var dropdownSubMenu = document.querySelectorAll(".js__dropDown");
    var subMenu = document.querySelector(".js__clickShowMenuMb");

    // sticky header
    var stickyHeaderPC = document.querySelector(".js__stickyHeader");

    // search mb
    var searchMbs = document.querySelectorAll(".js__searchMb");

    // show popup image
    var oneSlides = document.querySelectorAll(".js__swiperItemsContainer");

    // navbar mb
    var navbarMb = document.querySelector(".js__navbarMenuMb");

    // slide
    var autoSlides = document.querySelectorAll(".js__swiperAutoContainer");

    // tabs
    var tabs = document.querySelectorAll(".js__tabItem");
    var panes = document.querySelectorAll(".js__tabPane");

    const app = {
        // su ly cac su kien
        handleEvent: function () {
            const _this = this;

            // when click back top
            if (backTop) {
                backTop.onclick = function () {
                    document.body.scrollTop = 0;
                    document.documentElement.scrollTop = 0;
                };
            }

            // show sub menu
            if (subMenu) {
                var closeSubMenu = document.querySelector(".js__closeSubMenu");
                var overlay = document.querySelector(".js__overlay");
                var parentBox = subMenu.parentElement;

                subMenu.onclick = function () {
                    this.parentElement.classList.add("active");
                    document.querySelector("body").style.overflow = "hidden";
                };
                closeSubMenu.onclick = function () {
                    parentBox.classList.remove("active");
                    document.querySelector("body").style.overflow = "auto";
                };
                overlay.onclick = function () {
                    parentBox.classList.remove("active");
                    document.querySelector("body").style.overflow = "auto";
                };
            }

            // dropdown sub menu
            dropdownSubMenu &&
                dropdownSubMenu.forEach((item) => {
                    var parent = item.parentElement;
                    var nextEle = parent.querySelector(".js__listSubMenu");
                    item.onclick = function () {
                        parent.classList.toggle("active");
                        if (nextEle.style.maxHeight) {
                            nextEle.style.maxHeight = null;
                        } else {
                            nextEle.style.maxHeight =
                                nextEle.scrollHeight + "px";
                        }
                    };
                });

            // search mb
            if (searchMbs) {
                searchMbs.forEach((searchMb) => {
                    var closeSearchMb =
                        document.querySelector(".js__closeSearchMb");
                    var formSearchMb =
                        document.querySelector(".js__formSearchMb");
                    searchMb.onclick = function () {
                        formSearchMb.classList.add("active");
                    };
                    closeSearchMb.onclick = function () {
                        formSearchMb.classList.remove("active");
                    };
                });
            }

            // navbar mb
            if (navbarMb) {
                const container = navbarMb.querySelector(".js__navbarMb");
                const scrollBtn = navbarMb.querySelector(".js__navbarIcon");

                let scrollAmount = 0;
                let scrollPosition = 0;

                scrollBtn.addEventListener("click", function () {
                    const scrollDistance = 100;
                    scrollAmount = scrollPosition + scrollDistance;
                    scrollAmount = Math.min(
                        scrollAmount,
                        container.scrollWidth - container.clientWidth
                    );
                    container.scrollTo({
                        left: scrollAmount,
                        behavior: "smooth",
                    });
                    scrollPosition = scrollAmount;
                });
            }

            // tabs
            if (tabs || panes) {
                tabs.forEach((tab, index) => {
                    var pane = panes[index];
                    tab.onclick = function () {
                        document
                            .querySelector(".tab-item.active")
                            .classList.remove("active");
                        document
                            .querySelector(".tab-pane.active")
                            .classList.remove("active");

                        this.classList.add("active");
                        pane.classList.add("active");
                    };
                });
            }
        },
        // slider one item
        sliderOneItems: function () {
            oneSlides.forEach((item) => {
                var pagi = item.querySelector(".swiper-pagination");
                var slider = item.querySelector(".js__swiperItems");
                new Swiper(slider, {
                    slidesPerView: 1,
                    spaceBetween: 30,
                    slidesPerGroup: 1,
                    autoHeight: true,
                    effect: "fade",
                    pagination: {
                        el: pagi,
                        clickable: true,
                    },
                });
            });
        },
        // slider auto
        sliderAutoItems: function () {
            autoSlides.forEach((item) => {
                var slider = item.querySelector(".js__swiperAuto");
                var next = item.querySelector(".swiper-button-next");
                var prev = item.querySelector(".swiper-button-prev");
                new Swiper(slider, {
                    slidesPerView: "auto",
                    spaceBetween: 0,
                    navigation: {
                        nextEl: next || null,
                        prevEl: prev || null,
                    },
                });
            });
        },

        // slider nhà đầu tư
        sliderInvestos: function () {
            var swiper5 = new Swiper(".mySwiperInvestor", {
                slidesPerView: 3,
                grid: {
                    rows: 2,
                    fill: "rows",
                },
                navigation: {
                    nextEl: ".swiper-button-next3",
                    prevEl: ".swiper-button-prev3",
                },
                pagination: {
                    el: ".swiper-pagination3",
                    clickable: true,
                },
                hideOnClick: true,
                breakpoints: {
                    768: {
                        slidesPerView: 4,
                    },
                    1024: {
                        slidesPerView: 6,
                    },
                },
            });
        },
        // scroll top
        scrollFunc: function () {
            if (backTop) {
                if (
                    document.body.scrollTop > 300 ||
                    document.documentElement.scrollTop > 300
                ) {
                    backTop.style.opacity = 1;
                    backTop.style.visibility = "visible";
                } else {
                    backTop.style.opacity = 0;
                    backTop.style.visibility = "hidden";
                }
            }

            if (stickyHeaderPC) {
                const isSticky = scrollY > 500;
                if (isSticky !== this.isSticky) {
                    stickyHeaderPC.classList.toggle("sticky", isSticky);
                    this.isSticky = isSticky;
                }
            }

            if (navbarMb) {
                const isStickyMb = scrollY > 100;
                if (isStickyMb !== this.isStickyMb) {
                    navbarMb.classList.toggle("sticky", isStickyMb);
                    this.isStickyMb = isStickyMb;
                }
            }
        },

        // window scroll
        windowScroll: function () {
            var _this = this;
            window.onscroll = function () {
                // scroll top
                _this.scrollFunc();
            };
        },
        // khoi tao function start
        start: function () {
            // su ly cac su kien
            this.handleEvent();
            // slider one item
            this.sliderOneItems();
            // slider auto
            this.sliderAutoItems();
            // slider nhà đầu tư
            this.sliderInvestos();
            // window scroll
            this.windowScroll();
        },
    };

    app.start();
});
