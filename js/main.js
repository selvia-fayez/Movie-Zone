
let apiResponse;
let responseData;
let searchBar = document.getElementById("searchBar");
let getMovie = document.getElementById("getMovie");
let userName=document.getElementById('userName');
let userEmail=document.getElementById('userEmail');
let userPhone = document.getElementById('userPhone');
let userAge = document.getElementById('userAge');
let userPass = document.getElementById('userPass');
let userRepass = document.getElementById('userRepass');
let submitBtn =document.getElementById('submit');
let reset = document.getElementById('reset')
let divWidth = $('#sideContent').innerWidth();
$('#side').animate({left:`-${divWidth}`},1000);
let trendingMovies=[];
    $('#toggle').click(function(){
        if($('#side').css('left')=='0px')
        {
            $('#side').animate({left:`-${divWidth}`},1000);//يعني هو كده فاتح وهيقفل
            $('#icon').attr('class',"fa fa-align-justify")
        }
        else
        {
            $('#side').animate({left:`0px`},1000)//يعني هو كده قافل وهيفتح
            $('#icon').attr('class',"fa fa-align-justify fa-times")
        }
    })
// get trending movies..
async function getApiData(){
    apiResponse=await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR1H_687MjChiJDgoffemIFo3VmOboYWXlH-zwu-d90Q-MwzlZsDISvqf7c`)
    responseData = await apiResponse.json();
    trendingMovies=await responseData.results;
    console.log(trendingMovies);
    displayApi();
}

getApiData();
function displayApi(){
    let cartona =``;
    for(let i=0;i<trendingMovies.length;i++) {
        let obj=JSON.stringify(trendingMovies[i]);
        console.log(typeof(obj));
        console.log("move num"+i+obj);
        cartona +=`
        <div class="col-lg-4 col-md-6 my-2">
            <div class="movie">
                <img src="https://image.tmdb.org/t/p/w500${trendingMovies[i].poster_path}" class="w-100"/>
                <div class="movieCaption">
                    <h2>${trendingMovies[i].title}</h2>
                    <p>${trendingMovies[i].overview}</p>
                    <h5>Rate..</h5>
                    <h6 class="active">${trendingMovies[i].vote_average}</h6>
                    <h5>First Show..</h5>
                    <h6 class="active">${trendingMovies[i].release_date}</h6>
                    <br>
                    <button class="btn btn-outline-danger" style="color:black; font-weight:bold;" type="button" onclick='add2Fav(${obj})'> Add to Favourits </button>
                </div>         
            </div>
        </div>
        `
        }
    document.getElementById('rowData').innerHTML=cartona;
}
function add2Fav(t){
    let x= JSON.parse(localStorage.getItem('cart'))||[];
  x.push(t);
  localStorage.setItem('cart',JSON.stringify(x));
  console.log(x);
}

// search in that list by title 
searchBar.addEventListener('keyup',function(){
    currentFilm=searchBar.value.toLowerCase();
    console.log(currentFilm);
    var cartona=``
    for(let i=0;i<trendingMovies.length;i++){
        let obj=JSON.stringify(trendingMovies[i]);
        if(trendingMovies[i].title.toLowerCase().includes(currentFilm)){
            cartona+=`
            <div class="col-lg-4 col-md-6 my-2">
                <div class="movie">
                    <img src="https://image.tmdb.org/t/p/w500${trendingMovies[i].poster_path}" class="w-100"/>
                    <div class="movieCaption">
                        <h2>${trendingMovies[i].title}</h2>     
                        <p> ${trendingMovies[i].overview}</p>
                        <p>${trendingMovies[i].vote_average}</p>
                        <p>${trendingMovies[i].release_date}</p>
                        <br>
                    <button class="btn btn-outline-danger" style="color:black; font-weight:bold;" type="button" onclick='add2Fav(${obj})'> Add to Favourits </button>
                    </div>         
                </div>
            </div>
            `
        }
        document.getElementById('rowData').innerHTML=cartona;
    }
})
// get all movies except trending movies..
async function getMovies(index){
    apiResponse =await fetch(`https://api.themoviedb.org/3/movie/${index}?api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&page=1`);
    responseData = await apiResponse.json();
    trendingMovies=await responseData.results;
    displayApi();
}
// get movie by name..
async function searchNameMovies(index){
    apiResponse =await fetch(`https://api.themoviedb.org/3/search/movie?api_key=eba8b9a7199efdcb0ca1f96879b83c44&query=${index}`);
    responseData = await apiResponse.json();
    trendingMovies=await responseData.results;
    displayApi();
}
getMovie.addEventListener('keyup',function(){
    currentMovie = getMovie.value.toLowerCase();
    if(currentMovie!=''||currentMovie!=null){
        searchNameMovies(currentMovie);
    }
    else{
        getMovies('now_playing')
    }
})
// click events to view results..
$('.links .anchor').click(function(){
    //this بتعود علي اللينك ال انت دوست عليه
    currentLink = ($(this).html()).toLowerCase();//الكلام ال جوه اللينك ال انت دوست عليه
    if(currentLink=='now playing')
    {
        getMovies('now_playing')
    }
    else if(currentLink=='top rated')
    {
        getMovies('top_rated')
    }
    else{
        getMovies(currentLink)
    }
})
$('.links .trending').click(function(){
    getApiData();
})
// change active link when click on it 
$('.links .anchor').click(function(){
    $(this).addClass('active');
    $(this).siblings().removeClass('active');

})



