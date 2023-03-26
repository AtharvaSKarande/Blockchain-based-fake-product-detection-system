// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract ProductChain {

    // Struct Company.
    struct Company {
        string name;
        string description;
        bool isVerified;
        string emailId;
        string contactNo;
        string website;
        string[] products;
    }

    // Struct Log.
    struct Log {
        uint8 logId;
        uint8 logType;  // 0 - Created, 1 - Ownership transfer;
        address user1;
        address user2;
    }

    // Struct Product.
    struct Product {
        string name;
        address companyKey;
        string description;
        string productType;
        address ownerKey;
        Log[] logs;
    }

    // Struct User.
    struct User {
        string name;
        string[] products;
    }

    /* Mappings */
    mapping (address => Company) private companyList;
    mapping (string => Product) private productList;
    mapping (address => User) private userList;

    /* APIs */

    // Company SignUp API.
    function companySignUp(address companyKey, string memory name, string memory description, bool isVerified,
        string memory emailId, string memory contactNo, string memory website) public {
        
        if(strEqual(companyList[companyKey].name, "")){
            string[] memory emptyList;

            Company memory newCompany = Company({
                name: name,
                description: description,
                isVerified: isVerified,
                emailId : emailId,
                contactNo: contactNo,
                website: website,
                products: emptyList
            });

            companyList[companyKey] = newCompany;
        }
    }

    // User SignUp API.
    function userSignUp(address userKey, string memory name) public {
        
        if(strEqual(userList[userKey].name, "")){
            string[] memory emptyList;

            User memory newUser = User({
                name: name,
                products: emptyList
            });

            userList[userKey] = newUser;
        }
    }

    // Email verified field update API. (Company)
    function emailVerified(address companyKey, bool verified) public {
        
        if(!strEqual(companyList[companyKey].name, "")){
            companyList[companyKey].isVerified = verified;
        }
    }

    function getUser(address userKey) public view returns (User memory){
        return userList[userKey];
    }

    function getCompany(address companyKey) public view returns (Company memory) {
        return companyList[companyKey];
    }


    // Get a product.
    function getProduct(string memory productId) public view returns (Product memory){
        return productList[productId];
    }

    // Get all products API. (Company)
    function getAllCompanyProducts(address companyKey) public view returns(Product[] memory){
        //@@
    }

    // Get all products API. (User)
    function getAllUserProducts(address userKey) public view returns(Product[] memory){
        //@@
    }

    // Register a new product API.
    function registerProduct(string memory name, address companyKey, string memory description, string memory productType) public{
        // @@
    }

    // Ownership transter API.
    function transterOwnership(string memory productKey, address user1Key, address user2Key) public {
        // @@
    }

    /* Utility Functions. */
    function strEqual(string memory S1, string memory S2) public pure returns(bool){
        return keccak256(bytes(S1)) == keccak256(bytes(S2));
    }

}