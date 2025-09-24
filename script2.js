function saveBio() {
    const name = DOM.profileName.value.trim();
    const bio = DOM.profileBio.value.trim();
    const profilePic = DOM.profilePic.value.trim();
    
    if (!name) {
        showToast('Please enter a name for the bio', 'error');
        return;
    }
    
    // Collect links
    const links = [];
    const linkItems = document.querySelectorAll('.link-item');
    
    linkItems.forEach(item => {
        const title = item.querySelector('.link-title-input').value.trim();
        const url = item.querySelector('.link-url-input').value.trim();
        
        if (title && url) {
            links.push({ title, url });
        }
    });
    
    // Create bio object
    const bioData = {
        name,
        bio,
        avatar: profilePic || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        links
    };
    
    // Generate the bio page
    const bioId = generateBioPage(bioData);
    
    // Reset form
    resetForm();
    
    // Update bios list
    displayBios();
}
