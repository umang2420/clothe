    function submitForm() {
        let name= document.getElementById('name');
        let address= document.getElementById('address');
        let city= document.getElementById('city');
        let state= document.getElementById('state');
        let pinCode= document.getElementById('pinCode');


        if (!validateInput(name , 'Full Name') ||
            !validateInput(address , 'Address') ||
            !validateInput(city , 'City') ||
            !validateInput(state , 'State') ||
            !validateInput(pinCode , 'PIN Code')) {
            return;
        }

        alert('Address submitted successfully!');
        // window.location.href = 'invoice.html';


        let savedAddresses = JSON.parse(localStorage.getItem('addresses')) || [];

        const newAddress = {
            name: name.value,
            address: address.value,
            city: city.value,
            state: state.value,
            pinCode: pinCode.value
        };

        savedAddresses.push(newAddress);

        localStorage.setItem('addresses', JSON.stringify(savedAddresses));

        if (savedAddresses.length === 1) {
            localStorage.setItem('defaultAddress', JSON.stringify(newAddress));
        }
    }

    function validateInput(inputElement, fieldName) {
        if (inputElement.value.trim() === '') {
            alert(`${fieldName} cannot be empty.`);
            return false;
        }
        
        return true;
    }



