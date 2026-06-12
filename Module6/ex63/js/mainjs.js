function create_birthday_control(birthday_day, birthday_month, birthday_year){
    for (i=1; i<=31; i++)
    {
        birthday_day.innerHTML += "<option value='"+i+"'>"+i+"</option>";
    }
    for (i=1; i<=12; i++)                {
        birthday_month.innerHTML += "<option value='"+i+"'>"+i+"</option>";
    }
    for (i=1970; i<=2020; i++)                {
        birthday_year.innerHTML += "<option value='"+i+"'>"+i+"</option>";
    }
}

function loadMembers(members, table_body){
    for (i=0; i<members.length; i++){
        member = members[i];
        member_name = member.name;
        member_email = member.email;
        member_gender = member.gender;
        member_birthday = member.birthday;
        member_hobbies = member.hobbies.join(", ");
        member_colors = member.colors.join(", ");
        // create tr element
        tr = document.createElement("tr");
        // create 6 td element
        td_name = document.createElement("td");
        td_email = document.createElement("td");
        td_gender = document.createElement("td");
        td_birthday = document.createElement("td");
        td_hobbies = document.createElement("td");
        td_colors = document.createElement("td");
        //assign value for td
        td_name.innerHTML = member_name;
        td_email.innerHTML = member_email;
        td_gender.innerHTML = member_gender;
        td_birthday.innerHTML = member_birthday;
        td_hobbies.innerHTML = member_hobbies;
        td_colors.innerHTML = member_colors;
        // append td elements to tr element
        tr.appendChild(td_name);
        tr.appendChild(td_email);
        tr.appendChild(td_gender);
        tr.appendChild(td_birthday);
        tr.appendChild(td_hobbies);
        tr.appendChild(td_colors);
        // append tr element to table body
        table_body.appendChild(tr);
    }
}
