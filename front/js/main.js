async function fetchActivities() {
  const response = await fetch('http://localhost:3000/api/v1/activities');
  return response.json();
}

async function fetchAccommodations() {
  const response = await fetch('http://localhost:3000/api/v1/accommodations');
  return response.json();
}

async function fetchFood() {
  const response = await fetch('http://localhost:3000/api/v1/food');
  return response.json();
}

async function fetchIndividual() {
  const response = await fetch('http://localhost:3000/api/v1/entity');
  return response.json();
}

function displayCards(items, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = ''; 
  const template = document.getElementById('card-template').content;

  items.forEach(item => {
    const clone = document.importNode(template, true);

    
    clone.querySelector('.card-img').src = item.newImageUrl || 'img/maxresdefault.jpg'; 

    clone.querySelector('.card-title').textContent = item.nombre;
    clone.querySelector('.card-ofrecido').textContent = item.nombreOfrecidoPor ;
    clone.querySelector('.card-ubicacion').textContent = item.ubicacionNombre || 'Colombia';
    clone.querySelector('.card-description').textContent = item.descripcion || 'Descripción no disponible';
    clone.querySelector('.card-price').textContent = `Precio: ${item.precio || 'Precio no disponible'}`;

    container.appendChild(clone);
  });
}

function filterItems(items, query) {
  return items.filter(item => 
    (item.nombre && item.nombre.toLowerCase().includes(query.toLowerCase())) || 
    (item.ubicacionNombre && item.ubicacionNombre.toLowerCase().includes(query.toLowerCase()))
  );
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const activities = await fetchActivities();
    const accommodations = await fetchAccommodations();
    const food = await fetchFood();
    const individual = await fetchIndividual();

    displayCards(activities, 'activities-list');
    displayCards(accommodations, 'accommodations-list');
    displayCards(food, 'food-list');
    displayCards(individual, 'entities-list');

    const allItems = {
      activities,
      accommodations,
      food,
      individual
    };

    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', () => {
      const query = searchInput.value;
      displayCards(filterItems(allItems.activities, query), 'activities-list');
      displayCards(filterItems(allItems.accommodations, query), 'accommodations-list');
      displayCards(filterItems(allItems.food, query), 'food-list');
      displayCards(filterItems(allItems.individual, query), 'entities-list');
    });

    document.getElementById('btn-reload').addEventListener('click', () => {
      window.location.reload();
    });

    document.getElementById('btn-accommodations').addEventListener('click', () => {
      showSection('accommodations-list');
    });

    document.getElementById('btn-food').addEventListener('click', () => {
      showSection('food-list');
    });

    document.getElementById('btn-activities').addEventListener('click', () => {
      showSection('activities-list');
    });

  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

function showSection(sectionId) {
  // Ocultar todas las secciones
  document.getElementById('activities-list').style.display = 'none';
  document.getElementById('accommodations-list').style.display = 'none';
  document.getElementById('food-list').style.display = 'none';
  document.getElementById('entities-list').style.display = 'none';

  // Mostrar la sección seleccionada
  document.getElementById(sectionId).style.display = 'grid';
}

document.addEventListener('DOMContentLoaded', function() {
  
  const liConocenos = document.getElementById('li-conocenos');

  if (liConocenos) {
      liConocenos.addEventListener('click', function() {
          document.querySelectorAll('nav ul li').forEach(li => li.classList.remove('active-nav'));
          this.classList.add('active-nav');
      });
  }
});


function showDetails(item) {
  document.getElementById('details-title').textContent = item.nombre;
  document.getElementById('details-img').src = item.newImageUrl || 'img/maxresdefault.jpg';
  document.getElementById('details-ofrecido').textContent = `Ofrecido por: ${item.nombreOfrecidoPor}`;
  document.getElementById('details-ubicacion').textContent = `Ubicación: ${item.ubicacionNombre || 'Colombia'}`;
  document.getElementById('details-description').textContent = item.descripcion || 'Descripción no disponible';
  document.getElementById('details-price').textContent = `Precio: ${item.precio || 'Precio no disponible'}`;

  document.getElementById('details-section').style.display = 'flex';
}

document.getElementById('details-close').addEventListener('click', () => {
  document.getElementById('details-section').style.display = 'none';
});

function displayCards(items, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = ''; 
  const template = document.getElementById('card-template').content;

  items.forEach(item => {
    const clone = document.importNode(template, true);

    clone.querySelector('.card-img').src = item.newImageUrl || 'img/maxresdefault.jpg';
    clone.querySelector('.card-title').textContent = item.nombre;
    clone.querySelector('.card-ofrecido').textContent = item.nombreOfrecidoPor;
    clone.querySelector('.card-ubicacion').textContent = item.ubicacionNombre || 'Colombia';
    clone.querySelector('.card-description').textContent = item.descripcion || 'Descripción no disponible';
    clone.querySelector('.card-price').textContent = `Precio: ${item.precio || 'Precio no disponible'}`;

    // Añadir evento de clic a toda la tarjeta
    clone.querySelector('.card').addEventListener('click', () => showDetails(item));

    container.appendChild(clone);
  });
}


// Esto es la animacion de scroll
document.addEventListener('DOMContentLoaded', function() {
  const liConocenos = document.getElementById('li-conocenos');

  if (liConocenos) {
      liConocenos.addEventListener('click', function() {
          document.querySelectorAll('nav ul li').forEach(li => li.classList.remove('active-nav'));
          this.classList.add('active-nav');
      });
  }

  // Scroll animation
  const sections = document.querySelectorAll('.intro-section, .vision-section, .mision-section');
  const options = {
      root: null,
      threshold: 0,
      rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('animate-fadeIn');
              observer.unobserve(entry.target);
          }
      });
  }, options);

  sections.forEach(section => {
      observer.observe(section);
  });
});