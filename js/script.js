'use strict'

window.addEventListener('load',windowLoad);

function windowLoad(){

    // додаємо клас loaded до body, коли сторінка завантажена
    document.body.classList.add('loaded')
     // якщо є блок з класом main-slider
    if(document.querySelector('.main-slider')){
        // ініціалізуємо Swiper слайдер
        new Swiper ('.main-slider',{
            speed: 4000,
            effect: "fade",
            autoplay:{
                delay:2000
            },
            //Пагінація  налаштування
            pagination: {
                el: '.bullets__items',
                type: 'bullets',
                clickable:true
              },
        });
    }

//Popular topics 

    document.addEventListener("click",documentActions);
        function documentActions(e) {
            // Визначаємо елемент, на який клікнули
            const targetElement = e.target;
            //tabs
            // перевіряємо, чи натиснута кнопка з табом
            if (targetElement.closest('.nav-popular__item') ){
                // знаходимо батьківський елемент натиснутої кнопки
                const tabNavItem = targetElement.closest('.nav-popular__item');
                // перевіряємо, чи кнопка не має класу "active"
                if(!tabNavItem.classList.contains('active')) {
                    // знаходимо кнопку з активним табом і забираємо з неї клас "active"
                    const activeTabNavItem = document.querySelector('.nav-popular__item.active');
                    activeTabNavItem.classList.remove('active');
                    // додаємо клас "active" до натиснутої кнопки
                    tabNavItem.classList.add('active');
                    // знаходимо елементи з контентом табів
                    const tabItems = document.querySelectorAll('.popular__tab');
                    // знаходимо елемент з активним табом і забираємо з нього клас "active"
                    const activeTabItem = document.querySelector('.popular__tab.active');

                    // додаємо клас "active" до елементу з контентом натиснутого табу, використовуючи його індекс
                   // знаходимо індекс натиснутої кнопки серед всіх кнопок і відповідно до цього індексу знаходимо
                  // елемент з контентом табу, щоб додати до нього клас "active"
                    activeTabItem.classList.remove('active');
                    tabItems[getIndex(tabNavItem)].classList.add('active');
                }
            }
            //up
            // Якщо елемент, на який клікнули, є дочірнім елементом .footer__up
            if (targetElement.closest('.footer__up')){
                // Прокручуємо
                window.scrollTo({
                    top:0,
                    behavior:'smooth'
                });
                  // Відміняємо стандартну поведінку посилання
                e.preventDefault();
            }
        }
        function getIndex(el){
            return Array.from(el.parentNode.children).indexOf(el);
        }
}

//watcher
const items = document.querySelectorAll(`[data-item]`);
const options = {
    threshold:0.2
}

const callback = (entries)=>{
    entries.forEach(entry => {
        if (entry.isIntersecting){
            entry.target.classList.add('active');
        }
    });
}

const observer = new IntersectionObserver(callback,options);

items.forEach(item=> {
    observer.observe(item);
});
