"use strict"
// scrolling
// let scrollPosition = 0;
const lastPosition = [0, 80];
window.onload = function () {
  changesOnScroll();
}
window.onscroll = function () {
  changesOnScroll()
  // console.log(lastPosition[0])



};

const $header = document.querySelector('.nt-header');
const $totop = document.getElementById('toTop');

function changesOnScroll() {
  // console.log(document.body.scrollTop)
  if (window.innerWidth < 768 && document.documentElement.scrollTop !== 0) {
    if (lastPosition[0] > document.documentElement.scrollTop) {
      $header.classList.remove('goUp')
      $header.classList.add('scroll', 'goDown')
      $totop.classList.add('show')
      lastPosition[0] = document.documentElement.scrollTop
    } else {
      lastPosition[0] = document.documentElement.scrollTop
      $header.classList.add('goUp')
      setTimeout(function () {
        $header.classList.remove('scroll', 'goDown')
        $totop.classList.remove('show')
      }, 100)

    }

  } else {
    if (document.documentElement.scrollTop > 80) {

      $header.classList.add('scroll')
      $totop.classList.add('show')
    } else {
      $header.classList.remove('scroll')
      $totop.classList.remove('show')
      lastPosition[0] = document.documentElement.scrollTop
    }
  }

  // if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
  //   $header.classList.add('scroll')
  //   $totop.classList.add('show')
  // } else {
  //   $header.classList.remove('scroll')
  //   $totop.classList.remove('show')
  // }
}

// Burger menu animation

const $burgertoggler = document.getElementById('burgertoggler');

$burgertoggler.addEventListener('click', function () {
  const isMenuOpen = JSON.parse($burgertoggler.getAttribute('aria-expanded'))
  if (isMenuOpen) {
    $burgertoggler.classList.remove('activated');
  } else {
    $burgertoggler.classList.add('activated');
  }

})



// Close nav on click
const $thenav = document.getElementById('navbarSupportedContentnavbarSupportedContent');
const navlinksAll = document.querySelectorAll('.navbar-nav .nav-link');
// console.log(navlinksAll)


for (let navlink of navlinksAll) {
  navlink.addEventListener('click', function () {
    // alert('as')
    $burgertoggler.classList.remove('activated');

  })
}

// recent work slider
// Show only on mobile & tabled

var swiper = new Swiper('.swiper-container', {
  slidesPerView: 3,
  spaceBetween: 20,

  breakpoints: {
    640: {
      // freeMode: true,
      slidesPerView: 1,
      spaceBetween: 0,
      
    },
    768: {
      // freeMode: true,
      slidesPerView: 2,
      spaceBetween: 40,
    }
  }
});



// const rworkswiper = new Swiper('.rwork-swiper', {
//   slidesPerView: 3,
//   spaceBetween: 10,
//   initialSlide: 1,
//   centeredSlides: true,
//   slideToClickedSlide: false,
//   navigation: {
//     nextEl: '.rwork-button-next',
//     prevEl: '.rwork-button-prev',
//   },
//   pagination: {
//     el: '.rwork-swiper-pagination',
//     clickable: true,
//   },
//   breakpoints: {
//     // when window width is <= 640px
//     768: {
//       slidesPerView: 1,
//       initialSlide: 0
//     }
//   }
// });

/*
==========================================
============ Contact Form ================
==========================================
*/

// Styling the form labels
const inputs = document.querySelectorAll('#contact .form-control');
const $contactFormHome = document.getElementById('contact');
const $cf = document.getElementById('mainContactForm');

