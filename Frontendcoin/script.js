const usersContainer = document.getElementById('users-container');
const allUsersBtn = document.getElementById('all-users-btn');

allUsersBtn.addEventListener('click', () => {
    fetch('http://localhost:8000/users/all')
        .then(response => response.json())
        .then(users => {
            
            const table = document.createElement('table');
           
            const headerRow = document.createElement('tr');
            headerRow.innerHTML = `
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Website</th>
                <th>City</th>
                <th>Company</th>
                <th>Action</th>
            `;
            table.appendChild(headerRow);
            
            users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}</td>
                    <td>${user.website}</td>
                    <td>${user.address.city}</td>
                    <td>${user.company.name}</td>
                    <td>
                        <button class="add-btn" 
                                data-user-id="${user.id}"
                                data-name="${user.name}"
                                data-email="${user.email}"
                                data-phone="${user.phone}"
                                data-website="${user.website}"
                                data-city="${user.address.city}"
                                data-company="${user.company.name}">Add</button>
                        <button class="open-btn" data-user-id="${user.id}" style="display:none;">Open</button>
                    </td>
                `;
                table.appendChild(row);
            });
            // Append table to usersContainer
            usersContainer.innerHTML = '';
            usersContainer.appendChild(table);
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });
});


document.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('add-btn')) {
        const button = event.target;
        const userId = button.getAttribute('data-user-id');
        const name = button.getAttribute('data-name');
        const email = button.getAttribute('data-email');
        const phone = button.getAttribute('data-phone');
        const website = button.getAttribute('data-website');
        const city = button.getAttribute('data-city');
        const company = button.getAttribute('data-company');

        console.log('Add button clicked for userId:', userId);

        fetch('http://localhost:8000/users/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                userId: userId,
                name: name,
                email: email,
                phone: phone,
                website: website,
                city: city,
                company: company
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add user to database');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                // Hide the "Add" button and show the "Open" button
                button.style.display = 'none';
                button.nextElementSibling.style.display = 'inline-block';
                alert('User added successfully');
            } else {
                throw new Error(data.message);
            }
        })
        .catch(error => {
            console.error('Error adding user to database:', error);
            alert('Failed to add user: ' + error.message);
        });
    }
    else if (event.target && event.target.classList.contains('open-btn')) {
       
        const button = event.target;
        const userId = button.getAttribute('data-user-id');
        console.log('Open button clicked for userId:', userId);

       
        window.location.href = `userDetails.html?userId=${userId}`;
    }
});

