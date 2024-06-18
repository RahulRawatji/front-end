document.addEventListener('DOMContentLoaded', function(){
    const menuOpen = document.querySelector('.menu-open');
    const menuClose = document.querySelector('.menu-close');

    let isOpen = false;
    const defaultEase = 'power4.inOut';
    gsap.registerPlugin();
    gsap.set('.menu-logo img',{y:50});
    gsap.set('.menu-link p',{y:40});
    gsap.set('.menu-sub-item p', {y:12});
    gsap.set(['#img-2,#img-3,#img-4'],{top: "150%"})

   
    menuOpen.addEventListener('click', function(){
        if(isOpen)return;
        openMenu();
    })
    
    menuClose.addEventListener('click', function(){
        console.log('close')
        if(!isOpen)return;
        closeMenu();
    })

    const openMenu = ()=>{
        gsap.to('.menu',{
            clipPath:"polygon(0% 100%, 100% 100%, 100% 0%,0% 0%)",
            pointerEvent:"all",
            duration:1.25,
            ease:defaultEase,
        })

        gsap.to('.hero',{
            top:'-50%',
            opacity:0,
            duration:1.25,
            ease:defaultEase,
        })

        gsap.to('nav',{
            zIndex:0,
            display:'none'
        })

        gsap.to('.menu-logo img',{
            y:0,
            duration:1,
            delay:0.75,
            ease:"power3.out"
        })

        gsap.to('.menu-link p',{
            y:0,
            duration:1,
            stagger:0.075,
            delay:1,
            ease:"power3.out"
        })

        gsap.to('.menu-sub-item p',{
            y:0,
            duration:0.075,
            stagger:0.05,
            delay:1,
            ease:"power3.out",
        })

        gsap.to(['#img-2,#img-3,#img-4,#img-5'],{
            top:'50%',
            duration:1.25,
            ease:defaultEase,
            stagger:0.1,
            delay:0.25,
            onComplete:()=>{
                gsap.set('.hero',{top:"50%"});
                isOpen=!isOpen;
            }
        })
    }

    const closeMenu = () =>{
        console.log('close')
        gsap.to('.menu', {
            clipPath:"polygon(0% 0%,100% 0%,100% 0%,0% 0%)",
            pointerEvent:'none',
            duration:1.25,
            ease:defaultEase,
        });

        gsap.to('.menu-items',{
            top:'-300px',
            opacity:0,
            duration:1.2,
            ease:defaultEase,
        })

        gsap.to('nav',{
            display:'flex',
            zIndex:4
        })

        gsap.to('.hero',{
            top:'0%',
            opacity:1,
            duration:1.25,
            ease:defaultEase,
            onComplete:()=>{
                gsap.to('.menu',{
                    clipPath:"polygon(0% 100%,100% 100%,100% 100%,0% 100%)",
                })

                gsap.set('.menu-logo img',{y:50}),
                gsap.set('.menu-link p',{y:40}),
                gsap.set('.menu-sub-item p',{y:12}),
                gsap.set('.menu-item',{opacity:1,top:"0px"}),
                gsap.set(['#img-2,#img-3,#img-4,#img-5'],{top:"150%"})

                isOpen=!isOpen
            }
        })
    }
})


document.addEventListener('DOMContentLoaded',function(){
    const menuImgContainer = document.querySelector('.menu-img');
    const images = document.querySelectorAll('.menu-img img');

    let mouse = {x:0, y:0};
    let cx = window.innerWidth /2;
    let cy = window.innerHeight /2;

    const scales = [0.81, 0,84,0.87,0.9]

    function update(){
        let dx = mouse.x -cx;
        let dy = mouse.y = cy;

        let tiltx = (dy/cy) *20;
        let tilty = (dx/dy) *20;

        gsap.to(menuImgContainer,{
            duration:2,
            transform:`rotate3d(${tiltx}, ${tilty}, 0, 15deg)`,
            ease: 'power3.out'
        })

        images.forEach((img,idx)=>{
            let parallaxX = -(dy * (idx+1)) /100;
            let parallaxY = - (dx * (idx+1)) /100;
            
            let transformStyles = `translate(calc(-50% + ${parallaxX}px), cald(-50% + ${parallaxY}px)) scale(${scales[idx]})`

            gsap.to(img,{
                duration:2,
                transform: transformStyles,
                ease:'power3.out'
            })
        })
    }
    document.body.addEventListener('mousemove', function (event){
        mouse.x = event.clientX;
        mouse.y = event.clientY;
        update()
    })
})