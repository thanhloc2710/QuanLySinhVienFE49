var sinhVienService = function(){
    this.themSinhVien = function(sinhVien){
        return axios({
            url:'http://svcy.myclass.vn/api/SinhVien/themsinhvien',
            method: 'POST',
            data:sinhVien
        })
    }

    this.xoaSinhVien = function(maSV){
        return axios({
            url: 'http://svcy.myclass.vn/api/SinhVien/XoaSinhVien/' + maSV,
            method: 'DELETE',
        })
 
    }
    this.layThongTinSinhVien = function (maSV) {
        return axios({
            url: 'http://svcy.myclass.vn/api/SinhVien/LayThongTinSinhVien/' + maSV, 
            method: 'GET',
        })
    }
    this.capNhatSinhVien = function(sinhVienUpDate){
        return axios({
            url: 'http://svcy.myclass.vn/api/SinhVien/CapNhatThongTinSinhVien',
            method: 'PUT',
            data: sinhVienUpDate
        })
    }
}