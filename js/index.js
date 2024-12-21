var BookmarkNameInput = document.getElementById("BookmarkName");
var bookmarkURLInput = document.getElementById("bookmarkURL");

var Bookmarks = [];

// var urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/;

function validateForm(siteName, siteUrl) {
  var isValid = true;
  if (siteName.value.trim() === "") {
    siteName.classList.add("is-invalid");
    isValid = false;
  } else {
    siteName.classList.remove("is-invalid");
  }

  if (siteUrl.value.trim() === "") {
    siteUrl.classList.add("is-invalid");
    isValid = false;
  } else {
    siteUrl.classList.remove("is-invalid");
  }

  return isValid;
}

// function isValidUrl(url){
//   return urlPATTERN.test(url);
// }

function addBookmark() {
  if (!validateForm(BookmarkNameInput, bookmarkURLInput)) {
    return;
  }
  var Bookmark = {
    name: BookmarkNameInput.value,
    URL: bookmarkURLInput.value,
  };
  Bookmarks.push(Bookmark);
  localStorage.setItem("Bookmarks", JSON.stringify(Bookmarks));
  displayBookmarks();
  clearData();
}
function clearData() {
  BookmarkNameInput.value = "";
  bookmarkURLInput.value = "";
}

function displayBookmarks() {
  var table = "";
  for (var i = 0; i < Bookmarks.length; i++) {
    var bookmark = Bookmarks[i];
    table += `
      <tr>
                        <td>${i + 1}</td>
                      <td>${Bookmarks[i].name}</td>
                        <td>
                            <button class="visit-button" "visitSite('${
                              bookmark.url
                            }')">
                            <i class="fa-solid fa-eye pe-2" data-index="0"></i>
                                Visit
                            </button>
                        </td>
                        <td>
                            <button class="delete-button pe-2 data-index="0" onclick="deleteBookmark(${i})">
                                <i class="fa-solid fa-trash-can"></i>
                                Delete
                            </button>
                        </td>
                    </tr>


    `;
  }
  document.getElementById("table-content").innerHTML = table;
}
function deleteBookmark(index) {
  Bookmarks.splice(index, 1);
  localStorage.setItem("Bookmarks", JSON.stringify(Bookmarks));
  displayBookmarks();
}
function visitSite(url) {
  window.open(url, "_blank");
}

// siteNameInput.addEventListener("input", function () {
//   this.classList.remove("is-invalid");
// });
// siteUrlInput.addEventListener("input", function () {
//   this.classList.remove("is-invalid");
// });
displayBookmarks();
