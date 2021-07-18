window.onload = () => {
    const qs = (e) => document.querySelector(e);
    const qsa = (e) => document.querySelectorAll(e);

    var slideReleaseDirection = 'right';

    function sortByResize(){
        window.addEventListener('resize', () => {
            let image = qsa('.black-friday-banner-image')
            image.forEach((ele, key) => {
                ele.classList.add('removeTransition');
            });
            sortSlides(image);
        });
    }

    function sortSlides(image){
            image.forEach((ele, key) => {
            ele.style.marginLeft = ele.offsetWidth * key + 'px';

            if(image.length-1 === key){
                    image.forEach((ele, key) => {
                    ele.style.opacity = 1;
                });
            }
        });
    }

    function moveByTouch(){
        
        let touchStart;
        let touchEnd;
        let direction ='';
        let directionArray = [];
        
        qs('.banner-slide-picture-container').addEventListener('touchstart', mouseDown);
        qs('.banner-slide-picture-container').addEventListener('mousedown', mouseDown);
        function mouseDown(e){
            touchStart = e.clientX || e.touches[0].clientX;
            
            directionArray[0] = touchStart;
        }
        
        document.addEventListener('touchmove', mouseMove);
        qs('.banner-slide-picture-container').addEventListener('mousemove', mouseMove);
        function mouseMove(event){
            touchEnd = event.clientX || event.touches[0].clientX;
            
            directionArray[1] = touchEnd;
            if(directionArray[0] < directionArray[1]){
                direction = 'right';
            }else{
                direction = 'left';
            }
        }

        window.addEventListener('touchend', mouseUp);   
        qs('.banner-slide-picture-container').addEventListener('mouseup', mouseUp);   
        function mouseUp(){
            moveSlide(direction); 
            touchStart = '';
            touchEnd = '';
            direction = '';
        }
    }


    function validateSlide(){
        
        qsa('.arrow').forEach((el) => {
            
            el.addEventListener('click', () => {
                moveSlide(el.dataset.dir);
            })
        })

    }

    function moveSlide(direction){
        let image = qsa('.black-friday-banner-image');
                
                switch(direction){
                    case 'left':
                        image.forEach((element) => {
                            element.style.zIndex = '98'
                            element.classList.remove('removeTransition');
                            if(element.offsetLeft === 0){
                                element.style.zIndex = '0';
                                qs('.banner-slide-picture-container').appendChild(element);
                                image = qsa('.black-friday-banner-image'); 
                                
                            }
                        })
                    break;
                    case 'right':
                        image.forEach((element) => {
                            element.classList.remove('removeTransition');
                            element.style.zIndex = '98'
                            if(element.offsetLeft === 0){
                                image[image.length-1].style.zIndex = "0";
                                qs('.banner-slide-picture-container').insertBefore(image[image.length-1], image[0]);
                                image = qsa('.black-friday-banner-image'); 
                            }
                        })
                    break;
                }
                sortSlides(image);
                slideReleaseDirection = direction;
                automizeSlide(0);
    }
    

    async function automizeSlide(count = -1){
        let counter = count;
        let animationFrame;
        
        function animate(){
            animationFrame = requestAnimationFrame(()=>animate());
            counter++;
            if(counter > 500){
                counter = 0;
                moveSlide(slideReleaseDirection)
            }

            
        }
        if(counter === -1){
            animate();
        }
        
    }

    (function init(){
        
        sortSlides(qsa('.black-friday-banner-image'));
        sortByResize();
        validateSlide();
        automizeSlide();
        moveByTouch();
    })()

    
    window.onresize = () => {
        qs('body > section').style.marginTop = qs('#body-header').getBoundingClientRect().height + 'px';
    }
    qs('body > section').style.marginTop = qs('#body-header').getBoundingClientRect().height + 'px';

    

    /* =======================subscribe funcitons=================== */

    class User{
        constructor(name, email){
            this.name = name;
            this.email = email;
        }
    }

   function storeAtLocalStorage(e){
       e.preventDefault();
        let name = qs('.subscribe-input[type="text"]').value;
        let email = qs('.subscribe-input[type="email"]').value;
        let user = [];
        
        if(localStorage.getItem('subscribe-user')){
            let recordedUsers = JSON.parse(localStorage.getItem('subscribe-user'));
            recordedUsers.map((el, key) => {
                user.push(new User(el.name, el.email));
            });
        }
        user.push(new User(name, email));
        window.localStorage.setItem('subscribe-user', JSON.stringify(user));

        confirmToSend();
   }

   async function confirmToSend(){
       let data = await JSON.parse(localStorage.getItem('subscribe-user'));
        
       let confirmar = await confirm('Confirma o envio das seguintes informações: \n\n Nome: ' + data.name + ' \n E-mail: ' + data.email);

       (confirmar) ? alert('Parabéns! \n Você agora está inscrito!') : alert('Caso mude de idéia você pode voltar e realizar sua inscrição.');

       cleanFields();
   }

   function cleanFields(){
        let elements = qsa('.subscribe-input');
        elements.forEach((el) => {
            if(el.type !== 'submit') el.value = '';
        });
   }

   qs('form').addEventListener('submit', storeAtLocalStorage, true);

   

    

    /* ========================parallax============================ */

    window.addEventListener('scroll', () => {
        qs('#body-header').style.top = (window.scrollY * 0.6) * -1 + 'px';
        qs('.black-friday-banner-background').style.top = (window.scrollY * 0.2) * -1 + 'px';
    });
    
}