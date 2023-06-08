// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Contract {
    struct Animal {
        string name;
        uint256 totalDonations;
        uint256 withdrawnAmount;
    }

    mapping(uint256 => Animal) public animals;
    uint256 public animalCount;

    constructor() {
        animalCount = 0;
    }

    function addAnimal(string memory _name) public {
        animals[animalCount] = Animal(_name, 0, 0);
        animalCount++;
    }

    function donate(uint256 _animalId, uint256 _donationAmount) public payable {
        require(_animalId < animalCount, "Invalid animal ID");
        require(_donationAmount > 0, "Donation amount must be greater than zero");
        require(msg.value == _donationAmount, "Incorrect donation amount");

        animals[_animalId].totalDonations += _donationAmount;
    }

    function getWithdrawnAmount(uint256 _animalId) public view returns (uint256) {
        require(_animalId < animalCount, "Invalid animal ID");
        return animals[_animalId].withdrawnAmount;
    }

    function withdraw(uint256 _animalId) public {
        require(_animalId < animalCount, "Invalid animal ID");
        require(animals[_animalId].totalDonations > 0, "No donations to withdraw");

        uint256 remainingBalance = animals[_animalId].totalDonations - animals[_animalId].withdrawnAmount;
        animals[_animalId].withdrawnAmount = animals[_animalId].totalDonations;

        // Transfer the remaining balance to the caller
        payable(msg.sender).transfer(remainingBalance);
    }
}
