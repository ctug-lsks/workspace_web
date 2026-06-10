function loadData(products, product_body){
    for (i=0; i<products.length; i++){
        tr="<tr><td>" + products[i].ProductID +
        "</td><td>" + products[i].ProductName +
        "</td><td>" + products[i].Price +
        "</td><td>" + '<img src="images/ic_remove.png" onclick="removeProduct(this)">' + "</td></tr>";
        product_body.innerHTML += tr;
    }
}
function removeProduct(image_element){
    if (confirm("Are you sure to remove this product?")){
        tr_element = image_element.parentElement.parentElement;
        tr_element.remove();
    }
}
