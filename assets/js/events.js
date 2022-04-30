function slider(){
    var sticks = document.querySelectorAll('.stick');
    var btn_prev = document.querySelector('.btn-prev');
    var btn_next = document.querySelector('.btn-next')
    var slider_list = document.querySelector('.slider-list')
    var transform = [
        'translateX(0)',
        'translateX(-20%)',
        'translateX(-40%)',
        'translateX(-60%)'
    ]
    count = 0;

    sticks.forEach(function(stick, index) {
        stick.addEventListener('click', function(e){
            document.querySelector('.stick.stick--active').classList.remove('stick--active');
            this.classList.add('stick--active');
            slider_list.style.transform = transform[index];
            count = index;
        });
    })
    function nextSlider(){
        count++;
        if(count > 3){
            count = 0;
        }
        document.querySelector('.stick.stick--active').classList.remove('stick--active');
        sticks[count].classList.add('stick--active');
        slider_list.style.transform = transform[count];
    }
    function prevSlider(){
        count--;
        if(count < 0){
            count = 3;
        }
        document.querySelector('.stick.stick--active').classList.remove('stick--active');
        sticks[count].classList.add('stick--active');
        slider_list.style.transform = transform[count];
    }
    btn_next.addEventListener("click", nextSlider);
    btn_prev.addEventListener("click", prevSlider);
    setInterval(nextSlider, 3000);
}
slider();
// Slider Zing Choice
var imageno = 1;
displaying(imageno);
function nextimg(n){
    displaying(imageno += n)
}
function displaying(n){
    var i ;
    var listChoice = document.getElementsByClassName('zingChoice-list');
    if(n > listChoice.length){
        return imageno;
    }
    if(n < 1){
        imageno = listChoice.length;
    }

    for(i=0; i<listChoice.length; i++){
        listChoice[i].style.display = 'none';
    }

    listChoice[imageno - 1].style.display = 'block';
}
function sliderBoxlist (){
    var boxlist_slider = document.querySelector('.slider-top100');
var items = document.querySelectorAll('.list-box--slider').length;
var prev = document.querySelector('.btn-switch .prev');
var next = document.querySelector('.btn-switch .next');
var couse = 1;

var prevSlider = function(){
    if(couse > 1){
        couse = couse - 2;
        boxlist_slider.style.marginLeft = '-' + (couse * 100) + "%";
        couse++;
    }else if(couse = 1){
        couse = items - 1;
        boxlist_slider.style.marginLeft = '-' + (couse * 100) + "%";
        couse++;
    }
};

var nextSlider = function(){
    if(couse < items){
        boxlist_slider.style.marginLeft = '-' + (couse * 100) + "%";
        couse++;
    }else if(couse = items){
        boxlist_slider.style.marginLeft = "0%";
        couse = 1;
    }
};

prev.addEventListener('click',function(){
    prevSlider();
})

next.addEventListener('click',function(){
    nextSlider();
})
};
sliderBoxlist();

// tabs
var tabs = document.querySelectorAll('.tab-item');
var panes = document.querySelectorAll('.tab-pane');

    tabs.forEach(function(item,index){
        item.addEventListener('click',function(){

            document.querySelector('.tab-item.active').classList.remove('active');
            this.classList.add('active');

            document.querySelector('.tab-pane.active').classList.remove('active');
            panes[index].classList.add('active');
        })
    })