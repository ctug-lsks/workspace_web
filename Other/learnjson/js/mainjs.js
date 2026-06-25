function load_products_from_external_json(dataset_path, product_body) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", dataset_path, true);
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            //handling when loading data successfully
            var jsonData = JSON.parse(xhr.responseText);
            // responseText not responseXML because the data is in JSON format, not XML format
            render_json2html(jsonData, product_body);
        }
        else {
            //handling when data can't be loaded
            console.log("Error loading JSON file");
        }
    }
}

function render_json2html(jsonData, product_body) 
{
    alert("có " + jsonData.length + " danh mục");
    for (i=0; i<jsonData.length; i++) //DANH MỤC
    {
        cate=jsonData[i] //danh mục thứ i
        tr_cate=document.createElement("tr")
        tr_cate.setAttribute("style","background-color:yellow")
        td_cate=document.createElement("td")
        td_cate.setAttribute("colspan",4)
        td_cate.innerHTML=cate.CateID+"-"+cate.CateName
        tr_cate.appendChild(td_cate)
        product_body.appendChild(tr_cate)

        for (j=0; j<cate.products.length; j++) //duyệt sp của danh mục
        {
            product=cate.products[j] //lấy product thứ j trong cate i
            tr=document.createElement("tr")
            td_id=document.createElement("td")
            td_name=document.createElement("td")
            td_quantity=document.createElement("td")
            td_price=document.createElement("td")

            td_id.innerHTML=product.ProductID
            td_name.innerHTML=product.ProductName
            td_quantity.innerHTML=product.Quantity
            td_price.innerHTML=product.Price

            tr.appendChild(td_id)
            tr.appendChild(td_name)
            tr.appendChild(td_quantity)
            tr.appendChild(td_price)

            product_body.appendChild(tr)
        }
    }
}