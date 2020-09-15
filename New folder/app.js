// ========== Index.html ==========
function login(){
    var id= document.getElementById("id")
    var pass= document.getElementById("pass")

    // input.style.textTransform = "Capitalize";
    if(id.value=="admin321"){
        if(pass.value=="admin321"){
            location.replace("main.html")}
        else{Swal.fire("Password Incorrect")}
    }
    else if(id.value==""){
    Swal.fire("Please Enter Username")
    }
    else{
    Swal.fire("ID Incorrect")
    }

}


// Avatar
function avatar(){
    sweetAlertSuccessMsg("You are LogIn as Admin")
}

// LogOut
function logOut(){
     location.replace("index.html")
}
function logOutQRScan(){
  location.replace('index.html')
}


// Hide Code During Inspect Mode
// $(document).bind("contextmenu",function(e) {  
// 	e.preventDefault(); 
 
// }); 




/*================ Sweet Alert Library ==============*/
// Sweet Alert Library Message
function sweetAlertSuccessMsg(msg){
    const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  Toast.fire({
    icon: 'success',
    title: msg
  })  
}

// Sweet Alert Library Timer
function sweetAlertTimer(timer){
let timerInterval
Swal.fire({
  title: timer,
  html: ' Wait a moment... ',
  timer: 3000,
  timerProgressBar: true,
  onBeforeOpen: () => {
    Swal.showLoading()
    timerInterval = setInterval(() => {
      const content = Swal.getContent()
      if (content) {
        const b = content.querySelector('b')
        if (b) {
            b.textContent = Swal.getTimerLeft()
        }
      }
    }, 100)
  },
  onClose: () => {

    clearInterval(timerInterval)
  }
}).then((result) => {
  /* Read more about handling dismissals below */
  if (result.dismiss === Swal.DismissReason.timer) {
    console.log('I was closed by the timer')
  }
})
}






// ============== FIREBASE STUDENT ADD ================
var a=document.getElementById("a")
var b=document.getElementById("b")
var c=document.getElementById("c")
var d=document.getElementById("d")

function adding(){ 
  
  if(a.value==""){
    Swal.fire("PLease Enter ID To Add")
  }
  else  if(c.value==""){
    Swal.fire("PLease Enter Name To Add")
  }        
  else if(d.value==""){
    Swal.fire("PLease Enter Contact To Add")
  }
  else if(b.value==""){
    Swal.fire("PLease Enter Email To Add")
  }
  else{ 
  firebase.database().ref("Database/"+a.value).set({
    Id: a.value,
    Name: b.value,
    Contact: c.value,
    Email: d.value
})
sweetAlertSuccessMsg("Add Successful")
// QR-Code Generation
document.getElementById("qr0").innerHTML=""
new QRCode(document.getElementById("qr0"), a.value); 

a.value=""
b.value=""
c.value=""
d.value=""
}
}


function search(){
  if(a.value==""){
    Swal.fire("PLease Enter ID To Search")
  }
  else{
  b.value=""
  c.value=""
  d.value=""    
  firebase.database().ref("Database/"+a.value).on("value",function(data){
    b.value= data.val().Name,
    c.value= data.val().Contact,
    d.value= data.val().Email
})
// if(b.value==true){
document.getElementById("qr0").innerHTML=""
sweetAlertSuccessMsg("Search Successful")
// }
}
}


function update(){
  if(a.value==""){
    Swal.fire("PLease Enter ID To Update Data")
  }
  else  if(c.value==""){
    Swal.fire("PLease Enter Name To Update")
  }        
  else if(d.value==""){
    Swal.fire("PLease Enter Contact To Update")
  }
  else if(b.value==""){
    Swal.fire("PLease Enter Email To Update")
  }
  else{
firebase.database().ref("Database/"+a.value).set({
    Id: a.value,
    Name: b.value,
    Contact: c.value,
    Email: d.value
})
sweetAlertSuccessMsg("Update Successful")
// QR-Code Generation
document.getElementById("qr0").innerHTML=""
new QRCode(document.getElementById("qr0"), a.value); 
a.value=""
b.value=""
c.value=""
d.value=""
}
}


function del(){
  if(a.value==""){
    Swal.fire("PLease Enter ID To Delete Data")
  }
  else{
  firebase.database().ref("Database/"+a.value).remove() 
  a.value=""
  document.getElementById("qr0").innerHTML=""
  sweetAlertSuccessMsg("Delete Successful")
a.value=""
b.value=""
c.value=""
d.value=""
  }
}





// ====================== Main.html   QR CODE =============================

