import { useContext } from "react";
import { AppContent } from "../store/AppContent";
import { signup } from "../util/auth";

class Customer {
    constructor() {
      this.name = '';
      this.username = '';
      this.email = '';
      this.password = '';
    }
    setCustomerName(name) {
      this.name = name;
    }
    setCustomerUsername(username) {
      this.username = username;
    }
    setCustomerEmail(email) {
      this.email = email;
    }
    setCustomerPassword(password) {
      this.password = password;
    }
    signUp(name, userName, email, password){
        return signup(name, userName, email, password);
    }
    logOut(){
        this.setCustomerUsername('null');
        this.setCustomerPassword('null');
    }
  }

  export default Customer;