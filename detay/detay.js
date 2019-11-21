// DataTable ayarları

$('#detay').DataTable({
//    autoFill: true,
    scrollX: true,
    pageLength: 10, // Kaç satır listelenecek?
    lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "Tümü"]], // Satır listeleme seçeneğini düzenleme
    order: [[0, "asc"], [1, "asc"]],
    // Tarih: asc = eskiden yeniye ** desc = "yeniden eskiye"
    // Harf ve Sayılar için = asc = büyükten küçüğe
    columnDefs: [
        // {width: "60px", targets:0},
        // width: 100px;
        // white-space: nowrap;
        // overflow: hidden;
        // text-overflow: ellipsis;
        { width: "300px", targets: 4 },
        { width: "200px", targets: 7 },
        { className: "textright", targets: [8,9,10,11,12,14,15,16,17,18] },
        { targets: ['nosort'], orderable: false }], // Class = "nosort" olan sütunların sıralama özelliği kapatılır
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

    dom:'Blf<"top"p>rt<"bottom"i>',
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
                                case 12: return data.replace(/[.]/g, '').replace(/,/, '.'); break
                                case 14: return data.replace(/[.]/g, '').replace(/,/, '.'); break
                                case 15: return data.replace(/[.]/g, '').replace(/,/, '.');break
                                case 16: return data.replace(/[.]/g, '').replace(/,/, '.');break
                                case 17: return data.replace(/[.]/g, '').replace(/,/, '.');break
                                case 18: return data.replace(/[.]/g, '').replace(/,/, '.');break
                                default: return data; break
                            }
                        }
                    }
                }
            }
        ],
    language: { url: "Turkce.json" },
});

$('#i_file').change(function (event) {
    // alert(event.target.files.length);
    
    
    for (x = 0; x < event.target.files.length; x++) {
        var tmppath = URL.createObjectURL(event.target.files[x]);
        var yukleniyor;
        yukleniyor = (((parseFloat(x)+1) / event.target.files.length)*100).toFixed(0);
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
            
            var InvoiceLine = "/Invoice/cac:InvoiceLine"; InvoiceLine = InvoiceLine.replace(/[/]/g, ">").replace(/[:]/g, "\\:");
            
            const formatter0 = new Intl.NumberFormat('tr-TR', { currency: 'TRY', minimumFractionDigits: 0 }); // style: 'currency',
            const formatter2 = new Intl.NumberFormat('tr-TR', { currency: 'TRY', minimumFractionDigits: 2 }); // style: 'currency',
            const formatter4 = new Intl.NumberFormat('tr-TR', { currency: 'TRY', minimumFractionDigits: 4 }); // style: 'currency',
            var geneltoplam= 0;var kdv01d=0; var kdv18d=0;var kdv08d=0;
            for (i = 0; i < $(xml).find(InvoiceLine).length; i++) {
                var iskonto = 0;
                var Percent;
                
                var miktar = $(xml).find(InvoiceLine).eq(i).find("cbc\\:InvoicedQuantity").eq(0).text();
                var birimFiyat = $(xml).find(InvoiceLine).eq(i).find("cac\\:Price > cbc\\:PriceAmount").eq(0).text();
                var tutar = (miktar * birimFiyat).toFixed(2);
                
                Percent=$(xml).find(InvoiceLine).eq(i).find("cac:TaxTotal/cac:TaxSubtotal/cbc:Percent".replace(/[/]/g, ">").replace(/[:]/g, "\\:")).text();
                TaxAmount = $(xml).find(InvoiceLine).eq(i).find("cac:TaxTotal/cac:TaxSubtotal/cbc:TaxAmount".replace(/[/]/g, ">").replace(/[:]/g, "\\:")).eq(0).text();
                
                for (f = 0; f < $(xml).find(InvoiceLine).eq(i).find("cac:AllowanceCharge".replace(/[/]/g, ">").replace(/[:]/g, "\\:")).length; f++) {
                    var iskonto = parseFloat($(xml).find(InvoiceLine).eq(i)
                        .find("cac:AllowanceCharge".replace(/[/]/g, ">").replace(/[:]/g, "\\:")).eq(f)
                        .find("cbc:Amount".replace(/[/]/g, ">").replace(/[:]/g, "\\:")).text()) + iskonto;      
                };
                if (formatter0.format(Percent)==1){
                    // alert(formatter0.format(Percent))
                    kdv01d=parseFloat(TaxAmount) + parseFloat(kdv01d)
                }
                if (formatter0.format(Percent)==8){
                    // alert(formatter0.format(Percent))
                    kdv08d=parseFloat(TaxAmount) + parseFloat(kdv08d)
                }
                if (formatter0.format(Percent)==18){
                    // alert(formatter0.format(Percent))
                    kdv18d=parseFloat(TaxAmount) + parseFloat(kdv18d)
                }

                var faturaExcel;
                if (parseFloat(tutar) - parseFloat(iskonto) == 0){
                    faturaExcel = "İSK100";
                } else{
                    faturaExcel = "ALIM"
                }
                geneltoplam = parseFloat(tutar) - parseFloat(iskonto) + parseFloat(TaxAmount) + parseFloat(geneltoplam);
                if (i == $(xml).find(InvoiceLine).length - 1) {
                    var gt = geneltoplam;
                    var kdv08 = kdv08d;var kdv18 = kdv18d;var kdv01=kdv01d;
                }else {gt=0;kdv08=0;kdv01=0;kdv18=0};
                $('#detay').DataTable().row.add([
                    $(xml).find(tarih).text(),
                    $(xml).find(evrakno).text(),
                    faturaExcel,//$(xml).find("cbc:ProfileID".replace(/[/]/g, ">").replace(/[:]/g, "\\:")).text(),
                    $(xml).find(saticino).eq(0).text(),
                    $(xml).find(satici).text(),
                    $(xml).find(InvoiceLine).eq(i).find("cbc\\:ID").eq(0).text(),
                    $(xml).find(InvoiceLine).eq(i).find("cac:Item/cac:SellersItemIdentification/cbc:ID".replace(/[/]/g, ">").replace(/[:]/g, "\\:")).eq(0).text(),// cac:Item/cac:SellersItemIdentification/cbc:ID
                    $(xml).find(InvoiceLine).eq(i).find("cac\\:Item > cbc\\:Name").eq(0).text(),
                    formatter4.format(miktar),
                    formatter4.format(birimFiyat),
                    formatter2.format(tutar),
                    formatter2.format(iskonto),
                    formatter2.format(parseFloat(tutar) - parseFloat(iskonto)),
                    formatter0.format($(xml).find(InvoiceLine).eq(i).find("cac:TaxTotal/cac:TaxSubtotal/cbc:Percent".replace(/[/]/g, ">").replace(/[:]/g, "\\:")).eq(0).text()),
                    formatter2.format(TaxAmount),
                    formatter2.format(gt),
                    formatter2.format(kdv01),
                    formatter2.format(kdv08),
                    formatter2.format(kdv18)
                ]
                ).draw(true);
                //  $(".progress-bar").width(yukleniyor + "%");
                //  $(".progress-bar").text(x + " adet fatura açılıyor. Bilgisayarınızın hızına, faturalarınızın detaylarına göre zaman alabilir lütfen bekleyiniz.");
            }
        }
        
        
       
            // alert(event.target.files.length)
        // document.getElementById('progress-bar').style.width=yukleniyor;
        // document.getElementById('progress-bar').setAttribute("style","width: 100%");
       
        // document.getElementsByClassName("progress-bar").style.width="1300px";
    }
   
}
)
