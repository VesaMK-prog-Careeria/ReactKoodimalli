import './App.css';

// Message komponentti, joka saa propsina viestin ja onko viesti positiivinen vai negatiivinen
// ja muuttaa viestin tyyliluokkaa sen mukaan
const Message = ({message, isPositive}) => {

    let messageStyle = ''
    if (isPositive === true) {
        messageStyle = 'messagePositive'
    } else {
        messageStyle = 'messageNegative'
    }

    return (
        <div className={messageStyle}>
            {message}
        </div>
    )
}

export default Message