const SlackBot = require('slackbots');
const axios = require('axios');
const dotenv = require('dotenv');
const express = require('express'); //nodejs framework
const bodyParser = require('body-parser');
const request = require('request'); //import a module 'request'
const app = express(); // express application
var stemmer = require('stemmer');
var Tokenizer = require('node-vntokenizer');
var token = new Tokenizer();
sw = require('stopword');

const bot = new SlackBot({
    token: 'xoxb-1151628243062-1151663326518-MHiQCbCtwT4shOcT0caDFVl8',
    name: 'test_bot'
});

//start handler
bot.on('start', () => {
    const params = {
        icon_emoji: ':smiley:'
    };
    // bot.postMessageToChannel('general','Laugh out loud with @jokebot!',params);
});

//error handler
bot.on('error',(err) => console.log(err));

//message handler
bot.on('message', (data) => {
    console.log(data);
    if(data.type !== 'message' || data.subtype === 'bot_message'){
        return;
    }
    handleMessage(data.text);
});

function handleMessage(message){
    const responseMes = classify(message)
    console.log('response', responseMes);
    const params = {
        icon_emoji: ':laughing:'
    };
    bot.postMessageToChannel('general',
        responseMes,
        params);
}




var training_data = [];

//Chuẩn tiếng Anh đầu vào
//toefl
training_data.push({"class":" Chuẩn tiếng anh đầu vào ", "sentence":"Yêu cầu toefl đầu vào"})
training_data.push({"class":" Chuẩn tiếng anh đầu vào ", "sentence":"yêu cầu toefl"})
training_data.push({"class":" Chuẩn tiếng anh đầu vào ", "sentence":"Điểm toefl đầu vào"})
training_data.push({"class":" Chuẩn tiếng anh đầu vào ", "sentence":"điểm toefl yêu cầu đầu vào"})
//ielts
training_data.push({"class":" Chuẩn tiếng anh đầu vào ", "sentence":"Yêu cầu ielts đầu vào"})
training_data.push({"class":" Chuẩn tiếng anh đầu vào ", "sentence":"Cho hỏi yêu cầu ielts đầu vào"})
training_data.push({"class":" Chuẩn tiếng anh đầu vào ", "sentence":"yêu cầu ielts vào học"})
training_data.push({"class":" Chuẩn tiếng anh đầu vào ", "sentence":"Yêu cầu Ielts đầu vào"})
training_data.push({"class":" Chuẩn tiếng anh đầu vào ", "sentence":"Yêu cầu ielts đầu vào ạ"})
training_data.push({"class":" Chuẩn tiếng anh đầu vào ", "sentence":"Điểm ielts đầu vào"})
training_data.push({"class":" Chuẩn tiếng anh đầu vào ", "sentence":"Chuẩn tiếng Anh đầu vào"})
training_data.push({"class":" Chuẩn tiếng anh đầu vào ", "sentence":"Yêu cầu tiếng Anh đầu vào"})


training_data.push({"class":" ENGLISH IN ", "sentence":"Entrance requirements "})
training_data.push({"class":" ENGLISH IN ", "sentence":"English enter "})


//Chuẩn tiếng Anh đầu ra
//tiếng Anh chung
training_data.push({"class":" Chuẩn tiếng anh đầu ra ", "sentence":"Chuẩn tiếng Anh đầu ra"})
training_data.push({"class":" Chuẩn tiếng anh đầu ra ", "sentence":"Tiếng Anh đầu ra"})
training_data.push({"class":" Chuẩn tiếng anh đầu ra ", "sentence":"tiếng Anh đầu ra"})
training_data.push({"class":" Chuẩn tiếng anh đầu ra ", "sentence":"yêu cầu điểm tiếng Anh đầu ra ạ"})
training_data.push({"class":" Chuẩn tiếng anh đầu ra ", "sentence":"Yêu cầu tiếng Anh đầu ra"})
//ielts
training_data.push({"class":" Chuẩn tiếng anh đầu ra ", "sentence":"ielts để ra trường"})
training_data.push({"class":" Chuẩn tiếng anh đầu ra ", "sentence":"Ielts ra trường"})
training_data.push({"class":" Chuẩn tiếng anh đầu ra ", "sentence":"ielts bao nhiêu để ra trường"})
training_data.push({"class":" Chuẩn tiếng anh đầu ra ", "sentence":"yêu cầu ielts đầu ra"})
training_data.push({"class":" Chuẩn tiếng anh đầu ra ", "sentence":"Ielts bao nhiêu để ra trường ạ"})
training_data.push({"class":" Chuẩn tiếng anh đầu ra ", "sentence":"Yêu cầu ielts để ra trường ạ"})
//toefl
training_data.push({"class":" Chuẩn tiếng anh đầu ra ", "sentence":"toefl để ra trường"})
training_data.push({"class":" Chuẩn tiếng anh đầu ra ", "sentence":"Yêu cầu toefl ra trường"})
training_data.push({"class":" Chuẩn tiếng anh đầu ra ", "sentence":"Yêu cầu toefl đầu ra"})
training_data.push({"class":" Chuẩn tiếng anh đầu ra ", "sentence":"toefl bao nhiêu để ra trường"})
training_data.push({"class":" Chuẩn tiếng anh đầu ra ", "sentence":"toefl đầu ra"})
training_data.push({"class":" Chuẩn tiếng anh đầu ra ", "sentence":"Toefl để ra trường"})
training_data.push({"class":" Chuẩn tiếng anh đầu ra ", "sentence":"toefl bao nhiêu để ra trường ạ"})
training_data.push({"class":" Chuẩn tiếng anh đầu ra ", "sentence":"Yêu cầu toefl để ra trường"})

training_data.push({"class":" ENGLISH OUT ", "sentence":"IELTS certificate to finish "})
training_data.push({"class":" ENGLISH OUT ", "sentence":"TOEFL certificate to graduate"})

//Có chứng chỉ tiếng Anh rồi
//tiếng Anh chung
training_data.push({"class":" Có tiếng Anh rồi ", "sentence":"Có chứng chỉ tiếng Anh"})
training_data.push({"class":" Có tiếng Anh rồi ", "sentence":"Có chứng chỉ tiếng Anh rồi"})
training_data.push({"class":" Có tiếng Anh rồi ", "sentence":"Có bằng tiếng Anh rồi"})

