document.addEventListener('DOMContentLoaded', () => {
    // Get userId from URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');

    // // Function to fetch user details
    // async function fetchUserDetails(userId) {
    //     try {
    //         const response = await fetch(`http://localhost:8000/users/${userId}`);
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch user details');
    //         }
    //         const userData = await response.json();
    //         displayUserDetails(userData);
    //     } catch (error) {
    //         console.error('Error fetching user details:', error);
    //         alert('Failed to fetch user details');
    //     }
    // }

    // Function to display user details on the page
    function displayUserDetails(userData) {
        const userDetailsContainer = document.getElementById('user-details-container');
        userDetailsContainer.innerHTML = `
            <h2>User Details</h2>
            <p><strong>Name:</strong> ${userData.name}</p>
            <p><strong>Email:</strong> ${userData.email}</p>
            <p><strong>Phone:</strong> ${userData.phone}</p>
            <p><strong>Website:</strong> ${userData.website}</p>
            <p><strong>City:</strong> ${userData.address.city}</p>
            <p><strong>Company:</strong> ${userData.company.name}</p>
        `;
    }

    // Function to fetch user's posts
    async function fetchUserPosts(userId) {
        try {
            const response = await fetch(`http://localhost:8000/posts/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch user posts');
            }
            const userPosts = await response.json();
            displayUserPosts(userPosts);
        } catch (error) {
            console.error('Error fetching user posts:', error);
            alert('Failed to fetch user posts');
        }
    }

    // Function to display user's posts on the page
    function displayUserPosts(userPosts) {
        const postsContainer = document.getElementById('posts-container');
        postsContainer.innerHTML = `
            <h2>User Posts</h2>
            <ul>
                ${userPosts.map(post => `<li><strong>${post.title}</strong><br>${post.body}</li>`).join('')}
            </ul>
        `;
    }

    
    fetchUserPosts(userId);
});




document.getElementById('bulk-add-btn').addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:8000/posts/bulk-add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: userId })
        });
        if (!response.ok) {
            throw new Error('Failed to bulk add posts');
        }
   
        document.getElementById('download-excel-btn').style.display = 'inline-block';
        document.getElementById('bulk-add-btn').style.display = 'none';
    } catch (error) {
        console.error('Error bulk adding posts:', error);
        alert('Failed to bulk add posts: ' + error.message);
    }
});
