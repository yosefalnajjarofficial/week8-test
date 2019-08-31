fetch('/all-cities')
  .then(res => res.json())
  .then(cities => {
    const table = document.getElementById('cities-table');
    cities.forEach(city => {
      const row = document.createElement('tr');
      const name = document.createElement('td');
      name.textContent = city.name;
      row.appendChild(name);
      const country = document.createElement('td');
      country.textContent = city.country;
      row.appendChild(country);
      table.appendChild(row);
    });
  });
