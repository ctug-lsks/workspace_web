function load_categories_from_external_xml(dataset_path, body_category) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET",dataset_path,true);
    xhr.send();
    xhr.onreadystatechange=function()
    {
        if (xhr.readyState==4 && xhr.status==200)
        {
            //handling when loading data successfully
            //XML DOM & HTML DOM sẽ xử lý, AJAX kết thúc nhiệm kỳ
            var xmlDoc = xhr.responseXML;
            render_xml2html(xmlDoc, body_category);
        }
        else
        {
            //handling when data can't be loaded
        }
    }

}

function load_categories_from_xml(dataset, body_category) {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(dataset, "text/xml");
    render_xml2html(xmlDoc, body_category);
}

function render_xml2html(xmlDoc, body_category) {
    //load an array of category XML tags
    var category_tags = xmlDoc.getElementsByTagName("category");
    for (i = 0; i < category_tags.length; i++) {
        //get tag at i position
        category_tag = category_tags[i];
        ref_tag = category_tag.getElementsByTagName("cate_ref")[0];
        name_tag = category_tag.getElementsByTagName("cate_name")[0];
        img_tag = category_tag.getElementsByTagName("cate_img")[0];
        category_ref = ref_tag.childNodes[0].nodeValue;
        category_name = name_tag.childNodes[0].nodeValue;
        category_img = img_tag.childNodes[0].nodeValue;

        tr = document.createElement("tr");
        td_ref = document.createElement("td");
        td_name = document.createElement("td");
        td_img = document.createElement("td");

        td_ref.innerHTML = category_ref;
        td_name.innerHTML = category_name;
        td_img.innerHTML = category_img;

        tr.appendChild(td_ref);
        tr.appendChild(td_name);
        tr.appendChild(td_img);

        body_category.appendChild(tr);
    }
}

