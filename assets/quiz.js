var breedParam

var answer1El = document.getElementById("answer1");
var answer2El = document.getElementById("answer2");
var answer3El = document.getElementById("answer3");
var answer4El = document.getElementById("answer4");
var answer5El = document.getElementById("answer5");
var answer6El = document.getElementById("answer6");

var question1El = document.getElementById("question1");
var question2El = document.getElementById("question2");
var question3El = document.getElementById("question3");
var question4El = document.getElementById("question4");
var question5El = document.getElementById("question5");
var question6El = document.getElementById("question6");

var Questions = '';
var GPT_Advice = '';

var responseEl = document.getElementById("response");

var submitEl = document.getElementById("submitButton");


const apiKey = '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';
const modelId = 'gpt-3.5-turbo'; // or any other available model ID

const apiUrl = 'https://api.openai.com/v1/chat/completions';

const data = {
  model: modelId,
  messages: [
    { role: 'system', content: `Can you ask me 6 short questions to help me determine what breed of cat is right for me based on my personality and lifestyle?` },
  ],
};


function QuestionGenerator(){
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(result => {
      // Handle the API response here
      console.log(result.choices[0].message.content);
      Questions = result.choices[0].message.content
      var QuestionsList = Questions.split('\n')
      question1El.textContent = QuestionsList[0]
      question2El.textContent = QuestionsList[1]
      question3El.textContent = QuestionsList[2]
      question4El.textContent = QuestionsList[3]
      question5El.textContent = QuestionsList[4]
      question6El.textContent = QuestionsList[5]
    })
    .catch(error => {
      // Handle any errors
      console.error(error);
    });
}


function HandleAnswers(event) {
  var answer1 = answer1El.value;
  var answer2 = answer2El.value;
  var answer3 = answer3El.value;
  var answer4 = answer4El.value;
  var answer5 = answer5El.value;
  var answer6 = answer6El.value;

  console.log(`Here are the user responses: ${answer1},${answer2},${answer3},${answer4},${answer5},${answer6}`);

  const userData = {
    model: modelId,
    messages: [
      { role: 'user', content: 'Can you ask me 6 short questions to help me determine what breed of cat is right for me based on my personality and lifestyle?' },
      { role: 'system', content: `${Questions}`},
      { role: 'user', content: `${answer1},${answer2},${answer3},${answer4},${answer5},${answer6}` },
    ],
  };

  console.log(userData);

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify(userData),
  })
    .then(response => response.json())
    .then(result => {
      // Handle the API response here
      console.log(result.choices[0].message.content);
      GPT_Advice = result.choices[0].message.content;
      responseEl.innerText = GPT_Advice;
    })
    .catch(error => {
      // Handle any errors
      console.error(error);
    });
}

function SmartSearch(){
  //GPT_Advice
}


QuestionGenerator()

submitEl.addEventListener("click", HandleAnswers);

var res = `Based on your answers, some potential cat breeds that might be a good fit for you are:

1. Australian Cattle Dog: this breed is known for their high intelligence and energy levels, and they are great for active families. They do require regular grooming and training to keep them well-behaved, but are generally not noisy.

2. Border Collie: this breed is highly intelligent and loves to be active, making them an excellent choice for someone looking for a trainable, energetic dog. They do require a lot of grooming to keep their coat healthy and shiny, but are generally very quiet.

3. Vizsla: this breed is known for their friendly, outgoing personality and love of outdoor activities. They are also highly trainable and intelligent, making them a good choice for someone looking for a smart, high-energy dog. They do have a short coat that requires minimal grooming, and are usually not very noisy.

4. Whippet: this breed is known for being fast and athletic, but also laid-back and affectionate. They are generally low-maintenance in terms of grooming and training, but do require regular exercise to keep them happy and healthy. They are also usually very quiet, making them a good choice for someone who wants a peaceful home.

Of course, these are just a few examples of breeds that might be a good fit for your lifestyle. I would recommend doing more research on each breed and meeting with breeders or rescue organizations to learn more about their temperaments and needs before making a final decision.`

