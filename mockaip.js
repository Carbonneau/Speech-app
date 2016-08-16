var watson = {
  "document_tone": {
    "tone_categories": [
      {
        "tones": [
          {
            "score": 0.25482,
            "tone_id": "anger",
            "tone_name": "Anger"
          },
          {
            "score": 0.345816,
            "tone_id": "disgust",
            "tone_name": "Disgust"
          },
          {
            "score": 0.121116,
            "tone_id": "fear",
            "tone_name": "Fear"
          },
          {
            "score": 0.078903,
            "tone_id": "joy",
            "tone_name": "Joy"
          },
          {
            "score": 0.199345,
            "tone_id": "sadness",
            "tone_name": "Sadness"
          }
        ],
        "category_id": "emotion_tone",
        "category_name": "Emotion Tone"
      },
      {
        "tones": [
          {
            "score": 0.999,
            "tone_id": "analytical",
            "tone_name": "Analytical"
          },
          {
            "score": 0.999,
            "tone_id": "confident",
            "tone_name": "Confident"
          },
          {
            "score": 0.694,
            "tone_id": "tentative",
            "tone_name": "Tentative"
          }
        ],
        "category_id": "language_tone",
        "category_name": "Language Tone"
      },
      {
        "tones": [
          {
            "score": 0.271,
            "tone_id": "openness_big5",
            "tone_name": "Openness"
          },
          {
            "score": 0.11,
            "tone_id": "conscientiousness_big5",
            "tone_name": "Conscientiousness"
          },
          {
            "score": 0.844,
            "tone_id": "extraversion_big5",
            "tone_name": "Extraversion"
          },
          {
            "score": 0.257,
            "tone_id": "agreeableness_big5",
            "tone_name": "Agreeableness"
          },
          {
            "score": 0.497,
            "tone_id": "emotional_range_big5",
            "tone_name": "Emotional Range"
          }
        ],
        "category_id": "social_tone",
        "category_name": "Social Tone"
      }
    ]
  }
};

var displayTones = (watson.document_tone.tone_categories[0].tones);



var result = displayTones.reduce(function(prev, curr){
  if(curr.score > prev.score){
    return curr
  }
  else {
    return prev
  }
})


function displayColor(obj) {
  switch (obj.tone_name) {
    case 'Anger':
      return {
        'brightness': 255*obj.score,
        'r': 232,
        'g': 5,
        'b': 33
      };
      break;
    case 'Disgust':
      return {
        'brightness': 255*obj.score,
        'r': 89,
        'g': 38,
        'b': 132
      };
      break;
    case 'Fear':
      return {
        'brightness': 255*obj.score,
        'r': 50,
        'g': 94,
        'b': 43
      };
      break;
    case 'Joy':
      return {
        'brightness': 255*obj.score,
        'r': 255,
        'g': 214,
        'b': 41
      }
      break;
    case 'Sadness':
      return {
        'brightness': 255*obj.score,
        'r':8,
        'g':109,
        'b':178
      }
      break;
  }
}



console.log(displayColor(result));

// particle.login({
//   username: 'jared.carbonneau@email.com',
//   password : 'weather'
// });
//
// var devicesPr = particle.getDevice({ deviceId: '3d0023001647353236343033', auth: '0b9ba4b67cc96df9f7a1ef1039a994f8cf14fb2d' });
//
// fnPr.then(
//   function(result) {
//     console.log('Function called succesfully:', data);
//   }, function(err) {
//     console.log('An error occurred:', err);
//   });
