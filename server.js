

var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/mentorsDB', function() {
    console.log("DB connection established!!!")
});


var Mentor = require('./models/mentorModel');
var BookingRequest = require('./models/requestModel')
var Schema = mongoose.Schema;


var newMentor0 = new Mentor({
    img_id: 0,
    name: "Hanna",
    lastName: "Levi",
    city: "Givatayim",
    adress: "Gnesin, 2, 3",
    category: ["Cooking", "Traveling"],
    hobbies: ["Politics", "Watching TV"],
    story: "I'm a 72 years old widdow. Used to be take care of children as a proffesion ( including my own ), I have  2 children and 5 grandchildren which I used to host for dinners at my place every week or two, but they are living far and I miss hosting and cooking for them.",
    helpGive: "I'm fond of cooking since early years. Will be happy to share my cooking secrets and cook with you something.",
    helpTake: "I only want to speak and share my experinence with youngsters, so our meeting is already a freat help",
    availableTime: [{time:'12/1/2018, 10:00'}, {time:'12/1/2018, 14:00'}, {time:'14/1/2018, 12:00'}]
    // bookingReq:[]
});

var newMentor1 = new Mentor({
    img_id: 1,
    name: "Yossi",
    lastName: "Elmaliach",
    city: "Beit Shemesh",
    adress: "Herzl, 1, 1",
    category: ["Traveling", "Health"],
    hobbies: ["Pink unicorns", "Making toys from baloons"],
    story: "Used to be take care of children as a proffesion ( including my own ), I have  2 children and 5 grandchildren which I used to host for dinners at my place every week or two, but they are living far and I miss hosting and cooking for them.",
    helpGive: "I'm fond of cooking since early years. Will be happy to share my cooking secrets and cook with you something.",
    helpTake: "I only want to speak and share my experinence with youngsters, so our meeting is already a freat help",
    availableTime: [{time:'12/1/2018, 10:00'}, {time:'12/1/2018, 14:00'}, {time:'14/1/2018, 12:00'}],
    bookingReq:[]
});

var newMentor2 = new Mentor({
    img_id: 2,
    name: "David",
    lastName: "Cohen",
    city: "Ramat Aviv",
    adress: "Weizman, 1, 1",
    category: ["Health", "Education"],
    hobbies: ["UFO", "Gambling"],
    story: "Used to be take care of children as a proffesion ( including my own ), I have  2 children and 5 grandchildren which I used to host for dinners at my place every week or two, but they are living far and I miss hosting and cooking for them.",
    helpGive: "I'm fond of cooking since early years. Will be happy to share my cooking secrets and cook with you something.",
    helpTake: "I only want to speak and share my experinence with youngsters, so our meeting is already a freat help",
    availableTime: [{time:'12/1/2018, 10:00'}, {time:'12/1/2018, 14:00'}, {time:'14/1/2018, 12:00'}],
    bookingReq:[]
});

var newMentor3 = new Mentor({
    img_id: 3,
    name: "Moti",
    lastName: "Guri",
    city: "Tel Aviv",
    adress: "Bugrashov, 1, 1",
    category: ["Cooking","Education"],
    hobbies: ["Creating receipes", "Go out and dance"],
    story: "Used to be take care of children as a proffesion ( including my own ), I have  2 children and 5 grandchildren which I used to host for dinners at my place every week or two, but they are living far and I miss hosting and cooking for them.",
    helpGive: "I'm fond of cooking since early years. Will be happy to share my cooking secrets and cook with you something.",
    helpTake: "I only want to speak and share my experinence with youngsters, so our meeting is already a freat help",
    availableTime: [{time:'12/1/2018, 10:00'}, {time:'12/1/2018, 14:00'}, {time:'14/1/2018, 12:00'}],
    bookingReq:[]
});

var newMentor4 = new Mentor({
    img_id: 4,
    name: "Udi",
    lastName: "Usmadar",
    city: "Raanana",
    adress: "Keren-ha-Yesod, 1, 1",
    category: ["Cooking", "Health"],
    hobbies: ["Meditaiting", "Roping-jumps"],
    story: "Used to be take care of children as a proffesion ( including my own ), I have  2 children and 5 grandchildren which I used to host for dinners at my place every week or two, but they are living far and I miss hosting and cooking for them.",
    helpGive: "I'm fond of cooking since early years. Will be happy to share my cooking secrets and cook with you something.",
    helpTake: "I only want to speak and share my experinence with youngsters, so our meeting is already a freat help",
    availableTime: [{time:'12/1/2018, 10:00'}, {time:'12/1/2018, 14:00'}, {time:'14/1/2018, 12:00'}],
    bookingReq:[]
});