var list = ['1', '2', '3', '4']

var n = res.split('\n')

console.log(n.length)

for (let index = 0; index < n.length; index++) {
  
  if (n[index][0] in list == true){
    var split2 = n[index].split(':')
    console.log(split2[0].slice(3))
  }
}

window.addEventListener('scroll', function() {
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  var windowHeight = window.innerHeight || document.documentElement.clientHeight;
  var body = document.querySelector('body');
  var darkBlueColor = 'rgb(0, 0, 50)'; /* Adjust the dark blue color as desired */

  var scrollProgress = scrollTop / (document.documentElement.scrollHeight - windowHeight);
  var backgroundColor = `rgb(0, 0, ${scrollProgress * 70})`;

  body.style.backgroundColor = backgroundColor;
});

// Get all the circle elements
const circles = document.querySelectorAll('.circle');
const firstScroll = document.querySelectorAll('.box span');

// Add event listener to each circle
circles.forEach(circle => {
  circle.addEventListener('click', () => {
    circle.classList.toggle('active');
    firstScroll.forEach(firstScroll => {
      firstScroll.style.display = 'block';
    });
    
  });

  // Clicking outside the circle will remove the active class
  window.addEventListener('click', (event) => {
    if (!circle.contains(event.target)) {
      circle.classList.remove('active');
    }
  });
});

// Add a click event listener to each <span> element
firstScroll.forEach(firstScroll => {
  firstScroll.addEventListener('click', () => {
    // Calculate the height of one page
    const pageHeight = window.innerHeight;
    const cat = document.querySelectorAll('.catPlaceholder');
    const selectionPanel = document.querySelectorAll('.full-panel');

    selectionPanel.forEach(selectionPanel => {
      selectionPanel.style.display = 'none';
    });
 
    cat.forEach(cat => {
      cat.style.display = 'block';
    });

    // Scroll the page down by one page height
    window.scrollBy({
      top: pageHeight,
      behavior: 'smooth'
    });
  });
});



//THIS MAKES IT SO THE SCROLL BUTTONS APPEAR (WITH EVENT LISTENERS) 
//WHEN THERES TEXT IN THE BOXES

// Select the text input element
const inputElement1 = document.getElementById('answer1');

// Select the HTML element you want to change
const scrollBox1 = document.querySelector('.scrollBox1');

// Add an "input" event listener to the text input element
inputElement1.addEventListener('input', () => {
  // Check if the input element has any value
  if (inputElement1.value !== '') {
    // Set the display property of the target element to "block"
    scrollBox1.style.display = 'block';
  } else {
    // Set the display property of the target element to "none"
    scrollBox1.style.display = 'none';
  }
});

// Select the span element inside the .scrollBox1 container
const scrollElement1 = document.querySelector('.scrollBox1 span');
const pageHeight = window.innerHeight *2.5;

// Add a click event listener to the span element
scrollElement1.addEventListener('click', () => {
  // Calculate the height of the viewport (screen)
  const viewportHeight = window.innerHeight;
  console.log('227 ran')

  // Scroll the page down by one page height
  window.scrollBy({
    top: pageHeight,
    behavior: 'smooth'
  });
});

//*************QUESTION 2**************/

// Select the text input element
const inputElement2 = document.getElementById('answer2');

// Select the HTML element you want to change
const scrollBox2 = document.querySelector('.scrollBox2');

// Add an "input" event listener to the text input element
inputElement2.addEventListener('input', () => {
  // Check if the input element has any value
  if (inputElement2.value !== '') {
    // Set the display property of the target element to "block"
    console.log(scrollBox2.style.display)
    scrollBox2.style.display = 'block';
    console.log(scrollBox2.style.display)
    scrollBox2.style.zIndex = '100';
    console.log('256 Ran')
  } else {
    // Set the display property of the target element to "none"
    scrollBox2.style.display = 'none';
  }
});

