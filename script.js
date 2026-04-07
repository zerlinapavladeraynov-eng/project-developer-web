let dataPasien = []; 
  let dataEdit = null;

  function scrollToInput(){
    document.getElementById("input").scrollIntoView({ behavior: "smooth" });
  }

  function formatTanggal(tanggalValue){
    let date = new Date(tanggalValue);

    let namaBulan = [
      "Januari","Februari","Maret","April","Mei","Juni",
      "Juli","Agustus","September","Oktober","November","Desember"
    ];

    return date.getDate() + " " + namaBulan[date.getMonth()] + " " + date.getFullYear();
  }


  function renderTable(){
    let hasil = document.getElementById("hasil");
    hasil.innerHTML = "";

    dataPasien.forEach((p, index) => {
      hasil.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${p.nama}</td>
        <td>${p.umur}</td>
        <td>${p.keluhan}</td>
        <td>${p.alamat}</td>
        <td>${p.jk}</td>
        <td>${p.tanggal}</td>
        <td><span class="status">${p.status}</span></td>
        <td>
          <button onclick="editData(${p.id})">Edit</button>
          <button onclick="hapusData(${p.id})">Hapus</button>
          <button onclick="ubahStatus(${p.id})">Selesai</button>
        </td>
      </tr>
      `;
    });
  }

  function tambahdata(){
    let nama = document.getElementById("nama").value.toUpperCase();
    let umur = document.getElementById("umur").value;
    let keluhan = document.getElementById("keluhan").value;
    let alamat = document.getElementById("alamat").value;
    let jk = document.getElementById("jk").value;
    let tanggal = formatTanggal(document.getElementById("tanggal").value);

    let pasien = {
      id: Math.floor(Math.random() * 10000),
      nama,
      umur,
      keluhan,
      alamat,
      jk,
      tanggal,
      status: "Menunggu"
    };

    dataPasien.push(pasien);

    renderTable();
    resetForm();
  }

  function editData(id){
    let p = dataPasien.find(item => item.id === id);

    document.getElementById("nama").value = p.nama;
    document.getElementById("umur").value = p.umur;
    document.getElementById("keluhan").value = p.keluhan;
    document.getElementById("alamat").value = p.alamat;
    document.getElementById("jk").value = p.jk;

    dataEdit = id;
  }

  function updateData(){
    if(dataEdit === null){
      alert("Pilih data dulu!");
      return;
    }

    let p = dataPasien.find(item => item.id === dataEdit);

    p.nama = document.getElementById("nama").value;
    p.umur = document.getElementById("umur").value;
    p.keluhan = document.getElementById("keluhan").value;
    p.alamat = document.getElementById("alamat").value;
    p.jk = document.getElementById("jk").value;
    p.tanggal = formatTanggal(document.getElementById("tanggal").value);

    dataEdit = null;

    renderTable();
    resetForm();
  }

  function hapusData(id){
    if(confirm("Yakin mau hapus data?")){
      dataPasien = dataPasien.filter(p => p.id !== id);
      renderTable();
    }
  }


  function ubahStatus(id){
    let p = dataPasien.find(item => item.id === id);
    p.status = "Selesai";
    renderTable();
  }


  function cariData(){
    let input = document.getElementById("search").value.toLowerCase();

    let rows = document.querySelectorAll("#hasil tr");

    rows.forEach(row => {
      let nama = row.children[1].innerText.toLowerCase();
      row.style.display = nama.includes(input) ? "" : "none";
    });
  }
  function resetForm(){
    document.getElementById("nama").value = "";
    document.getElementById("umur").value = "";
    document.getElementById("keluhan").value = "";
    document.getElementById("alamat").value = "";
    document.getElementById("jk").value = "";
    document.getElementById("tanggal").value = "";
  }

  document.getElementById("btnTambah").addEventListener("click", tambahdata);
  document.getElementById("btnUpdate").addEventListener("click", updateData);
  document.getElementById("search").addEventListener("keyup", cariData);