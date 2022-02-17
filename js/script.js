
// get id function
function getId(id) {
  return document.getElementById(id);
}


// common errors toast show
function errorToastShow(id) {
  getId(id).classList.add('show');
}
// Error message in calculation section
function errorMessage() {
  const income = parseFloat(getId('income-input').value);
  const foodExpense = parseFloat(getId('food-input').value);
  const rentExpense = parseFloat(getId('rent-input').value);
  const clothesExpense = parseFloat(getId('clothes-input').value);

  if ((isNaN(income) || isNaN(foodExpense) || isNaN(rentExpense) || isNaN(clothesExpense)) || (income < 0 || foodExpense < 0 || rentExpense < 0 || clothesExpense < 0))
  {
    if (isNaN(income) || isNaN(foodExpense) || isNaN(rentExpense) || isNaN(clothesExpense)) {
      errorToastShow('nan-error');  
  }
  else if (income<0||foodExpense<0||rentExpense<0||clothesExpense<0) {
      errorToastShow('negative-number-error');
  }
  }
  else {
    return false;
  }  
}
// clear inputed balance
function balanceClear() {
  getId('total-expense').innerText = 00;
  getId('total-balance').innerText = 00;
}
// clear calculation input field
function clearInput() {
  getId('income-input').value = '';
  getId('rent-input').value = '';
  getId('food-input').value = '';
  getId('clothes-input').value = '';
}

// calculation 
function calculation() {
  const income = getId('income-input').value;
  const incomeAmount = parseFloat(income);
  const foodExpense = getId('food-input').value;
  const rentExpense = getId('rent-input').value;
  const clothesExpense = getId('clothes-input').value;
  const totalExpenseAmount = parseFloat(foodExpense) + parseFloat(rentExpense) + parseFloat(clothesExpense);
  if (totalExpenseAmount < incomeAmount) {
    const totalBalanceAmount = parseFloat(income) - totalExpenseAmount;
    getId('total-expense').innerText = totalExpenseAmount.toFixed(2);
    getId('total-balance').innerText = totalBalanceAmount.toFixed(2);
    clearInput();
  }
  else {
    errorToastShow('expences-error');
    balanceClear();
  }
}
// income ammount
function incomeAmount() {
  const totalExpenseAmount = parseFloat(getId('total-expense').innerText);
  const balanceBeforeSaveText = getId('total-balance').innerText;
  const balanceBeforeSave = parseFloat(balanceBeforeSaveText);
  const totalIncome = totalExpenseAmount + balanceBeforeSave;
  return totalIncome;
}
// save money
function saveMoney() {
  const totalIncome = incomeAmount();
  const saveInputdValuetext = getId('saving-input').value;
  const saveInputdValue = parseFloat(saveInputdValuetext);
  const savedMoney = totalIncome * (saveInputdValue / 100);
  return savedMoney.toFixed(2);
}

// remaining balance
function remainingBalance() {
  const balanceBeforeSaveText = getId('total-balance').innerText;
  const balanceBeforeSave = parseFloat(balanceBeforeSaveText);
  const savedMoneyAmount = saveMoney();
  const remainingBalance = balanceBeforeSave - savedMoneyAmount;
  return remainingBalance.toFixed(2);
}

// calculate button event handle
getId('calculate-button').addEventListener('click', function () {
  if (errorMessage()) {
    errorMessage();
  }
   else if(errorMessage()==false){
    calculation();
  }
})

// save button event handle
getId('save-button').addEventListener('click', function () {
  const balanceBeforeSaveText = getId('total-balance').innerText;
  const balanceBeforeSave = parseFloat(balanceBeforeSaveText);
  if (isNaN(saveMoney())) {
    errorToastShow('save-nan-error');
  }
  else if (saveMoney() < 0) {
    errorToastShow('save-negative-error');
  }
  else if(saveMoney() <= balanceBeforeSave && saveMoney()>0) {
    getId('saving-amount').innerText = saveMoney();
    getId('remaining-balance').innerText = remainingBalance();
    getId('saving-input').value = ''; 
  }
  else {
    errorToastShow('insufficient-error');
    getId('saving-amount').innerText = 00;
    getId('remaining-balance').innerText =00;
  }
})