// Select the span element inside the .scrollBox1 container
const scrollElement2 = document.querySelector('.scrollBox2 span');
const pageHeight2 = window.innerHeight *1.2;

// Add a click event listener to the span element
scrollElement2.addEventListener('click', () => {
  // Calculate the height of the viewport (screen)
  const viewportHeight = window.innerHeight;
  console.log('274 ran')

  // Scroll the page down by one page height
  window.scrollBy({
    top: pageHeight2,
    behavior: 'smooth'
  });
});


//**********QUESION 3**************/


// Select the text input element
const inputElement3 = document.getElementById('answer3');

// Select the HTML element you want to change
const scrollBox3 = document.querySelector('.scrollBox3');

// Add an "input" event listener to the text input element
inputElement3.addEventListener('input', () => {
  // Check if the input element has any value
  if (inputElement3.value !== '') {
    // Set the display property of the target element to "block"
  
    scrollBox3.style.display = 'block';
    console.log('300 Ran')
    
  } else {
    // Set the display property of the target element to "none"
    scrollBox3.style.display = 'none';
  }
});

// Select the span element inside the .scrollBox1 container
const scrollElement3 = document.querySelector('.scrollBox3 span');
const pageHeight3 = window.innerHeight *1.2;

// Add a click event listener to the span element
scrollElement3.addEventListener('click', () => {
  // Calculate the height of the viewport (screen)
  const viewportHeight = window.innerHeight;
  console.log('317 ran')

  // Scroll the page down by one page height
  window.scrollBy({
    top: pageHeight3,
    behavior: 'smooth'
  });
});


//**********QUESION 4**************/


// Select the text input element
const inputElement4 = document.getElementById('answer4');

// Select the HTML element you want to change
const scrollBox4 = document.querySelector('.scrollBox4');

// Add an "input" event listener to the text input element
inputElement4.addEventListener('input', () => {
  // Check if the input element has any value
  if (inputElement4.value !== '') {
    // Set the display property of the target element to "block"
  
    scrollBox4.style.display = 'block';
    console.log('300 Ran')
    
  } else {
    // Set the display property of the target element to "none"
    scrollBox4.style.display = 'none';
  }
});

// Select the span element inside the .scrollBox1 container
const scrollElement4 = document.querySelector('.scrollBox4 span');
const pageHeight4 = window.innerHeight *1.2;

// Add a click event listener to the span element
scrollElement4.addEventListener('click', () => {
  // Calculate the height of the viewport (screen)
  const viewportHeight = window.innerHeight;
  console.log('358 ran')

  // Scroll the page down by one page height
  window.scrollBy({
    top: pageHeight3,
    behavior: 'smooth'
  });
});






//**********QUESION 5**************/



// Select the text input element
const inputElement5 = document.getElementById('answer5');

// Select the HTML element you want to change
const scrollBox5 = document.querySelector('.scrollBox5');

// Add an "input" event listener to the text input element
inputElement5.addEventListener('input', () => {
  // Check if the input element has any value
  if (inputElement5.value !== '') {
    // Set the display property of the target element to "block"
  
    scrollBox5.style.display = 'block';
    console.log('300 Ran')
    
  } else {
    // Set the display property of the target element to "none"
    scrollBox5.style.display = 'none';
  }
});

// Select the span element inside the .scrollBox1 container
const scrollElement5 = document.querySelector('.scrollBox5 span');
const pageHeight5 = window.innerHeight *1.2;

// Add a click event listener to the span element
scrollElement5.addEventListener('click', () => {
  // Calculate the height of the viewport (screen)
  const viewportHeight = window.innerHeight;
  console.log('405 ran')

  // Scroll the page down by one page height
  window.scrollBy({
    top: pageHeight3,
    behavior: 'smooth'
  });
});




