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

    // Struct Product.
    struct Product {
        string productId;
        string name;
        address companyKey;
        string description;
        string productType;
        address ownerKey;
        string[] logs;
    }

    // Struct User.
    struct User {
        string name;
        string[] products;
    }

    /* Lists of signed up companies and users. */
    address[] public companyAddresses;
    address[] public userAddresses;

    /* Mappings */
    mapping (address => Company) private companyList;
    mapping (string => Product) private productList;
    mapping (address => User) private userList;

    /* Constants*/
    string LOG_CREATE_PRODUCT = "CREATE_PRODUCT";
    string LOG_TRANSFER_OWNERSHIP = "TRANSFER_OWNERSHIP";

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
            companyAddresses.push(companyKey);
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
            userAddresses.push(userKey);
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

    function getCompany(address companyKey) public view returns (Company memory){
        return companyList[companyKey];
    }

    function getAllCompanies() public view returns (address[] memory){
        return companyAddresses;
    }

    function getAllUsers() public view returns (address[] memory){
        return userAddresses;
    }

    // Get a product.
    function getProduct(string memory productId) public view returns (Product memory){
        return productList[productId];
    }

    // Get all products API. (Company)
    function getAllCompanyProducts(address companyKey) public view returns(string[] memory){
        return companyList[companyKey].products;
    }

    // Get all products API. (User)
    function getAllUserProducts(address userKey) public view returns(string[] memory){
        return userList[userKey].products;
    }

    // Register a new product API.
    function registerProduct(string memory productId, string memory name, address companyKey, string memory description, string memory productType) public{

        bytes32 productIdHash = sha256(abi.encodePacked(productId, name, toString(abi.encodePacked(companyKey)), block.timestamp));
        string memory uidHash = toString(abi.encodePacked(productIdHash));

        string[] memory logList = new string[](1);
        string memory createLog = getLogStringFrom(0, LOG_CREATE_PRODUCT, companyKey, companyKey);
        logList[0] = createLog;

        Product memory newProduct = Product({
            productId: productId,
            name: name,
            companyKey: companyKey,
            description: description,
            productType: productType,
            ownerKey: companyKey,
            logs: logList
        });

        productList[uidHash] = newProduct;
        companyList[companyKey].products.push(uidHash);
    }

    // Ownership transter API.
    function transterOwnership(string memory productKey, address user1Key, address user2Key) public {
        // @@
    }

    function getLogStringFrom(uint8 logCount, string memory logType, address user1, address user2) public pure returns(string memory){
        string memory logStr = uintToStr(logCount);
        logStr = string.concat(logStr, "$");
        logStr = string.concat(logStr, logType);
        logStr = string.concat(logStr, "$");
        logStr = string.concat(logStr, toString(abi.encodePacked(user1)));
        logStr = string.concat(logStr, "$");
        logStr = string.concat(logStr, toString(abi.encodePacked(user2)));

        return logStr;
    }

    /* Utility Functions. */

    // Ping.
    function ping() public pure returns (string memory){
        return "Product Chain smart contract running fine.";
    }

    // String equal comparison.
    function strEqual(string memory S1, string memory S2) public pure returns(bool){
        return keccak256(bytes(S1)) == keccak256(bytes(S2));    // returns s1 == s2.
    }

    // bytes -> string.
    function toString(bytes memory data) public pure returns(string memory) {
        bytes memory alphabet = "0123456789abcdef";
        bytes memory str = new bytes(2 + data.length * 2);
        str[0] = "0";
        str[1] = "x";

        for (uint i = 0; i < data.length; i++) {
            str[2+i*2] = alphabet[uint(uint8(data[i] >> 4))];
            str[3+i*2] = alphabet[uint(uint8(data[i] & 0x0f))];
        }

        return string(str);
    }

    // uint 256 -> string
    function uintToStr(uint256 num) public pure returns (string memory) {
        string memory ans;
        uint256 u;

        if(num == 0) return '0';
        while(num > 0){
            u = num % 10;
            num = num / 10;
            if(u == 0) ans = string.concat(ans, '0');
            if(u == 1) ans = string.concat(ans, '1');
            if(u == 2) ans = string.concat(ans, '2');
            if(u == 3) ans = string.concat(ans, '3');
            if(u == 4) ans = string.concat(ans, '4');
            if(u == 5) ans = string.concat(ans, '5');
            if(u == 6) ans = string.concat(ans, '6');
            if(u == 7) ans = string.concat(ans, '7');
            if(u == 8) ans = string.concat(ans, '8');
            if(u == 9) ans = string.concat(ans, '9');
        }
        
        return ans;
    }

}
