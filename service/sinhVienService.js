var sinhVienService = function(){
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