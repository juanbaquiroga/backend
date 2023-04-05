import DAO from "../classes/DAO.class.js";

export default class NewsMemDao extends DAO {
    constructor() {
        super();
        this.collection = []
    }

    async create(newToCreate) {
        console.log('create dao')
        let newId;
        if (this.colecction.length()) {
            console.log('create dao')
            newId = this.colecction[this.colecction.length() - 1].id + 1;
        } else {
            console.log('create dao')
            newId = 1;
        }
        console.log(newId)
        const doc = { ...newToCreate, id: newId };
        console.log(doc)
        try{
            this.colecction.push(doc);

            return doc;
        } catch (err) {
            throw new CustomError(500, "Error creating user");
        }
    }

    async checkUsername(username){
        console.log('check')
        const user = this.collection.forEach(user => {
            if(user.username === username){
                return true;
            }
        });
        if(user){
            return true
        }else{
            console.log('check false')
            return false
        }
    }


    async getByFilter(filters){
        try {
            console.log('getByFilter')
            function searchUser(username, collection) {
                for (let i = 0; i < collection.length; i++) {
                  if (collection[i].username === username) {
                    return collection[i];
                  }
                }
            }
            const {username} = filters
            const user = searchUser(username, this.collection)
        
            return user;
        } catch (err) {
            throw new CustomError(500, "Error getting user");
        }
    }
}
