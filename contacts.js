const path = require("node:path");
const fs = require("node:fs");
const fsPromises = require("fs").promises;
const { v4: uuidv4 } = require("uuid");
require("colors");

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
  const allContacts = await getContacts();
  console.log("kontakty:".yellow);
  console.table(allContacts);
}

async function getContactById(contactId) {
  const sameContacts = await getContacts();
  sameContacts.filter((contact) => {
    if (contact.id === contactId) {
      console.log("Selected contact:".yellow);
      console.table(contact);
    } else {
      return;
    }
  });
}

async function removeContact(contactId) {
  const contacts = await getContacts();
  const deletedContact = contacts.find((contact) => contact.id === contactId);
  const filteredContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );

  console.log("You deleted:".red);
  console.table(deletedContact);
  fs.writeFile(
    contactsPath,
    JSON.stringify(filteredContacts, null, 2),
    (error) => {
      if (error) {
        console.error(error.message);
      } else {
        console.log("File has been updated.".green);
      }
    }
  );
  console.log("What remains:".yellow);
  console.table(filteredContacts);
}
async function addContact(name, email, phone) {
  const contacts = await getContacts();
  const newContact = { id: uuidv4(), name, email, phone };
  contacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (error) => {
    if (error) {
      console.error(error.message);
    } else {
      console.log("File has been updated.".green);
    }
    console.log(`${name} has been added.`.green);
    console.table(contacts);
  });
}

module.exports = { listContacts, addContact, removeContact, getContactById };
