module.exports = () => {
    const randomNumber = Math.random()
    const randomString = randomNumber.toString(32)
    const random = randomString.substring(2)
    const date = Date.now().toString(32)

    //console.log(randomNumber);
    //console.log(randomString);
    //console.log(random);

    return random + date
}