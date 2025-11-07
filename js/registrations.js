document.addEventListener('DOMContentLoaded', () => {

    let tableBody = document.querySelector('table tbody');
    let prevBtn = document.getElementById('prev-btn');
    let nextBtn = document.getElementById('next-btn');
    let pageInfo = document.getElementById('page-info');
    let openModalBtn = document.getElementById('open-modal-btn');
    let registerModal = document.getElementById('register-modal');
    let cancelBtn = document.getElementById('cancel-btn');
    let registerForm = document.getElementById('register-form');
    let downloadBtn = document.getElementById('download-btn');

    let allData = []; 
    let currentPage = 1;
    let itemsPerPage = 10;
    let totalPages = 0;
    
    let storageKey = 'danhSachDangKyXe';


    let renderTable = () => {
        tableBody.innerHTML = ''; 

        let startIndex = (currentPage - 1) * itemsPerPage;
        let endIndex = startIndex + itemsPerPage;
        let pageData = allData.slice(startIndex, endIndex);

        pageData.forEach(item => {
            let row = document.createElement('tr'); 
            row.innerHTML = `
                <td>${item.stt}</td>
                <td>${item.chuXe}</td>
                <td>${item.maSinhVien}</td>
                <td>${item.bsx}</td>
                <td>${item.loaiXe}</td>
                <td>${item.trangThai}</td>
            `;
            tableBody.appendChild(row);
        });
    };


    let updatePaginationUI = () => {
        totalPages = Math.ceil(allData.length / itemsPerPage) || 1;
        pageInfo.textContent = `Trang ${currentPage}/${totalPages}`;
        prevBtn.disabled = (currentPage === 1);
        nextBtn.disabled = (currentPage === totalPages);
    };


    let saveDataToStorage = () => {
        localStorage.setItem(storageKey, JSON.stringify(allData));
    };


    let exportToCsv = (filename, data) => {
        let headers = ['STT', 'Chủ xe', 'Mã sinh viên', 'BSX', 'Loại xe', 'Trạng thái'];

        let csvRows = [headers.join(',')]; 

        for (let item of data) {
            let values = [
                item.stt,
                item.chuXe,
                item.maSinhVien,
                item.bsx,
                item.loaiXe,
                item.trangThai
            ].map(value => {
                let escaped = ('' + value).replace(/"/g, '""');
                return `"${escaped}"`;
            });
            csvRows.push(values.join(','));
        }

        let csvString = csvRows.join('\n');
        
        let blob = new Blob([`\uFEFF${csvString}`], { type: 'text/csv;charset=utf-8;' }); 
        
        let link = document.createElement('a');
        if (link.download !== undefined) {
            let url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };


    let showModal = () => {
        registerModal.classList.remove('hidden');
    };

    let hideModal = () => {
        registerModal.classList.add('hidden');
        registerForm.reset(); 
    };

    openModalBtn.addEventListener('click', showModal);
    cancelBtn.addEventListener('click', hideModal);
    registerModal.addEventListener('click', (event) => {
        if (event.target === registerModal) {
            hideModal();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderTable();
            updatePaginationUI();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderTable();
            updatePaginationUI();
        }
    });

    downloadBtn.addEventListener('click', () => {
        exportToCsv('DanhSachDangKyXe.csv', allData);
    });

    registerForm.addEventListener('submit', (event) => {
        event.preventDefault(); 

        let newEntry = {
            stt: allData.length + 1, 
            chuXe: document.getElementById('ho-ten').value,
            maSinhVien: document.getElementById('ma-sinh-vien').value,
            bsx: document.getElementById('bien-so-xe').value,
            loaiXe: document.getElementById('loai-xe').value,
            trangThai: document.getElementById('tinh-trang').value,
        };

        allData.push(newEntry);
        
        saveDataToStorage();

        currentPage = Math.ceil(allData.length / itemsPerPage);
        renderTable();        
        updatePaginationUI(); 
        hideModal();          
    });


    let initialize = () => {
        let savedDataString = localStorage.getItem(storageKey);
        
        if (savedDataString) {
            console.log("Tìm thấy dữ liệu trong localStorage. Đang tải...");
            allData = JSON.parse(savedDataString);
            updatePaginationUI();
            renderTable();
        } else {
            console.log("Không tìm thấy localStorage. Đang tải từ data.json...");
            fetch('../data.json')
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Không thể tải file data.json");
                    }
                    return response.json(); 
                })
                .then(data_from_json => {
                    allData = data_from_json;
                    saveDataToStorage(); 
                    updatePaginationUI();
                    renderTable();
                })
                .catch(error => {
                    console.error("Lỗi khi tải JSON:", error);
                    tableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: red;">Lỗi: Không thể tải dữ liệu gốc.</td></tr>`;
                });
        }
    };

    initialize();
});