//ielts
training_data.push({"class":" Có tiếng Anh rồi ", "sentence":"Có chứng chỉ ielts rồi"})
training_data.push({"class":" Có tiếng Anh rồi ", "sentence":"Có ielts rồi"})
//toefl
training_data.push({"class":" Có tiếng Anh rồi ", "sentence":"Có chứng chỉ toefl rồi"})
training_data.push({"class":" Có tiếng Anh rồi ", "sentence":"Có toefl rồi cần thi lại"})
training_data.push({"class":" Có tiếng Anh rồi ", "sentence":"Đã có toefl rồi cần thi lại "})


//Cơ hội đậu
//Chương trình tiên tiến
training_data.push({"class":" Cơ hội đậu ", "sentence":"Cơ hội đậu"})
training_data.push({"class":" Cơ hội đậu ", "sentence":"Điểm có cơ hội đậu chương trình tiên tiến"})
training_data.push({"class":" Cơ hội đậu ", "sentence":"cơ hội đậu chương trình tiên tiến không"})

//pfiev
training_data.push({"class":" Cơ hội đậu ", "sentence":"Cơ hội đậu chương trình Việt Pháp"})
training_data.push({"class":" Cơ hội đậu ", "sentence":"Cơ hội đậu chương trình PFIEV"})
training_data.push({"class":" Cơ hội đậu ", "sentence":"cơ hội đậu vào chương trình tiên tiến"})
training_data.push({"class":" Cơ hội đậu ", "sentence":"Cơ hội đậu chương trình tiên tiến ECE"})
training_data.push({"class":" Cơ hội đậu ", "sentence":"Có cơ hội đậu chương trình tiên tiến ES"})

//Nội dung đào tạo
training_data.push({"class":" Nội dung đào tạo ", "sentence":"Khoa đào tạo ngành gì"})
training_data.push({"class":" Nội dung đào tạo ", "sentence":"khoa đào tạo lĩnh vực gì"})
training_data.push({"class":" Nội dung đào tạo ", "sentence":"Sinh viên học lĩnh vực gì"})
training_data.push({"class":" Nội dung đào tạo ", "sentence":"Sinh viên được giảng dạy lĩnh vực gì"})
training_data.push({"class":" Nội dung đào tạo ", "sentence":"Sinh viên được đào tạo gì"})
training_data.push({"class":" Nội dung đào tạo ", "sentence":"khoa mình đào tạo ngành gì"})
training_data.push({"class":" Nội dung đào tạo ", "sentence":"khoa mình đào tạo những ngành gì"})
training_data.push({"class":" Nội dung đào tạo ", "sentence":"Khoa mình đào tạo ngành gì thế"})
training_data.push({"class":" Nội dung đào tạo ", "sentence":"Khoa mình đào tạo ngành gì ạ"})
training_data.push({"class":" Nội dung đào tạo ", "sentence":"Khoa mình đào tạo ngành điện tử phải không"})
training_data.push({"class":" Nội dung đào tạo ", "sentence":"Tìm hiểu chương trình đào tạo"})

training_data.push({"class":" EDUCATION ", "sentence":"what I learn"})
training_data.push({"class":" EDUCATION ", "sentence":"what do your faculty train"})
training_data.push({"class":" EDUCATION ", "sentence":"what will student study"})
training_data.push({"class":" EDUCATION ", "sentence":"How many training programs"})

//Cơ sở vật chất
training_data.push({"class":" cơ sở vật chất ", "sentence":"Cơ sở vật chất"})
training_data.push({"class":" cơ sở vật chất ", "sentence":"Cơ sở hạ tầng mạng"})
training_data.push({"class":" cơ sở vật chất ", "sentence":"Thiết bị thí nghiệm"})
training_data.push({"class":" cơ sở vật chất ", "sentence":"Thiết bị giảng dạy"})
training_data.push({"class":" cơ sở vật chất ", "sentence":"Trang thiết bị thí nghiệm"})
training_data.push({"class":" cơ sở vật chất ", "sentence":"Thiết bị thí nghiệm"})
training_data.push({"class":" cơ sở vật chất ", "sentence":"Cở sở hạ tầng"})
training_data.push({"class":" cơ sở vật chất ", "sentence":"trang vật tư thiết bị"})

training_data.push({"class":" FACILITIES ", "sentence":"facilities"})
training_data.push({"class":" FACILITIES ", "sentence":"classroom"})
training_data.push({"class":" FACILITIES ", "sentence":"equipment"})
training_data.push({"class":" FACILITIES ", "sentence":"labs"})
training_data.push({"class":" FACILITIES ", "sentence":"infrastructure "})

//Học phí
training_data.push({"class":" Học phí ", "sentence":"Tiền học"})
training_data.push({"class":" Học phí ", "sentence":"Học phí"})
training_data.push({"class":" Học phí ", "sentence":"học phí bao nhiêu"})
training_data.push({"class":" Học phí ", "sentence":"học phí nhiêu"})
training_data.push({"class":" Học phí ", "sentence":"học phí một năm"})
training_data.push({"class":" Học phí ", "sentence":"Học phí một kỳ"})
training_data.push({"class":" Học phí ", "sentence":"Đóng học phí một kỳ"})
training_data.push({"class":" Học phí ", "sentence":"Đóng học phí thường niên"})
training_data.push({"class":" Học phí ", "sentence":"Đóng học phí thế nào"})
training_data.push({"class":" Học phí ", "sentence":"Đóng học phí theo kỳ hay theo năm"})


training_data.push({"class":" TUITION FEE ", "sentence":"tuition fee"})
training_data.push({"class":" TUITION FEE ", "sentence":"tuition fee for 1 year"})
training_data.push({"class":" TUITION FEE ", "sentence":"training fee"})
training_data.push({"class":" TUITION FEE ", "sentence":"How much I have to pay"})
training_data.push({"class":" TUITION FEE ", "sentence":"the annual tuition fee"})
training_data.push({"class":" TUITION FEE ", "sentence":"the money require for a year"})
training_data.push({"class":" TUITION FEE ", "sentence":"semester cost"})

