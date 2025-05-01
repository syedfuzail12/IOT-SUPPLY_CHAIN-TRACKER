# 🔗 Supply Chain Tracking of IoT Devices Using Blockchain  

A modern full-stack web application that securely tracks IoT devices across the supply chain lifecycle—from manufacturing to delivery—using **blockchain technology**, **WebSockets**, and real-time updates.

## 🚀 Features  

- **Role-Based System:** Roles include Manufacturer, Shipper, and Customer, each with dedicated dashboards.  
- **Blockchain Integration:** Device registration, shipping, and activation are verified on the Polygon testnet.  
- **Real-time Updates:** WebSocket-powered real-time tracking of device status and actions.  
- **QR Code Verification:** Devices can be verified using QR codes that link to their blockchain entry.  
- **Secure Authentication:** JWT-based cookie-auth with role protection.  
- **Responsive UI:** Mobile-friendly interface with Tailwind CSS.  
- **ESP32/Arduino Ready:** IoT devices can auto-register and activate via the backend.

## 🛠️ Tech Stack  

- **Frontend:** React, Zustand, Tailwind CSS  
- **Backend:** Node.js, Express, MongoDB, WebSocket  
- **Blockchain:** Polygon (Mumbai Testnet) with Hardhat and Ethers.js  
- **Authentication:** JWT (stored in HTTP-only cookies)  
- **IoT Integration:** ESP32 (Arduino IDE), WebSocket

## 📦 Architecture  

1. **Manufacturer** registers devices (saved to blockchain + DB).  
2. **Shipper** marks devices as shipped via WebSocket and blockchain.  
3. **Customer** activates devices using serial ID or QR code.  
4. Backend syncs device status between blockchain and MongoDB.  
5. React dashboard shows status in real-time.

## 📂 Installation & Setup  

```bash
# Clone the repo
git clone https://github.com/your-username/supply-chain-iot-blockchain.git
cd supply-chain-iot-blockchain

# Install backend dependencies
cd backend
npm install
npm run dev

# Install frontend dependencies
cd ../frontend
npm install
npm run dev
