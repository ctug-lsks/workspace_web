// Biến toàn cục cho phân trang
var currentPage = 1;
var itemsPerPage = 50;

function loadProducts(products, product_body){
    // Xóa dữ liệu cũ
    product_body.innerHTML = "";
    
    // Tính toán vị trí bắt đầu và kết thúc
    var startIndex = (currentPage - 1) * itemsPerPage;
    var endIndex = startIndex + itemsPerPage;
    
    // Lấy danh sách sản phẩm của trang hiện tại
    var productsToShow = products.slice(startIndex, endIndex);
    
    // Hiển thị sản phẩm
    for(var i = 0; i < productsToShow.length; i++){
        product = productsToShow[i];
        product_id = product.id;
        product_name = product.name;
        // create tr element
        tr = document.createElement("tr");
        // create 3 td element
        td_id = document.createElement("td");
        td_name = document.createElement("td");
        td_img = document.createElement("td")
        //create img
        img = document.createElement("img")
        img.setAttribute("src", "images/ic_remove.png")
        img.setAttribute("onclick", "delete_product(this)")
        //assign value for td
        td_id.innerHTML = product_id;
        td_name.innerHTML = product_name;
        td_img.appendChild(img)
        // append td(s) into tr
        tr.appendChild(td_id);
        tr.appendChild(td_name);
        tr.appendChild(td_img)
        // append tr to product_body
        product_body.appendChild(tr);
    }
    
    // Cập nhật pagination
    renderPagination(products.length);
}

function delete_product(img_element){
    if(confirm("Are you sure to delete this product?")){
        img_element.parentElement.parentElement.remove();
    }
}

// Hàm render pagination
function renderPagination(totalItems){
    var totalPages = Math.ceil(totalItems / itemsPerPage);
    var paginationDiv = document.getElementById("pagination");
    paginationDiv.innerHTML = "";
    
    // Nút Previous
    var prevBtn = document.createElement("button");
    prevBtn.innerHTML = "← Previous";
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = function(){
        if(currentPage > 1){
            currentPage--;
            loadProducts(products, document.getElementById("product_body"));
        }
    };
    paginationDiv.appendChild(prevBtn);
    
    // Thêm khoảng trắng
    paginationDiv.appendChild(document.createTextNode(" "));
    
    // Hiển thị các nút trang
    for(var i = 1; i <= totalPages; i++){
        var pageBtn = document.createElement("button");
        pageBtn.innerHTML = i;
        pageBtn.style.marginRight = "5px";
        if(i === currentPage){
            pageBtn.style.backgroundColor = "#4CAF50";
            pageBtn.style.color = "white";
            pageBtn.style.fontWeight = "bold";
        }
        pageBtn.onclick = (function(pageNum){
            return function(){
                currentPage = pageNum;
                loadProducts(products, document.getElementById("product_body"));
            }
        })(i);
        paginationDiv.appendChild(pageBtn);
    }
    
    // Thêm khoảng trắng
    paginationDiv.appendChild(document.createTextNode(" "));
    
    // Nút Next
    var nextBtn = document.createElement("button");
    nextBtn.innerHTML = "Next →";
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = function(){
        if(currentPage < totalPages){
            currentPage++;
            loadProducts(products, document.getElementById("product_body"));
        }
    };
    paginationDiv.appendChild(nextBtn);
    
    // Hiển thị thông tin trang
    var pageInfo = document.createElement("div");
    pageInfo.style.marginTop = "10px";
    pageInfo.style.textAlign = "center";
    pageInfo.innerHTML = "Trang " + currentPage + " / " + totalPages + " (Tổng: " + totalItems + " sản phẩm)";
    paginationDiv.appendChild(pageInfo);
}
