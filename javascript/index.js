document.onreadystatechange = function () {

  let search = document.getElementById("search")
  let results = document.getElementById("result"),
    res = document.getElementsByClassName("res"),
    p = document.createElement("p")


  search.oninput= function () {
    let searchV = (search.value).trim();
    if (searchV != '') {
      getJSON('javascript/city.json', function (err, result) {
        if (err != null) {
          alert('Something went wrong: ' + err);
        } else {
          let list = result.list;
          let options = {
            shouldSort: true,
            tokenize: true,
            threshold: 0,
            location: 0,
            distance: 500,
            maxPatternLength: 32,
            minMatchCharLength: 2,
            keys: [
              "city_rus",
            ]
          };
          let fuse = new Fuse(list, options); // "list" is the item array
          let searchResult = fuse.search(searchV);
          if (searchResult.length > 0) {
            results.innerHTML = "";
            console.log(results.children)
            results.append(document.createElement('ul'))

          }
          for (let i = 0; i < 5; i++) {

            results.firstChild.append(document.createElement('li'))
            results.firstChild.children[i].textContent =(searchResult[i].country_rus?searchResult[i].country_rus:searchResult[i].country_eng) + ' ' + searchResult[i].iata_code + ' '+ (searchResult[i].city_rus?searchResult[i].city_rus :searchResult[i].city_eng) + ' ' + (searchResult[i].name_rus?searchResult[i].name_rus :searchResult[i].name_eng)
          }


        }
      })
    }
  }

}

var getJSON = function (url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.onload = function () {
    var status = xhr.status;
    if (status == 200) {
      callback(null, xhr.response);
    } else {
      callback(status);
    }
  };
  xhr.send();
};
