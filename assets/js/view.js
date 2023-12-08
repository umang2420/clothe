    let params=new URLSearchParams(window.location.search);
    let description = decodeURIComponent(params.get('description'));
    let imageUrl=decodeURIComponent(params.get('imageUrl'));
    let price=decodeURIComponent(params.get('price'));

    let productDetail = document.getElementById('productDetail');
    productDetail.innerHTML = `
        <h2>Product Detail</h2>
        <img src="${imageUrl}" width="150">
        <p>${description}</p>
        <p>$${price}</p>
    `;