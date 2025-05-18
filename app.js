// Initialize Feather Icons
feather.replace();

// Global Elements
const banner = document.getElementById('banner');
const navbarSection = document.getElementById('navbarSection');
const vocabularySection = document.getElementById('vocabularySection');
const faqSection = document.getElementById('faqSection');
const logoutBtn = document.getElementById('logoutBtn');
const faqBtn = document.getElementById('faqBtn');
const learnBtn = document.getElementById('learnBtn');
const lessonButtonsContainer = document.getElementById('lessonButtonsContainer');
const defaultVocabularyText = document.getElementById('defaultVocabularyText');
const wordsContainer = document.getElementById('wordsContainer');
const spinner = document.getElementById('spinner');
const noWordFoundMsg = document.getElementById('noWordFoundMsg');
const userName = document.getElementById('userName');
const userPassword = document.getElementById('userPassword');
const loginBtn = document.getElementById('loginBtn');

// Login Functionality
loginBtn.addEventListener('click', async () => {
  const nameValue = userName.value.trim();
  const passValue = userPassword.value.trim();

  if (!nameValue) {
    Swal.fire({ icon: 'error', title: 'Oops...', text: 'Please enter your name!' });
    return;
  }
  if (passValue !== '123456') {
    Swal.fire({ icon: 'error', title: 'Incorrect Password', text: 'Password must be 123456!' });
    return;
  }

  Swal.fire({ icon: 'success', title: 'Login Successful!', text: `Welcome, ${nameValue}!` });
  banner.style.display = 'none';
  navbarSection.style.display = 'block';
  vocabularySection.style.display = 'block';
  faqSection.style.display = 'block';
  userName.value = '';
  userPassword.value = '';
});

// Logout Functionality
logoutBtn.addEventListener('click', () => {
  navbarSection.style.display = 'none';
  vocabularySection.style.display = 'none';
  faqSection.style.display = 'none';
  banner.style.display = 'flex';
  Swal.fire({ icon: 'success', title: 'Logged out!', text: 'You have been logged out successfully.' });
});

// Smooth Scrolling
faqBtn.addEventListener('click', () => {
  document.getElementById('faqSection').scrollIntoView({ behavior: 'smooth' });
});
learnBtn.addEventListener('click', () => {
  document.getElementById('vocabularySection').scrollIntoView({ behavior: 'smooth' });
});

// Load Lesson Buttons
async function loadLessonButtons() {
  try {
    const res = await fetch('https://openapi.programming-hero.com/api/levels/all');
    const data = await res.json();
    console.log('API Response:', data); // Debugging: Log the API response

    const levels = data?.data || [];
    if (!levels.length) {
      console.error('No levels found in the API response');
      return;
    }

    lessonButtonsContainer.innerHTML = '';
    levels.forEach(level => {
      if (level.level_no >= 1 && level.level_no <= 7) {
        const btn = document.createElement('button');
        btn.className = 'btn btn-outline btn-primary flex items-center gap-2';

        const img = document.createElement('img');
        img.src = './assets/fa-book-open.png';
        img.alt = `Lesson ${level.level_no} Image`;
        img.className = 'w-6 h-6';

        const lessonText = document.createElement('span');
        lessonText.textContent = `Lesson - ${level.level_no}`;

        btn.appendChild(img);
        btn.appendChild(lessonText);

        btn.addEventListener('click', () => {
          Array.from(lessonButtonsContainer.children).forEach(child => child.classList.remove('btn-active'));
          btn.classList.add('btn-active');
          loadWordsByLesson(level.level_no);
        });

        lessonButtonsContainer.appendChild(btn);
      }
    });
  } catch (error) {
    console.error('Error loading lessons:', error);
  }
}

