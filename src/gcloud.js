var request = require('request');

// Configure the request
function data(url, type) {
    return {
        "config": {
        "encoding": type,
        "sampleRateHertz": 16000,
        "languageCode": "en-US",
        "enableWordTimeOffsets": false
    },
        "audio": {
            "uri": url
        }
    }
}

function create_options(file, type) {
    return {
        url: 'https://speech.googleapis.com/v1/speech:recognize',
        method: 'POST',
        headers: {
            'Authorization': 'Bearer xxxxxx',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data(file, type))
    };
}
// var options = {
//     url: 'https://speech.googleapis.com/v1/speech:recognize',
//     method: 'POST',
//     headers: {
//         'Authorization': 'Bearer ya29.GlvJBHsdUeQUx6ae0aPtyf_u5x0iRJnLwksL149xfwzd63icgiKNo6SRx_NUFMJWdGL06dnMonwMROyb0lrx123AlGfYMfUi1HA6n5n569ErXOpV_qYgwkcAIRmt',
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data("gs://cloud-samples-tests/speech/brooklyn.flac", "FLAC"))
// };

function transcribe(file, type, callback) {
    return request.post(create_options(file, type), function(error, response, body) {
        return callback(body);
    });
}

transcribe("gs://cloud-samples-tests/speech/brooklyn.flac", "FLAC", (body) => {
    parser = JSON.parse(body);
    console.log(parser.results[0].alternatives[0].transcript)
    return parser.results[0].alternatives[0].transcript
});