//Điểm chuẩn
training_data.push({"class":" Điểm chuẩn ", "sentence":"Điểm chuẩn"})
training_data.push({"class":" Điểm chuẩn ", "sentence":"Hỏi điểm chuẩn"})
training_data.push({"class":" Điểm chuẩn ", "sentence":"Điểm trúng tuyển năm ngoái"})
training_data.push({"class":" Điểm chuẩn ", "sentence":"Điểm chuẩn ECE"})
training_data.push({"class":" Điểm chuẩn ", "sentence":"Điểm chuẩn hệ thống nhúng ES"})
training_data.push({"class":" Điểm chuẩn ", "sentence":"Điểm chuẩn PFIEV Việt Pháp"})

//Điểm chuẩn CTTT
training_data.push({"class":" Điểm chuẩn ", "sentence":"Điểm chuẩn chương trình tiên tiến"})
training_data.push({"class":" Điểm chuẩn ", "sentence":"Điểm chuẩn ece"})
training_data.push({"class":" Điểm chuẩn ", "sentence":"Điểm chuẩn es"})
//Điểm chuẩn Việt Pháp
training_data.push({"class":" Điểm chuẩn ", "sentence":"Điểm chuẩn pfiev"})
training_data.push({"class":" Điểm chuẩn ", "sentence":"Điểm chuẩn PFIEV"})
training_data.push({"class":" Điểm chuẩn ", "sentence":"Điểm chuẩn chương trình PFIEV Việt Pháp"})
training_data.push({"class":" Điểm chuẩn ", "sentence":"Điểm chuẩn PFIEV Việt Pháp"})
training_data.push({"class":" Điểm chuẩn ", "sentence":"điểm chuẩn chương trình PFIEV Việt Pháp"})

training_data.push({"class":" ENTRANCE SCORE ", "sentence":"entrance score"})
training_data.push({"class":" ENTRANCE SCORE ", "sentence":"your standard score"})
training_data.push({"class":" ENTRANCE SCORE ", "sentence":"entrance standard score?"})
training_data.push({"class":" ENTRANCE SCORE ", "sentence":"entrance score PFIEV?"})
training_data.push({"class":" ENTRANCE SCORE ", "sentence":"entrance score ECE"})
training_data.push({"class":" ENTRANCE SCORE ", "sentence":"your entrance score ES "})

// Điểm xét tuyển
training_data.push({"class":" Điểm xét tuyển ", "sentence":"Điểm xét tuyển năm ngoái "})
training_data.push({"class":" Điểm xét tuyển ", "sentence":"Điểm xét tuyển học bạ "})
training_data.push({"class":" Điểm xét tuyển ", "sentence":"Điểm xét học bạ"})
training_data.push({"class":" Điểm xét tuyển ", "sentence":"Điểm xét học bạ pfiev"})
training_data.push({"class":" Điểm xét tuyển ", "sentence":"Điểm xét học bạ ece"})
training_data.push({"class":" Điểm xét tuyển ", "sentence":"Điểm xét học bạ es"})
training_data.push({"class":" Điểm xét tuyển ", "sentence":"Điểm xét tuyển pfiev"})
training_data.push({"class":" Điểm xét tuyển ", "sentence":"Điểm xét tuyển chương trình tiên tiến"})
training_data.push({"class":" Điểm xét tuyển ", "sentence":"Điểm xét tuyển Việt Pháp"})
training_data.push({"class":" Điểm xét tuyển ", "sentence":"Điểm xét tuyển ece"})
training_data.push({"class":" Điểm xét tuyển ", "sentence":"Điểm xét tuyển es"})

//Chỉ tiêu tuyển sinh
training_data.push({"class":" Chỉ tiêu ", "sentence":"Chỉ tiêu tuyển sinh năm nay"})
training_data.push({"class":" Chỉ tiêu ", "sentence":"chỉ tiêu"})
training_data.push({"class":" Chỉ tiêu ", "sentence":"chỉ tiêu tuyển sinh"})
training_data.push({"class":" Chỉ tiêu ", "sentence":"chỉ tiêu xét tuyển"})
training_data.push({"class":" Chỉ tiêu ", "sentence":"Chỉ tiêu xét tuyển năm nay"})

//Hình thức xét tuyển
training_data.push({"class":" Hình thức xét tuyển ", "sentence":"Hình thức xét tuyển"})
training_data.push({"class":" Hình thức xét tuyển ", "sentence":"Cách thức xét tuyển"})

//Cách tính hệ số
training_data.push({"class":" Tính điểm ", "sentence":"Hệ số các môn"})
training_data.push({"class":" Tính điểm ", "sentence":"Cách tính hệ số các môn"})
training_data.push({"class":" Tính điểm ", "sentence":"tính hệ số các môn"})
training_data.push({"class":" Tính điểm ", "sentence":"Cách tính điểm xét tuyển"})
training_data.push({"class":" Tính điểm ", "sentence":"tiếng Anh x2 quy về 3 môn"})
training_data.push({"class":" Tính điểm ", "sentence":"tiếng Anh nhân đôi quy về ba môn"})
training_data.push({"class":" Tính điểm ", "sentence":"quy về ba môn"})

//Ưu đãi xét tuyển
training_data.push({"class":" Uư đãi ", "sentence":"Chính sách ưu đãi xét tuyển"})
training_data.push({"class":" Uư đãi ", "sentence":"ưu đãi xét tuyển"})

training_data.push({"class":" Ưu đãi ", "sentence":"Thí sinh điểm cao được ưu đãi"})
training_data.push({"class":" Uư đãi ", "sentence":"thí sinh điểm cao được ưu đãi gì không"})

//Năng lực tiếng Anh chưa tốt có học được không
training_data.push({"class":" Khả năng tiếng Anh ", "sentence":"Tiếng Anh không tốt có thể theo học"})
training_data.push({"class":" Khả năng tiếng Anh ", "sentence":"Tiếng Anh kém có thể học không"})
training_data.push({"class":" Khả năng tiếng Anh ", "sentence":"Tiếng Anh không tốt có thể theo học"})

