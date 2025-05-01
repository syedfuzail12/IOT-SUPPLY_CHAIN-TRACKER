import React, { useState, useRef, useEffect } from "react";
import { Printer, Search, FileDown, Filter, ChevronLeft, ChevronRight } from "lucide-react";

const statusMap = {
  "0": { label: "Registered", color: "bg-yellow-200 text-yellow-800" },
  "1": { label: "Shipped", color: "bg-blue-200 text-blue-800" },
  "2": { label: "Activated", color: "bg-green-200 text-green-800" },
};

const DeviceTable = ({ devices }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Show 6 devices per page
  const tableRef = useRef(null);

  // Filter and sort the devices
  const filteredDevices = devices
    .filter(device => {
      const matchesSearch = device.serial.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === "" || device.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (!sortConfig.key) return 0;
      
      if (sortConfig.key === "status") {
        if (sortConfig.direction === "ascending") {
          return a.status > b.status ? 1 : -1;
        } else {
          return a.status < b.status ? 1 : -1;
        }
      } else if (sortConfig.key === "serial") {
        if (sortConfig.direction === "ascending") {
          return a.serial > b.serial ? 1 : -1;
        } else {
          return a.serial < b.serial ? 1 : -1;
        }
      }
      return 0;
    });

  // Calculate pagination
  const totalPages = Math.ceil(filteredDevices.length / itemsPerPage);
  
  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus]);

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDevices.slice(indexOfFirstItem, indexOfLastItem);

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handlePrint = () => {
    // Get current date and time
    const now = new Date();
    const dateTimeStr = now.toLocaleString();
    
    // Create a printable version with all devices (not just current page)
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Device List - IoT Chain Track</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 0;
              padding: 0;
            }
            
            /* Header and Footer Styles */
            .header, .footer {
              position: fixed;
              width: 100%;
              padding: 10px 20px;
              box-sizing: border-box;
            }
            
            .header {
              top: 0;
              border-bottom: 1px solid #ddd;
              height: 50px;
            }
            
            .footer {
              bottom: 0;
              border-top: 1px solid #ddd;
              height: 40px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-size: 12px;
              color: #666;
            }
            
            /* Content Styles */
            .content {
              margin-top: 60px;
              margin-bottom: 50px;
              padding: 20px;
            }
            
            table { 
              width: 100%; 
              border-collapse: collapse; 
              margin-top: 20px;
            }
            
            th, td { 
              padding: 12px; 
              border: 1px solid #e5e7eb; 
            }
            
            thead { 
              background-color: #f3f4f6; 
            }
            
            h1 {
              text-align: center;
              margin-bottom: 20px;
            }
            
            .total-devices {
              text-align: center;
              margin-bottom: 20px;
            }
            
            .status-badge {
              padding: 4px 8px;
              border-radius: 12px;
              font-size: 12px;
              font-weight: 500;
            }
            
            .status-registered {
              background-color: #fef9c3;
              color: #854d0e;
            }
            
            .status-shipped {
              background-color: #dbeafe;
              color: #1e40af;
            }
            
            .status-activated {
              background-color: #dcfce7;
              color: #166534;
            }
            
            .status-unknown {
              background-color: #e5e7eb;
              color: #374151;
            }
            
            @media print {
              @page {
                size: auto;
                margin: 0mm;
              }
              
              .pageNumber:after {
                content: counter(page);
              }
            }
          </style>
        </head>
        <body>
          <!-- Header -->
          <div class="header">
            <div style="font-weight: bold; font-size: 18px;">IoT Chain Track</div>
          </div>
          
          <!-- Content -->
          <div class="content">
            <h1>Device List</h1>
            <p class="total-devices">Total Devices: ${filteredDevices.length}</p>
            
            <table>
              <thead>
                <tr>
                  <th style="text-align: left;">#</th>
                  <th style="text-align: left;">Serial</th>
                  <th style="text-align: left;">Status</th>
                </tr>
              </thead>
              <tbody>
                ${filteredDevices.map((device, index) => {
                  const statusClass = device.status === "0" ? "status-registered" : 
                                     device.status === "1" ? "status-shipped" : 
                                     device.status === "2" ? "status-activated" : "status-unknown";
                  
                  return `
                    <tr>
                      <td>${index + 1}</td>
                      <td>${device.serial}</td>
                      <td>
                        <span class="status-badge ${statusClass}">
                          ${statusMap[device.status]?.label || "Unknown"}
                        </span>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
          
          <!-- Footer -->
          <div class="footer">
            <div>${dateTimeStr}</div>
            <div>Page <span class="pageNumber"></span></div>
          </div>
          
          <script>
            // Execute after DOM is loaded
            document.addEventListener('DOMContentLoaded', function() {
              setTimeout(function() {
                window.print();
                setTimeout(function() { window.close(); }, 1000);
              }, 500);
            });
          </script>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
  };

  const exportToCSV = () => {
    // Get current date and time
    const now = new Date();
    const dateTimeStr = now.toLocaleString();
    
    let csvContent = "data:text/csv;charset=utf-8,";
    
    // Add company name and date
    csvContent += "IoT Chain Track\n";
    csvContent += `Generated on: ${dateTimeStr}\n\n`;
    
    // Add headers
    csvContent += "ID,Serial,Status\n";
    
    // Add rows for all devices (not just current page)
    filteredDevices.forEach((device, index) => {
      csvContent += `${index + 1},${device.serial},${statusMap[device.status]?.label || "Unknown"}\n`;
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "IoT_Chain_Track_Devices.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Pagination controls
  const goToPage = (pageNumber) => {
    setCurrentPage(Math.min(Math.max(1, pageNumber), totalPages));
  };

  // Generate pagination numbers
  const renderPaginationNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Max page numbers to show at once
    
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    // First page
    if (startPage > 1) {
      pageNumbers.push(
        <button
          key={1}
          onClick={() => goToPage(1)}
          className="px-3 py-1 rounded hover:bg-gray-200"
        >
          1
        </button>
      );
      
      if (startPage > 2) {
        pageNumbers.push(<span key="ellipsis1" className="px-1">...</span>);
      }
    }
    
    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`px-3 py-1 rounded ${
            currentPage === i ? "bg-blue-600 text-white" : "hover:bg-gray-200"
          }`}
        >
          {i}
        </button>
      );
    }
    
    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<span key="ellipsis2" className="px-1">...</span>);
      }
      
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => goToPage(totalPages)}
          className="px-3 py-1 rounded hover:bg-gray-200"
        >
          {totalPages}
        </button>
      );
    }
    
    return pageNumbers;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <h2 className="font-bold text-xl mb-2 sm:mb-0">Registered Device List</h2>
        <div className="flex space-x-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
          >
            <Printer size={16} />
            <span className="hidden sm:inline">Print</span>
          </button>
          <button
            onClick={exportToCSV}
            className="flex items-center gap-1 bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700"
          >
            <FileDown size={16} />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by serial..."
            className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative sm:w-48">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter size={16} className="text-gray-400" />
          </div>
          <select
            className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="0">Registered</option>
            <option value="1">Shipped</option>
            <option value="2">Activated</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200" ref={tableRef}>
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">#</th>
              <th 
                className="p-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('serial')}
              >
                Serial
                {sortConfig.key === 'serial' && (
                  <span className="ml-1">
                    {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th 
                className="p-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('status')}
              >
                Status
                {sortConfig.key === 'status' && (
                  <span className="ml-1">
                    {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                  </span>
                )}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.length > 0 ? (
              currentItems.map((device, index) => (
                <tr key={device._id} className="hover:bg-gray-50">
                  <td className="p-3 whitespace-nowrap">{indexOfFirstItem + index + 1}</td>
                  <td className="p-3 break-all">{device.serial}</td>
                  <td className="p-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full font-medium text-xs ${statusMap[device.status]?.color || "bg-gray-300"}`}
                    >
                      {statusMap[device.status]?.label || "Unknown"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-500">
                  No devices found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="text-sm text-gray-600 mb-2 sm:mb-0">
          Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredDevices.length)} of {filteredDevices.length} devices
        </div>
        
        {totalPages > 1 && (
          <div className="flex items-center space-x-1">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-1 rounded ${
                currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-200"
              }`}
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex space-x-1">
              {renderPaginationNumbers()}
            </div>
            
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-1 rounded ${
                currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-200"
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeviceTable;