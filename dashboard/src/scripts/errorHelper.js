export function hasErrors(errors) {
    let hasErrors = false
    Object.keys(errors).forEach(error => {
        hasErrors = !!errors[error] ? true : hasErrors
    })
    return hasErrors;
}

/*
    Feel free to add some
    Uses seed (defined outside of a class) to generate a page-wide prng number
*/

let prndSeed = Math.floor(Math.random() * 1337);

export function getRandomSuccessMessage(noise) {
    const successMessages = [
        'Looking good!',
        'Nice!',
        'All good!',
        'Valid!',
        'Got it! 👌',
        'Sweet!',
        'Seems OK!',
        'Awesome!',
        'Yep!',
        'OK!',
        'Understood!'
    ]    
    let prndNoise = noise * prndSeed;
    const x = Math.abs(Math.sin(prndNoise++) * 10000);
    const index = Math.floor(x) % successMessages.length;
    return successMessages[index];
}