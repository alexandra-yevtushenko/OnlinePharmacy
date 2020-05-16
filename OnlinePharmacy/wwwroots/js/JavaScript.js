
const uri = 'api/Medcines';
let categories = [];

function getMedicines()
{
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayCategories(data))
        .catch(error => console.error('Unable to get Medcines.', error));
}

function addMedicine()
{
    const addNameTextbox = document.getElementById('add-name');
    const addCountryTextbox = document.getElementById('edit-country');
    const addPrescriptionTextBox = document.getElementById('edit-prescription');
    const addPriceTextBox = document.getElementById('edit-price');
    const medicine = {
        name: addNameTextbox.value.trim(),
        country: addCountryTextbox.value.trim(),
        prescription: addPrescriptionTextBox.value.trim(),
        price: addPriceTextBox.value.trim(),
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(medicine)
    })
        .then(response => response.json())
        .then(() =>
        {
            getMedicines();
            addNameTextbox.value = '';
            addCountryTextbox.value = '';
            addPrescriptionTextBox.value = '';
            addPriceTextBox.value = '';
        })
        .catch(error => console.error('Unable to add category.', error));
}

function deleteCategory(id)
{
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getMedicines())
        .catch(error => console.error('Unable to delete category.', error));
}

function displayEditForm(id)
{
    const category = categories.find(category => category.id === id);

    document.getElementById('edit-id').value = category.id;
    document.getElementById('edit-name').value = category.name;
    document.getElementById('edit-info').value = category.info;
    document.getElementById('editForm').style.display = 'block';
}

function updateMedicine()
{
    const medicineId = document.getElementById('edit-id').value;
    const category = {
        id: parseInt(medicineId, 10),
        name: document.getElementById('edit-name').value.trim(),
        country: document.getElementById('edit-country').value.trim(),
        prescription: document.getElementById('edit-prescription').value.trim(),
        price: document.getElementById('edit-price').value.trim(),
    };

    fetch(`${uri}/${medicineId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
    })
        .then(() => getMedicines())
        .catch(error => console.error('Unable to update category.', error));

    closeInput();

    return false;
}

function closeInput()
{
    document.getElementById('editForm').style.display = 'none';
}


function _displayCategories(data)
{
    const tBody = document.getElementById('categories');
    tBody.innerHTML = '';


    const button = document.createElement('button');
    button.classList.add('btn');
    button.classList.add('btn-secondary');

    data.forEach(medicine =>
    {
        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${medicine.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteCategory(${medicine.id})`);
        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let textNode = document.createTextNode(medicine.name);
        td1.appendChild(textNode);

        let td2 = tr.insertCell(1);
        let textNodeCountry = document.createTextNode(medicine.country);
        td2.appendChild(textNodeCountry);

        let td3 = tr.insertCell(2);
        let textNodePrescription = document.createTextNode(medicine.prescription);
        td3.appendChild(textNodePrescription);


        let td4 = tr.insertCell(3);
        let textNodePrice = document.createTextNode(medicine.price);
        td4.appendChild(textNodePrice);

        let td5 = tr.insertCell(4);
        td5.appendChild(editButton);

        let td6 = tr.insertCell(5);
        td6.appendChild(deleteButton);
    });

    categories = data;
}
