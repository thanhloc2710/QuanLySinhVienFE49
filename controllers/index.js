
// Chứa thông tin tất cả sinh viên  được thêm từ form 
var mangSinhVien = [];
var validate = new Validation();

document.getElementById('btnThemSinhVien').onclick = function () {
    // Lấy thông tin sinh viên thêm vào đối tượng sinh viên
    var sinhVien = new SinhVien();
    sinhVien.maSV = document.getElementById('maSinhVien').value;
    sinhVien.tenSV = document.getElementById('tenSinhVien').value;
    sinhVien.email = document.getElementById('email').value;
    sinhVien.loaiSV = document.getElementById('loaiSinhVien').value;
    sinhVien.diemHoa = document.getElementById('diemHoa').value;
    sinhVien.diemLy = document.getElementById('diemLy').value;
    sinhVien.diemToan = document.getElementById('diemToan').value;
    sinhVien.diemRenLuyen = document.getElementById('diemRenLuyen').value;
    // console.log(sinhVien);

    //Kiểm tra dữ liệu hợp lệ trước khi thêm vào mảng
    // ------------- kiểm tra rỗng ----------------
    var valid = validate.kiemTraRong(sinhVien.maSV, '#error_maSinhVien') & validate.kiemTraRong(sinhVien.tenSV, '#error_tenSinhVien') & validate.kiemTraRong(sinhVien.email, '#error_emailSinhVien') & validate.kiemTraRong(sinhVien.diemToan, '#error_diemToan') & validate.kiemTraRong(sinhVien.diemLy, '#error_diemLy') & validate.kiemTraRong(sinhVien.diemLy, '#error_diemHoa') & validate.kiemTraRong(sinhVien.diemLy, '#error_diemRenLuyen');

    //-------------- kiểm tra ký tự --------------
    //  ragex all letters javascript: key search

    // var regexAllLertter = /^[a-z A-Z]+$/;
    // if(!regexAllLertter.test(sinhVien.tenSV)){
    //     document.querySelector('#error_all_letter_tenSinhVien').innerHTML = 'khong hop le';
    //     document.querySelector('#error_all_letter_tenSinhVien').style.display = 'block';
    // } else{
    //     document.querySelector('#error_all_letter_tenSinhVien').innerHTML = '';
    //     document.querySelector('#error_all_letter_tenSinhVien').style.display = 'none';
    // }


    // -----------------kiểm tra tên là ký tự------------------
    valid &= validate.kiemTraTatCaLaChuoi(sinhVien.tenSV, '#error_all_letter_tenSinhVien');

    // ---------------------kiểm tra email---------------------
    valid &= validate.kiemTraEmail(sinhVien.email, '#error_email_tenSinhVien');

    // -------------------kiểm tra nhập số điểm toán lý hoá rèn luyện---------------
    valid &= validate.kiemTraTatCaLaSo(sinhVien.diemToan, '#erro_all_number_diemToan');
    valid &= validate.kiemTraTatCaLaSo(sinhVien.diemLy, '#erro_all_number_diemLy');
    valid &= validate.kiemTraTatCaLaSo(sinhVien.diemHoa, '#erro_all_number_diemHoa');
    valid &= validate.kiemTraTatCaLaSo(sinhVien.diemRenLuyen, '#erro_all_number_diemRenLuyen');

    valid &= validate.kiemTraGiaTri(sinhVien.diemToan, '#erro_min_max_value_diemToan', 0, 10) & 
    validate.kiemTraGiaTri(sinhVien.diemLy, '#erro_min_max_value_diemLy', 0, 10) & 
    validate.kiemTraGiaTri(sinhVien.diemHoa, '#erro_min_max_value_diemHoa', 0, 10) & 
    validate.kiemTraGiaTri(sinhVien.diemRenLuyen, '#erro_min_max_value_diemRenLuyen', 0, 10);

    // valid &= validate.kiemTraGiaTri(sinhVien.diemLy, '#erro_min_max_value_diemLy', 0, 10);
    // valid &= validate.kiemTraGiaTri(sinhVien.diemHoa, '#erro_min_max_value_diemHoa', 0, 10);
    // valid &= validate.kiemTraGiaTri(sinhVien.diemRenLuyen, '#erro_min_max_value_diemRenLuyen', 0, 10);

    //----------------- kiểm tra độ dài -------------------
    valid &= validate.kiemTraDoDai(sinhVien.maSV,'#erro_min_max_length_maSinhVien',4,6);

    if (!valid) {// nếu như valid === false => không hợp lệ
        return;
    }


    // console.log(validate.value);
    // đặt cờ
    // var valid = true;

    // //trim(): phương thức loại bỏ khoản trống đầu và cuối của chuỗi
    // if(sinhVien.maSV.trim() === ''){
    //     // Dom đến thẻ thông báo dưới thẻ inputmaSV
    //     document.getElementById('error_maSinhVien').innerHTML = 'Mã sinh viên không được bỏ trống';
    //     document.getElementById('error_maSinhVien').style.display = 'block';
    //     valid = false;
    // } else{
    //     document.getElementById('error_maSinhVien').innerHTML = '';
    //     document.getElementById('error_maSinhVien').style.display = 'none';
    // }

    // if(sinhVien.tenSV.trim() === ''){
    //     document.getElementById('error_tenSinhVien').innerHTML = 'Tên sinh viên không được bỏ trống';
    //     document.getElementById('error_tenSinhVien').style.display = 'block';
    //     valid = false;
    // } else{
    //     document.getElementById('error_tenSinhVien').innerHTML = '';
    //     document.getElementById('error_tenSinhVien').style.display = 'none';
    // }

    // if(sinhVien.email.trim() === ''){
    //     document.getElementById('error_emailSinhVien').innerHTML = 'Email sinh viên không được bỏ trống';
    //     document.getElementById('error_emailSinhVien').style.display = 'block';
    //     valid = false;
    // } else{
    //     document.getElementById('error_emailSinhVien').innerHTML = '';
    //     document.getElementById('error_emailSinhVien').style.display = 'none';
    // }

    // if(sinhVien.diemToan.trim() === ''){
    //     document.getElementById('error_diemToan').innerHTML = 'Điểm toán sinh viên không được bỏ trống';
    //     document.getElementById('error_diemToan').style.display = 'block';
    //     valid = false;
    // } else{
    //     document.getElementById('error_diemToan').innerHTML = '';
    //     document.getElementById('error_diemToan').style.display = 'none';
    // }

    // if(sinhVien.diemLy.trim() === ''){
    //     document.getElementById('error_diemLy').innerHTML = 'Điểm lý sinh viên không được bỏ trống';
    //     document.getElementById('error_diemLy').style.display = 'block';
    //     valid = false;
    // } else{
    //     document.getElementById('error_diemLy').innerHTML = '';
    //     document.getElementById('error_diemLy').style.display = 'none';
    // }

    // if(sinhVien.diemHoa.trim() === ''){
    //     document.getElementById('error_diemHoa').innerHTML = 'Điểm hoá sinh viên không được bỏ trống';
    //     document.getElementById('error_diemHoa').style.display = 'block';
    //     valid = false;
    // } else{
    //     document.getElementById('error_diemHoa').innerHTML = '';
    //     document.getElementById('error_diemHoa').style.display = 'none';
    // }

    // if(sinhVien.diemRenLuyen.trim() === ''){
    //     document.getElementById('error_diemRenLuyen').innerHTML = 'Điểm rèn luyện sinh viên không được bỏ trống';
    //     document.getElementById('error_diemRenLuyen').style.display = 'block';
    //     valid = false;
    // } else{
    //     document.getElementById('error_diemRenLuyen').innerHTML = '';
    //     document.getElementById('error_diemRenLuyen').style.display = 'none';
    // }

    // if(!valid){// nếu như valid === false => không hợp lệ
    //     return;
    // }




    // push(): phương thức thêm 1 phần tử vào cuối mangSinhVien
    mangSinhVien.push(sinhVien);
    renderTableSinhVien(mangSinhVien);
    luuLocalStorage();

    // console.log(mangSinhVien);

    //Tạo nội dung thẻ tr sinh viên
    // var trSinhVien = document.createElement('tr');

    // Tạo nội dung các thẻ td sinh viên
    // var tdMaSinhVien = document.createElement('td');
    // tdMaSinhVien.innerHTML = sinhVien.maSV;

    // var tdTenSinhVien = document.createElement('td');
    // tdTenSinhVien.innerHTML = sinhVien.tenSV;

    // var tdEmail = document.createElement('td');
    // tdEmail.innerHTML = sinhVien.email;

    // var tdLoaiSinhVien = document.createElement('td');
    // tdLoaiSinhVien.innerHTML = sinhVien.xepLoai();

    // var tdDiemTrungBinh = document.createElement('td');
    // tdDiemTrungBinh.innerHTML = sinhVien.tinhDiemTrungBinh();

    // var tdDiemRenLuyen = document.createElement('td');
    // tdDiemRenLuyen.innerHTML = sinhVien.diemRenLuyen;

    // // Thêm 1 trường td dành cho button xoá
    // var tdAction = document.createElement('td');

    // var btnXoa = document.createElement('button');
    // btnXoa.innerHTML = 'Xoá';
    // btnXoa.className = 'btn btn-danger';
    // btnXoa.id = 'btnXoa';
    // btnXoa.onclick = function(){
    //     // Tìm ra phần tử cha (td) => từ td tìm ra tr xoá
    //     btnXoa.parentElement.parentElement.remove();
    // }

    // tdAction.appendChild(btnXoa);

    // // Đưa các thẻ td vào thẻ tr
    //Phương thức appendChild () nối thêm một nút làm con cuối cùng của một nút.
    // trSinhVien.appendChild(tdMaSinhVien);
    // trSinhVien.appendChild(tdTenSinhVien);
    // trSinhVien.appendChild(tdLoaiSinhVien);
    // trSinhVien.appendChild(tdDiemTrungBinh);
    // trSinhVien.appendChild(tdDiemRenLuyen);
    // trSinhVien.appendChild(tdAction);


    // //Dom đến thẻ tbody appendChild(tr)
    // document.getElementById('tableSinhVien').appendChild(trSinhVien);
}

