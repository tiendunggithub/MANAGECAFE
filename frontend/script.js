console.log('script.js loaded');
getCoffeeTable();

async function getCoffeeTable() {
    const res = await fetch('http://localhost:3000/tables');
    const data = await res.json();
    console.log('data: ',data);
    let content = '';
    for(let i = 0; i < data.length; i++) {
        if(data[i].STATUS == '1') {
            content += '<div class="card exist" id="card-table">'+
                            '<div class="card-content">'+
                                '<p class="card-title" id="table-'+data[i].ID+'">Bàn '+data[i].NAME+'</p>'+
                                '<img src="images/icons/round-table.png" alt="" width="60%">'+
                            '</div>'+
                            '<div class="card-actions">'+
                                '<button class="btn btn-success" onclick="addItem('+data[i].ID+')">Thêm món</button>'+
                                '<button class="btn btn-success mt-2" onclick="detailsTable('+data[i].ID+')">Thông tin</button>'+
                                '<button class="btn btn-success mt-2" onclick="payTable('+data[i].ID+')">Thanh toán</button>'+
                            '</div>'+
                        '</div>'
        } else {
            content += '<div class="card" id="card-table">'+
                            '<div class="card-content">'+
                                '<p class="card-title" id="table-'+data[i].ID+'">Bàn '+data[i].NAME+'</p>'+
                                '<img src="images/icons/round-table.png" alt="" width="60%">'+
                            '</div>'+
                            '<div class="card-actions">'+
                                '<button class="btn btn-success" onclick="addItem('+data[i].ID+')">Thêm món</button>'+
                                // '<button class="btn btn-success mt-2" onclick="detailsTable('+data[i].ID+')">Thông tin</button>'+
                                // '<button class="btn btn-success mt-2" onclick="payTable('+data[i].id+')">Thanh toán</button>'+
                            '</div>'+
                        '</div>'
        }
    }
    document.getElementById("tables").innerHTML = content;
}

async function detailsTable(id) {
    const res = await fetch('http://localhost:3000/tableDetails/'+id);
    const data = await res.json();
    
    let header = '<tr>'+
                    '<th>STT</th>'+
                    '<th>Tên</th>'+
                    '<th>Đơn giá</th>'+
                    '<th>Số lượng</th>'+
                    '<th>Thành tiền</th>'+
                '</tr>'
    let content = '';
    
    document.querySelector('#startTime').textContent = data[0].STARTTIME.slice(0, 19).replace('T', ' ');
    for (let i = 0; i < data.length; i++) {
        let total = Number(data[i].PRICE)*Number(data[i].QUANTITY)
        content += '<tr>'+
                        '<td>'+Number(i + 1)+'</td>'+
                        '<td>'+data[i].NAME+'</td>'+
                        '<td>'+data[i].PRICE+'</td>'+
                        '<td>'+data[i].QUANTITY+'</td>'+
                        '<td>'+total+'</td>'+
                    '</tr>'
    }
    document.getElementById('itemLst').innerHTML = header + content;
    document.getElementById('nameTable').textContent = 'Bàn '+ data[0].TABLENAME;
    document.getElementById('tblStatus').classList.add('status-exist');
}

function closeTblDetails() {
    document.getElementById('tblStatus').classList.remove('status-exist');
}
function addItem(id){
    addItem2(id);
}

async function addItem2(idTbl) {
    // const resDetails = await fetch('http://localhost:3000/tableDetails/'+idTbl);
    // const data = await resDetails.json();
    
    // var date;
    // if (data.length == 0) {
    //     date = new Date();
    //     date = date.getFullYear() + '-' +
    //     ('00' + (date.getMonth()+1)).slice(-2) + '-' +
    //     ('00' + date.getDate()).slice(-2) + ' ' + 
    //     ('00' + date.getHours()).slice(-2) + ':' + 
    //     ('00' + date.getMinutes()).slice(-2) + ':' + 
    //     ('00' + date.getSeconds()).slice(-2);
    // } else {
    //     date = data[0].STARTTIME
    // }

    const res = await fetch('http://localhost:3000/addItem'+idTbl)
    const data2 = await res.json();

}