// Load Words by Lesson (Limited to 6 words)
async function loadWordsByLesson(lessonId) {
  spinner.style.display = 'flex';
  defaultVocabularyText.style.display = 'none';
  noWordFoundMsg.classList.add('hidden');
  wordsContainer.innerHTML = '';

  try {
    const res = await fetch(`https://openapi.programming-hero.com/api/level/${lessonId}`);
    const data = await res.json();
    console.log('Words API Response:', data);

    let words = data?.data || [];
    spinner.style.display = 'none';

    if (!words.length) {
      // Display the no word found message and image
      wordsContainer.innerHTML = `
        <div class="flex flex-col items-center justify-center text-center">
          <img src="./assets/no-word-found.png" alt="No Word Found" class="w-24 h-24 mb-4" />
          <p class="text-xl font-semibold text-gray-700">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
          <p class="text-lg text-gray-500">নেক্সট Lesson এ যান</p>
        </div>
      `;
      return;
    }

    // Limit the number of words to 9
    words = words.slice(0, 9);

    wordsContainer.innerHTML = '';

    const gridContainer = document.createElement('div');
    gridContainer.className = 'grid grid-cols-3 gap-6 place-items-center justify-center items-center h-screen';

    words.forEach(wordObj => {
      const cardDiv = document.createElement('div');
      cardDiv.className = 'card bg-base-100 shadow-md p-6 text-center';
      cardDiv.innerHTML = `
        <h3 class="text-xl font-bold">${wordObj.word || 'No Word'}</h3>
        <p class="text-gray-700 text-sm">${wordObj.meaning || 'No meaning available'}</p>
        <p class="italic text-sm mb-2">${wordObj.pronunciation || ''}</p>
        <div class="flex justify-center gap-2 mt-4">
          <button class="btn btn-circle btn-outline btn-sm" onclick="pronounceWord('${wordObj.word}')"><i data-feather="volume-2"></i></button>
          <button class="btn btn-circle btn-outline btn-sm" onclick="loadWordDetails('${wordObj._id}')"><i data-feather="info"></i></button>
        </div>
      `;
      gridContainer.appendChild(cardDiv);
    });

    wordsContainer.className = 'flex justify-center items-center w-full';
    wordsContainer.appendChild(gridContainer);

    feather.replace();
  } catch (error) {
    console.error('Error loading words:', error);
    spinner.style.display = 'none';
    noWordFoundMsg.classList.remove('hidden');
  }
}

// Load Word Details from API
async function loadWordDetails(wordId) {
  try {
    console.log(`Fetching details for word ID: ${wordId}`); // Debugging
    const res = await fetch(`https://openapi.programming-hero.com/api/word/${wordId}`);
    const data = await res.json();
    console.log('Word Details API Response:', data); // Debugging

    if (!data?.data) {
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Word details not found!' });
      return;
    }

    const detail = data.data;
    const modalBox = document.getElementById('wordDetailContent');
    if (!modalBox) {
      console.error('Modal box not found'); // Debugging
      return;
    }

    modalBox.innerHTML = `
      <label for="wordDetailModal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
      <h3 class="text-2xl font-bold mb-2">${detail.word || 'No Word'}</h3>
      <p class="italic mb-2">${detail.pronunciation || 'No Pronunciation'}</p>
      <p class="mb-2"><strong>Example:</strong> ${detail.sentence || 'No Example Available'}</p>
      <p class="mb-4"><strong>Synonyms:</strong> ${detail.synonyms?.join(', ') || 'No Synonyms Available'}</p>
      <label for="wordDetailModal" class="btn btn-success">Complete Learning</label>
    `;

    // Open the modal
    document.getElementById('wordDetailModal').checked = true;
  } catch (error) {
    console.error('Error loading word details:', error);
    Swal.fire({ icon: 'error', title: 'Oops...', text: 'Failed to load word details!' });
  }
}


// Pronounce Word
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = 'en-US';
  window.speechSynthesis.speak(utterance);
}

// Initialize Page
(function init() {
  loadLessonButtons();
})();