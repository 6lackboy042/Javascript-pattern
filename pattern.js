class Subject {
    constructor() {
        this.observers = [];
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    removeObserver(observer) {
        const index = this.observers.indexOf(observer);
        if (index !== -1) {
            this.observers.splice(index, 1);
        }
    }

    notifyObservers() {
        this.observers.forEach(observer => {
            observer.update();
        });
    }
}

class Observer {
    update() {}
}

class PrintPhoneNumberObserver extends Observer {
    constructor(subject) {
        super();
        this.subject = subject;
        this.subject.addObserver(this);
    }

    update() {
        console.log("Dialed:", this.subject.phoneNumber);
    }
}

class PrintSpecificMessageObserver extends Observer {
    constructor(subject, message) {
        super();
        this.subject = subject;
        this.message = message;
        this.subject.addObserver(this);
    }

    update() {
        console.log(this.message, this.subject.phoneNumber);
    }
}

class Telephone extends Subject {
    constructor() {
        super();
        this.phoneNumbers = new Set();
    }

    addPhoneNumber(phoneNumber) {
        this.phoneNumbers.add(phoneNumber);
        this.notifyObservers();
    }

    removePhoneNumber(phoneNumber) {
        this.phoneNumbers.delete(phoneNumber);
        this.notifyObservers();
    }

    dialPhoneNumber(phoneNumber) {
        if (this.phoneNumbers.has(phoneNumber)) {
            console.log("Dialing", phoneNumber);
            this.phoneNumber = phoneNumber; 
            this.notifyObservers();
        } else {
            console.log("Phone number not found.");
        }
    }
}

class TelephoneAdapter {
    constructor(telephone) {
        this.telephone = telephone;
    }

    addNumber(number) {
        this.telephone.addPhoneNumber(number);
    }

    removeNumber(number) {
        this.telephone.removePhoneNumber(number);
    }

    dialNumber(number) {
        this.telephone.dialPhoneNumber(number);
    }
}

const telephone = new Telephone();
const telephoneAdapter = new TelephoneAdapter(telephone);

const printObserver = new PrintPhoneNumberObserver(telephone);
const specificMessageObserver = new PrintSpecificMessageObserver(telephone, "Now Dialing: ");

telephoneAdapter.addNumber("1234567890");
telephoneAdapter.addNumber("2345678901");

telephoneAdapter.dialNumber("1234567890");
