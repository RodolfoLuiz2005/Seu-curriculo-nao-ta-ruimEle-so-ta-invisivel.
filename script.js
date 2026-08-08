/* Scroll reveal + micro-interações — JS puro, sem dependências */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var items = document.querySelectorAll(".reveal");

  if (reduced || !("IntersectionObserver" in window)) {
    Array.prototype.forEach.call(items, function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var delay = parseInt(entry.target.getAttribute("data-delay") || "0", 10);
        setTimeout(function () {
          entry.target.classList.add("is-visible");
        }, delay);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );

  Array.prototype.forEach.call(items, function (el) {
    observer.observe(el);
  });

  /* Transição sutil de fundo entre os 3 blocos temáticos */
  var blocks = document.querySelectorAll(".block");
  var blockObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        entry.target.classList.toggle("block--in", entry.intersectionRatio > 0.55);
      });
    },
    { threshold: [0, 0.55, 1] }
  );
  Array.prototype.forEach.call(blocks, function (el) {
    blockObserver.observe(el);
  });
})();
