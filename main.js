if(localStorage.getItem("firstTime")!="false"){
    document.getElementById("name").innerHTML=localStorage.getItem("username")
    document.getElementById("wlcmback").style.visibility="visible"
    document.getElementById("usernamein").style.visibility="hidden"
}
function sumbitUsername(){
    let randNum= Math.floor(Math.random()*1000)
    let uname = document.getElementById("username").value
    username=uname+"#"+randNum
    localStorage.setItem("username",username)
    localStorage.setItem("firstTime","false")
    window.location.replace("/wordle.html")
    
  }