//regex
function nameValidation(){
    let alertName =document.getElementById('alertName');
    let regex =/^[A-Za-z_]{1,}$/;
    if(regex.test(userName.value)&&userName!=""){
        userName.classList.add('is-valid');
        userName.classList.remove('is-invalid');
        alertName.classList.replace('d-block','d-none');
        return true;
    }
    else{
        userName.classList.add('is-invalid');
        userName.classList.remove('is-valid');
        alertName.classList.replace('d-none','d-block');
        return false;
    }
}

userName.onkeyup= nameValidation;
userEmail.onkeyup=function(){
    let alertEmail =document.getElementById('alertEmail');
    let regex= /^(https:\/\/)?(www\.)?[A-Za-z_0-9\.]{1,}\.[a-z]{3}$/
    if(regex.test(userEmail.value)==true&&userEmail!=""){
        userEmail.classList.add('is-valid');
        userEmail.classList.remove('is-invalid');
        alertEmail.classList.replace('d-block','d-none');
    }
    else{
        userEmail.classList.add('is-invalid');
        userEmail.classList.remove('is-valid');
        alertEmail.classList.replace('d-none','d-block');
    }

}
userPhone.onkeyup=function phoneValidation(){
    let alertPhone =document.getElementById('alertPhone');
    let regex = /^(002)?(01)[0125][0-9]{8}$/
    if(regex.test(userPhone.value)==true&&userPhone!=""){
        userPhone.classList.add('is-valid');
        userPhone.classList.remove('is-invalid');
        alertPhone.classList.replace('d-block','d-none');
        return true;
    }
    else{
        userPhone.classList.add('is-invalid');
        userPhone.classList.remove('is-valid');
        alertPhone.classList.replace('d-none','d-block');
        return false;
    }
}
userAge.onkeyup=function ageValidation(){
    let alertAge =document.getElementById('alertAge');
    let regex = /^([2-7][0-9]|80)$/;
    if(regex.test(userAge.value)==true&&userAge!=""){
        userAge.classList.add('is-valid');
        userAge.classList.remove('is-invalid');
        alertAge.classList.replace('d-block','d-none');
        return true;
    }
    else{
        userAge.classList.add('is-invalid');
        userAge.classList.remove('is-valid');
        alertAge.classList.replace('d-none','d-block');
        return false;
    }
}
userPass.onkeyup=function passValidation(){
    let alertPass =document.getElementById('alertPass');
    let regex =/^.{5,15}$/;
    if(regex.test(userPass.value)==true&&userPass!=""){
        userPass.classList.add('is-valid');
        userPass.classList.remove('is-invalid');
        alertPass.classList.replace('d-block','d-none');
        return true;
    }
    else{
        userPass.classList.add('is-invalid');
        userPass.classList.remove('is-valid');
        alertPass.classList.replace('d-none','d-block');
        return false;
    }
}
userRepass.onkeyup=function repassValidation(){
    let alertRepass =document.getElementById('alertRepass');
    if($('#userPass').val()==$('#userRepass').val() && $('#userRepass').val()!="")
    {
        userRepass.classList.add('is-valid');
        userRepass.classList.remove('is-invalid');
        alertRepass.classList.replace('d-block','d-none');
        return true;
    }
    else{
        userRepass.classList.add('is-invalid');
        userRepass.classList.remove('is-valid');
        alertRepass.classList.replace('d-none','d-block');
        return false;
    }
}



    






