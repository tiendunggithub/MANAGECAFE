console.log('script.js loaded');

getCoffeeTable();

async function getCoffeeTable() {
    const res = await fetch('http://localhost:3000/tables');
    const data = await res.json();
    console.log('data: ',data);
    let content = '';
    for(let i = 0; i < data.length; i++) {
        if(data[i].status == '1') {
            content += '<div class="card exist">'+
                            '<div class="card-content">'+
                                '<p class="card-title" id="table-'+data[i].id+'">Bàn '+data[i].name+'</p>'+
                            '</div>'+
                            '<img src="images/icons/round-table.png" alt="" width="60%">'+
                            '</div>'+
                        '</div>'
        } else {
            content += '<div class="card">'+
                            '<div class="card-content">'+
                                '<p class="card-title" id="table-'+data[i].id+'">Bàn '+data[i].name+'</p>'+
                            '</div>'+
                            '<img src="images/icons/round-table.png" alt="" width="60%">'+
                            '</div>'+
                        '</div>'
        }
    }
    document.getElementById("tables").innerHTML = content;
}