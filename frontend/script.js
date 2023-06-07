console.log('script.js loaded');

getCoffeeTable();

async function getCoffeeTable() {
    const res = await fetch('http://localhost:3000/tables');
    const data = await res.json();
    console.log('data: ',data);
    let content = '';
    for(let i = 0; i < data.length; i++) {
        if(data[i].status == '1') {
            content += '<div class="card exist" id="card-table">'+
                            '<div class="card-content">'+
                                '<p class="card-title" id="table-'+data[i].id+'">Bàn '+data[i].name+'</p>'+
                                '<img src="images/icons/round-table.png" alt="" width="60%">'+
                            '</div>'+
                            '<div class="card-actions">'+
                                '<button class="btn btn-success" onclick="addItem('+data[i].id+')">Thêm món</button>'+
                                '<button class="btn btn-success mt-2" onclick="detailsTable('+data[i].id+')">Thông tin</button>'+
                                '<button class="btn btn-success mt-2" onclick="payTable('+data[i].id+')">Thanh toán</button>'+
                            '</div>'+
                        '</div>'
        } else {
            content += '<div class="card" id="card-table">'+
                            '<div class="card-content">'+
                                '<p class="card-title" id="table-'+data[i].id+'">Bàn '+data[i].name+'</p>'+
                                '<img src="images/icons/round-table.png" alt="" width="60%">'+
                            '</div>'+
                            '<div class="card-actions">'+
                                '<button class="btn btn-success" onclick="addItem('+data[i].id+')">Thêm món</button>'+
                                '<button class="btn btn-success mt-2" onclick="detailsTable('+data[i].id+')">Thông tin</button>'+
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
    console.log('data: ',data);
}