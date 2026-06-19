function load_students_from_external_xml(dataset_path, body_student) {
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
            render_xml2html(xmlDoc, body_student);
        }
        else
        {
            //handling when data can't be loaded
        }
    }

}
function render_xml2html(xmlDoc, body_student) {
    //load an array of student XML tags
    var student_tags = xmlDoc.getElementsByTagName("student");
    for (i = 0; i < student_tags.length; i++) {
        //get tag at i position
        student_tag = student_tags[i];
        id_tag = student_tag.getElementsByTagName("id")[0];
        name_tag = student_tag.getElementsByTagName("name")[0];
        birthday_tag = student_tag.getElementsByTagName("birthday")[0];
        gender_tag = student_tag.getElementsByTagName("gender")[0];
        student_id = id_tag.childNodes[0].nodeValue;
        student_name = name_tag.childNodes[0].nodeValue;
        student_birthday = birthday_tag.childNodes[0].nodeValue;
        student_gender = gender_tag.childNodes[0].nodeValue;

        tr = document.createElement("tr");
        td_id = document.createElement("td");
        td_name = document.createElement("td");
        td_birthday = document.createElement("td");
        td_gender = document.createElement("td");

        td_id.innerHTML = student_id;
        td_name.innerHTML = student_name;
        td_birthday.innerHTML = student_birthday;
        td_gender.innerHTML = student_gender;

        tr.appendChild(td_id);
        tr.appendChild(td_name);
        tr.appendChild(td_birthday);
        tr.appendChild(td_gender);

        body_student.appendChild(tr);
    }
}

var sortDirections = [];

function sortTable(columnIndex) {
    var table = document.getElementById("student_table");
    if (!table) return;
    var tbody = table.tBodies[0];
    if (!tbody) return;

    // Copy rows into an array for sorting
    var rows = [];
    var i = 0;
    while (i < tbody.rows.length) {
        rows.push(tbody.rows[i]);
        i = i + 1;
    }

    // Toggle direction: if undefined assume ascending, then toggle
    var dir = sortDirections[columnIndex];
    if (!dir) dir = 'asc';
    else if (dir === 'asc') dir = 'desc';
    else dir = 'asc';
    sortDirections[columnIndex] = dir;
    var ascending = (dir === 'asc');

    function getCellValue(row, idx) {
        if (row.cells[idx]) return row.cells[idx].innerText.trim();
        return '';
    }

    function parseDateDMY(text) {
        var parts = text.split('/');
        if (parts.length !== 3) return null;
        var day = parseInt(parts[0], 10);
        var month = parseInt(parts[1], 10) - 1;
        var year = parseInt(parts[2], 10);
        if (isNaN(day) || isNaN(month) || isNaN(year)) return null;
        return new Date(year, month, day).getTime();
    }

    function isNumeric(s) {
        if (s === '') return false;
        return !isNaN(s);
    }

    // Simple bubble sort for clarity (uses for and while as requested)
    var n = rows.length;
    var swapped = true;
    while (swapped) {
        swapped = false;
        for (var j = 0; j < n - 1; j++) {
            var a = getCellValue(rows[j], columnIndex);
            var b = getCellValue(rows[j + 1], columnIndex);
            var compare = 0;

            // Try date compare (DD/MM/YYYY)
            var da = parseDateDMY(a);
            var db = parseDateDMY(b);
            if (da !== null && db !== null) {
                if (da < db) compare = -1; else if (da > db) compare = 1; else compare = 0;
            } else if (isNumeric(a) && isNumeric(b)) {
                // Numeric compare
                var na = parseFloat(a);
                var nb = parseFloat(b);
                if (na < nb) compare = -1; else if (na > nb) compare = 1; else compare = 0;
            } else {
                // String compare case-insensitive
                var sa = a.toLowerCase();
                var sb = b.toLowerCase();
                if (sa < sb) compare = -1; else if (sa > sb) compare = 1; else compare = 0;
            }

            if (!ascending) compare = -compare;

            if (compare > 0) {
                // swap in array
                var tmp = rows[j];
                rows[j] = rows[j + 1];
                rows[j + 1] = tmp;
                swapped = true;
            }
        }
        // optional small optimization
        n = n - 1;
    }

    // Append rows back to tbody in new order
    for (var k = 0; k < rows.length; k++) {
        tbody.appendChild(rows[k]);
    }
}

