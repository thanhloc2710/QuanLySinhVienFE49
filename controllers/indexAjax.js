// khai báo svService tương tác api
var svService  = new sinhVienService();


//-------------------giao tiếp với API-------------------------

var getApiSinhVien = function(){
    var objectAPI = {
        url:'http://svcy.myclass.vn/api/SinhVien/LayDanhSachSinhVien', // đường dẫn đi đến file hoặc link backend cung cấp
        method:'GET', // phương thức backend cung cấp
    }
    
    // gửi yêu cầu dữ liệu đến backend => backend trả về promise
    var promise = axios(objectAPI)
    
    // xử lý hàm thành công 
    var funcSuccess = function(result){
        console.log(result.data);
        // sau khi lấy được data từ backend => tạo bảng giao diện
        // gọi ajax thành công thì render table
        renderTableSinhVien(result.data);
    }
    
    // xử lý hàm thất bại 
    var funcFail = function(error){
        console.log(error);
    }
    
    //then() : hàm nhận vào giá trị là 1 hàm xử lý thành công
    // catch(): hàm nhận vào giá trị là 1 hàm xử lý thất bại
    promise.then(funcSuccess).catch(funcFail);
    
    // LƯu Ý: ajax là 1 kỹ thuật xữ lý bất đồng bộ.    
}
getApiSinhVien();

var renderTableSinhVien = function(mangSinhVien){
    var contentTable = ''
    for(var i = 0 ; i < mangSinhVien.length ; i++){
        // lấy ra từng sinh viên trong dữ liệu backend trả về 
        var sinhVien = mangSinhVien[i];
        // tạo ra 1 sv object từ prototype sinh viên
        var sv = new SinhVien();
        sv.maSV = sinhVien.MaSV;
        sv.tenSV = sinhVien.HoTen;
        sv.email = sinhVien.Email;
        sv.diemHoa = sinhVien.DiemHoa;
        sv.diemToan = sinhVien.DiemToan;
        sv.diemLy = sinhVien.DiemLy;
        sv.diemRenLuyen = 5;
        // console.log('sv',sv);
        contentTable += `
        <tr>
            <td>${sv.maSV}</td>
            <td>${sv.tenSV}</td>
            <td>${sv.email}</td>
            <td>${sv.xepLoai()}</td>
            <td>${sv.tinhDiemTrungBinh()}</td>
            <td>${sv.diemRenLuyen}</td>
            <td>${sv.maSV}</td>
            <td>
            <button class="btn btn-primary" onclick="chinhSuaSinhVien('${sv.maSV}')">Chỉnh sửa</button>
            <button class="btn btn-danger" onclick="xoaSinhVien('${sv.maSV}')" >Xoá</button></td>
        </tr>
    `
    }
    //DOM đến giao diện ghi thông tin dữ liệu vào 
    document.getElementById('tableSinhVien').innerHTML = contentTable;
}
//----------------- Chỉnh sửa sinh viên------------------------
var chinhSuaSinhVien = function (maSV){
    console.log(maSV)
    var promise = svService.layThongTinSinhVien(maSV);

    promise.then(function(result){
        console.log(result.data);
        var sinhVienEdit = result.data;
        document.getElementById('maSinhVien').value = sinhVienEdit.MaSV;
        document.getElementById('tenSinhVien').value = sinhVienEdit.HoTen;
        document.getElementById('diemToan').value = sinhVienEdit.DiemToan;
        document.getElementById('diemLy').value = sinhVienEdit.DiemLy;
        document.getElementById('diemHoa').value = sinhVienEdit.DiemHoa;
        // document.getElementById('diemRenLuyen').value = sinhVienEdit.diemRenLuyen;
        document.getElementById('email').value = sinhVienEdit.Email;
        document.getElementById('maSinhVien').disabled = true;
        document.getElementById('btnThemSinhVien').disabled = true;

    }).catch(function(error){
        console.log(error);
    })
}


//-----------------------------Lưu thông tin sinh viên-----------------------
document.getElementById('btnLuuSinhVien').onclick = function(){
    //Lấy thông tin sinh viên gán vào data gửi lên api
    var sinhVienCapNhat = {
        "MaSV": document.getElementById('maSinhVien').value,
        "HoTen": document.getElementById('tenSinhVien').value,
        "Email": document.getElementById('email').value,
        "SoDT": 123123123,
        "CMND": 123456789,
        "DiemToan": document.getElementById('diemToan').value,
        "DiemLy": document.getElementById('diemLy').value,
        "DiemHoa": document.getElementById('diemHoa').value
    }
    // Gọi service cập nhật dữ liệu server
    var promise = svService.capNhatSinhVien(sinhVienCapNhat);
    promise.then(function(result){
        console.log(result.data);
        //load lại table
        getApiSinhVien();
        // mở khoá nút thêm sinh viên
        document.getElementById('btnThemSinhVien').disabled = false;
        document.getElementById('maSinhVien').disabled = false;
        document.getElementById('btnLuuSinhVien').disabled = true;
    })
    console.log(sinhVienCapNhat);
}



//------------------ thêm dữ liệu lên SEVER qua AIP POST -------------------

document.getElementById('btnThemSinhVien').onclick = function(){
    // Lấy thông tin từ người dùng gán vào data backend yêu cầu => data phải chuẩn định dạng backend yêu cầu
    var objectData = {
        MaSV: document.getElementById('maSinhVien').value,
        HoTen: document.getElementById('tenSinhVien').value,
        Email: document.getElementById('email').value,
        SoDT: 123456789,
        CMND: 123456789,
        DiemToan: document.getElementById('diemToan').value,
        DiemLy: document.getElementById('diemLy').value,
        DiemHoa: document.getElementById('diemHoa').value,
      }
      console.log(objectData);
      // dùng axios gọi ajax đưa dữ liệu lên backend xử lý
    var objectAxios ={
        url:'http://svcy.myclass.vn/api/SinhVien/ThemSinhVien',
        method:'POST',
        data:objectData// thuộc tính backend yêu cầu dữ liệu gửi đi phải đúng định dạng
    }

    var promise = axios(objectAxios);
    promise.then(function(result){
        // thêm thành công gọi lại API lấy danh sách sinh viên mới gọi về
        getApiSinhVien();
        console.log(result.data);
    }).catch(function(error){
        console.log(error);
    })
    
}

// ------- xoá sinh viên qua api-------------

var xoaSinhVien = function(maSV){
    // dùng service gọi api xoá
    var promise = svService.xoaSinhVien(maSV)

    promise.then(function(result){
        // xoá thành công thì load lại get layDanhSachSinhVien
        getApiSinhVien();
        console.log(result.data)
    }).catch(function(error){
        console.log(error);
    })
}

var hienThiThongTinSinhVien = function(){
    console.log('user A, hien thi thong tin sinh vien')
}

var laySinhVienDiemCaoNhat = function(){
    console.log('user A, lay sinh vien diem cao nhat')
}

var DiemCaoNhat = function(){
    console.log('user A, diem cao nhat')
}