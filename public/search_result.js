var mentors = [];

//getting all the mentors from the DB


var getMentors = function () {
    $.ajax({
        method: "GET",
        url: 'results',
        dataType: "json",
        success: function (data) {
            mentors = [];
            console.log(data);
            var counter = 1;
            for (i in data) {
                mentors[i] = data[i];
                mentors[i].img = 'img/profile'+mentors[i].img_id+'.png';
                mentors[i].imgAlt = 'img/profile'+mentors[i].img_id+'a.png';
                mentors[i].class = "shape" + counter;
                if(counter === 1 || counter === 3 || counter === 5){
                    mentors[i].append = 'img/rec.png'
                } else if (counter === 2 || counter === 6){
                    mentors[i].append = 'img/triangle.png'
                } else if (counter === 4){
                    mentors[i].append = 'img/triangle2.png'
                }
                counter++;
                if(counter === 7){
                    counter = 1;
                };

            }
            console.log(mentors);
            _renderMentors();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    })
};

//getting  mentors by category from the DB

var category = function(category_name){
    $.ajax ({
        method: "GET",
        url: 'category/' + category_name,
        success: function (data) {
            console.log(data);
            $('.current').empty();
            var categoryName = category_name.toUpperCase();
            $('.current').append('<p class="category-name">'+ categoryName +'</p>')
            mentors = [];
            var counter = 1;
            for (i in data) {
                mentors[i] = data[i];
                mentors[i].img = 'img/profile'+mentors[i].img_id+'.png';
                mentors[i].imgAlt = 'img/profile'+mentors[i].img_id+'a.png';
                mentors[i].class = "shape" + counter;
                if(counter === 1 || counter === 3 || counter === 5){
                    mentors[i].append = 'img/rec.png'
                } else if (counter === 2 || counter === 6){
                    mentors[i].append = 'img/triangle.png'
                } else if (counter === 4){
                    mentors[i].append = 'img/triangle2.png'
                }
                counter++;
                if(counter === 7){
                    counter = 1;
                };

            }
            console.log(mentors);
            console.log(window.location.pathname);
            _renderMentors();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    })
}

// rendering the mentors using handlebars
var _renderMentors = function(){
    $('.result-container').empty();
    var source = $('#result-template').html();
    var template = Handlebars.compile(source);
    for (i in mentors){
        var newHTML = template (mentors[i]);
        $('.result-container').append(newHTML);
    };
};


//optional-button "more"

getMentors();

$('.category-link').on('click', function(){
    var id = $(this).parents('.category-name').data().name;
    console.log(id);
    category(id);
})

//hover on profile pic

$('.result-container').on('mouseenter', '.img-container', function(){
    console.log('enter!');
    $(this).find('.profile-img-hover').toggleClass('hide');
    $(this).find('.profile-img').toggleClass('hide');
})

$('.result-container').on('mouseleave', '.img-container', function(){
    console.log('leave!');
    $(this).find('.profile-img-hover').toggleClass('hide');
    $(this).find('.profile-img').toggleClass('hide');
})

//back button
$('.profile-content').on('click', '.arrow-back', function(){
    $.ajax ({
        method: "GET",
        url: '/',
        success: function () {
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });
});