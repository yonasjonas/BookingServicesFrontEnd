

if (window.location.pathname === '/product-category/pottery-classes/') {
    let interval = setInterval(() => {
        if (!!document.querySelector('.term-pottery-classes .header-wrapper h2')) {
            document.querySelector('.term-pottery-classes .header-wrapper h2').innerHTML = '<span><strong>Course types and dates are updated regularly\n\n</strong><br></span><span><strong>Please check back again if the course that you want is currently full</strong><br></span>'
            clearInterval(interval);
        }
    }, 1000);
}