var renderTableSinhVien = function (mangSV) {

    // Từ dữ liệu mảng tạo ra các thẻ tr tương ứng
    var chuoiTr = '';
    for (var index = 0; index < mangSV.length; index++) {
        // Mỗi lần duyệt lấy ra dữ liệu của 1 sinh viên trong mảng 
        var sinhVien = mangSV[index];
        // tạo object mới lấy dữ liệu từ mangSV[i] gán qua
        var sv = new SinhVien();
        sv.maSV = sinhVien.maSV;
        sv.tenSV = sinhVien.tenSV;
        sv.email = sinhVien.email;
        sv.diemHoa = sinhVien.diemHoa;
        sv.diemLy = sinhVien.diemLy;
        sv.diemToan = sinhVien.diemToan;
        sv.diemRenLuyen = sinhVien.diemRenLuyen;
        //Từ dữ liệu sinh viên tạo ra từng dòng <tr> tương ứng 
        chuoiTr += `
            <tr>
                <td>${sv.maSV}</td>
                <td>${sv.tenSV}</td>
                <td>${sv.email}</td>
                <td>${sv.xepLoai()}</td>
                <td>${sv.tinhDiemTrungBinh()}</td>
                <td>${sv.diemRenLuyen}</td>
                <td>${sv.maSV}</td>
                <td><button class="btn btn-danger" onclick="xoaSinhVien('${sinhVien.maSV}')" >Xoá</button></td>
            </tr>
        `
    }

    // string template 

    // Thoát ra vòng lặp
    document.getElementById('tableSinhVien').innerHTML = chuoiTr;
}

