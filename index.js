// DataTable ayarları

$('#bilanco').DataTable({
//    autoFill: true,
    scrollX: true,
    pageLength: 10, // Kaç satır listelenecek?
    lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "Tümü"]], // Satır listeleme seçeneğini düzenleme
    order: [[0, "asc"], [1, "asc"]],
    // Tarih: asc = eskiden yeniye ** desc = "yeniden eskiye"
    // Harf ve Sayılar için = asc = büyükten küçüğe
    columnDefs: [
        // {width: "400px", targets: 3},
        { width: "300px", targets: 3 },
        { width: "300px", targets: 5 },
        { className: "textright", targets: [6, 7, 8, 9, 10, 11, 12] }, { targets: ['nosort'], orderable: false }], // Class = "nosort" olan sütunların sıralama özelliği kapatılır
    // scrollY:"200px",
    // scrollCollapse: true,
    // paging:true,
    // dom: 'Bl<"left"f>pti',
    // l - length changing input control
    // f - filtering input
    // t - The table!
    // i - Table information summary
    // p - pagination control
    // r - processing display element
    // B=Buttons

    dom:'Bf<"top"p>rt<"bottom"i>',
    buttons:
        [
            { extend: 'colvis', text: '<img src="https://img.icons8.com/dusk/44/000000/edit-column.png"><img src="https://img.icons8.com/dusk/44/000000/add-column.png"><img src="https://img.icons8.com/dusk/44/000000/delete-column.png"><br>Göster/Gizle', columnText: function (dt, idx, title) { return (idx + 1) + ': ' + title; } },
            {text: '<button"><img src="https://img.icons8.com/dusk/44/000000/xml-file.png"><br>Dosyaları Aç</button>',action: function ( e, dt, node, config ) {
        $('#i_file').click();
    }},
            { extend: 'copy', title: '', text: '<img src="https://img.icons8.com/dusk/44/000000/copy.png"><br>Kopyala',exportOptions: {
                //modifier: {page: 'current'}
            } },
            { extend: 'print', title: '', text: '<img src="https://img.icons8.com/dusk/44/000000/print.png"><br>Yazdır',
            action: function ( e, dt, node, config ) {
        alert("Yatay yazdırma ayarı yapılamadı Pdf formatında indirip yazdırabiliirsiniz!");
    }},
            { extend: 'pdfHtml5', orientation: 'landscape', pageSize: 'LEGAL', text: '<img src="https://img.icons8.com/dusk/44/000000/pdf.png"><br>PDF' },
            {
                filename: 'Bilanço', text: '<img src="https://img.icons8.com/dusk/44/000000/ms-excel.png"><br>Excel', extend: 'excelHtml5',
                title:'',
                exportOptions: 
                {
                    //modifier: {page: 'current'},
                    format: {
                        body: function (data, row, column, node) {
                            switch (column) {
                                case 0: return moment(data, 'YYYY-MM-DD').format('DD.MM.YYYY'); break;
                                case 6: return data.replace(/[.]/g, '').replace(/,/, '.');
                                case 7: return data.replace(/[.]/g, '').replace(/,/, '.');
                                case 8: return data.replace(/[.]/g, '').replace(/,/, '.');
                                case 9: return data.replace(/[.]/g, '').replace(/,/, '.');
                                case 10: return data.replace(/[.]/g, '').replace(/,/, '.');
                                case 11: return data.replace(/[.]/g, '').replace(/,/, '.');
                                case 12:return data.replace(/[.]/g, '').replace(/,/, '.');break
                                default: return data; break
                            }
                        }
                    }
                }
            }
        ],
    language: { url: "Turkish.json" },
});

