
let inputY = document.getElementById('yang');
let inputT = document.getElementById('tu');
let inputC = document.getElementById('chen');
let inputB = document.getElementById('bo');

let setBtnY = document.getElementById('set-yang');
let setBtnT = document.getElementById('set-tu');
let setBtnC = document.getElementById('set-chen');
let setBtnB = document.getElementById('set-bo');

let totalY = document.getElementById('total-yang');
let totalT = document.getElementById('total-tu');
let totalC = document.getElementById('total-chen');
let totalB = document.getElementById('total-bo');

let records = document.getElementById('records');

let winner = null;

let data = [];
let total = {
  yang: 0,
  tu: 0,
  chen: 0,
  bo: 0,
};

let dataString = window.localStorage.getItem('data');
if (dataString) {
  setData(JSON.parse(dataString));
  refreshTable();
}

function reset() {
  setData([]);
  refreshTable();
}

function setData(d) {
  data = d;
  window.localStorage.setItem('data', JSON.stringify(data));

  total = {
    yang: 0,
    tu: 0,
    chen: 0,
    bo: 0,
  };

  data.forEach(record => {
    total.yang += record.yang;
    total.tu += record.tu;
    total.chen += record.chen;
    total.bo += record.bo;
  })
}

function clearWinner(clearValue) {
  let inputs = document.getElementsByClassName('input');
  for (let i = 0; i < inputs.length; i++) {
    let input = inputs[i];
    input.removeAttribute('disabled');
    if (clearValue) {
      input.value = '';
    }
  }

  let setBtns = document.getElementsByClassName('set-btn');
  for(let i = 0; i < setBtns.length; i++) {
    let btn = setBtns[i];
    btn.style.color = 'initial';
    btn.style.fontWeight = 'normal';
  }
}

function setWinner(id) {console.log('id', id)
  winner = id;

  clearWinner();

  let wInput = document.getElementById(id);
  wInput.setAttribute('disabled', true);
  wInput.value = 0;

  let wBtn = document.getElementById(`set-${id}`);
  wBtn.style.color = 'green';
  wBtn.style.fontWeight = 'bold';


  // let inputs = document.getElementsByClassName('input');
  // for (let i = 0; i < inputs.length; i++) {
  //   let input = inputs[i];
  //   input.removeAttribute('disabled');
  //   if (input.id === id) {
  //     input.setAttribute('disabled', true);
  //     input.value = 0;
  //   }
  // }

  // let setBtns = document.getElementsByClassName('set-btn');
  // for(let i = 0; i < setBtns.length; i++) {
  //   let btn = setBtns[i];
  //   btn.style.color = 'initial';
  //   btn.style.fontWeight = 'normal';
  //   if (btn.id === `set-${id}`) {
  //     btn.style.color = 'green';
  //     btn.style.fontWeight = 'bold';
  //   }
  // }
}

function handleAdd() {
  if (!winner) {
    return alert('未选择胜者');
  }

  let numberY = inputY.value ? parseInt(inputY.value) : 0;
  let numberT = inputT.value ? parseInt(inputT.value) : 0;
  let numberC = inputC.value ? parseInt(inputC.value) : 0;
  let numberB = inputB.value ? parseInt(inputB.value) : 0;

  let winNumber = numberY + numberT + numberC + numberB;

  let newRecord = {
    yang: -numberY,
    tu: -numberT,
    chen: -numberC,
    bo: -numberB,
  }
  newRecord[winner] = winNumber;

  setData([...data, newRecord]);

  refreshTable();

  winner = null;
  clearWinner(true);
}

function refreshTable() {
  let trs = '';

  data.forEach((record, index) => {
    trs += `<tr>
      <td>${index + 1}</td>
      <td style="color: ${record.yang > 0 ? 'green' : 'black'}">${record.yang}</td>
      <td style="color: ${record.tu > 0 ? 'green' : 'black'}">${record.tu}</td>
      <td style="color: ${record.chen > 0 ? 'green' : 'black'}">${record.chen}</td>
      <td style="color: ${record.bo > 0 ? 'green' : 'black'}">${record.bo}</td>
    </tr>`
  });

  records.getElementsByTagName('tbody')[0].innerHTML = trs;

  // 设置小结
  totalY.innerHTML = total.yang;
  totalT.innerHTML = total.tu;
  totalC.innerHTML = total.chen;
  totalB.innerHTML = total.bo;
}
