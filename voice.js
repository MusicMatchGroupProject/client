var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var recognition = new SpeechRecognition();
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

recognition.onresult = function(event) {
    var last = event.results.length - 1;
    var keyword = event.results[last][0].transcript;
    console.log(keyword)
    console.log('Confidence: ' + event.results[0][0].confidence);
}
recognition.onspeechend = function() {
    recognition.stop();
}
recognition.onerror = function(event) {
    console.log('Error occurred in recognition: ' + event.error);
}