$('#i_file').change(function (event) {
    // alert(event.target.files.length);
    for (x = 0; x < event.target.files.length; x++) {
        var tmppath = URL.createObjectURL(event.target.files[x]);
        $.ajax({ type: "GET", url: tmppath, dataType: "xml", success: function_Parsxml });
        function function_Parsxml(xml) {
            var evrakno = "/Invoice/cbc:ID"; evrakno = evrakno.replace(/[/]/g, ">").replace(/[:]/g, "\\:");
            var tarih = "/Invoice/cbc:IssueDate"; tarih = tarih.replace(/[/]/g, ">").replace(/[:]/g, "\\:");
            var saticino = "/Invoice/cac:AccountingSupplierParty/cac:Party/cac:PartyIdentification/cbc:ID"; saticino = saticino.replace(/[/]/g, ">").replace(/[:]/g, "\\:");
            var satici = "/Invoice/cac:AccountingSupplierParty/cac:Party/cac:PartyName/cbc:Name"; satici = satici.replace(/[/]/g, ">").replace(/[:]/g, "\\:");
            var alicino = "/Invoice/cac:AccountingCustomerParty/cac:Party/cac:PartyIdentification/cbc:ID"; alicino = alicino.replace(/[/]/g, ">").replace(/[:]/g, "\\:");
            var alici1 = "/Invoice/cac:AccountingCustomerParty/cac:Party/cac:PartyName/cbc:Name"; alici1 = alici1.replace(/[/]/g, ">").replace(/[:]/g, "\\:");
            var alici2 = "/Invoice/cac:AccountingCustomerParty/cac:Party/cac:Person/cbc:FirstName"; alici2 = alici2.replace(/[/]/g, ">").replace(/[:]/g, "\\:");
            var alici3 = "/Invoice/cac:AccountingCustomerParty/cac:Party/cac:Person/cbc:FamilyName"; alici3 = alici3.replace(/[/]/g, ">").replace(/[:]/g, "\\:");
            var unvan;
            if ($(xml).find(alici1).text() === "") {
                unvan = $(xml).find(alici2).text() + " " + $(xml).find(alici3).text();
            } else {
                unvan = $(xml).find(alici1).text();
                // alert(unvan);
            }
            var vergisiz = "/Invoice/cac:TaxTotal/cac:TaxSubtotal/cbc:TaxableAmount"; vergisiz = vergisiz.replace(/[/]/g, ">").replace(/[:]/g, "\\:");
            var kdvorani = "/Invoice/cac:TaxTotal/cac:TaxSubtotal/cbc:Percent"; kdvorani = kdvorani.replace(/[/]/g, ">").replace(/[:]/g, "\\:");
            var vergi = "/Invoice/cac:TaxTotal/cac:TaxSubtotal/cbc:TaxAmount"; vergi = vergi.replace(/[/]/g, ">").replace(/[:]/g, "\\:");

            const formatter0 = new Intl.NumberFormat('tr-TR', { currency: 'TRY', minimumFractionDigits: 0 }); // style: 'currency',
            const formatter2 = new Intl.NumberFormat('tr-TR', { currency: 'TRY', minimumFractionDigits: 2 }); // style: 'currency',
            // alert($(xml).find(kdvorani).length);
            var vergisiz00 = 0;
            var vergisiz01 = 0;
            var vergi01 = 0;
            var vergisiz08 = 0;
            var vergi08 = 0;
            var vergisiz18 = 0;
            var vergi18 = 0;
            for (i = 0; i < $(xml).find(kdvorani).length; i++) {
                // alert(formatter0.format($(xml).find(kdvorani).eq(i).text()));
                if (formatter0.format($(xml).find(kdvorani).eq(i).text()) === "0") { vergisiz00 = $(xml).find(vergisiz).eq(i).text(); }
                if (formatter0.format($(xml).find(kdvorani).eq(i).text()) === "1") { vergi01 = $(xml).find(vergi).eq(i).text(); vergisiz01 = $(xml).find(vergisiz).eq(i).text(); }
                if (formatter0.format($(xml).find(kdvorani).eq(i).text()) === "8") { vergi08 = $(xml).find(vergi).eq(i).text(); vergisiz08 = $(xml).find(vergisiz).eq(i).text(); }
                if (formatter0.format($(xml).find(kdvorani).eq(i).text()) === "18") { vergi18 = $(xml).find(vergi).eq(i).text(); vergisiz18 = $(xml).find(vergisiz).eq(i).text(); }
            }

            $('#bilanco').DataTable().row.add([
                $(xml).find(tarih).text(),
                $(xml).find(evrakno).text(),
                $(xml).find(saticino).eq(0).text(),
                $(xml).find(satici).text(),
                $(xml).find(alicino).eq(0).text(),
                unvan,
                formatter2.format(vergisiz00),
                formatter2.format(vergisiz01),
                formatter2.format(vergi01),
                formatter2.format(vergisiz08),
                formatter2.format(vergi08),
                formatter2.format(vergisiz18),
                formatter2.format(vergi18),
            ]).draw(true);
            for (i = 0; i < $(xml).find(vergisiz).length; i++) {
                $('#isletme').DataTable().row.add([
                $(xml).find(tarih).text(),
                $(xml).find(evrakno).text(),
                $(xml).find(saticino).eq(0).text(),
                $(xml).find(satici).text(),
                $(xml).find(alicino).eq(0).text(),
                unvan,
                formatter2.format($(xml).find(vergisiz).eq(i).text()),
                formatter0.format($(xml).find(kdvorani).eq(i).text()),
                formatter2.format($(xml).find(vergi).eq(i).text()),
                
            ]).draw(true);
            }
        }
       
    }
})

