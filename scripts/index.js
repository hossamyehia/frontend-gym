/**
 * Global Variables
 */
const nextBtn = document.querySelector('#next');
const prevBtn = document.querySelector('#previous');
////////////////////////////////////////////////////
const offers = document.querySelector('#offers');

const scrollCards = () => {

    const scrollValue = '432';

    window.addEventListener('load', ()=>{

        nextBtn.addEventListener('click',next);
        prevBtn.addEventListener('click',prev)
    })

    const next = (e) => {
        offers.scrollBy({
            left: scrollValue, 
            top:0,
            behavior:"smooth"
        });
    }

    const prev = (e) => {
        offers.scrollBy({
            left: -scrollValue, 
            top: 0,
            behavior: "smooth"
        });
    }
}

scrollCards();