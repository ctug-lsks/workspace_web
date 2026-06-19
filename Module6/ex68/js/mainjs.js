function load_cds_from_external_xml(dataset_path, body_cd) {
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
            render_xml2html(xmlDoc, bodycd);
        }
        else
        {
            //handling when data can't be loaded
        }
    }

}
function render_xml2html(xmlDoc, bodycd) {
    //load an array of cd XML tags
    var cd_tags = xmlDoc.getElementsByTagName("CD");
    for (i = 0; i < cd_tags.length; i++) {
        //get tag at i position
        cd_tag = cd_tags[i];
        artist_tag = cd_tag.getElementsByTagName("ARTIST")[0];
        title_tag = cd_tag.getElementsByTagName("TITLE")[0];
        artist = artist_tag.childNodes[0].nodeValue;
        title = title_tag.childNodes[0].nodeValue;

        tr = document.createElement("tr");
        td_artist = document.createElement("td");
        td_title = document.createElement("td");

        td_artist.innerHTML = artist;
        td_title.innerHTML = title;

        tr.appendChild(td_artist);
        tr.appendChild(td_title);

        bodycd.appendChild(tr);
    }
}