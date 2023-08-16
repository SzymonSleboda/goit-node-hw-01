const path = require("node:path");
const fs = require("node:fs");
const fsPromises = require("fs").promises; 

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function getContacts() {
  try {
    const response = await fsPromises.readFile(contactsPath, "utf-8");
    return JSON.parse(response);
  } catch (error) {
    console.error(error.message);
  }
}

async function listContacts() {
const allContacts = await getContacts()
console.log("kontakty:")
console.table(allContacts)

}

async function getContactById(contactId) {
  const sameContacts = await getContacts()
  sameContacts.filter(contact => {
if (contact.id === contactId) {
console.log("Selected contact:")
console.table(contact)
} else {
  console.log("No contact matches your search!")
}
  })
}

async function removeContact(contactId) {
  
}

async function addContact(name, email, phone) {}