var newMentor5 = new Mentor({
    img_id: 5,
    name: "Nana",
    lastName: "Maro",
    city: "Ramar Gan",
    adress: "Haroe, 1, 1",
    category: ["Traveling","Education"],
    hobbies: ["Singing", "Dancing salas"],
    story: "Used to be take care of children as a proffesion ( including my own ), I have  2 children and 5 grandchildren which I used to host for dinners at my place every week or two, but they are living far and I miss hosting and cooking for them.",
    helpGive: "I'm fond of cooking since early years. Will be happy to share my cooking secrets and cook with you something.",
    helpTake: "I only want to speak and share my experinence with youngsters, so our meeting is already a freat help",
    availableTime: [{time:'12/1/2018, 10:00'}, {time:'12/1/2018, 14:00'}, {time:'14/1/2018, 12:00'}],
    bookingReq:[]
});

// newMentor0.save();
// newMentor1.save();
// newMentor2.save();
// newMentor3.save();
// newMentor4.save();
// newMentor5.save();


var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//chat
io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });

    socket.on('send-nickname', function(nickname) {
        socket.nickname = nickname;
        io.emit('send-nickname', socket.nickname);
    });

    socket.on('chat message', function(msg){
        io.emit('chat message', msg, socket.nickname);
      });
});

io.emit('some event', { for: 'everyone' });

// to give back all mentors

app.get('/results', function(req, res){
    Mentor.find((function (err, data){
        if (err) throw error;
        else{
           res.send(data);
        };
    }));
});

app.get('/category/:name', function(req,res){
    Mentor.find({category:req.params.name}, (function(err, data){
        if(err) throw error;
        else{
            res.send(data); } ;
    }));
});

app.get('/mentor/:id', function(req, res){
    fs.readFile('./public/mentor-profile.html', 'utf-8', function(err, data) {
        if (err) throw err;
        res.send(data);
    })
})

app.get('/mentor/:id/inbox', function(req, res){
    fs.readFile('./public/inbox.html', 'utf-8', function(err, data) {
        if (err) throw err;
        res.send(data);
    })
})

app.get('/user/:id/inbox', function(req, res){
    fs.readFile('./public/inbox-user.html', 'utf-8', function(err, data) {
        if (err) throw err;
        res.send(data);
    })
})

// find mentor by id and return object

app.get('/mentor/profile-data/:id', function (req,res){
    Mentor.findById(req.params.id, function(err,foundMentor){
        if (err) {
           throw err;
        } else {
            res.send(foundMentor);
        }
    }
)});

app.get('/user/:id/profile-data/inbox', function (req,res){
    Mentor.find({_id:req.params.id}).populate({path:'bookingReq', model:BookingRequest}).exec(function(err,foundMentor){
        if (err) {
           throw err;
        } else {
            console.log(foundMentor);
            res.send(foundMentor);
        }
    });
});


//post user request to DB
app.post('/mentor/userrequest', function(req, res){
    var mentorId = req.body.mentor;
    var userRequest = new BookingRequest({
        user_name: req.body.user_name,
        text: req.body.text,
        chosenDate: req.body.chosenDate,
    });
    userRequest.save();
    Mentor.findByIdAndUpdate({_id: mentorId}, {$push:{bookingReq:userRequest}}, {new: true}, function(err, userRequest){
        if (err) throw err;
        else {
            res.send(userRequest)};
    }); 
})

app.get('/mentor/:id/profile-data/inbox', function (req,res){
    Mentor.find({_id:req.params.id}).populate({path:'bookingReq', model:BookingRequest}).exec(function(err,foundMentor){
        if (err) {
           throw err;
        } else {
            console.log(foundMentor);
            res.send(foundMentor);
        }
    })
});

// app.listen(9000, function() {
//     console.log("Ready on 9000, babe!");
// });

http.listen(9000, function() {
    console.log("Ready on 9000, babe!");

});