var scanner = new Instascan.Scanner({ video: document.getElementById('preview'), scanPeriod: 5, mirror: false });
scanner.addListener('scan',function(content){
    // alert(content+"HELLO WORLD");
contents(content)

});
Instascan.Camera.getCameras().then(function (cameras){
    if(cameras.length>0){
        scanner.start(cameras[0]);
        $('[name="options"]').on('change',function(){
            if($(this).val()==1){
                if(cameras[0]!=""){
                    scanner.start(cameras[0]);
                }else{
                    alert('No Front camera found!');
                }
            }else if($(this).val()==2){
                if(cameras[1]!=""){
                    scanner.start(cameras[1]);
                }else{
                    alert('No Back camera found!');
                }
            }
        });
    }else{
        console.error('No cameras found.');
        alert('No cameras found.');
    }
}).catch(function(e){
    console.error(e);
    alert(e);
});


// Output
function contents(e){
    document.getElementById("qrscan").innerHTML=e;
    searching(document.getElementById("qrscan").innerHTML)
}


// Firebase Searcing  Inside QR-Code
function searching(e){
// Date
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
// Time
  var toda = new Date();
  var time = toda.getHours() + ":" + toda.getMinutes() + ":" + toda.getSeconds();

    var ID=0, Name=0, Contact=0, Email=0;
    firebase.database().ref("Database/"+e).on("value",function(data){

    ID= data.val().Id,
    Name= data.val().Name,
    Contact= data.val().Contact,
    Email= data.val().Email   

    // var li=document.createElement("li")
    // li.innerHTML= "<span id='head'>ID:</span>"+ID+" |  Name: "+Name+" |  Contact: "+Contact+" |  Email: "+Email+"  | Preasent "+"  | Date:  " +date+ "  | Time: "+time
    
    // var list= document.getElementById("list")
       // var presentData ="ID: "+ID+" |  Name: "+Name+" |  Contact: "+Contact+" |  Email: "+Email+"  | Preasent "+"  | Date:  " +date+ "  | Time: "+time
       // var li=document.createElement("li")
        // var text=document.createTextNode(presentData)
        // li.appendChild(text)
        // list.appendChild(li)
    // list.innerHTML+=li.innerHTML+"<br>"


    // console.log(Contact)
    // var a_Id= document.getElementById("a_Id")
    // var a_Name= document.getElementById("a_Name")
    // var a_Contact= document.getElementById("a_Contact")
    // var a_Email= document.getElementById("a_Email")
    // var a_Present= document.getElementById("a_Present")
    // var a_Date= document.getElementById("a_Date")
    // var a_Time= document.getElementById("a_Time")

    
    // console.log(a_Name.innerHTML)
// ---------------------------------------------------------

var a_Id= document.getElementById("a_Id")
var ca =document.createTextNode(ID)
a_Id.innerHTML+= ca.textContent +"<br>";

var a_Name= document.getElementById("a_Name")
var cb =document.createTextNode(Name)
a_Name.innerHTML+= cb.textContent +"<br>";

var a_Contact= document.getElementById("a_Contact")
var cc =document.createTextNode(Contact)
a_Contact.innerHTML+= cc.textContent +"<br>";

var a_Email= document.getElementById("a_Email")
var cd =document.createTextNode(Email)
a_Email.innerHTML+= cd.textContent +"<br>";

var a_Present= document.getElementById("a_Present")
var ce =document.createTextNode("Present")
a_Present.innerHTML+= ce.textContent +"<br>";

var a_Date= document.getElementById("a_Date")
var cf =document.createTextNode(date)
a_Date.innerHTML+= cf.textContent +"<br>";

var a_Time= document.getElementById("a_Time")
var cg =document.createTextNode(time)
a_Time.innerHTML+= cg.textContent +"<br>";



// ------------------------------------------

    // console.log(a_Contact)
    // console.log(a_Contact.innerHtml)
    // console.log(a_Contact.innerHtml+=Contact +" <br>")
    

    // a_Id.innerHTML+= ID +"<br>";
    // a_Name.innerHTML+= Name +"<br>";
    // a_Contact.innerHtml+= Contact +" <br>";
    // a_Email.innerHtml+= Email +"<br>"
    // a_Present.innerHtml+= "Present <br>"
    // a_Date.innerHtml+= date +"<br>"
    // a_Time.innerHtml+= time +"<br>"


})
}




function scanQRCode(){
let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=800,height=500,right=100,top=100`;
open('qr-code-scanner.html', params);
}

function studentAdd(){
  window.open('adddata.html');
}