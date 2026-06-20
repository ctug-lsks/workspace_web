var students = [];
var sortDirections = {};

function load_students_from_external_xml(dataset_path, body_student) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", dataset_path, true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(xhr.responseText, "text/xml");
            render_xml2html(xmlDoc, body_student);
        }
    };
}

function getNodeText(parent, tagName) {
    var tag = parent.getElementsByTagName(tagName)[0];
    return tag.childNodes[0].nodeValue;
}
function render_xml2html(xmlDoc, body_student) {
    students = [];
    
    var student_tags = xmlDoc.getElementsByTagName("student");

    for (var i = 0; i < student_tags.length; i++) {
        students[i]={
            id: getNodeText(student_tags[i], "id"),
            name: getNodeText(student_tags[i], "name"),
            birthday: getNodeText(student_tags[i], "birthday"),
            gender: getNodeText(student_tags[i], "gender")
        };
    }
    renderStudents(body_student);
    // showStudentDetail(students[0]);
}

function renderStudents(body_student) {
    body_student.innerHTML = "";

    for (var i = 0; i < students.length; i++) {
        var student = students[i];
        var tr = document.createElement("tr");
        tr.className = "student-row";
        tr.dataset.index = String(i);

        var td_id = document.createElement("td");
        var td_name = document.createElement("td");
        var td_birthday = document.createElement("td");
        var td_gender = document.createElement("td");

        td_id.innerHTML = student.id;
        td_name.innerHTML = student.name;
        td_birthday.innerHTML = student.birthday;
        td_gender.innerHTML = student.gender;

        tr.appendChild(td_id);
        tr.appendChild(td_name);
        tr.appendChild(td_birthday);
        tr.appendChild(td_gender);

        showStudentDetail(tr, student);
        
        body_student.appendChild(tr);
    }
}

function showStudentDetail(row, student) {
    row.addEventListener("click", function () {
        if (!student) return;
        var detailUrl = "student_detail.html"
            + "?id=" + encodeURIComponent(student.id)
            + "&name=" + encodeURIComponent(student.name)
            + "&birthday=" + encodeURIComponent(student.birthday)
            + "&gender=" + encodeURIComponent(student.gender);
        window.location.href = detailUrl;
    });
}

function normalizeForSort(value, columnIndex) {
    console.log(columnIndex);
    if (columnIndex === 0) {
        return parseInt(value, 10);
    }

    if (columnIndex === 2) {
        var parts = value.split("/");
        //Cách làm dùng date: return new Date(parts[2], parseInt(parts[1], 10) - 1, parts[0])//.getTime();
        return parseInt(parts[2], 10) * 10000 + parseInt(parts[1], 10) * 100 + parseInt(parts[0], 10);
    }

    return value.toLowerCase();
}

function sortTable(columnIndex) {
    var direction = sortDirections[columnIndex] === "asc" ? "desc" : "asc";
    console.log("Sorting by column " + columnIndex + " in " + direction + " order");
    sortDirections[columnIndex] = direction;

    students.sort(function (a, b) {
        var valueA = normalizeForSort(getStudentValue(a, columnIndex), columnIndex);
        var valueB = normalizeForSort(getStudentValue(b, columnIndex), columnIndex);
        console.log("Comparing" + valueA + "and" + valueB + ": " + (valueA < valueB ? "A < B" : "A >= B")    );
        if (valueA < valueB) return direction === "asc" ? -1 : 1;
        if (valueA > valueB) return direction === "asc" ? 1 : -1;
        return 0;
    });

    var body_student = document.getElementById("bodystudent");
    renderStudents(body_student);
}

function getStudentValue(student, columnIndex) {
    if (columnIndex === 0) return student.id;
    if (columnIndex === 1) return student.name;
    if (columnIndex === 2) return student.birthday;
    return student.gender;
}
