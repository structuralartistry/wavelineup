BackboneFactory.define('accounting_transaction', Wavelineup.Models.AccountingTransaction, function () {
  return {
    practice_id: 1,
    income_expense: 'income',
    amount: 1234,
    accounting_category_id: 1,
    accounting_account_id: 1,
    note: 'something else'
  }
});

BackboneFactory.define('option_selector', Wavelineup.Models.OptionSelector, function () {
  return {
    name: 'some name'
  }
});
//BackboneFactory.define('option_selector_accounting_category_income', Wavelineup.Models.OptionSelector, function () {
//  return {
//    name: 'accounting_category_income'
//  }
//});
//BackboneFactory.define('option_selector_accounting_category_expense', Wavelineup.Models.OptionSelector, function () {
//  return {
//    name: 'accounting_category_expense'
//  }
//});
//BackboneFactory.define('option_selector_accounting_account', Wavelineup.Models.OptionSelector, function () {
//  return {
//    name: 'accounting_account'
//  }
//});
//BackboneFactory.define('option_selector_identity_type', Wavelineup.Models.OptionSelector, function () {
//  return {
//    name: 'identity_type'
//  }
//});
//BackboneFactory.define('option_selector_product_service', Wavelineup.Models.OptionSelector, function () {
//  return {
//    name: 'product_service'
//  }
//});


BackboneFactory.define_sequence('option_selector_option_value', function(n){
  return 'value ' + n;
});

BackboneFactory.define('option_selector_option', Wavelineup.Models.OptionSelectorOption, function () {
  return {
    value: BackboneFactory.next('option_selector_option_value')
  }
});