training_data.push({"class":" ENGLISH ABILITY ", "sentence":"My English is not good. Can I study your program"})
training_data.push({"class":" ENGLISH ABILITY ", "sentence":"I am not good at English. Could I learn your program"})

//Thời gian
training_data.push({"class":" Thời gian ", "sentence":"Khi nào vậy"})
training_data.push({"class":" Thời gian ", "sentence":"khi nào"})
training_data.push({"class":" Thời gian ", "sentence":"khi nào thế"})
training_data.push({"class":" Thời gian ", "sentence":"Thời gian xét tuyển"})
training_data.push({"class":" Thời gian ", "sentence":"Cho hỏi thời gian xét tuyển"})
training_data.push({"class":" Thời gian ", "sentence":"hạn nộp hồ sơ"})

//Học bổng nữ
training_data.push({"class":" Học bổng nữ ", "sentence":"học bổng nữ"})
training_data.push({"class":" Học bổng nữ ", "sentence":"học bổng đầu vào nữ"})
training_data.push({"class":" Học bổng nữ ", "sentence":"học bổng đầu vào sinh viên nữ"})

//Mức học bổng
training_data.push({"class":" Mức học bổng ", "sentence":"học bổng cao không"})
training_data.push({"class":" Mức học bổng ", "sentence":"học bổng bao nhiêu"})
training_data.push({"class":" Mức học bổng ", "sentence":"mấy điểm có học bổng "})
training_data.push({"class":" Mức học bổng ", "sentence":"học bổng thường niên"})
training_data.push({"class":" Mức học bổng ", "sentence":"giá trị học bổng"})

//Hồ sơ xét tuyển
training_data.push({"class":" Hồ sơ ", "sentence":"Hồ sơ xét tuyển"})
training_data.push({"class":" Hồ sơ ", "sentence":"hồ sơ xét tuyển gồm những gì"})
training_data.push({"class":" Hồ sơ ", "sentence":"hồ sơ học bạ gồm gì"})
training_data.push({"class":" Hồ sơ ", "sentence":"Hồ sơ xét học bạ"})
training_data.push({"class":" Hồ sơ ", "sentence":"hồ sơ xét học bạ"})
training_data.push({"class":" Hồ sơ ", "sentence":"Hồ sơ tuyển thẳng"})

//Cơ hội du học
training_data.push({"class":" Du học ", "sentence":"Cơ hội du học"})
training_data.push({"class":" Du học ", "sentence":"cơ hội du học nước ngoài"})
training_data.push({"class":" Du học ", "sentence":"cơ hội học tập nước ngoài"})
training_data.push({"class":" Du học ", "sentence":"học nước ngoài dễ không"})
training_data.push({"class":" Du học ", "sentence":"du học dễ không"})


//Cơ hội việc làm
training_data.push({"class":" Việc làm ", "sentence":"Cơ hội việc làm"})
training_data.push({"class":" Việc làm ", "sentence":"cơ hội việc làm cao không"})
training_data.push({"class":" Việc làm ", "sentence":"Học xong làm việc đâu"})
training_data.push({"class":" Việc làm ", "sentence":"Tốt nghiệp xong làm việc đâu"})


//Đề khó
training_data.push({"class":" Đề khó ", "sentence":"Đề năm nay khó"})
training_data.push({"class":" Đề khó ", "sentence":"Đề năm nay khó hơn"})

//Dự kiến điểm chuẩn
training_data.push({"class":" Dự đoán điểm ", "sentence":"Dự đoán điểm chuẩn tăng hay giảm"})
training_data.push({"class":" Dự đoán điểm ", "sentence":"Dự đoán điểm"})
training_data.push({"class":" Dự đoán điểm ", "sentence":"Dự đoán xem ad"})
training_data.push({"class":" Dự đoán điểm ", "sentence":"Điểm dự kiến"})
training_data.push({"class":" Dự đoán điểm ", "sentence":"Dự đoán điểm xét tuyển"})
training_data.push({"class":" Dự đoán điểm ", "sentence":"điểm chuẩn dự kiến tăng hay giảm"})

//Chào hỏi
training_data.push({"class":" Chào hỏi ", "sentence":"chào"})
training_data.push({"class":" Chào hỏi ", "sentence":"Alo"})
training_data.push({"class":" Chào hỏi ", "sentence":"Ê"})
training_data.push({"class":" Chào hỏi ", "sentence":"Ad ơi"})
training_data.push({"class":" Chào hỏi ", "sentence":"Admin ơi"})
training_data.push({"class":" Chào hỏi ", "sentence":"Thầy ơi"})
training_data.push({"class":" Chào hỏi ", "sentence":"Cô ơi"})
training_data.push({"class":" Chào hỏi ", "sentence":"Chị ơi"})
training_data.push({"class":" Chào hỏi ", "sentence":"Chào ad, khỏe không"})

training_data.push({"class":" Chào hỏi ", "sentence":"Hello"})
training_data.push({"class":" Chào hỏi ", "sentence":"Hi"})
training_data.push({"class":" greeting ", "sentence":"how are you"})
training_data.push({"class":" greeting ", "sentence":"how is your day"})
training_data.push({"class":" greeting ", "sentence":"good day"})
training_data.push({"class":" greeting ", "sentence":"how's it going today"})
training_data.push({"class":" greeting ", "sentence":"hello"})
training_data.push({"class":" greeting ", "sentence":"hi"})
training_data.push({"class":" greeting ", "sentence":"is anyone there"})
training_data.push({"class":" greeting ", "sentence":"good morning"})
training_data.push({"class":" greeting ", "sentence":"good afternoon"})
training_data.push({"class":" greeting ", "sentence":"Long time no see"})
training_data.push({"class":" greeting ", "sentence":"good evenening"})