// DataTable ayarları
$('#isletme').DataTable({
//    autoFill: true,
    scrollX: true,
    pageLength: 10, // Kaç satır listelenecek?
    lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "Tümü"]], // Satır listeleme seçeneğini düzenleme
    order: [[0, "asc"], [1, "asc"]],
    // Tarih: asc = eskiden yeniye ** desc = "yeniden eskiye"
    // Harf ve Sayılar için = asc = büyükten küçüğe
    columnDefs: [
        { width: "300px", targets: 3 },
        { width: "300px", targets: 5 },
        { className: "textright", targets: [6, 7, 8] }, { targets: ['nosort'], orderable: false }], // Class = "nosort" olan sütunların sıralama özelliği kapatılır
    // scrollY:"200px",
    // scrollCollapse: true,
    // paging:true,
    dom: 'Bf<"top"p>rt<"bottom"i>',
    buttons:
        [
            { extend: 'colvis', text: '<img src="https://img.icons8.com/dusk/44/000000/edit-column.png"><img src="https://img.icons8.com/dusk/44/000000/add-column.png"><img src="https://img.icons8.com/dusk/44/000000/delete-column.png"><br>Göster/Gizle', columnText: function (dt, idx, title) { return (idx + 1) + ': ' + title; } },
            {text: '<button"><img src="https://img.icons8.com/dusk/44/000000/xml-file.png"><br>Dosyaları Aç</button>',action: function ( e, dt, node, config ) {
        $('#i_file').click();
    }},
            { extend: 'copy', title: '', text: '<img src="https://img.icons8.com/dusk/44/000000/copy.png"><br>Kopyala',exportOptions: {
                //modifier: {page: 'current'}
            } },
            { extend: 'print', title: '', text: '<img src="https://img.icons8.com/dusk/44/000000/print.png"><br>Yazdır',
            action: function ( e, dt, node, config ) {
        alert("Yatay yazdırma ayarı yapılamadı Pdf formatında indirip yazdırabiliirsiniz!");
    }},
            { extend: 'pdfHtml5', orientation: 'landscape', pageSize: 'LEGAL', text: '<img src="https://img.icons8.com/dusk/44/000000/pdf.png"><br>PDF' },
            {
                filename: 'İşletme', text: '<img src="https://img.icons8.com/dusk/44/000000/ms-excel.png"><br>Excel', extend: 'excelHtml5',
                title:'',
                exportOptions: 
                {
                    //modifier: {page: 'current'},
                    format: {
                        body: function (data, row, column, node) {
                            switch (column) {
                                case 0: return moment(data, 'YYYY-MM-DD').format('DD.MM.YYYY'); break;
                                case 6: return data.replace(/[.]/g, '').replace(/,/, '.');
                                case 7: return data.replace(/[.]/g, '').replace(/,/, '.');
                                case 8: return data.replace(/[.]/g, '').replace(/,/, '.');
                                // case 9: return data.replace(/[.]/g, '').replace(/,/, '.');
                                // case 10: return data.replace(/[.]/g, '').replace(/,/, '.');
                                // case 11: return data.replace(/[.]/g, '').replace(/,/, '.');
                                // case 12:return data.replace(/[.]/g, '').replace(/,/, '.');break
                                default: return data; break
                            }
                        }
                    }
                }
            }
        ],
    language: { url: "Turkish.json" },
});