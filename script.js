// Function to generate a bio page
function generateBioPage(bioData) {
    // Create a unique identifier for the bio
    const bioId = bioData.name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();
    
    // Create HTML content for the bio page
    const bioHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${bioData.name} - suzak.info</title>
    <style>
        /* Include all the CSS from bio-template.html here */
        body {
            background: linear-gradient(135deg, #0f0f1f 0%, #1a1a2e 100%);
            color: #f8f9fa;
            min-height: 100vh;
            font-family: 'Segoe UI', sans-serif;
        }
        .bio-page {
            max-width: 600px;
            margin: 0 auto;
            padding: 40px 20px;
            text-align: center;
        }
        .bio-avatar {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            object-fit: cover;
            margin-bottom: 20px;
            border: 4px solid #8a2be2;
        }
        .bio-name {
            font-size: 2.5rem;
            margin-bottom: 10px;
            background: linear-gradient(45deg, #8a2be2, #4cc9f0);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }
        .bio-links {
            margin-top: 30px;
        }
        .bio-link {
            display: block;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            padding: 16px;
            margin-bottom: 15px;
            text-decoration: none;
            color: white;
            transition: all 0.3s ease;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .bio-link:hover {
            background: rgba(138, 43, 226, 0.2);
            transform: translateY(-3px);
        }
    </style>
</head>
<body>
    <div class="bio-page">
        <img src="${bioData.avatar}" alt="${bioData.name}" class="bio-avatar">
        <h1 class="bio-name">${bioData.name}</h1>
        <p class="bio-bio">${bioData.bio}</p>
        
        <div class="bio-links">
            ${bioData.links.map(link => 
                `<a href="${link.url}" class="bio-link" target="_blank">${link.title}</a>`
            ).join('')}
        </div>
        
        <p style="margin-top: 40px; color: #6c757d;">
            Created with <a href="https://suzak.info" style="color: #8a2be2;">suzak.info</a>
        </p>
    </div>
</body>
</html>
    `;
    
    // Create a Blob and download link
    const blob = new Blob([bioHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    // Create download link
    const a = document.createElement('a');
    a.href = url;
    a.download = `${bioId}.html`;
    a.textContent = 'Download Bio Page';
    a.style.display = 'block';
    a.style.marginTop = '20px';
    a.className = 'btn btn-primary';
    
    // Show success message with download link
    showToast(`Bio page for ${bioData.name} created successfully!`, 'success');
    
    // Add download link to the toast or a specific container
    const toast = document.getElementById('toast');
    toast.appendChild(a);
    
    // Also save to localStorage for later management
    const existingBios = JSON.parse(localStorage.getItem('suzakBios')) || [];
    bioData.id = bioId;
    bioData.pageUrl = `${bioId}.html`;
    existingBios.push(bioData);
    localStorage.setItem('suzakBios', JSON.stringify(existingBios));
    
    return bioId;
}
