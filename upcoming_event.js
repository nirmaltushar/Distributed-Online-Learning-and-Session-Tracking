const form = document.getElementById('eventForm');
const message = document.getElementById('message');
const imagePreview = document.getElementById('imagePreview');

document.getElementById('banner').addEventListener('change', function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imagePreview.innerHTML = `<img src="${e.target.result}" alt="Banner Preview"/>`;
    };
    reader.readAsDataURL(file);
  }
});

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const formData = new FormData(form);

  const response = await fetch('http://localhost:3000/api/events', {
    method: 'POST',
    body: formData,
  });

  const result = await response.json();

  if (response.ok) {
    message.textContent = 'Event uploaded successfully!';
    form.reset();
    imagePreview.innerHTML = '';
  } else {
    message.textContent = result.error || 'Something went wrong!';
    message.style.color = 'red';
  }
});