xoaSinhVien = function (maSV) {
    // Từ mã sinh viên sẽ tìm ra thằng sinhVien cần xoá
    for (var index = mangSinhVien.length - 1; index >= 0; index--) {
        // Mỗi lần duyệt lấy ra 1 sinhVien
        var sinhVien = mangSinhVien[index];
        if (sinhVien.maSV === maSV) { // Nếu sinhVien trong mảng có mã = maSinhVien được click
            // Tại vị trí đó mình sẽ xoá phần tử đó đi 
            mangSinhVien.splice(index, 1);
        }
    }

    // console.log(mangSinhVien)
    // Sau khi xoá xong tạo lại tableSinhVien
    renderTableSinhVien(mangSinhVien);
    luuLocalStorage();
}

var luuLocalStorage = function(){
    // biến mảng sinh viên thành chuỗi 
    var sMangSinhVien = JSON.stringify(mangSinhVien);
    // lưu vào localstorage
    localStorage.setItem('mangSinhVien',sMangSinhVien);
}

var layDuLieuLocalStorage = function(){
    if(localStorage.getItem('mangSinhVien')){
        //lấy dữ liệu từ localstorage
        var sMangSinhVien = localStorage.getItem('mangSinhVien');
        //chuyễn chuỗi localstorage về mảng (oject) và gán cho mangSinhVien
        mangSinhVien = JSON.parse(sMangSinhVien)
        // goị hàm render mangSinhVien => render lại table
        renderTableSinhVien(mangSinhVien)
        // console.log(sMangSinhVien);
    }
}
layDuLieuLocalStorage();

var  hienThiThongTinSinhVien = function(){
    console.log('userB , hiển thị tin sinh viên');
}
var laythongtinSV = function(){
    console.log('userB , hiển thị tin sinh viên');
}

// test
//test devb
// console.log(axios);