let timeout = null;
// const $darkener = document.
if ($cf) {
  for (let inpt of inputs) {
    let $thelabel = document.querySelector(`[for="${inpt.id}"]`);
    // Adding the animation for the darker bg and the moving label
    inpt.addEventListener('focus', function (e) {
      clearTimeout(timeout)
      if (window.innerWidth > 760) {
        $contactFormHome.classList.add('darkener')
      }
      $thelabel.classList.add('activated')

    })
    // Removing the animation for the darker bg and the moving label
    inpt.addEventListener('blur', function (e) {
      // Need to clear the timeout to jump from one input to another without interruptions
      clearTimeout(timeout)
      timeout = setTimeout(function () {
        // 2 timeouts, one for the animation of the darkener fading out, the other is actually removing the class
        // exists to make the transition less jumpy
        if (window.innerWidth > 760) {

          $contactFormHome.classList.add('hidedarkener')
        }

        setTimeout(function () {
          $contactFormHome.classList.remove('darkener', 'hidedarkener')
        }, 200)

      }, 200);
      // if there is something written in the input - dont move the label down
      // if removed - label with cover the text written in input if not empty
      if (!inpt.value) {
        $thelabel.classList.remove('activated')
      }

    })
  }
}


// On submit - show the alert
if ($cf) {
  $cf.addEventListener('submit', function (e) {
    e.preventDefault()
    $cf.classList.add('nt-preloader');
    const whichPage = $cf.classList.contains('landingContactForm') ? 'landing' : 'contact';
    fetch('https://n2ten.com/send.php', {
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          'Accept': 'application/json; odata=verbose'
        },
        body: `contactName=${$cf.contactName.value}&contactEmail=${$cf.contactEmail.value}&contactMessage=${$cf.contactMessage.value}&whichpage=${whichPage}`

      })
      // .then(response => response.text())
      // .then((response) => {console.log(response);alert('test')})
      .then(response => response.json())
      .then((response) => {
        // const alertdiv = document.createElement("div");
        if (!response.error) {
          showingAlert('success', 'We received your form submission and will get back to you shortly!');
          $cf.contactName.value = '';
          $cf.contactEmail.value = '';
          $cf.contactMessage.value = '';

        } else {
          showingAlert('error', 'Something went wrong. Message was not sent')
        }
        // $contactFormHome.insertBefore(alertdiv, document.querySelector('.form-group'))
        $cf.classList.remove('nt-preloader');
      })



  })
}


//btn-quote
/*
==========================================
============    Quote Button    ================
==========================================
*/

// const $quoteBtn = document.querySelector('.btn-quote')

// $quoteBtn.addEventListener('click', (e) => {
//   e.preventDefault()
//   showingAlert('quote', '')
// })


/*
==========================================
============    Alerts    ================
==========================================
*/
const $ntAlert = document.querySelector('.nt-alert')

function hidingAlert() {

  // e.preventDefault();

  $ntAlert.classList.add('fadeOutAlert')

  setTimeout(function () {
    $ntAlert.style = "display:none";
    $ntAlert.classList.remove('fadeInAlert', 'fadeOutAlert')
  }, 300)

}

