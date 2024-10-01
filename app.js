// Initialize an empty array to store contacts
let contacts = [];

document.addEventListener("DOMContentLoaded", function() {
    // Show "Your Contacts" tab if there are existing contacts, else show "Create Contact" tab
    if (contacts.length > 0) {
        openTab(null, 'yourContacts');
    } else {
        openTab(null, 'createContact');
    }

    // Check for any existing contacts and display them
    checkAndDisplayContacts();
});

// Function to open the clicked tab and hide others
function openTab(evt, tabName) {
    let tabContents = document.querySelectorAll('.tab-content');
    let tabButtons = document.querySelectorAll('.tab-button');

    // Hide all tab contents
    tabContents.forEach(tab => {
        tab.classList.remove('active');
        tab.style.display = "none";
    });

    // Remove active class from all buttons
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
    });

    // Show the selected tab content
    document.getElementById(tabName).style.display = "block";
    document.getElementById(tabName).classList.add('active');

    // Add 'active' class to the clicked button if there was an event
    if (evt) {
        evt.currentTarget.classList.add('active');
    }

    // After contact is created, display the "Your Contacts" tab
    if (tabName === 'yourContacts') {
        checkAndDisplayContacts();
    }
}

// Function to handle form submission and add a new contact
function createNewContact() {
    let contactName = document.getElementById('contactName').value;
    let contactPhone = document.getElementById('contactPhone').value;
    let contactEmail = document.getElementById('contactEmail').value;

    if (contactName === "" || contactPhone === "") {
        alert("Please fill in all required fields.");
        return;
    }

    let newContact = {
        name: contactName,
        email: contactEmail,
        phone: contactPhone
    };

    // Add the new contact to the array
    contacts.push(newContact);

    // Clear form fields
    document.getElementById('contactName').value = "";
    document.getElementById('contactPhone').value = "";
    document.getElementById('contactEmail').value = "";

    // Update contact list immediately after adding
    checkAndDisplayContacts();

    // Switch to "Your Contacts" tab after adding contact
    openTab(null, 'yourContacts');
}

// Function to display contacts in the "Your Contacts" tab
function checkAndDisplayContacts() {
    let contactsContainer = document.getElementById('contactsList');
    let contactCount = document.getElementById('contactCount');

    // Clear previous contacts list
    contactsContainer.innerHTML = "";

    // Update the contact count
    contactCount.innerHTML = `(${contacts.length})`;

    if (contacts.length > 0) {
        // Create a row for each contact and append to the table
        contacts.forEach((contact, index) => {
            let contactRow = document.createElement('tr');
            contactRow.innerHTML = `
                <td><span class="contact-icon">${getInitials(contact.name)}</span> ${contact.name}</td>
                <td>${contact.email || "No Email"}</td>
                <td>${contact.phone}</td>
                <td><button onclick="deleteContact(${index})">Delete</button></td>
            `;
            contactsContainer.appendChild(contactRow);
        });
    } else {
        // If no contacts, display a message in the table body
        let emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `<td colspan="4" style="text-align:center;">No contacts available. Please add a new contact.</td>`;
        contactsContainer.appendChild(emptyRow);
    }
}

// Function to get the initials of a contact's name
function getInitials(name) {
    return name.split(' ').map(word => word[0].toUpperCase()).join('');
}
// Function to handle form submission and add or edit a contact
let editingIndex = -1; // Global variable to track if we're editing a contact

function createNewContact() {
    let contactName = document.getElementById('contactName').value;
    let contactPhone = document.getElementById('contactPhone').value;
    let contactEmail = document.getElementById('contactEmail').value;

    if (contactName === "" || contactPhone === "") {
        alert("Please fill in all required fields.");
        return;
    }

    let newContact = {
        name: contactName,
        email: contactEmail,
        phone: contactPhone
    };

    if (editingIndex >= 0) {
        // If editing, update the existing contact
        contacts[editingIndex] = newContact;
        editingIndex = -1; // Reset editing state
    } else {
        // If not editing, add the new contact to the array
        contacts.push(newContact);
    }

    // Clear form fields
    document.getElementById('contactName').value = "";
    document.getElementById('contactPhone').value = "";
    document.getElementById('contactEmail').value = "";

    // Update contact list immediately after adding/editing
    checkAndDisplayContacts();

    // Switch to "Your Contacts" tab after adding contact
    openTab(null, 'yourContacts');
}

// Function to edit a contact
function editContact(index) {
    editingIndex = index; // Set the global editing index

    let contact = contacts[index];

    // Populate form fields with contact data
    document.getElementById('contactName').value = contact.name;
    document.getElementById('contactPhone').value = contact.phone;
    document.getElementById('contactEmail').value = contact.email;

    // Switch to the "Create Contact" tab to edit
    openTab(null, 'createContact');
}

// Function to display contacts in the "Your Contacts" tab
function checkAndDisplayContacts() {
    let contactsContainer = document.getElementById('contactsList');
    let contactCount = document.getElementById('contactCount');

    // Clear previous contacts list
    contactsContainer.innerHTML = "";

    // Update the contact count
    contactCount.innerHTML = `(${contacts.length})`;

    if (contacts.length > 0) {
        // Create a row for each contact and append to the table
        contacts.forEach((contact, index) => {
            let contactRow = document.createElement('tr');
            contactRow.innerHTML = `
                <td><span class="contact-icon">${getInitials(contact.name)}</span> ${contact.name}</td>
                <td>${contact.email || "No Email"}</td>
                <td>${contact.phone}</td>
                <td>
                    <button class="edit-btn" onclick="editContact(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteContact(${index})">Delete</button>
                </td>
            `;
            contactsContainer.appendChild(contactRow);
        });
    } else {
        // If no contacts, display a message in the table body
        let emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `<td colspan="4" style="text-align:center;">No contacts available. Please add a new contact.</td>`;
        contactsContainer.appendChild(emptyRow);
    }
}

// Function to delete a contact
function deleteContact(index) {
    // Remove contact at the given index from the contacts array
    contacts.splice(index, 1);

    // Refresh the "Your Contacts" list
    checkAndDisplayContacts();
}

// Function to get the initials of a contact's name
function getInitials(name) {
    return name.split(' ').map(word => word[0].toUpperCase()).join('');
}
