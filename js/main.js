// window.location.hash = "";
// $("header")[0].scrollIntoView();
window.onload = main;

function main() {
   $(".loading").addClass("none");
   $(".fadeIn").removeClass("invisible");

   animateOnObserve(typingAnimation, $("h3, #memories"));
   animateOnObserve(progressAnimation, $(".progress-list"));

   typingAnimation($("h1")[0]);
   setTimeout(() => {
      typingAnimation($("h2")[0], 6);
   }, 3500);

   lightBoxInit();
}

function animateOnObserve(animationfx, elements) {
   const observer = new IntersectionObserver(
      function (entries) {
         if (entries[0].isIntersecting === true) {
            animationfx(entries[0].target);
            observer.unobserve(entries[0].target);
         }
      },
      { threshold: [1] }
   );
   for (let element of elements) observer.observe(element);
}

function typingAnimation(element, speed = 3) {
   const visibleSpan = element.firstElementChild;
   const invisibleSpan = visibleSpan.nextElementSibling;
   let cursor_blink = 0;
   let delay = 0;

   $(visibleSpan).addClass("pos-relative cursor");

   (function typeCharacter() {
      const invisibleText = invisibleSpan.textContent;
      visibleSpan.textContent += invisibleText[0];
      invisibleSpan.textContent = invisibleText.slice(1);
      if (!invisibleText[1]) {
         cursorBlink();
         return;
      }
      delay =
         invisibleText[1] === " "
            ? 500
            : 75 + Math.random() * (350 - speed * 50);
      setTimeout(typeCharacter, delay);
   })();

   function cursorBlink() {
      visibleSpan.classList.toggle("cursor");
      cursor_blink++;
      if (cursor_blink === 7) return;
      setTimeout(() => cursorBlink(), 300);
   }
}

function progressAnimation(element) {
   for (let progress of $(".progress__fill"))
      progress.style = `width:${progress.dataset.value}%`;
}

function lightBoxInit() {
   if (window.innerWidth > 850) {
      $(".img-container").popupLightbox({
         width: 800,
         height: 600
      });
   } else if (window.innerWidth > 499) {
      $(".img-container").popupLightbox({
         width: 400,
         height: 300
      });
   }
}