// select the share button with the class 'share-button'
const share = document.querySelector('.share-button');
    // listen to a click event and fire share
    share.addEventListener('click', () => {
        // check if web share is supported
        if (navigator.share) {
            navigator.share({
                // title of what to share
                title: 'Developer Resources by pwafire.org',
                // text to share
                text: 'Here are resources to learn how to build Progressive Web Apps',
                // url to share
                url: 'https://pwafire.org',
            })
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));
        } else {
            console.log(`Web share not supported on desktop...`);
        }
    })
