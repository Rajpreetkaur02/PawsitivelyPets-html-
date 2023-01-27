$(document).ready(function(){
    $('.shop').click(function(){
        $('.shopdropdown').toggleClass('dropdown_menu_show');
    });  
});

$('.add').click(function() {
    var button = event.target;
    var add = button.parentElement.parentElement.parentElement;
    var ans = add.getElementsByClassName('answer');
    $(ans).show();
    var rem = button.parentElement;
    var remove = rem.getElementsByClassName('remove');
    $(remove).show();
    $(this).hide();
});

$('.remove').click(function() {
    var button = event.target;
    var add = button.parentElement.parentElement.parentElement;
    var ans = add.getElementsByClassName('answer');
    $(ans).hide();
    var add = button.parentElement;
    var addsign = add.getElementsByClassName('add');
    $(addsign).show();
    $(this).hide();
});

if (localStorage.getItem("uname") != null) {
    $('#sign_in').hide();
    $('#logout').show();
    $('#greeting').show();
    userName.innerHTML = localStorage.getItem("uname")
    $('#userName').show();
}

window.onload = function() {
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        emailjs.sendForm('service_njnwb6y', 'template_fp7989f', this)
            .then(function() {
                alert('Message sent successfully!');
            }, function(error) {
                console.log('FAILED...', error);
            });
        document.getElementById('contact-form').reset();
    });
}