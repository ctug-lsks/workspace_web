function load_employees_from_external_xml(dataset_path, body_employee) {
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
            render_xml2html_table(xmlDoc, body_employee, select_department);
            render_xml2html_select(xmlDoc, select_department);
        }
        else
        {
            //handling when data can't be loaded
        }
    }

}
function render_xml2html_table(xmlDoc, body_employee, select_department) {
    //load an array of employee XML tags
    var employee_tags = xmlDoc.getElementsByTagName("employee");
    var selected_department = select_department.value;
    body_employee.innerHTML = "";
    for (i = 0; i < employee_tags.length; i++) {
        //get tag at i position
        employee_tag = employee_tags[i];
        id = employee_tag.getAttribute("id");
        title = employee_tag.getAttribute("title");
        name_tag = employee_tag.getElementsByTagName("name")[0];
        phone_tag = employee_tag.getElementsByTagName("phone")[0];
        id = id.toString();
        title = title.toString();
        name = name_tag.childNodes[0].nodeValue;
        phone = phone_tag.childNodes[0].nodeValue;

        if (selected_department == "All" || selected_department == employee_tag.getAttribute("title")) {

            tr = document.createElement("tr");
            td_id = document.createElement("td");
            td_name = document.createElement("td");
            td_phone = document.createElement("td");

            td_id.innerHTML = id;
            td_name.innerHTML = name;
            td_phone.innerHTML = phone;

            tr.appendChild(td_id);
            tr.appendChild(td_name);
            tr.appendChild(td_phone);

            body_employee.appendChild(tr);
        }
    }
}

function render_xml2html_select(xmlDoc, select_department) {
    //load an array of employee XML tags
    var employee_tags = xmlDoc.getElementsByTagName("employee");
    for (i = 0; i < employee_tags.length; i++) {
        //get tag at i position
        employee_tag = employee_tags[i];
        department = employee_tag.getAttribute("title");

        for (j = 0; j < select_department.options.length; j++) {
            if (select_department.options[j].value == department) {
                break;
            }
        }
        if (j < select_department.options.length) {
            continue;
        }
        department = department.toString();

        opt = document.createElement("option");
        opt.value = department;
        opt.innerHTML = department;

        select_department.appendChild(opt);
    }
}