//Hỏi tiếp
training_data.push({"class":" Hỏi tiếp ", "sentence":"Uh"})
training_data.push({"class":" Hỏi tiếp ", "sentence":"Dạ"})
training_data.push({"class":" Hỏi tiếp ", "sentence":"Uhm"})
training_data.push({"class":" Hỏi tiếp ", "sentence":"Ờ"})
training_data.push({"class":" Hỏi tiếp ", "sentence":"Dạ vâng ạ"})
training_data.push({"class":" Hỏi tiếp ", "sentence":"Vâng ạ"})
training_data.push({"class":" Hỏi tiếp ", "sentence":"Hihi"})
training_data.push({"class":" Hỏi tiếp ", "sentence":"Hehe"})
training_data.push({"class":" Hỏi tiếp ", "sentence":"Hì hì"})
training_data.push({"class":" Hỏi tiếp ", "sentence":"Haha"})


training_data.push({"class":" ASK MORE ", "sentence":"Yes"})
training_data.push({"class":" ASK MORE ", "sentence":"Ồ"})
training_data.push({"class":" ASK MORE ", "sentence":"OK"})
training_data.push({"class":" ASK MORE ", "sentence":"I got it"})
training_data.push({"class":" ASK MORE ", "sentence":"I understand"})
training_data.push({"class":" ASK MORE ", "sentence":"I see"})
training_data.push({"class":" ASK MORE ", "sentence":"Yep"})
training_data.push({"class":" ASK MORE ", "sentence":"=))"})
training_data.push({"class":" ASK MORE ", "sentence":"=))))"})
training_data.push({"class":" ASK MORE ", "sentence":":))))"})


//Khẳng định
training_data.push({"class":" Khẳng định ", "sentence":"Vậy hả"})
training_data.push({"class":" Khẳng định ", "sentence":"Đúng vậy không"})
training_data.push({"class":" Khẳng định ", "sentence":"Thật hả"})
training_data.push({"class":" Khẳng định ", "sentence":"Vậy à"})

training_data.push({"class":" CONFIRM ", "sentence":"Is that right"})
training_data.push({"class":" CONFIRM ", "sentence":"Are you sure"})
training_data.push({"class":" CONFIRM ", "sentence":"Is that correct"})
training_data.push({"class":" CONFIRM ", "sentence":"Really?"})

//An ủi
training_data.push({"class":" An ủi ", "sentence":"Sợ quá"})
training_data.push({"class":" An ủi ", "sentence":"Lo lắm"})

training_data.push({"class":" THANKS ", "sentence":"Thank you so much"})
training_data.push({"class":" THANKS ", "sentence":"Thanks alot"})
training_data.push({"class":" THANKS ", "sentence":"Tks"})

training_data.push({"class":" Cảm ơn ", "sentence":"Cảm ơn ad"})
training_data.push({"class":" Cảm ơn ", "sentence":"Cảm ơn nhiều"})

training_data.push({"class":" BYE ", "sentence":"Bye"})
training_data.push({"class":" BYE ", "sentence":"Goodbye"})
training_data.push({"class":" BYE ", "sentence":"Bye and talk to you later"})
training_data.push({"class":" BYE ", "sentence":"Bye and see you later"})


/////Các chủ đề khác
training_data.push({"class":" Tạm biệt ", "sentence":"Chào tạm biệt nhé"})
training_data.push({"class":" Tạm biệt ", "sentence":"Tạm biệt nhé"})
training_data.push({"class":" Tạm biệt ", "sentence":"Tạm biệt và hẹn gặp lại nhé"})

training_data.push({"class":" SLANG ", "sentence":"Fuck"})
training_data.push({"class":" SLANG ", "sentence":"Shit"})
training_data.push({"class":" SLANG ", "sentence":"Loz"})
training_data.push({"class":" SLANG ", "sentence":"Stupid"})
training_data.push({"class":" SLANG ", "sentence":"Damn it"})
training_data.push({"class":" SLANG ", "sentence":"Wtf"})
training_data.push({"class":" SLANG ", "sentence":"What the hell are you talking"})
training_data.push({"class":" SLANG ", "sentence":"What the hell"})
training_data.push({"class":" SLANG ", "sentence":"dm"})
training_data.push({"class":" SLANG ", "sentence":"You are crazy"})
training_data.push({"class":" SLANG ", "sentence":"Damn"})
training_data.push({"class":" SLANG ", "sentence":"What the hecks"})
training_data.push({"class":" SLANG ", "sentence":"F*ck"})


training_data.push({"class":" Cạn lời ", "sentence":"Speechless"})
training_data.push({"class":" Cạn lời ", "sentence":"Cạn lời"})
training_data.push({"class":" Cạn lời ", "sentence":"Cạn"})
training_data.push({"class":" Cạn lời ", "sentence":"Bưa"})
training_data.push({"class":" Cạn lời ", "sentence":"Đệt"})
training_data.push({"class":" Cạn lời ", "sentence":"Định mệnh"})
training_data.push({"class":" Cạn lời ", "sentence":"Thua"})

training_data.push({"class":" Không hiểu ", "sentence":"Tôi không hiểu"})
training_data.push({"class":" Không hiểu ", "sentence":"Cái gì?"})
training_data.push({"class":" Không hiểu ", "sentence":"Cho mình hỏi"})
training_data.push({"class":" Không hiểu ", "sentence":"Cho em hỏi"})
training_data.push({"class":" Không hiểu ", "sentence":"Ad ơi cho hỏi"})
training_data.push({"class":" Không hiểu ", "sentence":"Ad ơi cho em hỏi"})

training_data.push({"class":" DONOT KNOW ", "sentence":"I don't understand"})
training_data.push({"class":" DONOT KNOW ", "sentence":"What do you mean"})
training_data.push({"class":" DONOT KNOW ", "sentence":"What are you saying?"})

training_data.push({"class":" FUN ", "sentence":"Nice"})
training_data.push({"class":" FUN ", "sentence":"Idiot"})
training_data.push({"class":" FUN ", "sentence":"Studpid"})
training_data.push({"class":" FUN ", "sentence":"Ặc ặc"})
training_data.push({"class":" FUN ", "sentence":"zz"})
training_data.push({"class":" FUN ", "sentence":":v"})
training_data.push({"class":" FUN ", "sentence":"Vãi"})
training_data.push({"class":" FUN ", "sentence":"Loz"})
training_data.push({"class":" FUN ", "sentence":":))"})
training_data.push({"class":" FUN ", "sentence":"Lol"})
training_data.push({"class":" FUN ", "sentence":"Rê thứ"})


