class user{
    constructor(name, surname){
        this.name = name;
        this.surname = surname;
        this.books = [];
        this.pets = [];
    };
    getFullName(){
        console.log(`el nombre del usuario es: ${this.name} ${this.surname}`)
    };
    
    addPet(pet){
        this.pets.push(pet)
    };

    countPets(){
        console.log(`el usuario tiene ${this.pets.length} mascotas`)
    };

    addBook(title, author){
        this.books.push({title, author,})
    };
    getBooksName(){
        const arr = []
        this.books.forEach((book)=>{arr.push(book.title)})
        console.log(`los libros que posee el usuario son: ${arr}`)
    }


}
const user1 = new user('Claudio', 'Gomez', ['El hobbit', 'Viaje al centro de la tierra'], ['perro', 'gato'])

user1.getFullName()

user1.addPet('pato')
user1.addPet('perro')
user1.countPets()

user1.addBook('El Hobbit', 'JRR Tolkien')
user1.addBook(' Veinte mil leguas de viaje submarino', 'Julio Berne')

user1.getBooksName()
