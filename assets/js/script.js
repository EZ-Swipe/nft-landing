$(function() {
   $("[data-slider]").slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      infinite: false,
      arrows: true,
      responsive: [
         {
            breakpoint: 1200,
            settings: {
               slidesToShow: 2 
            }
         },
         {
            breakpoint: 992,
            settings: {
               slidesToShow: 1
            }
         },
      ]
   })

   $('.slick-arrow').html("");

   $("[data-sliderCollection]").slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      infinite: false,
      responsive: [
         {
            breakpoint: 992,
            settings: {
               slidesToShow: 2
            }
         },
         {
            breakpoint: 768,
            settings: {
               slidesToShow: 1
            }
         },
      ]
   })

   // Collapse categories
   $('.view-all-btn--categories').click(function (event) {
      event.preventDefault();

      const target = $(this).data('collapse');

      $(target).slideToggle();

      if ($(target).is(':visible')) {
         $(this).text('Hide');
      } else {
         $(this).text('View All');
      }
   });
})

// Scroll

const scroll = document.getElementById('scroll');

scroll.addEventListener('click', () => {
   document.querySelector('.platforms').scrollIntoView({behavior: 'smooth'});
});

// -----------

function addClassOnResize() {
   const categoriesItems = document.querySelectorAll('.categories__item');
   const windowWidth = window.innerWidth;
   categoriesItems.forEach((item, index) => {
      if (windowWidth <= 1200 && index == 2) {
         item.classList.add('categories__item-hidden');
      } else if (windowWidth > 1200 && index == 2) {
         item.classList.remove('categories__item-hidden');
      }
   })
}

window.addEventListener("load", addClassOnResize);
window.addEventListener("resize", addClassOnResize);

// Countdown

let date = localStorage.getItem('timerDate');

// Если значение `date` не было сохранено ранее, устанавливаем его на начальную дату
if (!date) {
   date = new Date('Jul 27 2023 20:57:00');
} else {
   date = new Date(date);
}

function formatTime(value) {
   return value < 10 ? `0${value}` : `${value}`;
}

function counts() {
   const timerArr = document.getElementsByClassName("auctions__item-timer");
   Array.from(timerArr).forEach((element) => {
      let now = new Date();
      gap = date - now;

      // Если разница меньше нуля, добавляем одну минуту
      if (gap < 0) {
         // Обновляем дату, чтобы начать новый цикл отсчета с 03:00:00
         date = new Date(now.getTime() + 3 * 60 * 60 * 1000); // Добавляем 3 часа

         // Пересчитываем разницу времени для новой даты
         gap = date - now;

         // Сохраняем новое значение `date` в `localStorage`
         localStorage.setItem('timerDate', date);
      }

      let hours = Math.floor((gap / 1000 / 60 / 60) % 24);
      let minutes = Math.floor((gap / 1000 / 60) % 60);
      let seconds = Math.floor((gap / 1000) % 60);

      // Форматируем значения времени с ведущими нулями
      hours = formatTime(hours);
      minutes = formatTime(minutes);
      seconds = formatTime(seconds);

      element.innerHTML = `${hours}:${minutes}:${seconds}`;
   });
}

counts();
setInterval(counts, 1000);


new WOW({
   mobile: false
}).init();
