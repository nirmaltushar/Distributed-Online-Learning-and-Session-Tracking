const container = document.getElementById('eventContainer');

async function fetchEvents() {
  try {
    const response = await fetch('http://localhost:3000/api/stud_events');
    const events = await response.json();

    const today = new Date().toISOString().split('T')[0];

    const upcoming = events.filter(event => event.date >= today);

    if (upcoming.length === 0) {
      container.innerHTML = '<p style="text-align:center;">No upcoming events at the moment.</p>';
      return;
    }

    upcoming.forEach(event => {
      const card = document.createElement('div');
      card.className = 'event-card';

      card.innerHTML = `
        <img src="/uploads/${event.banner}" alt="${event.title}" />
        <div class="event-info">
          <h3>${event.title}</h3>
          <div class="date">📅 ${new Date(event.date).toDateString()}</div>
          <p>${event.description}</p>
        </div>
      `;

      container.appendChild(card);
    });

  } catch (err) {
    console.error('Error fetching events:', err);
    container.innerHTML = '<p style="text-align:center; color:red;">Failed to load events.</p>';
  }
}

fetchEvents();
