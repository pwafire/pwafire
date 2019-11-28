const share = document.querySelector('.share-button');

export const Share = () => {
    // listen to a click event and fire share
    share.addEventListener('click', () => {
        // check if web share is supported
        if (navigator.share) {
            navigator.share({
                title: 'Developer Resources by pwafire.org',
                text: 'Here are resources to learn how to build Progressive Web Apps',
                url: 'https://pwafire.org',
            })
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));
        } else {
            console.log(`Web share not supported on desktop...`);
        }
    })
}