function showingAlert(type, text) {
  const alertHTML = [];
  if (type !== 'project') {
    alertHTML.push(`
  <div class="nt-alert__dialog">
    <div class="alert__dialog-text">
  `);

    if (type == 'success') {

      alertHTML.push(`
        <i class="alert__icon fa fa-check text-success"></i>
        <h3>Success!</h3>
        <p>${text ? text : ''}</p>
         <a href="#" id="closeDialog" onclick="hidingAlert();return false" class="btn btn-secondary">Close Dialog</a>
        `)

    } else if (type == 'quote') {
      alertHTML.push(`
        <h3 class="mb-20">Let's Talk</h3>
        <p class="mb-10">Please customize your message, or write one <a href="#"> manually</a></p>
        <hr class="bg-white" style="opacity:0.3">
        <form class="mt-30 nt-quote-request nt-quote-form text-white text-left">
          <p>Hello there!</p>
          <p>My name is <input required class="nt-quote-input quoteName" type="text" name="quoteName" placeholder="John Doe">, and I am interested in your 
          
            <div class="labelgroup">
            <label for="quoteWebService" class="selected">Web Design</label>
            <input class="d-none" id="quoteWebService" type="checkbox" value="Web Design">
            </div>
            <div class="labelgroup">
            <label for="quoteGraphicService">Graphic Design</label>
            <input class="d-none" id="quoteGraphicService" type="checkbox" value="Graphic Design">
            </div>
            <div class="labelgroup">
            <label for="quoteVideoService">Video</label>
            <input class="d-none" id="quoteVideoService" type="checkbox" value="Video">
            </div>
       
          services! </p> 
          
          <p>Can you give me a quote for <input class="nt-quote-input" type="text" placeholder="custom designed website">?</p> 
          <p>My email is <input class="nt-quote-input" type="email" placeholder="jdoe@something.com" name="quoteEmail">, and my phone number is <input class="nt-quote-input" type="phone" placeholder="(613)..." name="quotePhone"> </p>
          <p>Thank you! :) </p>
          </form>
        <div class="form-group mt-30 col-md-12 d-flex justify-content-center align-items-center pl-0 pr-0">
					<button type="submit" style='padding: 16px 46px' class="d-block nt-submit btn btn-main"><i class="fa fa-envelope"></i>
						<strong>Submit</strong>
          </button>
          <span class="d-block text-white ml-10">...or </span>
           <a href="#" id="closeDialog" onclick="hidingAlert();return false" style="text-decoration:underline" class="text-white d-block ml-10">Close Dialog</a>
				</div>
        `)
      // alertHTML.push(`
      //   <h3>Let's Talk</h3>
      //   <form id="homeQuoteForm" method="post" action="send.php" class="row">
      // 	<div class="form-group col-md-6">
      // 		<label for="quoteName">Your Name *</label>
      // 		<input type="name" required class="form-control" name="quoteName" id="quoteName">
      // 	</div>
      // 	<div class="form-group col-md-6">
      // 		<label for="quoteEmail">Your Email *</label>
      // 		<input type="email" required class="form-control" name="quoteEmail" id="quoteEmail">
      // 	</div>
      // 	<div class="form-group col-md-12">
      // 		<label for="quoteMessage">Your Message</label>
      // 		<!-- <input type="email" class="form-control" id="quoteemail"> -->
      // 		<textarea name="quoteMessage" id="quoteMessage" class="form-control" cols="5"
      // 			rows="2"></textarea>
      // 	</div>
      // 	<div class="form-group col-md-12 d-flex justify-content-center align-items-center pl-0 pr-0">
      // 		<button type="submit" style='padding: 16px 46px' class="d-block nt-submit btn btn-main"><i class="fa fa-envelope"></i>
      // 			<strong>Submit</strong>
      //     </button>
      //     <span class="d-block text-white ml-10">...or </span>
      //     <a href="#" id="closeDialog" onclick="hidingAlert();return false" style="text-decoration:underline" class="text-white d-block ml-10">Close Dialog</a>
      // 	</div>
      // </form>
      //   `)
    } else {

      alertHTML.push(`
        <i class="alert__icon fas fa-exclamation-circle text-danger"></i>
        <h3>Error!</h3>
        <p>Something Went Wrong</p>
         <a href="#" id="closeDialog" onclick="hidingAlert();return false" class="btn btn-secondary">Close Dialog</a>
        `)

    }

    alertHTML.push(`
    </div>
  </div>
  `);


  } else {

    alertHTML.push(`
  <div class="nt-alert__dialog nt-alert__project" >
    <div class="alert__project-text">
  `);

    alertHTML.push(`
      <a href="#" id="closeDialog" onclick="hidingAlert();return false" class="btn btn-secondary">Close Dialog</a>
    </div>
  </div>
  `);

  }
  $ntAlert.innerHTML = alertHTML.join('');
  $ntAlert.style = "display:flex";
  $ntAlert.classList.add('fadeInAlert');

}


// Recent Work Modals

// const $laptopFrontAll = document.querySelectorAll('.nt-laptop__front');

// for (let laptopFront of $laptopFrontAll) {
//   laptopFront.addEventListener('click', function () {
//     if (laptopFront.closest('.swiper-slide-active')) {
//       showingAlert('project', 'Project')
//     }
//   })
// }