training_data.push({"class":" NONSENSE ", "sentence":"love you Benji"})
training_data.push({"class":" NONSENSE ", "sentence":"hate you Benji"})
training_data.push({"class":" NONSENSE ", "sentence":"sing"})
training_data.push({"class":" NONSENSE ", "sentence":"dance"})

training_data.push({"class":" Xàm xàm ", "sentence":"Tôi thích bạn"})
training_data.push({"class":" Xàm xàm ", "sentence":"Tôi mến bạn"})
training_data.push({"class":" Xàm xàm ", "sentence":"Tôi yêu bạn"})
training_data.push({"class":" Xàm xàm ", "sentence":"Tôi ghét bạn"})
training_data.push({"class":" Xàm xàm ", "sentence":"Tôi muốn nhảy cùng bạn"})
training_data.push({"class":" Xàm xàm ", "sentence":"Hát bài nghe"})
training_data.push({"class":" Xàm xàm ", "sentence":"Hát một bài"})
training_data.push({"class":" Xàm xàm ", "sentence":"Nhảy"})

training_data.push({"class":" REASON ", "sentence":"why do I"})
training_data.push({"class":" REASON ", "sentence":"Why do you always"})
training_data.push({"class":" REASON ", "sentence":"Why do I"})
training_data.push({"class":" REASON ", "sentence":"Why"})

training_data.push({"class":" Lý do ", "sentence":"Vì sao mà"})
training_data.push({"class":" Lý do ", "sentence":"Lí do vì sao mà"})
training_data.push({"class":" Lý do ", "sentence":"Lý do vì sao"})
training_data.push({"class":" Lý do ", "sentence":"lí do vì sao mà"})
training_data.push({"class":" Lý do ", "sentence":"lý do tại sao"})
training_data.push({"class":" Lý do ", "sentence":"Tại sao"})
training_data.push({"class":" Lý do ", "sentence":"vì răng"})

training_data.push({"class":" HELP ", "sentence":"help me with"})
training_data.push({"class":" Giúp ", "sentence":"Bạn có thể giúp"})

training_data.push({"class":" COMPLIMENT ", "sentence":"That's great!"})
training_data.push({"class":" COMPLIMENT ", "sentence":"That's perfect!"})
training_data.push({"class":" COMPLIMENT ", "sentence":"That's kind of you!"})
training_data.push({"class":" COMPLIMENT ", "sentence":"That's fantastic!"})
training_data.push({"class":" COMPLIMENT ", "sentence":"That's wonderful!"})

training_data.push({"class":" Khen ", "sentence":"Tuyệt vời"})
training_data.push({"class":" Khen ", "sentence":"thật tuyệt"})
training_data.push({"class":" Khen ", "sentence":"tốt bụng quá"})


training_data.push({"class":" Chán ", "sentence":"Chán quá ad"})
training_data.push({"class":" Chán ", "sentence":"Buồn chán"})
training_data.push({"class":" Chán ", "sentence":"Chán thật"})
training_data.push({"class":" Chán ", "sentence":"Nên làm gì chán quá"})
training_data.push({"class":" Chán ", "sentence":"Nên làm gì buồn quá"})

training_data.push({"class":" BORED ", "sentence":"I'm bored"})
training_data.push({"class":" BORED ", "sentence":"I'm sad"})
training_data.push({"class":" BORED ", "sentence":"I'm stressed"})
training_data.push({"class":" BORED ", "sentence":"have something fun"})


training_data.push({"class":" Đói ", "sentence":"đói quá ad"})
training_data.push({"class":" Đói ", "sentence":"đói vãi"})
training_data.push({"class":" Đói ", "sentence":"tôi đói"})

training_data.push({"class":" Khát ", "sentence":"tôi khát"})
training_data.push({"class":" Khát ", "sentence":"khát quá"})

var corpus_words = {}
var class_words = {}
var mySet = new Set();
for (var i = 0; i <training_data.length; i++){
    mySet.add(training_data[i].class)
}

mySet.forEach(function(current_value){
    class_words[current_value]=[];
})


Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--)
        if (this[i] == obj)
            return true;
    return false;
}


