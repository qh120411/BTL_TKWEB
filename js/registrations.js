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
    let searchInput = document.getElementById('search-input');

    let allData = [];
    let filteredData = [];
    let currentPage = 1;
    let itemsPerPage = 10;
    let totalPages = 0;
    let storageKey = 'danhSachDangKyXe';

    let reindexData = () => {
        allData.forEach((item, index) => {
            item.stt = index + 1;
        });
    };

    let renderTable = () => {
        tableBody.innerHTML = '';

        let startIndex = (currentPage - 1) * itemsPerPage;
        let endIndex = startIndex + itemsPerPage;
        let pageData = filteredData.slice(startIndex, endIndex);

        pageData.forEach(item => {
            let row = document.createElement('tr');
            row.dataset.id = item.id;
            row.innerHTML = `
                <td>${item.stt}</td>
                <td>${item.chuXe}</td>
                <td>${item.maSinhVien}</td>
                <td>${item.bsx}</td>
                <td>${item.loaiXe}</td>
                <td>${item.trangThai}</td>
                <td><button class="btn-delete" data-id="${item.id}">Xóa</button></td>
            `;
            tableBody.appendChild(row);
        });
    };

    let updatePaginationUI = () => {
        totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
        pageInfo.textContent = `Trang ${currentPage}/${totalPages}`;
        prevBtn.disabled = (currentPage === 1);
        nextBtn.disabled = (currentPage === totalPages);
    };

    let runSearch = () => {
        let searchTerm = searchInput.value.toLowerCase().trim();

        if (searchTerm === '') {
            filteredData = [...allData];
        } else {
            filteredData = allData.filter(item =>
                (item.chuXe && item.chuXe.toLowerCase().includes(searchTerm)) ||
                (item.maSinhVien && item.maSinhVien.toLowerCase().includes(searchTerm)) ||
                (item.bsx && item.bsx.toLowerCase().includes(searchTerm))
            );
        }

        currentPage = 1;
        renderTable();
        updatePaginationUI();
    };

    let handleDelete = (id) => {
        if (confirm('Bạn có chắc chắn muốn xóa đăng ký này không?')) {
            allData = allData.filter(item => item.id !== id);
            reindexData();
            saveDataToStorage();
            runSearch();

            totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
            if (currentPage > totalPages) currentPage = totalPages;

            renderTable();
            updatePaginationUI();
        }
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
                `"${(item.chuXe || '').replace(/"/g, '""')}"`,
                `"${(item.maSinhVien || '').replace(/"/g, '""')}"`,
                `"${(item.bsx || '').replace(/"/g, '""')}"`,
                `"${(item.loaiXe || '').replace(/"/g, '""')}"`,
                `"${(item.trangThai || '').replace(/"/g, '""')}"`
            ];
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

    let showModal = () => registerModal.classList.remove('hidden');
    let hideModal = () => {
        registerModal.classList.add('hidden');
        registerForm.reset();
    };

    openModalBtn.addEventListener('click', showModal);
    cancelBtn.addEventListener('click', hideModal);
    registerModal.addEventListener('click', (event) => {
        if (event.target === registerModal) hideModal();
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
        exportToCsv('DanhSachDangKyXe.csv', filteredData);
    });

    searchInput.addEventListener('input', runSearch);

    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let newEntry = {
            id: Date.now(),
            stt: -1,
            chuXe: document.getElementById('ho-ten').value,
            maSinhVien: document.getElementById('ma-sinh-vien').value,
            bsx: document.getElementById('bien-so-xe').value,
            loaiXe: document.getElementById('loai-xe').value,
            trangThai: document.getElementById('tinh-trang').value,
        };

        allData.push(newEntry);
        reindexData();
        saveDataToStorage();
        runSearch();
        currentPage = Math.ceil(filteredData.length / itemsPerPage);
        renderTable();
        updatePaginationUI();
        hideModal();
    });

    tableBody.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-delete')) {
            let idToDelete = Number(event.target.dataset.id);
            handleDelete(idToDelete);
        }
    });

    let initialize = async () => {
        let savedDataString = localStorage.getItem(storageKey);

        if (savedDataString) {
            console.log("Tìm thấy dữ liệu trong localStorage. Đang tải...");
            let parsedData = JSON.parse(savedDataString);
            allData = parsedData.map((item, index) => ({
                ...item,
                id: item.id || (Date.now() + index)
            }));
        } else {
            console.log("Không tìm thấy localStorage. Đang tải từ data.json...");
            try {
                const response = await fetch('../data.json');
                if (!response.ok) throw new Error("Không thể tải file data.json");
                const data_from_json = await response.json();
                allData = data_from_json.map((item, index) => ({
                    ...item,
                    id: Date.now() + index
                }));
                saveDataToStorage();
            } catch (error) {
                console.error("Lỗi khi tải JSON:", error);
                tableBody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: red;">Lỗi: Không thể tải dữ liệu gốc.</td></tr>`;
                allData = [];
            }
        }

        reindexData();
        filteredData = [...allData];
        updatePaginationUI();
        renderTable();
    };

    initialize();
});
