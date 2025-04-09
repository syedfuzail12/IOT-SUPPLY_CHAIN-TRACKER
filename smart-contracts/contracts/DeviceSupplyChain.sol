// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DeviceSupplyChain {
    enum Stage { Manufactured, Shipped, Activated }

    struct Device {
        string serialNumber;
        address manufacturer;
        address shipper;
        address owner;
        Stage stage;
        bool exists;
    }

    mapping(string => Device) public devices;

    event DeviceRegistered(string serialNumber, address manufacturer);
    event DeviceShipped(string serialNumber, address shipper);
    event DeviceActivated(string serialNumber, address owner);

    modifier onlyIfExists(string memory serial) {
        require(devices[serial].exists, "Device not found");
        _;
    }

    function registerDevice(string memory serial) public {
        require(!devices[serial].exists, "Already exists");
        devices[serial] = Device(serial, msg.sender, address(0), address(0), Stage.Manufactured, true);
        emit DeviceRegistered(serial, msg.sender);
    }

    function updateShipment(string memory serial, address shipper) public onlyIfExists(serial) {
        require(devices[serial].manufacturer == msg.sender, "Only manufacturer can ship");
        devices[serial].shipper = shipper;
        devices[serial].stage = Stage.Shipped;
        emit DeviceShipped(serial, shipper);
    }

    function activateDevice(string memory serial) public onlyIfExists(serial) {
        devices[serial].owner = msg.sender;
        devices[serial].stage = Stage.Activated;
        emit DeviceActivated(serial, msg.sender);
    }

    function getDevice(string memory serial) public view returns (
        string memory, address, address, address, Stage, bool
    ) {
        Device memory d = devices[serial];
        return (d.serialNumber, d.manufacturer, d.shipper, d.owner, d.stage, d.exists);
    }
}