for (var i = 0; i <training_data.length; i++){
    var sentence =  sw.removeStopwords(token.tokenize(training_data[i].sentence));
    var word;
    for (word in sentence){
        var stemmed_word = stemmer(sentence[word])
        if (stemmed_word in corpus_words) {
            corpus_words[stemmed_word] += 1
        }
        else{
            corpus_words[stemmed_word] = 1
        }
        if (class_words[training_data[i].class].contains(stemmed_word) == false){
            class_words[training_data[i].class].push(stemmed_word);
        }
    }
}
// calculate a score for a given class taking into account word commonality
function calculate_class_score_commonality(sentence, className){
    var score = 0;
    var mySentence = sw.removeStopwords(token.tokenize(sentence));
    var word;
    for (word in mySentence){
        var stemmed_word = stemmer(mySentence[word])
        if (class_words[className].contains(stemmed_word)){
            score += (1 / corpus_words[stemmed_word])
        }
    }
    return score;
}
// now we can find the class with the highest score
function classify(sentence){
    var highClass = "none";
    var highscore = 0;
    var score;
    mySet.forEach(function(current_value){
        score = calculate_class_score_commonality(sentence, current_value);
        if (score > highscore) {
            highClass = current_value;
            highscore = score;
        }
    })
    var response_sentence;
    switch (highClass) {

        case " Cơ hội đậu ":
            response_sentence = "Mình nghĩ mức điểm hằng năm không biến động nhiều. Nếu trên 16 điểm thì đừng quá lo lắng bạn nhé.";
            break;

        case " Chuẩn tiếng anh đầu vào ":
            response_sentence = "Sau năm thứ nhất sinh viên được yêu cầu đạt chứng chỉ tiếng Anh TOEFL iBT 52 trở lên hoặc các chứng chỉ tiếng Anh tương đương. Về ngoại ngữ đầu ra phải đạt năng lực từ bậc 4 trở lên theo thang năng lực ngoại ngữ 6 bậc của Việt Nam, hoặc đạt chứng chỉ tiếng Anh quốc tế tương đương là TOEFL iBT 71, TOEFL PBT 530, IELTS 6.0.";
            break;
        case " ENGLISH IN ":
            response_sentence = "There is no requirements of English proficiency to enter our program. English is just an important factor to be considered in entrance examination.";
            break;

        case " Có tiếng Anh rồi ":
            response_sentence = "Có chứng chỉ rồi à... Mình sẽ trả lời bạn rõ hơn. Hiện mình chỉ biết sinh viên có chứng chỉ IELTS quốc tế từ 6.0 trở lên thì tối đa 10% so với tổng số sinh viên chương trình sẽ được hỗ trợ sinh hoạt phí 5 tháng. ";
            break;

        case " Chuẩn tiếng anh đầu ra ":
            response_sentence = "Sinh viên chương trình tiên tiến Việt Mỹ tốt nghiệp với yêu cầu IELTS 6.0 trở lên bạn nhé! ";
            break;

        case " ENGLISH OUT ":
            response_sentence = "After the first year students are required to take the TOEFL iBT 52 or above certificate or equivalent English certificate. The curriculum is designed on a roadmap to help students improve their English proficiency. In foreign languages, they must have ability of level 4 or higher in accordance with the level of foreign language ability of Vietnam, or equivalent international certificate of TOEFL iBT 71, TOEFL PBT 530, IELTS 6.0.";
            break;

        case " EDUCATION ":
            response_sentence = "Well... You know our faculty has 5 training programs on automation, electronics and telecommunication. And you will not only study engineering but also other vital skills. More information are available at www.dut.udn.vn/fast";
            break;

        case " FACILITIES ":
            response_sentence = "We have a variaty of basic and specialized labs, such as General Electronics Lab, Microelectronics Fluke - Intel Computer Room and Cadence Chip Design - Texas Instrument Integrated Circuit and Instrumentation Laboratory and Research - Laboratory, research and development of intelligent robot technology - Laboratory of 3G and 4G National Instrument, R & S, AWR Library";
            break;
        case " cơ sở vật chất ":
            response_sentence = "Cơ sở vật chất có thể nói là hiện đại và đầy đủ nhất bạn nhé. Bạn có thể xem kỹ những thông tin về các phòng thực hành, phòng học, khu tự học và giải trí cũng như các thiết bị hiện đại tại đây: http://dut.udn.vn/Fast/Gioithieu/id/2654";
            break;

        case " TUITION FEE ":
            response_sentence = "Tuition fee of two advanced programs is VND 10 million / student / semester. Each school year has 3 semesters and students pay tuition fees by semester.";
            break;
        case " Học phí ":
            response_sentence = "Mức học phí ở Chương trình Tiên tiến là 10 triệu đồng/1 sv/ 1 học kỳ. Còn mức học phí của PFIEV (Việt - Pháp) thì mình cập nhật sớm cho bạn nhé.";
            break;

        case " ENTRANCE SCORE ":
            response_sentence = "For the year 2018, PFIEV = 15.23 || ECE = 15.3 || ES = 15.04. Please refer to the following link for more info: https://diemthi.tuyensinh247.com/diem-chuan/dai-hoc-bach-khoa-dai-hoc-da-nang-DDK.html";
            break;
        case " Điểm chuẩn ":
            response_sentence = "Điểm NV1 2018 như sau: Việt Pháp PFIEV = 15.23 || CTTT Điện Tử Viễn Thông ECE = 15.3 | NV1 Hệ Thống Nhúng ES = 15.04. Chi tiết điểm chuẩn qua từng năm bạn có thể tham khảo tại https://diemthi.tuyensinh247.com/diem-chuan/dai-hoc-bach-khoa-dai-hoc-da-nang-DDK.html";
            break;

        case " Hình thức xét tuyển ":
            response_sentence = "HÌnh thức xét tuyển như sau: có 2 tổ hợp điểm xét tuyển là A01 và D07. Cụ thể: A01 gồm Anh văn*2 + Toán + Vật lý || Tổ hợp 2 là D07 gồm Anh văn*2 + Toán + Hóa. Còn về Phương thức xét tuyển thì như sau: Tổng điểm 03 môn xét tuyển (không tính hệ số) từ 16,0 điểm trở lên. Ưu tiên theo thứ tự điểm Anh Văn, Toán.";
            break;

        case " Tính điểm ":
            response_sentence = "Cách tính điểm quy về 3 môn thì cứ nhân hệ số xong rồi chia trung bình cộng là ra bạn nhé! Ví dụ lấy (Toán + Lý + Anh * 2) *3 / 4 là ra.";
            break;

        case " Ưu đãi ":
            response_sentence = "Sinh viên có tổng điểm các môn thi từ 26,00 trở lên sẽ được hưởng ưu đãi. Ví dụ như học kỳ đầu tiên được miễn 100% học phí, hỗ trợ sinh hoạt phí 5 tháng. Các học kỳ sau đó sẽ tiếp tục được ưu đãi như học kỳ thứ nhất, nếu sinh viên duy trì được thành tích học tập Xuất sắc và kết quả rèn luyện Tốt.";
            break;

        case " ENGLISH ABILITY ":
            response_sentence = "Do not worry as you would have one year at the beginning of the course to be trained English, and afterwards of course. You can see, our students after graduation can speak English very well.";
            break;

        case " Khả năng tiếng Anh ":
            response_sentence = "Đừng lo lắng bạn à. Bạn sẽ có năm đầu tiên để học tiếng Anh và liên tục những năm sau đó nữa. Bạn thấy đấy, sinh viên khoa FAST nói tiếng Anh rất tốt.";
            break;

        case " Chỉ tiêu ":
            response_sentence = "Chỉ tiêu tuyển sinh năm nay hiện chưa có dữ liệu bạn nhé. Năm 2018 thì như sau: ECE - 80 || ES - 40 || PFIEV - 100. Thông tin chi tiết bạn xem thêm tại http://dut.udn.vn/Tuyensinh2018/Gioithieu/id/2091";
            break;

        case " Điểm xét tuyển ":
            response_sentence = " Điểm xét tuyển năm ngoái có thể xem ở đây: http://dut.udn.vn/fast";
            break;

        case " Mức học bổng ":
            response_sentence = " Mức học bổng cao lắm bạn à. Nghe là biết bạn học giỏi roài. *Wish* ";
            break;

        case " Thời gian ":
            response_sentence = "Thời gian có thể thay đổi. Bạn vui lòng đợi mình kiểm tra lại cho chắc chắn nhé.";
            break;
        case " Học bổng nữ ":
            response_sentence = "Sinh viên nữ có tổng điểm các môn thi từ 24,00 đến 26,00 (không kể điểm ưu tiên)thì tối đa 5% so với tổng số sinh viên chương trình sẽ được giảm 50% học phí, hỗ trợ sinh hoạt phí 5 tháng bạn nhé.";
            break;

        case " Hồ sơ ":
            response_sentence = "Liên quan đến hồ sơ giấy tờ thì bạn xem chi tiết tại: http://dut.udn.vn/Tintuc/Thongbao/id/3196";
            break;

        case " Việc làm ":
            response_sentence = "Việc làm ngon lắm bạn... Toàn công ty khủng không thôi. Viettel, Mobifone, Intel, eSilicon, Google, Facebook...";
            break;

        case "  Du học ":
            response_sentence = " Bạn xem chi tiết cơ hội du học của FAST ở đây nhé: www.dut.udn.vn/fast/";
            break;

        case "  Dự đoán điểm ":
            response_sentence = " Mình không phải thánh Dự, nhưng mình mạnh dạn đoán nếu điểm không tăng thì sẽ giảm :))) ";
            break;

        case " Đề khó ":
            response_sentence = "Đề năm nay cũng khó thật. Nhưng nước nổi thì bèo cũng nổi, khó thì khó chung mà.";
            break;
        /////
        /////
        case " greeting ":
            response_sentence = "Hello! I am Benji from FAST, how may I help you?";
            break;

        case " Chào hỏi ":
            response_sentence = "Chào bạn, mình là Benji đến từ FAST. Mình có thể giúp gì cho bạn?";
            break;

        case " ASK MORE ":
            response_sentence = "You can ask me more about our faculty, such as tuition fee, facilities...";
            break;

        case " Hỏi tiếp ":
            response_sentence = "Bạn có thể hỏi thêm nhiều vấn đề khác, mình có thể giải đáp giúp bạn. Chẳng hạn như điểm chuẩn năm ngoái, học phí...";
            break;

        case " NONSENSE ":
            response_sentence = "You have a good sense of humor, don't you? :D ";
            break;

        case " THANKS ":
            response_sentence = "Don't mention it :)";
            break;

        case " Cảm ơn ":
            response_sentence = "Không có gì đâu, giúp bạn là niềm vui của mình.";
            break;

        case " BYE ":
            response_sentence = "Bye bye. Wish you a nice day!";
            break;

        case " Tạm biệt ":
            response_sentence = "Chào bạn và chúc bạn một ngày tốt lành!";
            break;

        case " Cạn lời ":
            response_sentence = "Speechless... Enjoy the sound of silience.";
            break;

        case " SLANG ":
            response_sentence = "You're wasting your time :D";
            break;

        case " Không hiểu ":
            response_sentence = "Xin lỗi, bạn có thể hỏi ngắn gọn rõ ràng hơn không?";
            break;

        case " DONOT KNOW ":
            response_sentence = "Pardon me. Can you again ask me more clearly?";
            break;
        case " FUN ":
            response_sentence = "Don't make fun on me. I am still a child :( ";
            break;

        case " HELP ":
            response_sentence = "Sure, I am here to help you. Can you make it short so I can help you?";
            break;
        case " Giúp ":
            response_sentence = "Chắc chắn rồi, mình ở đây để giúp bạn. Bạn có thể hỏi ngắn gọn hơn được không?";
            break;
        case " REASON ":
            response_sentence = "I am not sure I can help you with this. Please wait for a short time.";
            break;
        case " Lý do ":
            response_sentence = "Mình không chắc về câu trả lời. Mình sẽ gửi câu trả lời chính xác đến bạn sớm nhất có thể.";
            break;
        case " COMPLIMENT ":
            response_sentence = "Thank you. I am still learning new things.";
            break;
        case " Khen ":
            response_sentence = "Cảm ơn bạn nhiều. Mình còn học hỏi nhiều ở bạn nữa.";
            break;

        case " CONFIRM ":
            response_sentence = "I am still learning and perfect myself but you can trust me.";
            break;
        case " Khẳng định ":
            response_sentence = "Mình đang học hỏi và hoàn thiện bản thân nhưng bạn có thể tin mình.";
            break;
        case " An ủi ":
            response_sentence = "Đừng lo quá bạn à. Lo lắng mà tốt cho sức khỏe thì ngày nào mình cũng lo lắng. Tìm cách giải quyết là điều nên làm.";
            break;

        case " Chán ":
            response_sentence = "Khi buồn chán mình thường nghe nhạc, xem phim hoặc đọc sách yêu thích.";
            break;

        case " BORED ":
            response_sentence = "Read books, watch movie, or hang out with friends...will make you feel much better.";
            break;

        case " Đói ":
            response_sentence = "Cơm đây cơm đây, ăn ngay kẻo đói :) ";
            break;

        case " Khát ":
            response_sentence = "Nước, nước đây!!! ";
            break;

        case " Xàm xàm ":
            response_sentence = "Bớt giỡn bạn gì ơi :)) ";
            break;

        default:
            response_sentence = "Xin lỗi bạn, vấn đề này mình chưa rõ.";
    }
    if (highscore < 0.2){
        response_sentence = "Xin lỗi, mình chịu :(";
    }
    console.log("sentence:",sentence)
    console.log("class:", highClass);
    console.log("score:", highscore);
    console.log(response_sentence,"\n");
    return (response_sentence);
}
