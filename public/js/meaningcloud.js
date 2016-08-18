(function() {
    // Your custom JavaScript goes here
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://api.meaningcloud.com/sentiment-2.1",
        "method": "POST",
        "headers": {
            "content-type": "application/x-www-form-urlencoded"
        },
        "data": {
            "key": "YOUR_KEY_VALUE",
            "lang": "YOUR_LANG_VALUE",
            "txt": "YOUR_TXT_VALUE",
            "model": "YOUR_MODEL_VALUE"
        }
    }

    $.ajax(settings).done(function(response) {
        console.log(response);
    });

});
