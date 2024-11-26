var bookmarkName = document.getElementById("BookmarkName");
var websiteURL = document.getElementById("URL");
var name_popup = document.getElementById("name_popup");
var url_popup = document.getElementById("url_popup");

var urlReg = /^(https?:\/\/)(www\.)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})+(\/[^\s]*)?$/;
var nameReg= /^[^\s].{1,}[^\s]$/

var bookmarkList=[];

if(localStorage.getItem("bookmarkList")!== null)
{
    bookmarkList = JSON.parse(localStorage.getItem("bookmarkList"))
    display();
}   

function addBookmark()
{
    if(validateName(bookmarkName.value) && validateUrl(websiteURL.value))
    {
    var bookmark=
    {
        name : bookmarkName.value,
        url : websiteURL.value
    }
    bookmarkList.push(bookmark);
    localStorage.setItem("bookmarkList",JSON.stringify(bookmarkList));
    clearForm();
    display();
    toastMixin.fire({
        animation: true,
        title: 'bookmark added Successfully'
      });
    }
}

function deleteBookmark(index)
{
    Swal.fire({
        title: "Are you sure?",
        text: "bookmark will be deleted",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "bookmark has been deleted.",
            icon: "success"
          });
          bookmarkList.splice(index,1);
        localStorage.setItem("bookmarkList",JSON.stringify(bookmarkList));
        display();
        }
      });
    
}

function display()
{
    var box="";

    for(var i=0; i<bookmarkList.length; i++)
    {
        box+=
        `
            <div class="bookmark row text-center py-3 border-top border-1">
            <div class="col-3">
                <span>${i+1}</span>
            </div>
            <div class="col-3">
                <span>${bookmarkList[i].name}</span>
            </div>
            <div class="col-3">
               <a href="${bookmarkList[i].url}" target="_blank"> <button class="btn btn-success visit"><i class="fa-solid fa-eye me-2"></i><span>Visit</span></button></a>
            </div>
            <div class="col-3">
                <button onclick="deleteBookmark(${i})" class="btn btn-success delete"><i class="fa-solid fa-trash-can me-1"></i><span>Delete</span></button>
            </div>
        </div>
        `
    }
    document.getElementById("list").innerHTML=box;
}

function clearForm()
{
    bookmarkName.value=null;
    websiteURL.value=null;
    bookmarkName.classList.remove("is-valid");
    websiteURL.classList.remove("is-valid");
    bookmarkName.style.outline= "4px solid  #fec1606d";
    websiteURL.style.outline= "4px solid  #fec1606d";
}

function validateName(name)
{
    
    if(!nameReg.test(name))
    {
        displayNameModal();
          return false;
    }
    for(var i=0 ; i<bookmarkList.length;i++)
    {
        if(bookmarkList[i].name === name)
        {
            displayNameModal();
            return false;
        }
    }

    return true
}
function validateUrl(url)
{
    
    
    if(!urlReg.test(url))
    {
        displayUrlModal();
          return false;
        
    }
    return true;
}

function closeNameModal()
{
    name_popup.style.display="none";
}
function displayNameModal()
{
    name_popup.style.display = "block";
}

function closeUrlModal()
{
    url_popup.style.display="none";
}
function displayUrlModal()
{
    url_popup.style.display = "block";
}



document.addEventListener("click", function (e) {
    if (e.target.classList.contains("name_popup")) {
        closeNameModal();
    }
  });

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("url_popup")) {
        closeUrlModal();
    }
  });


  bookmarkName.addEventListener("input",function(e)
{
    if(nameReg.test(e.target.value))
    {
        e.target.classList.remove("is-invalid");
        e.target.classList.add("is-valid");
        e.target.style.outline= "4px solid rgba(0, 128, 0, 0.173)";
    }
    else
    {
        e.target.style.outline= "4px solid  rgba(255, 0, 0, 0.173)";
        e.target.classList.add("is-invalid");
    }
});

websiteURL.addEventListener("input",function(e)
{
    if(urlReg.test(e.target.value))
    {
        e.target.classList.remove("is-invalid");
        e.target.classList.add("is-valid");
        e.target.style.outline= "4px solid rgba(0, 128, 0, 0.173)";
    }
    else
    {
        e.target.style.outline= "4px solid  rgba(255, 0, 0, 0.173)";
        e.target.classList.add("is-invalid");
    }
});


var toastMixin = Swal.mixin({
    toast: true,
    icon: 'success',
    title: 'General Title',
    animation: false,
    position: 'top-right',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });
