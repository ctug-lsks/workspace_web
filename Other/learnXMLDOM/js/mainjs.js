function load_customers_from_external_json(dataset_path, body_customer) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", dataset_path, true);
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            //handling when loading data successfully
            var jsonData = JSON.parse(xhr.responseText);
            // responseText not responseXML because the data is in JSON format, not XML format
            render_json2html(jsonData, body_customer);
        }
        else {
            //handling when data can't be loaded
            console.log("Error loading JSON file");
        }
    }
}

function load_customers_from_external_xml(dataset_path, body_customer) {
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
            // responseXML not responseText because the data is in XML format, not JSON format
            render_xml2html(xmlDoc, body_customer);
        }
        else
        {
            //handling when data can't be loaded
        }
    }

}

function load_customers_from_xml(dataset, body_customer) {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(dataset, "text/xml");
    render_xml2html(xmlDoc, body_customer);
}

function render_xml2html(xmlDoc, body_customer) {
    //load an array of customer XML tags
    var customer_tags = xmlDoc.getElementsByTagName("customer");
    for (i = 0; i < customer_tags.length; i++) {
        //get tag at i position
        customer_tag = customer_tags[i];
        id_tag = customer_tag.getElementsByTagName("id")[0];
        name_tag = customer_tag.getElementsByTagName("name")[0];
        age_tag = customer_tag.getElementsByTagName("age")[0];
        city_tag = customer_tag.getElementsByTagName("city")[0];
        customer_id = id_tag.childNodes[0].nodeValue;
        customer_name = name_tag.childNodes[0].nodeValue;
        customer_age = age_tag.childNodes[0].nodeValue;
        customer_city = city_tag.childNodes[0].nodeValue;

        tr = document.createElement("tr");
        td_id = document.createElement("td");
        td_name = document.createElement("td");
        td_age = document.createElement("td");
        td_city = document.createElement("td");

        td_id.innerHTML = customer_id;
        td_name.innerHTML = customer_name;
        td_age.innerHTML = customer_age;
        td_city.innerHTML = customer_city;

        tr.appendChild(td_id);
        tr.appendChild(td_name);
        tr.appendChild(td_age);
        tr.appendChild(td_city);

        body_customer.appendChild(tr);
    }
}

function render_json2html(jsonData, body_customer) {
    //load an array of customer objects
    var customers = jsonData.customers;
    for (i = 0; i < customers.length; i++) {
        //get customer object at i position
        customer = customers[i];
        customer_id = customer.id;
        customer_name = customer.name;
        customer_age = customer.age;
        customer_city = customer.city;

        tr = document.createElement("tr");
        td_id = document.createElement("td");
        td_name = document.createElement("td");
        td_age = document.createElement("td");
        td_city = document.createElement("td");

        td_id.innerHTML = customer_id;
        td_name.innerHTML = customer_name;
        td_age.innerHTML = customer_age;
        td_city.innerHTML = customer_city;

        tr.appendChild(td_id);
        tr.appendChild(td_name);
        tr.appendChild(td_age);
        tr.appendChild(td_city);

        body_customer.appendChild(tr);
    }
}

